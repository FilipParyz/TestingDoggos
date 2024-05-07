// Use const for functions that won't be reassigned
const loadFood = async () => {
    try {
        const response = await fetch(`{{ url_for('handle_foods') }}`);
        const data = await response.json();

        const foodList = document.getElementById("foodList") as HTMLOptionElement;
        foodList.innerHTML = "";

        const foodOptions = document.getElementById("foodId") as HTMLOptionElement;
        foodOptions.innerHTML = "";

        const defaultOption = document.createElement("option");
        defaultOption.value = "-1";
        defaultOption.textContent = "Wybierz jedzenie";
        foodOptions.appendChild(defaultOption);

        data.forEach(food => {
            const foodItem = document.createElement("li");
            foodItem.textContent = `Name:: ${food.name}, Amount: ${food.amount}, Weight: ${food.weight}`;
            foodList.appendChild(foodItem);

            const foodOption = document.createElement("option");
            foodOption.value = food.id;
            foodOption.textContent = food.name;
            (document.getElementById("foodId") as HTMLInputElement).appendChild(foodOption);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

const handleActionChangeF = () => {
    const action = (document.getElementById("action") as HTMLInputElement).value;
    const addFoodForm = document.getElementById("addFoodForm") as HTMLFormElement;
    const editFoodForm = document.getElementById("editFoodForm") as HTMLFormElement;
    const deleteFoodForm = document.getElementById("deleteFoodForm") as HTMLFormElement;
    const existingFood = document.getElementById("existingFood") as HTMLDivElement;

    const isAddAction = action === "add";
    const isEditAction = action === "edit";
    const isDeleteAction = action === "delete";

    addFoodForm.style.display = isAddAction ? "block" : "none";
    editFoodForm.style.display = isEditAction ? "block" : "none";
    deleteFoodForm.style.display = isDeleteAction ? "block" : "none";
    existingFood.style.display = isAddAction ? "none" : "block";
}

const addFood = async (event: Event) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    let jsonObject: any = {};
    for (const [key, value] of formData.entries()) {
        jsonObject[key] = value;
    }
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

const deleteFood = async () => {
    const foodId = (document.getElementById("foodId") as HTMLInputElement).value;
    try {
        const response = await fetch(`{{ url_for('handle_foods') }}/` + foodId, {
            method: 'DELETE'
        });
        console.log(response);
        loadFood();
    } catch (error) {
        console.error('Error:', error);
    }
}

const editFood = async (event: Event) => {
    event.preventDefault();
    const foodId = (document.getElementById("foodId") as HTMLInputElement).value;
    const formData = new FormData(event.target as HTMLFormElement);
    let jsonObject: any = {};
    for (const [key, value] of formData.entries()) {
        jsonObject[key] = value;
    }
    try {
        const response = await fetch(`{{ url_for('handle_foods') }}/` + foodId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonObject)
        });
        console.log(response);
        loadFood();
    } catch (error) {
        console.error('Error:', error);
    }
}

window.onload = loadFood;
