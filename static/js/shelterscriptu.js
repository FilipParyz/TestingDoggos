"use strict";
// Fetch and display shelters data
const loadShelters = async () => {
    try {
        const response = await fetch(`shelters`);
        const data = await response.json();
        const sheltersList = document.getElementById("sheltersList");
        sheltersList.innerHTML = "";
        const sheltersOptions = document.getElementById("shelterId");
        sheltersOptions.innerHTML = "";
        const defaultOption = document.createElement("option");
        defaultOption.value = "-1";
        defaultOption.textContent = "Select a shelter";
        sheltersOptions.appendChild(defaultOption);
        data.forEach((shelter) => {
            const shelterItem = document.createElement("li");
            shelterItem.textContent = `Name: ${shelter.name}, Amount: ${shelter.amount}, Capacity: ${shelter.capacity}`;
            sheltersList.appendChild(shelterItem);
            const shelterOption = document.createElement("option");
            shelterOption.value = shelter.id;
            shelterOption.textContent = shelter.name;
            sheltersOptions.appendChild(shelterOption);
        });
    }
    catch (error) {
        console.error('Error:', error);
    }
};
// Handle action change (add, edit, delete)
const handleActionChangeSh = () => {
    const action = document.getElementById("action").value;
    const addShelterForm = document.getElementById("addShelterForm");
    const editShelterForm = document.getElementById("editShelterForm");
    const deleteShelterForm = document.getElementById("deleteShelterForm");
    const existingShelters = document.getElementById("existingShelters");
    const isAddAction = action === "add";
    const isEditAction = action === "edit";
    const isDeleteAction = action === "delete";
    addShelterForm.style.display = isAddAction ? "block" : "none";
    editShelterForm.style.display = isEditAction ? "block" : "none";
    deleteShelterForm.style.display = isDeleteAction ? "block" : "none";
    existingShelters.style.display = isAddAction ? "none" : "block";
    if (isEditAction) {
        loadSelectedShelterData();
    }
};
// Load data for the selected shelter item for editing
const loadSelectedShelterData = async () => {
    const selectedShelterId = document.getElementById("shelterId").value;
    if (selectedShelterId !== "-1") {
        try {
            const response = await fetch(`shelters/${selectedShelterId}`);
            const data = await response.json();
            document.getElementById("editName").value = data.name;
            document.getElementById("editAmount").value = data.amount;
            document.getElementById("editCapacity").value = data.capacity;
        }
        catch (error) {
            console.error('Error:', error);
        }
    }
};
// Add new shelter
const addShelter = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    let jsonObject = {};
    formData.forEach((value, key) => { jsonObject[key] = value; });
    try {
        const response = await fetch(`shelters`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonObject)
        });
        const data = await response.json();
        console.log(data);
        loadShelters();
    }
    catch (error) {
        console.error('Error:', error);
    }
};
// Delete shelter
const deleteShelter = async () => {
    const shelterId = document.getElementById("shelterId").value;
    try {
        const response = await fetch(`shelters/${shelterId}`, {
            method: 'DELETE'
        });
        console.log(response);
        loadShelters();
    }
    catch (error) {
        console.error('Error:', error);
    }
};
// Edit shelter
const editShelter = async (event) => {
    event.preventDefault();
    const shelterId = document.getElementById("shelterId").value;
    const formData = new FormData(event.target);
    let jsonObject = {};
    formData.forEach((value, key) => { jsonObject[key] = value; });
    try {
        const response = await fetch(`shelters/${shelterId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonObject)
        });
        const data = await response.json();
        console.log(data);
        loadShelters();
        clearEditFormSh();
    }
    catch (error) {
        console.error('Error:', error);
    }
};
// Clear the edit form fields
const clearEditFormSh = () => {
    document.getElementById("editName").value = "";
    document.getElementById("editAmount").value = "";
    document.getElementById("editCapacity").value = "";
};
// Event listeners for action change and form submissions
document.getElementById("action")?.addEventListener("change", handleActionChangeSh);
document.getElementById("addShelterForm")?.addEventListener("submit", addShelter);
document.getElementById("editShelterForm")?.addEventListener("submit", editShelter);
document.getElementById("deleteShelterForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    deleteShelter();
});
window.onload = async () => {
    await loadShelters();
    const actionElement = document.getElementById("action");
    if (actionElement) {
        actionElement.value = "add";
        handleActionChangeSh();
    }
};