onload = function() {
  loadOnClicks();
};

function loadOnClicks(){
 // const animal = document.getElementById('Animal1');
  const searchButton = document.getElementById('search-button');
  const ourAnimalsButton = document.getElementById('Ourpets');
  const supportButton = document.getElementById('SupportUs');
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
  logoutButton.addEventListener('click', () => {
    console.log('LogOut');
  });
  supportButton.addEventListener('click', () => {
      window.location.href = supportUsUrl;
  });
}
