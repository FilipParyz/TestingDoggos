onload = function() {
  loadOnClicks();
};

function loadOnClicks(){
  
    // Top menu \\
  // Logout 
  const logoutButton = document.getElementById('logout-button');
  logoutButton.addEventListener('click', () => {
    console.log('LogOut');
  });
  
  // Home(redirecting to index.html)
  

  // Support us
  const supportButton = document.getElementById('supportus-button');
  supportButton.addEventListener('click', () => {
    window.location.href = supportUsUrl;
  });


  // Animal profiles
  const animal = document.getElementById('Animal1');
  animal.addEventListener('click', () => {
    console.log('Animal');
  });

  // Search
  const searchButton = document.getElementById('search-button');
  searchButton.addEventListener('click', () => {
    console.log('Search');
  });

  // Animal Management 
  const animalButton = document.getElementById('pets-button');
  animalButton.addEventListener('click', () => {
    window.location.href = manageAnimalsUrl;
  });

  // Shelter Management
  const shelterButton = document.getElementById('shelters-button');
  shelterButton.addEventListener('click', () => {
    window.location.href = manageSheltersUrl;
  });

  // Food Management
  const foodButton = document.getElementById('food-button');
  foodButton.addEventListener('click', () => {
    console.log('Food');
    window.location.href = manageFoodUrl;
  });

  
}
