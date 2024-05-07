// Use const for functions that won't be reassigned
const loadShelters = async () => {
    try {
        const response = await fetch(`{{ url_for('handle_shelters') }}`);
        const data = await response.json();

        const sheltersList = document.getElementById("sheltersList") as HTMLOptionElement;
        sheltersList.innerHTML = "";

        const sheltersOptions = document.getElementById("shelterId") as HTMLOptionElement;
        sheltersOptions.innerHTML = "";

        const defaultOption = document.createElement("option");
        defaultOption.value = "-1";
        defaultOption.textContent = "Select a shelter";
        sheltersOptions.appendChild(defaultOption);

        data.forEach(shelter => {
            const shelterItem = document.createElement("li");
            shelterItem.textContent = `Name: ${shelter.name}, Amount: ${shelter.amount}, Capacity: ${shelter.capacity}`;
            sheltersList.appendChild(shelterItem);

            const shelterOption = document.createElement("option");
            shelterOption.value = shelter.id;
            shelterOption.textContent = shelter.name;
            (document.getElementById("shelterId") as HTMLInputElement).appendChild(shelterOption);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

const handleActionChangeS = () => {
    const action = (document.getElementById("action") as HTMLInputElement).value;
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
}

const addShelter = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    let jsonObject = {};
    for (const [key, value] of formData.entries()) {
        jsonObject[key] = value;
    }
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

const deleteShelter = async () => {
    const shelterId = (document.getElementById("shelterId") as HTMLInputElement).value;
    try {
        const response = await fetch(`{{ url_for('handle_shelters') }}/` + shelterId, {
            method: 'DELETE'
        });
        console.log(response);
        loadShelters();
    } catch (error) {
        console.error('Error:', error);
    }
}

const editShelter = async (event) => {
    event.preventDefault();
    const shelterId = (document.getElementById("shelterId") as HTMLInputElement).value;
    const formData = new FormData(event.target);
    let jsonObject = {};
    for (const [key, value] of formData.entries()) {
        jsonObject[key] = value;
    }
    try {
        const response = await fetch(`{{ url_for('handle_shelters') }}/` + shelterId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonObject)
        });
        console.log(response);
        loadShelters();
    } catch (error) {
        console.error('Error:', error);
    }
}

window.onload = loadShelters;
