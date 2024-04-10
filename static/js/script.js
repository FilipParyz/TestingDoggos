onload = function() {
  loadOnClicks();
};

function loadOnClicks(){
  const searchButton = document.getElementById('search-button');
  const ourAnimalsButton = document.getElementById('Ourpets');
  const supportButton = document.getElementById('SupportUs');
  const shelterButton = document.getElementById('shelters-button');
  const logoutButton = document.getElementById('LogUt');
  const foodButton = document.getElementById('food-button');
  
  foodButton.addEventListener('click', () => {
    window.location.href = manageFoodUrl;
  });
  //Profiles

  //search

  searchButton.addEventListener('click', () => {
    console.log('Search');
  });
  //top menu
  ourAnimalsButton.addEventListener('click', () => {
    window.location.href = manageAnimalsUrl;
  });
  supportButton.addEventListener('click', () => {
    window.location.href = supportUsUrl;
  });
  shelterButton.addEventListener('click', () => {
    window.location.href = manageSheltersUrl;
  });
  logoutButton.addEventListener('click', () => {
    console.log('LogOut');
  });

  // Animal profiles
  const animal = document.getElementById('Animal1');
  const searchButton = document.getElementById('search-button');
  animal.addEventListener('click', () => {
    console.log('Animal');
  });
  searchButton.addEventListener('click', () => {
    console.log('Search');
  });
}
