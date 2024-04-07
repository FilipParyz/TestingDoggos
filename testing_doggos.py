"""
This file contains the implementation of a Flask application for managing an animal shelter.
It defines the routes for handling HTTP requests,
as well as the models for animals, food, and shelters.
"""
import json
from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Configure your SQL database URI
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///animal_shelter.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


class Animal(db.Model):
    """Model class for animals in the animal shelter."""

    id = db.Column(db.Integer, primary_key=True)
    food_id = db.Column(db.Integer, db.ForeignKey('food.id'), nullable=False)
    shelter_id = db.Column(
        db.Integer,
        db.ForeignKey('shelter.id'),
        nullable=False)
    name = db.Column(db.String(50), nullable=False)
    race = db.Column(db.String(50), nullable=False)
    age = db.Column(db.Integer)
    weight = db.Column(db.Float)
    status = db.Column(db.String(50), nullable=False)
    sex = db.Column(db.String(50), nullable=False)

    def __init__(
            self,
            name,
            race,
            food_id,
            shelter_id,
            status,
            sex,
            age=None,
            weight=None):
        self.name = name
        self.race = race
        self.food_id = food_id
        self.shelter_id = shelter_id
        self.status = status
        self.sex = sex
        self.age = age
        self.weight = weight

    def to_dict(self):
        """Converts the Animal object to a dictionary."""
        return {
            'id': self.id,
            'food_id': self.food_id,
            'shelter_id': self.shelter_id,
            'name': self.name,
            'race': self.race,
            'age': self.age,
            'weight': self.weight,
            'status': self.status,
            'sex': self.sex
        }

    def update(self, data):
        """Updates the Animal object with new data."""
        self.name = data['name']
        self.race = data['race']
        self.food_id = data['food_id']
        self.shelter_id = data['shelter_id']
        self.status = data['status']
        self.sex = data['sex']
        self.age = data['age']
        self.weight = data['weight']


class Food(db.Model):
    """Model class for animal food in the animal shelter."""

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    amount = db.Column(db.Integer, nullable=False)
    weight = db.Column(db.Integer, nullable=False)

    def __init__(self, name, amount, weight):
        self.name = name
        self.amount = amount
        self.weight = weight

    def to_dict(self):
        """Converts the Food object to a dictionary."""
        return {
            'id': self.id,
            'name': self.name,
            'amount': self.amount,
            'weight': self.weight
        }

    def update(self, data):
        """Updates the Food object with new data."""
        self.name = data['name']
        self.amount = data['amount']
        self.weight = data['weight']


class Shelter(db.Model):
    """Model class for spaces in a shelter in the animal shelter."""

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    amount = db.Column(db.Integer, nullable=False)
    capacity = db.Column(db.Integer, nullable=False)

    def __init__(self, name, amount, capacity):
        self.name = name
        self.amount = amount
        self.capacity = capacity

    def to_dict(self):
        """Converts the Shelter object to a dictionary."""
        return {
            'id': self.id,
            'name': self.name,
            'amount': self.amount,
            'capacity': self.capacity
        }

    def update(self, data):
        """Updates the Shelter object with new data."""
        self.name = data['name']
        self.amount = data['amount']
        self.capacity = data['capacity']


@app.route('/')
def home():
    """Renders the home page with a list of all animals."""
    return render_template('index.html', animals=Animal.query.all())


@app.route('/animals', methods=['GET', 'POST'])
def handle_animals():
    """Handles GET and POST requests for the animals endpoint."""
    if request.method == 'POST':
        data = request.get_json()
        new_animal = Animal(name=data['name'],
                            race=data['race'],
                            food_id=data['food_id'],
                            shelter_id=data['shelter_id'],
                            status=data['status'],
                            sex=data['sex'],
                            age=data.get('age'),
                            weight=data.get('weight'))
        db.session.add(new_animal)
        db.session.commit()
        return jsonify(new_animal.to_dict()), 201

    if request.method == 'GET':
        animals = Animal.query.all()
        return jsonify([animal.to_dict() for animal in animals])
    return '', 405


