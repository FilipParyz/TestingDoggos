// Function to load animals from the server and populate the list and dropdown
const loadAnimal = async () => {
    try {
        const response = await fetch(`{{ url_for('handle_animals') }}`);
        const data = await response.json();

        const animalList = document.getElementById("animalList") as HTMLUListElement;
        animalList.innerHTML = "";
        
        const animalOptions = document.getElementById("animalId") as HTMLSelectElement;
        animalOptions.innerHTML = "";

        // Add default option
        const defaultOption = document.createElement("option");
        defaultOption.value = "-1";
        defaultOption.textContent = "Select an animal";
        animalOptions.appendChild(defaultOption);

        data.forEach((animal: {
            id: string; name: string; race: string; food_id: string;
            shelter_id: string; status: string; sex: string;
            age: number; weight: number;
        }) => {
            const animalItem = document.createElement("li");
            animalItem.textContent = `Name: ${animal.name}, Race: ${animal.race}, Food_id: ${animal.food_id}, Shelter_id: ${animal.shelter_id}, Status: ${animal.status}, Sex: ${animal.sex}, Age: ${animal.age}, Weight: ${animal.weight}`;
            animalList.appendChild(animalItem);

            const animalOption = document.createElement("option");
            animalOption.value = animal.id;
            animalOption.textContent = animal.name;
            animalOptions.appendChild(animalOption);
        });
    } catch (error) {
        console.error('Error:', error);
    }
};

// Function to handle action changes and display the corresponding form
const handleActionChangeAm = () => {
    const action = (document.getElementById("action") as HTMLSelectElement).value;
    const addAnimalForm = document.getElementById("addAnimalForm") as HTMLFormElement;
    const editAnimalForm = document.getElementById("editAnimalForm") as HTMLFormElement;
    const deleteAnimalForm = document.getElementById("deleteAnimalForm") as HTMLFormElement;
    const existingAnimal = document.getElementById("existingAnimal") as HTMLDivElement;

    addAnimalForm.style.display = action === "add" ? "block" : "none";
    editAnimalForm.style.display = action === "edit" ? "block" : "none";
    deleteAnimalForm.style.display = action === "delete" ? "block" : "none";
    existingAnimal.style.display = action === "add" ? "none" : "block";

    if (action === "edit") {
        const selectedAnimalId = (document.getElementById("animalId") as HTMLSelectElement).value;
        if (selectedAnimalId !== "-1") {
            fetchAnimalData(selectedAnimalId);
        }
    }
};

// Function to fetch data of a selected animal for editing
const fetchAnimalData = async (animalId: string) => {
    try {
        const response = await fetch(`{{ url_for('handle_animals') }}/${animalId}`);
        const data = await response.json();
        
        (document.getElementById("editName") as HTMLInputElement).value = data.name;
        (document.getElementById("editRace") as HTMLInputElement).value = data.race;
        (document.getElementById("editFoodId") as HTMLInputElement).value = data.food_id;
        (document.getElementById("editShelterId") as HTMLInputElement).value = data.shelter_id;
        (document.getElementById("editStatus") as HTMLInputElement).value = data.status;
        (document.getElementById("editSex") as HTMLInputElement).value = data.sex;
        (document.getElementById("editAge") as HTMLInputElement).value = data.age.toString();
        (document.getElementById("editWeight") as HTMLInputElement).value = data.weight.toString();
    } catch (error) {
        console.error('Error:', error);
    }
};

// Function to add a new animal
const addAnimal = async (event: Event) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const jsonObject: { [key: string]: any } = {};
    formData.forEach((value, key) => { jsonObject[key] = value });

    try {
        const response = await fetch(`{{ url_for('handle_animals') }}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonObject)
        });
        const data = await response.json();
        console.log(data);
        loadAnimal();
    } catch (error) {
        console.error('Error:', error);
    }

    (event.target as HTMLFormElement).reset();
};

// Function to delete an animal
const deleteAnimal = async () => {
    const animalId = (document.getElementById("animalId") as HTMLSelectElement).value;
    if (animalId === "-1") {
        alert("Select an animal to delete!");
        return;
    }

    try {
        const response = await fetch(`{{ url_for('handle_animals') }}/${animalId}`, {
            method: 'DELETE'
        });
        console.log(response);
        loadAnimal();
    } catch (error) {
        console.error('Error:', error);
    }
};

// Function to edit an existing animal
const editAnimal = async (event: Event) => {
    event.preventDefault();
    const animalId = (document.getElementById("animalId") as HTMLSelectElement).value;
    if (animalId === "-1") {
        alert("Select an animal to edit!");
        return;
    }

    const formData = new FormData(event.target as HTMLFormElement);
    const jsonObject: { [key: string]: any } = {};
    formData.forEach((value, key) => { jsonObject[key] = value });

    try {
        const response = await fetch(`{{ url_for('handle_animals') }}/${animalId}`, {
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
    } catch (error) {
        console.error('Error:', error);
    }
};

// Function to clear the edit animal form
const clearEditAnimalForm = () => {
    (document.getElementById("editName") as HTMLInputElement).value = "";
    (document.getElementById("editRace") as HTMLInputElement).value = "";
    (document.getElementById("editFoodId") as HTMLInputElement).value = "";
    (document.getElementById("editShelterId") as HTMLInputElement).value = "";
    (document.getElementById("editStatus") as HTMLInputElement).value = "";
    (document.getElementById("editSex") as HTMLInputElement).value = "";
    (document.getElementById("editAge") as HTMLInputElement).value = "";
    (document.getElementById("editWeight") as HTMLInputElement).value = "";
};

// Event listeners for form submissions and action changes
document.getElementById("action")?.addEventListener("change", handleActionChangeAm);
document.getElementById("addAnimalForm")?.addEventListener("submit", addAnimal);
document.getElementById("editAnimalForm")?.addEventListener("submit", editAnimal);
document.getElementById("deleteAnimalForm")?.addEventListener("submit", (event: Event) => {
    event.preventDefault();
    deleteAnimal();
});

window.onload = loadAnimal;