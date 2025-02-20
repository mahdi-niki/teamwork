const form = document.querySelector('form');
const emailInput = document.querySelector('input[type="email"]');
const passwordInput = document.querySelector('input[type="password"]');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  
  if (!isEmailRegistered(email)) {
    alert('Please sign up first!');
    return;
  }

 
  if (!isPasswordValid(password)) {
    alert('Invalid password. Please try again.');
    return;
  }

  
  window.location.href = 'dashboard.html';
});

function isEmailRegistered(email) {
  
  return false;
}

function isPasswordValid(password) {
  
  return true;
}