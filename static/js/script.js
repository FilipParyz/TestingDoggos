onload = function() {
  loadOnClicks();
};

function loadOnClicks(){
  const animal = document.getElementById('Animal1');
  const searchButton = document.getElementById('search-button');
  const ourAnimalsButton = document.getElementById('Ourpets');
  const supportButton = document.getElementById('SupportUs');
  const logoutButton = document.getElementById('LogUt');
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
  logoutButton.addEventListener('click', () => {
    console.log('LogOut');
  });
  supportButton.addEventListener('click', () => {
      window.location.href = supportUsUrl;
  });
}
