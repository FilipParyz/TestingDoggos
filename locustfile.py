from locust import HttpUser, TaskSet, task, between
import random


class AnimalTasks(TaskSet):

    @task(1)
    def get_animals(self):
        self.client.get("/animals")

    @task(2)
    def post_animal(self):
        self.client.post("/animals", json={
            "name": "TestAnimal",
            "race": "TestRace",
            "food_id": 1,
            "shelter_id": 1,
            "status": "Healthy",
            "sex": "Male",
            "age": 5,
            "weight": 12.5
        })

    @task(2)
    def put_animal(self):
        with self.client.get("/animals", catch_response=True) as response:
            if response.status_code == 200:
                animals = response.json()
                if animals:
                    animal_to_modify = random.choice(animals)
                    animal_id = animal_to_modify['id']
                    self.client.put(f"/animals/{animal_id}", json={
                        "name": "UpdatedAnimal",
                        "race": "UpdatedRace",
                        "food_id": 1,
                        "shelter_id": 1,
                        "status": "Healthy",
                        "sex": "Male",
                        "age": 6,
                        "weight": 13.5
                    })
                else:
                    response.failure("No animal found to modify")
            else:
                response.failure(
                    f"Failed to get animals: {response.status_code}")

    @task(1)
    def delete_animal(self):
        with self.client.get("/animals", catch_response=True) as response:
            if response.status_code == 200:
                animals = response.json()
                if animals:
                    animal_to_delete = random.choice(animals)
                    animal_id = animal_to_delete['id']
                    self.client.delete(f"/animals/{animal_id}")
                else:
                    response.failure("No animals found to delete")
            else:
                response.failure(
                    f"Failed to get animals: {response.status_code}")


class FoodTasks(TaskSet):

    @task(1)
    def get_foods(self):
        self.client.get("/foods")

    @task(2)
    def post_food(self):
        self.client.post("/foods", json={
            "name": "TestFood",
            "amount": 10,
            "weight": 5.0
        })

    @task(2)
    def put_food(self):
        with self.client.get("/foods", catch_response=True) as response:
            if response.status_code == 200:
                foods = response.json()
                if foods:
                    food_to_modify = random.choice(foods)
                    food_id = food_to_modify['id']
                    self.client.put(f"/foods/{food_id}", json={
                        "name": "UpdatedFood",
                        "amount": 15,
                        "weight": 6.0
                    })
                else:
                    response.failure("No food found to modify")
            else:
                response.failure(
                    f"Failed to get foods: {response.status_code}")

    @task(1)
    def delete_food(self):
        with self.client.get("/foods", catch_response=True) as response:
            if response.status_code == 200:
                foods = response.json()
                if foods:
                    food_to_delete = random.choice(foods)
                    food_id = food_to_delete['id']
                    self.client.delete(f"/foods/{food_id}")
                else:
                    response.failure("No food found to delete")
            else:
                response.failure(
                    f"Failed to get foods: {response.status_code}")


class ShelterTasks(TaskSet):

    @task(1)
    def get_shelters(self):
        self.client.get("/shelters")

    @task(2)
    def post_shelter(self):
        self.client.post("/shelters", json={
            "name": "TestShelter",
            "amount": 5,
            "capacity": 50
        })

    @task(2)
    def put_shelter(self):
        with self.client.get("/shelters", catch_response=True) as response:
            if response.status_code == 200:
                shelters = response.json()
                if shelters:
                    shelter_to_modify = random.choice(shelters)
                    shelter_id = shelter_to_modify['id']
                    self.client.put(f"/shelters/{shelter_id}", json={
                        "name": "UpdatedShelter",
                        "amount": 6,
                        "capacity": 55
                    })
                else:
                    response.failure("No shelter found to modify")
            else:
                response.failure(
                    f"Failed to get shelters: {response.status_code}")

    @task(1)
    def delete_shelter(self):
        with self.client.get("/shelters", catch_response=True) as response:
            if response.status_code == 200:
                shelters = response.json()
                if shelters:
                    shelter_to_delete = random.choice(shelters)
                    shelter_id = shelter_to_delete['id']
                    self.client.delete(f"/shelters/{shelter_id}")
                else:
                    response.failure("No shelter found to delete")
            else:
                response.failure(
                    f"Failed to get shelters: {response.status_code}")


class WebsiteUser(HttpUser):
    tasks = [AnimalTasks, FoodTasks, ShelterTasks]
    wait_time = between(1, 5)
