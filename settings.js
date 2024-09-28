function toggleDropdown() {
    const dropdown = document.getElementById("settings-dropdown");
    dropdown.style.display = (dropdown.style.display === "none" || dropdown.style.display === "") ? "block" : "none";

    // Close both dropdowns if the settings dropdown is being closed
    if (dropdown.style.display === "none") {
        closeAllDropdowns();
    }
}

function toggleLangDropdown() {
    const langDropdown = document.getElementById("lang-dropdown");
    const themeDropdown = document.getElementById("theme-dropdown");

    // Toggle the language dropdown
    langDropdown.style.display = (langDropdown.style.display === "none" || langDropdown.style.display === "") ? "block" : "none";

    // If opening language dropdown, close theme dropdown
    if (langDropdown.style.display === "block") {
        themeDropdown.style.display = "none";
    }
}

function toggleThemeDropdown() {
    const themeDropdown = document.getElementById("theme-dropdown");
    const langDropdown = document.getElementById("lang-dropdown");

    // Toggle the theme dropdown
    themeDropdown.style.display = (themeDropdown.style.display === "none" || themeDropdown.style.display === "") ? "block" : "none";

    // If opening theme dropdown, close language dropdown
    if (themeDropdown.style.display === "block") {
        langDropdown.style.display = "none";
    }
}

function closeAllDropdowns() {
    const langDropdown = document.getElementById("lang-dropdown");
    const themeDropdown = document.getElementById("theme-dropdown");
    langDropdown.style.display = "none"; // Close the language dropdown
    themeDropdown.style.display = "none"; // Close the theme dropdown
}

// Dummy theme functions (implement your actual theme switching logic)
function setLightTheme() {
    // Implement light theme logic here
    console.log("Light theme selected");
}

function setDarkTheme() {
    // Implement dark theme logic here
    console.log("Dark theme selected");
}

// Close the dropdown if clicked outside
window.onclick = function(event) {
    if (!event.target.matches('.lang-button') && 
        !event.target.matches('.lang-toggle') && 
        !event.target.matches('.th-toggle')) { // Added .th-toggle along with .lang-toggle
        const dropdowns = document.getElementsByClassName("dropdown-content");
        Array.from(dropdowns).forEach(openDropdown => {
            if (openDropdown.style.display === "block") {
                openDropdown.style.display = "none";
            }
        });

        closeAllDropdowns(); // Close both nested dropdowns
    }
};



const translations = {
  en: {
    title: "MCQs Coronary Academic",
    Settings: "Settings", // Language button (Settings)
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
    btnAr: "Arabic",
    switchTheme: "Themes", // New entry for theme switch
    language: "Language",
    light: "Light Theme",
    dark: "Dark Theme"
  },
  ar: {
    title: "MCQs كوروناري أكاديمي",
    Settings: "الإعدادات", // Language button (Settings)
    login: "تسجيل الدخول",
    register: "إنشاء حساب",
    HomeNavButton: "الصفحة الرئيسية",
    mcqsLibrary: "مكتبة الأسئلة",
    Uni: "جامعة البلقاء التطبيقية",
    contactUs: "اتصل بنا",
    help: "المساعدة",
    footerText: "© 2024 أم سي كيو كوروناري أكاديمي. جميع الحقوق محفوظة.",
    beta: "النسخة التجريبية - قيد التطوير",
    btnEn: "الإنجليزية",
    btnAr: "العربية",
    switchTheme: "المظهر", // New entry for theme switch
    language: "اللغة",
    light: "فاتح",
    dark: "غامق"
  },
};

function translatePage(lang) {
  const trans = translations[lang];

  // Update title and buttons
  document.title = trans.title;
  document.querySelector('.lang-button').textContent = trans.Settings;
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

  // Update theme switch button
  document.querySelector('.lang-toggle').textContent = trans.language;
  document.querySelector('.th-toggle').textContent = trans.switchTheme;
  document.querySelector('.light-trans').textContent = trans.light;
  document.querySelector('.dark-trans').textContent = trans.dark;


  // Manage active state for dropdown buttons
  const langButtons = document.querySelectorAll('#lang-dropdown button');
  langButtons.forEach(btn => {
    btn.classList.remove('active'); // Remove active class from all buttons
  });
  document.getElementById(lang === 'en' ? 'btn-en' : 'btn-ar').classList.add('active'); // Add active class to the selected button

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

// Hide dropdowns on window resize
window.addEventListener('resize', function() {
    const settingsDropdown = document.getElementById('settings-dropdown');
    const langDropdown = document.getElementById('lang-dropdown');
    const themeDropdown = document.getElementById('theme-dropdown');

    settingsDropdown.style.display = 'none'; // Close the settings dropdown
    langDropdown.style.display = 'none'; // Close the language dropdown
    themeDropdown.style.display = 'none'; // Close the theme dropdown
});

// Language button click events
document.querySelectorAll('#lang-dropdown button').forEach(btn => {
  btn.addEventListener('click', function() {
    const lang = this.id === 'btn-en' ? 'en' : 'ar';
    translatePage(lang);
  });
});