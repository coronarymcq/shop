document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.getElementById("loginButton");
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    passwordInput.style.transition = 'opacity 0.3s ease';
    const showPasswordBtn = document.querySelector('.show-password-btn');
    const lockIcon = document.querySelector('.fa-lock');
    const unlockIcon = document.querySelector('.fa-unlock');

    if (loginButton) {
        loginButton.addEventListener("click", function () {
            // Handle login
        });
    }

    // Initially show both icons
    lockIcon.style.opacity = '1';
    unlockIcon.style.opacity = '1';

    // Set initial styles for the show password button
    showPasswordBtn.style.opacity = '0';
    showPasswordBtn.style.transition = 'opacity 0.3s ease';
    showPasswordBtn.style.pointerEvents = 'none'; // Prevent interaction when hidden

    // Show button when typing and manage icon visibility
    passwordInput.addEventListener('input', function () {
        const hasValue = passwordInput.value.length > 0;
        showPasswordBtn.style.opacity = hasValue ? '1' : '0';
        showPasswordBtn.style.pointerEvents = hasValue ? 'auto' : 'none';

        // Manage icon visibility based on input
        if (hasValue) {
            unlockIcon.style.opacity = '1';  // Hide unlock icon when there's input
            lockIcon.style.opacity = '1';     // Show lock icon
        } else {
            unlockIcon.style.opacity = '1';   // Hide unlock icon when empty
            lockIcon.style.opacity = '1';     // Show lock icon when empty
            
            // Reset show button text and type
            togglePassword.textContent = 'Show';
            passwordInput.setAttribute('type', 'password'); // Reset to password type
        }

        // Always keep unlock icon visible while password is shown
        if (passwordInput.getAttribute('type') === 'text') {
            unlockIcon.style.opacity = '1';  
            lockIcon.style.opacity = '0';   // Hide lock icon when password is shown
        }
    });

    // Toggle password visibility and icon states when button is clicked
    togglePassword.addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Update the show button text based on current type
        this.textContent = type === 'password' ? 'Show' : 'Hide';
    
        // Handle icon visibility
        if (type === 'text') {
            lockIcon.style.opacity = '0';  // Hide lock icon smoothly
            unlockIcon.style.opacity = '1';  // Show unlock icon
        } else {
            lockIcon.style.opacity = '1';  // Show lock icon smoothly
            unlockIcon.style.opacity = '1';  // Hide unlock icon
        }
    });
    

    
});


