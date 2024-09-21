document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.getElementById("loginButton");
  if (loginButton) {
      loginButton.addEventListener("click", function () {
          // Handle login
      });
  }

  // Show password functionality
  const togglePassword = document.getElementById('togglePassword');
  const passwordInput = document.getElementById('password');
  const showPasswordBtn = document.querySelector('.show-password-btn');

  // Hide button initially
  showPasswordBtn.style.visibility = 'hidden'; 

  // Show button when typing
  passwordInput.addEventListener('input', function () {
      showPasswordBtn.style.visibility = passwordInput.value ? 'visible' : 'hidden';
  });

  // Toggle password visibility when button is clicked
  togglePassword.addEventListener('click', function () {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      this.textContent = type === 'password' ? 'Show' : 'Hide';
  });
});
