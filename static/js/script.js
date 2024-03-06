onload = function() {
  // Fetch all animals
  fetchAllAnimals();
  loadOnClicks();
};

function fetchAllAnimals() {
  const url = 'http://127.0.0.1:5000/animals';
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        if (i > 5) {
          break;
        } else{
          console.log('Animal:', data[i]);
          animal = document.getElementsByClassName('PictureProfile'+(i+1))[0];
          paragraph = document.createElement('p');
          paragraph.innerHTML = "Name: " + data[i].name;
          animal.appendChild(paragraph);
          
          paragraph = document.createElement('p');
          paragraph.innerHTML = "Age: " + data[i].age;
          animal.appendChild(paragraph);
        }
      }
      console.log('All animals:', data);
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
}

function loadOnClicks(){
  const animal = document.getElementById('Animal1');//✔️
  const searchButton = document.getElementById('Search');//✔️
  const ourAnimalsButton = document.getElementById('Ourpets');//✔️
  const supportButton = document.getElementById('SupportUs');//✔️
  const contactButton = document.getElementById('ContactUs');//✔️
  const logoutButton = document.getElementById('LogUt');//✔️
  const foodButton = document.getElementById('Food');//✔️
  const pettsButton = document.getElementById('Pets');//✔️

  //Profiles
  animal.addEventListener('click', () => {
    console.log('Animal');
  });
  //search
  searchButton.addEventListener('click', () => {
    console.log('Search');
  });
  //top menu
  ourAnimalsButton.addEventListener('click', () => {
    console.log('OurAnimals');
  });
  contactButton.addEventListener('click', () => {
    console.log('ContactUs');
  });
  supportButton.addEventListener('click', () => {
    console.log('SupportUs');
  });
  logoutButton.addEventListener('click', () => {
    console.log('LogOut');
  });

  //side menu
  foodButton.addEventListener('click', () => {
    console.log('Food');
  });
  pettsButton.addEventListener('click', () => {
    console.log('Pets');
  });
}
