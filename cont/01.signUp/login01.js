document.addEventListener("DOMContentLoaded", function () {
    const togglePassword = document.getElementById('togglePassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    const passwordInput = document.getElementById('first-pass');
    const confirmPasswordInput = document.getElementById('last-pass');

    // Function to set button styles
    const setInitialStyles = (btn) => {
        btn.style.opacity = '0';
        btn.style.transition = 'opacity 0.3s ease';
        btn.style.pointerEvents = 'none';
    };

    setInitialStyles(togglePassword);
    setInitialStyles(toggleConfirmPassword);

    // Set default type for password inputs
    passwordInput.setAttribute('type', 'password');
    confirmPasswordInput.setAttribute('type', 'password');

    // Show button when typing in the password input
    passwordInput.addEventListener('input', function () {
        const hasValue = passwordInput.value.length > 0;
        togglePassword.style.opacity = hasValue ? '1' : '0';
        togglePassword.style.pointerEvents = hasValue ? 'auto' : 'none';

        // Reset type to password and button text if input is empty
        if (!hasValue) {
            passwordInput.setAttribute('type', 'password');
            togglePassword.textContent = 'Show';
        }
    });

    // Show button when typing in the confirm password input
    confirmPasswordInput.addEventListener('input', function () {
        const hasValue = confirmPasswordInput.value.length > 0;
        toggleConfirmPassword.style.opacity = hasValue ? '1' : '0';
        toggleConfirmPassword.style.pointerEvents = hasValue ? 'auto' : 'none';

        // Reset type to password and button text if input is empty
        if (!hasValue) {
            confirmPasswordInput.setAttribute('type', 'password');
            toggleConfirmPassword.textContent = 'Show';
        }
    });

    // Toggle password visibility for the password input
    togglePassword.addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.textContent = type === 'password' ? 'Show' : 'Hide';
    });

    // Toggle password visibility for the confirm password input
    toggleConfirmPassword.addEventListener('click', function () {
        const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        confirmPasswordInput.setAttribute('type', type);
        this.textContent = type === 'password' ? 'Show' : 'Hide';
    });
});
