
function toggleDropdown() {
  const dropdown = document.getElementById("lang-dropdown");
  dropdown.style.display = (dropdown.style.display === "none" || dropdown.style.display === "") ? "block" : "none";
}

// Close the dropdown if clicked outside
window.onclick = function(event) {
  if (!event.target.matches('.lang-button')) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    Array.from(dropdowns).forEach(openDropdown => {
      if (openDropdown.style.display === "block") {
        openDropdown.style.display = "none";
      }
    });
  }
};

const translations = {
  en: {
    title: "MCQs Coronary Academic",
    language: "Language",
    login: "Login",
    register: "Sign Up",
    HomeNavButton: "Home",
    mcqsLibrary: "MCQs Library",
    Uni: "BAU",
    contactUs: "Contact Us",
    help: "Help",
    footerText: "© 2024 Coronary Academic MCQs. All rights reserved.",
    beta: "Beta Version – Work in Progress",
    btnEn: "English",
    btnAr: "Arabic"
  },
  ar: {
    title: "MCQs كوروناري أكاديمي",
    language: "اللغة",
    login: "تسجيل الدخول",
    register: "إنشاء حساب",
    HomeNavButton: "الصفحة الرئيسية",
    mcqsLibrary: "مكتبة الأسئلة",
    Uni: "جامعة البلقاء التطبيقية",
    contactUs: "اتصل بنا",
    help: "المساعدة",
    footerText: "© 2024 أم سي كيو كوروناري أكاديمي. جميع الحقوق محفوظة.",
    beta: "النسخة التجريبية - قيد التطوير",
    btnEn: "إنجليزي",
    btnAr: "عربي"
  },
};

function translatePage(lang) {
  const trans = translations[lang];

  // Update title and buttons
  document.title = trans.title;
  document.querySelector('.lang-button').textContent = trans.language;
  document.querySelector('.login-button').textContent = trans.login;
  document.querySelector('.register-button').textContent = trans.register;

  // Update all sidebar buttons
  document.querySelectorAll('.nav-bar').forEach((btn, index) => {
    if (index === 0) {
      btn.textContent = trans.HomeNavButton;
    } else if (index === 1) {
      btn.textContent = trans.mcqsLibrary;
    } else if (index === 2) {
      btn.textContent = trans.Uni;
    } else if (index === 3) {
      btn.textContent = trans.contactUs;
    }
  });
  document.querySelector('.nav-bar5').textContent = trans.help;

  // Update main content
  document.querySelector('.end-margin-text01').textContent = trans.footerText;
  document.querySelector('.end-margin-text02').textContent = trans.beta;

  // Update dropdown button texts
  document.getElementById('btn-en').textContent = trans.btnEn;
  document.getElementById('btn-ar').textContent = trans.btnAr;

  // Manage active state for dropdown buttons
  const langButtons = document.querySelectorAll('#lang-dropdown button');
  langButtons.forEach(btn => btn.classList.remove('active'));
  document.getElementById(lang === 'en' ? 'btn-en' : 'btn-ar').classList.add('active');

  // Set the Arabic font for the body if Arabic is selected
  if (lang === 'ar') {
    document.body.classList.add('arabic-font');
  } else {
    document.body.classList.remove('arabic-font');
  }

  // Save the selected language to localStorage
  localStorage.setItem('selectedLanguage', lang);
}

// Load the selected language on page load
window.onload = function() {
  const savedLanguage = localStorage.getItem('selectedLanguage') || 'en'; // Default to English if none is saved
  translatePage(savedLanguage);
};

// Hide dropdown on window resize
window.addEventListener('resize', function() {
  document.getElementById('lang-dropdown').style.display = 'none';
});

// Language button click events
document.querySelectorAll('#lang-dropdown button').forEach(btn => {
  btn.addEventListener('click', function() {
    const lang = this.id === 'btn-en' ? 'en' : 'ar';
    translatePage(lang);
  });
});