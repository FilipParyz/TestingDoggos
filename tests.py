"""
This file contains unit tests for the Animal, Food, and Shelter models and their corresponding API endpoints.
"""

import unittest
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from testing_doggos import app, db, Animal, Food, Shelter

class AnimalTestCase(unittest.TestCase):
    """
    Test case for the Animal model and API endpoints.
    """

    def setUp(self):
        """
        Set up the test environment before each test case.
        """
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test_animal_shelter.db'
        app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        self.app = app.test_client()
        self.ctx = app.app_context()
        self.ctx.push()
        db.create_all()

    def tearDown(self):
        """
        Clean up the test environment after each test case.
        """
        db.drop_all()
        self.ctx.pop()

    def test_add_animal(self):
        """
        Test adding a new animal to the database.
        """
        response = self.app.post('/animals', json={
            'name': 'Hector',
            'race': 'Dog',
            'food_id': 1,
            'shelter_id': 1,
            'age': 3,
            'weight': 10.5,
            'status': 'Adoptable',
            'sex': 'Female'
        })
        self.assertEqual(response.status_code, 201)

    def test_get_animals(self):
        """
        Test retrieving all animals from the database.
        """
        response = self.app.get('/animals')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json), 0)

    def test_get_animal(self):
        """
        Test retrieving a specific animal from the database.
        """
        testingDoggo = {
            'name': 'Hector',
            'race': 'Dog',
            'food_id': 1,
            'shelter_id': 1,
            'age': 3,
            'weight': 10.5,
            'status': 'Adoptable',
            'sex': 'Female'
        }
        response = self.app.post('/animals', json=testingDoggo)
        animal_id = response.json['id']
        response = self.app.get(f'/animals/{animal_id}')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json['name'], testingDoggo['name'])
        self.assertEqual(response.json['race'], testingDoggo['race'])

    def test_update_animal(self):
        """
        Test updating an existing animal in the database.
        """
        response = self.app.post('/animals', json={
            'name': 'Doggo',
            'race': 'Dog',
            'food_id': 1,
            'shelter_id': 1,
            'age': 3,
            'weight': 10.5,
            'status': 'Adoptable',
            'sex': 'Female'
        })
        animal_id = response.json['id']
        response = self.app.put(f'/animals/{animal_id}', json={
            'name': 'Whiskas',
            'race': 'Cat',
            'food_id': 2,
            'shelter_id': 2,
            'age': 5,
            'weight': 4.5,
            'status': 'Adoptable',
            'sex': 'Male'
        })
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json['name'], 'Whiskas')
        self.assertEqual(response.json['race'], 'Cat')

    def test_delete_animal(self):
        """
        Test deleting an animal from the database.
        """
        response = self.app.post('/animals', json={
            'name': 'Hector',
            'race': 'Dog',
            'food_id': 3,
            'shelter_id': 5,
            'age': 12,
            'weight': 32,
            'status': 'Adoptable',
            'sex': 'Male'
        })
        animal_id = response.json['id']
        response = self.app.delete(f'/animals/{animal_id}')
        self.assertEqual(response.status_code, 204)

class FoodTestCase(unittest.TestCase):
    """
    Test case for the Food model and API endpoints.
    """

    def setUp(self):
        """
        Set up the test environment before each test case.
        """
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test_animal_shelter.db'
        app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        self.app = app.test_client()
        self.ctx = app.app_context()
        self.ctx.push()
        db.create_all()

    def tearDown(self):
        """
        Clean up the test environment after each test case.
        """
        db.drop_all()
        self.ctx.pop()

    def test_add_food(self):
        """
        Test adding a new food item to the database.
        """
        response = self.app.post('/foods', json={
            'name': 'Dog Food',
            'amount': 10,
            'weight': 5
        })
        self.assertEqual(response.status_code, 201)

    def test_get_foods(self):
        """
        Test retrieving all food items from the database.
        """
        response = self.app.get('/foods')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json), 0)

    def test_get_food(self):
        """
        Test retrieving a specific food item from the database.
        """
        response = self.app.post('/foods', json={
            'name': 'Dog Food',
            'amount': 10,
            'weight': 5
        })
        food_id = response.json['id']
        response = self.app.get(f'/foods/{food_id}')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json['name'], 'Dog Food')

    def test_update_food(self):
        """
        Test updating an existing food item in the database.
        """
        response = self.app.post('/foods', json={
            'name': 'Dog Food',
            'amount': 10,
            'weight': 5
        })
        food_id = response.json['id']
        response = self.app.put(f'/foods/{food_id}', json={
            'name': 'Updated Dog Food',
            'amount': 15,
            'weight': 7
        })
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json['name'], 'Updated Dog Food')

    def test_delete_food(self):
        """
        Test deleting a food item from the database.
        """
        response = self.app.post('/foods', json={
            'name': 'Dog Food',
            'amount': 10,
            'weight': 5
        })
        food_id = response.json['id']
        response = self.app.delete(f'/foods/{food_id}')
        self.assertEqual(response.status_code, 204)

class ShelterTestCase(unittest.TestCase):
    """
    Test case for the Shelter model and API endpoints.
    """

    def setUp(self):
        """
        Set up the test environment before each test case.
        """
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test_animal_shelter.db'
        app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        self.app = app.test_client()
        self.ctx = app.app_context()
        self.ctx.push()
        db.create_all()

    def tearDown(self):
        """
        Clean up the test environment after each test case.
        """
        db.drop_all()
        self.ctx.pop()

    def test_add_shelter(self):
        """
        Test adding a new shelter to the database.
        """
        response = self.app.post('/shelters', json={
            'name': 'Dog Shelter',
            'amount': 5,
            'capacity': 10
        })
        self.assertEqual(response.status_code, 201)

    def test_get_shelters(self):
        """
        Test retrieving all shelters from the database.
        """
        response = self.app.get('/shelters')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json), 0)

    def test_get_shelter(self):
        """
        Test retrieving a specific shelter from the database.
        """
        response = self.app.post('/shelters', json={
            'name': 'Dog Shelter',
            'amount': 5,
            'capacity': 10
        })
        shelter_id = response.json['id']
        response = self.app.get(f'/shelters/{shelter_id}')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json['name'], 'Dog Shelter')

    def test_update_shelter(self):
        """
        Test updating an existing shelter in the database.
        """
        response = self.app.post('/shelters', json={
            'name': 'Dog Shelter',
            'amount': 5,
            'capacity': 10
        })
        shelter_id = response.json['id']
        response = self.app.put(f'/shelters/{shelter_id}', json={
            'name': 'Updated Dog Shelter',
            'amount': 7,
            'capacity': 12
        })
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json['name'], 'Updated Dog Shelter')

    def test_delete_shelter(self):
        """
        Test deleting a shelter from the database.
        """
        response = self.app.post('/shelters', json={
            'name': 'Dog Shelter',
            'amount': 5,
            'capacity': 10
        })
        shelter_id = response.json['id']
        response = self.app.delete(f'/shelters/{shelter_id}')
        self.assertEqual(response.status_code, 204)

if __name__ == '__main__':
    unittest.main()