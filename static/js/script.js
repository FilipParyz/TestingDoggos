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
      // Przekieruj użytkownika na podstronę "Wesprzyj Nas"
    window.location.href = 'http://127.0.0.1:5000/support_us.html'; // Zmień adres URL na odpowiedni dla twojej aplikacji
  });
}
