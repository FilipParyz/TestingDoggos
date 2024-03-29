from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask import render_template

app = Flask(__name__)

# Configure your SQL database URI
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///animal_shelter.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Define a model for animals
class Animal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    food_id = db.Column(db.Integer, db.ForeignKey('food.id'), nullable=False)
    shelter_id = db.Column(db.Integer, db.ForeignKey('shelter.id'), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    race = db.Column(db.String(50), nullable=False)
    age = db.Column(db.Integer)
    weight = db.Column(db.Float)
    status = db.Column(db.String(50), nullable=False)
    sex = db.Column(db.String(50), nullable=False)

    def to_dict(self):
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

# Define a model for animal food
class Food(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    amount = db.Column(db.Integer, nullable=False)
    weight = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'amount': self.amount,
            'weight': self.weight 
        }

# Define a model for spaces in a shelter
class Shelter(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    amount = db.Column(db.Integer, nullable=False)
    capacity = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'amount': self.amount,
            'capacity': self.capacity
        }

@app.route('/')
def home():
    return render_template('index.html', animals=Animal.query.all())

@app.route('/animals', methods=['GET', 'POST'])
def handle_animals():
    if request.method == 'POST':
        data = request.get_json()
        new_animal = Animal(name=data['name'],
                            race=data['race'],
                            food_id=data['food_id'],
                            shelter_id=data['shelter_id'],
                            age=data.get('age'),
                            weight=data.get('weight'),
                            status=data['status'],
                            sex=data['sex'])
        db.session.add(new_animal)
        db.session.commit()
        return jsonify(new_animal.to_dict()), 201
    
    elif request.method == 'GET':
        animals = Animal.query.all()
        return jsonify([animal.to_dict() for animal in animals])

@app.route('/animals/<int:animal_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_animal(animal_id):
    animal = Animal.query.get_or_404(animal_id)
    if request.method == 'GET':
        return jsonify(animal.to_dict())
    elif request.method == 'PUT':
        data = request.get_json()
        animal.name = data['name']
        animal.race = data['race']
        animal.food_id = data['food_id']
        animal.shelter_id = data['shelter_id']
        animal.age = data.get('age')
        animal.weight = data.get('weight')
        animal.status = data['status']
        animal.sex = data['sex']
        db.session.commit()
        return jsonify(animal.to_dict())
    elif request.method == 'DELETE':
        db.session.delete(animal)
        db.session.commit()
        return '', 204

@app.route('/foods', methods=['GET', 'POST'])
def handle_foods():
    if request.method == 'POST':
        data = request.get_json()
        new_food = Food(    name=data['name'],
                            amount=data['amount'],
                            weight=data['weight'])
        db.session.add(new_food)
        db.session.commit()
        return jsonify(new_food.to_dict()), 201
    
    elif request.method == 'GET':
        foods = Food.query.all()
        return jsonify([food.to_dict() for food in foods])

@app.route('/foods/<int:food_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_food(food_id):
    food = Food.query.get_or_404(food_id)
    if request.method == 'GET':
        return jsonify(food.to_dict())
    elif request.method == 'PUT':
        data = request.get_json()
        food.name = data['name']
        food.amount = data['amount']
        food.weight = data['weight']
        db.session.commit()
        return jsonify(food.to_dict())
    elif request.method == 'DELETE':
        db.session.delete(food)
        db.session.commit()
        return '', 204

@app.route('/shelters', methods=['GET', 'POST'])
def handle_shelters():
    if request.method == 'POST':
        data = request.get_json()
        new_shelter = Shelter(  name=data['name'],
                                amount=data['amount'],
                                capacity=data['capacity'])
        db.session.add(new_shelter)
        db.session.commit()
        return jsonify(new_shelter.to_dict()), 201
    
    elif request.method == 'GET':
        shelters = Shelter.query.all()
        return jsonify([shelter.to_dict() for shelter in shelters])

@app.route('/shelters/<int:shelter_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_shelter(shelter_id):
    shelter = Shelter.query.get_or_404(shelter_id)
    if request.method == 'GET':
        return jsonify(shelter.to_dict())
    elif request.method == 'PUT':
        data = request.get_json()
        shelter.name = data['name']
        shelter.amount = data['amount']
        shelter.capacity = data['capacity']
        db.session.commit()
        return jsonify(shelter.to_dict())
    elif request.method == 'DELETE':
        db.session.delete(shelter)
        db.session.commit()
        return '', 204
        
# Routing dla podstrony "support_us"
@app.route('/support_us')
def support_us():
    return render_template('support_us.html')

@app.route('/manage_animals')
def manage_animals():
    return render_template('manage_animals.html')
    
    ###Here are the tests###
# Routing dla podstrony "profile_page"
@app.route('/profile_page.html')
def profile_page():
    return render_template('profile_page.html')
# Routing dla podstrony "MP_button"
@app.route('/MP_button.html')
def MP_button():
    return render_template('MP_button.html')

# Routing dla podstrony "MF_button"
@app.route('/MF_button.html')
def MF_button():
    return render_template('MF_button.html')


if __name__ == '__main__':

    with app.app_context():
        db.create_all()
    app.run(debug=True)
