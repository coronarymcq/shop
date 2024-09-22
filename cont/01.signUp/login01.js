document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.getElementById("loginButton");
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const showPasswordBtn = document.querySelector('.show-password-btn');
  
    if (loginButton) {
        loginButton.addEventListener("click", function () {
            // Handle login
        });
    }
  
    // Set initial styles for the show password button
    showPasswordBtn.style.opacity = '0'; 
    showPasswordBtn.style.transition = 'opacity 0.3s ease';
    showPasswordBtn.style.pointerEvents = 'none'; // Prevent interaction when hidden
  
    // Show button when typing
    passwordInput.addEventListener('input', function () {
        const hasValue = passwordInput.value.length > 0;
        showPasswordBtn.style.opacity = hasValue ? '1' : '0';
        showPasswordBtn.style.pointerEvents = hasValue ? 'auto' : 'none';
    });
  
    // Toggle password visibility when button is clicked
    togglePassword.addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.textContent = type === 'password' ? 'Show' : 'Hide';
    });
  });
  