@app.route('/animals/<int:animal_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_animal(animal_id):
    """Handles GET, PUT, and DELETE requests for a specific animal."""
    animal = Animal.query.get_or_404(animal_id)
    if request.method == 'GET':
        return jsonify(animal.to_dict())
    if request.method == 'PUT':
        data = json.loads(request.get_json())
        animal.update(data)
        db.session.commit()
        return jsonify(animal.to_dict())
    if request.method == 'DELETE':
        db.session.delete(animal)
        db.session.commit()
        return '', 204
    return '', 405


@app.route('/foods', methods=['GET', 'POST'])
def handle_foods():
    """Handles GET and POST requests for the foods endpoint."""
    if request.method == 'POST':
        data = request.get_json()
        new_food = Food(name=data['name'],
                        amount=data['amount'],
                        weight=data['weight'])
        db.session.add(new_food)
        db.session.commit()
        return jsonify(new_food.to_dict()), 201
    if request.method == 'GET':
        foods = Food.query.all()
        return jsonify([food.to_dict() for food in foods])
    return '', 405


@app.route('/foods/<int:food_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_food(food_id):
    """Handles GET, PUT, and DELETE requests for a specific food."""
    food = Food.query.get_or_404(food_id)
    if request.method == 'GET':
        return jsonify(food.to_dict())
    if request.method == 'PUT':
        data = json.loads(request.get_json())
        food.update(data)
        db.session.commit()
        return jsonify(food.to_dict())
    if request.method == 'DELETE':
        db.session.delete(food)
        db.session.commit()
        return '', 204
    return '', 405


@app.route('/shelters', methods=['GET', 'POST'])
def handle_shelters():
    """Handles GET and POST requests for the shelters endpoint."""
    if request.method == 'POST':
        data = request.get_json()
        new_shelter = Shelter(name=data['name'],
                              amount=data['amount'],
                              capacity=data['capacity'])
        db.session.add(new_shelter)
        db.session.commit()
        return jsonify(new_shelter.to_dict()), 201
    if request.method == 'GET':
        shelters = Shelter.query.all()
        return jsonify([shelter.to_dict() for shelter in shelters])
    return '', 405


@app.route('/shelters/<int:shelter_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_shelter(shelter_id):
    """Handles GET, PUT, and DELETE requests for a specific shelter."""
    shelter = Shelter.query.get_or_404(shelter_id)
    if request.method == 'GET':
        return jsonify(shelter.to_dict())
    if request.method == 'PUT':
        data = json.loads(request.get_json())
        shelter.update(data)
        db.session.commit()
        return jsonify(shelter.to_dict())
    if request.method == 'DELETE':
        db.session.delete(shelter)
        db.session.commit()
        return '', 204
    return '', 405

# Routing dla podstrony "support_us"


@app.route('/support_us')
def support_us():
    """Renders the support us page."""
    return render_template('support_us.html')


@app.route('/manage_animals')
def manage_animals():
    """Renders the manage animals page."""
    return render_template('manage_animals.html')

    ### Here are the tests###
# Routing dla podstrony "profile_page"


@app.route('/profile_page.html')
def profile_page():
    """Renders the profile page."""
    return render_template('profile_page.html')

# Routing dla podstrony "MP_button"


@app.route('/MP_button.html')
def mp_button():
    """Renders the MP button page."""
    return render_template('MP_button.html')

# Routing dla podstrony "MF_button"


@app.route('/MF_button.html')
def mf_button():
    """Renders the MF button page."""
    return render_template('MF_button.html')

# Routing for subsite manage_food
@app.route('/manage_food')
def manage_food():
    """Returns the HTML content of the add food form."""
    return render_template('manage_food.html')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
