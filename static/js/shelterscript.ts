// Fetch and display shelters data
const loadShelters = async () => {
    try {
        const response = await fetch(`{{ url_for('handle_shelters') }}`);
        const data = await response.json();

        const sheltersList = document.getElementById("sheltersList") as HTMLElement;
        sheltersList.innerHTML = "";

        const sheltersOptions = document.getElementById("shelterId") as HTMLSelectElement;
        sheltersOptions.innerHTML = "";

        const defaultOption = document.createElement("option");
        defaultOption.value = "-1";
        defaultOption.textContent = "Select a shelter";
        sheltersOptions.appendChild(defaultOption);

        data.forEach((shelter: { id: string; name: string; amount: number; capacity: number }) => {
            const shelterItem = document.createElement("li");
            shelterItem.textContent = `Name: ${shelter.name}, Amount: ${shelter.amount}, Capacity: ${shelter.capacity}`;
            sheltersList.appendChild(shelterItem);

            const shelterOption = document.createElement("option");
            shelterOption.value = shelter.id;
            shelterOption.textContent = shelter.name;
            sheltersOptions.appendChild(shelterOption);
        });
    } catch (error) {
        console.error('Error:', error);
    }
};

// Handle action change (add, edit, delete)
const handleActionChangeSh = () => {
    const action = (document.getElementById("action") as HTMLSelectElement).value;
    const addShelterForm = document.getElementById("addShelterForm") as HTMLFormElement;
    const editShelterForm = document.getElementById("editShelterForm") as HTMLFormElement;
    const deleteShelterForm = document.getElementById("deleteShelterForm") as HTMLFormElement;
    const existingShelters = document.getElementById("existingShelters") as HTMLDivElement;

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
    const selectedShelterId = (document.getElementById("shelterId") as HTMLSelectElement).value;
    if (selectedShelterId !== "-1") {
        try {
            const response = await fetch(`{{ url_for('handle_shelters') }}/${selectedShelterId}`);
            const data = await response.json();

            (document.getElementById("editName") as HTMLInputElement).value = data.name;
            (document.getElementById("editAmount") as HTMLInputElement).value = data.amount;
            (document.getElementById("editCapacity") as HTMLInputElement).value = data.capacity;
        } catch (error) {
            console.error('Error:', error);
        }
    }
};

// Add new shelter
const addShelter = async (event: Event) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    let jsonObject: { [key: string]: any } = {};
    formData.forEach((value, key) => { jsonObject[key] = value });

    try {
        const response = await fetch(`{{ url_for('handle_shelters') }}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonObject)
        });
        const data = await response.json();
        console.log(data);
        loadShelters();
    } catch (error) {
        console.error('Error:', error);
    }
};

// Delete shelter
const deleteShelter = async () => {
    const shelterId = (document.getElementById("shelterId") as HTMLSelectElement).value;
    try {
        const response = await fetch(`{{ url_for('handle_shelters') }}/${shelterId}`, {
            method: 'DELETE'
        });
        console.log(response);
        loadShelters();
    } catch (error) {
        console.error('Error:', error);
    }
};

// Edit shelter
const editShelter = async (event: Event) => {
    event.preventDefault();
    const shelterId = (document.getElementById("shelterId") as HTMLSelectElement).value;
    const formData = new FormData(event.target as HTMLFormElement);
    let jsonObject: { [key: string]: any } = {};
    formData.forEach((value, key) => { jsonObject[key] = value });

    try {
        const response = await fetch(`{{ url_for('handle_shelters') }}/${shelterId}`, {
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
    } catch (error) {
        console.error('Error:', error);
    }
};

// Clear the edit form fields
const clearEditFormSh = () => {
    (document.getElementById("editName") as HTMLInputElement).value = "";
    (document.getElementById("editAmount") as HTMLInputElement).value = "";
    (document.getElementById("editCapacity") as HTMLInputElement).value = "";
};

// Event listeners for action change and form submissions
document.getElementById("action")?.addEventListener("change", handleActionChangeSh);
document.getElementById("addShelterForm")?.addEventListener("submit", addShelter);
document.getElementById("editShelterForm")?.addEventListener("submit", editShelter);
document.getElementById("deleteShelterForm")?.addEventListener("submit", (event: Event) => {
    event.preventDefault();
    deleteShelter();
});

window.onload = loadShelters;