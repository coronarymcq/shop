document.addEventListener('DOMContentLoaded', function () {
  const firstNameInput = document.getElementById('first-name');
  const lastNameInput = document.getElementById('last-name');
  const usernameInput = document.getElementById('username');
  const nameMessageElement = document.getElementById('forbidden-message');  // For first and last names
  const usernameMessageElement = document.getElementById('forbidden-message1');  // For username
  const emailInput = document.getElementById("email");
  const errorMessage = document.getElementById("email-error-message");
  const firstPasswordInput = document.getElementById("first-pass");
  const secondPasswordInput = document.getElementById("last-pass");
  const strengthIndicator = document.getElementById("strength1");
  const matchMessage = document.getElementById("match-message");

  const forbiddenWordsEncoded = [
    'ZnVjaw==',     
    'c2hpdA==',     
    'Yml0Y2g=',     
    'cHVzc3k=',     
    'c2x1dA==',     
    'YXNz',         
    'ZGFtbg==',     
    'aG9l',         
    'Y3JhcA==',     
    'cGVuaXM=',     
    'dmFnaW5h',     
    'd2hvcmU=',     
    'ZGlja2hlYWQ=', 
    'YmFzdGFyZA==', 
    'Y3VudA==',     
    'c3Nob2xl',     
    'Y29ja2l0',     
    'Yml0Y2hpbGQ=', 
    'Z2F5',         
    'c2xhdmU=',     
    'bmlnZ2Vy',
    'bmlnZ2E=',
    'cHUkJHk=',
  ];

  const arabicForbiddenWords = [
    'زب', 'عاهرة', 'خنزير', 'حيوان', 'بنت الكلب', 'كس', 'شرموط', 'منيك', 'قحبة', 'غبي', 'حمار', 'زنجي', 
    'نيغا', 'نيغر', 'سكس', 'طيز', 'شرج', 'لعق', 'لحس', 'مص', 'تمص', 'بيضان', 'ثدي', 'بز', 'بزاز', 
    'حلمة', 'مفلقسة', 'بظر', 'فرج', 'شهوة', 'شاذ', 'مبادل', 'جماع', 'قضيب', 'لوطي', 'لواط', 'سحاق', 
    'سحاقية', 'اغتصاب', 'خنثي', 'احتلام', 'نيك', 'متناك', 'متناكة', 'عرص', 'خول', 'لبوة', 'حقير', 'كلب', 'وقح'
  ];

  function decodeBase64(encoded) {
    return atob(encoded);
  }

  const forbiddenWords = forbiddenWordsEncoded.map(decodeBase64);

  // Delay function
  let typingTimer;
  const typingDelay = 1100; // delay time in ms

  function checkForCussWordsWithDelay(inputField, messageElement) {
    clearTimeout(typingTimer); // Reset the timer on each input

    typingTimer = setTimeout(() => {
      checkForCussWords(inputField, messageElement);
    }, typingDelay);
  }

  function checkForCussWords(inputField, messageElement) {
    const value = inputField.value.trim().toLowerCase();
    messageElement.style.display = 'none';

    // Define the symbols you want to check for
    const boundarySymbols = '[_.$@&%#-+=!~?^]';

    // Check Arabic words directly
    for (const word of arabicForbiddenWords) {
        const arabicRegex = new RegExp(`(^|\\s|${boundarySymbols})${word}(${boundarySymbols}|$)`, 'i'); // Updated regex
        if (arabicRegex.test(value)) {
            messageElement.textContent = 'Please avoid using inappropriate language.';
            messageElement.style.display = 'block';
            inputField.value = ''; 
            return true;
        }
    }

    // Check base64 decoded forbidden words
    for (const word of forbiddenWords) {
        const regex = new RegExp(`(^|\\s|${boundarySymbols})${word}(${boundarySymbols}|$)`, 'i'); // Updated regex
        if (regex.test(value)) {
            messageElement.textContent = 'Please avoid using inappropriate language.';
            messageElement.style.display = 'block';
            inputField.value = ''; 
            return true;
        }
    }

    return false;
}


  function validateUsername(username) {
    const isValidLength = username.length >= 5 && username.length <= 15;
    const hasInvalidChars = /[^a-zA-Z0-9_]/.test(username);
    return isValidLength && !hasInvalidChars;
  }

  [firstNameInput, lastNameInput].forEach(inputField => {
    if (inputField) {
      inputField.addEventListener('input', function() {
        const isArabic = /[\u0600-\u06FF]/.test(this.value); // Check for Arabic characters
        this.style.textAlign = isArabic ? 'right' : 'left'; // Align right for Arabic, left for others
        this.style.direction = isArabic ? 'rtl' : 'ltr'; // Set direction to rtl for Arabic, ltr for others
  
        checkForCussWordsWithDelay(this, nameMessageElement);
      });
    }
  });
  

  if (usernameInput) {
    usernameInput.addEventListener("input", function () {
      usernameMessageElement.style.display = "none";

      if (!validateUsername(this.value)) {
        usernameMessageElement.textContent = "Username must be 5-15 characters long and can only contain English letters, numbers, and underscores (_).";
        usernameMessageElement.style.display = "block";
        return;
      }

      checkForCussWordsWithDelay(this, usernameMessageElement);
    });
  }

  if (emailInput) {
    emailInput.addEventListener("input", function () {
      const errorMessage = document.getElementById("email-error-message");

      const invalidEndings = /[.,?!~!@]$/;
      const endsWithCoNotCom = /\.co$/;

      if (invalidEndings.test(emailInput.value)) {
        errorMessage.textContent = "Invalid email.";
        errorMessage.style.display = "block";
      } else if (endsWithCoNotCom.test(emailInput.value)) {
        errorMessage.textContent = "Invalid email.";
        errorMessage.style.display = "block";
      } else if (!emailInput.checkValidity()) {
        errorMessage.textContent = "Email must contain an '@' symbol and a dot.";
        errorMessage.style.display = "block";
      } else {
        errorMessage.style.display = "none";
      }
    });
  }

  function updateStrengthIndicator(passwordInput, strengthIndicator) {
    const password = passwordInput.value;
    if (password.length === 0) {
      strengthIndicator.textContent = "";
      return;
    }
  
    let strength = 'Weak';
    let color = 'red';
  
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light'; // Check current theme
  
    if (password.length < 5) {
      strength = "Password too short.";
      color = "red";
    } else {
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumbers = /[0-9]/.test(password);
      const hasSpecialChars = /[\W_]/.test(password);
      
      const isLong = password.length >= 8;
  
      if (hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars && isLong) {
        strength = 'Strong';
        color = currentTheme === 'dark' ? 'lightgreen' : 'green';  // Adjust color based on theme
      } else if ((hasUpperCase || hasLowerCase) && hasNumbers && (password.length >= 7 || hasSpecialChars)) {
        strength = 'Medium';
        color = 'orange';
      } else {
        strength = 'Weak';
        color = 'red';
      }
    }
  
    strengthIndicator.textContent = strength;
    strengthIndicator.style.color = color;
  }
  

  function checkPasswordMatch(firstInput, secondInput, messageElement) {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';  // Check current theme
  
    if (secondInput.value) {
      if (!firstInput.value) {
        messageElement.textContent = "Fill the password field first.";
        messageElement.style.color = "red";
      } else if (firstInput.value === secondInput.value) {
        messageElement.textContent = "Passwords match.";
        messageElement.style.color = currentTheme === 'dark' ? 'lightgreen' : 'green';  // Adjust color based on theme
      } else {
        messageElement.textContent = "Passwords do not match.";
        messageElement.style.color = "red";
      }
    } else {
      messageElement.textContent = "";
    }
  }
  

  if (firstPasswordInput && secondPasswordInput && strengthIndicator && matchMessage) {
    firstPasswordInput.addEventListener("input", function () {
      updateStrengthIndicator(this, strengthIndicator);
      checkPasswordMatch(this, secondPasswordInput, matchMessage);
    });

    secondPasswordInput.addEventListener("input", function () {
      checkPasswordMatch(firstPasswordInput, this, matchMessage);
    });
  }
});


function goHome() {
  sessionStorage.clear(); // Clear sessionStorage when navigating to home
  window.location.href = '../../index.html'; // Always go to the main index page
}

// Attach the click event to the logo
logo.onclick = function() {
  goHome(); // This will navigate to home
  fetchContent('home'); // Simulate loading home content
};