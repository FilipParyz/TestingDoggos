/*window.onload = function() {
    loadFood();
};

function loadFood() {
    fetch(`{{ url_for('handle_foods') }}`)
        .then(response => response.json())
        .then(data => {
            let foodList = document.getElementById("foodList") as HTMLOptionElement;
            foodList.innerHTML = "";
            
            let foodOptions = document.getElementById("foodId") as HTMLOptionElement;
            foodOptions.innerHTML = "";

            // Dodaj domyślną opcję wyboru
            let defaultOption = document.createElement("option");
            defaultOption.value = "-1";
            defaultOption.textContent = "Wybierz jedzenie";
            foodOptions.appendChild(defaultOption);

            data.forEach(food => {
                let foodItem = document.createElement("li");
                foodItem.textContent = `Name:: ${food.name}, Amount: ${food.amount}, Weight: ${food.weight}`;
                foodList.appendChild(foodItem);

                let foodOption = document.createElement("option");
                foodOption.value = food.id;
                foodOption.textContent = food.name;
                (document.getElementById("foodId")as HTMLInputElement ).appendChild(foodOption);
            });
        })
        .catch(error => console.error('Error:', error));
}

function handleActionChange() {
    let action = (document.getElementById("action") as HTMLInputElement).value;
    let addFoodForm = document.getElementById("addFoodForm") as HTMLFormElement;
    let editFoodForm = document.getElementById("editFoodForm")as HTMLFormElement;
    let deleteFoodForm = document.getElementById("deleteFoodForm")as HTMLFormElement;
    let existingFood = document.getElementById("existingFood") as HTMLDivElement;

    if (action === "add") {
        addFoodForm.style.display = "block";
        editFoodForm.style.display = "none";
        deleteFoodForm.style.display = "none";
        existingFood.style.display = "none";
    } else {
        if (action === "edit") {
            addFoodForm.style.display = "none";
            editFoodForm.style.display = "block";
            deleteFoodForm.style.display = "none";
        } else if (action === "delete") {
            addFoodForm.style.display = "none";
            editFoodForm.style.display = "none";
            deleteFoodForm.style.display = "block";
        }
        existingFood.style.display = "block";
    }
}

function addFood(event: Event) {
    event.preventDefault();
    let formData = new FormData(event.target as HTMLFormElement);
    let jsonObject: any = {};
    for (const [key, value]  of formData.entries()) {
        jsonObject[key] = value;
    }
    fetch(`{{ url_for('handle_foods') }}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonObject)
    }).then(response => response.json())
    .then( data => {
        console.log(data)
        loadFood();
    })
    .catch(error => console.error('Error:', error));
};

function deleteFood() {
    let foodId = (document.getElementById("foodId")as HTMLInputElement).value;
    fetch(`{{ url_for('handle_foods') }}/`+foodId, {
        method: 'DELETE'
    })
    .then(response => console.log(response))
    .then(data => {
        console.log(data);
        loadFood();
    })
    .catch(error => console.error('Error:', error));
}

function editFood(event: Event) {
    event.preventDefault();
    let foodId = (document.getElementById("foodId")as HTMLInputElement).value;
    let formData = new FormData(event.target as HTMLFormElement);
    let jsonObject: any = {};
    for (const [key, value] of formData.entries()) {
        jsonObject[key] = value;
    }
    fetch(`{{ url_for('handle_foods') }}/`+foodId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonObject)
    })
    .then(response => console.log(response))
    .then(data => {
        console.log(data);
        loadFood();
    })
    .catch(error => console.error('Error:', error));
}*/