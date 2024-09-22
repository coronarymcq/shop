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
