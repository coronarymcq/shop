document.addEventListener('DOMContentLoaded', function() {
  const firstNameInput = document.getElementById('first-name');
  const lastNameInput = document.getElementById('last-name');
  const messageElement = document.getElementById('forbidden-message');

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

  // Decode Base64
  function decodeBase64(encoded) {
    return atob(encoded);
  }

  const forbiddenWords = forbiddenWordsEncoded.map(decodeBase64);

  // List of forbidden Arabic words
  const arabicForbiddenWords = [
    'زب',         // Example word 1
    'عاهرة',     // Example word 2 (whore)
    'خنزير',     // Example word 3 (pig)
    'حيوان',      // Example word 4 (animal)
    'بنت الكلب',  // Example word 5 (daughter of a dog)
    'كس',
    'شرموط',
    'منيك',
    'قحبة',
    'منيك',
    'غبي',
    'حمار',
    'زنجي',
    'نيغا',
    'نيغر',
    'سكس',
    'طيز',
    'شرج',
    'لعق',
    'لحس',
    'مص',
    'تمص',
    'بيضان',
    'ثدي',
    'بز',
    'بزاز',
    'حلمة',
    'مفلقسة',
    'بظر',
    'كس',
    'فرج',
    'شهوة',
    'شاذ',
    'مبادل',
    'عاهرة',
    'جماع',
    'قضيب',
    'زب',
    'لوطي',
    'لواط',
    'سحاق',
    'سحاقية',
    'اغتصاب',
    'خنثي',
    'احتلام',
    'نيك',
    'متناك',
    'متناكة',
    'شرموطة',
    'عرص',
    'خول',
    'قحبة',
    'لبوة'
  ];

  function checkForCussWords(inputField) {
    const value = inputField.value.trim().toLowerCase(); // normalize and lowercase input
    
    messageElement.style.display = 'none'; // Hide message by default

    // Check for English forbidden words
    for (const word of forbiddenWords) {
      if (value.includes(word)) {
        console.log(`Found forbidden word: ${word}`);
        messageElement.textContent = 'Please avoid using inappropriate language.';
        messageElement.style.display = 'block';
        inputField.value = ''; // Clear the input
        return;
      }
    }

    // Check for Arabic forbidden words
    for (const word of arabicForbiddenWords) {
      if (value.includes(word)) {
        console.log(`Found forbidden word: ${word}`);
        messageElement.textContent = 'Please avoid using inappropriate language.';
        messageElement.style.display = 'block';
        inputField.value = ''; // Clear the input
        return;
      }
    }
  }

  function updateDirection(inputField) {
    const value = inputField.value;
    const arabicRegex = /[\u0600-\u06FF]/;
    inputField.style.direction = arabicRegex.test(value) ? 'rtl' : 'ltr';
  }

  firstNameInput.addEventListener('input', function() {
    checkForCussWords(this);
    updateDirection(this);
  });

  lastNameInput.addEventListener('input', function() {
    checkForCussWords(this);
    updateDirection(this);
  });
});

document.getElementById("username").addEventListener("input", function () {
  const usernameInput = this;
  const forbiddenMessage = document.getElementById("forbidden-message1");

  if (!usernameInput.checkValidity()) {
    forbiddenMessage.textContent = "Username must be 5-15 characters long and can only contain English letters and numbers.";
    forbiddenMessage.style.display = "block";
  } else {
    forbiddenMessage.style.display = "none";
  }
});

document.getElementById("email").addEventListener("input", function () {
  const emailInput = this;
  const errorMessage = document.getElementById("email-error-message");

  if (!emailInput.checkValidity()) {
    errorMessage.textContent = "Email must contain an '@' symbol and a dot.";
    errorMessage.style.display = "block";
  } else {
    errorMessage.style.display = "none";
  }
});

function updateStrengthIndicator(passwordInput, strengthIndicator) {
  const password = passwordInput.value;

  // Clear the indicator if the input is empty
  if (password.length === 0) {
    strengthIndicator.textContent = "";
    return;
  }

  let strength = 'Weak';
  let color = 'red';

  if (password.length < 5) {
    strength = "Password too short.";
    color = "red";
  } else {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChars = /[\W_]/.test(password);
    
    const isAllUpperCase = /^[A-Z]+$/.test(password);
    const isAllLowerCase = /^[a-z]+$/.test(password);

    if (hasUpperCase && hasLowerCase && hasNumbers && password.length >= 9 && hasSpecialChars) {
      strength = 'Strong';
      color = 'green';
    } else if ((isAllUpperCase || isAllLowerCase) && hasSpecialChars) {
      strength = 'Medium';
      color = 'orange';
    } else if (((hasUpperCase || hasLowerCase) && hasNumbers) || hasSpecialChars ) {
      strength = 'Medium';
      color = 'orange';
    } else if ((isAllUpperCase || isAllLowerCase) && hasNumbers) {
      strength = 'Weak';
      color = 'red';
    } 
  }

  strengthIndicator.textContent = strength;
  strengthIndicator.style.color = color;
}


function checkPasswordMatch(firstInput, secondInput, messageElement) {
  if (secondInput.value) { // Check if the confirm input has a value
    if (!firstInput.value) {
      messageElement.textContent = "Fill the password field first.";
      messageElement.style.color = "red";
    } else if (firstInput.value === secondInput.value) {
      messageElement.textContent = "Passwords match.";
      messageElement.style.color = "green";
    } else {
      messageElement.textContent = "Passwords do not match.";
      messageElement.style.color = "red";
    }
  } else {
    messageElement.textContent = ""; // Clear message if second input is empty
  }
}

const firstPasswordInput = document.getElementById("first-pass");
const secondPasswordInput = document.getElementById("last-pass");
const strengthIndicator = document.getElementById("strength1");
const matchMessage = document.getElementById("match-message");

// Update strength indicator on input
firstPasswordInput.addEventListener("input", function () {
  updateStrengthIndicator(this, strengthIndicator);
  // Check password match when typing in the first password input
  checkPasswordMatch(this, secondPasswordInput, matchMessage);
});

// Check password match on input in confirm password field
secondPasswordInput.addEventListener("input", function () {
  checkPasswordMatch(firstPasswordInput, this, matchMessage);
});
