"use strict";
// Function to load animals from the server and populate the list and dropdown
const loadAnimal = async () => {
    try {
        const response = await fetch(`/animals`);
        const data = await response.json();
        const animalList = document.getElementById("animalList");
        animalList.innerHTML = "";
        const animalOptions = document.getElementById("animalId");
        animalOptions.innerHTML = "";
        // Add default option
        const defaultOption = document.createElement("option");
        defaultOption.value = "-1";
        defaultOption.textContent = "Select an animal";
        animalOptions.appendChild(defaultOption);
        data.forEach((animal) => {
            const animalItem = document.createElement("li");
            animalItem.textContent = `Name: ${animal.name}, Race: ${animal.race}, Food_id: ${animal.food_id}, Shelter_id: ${animal.shelter_id}, Status: ${animal.status}, Sex: ${animal.sex}, Age: ${animal.age}, Weight: ${animal.weight}`;
            animalList.appendChild(animalItem);
            const animalOption = document.createElement("option");
            animalOption.value = animal.id;
            animalOption.textContent = animal.name;
            animalOptions.appendChild(animalOption);
        });
    }
    catch (error) {
        console.error('Error:', error);
    }
};
// Function to handle action changes and display the corresponding form
const handleActionChangeAn = () => {
    const action = document.getElementById("action").value;
    const addAnimalForm = document.getElementById("addAnimalForm");
    const editAnimalForm = document.getElementById("editAnimalForm");
    const deleteAnimalForm = document.getElementById("deleteAnimalForm");
    const existingAnimal = document.getElementById("existingAnimal");
    addAnimalForm.style.display = action === "add" ? "block" : "none";
    editAnimalForm.style.display = action === "edit" ? "block" : "none";
    deleteAnimalForm.style.display = action === "delete" ? "block" : "none";
    existingAnimal.style.display = action === "add" ? "none" : "block";
    if (action === "edit") {
        const selectedAnimalId = document.getElementById("animalId").value;
        if (selectedAnimalId !== "-1") {
            fetchAnimalData(selectedAnimalId);
        }
    }
};
// Function to fetch data of a selected animal for editing
const fetchAnimalData = async (animalId) => {
    try {
        const response = await fetch(`/animals/${animalId}`);
        const data = await response.json();
        document.getElementById("editName").value = data.name;
        document.getElementById("editRace").value = data.race;
        document.getElementById("editFoodId").value = data.food_id;
        document.getElementById("editShelterId").value = data.shelter_id;
        document.getElementById("editStatus").value = data.status;
        document.getElementById("editSex").value = data.sex;
        document.getElementById("editAge").value = data.age.toString();
        document.getElementById("editWeight").value = data.weight.toString();
    }
    catch (error) {
        console.error('Error:', error);
    }
};
// Function to add a new animal
const addAnimal = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const jsonObject = {};
    formData.forEach((value, key) => { jsonObject[key] = value; });
    try {
        const response = await fetch(`/animals`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonObject)
        });
        const data = await response.json();
        console.log(data);
        loadAnimal();
    }
    catch (error) {
        console.error('Error:', error);
    }
    event.target.reset();
};
// Function to delete an animal
const deleteAnimal = async () => {
    const animalId = document.getElementById("animalId").value;
    if (animalId === "-1") {
        alert("Select an animal to delete!");
        return;
    }
    try {
        const response = await fetch(`/animals/${animalId}`, {
            method: 'DELETE'
        });
        console.log(response);
        loadAnimal();
    }
    catch (error) {
        console.error('Error:', error);
    }
};
// Function to edit an existing animal
const editAnimal = async (event) => {
    event.preventDefault();
    const animalId = document.getElementById("animalId").value;
    if (animalId === "-1") {
        alert("Select an animal to edit!");
        return;
    }
    const formData = new FormData(event.target);
    const jsonObject = {};
    formData.forEach((value, key) => { jsonObject[key] = value; });
    try {
        const response = await fetch(`/animals/${animalId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonObject)
        });
        const data = await response.json();
        console.log(data);
        loadAnimal();
        clearEditAnimalForm();
    }
    catch (error) {
        console.error('Error:', error);
    }
};
// Function to clear the edit animal form
const clearEditAnimalForm = () => {
    document.getElementById("editName").value = "";
    document.getElementById("editRace").value = "";
    document.getElementById("editFoodId").value = "";
    document.getElementById("editShelterId").value = "";
    document.getElementById("editStatus").value = "";
    document.getElementById("editSex").value = "";
    document.getElementById("editAge").value = "";
    document.getElementById("editWeight").value = "";
};
// Event listeners for form submissions and action changes
document.getElementById("action")?.addEventListener("change", handleActionChangeAn);
document.getElementById("addAnimalForm")?.addEventListener("submit", addAnimal);
document.getElementById("editAnimalForm")?.addEventListener("submit", editAnimal);
document.getElementById("deleteAnimalForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    deleteAnimal();
});
window.onload = async () => {
    await loadAnimal();
    // Set the action to "add" and handle the change
    const actionElement = document.getElementById("action");
    if (actionElement) {
        actionElement.value = "add";
        handleActionChangeAn();
    }
}