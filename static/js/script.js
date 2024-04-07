onload = function() {
  loadOnClicks();
};

function loadOnClicks(){
  // Menu buttons
  const ourAnimalsButton = document.getElementById('Ourpets');
  const supportButton = document.getElementById('SupportUs');
  const shelterButton = document.getElementById('shelters-button');
  const logoutButton = document.getElementById('LogUt');
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
