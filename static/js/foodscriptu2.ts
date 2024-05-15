// Fetch and display food data
const loadFood = async () => {
    try {
        const response = await fetch(`{{ url_for('handle_foods') }}`);
        const data = await response.json();

        const foodList = document.getElementById("foodList") as HTMLElement;
        foodList.innerHTML = "";

        const foodOptions = document.getElementById("foodId") as HTMLSelectElement;
        foodOptions.innerHTML = "";

        const defaultOption = document.createElement("option");
        defaultOption.value = "-1";
        defaultOption.textContent = "Choose food";
        foodOptions.appendChild(defaultOption);

        data.forEach((food: { id: string; name: string; amount: number; weight: number }) => {
            const foodItem = document.createElement("li");
            foodItem.textContent = `Name: ${food.name}, Amount: ${food.amount}, Weight: ${food.weight}`;
            foodList.appendChild(foodItem);

            const foodOption = document.createElement("option");
            foodOption.value = food.id;
            foodOption.textContent = food.name;
            foodOptions.appendChild(foodOption);
        });
    } catch (error) {
        console.error('Error:', error);
    }
};

// Handle action change (add, edit, delete)
const handleActionChangeFd = () => {
    const action = (document.getElementById("action") as HTMLSelectElement).value;
    const addFoodForm = document.getElementById("addFoodForm") as HTMLFormElement;
    const editFoodForm = document.getElementById("editFoodForm") as HTMLFormElement;
    const deleteFoodForm = document.getElementById("deleteFoodForm") as HTMLFormElement;
    const existingFood = document.getElementById("existingFood") as HTMLDivElement;

    if (action === "add") {
        addFoodForm.style.display = "block";
        editFoodForm.style.display = "none";
        deleteFoodForm.style.display = "none";
        existingFood.style.display = "none";
    } else {
        existingFood.style.display = "block";
        if (action === "edit") {
            addFoodForm.style.display = "none";
            editFoodForm.style.display = "block";
            deleteFoodForm.style.display = "none";
            loadSelectedFoodData();
        } else if (action === "delete") {
            addFoodForm.style.display = "none";
            editFoodForm.style.display = "none";
            deleteFoodForm.style.display = "block";
        }
    }
};

// Load data for the selected food item for editing
const loadSelectedFoodData = async () => {
    const selectedFoodId = (document.getElementById("foodId") as HTMLSelectElement).value;
    if (selectedFoodId !== "-1") {
        try {
            const response = await fetch(`{{ url_for('handle_foods') }}/${selectedFoodId}`);
            const data = await response.json();

            (document.getElementById("editName") as HTMLInputElement).value = data.name;
            (document.getElementById("editAmount") as HTMLInputElement).value = data.amount;
            (document.getElementById("editWeight") as HTMLInputElement).value = data.weight;
        } catch (error) {
            console.error('Error:', error);
        }
    }
};

// Add new food item
const addFood = async (event: Event) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    let jsonObject: { [key: string]: any } = {};
    formData.forEach((value, key) => { jsonObject[key] = value });

    try {
        const response = await fetch(`{{ url_for('handle_foods') }}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonObject)
        });
        const data = await response.json();
        console.log(data);
        loadFood();
    } catch (error) {
        console.error('Error:', error);
    }
};

// Delete food item
const deleteFood = async () => {
    const foodId = (document.getElementById("foodId") as HTMLSelectElement).value;
    try {
        const response = await fetch(`{{ url_for('handle_foods') }}/${foodId}`, {
            method: 'DELETE'
        });
        console.log(response);
        loadFood();
    } catch (error) {
        console.error('Error:', error);
    }
};

// Edit food item
const editFood = async (event: Event) => {
    event.preventDefault();
    const foodId = (document.getElementById("foodId") as HTMLSelectElement).value;
    const formData = new FormData(event.target as HTMLFormElement);
    let jsonObject: { [key: string]: any } = {};
    formData.forEach((value, key) => { jsonObject[key] = value });

    try {
        const response = await fetch(`{{ url_for('handle_foods') }}/${foodId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonObject)
        });
        const data = await response.json();
        console.log(data);
        loadFood();
        clearEditFormFd();
    } catch (error) {
        console.error('Error:', error);
    }
};

// Clear the edit form fields
const clearEditFormFd = () => {
    (document.getElementById("editName") as HTMLInputElement).value = "";
    (document.getElementById("editAmount") as HTMLInputElement).value = "";
    (document.getElementById("editWeight") as HTMLInputElement).value = "";
};

// Event listeners for action change and form submissions
document.getElementById("action")?.addEventListener("change", handleActionChangeFd);
document.getElementById("addFoodForm")?.addEventListener("submit", addFood);
document.getElementById("editFoodForm")?.addEventListener("submit", editFood);
document.getElementById("deleteFoodForm")?.addEventListener("submit", (event: Event) => {
    event.preventDefault();
    deleteFood();
});
// Load food data when the window loads
window.onload = loadFood;