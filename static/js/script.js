onload = function() {
  loadOnClicks();
};

function loadOnClicks(){
  
  // Top menu
  const ouranimalsButton = document.getElementById('ourpets-button');
  ouranimalsButton.addEventListener('click', () => {
    window.location.href = manageAnimalsUrl;
  });
  const logoutButton = document.getElementById('logout-button');
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

  // Shelter profiles
  const shelterButton = document.getElementById('shelters-button');
  shelterButton.addEventListener('click', () => {
    window.location.href = manageSheltersUrl;
  });

  // Food
  const foodButton = document.getElementById('food-button');
  foodButton.addEventListener('click', () => {
    window.location.href = manageFoodUrl;
  });

  // Support us
  const supportButton = document.getElementById('supportus-button');
  supportButton.addEventListener('click', () => {
    window.location.href = supportUsUrl;
  });
}
