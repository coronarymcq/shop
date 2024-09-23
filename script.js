document.querySelector('.nav-button').addEventListener('click', function() {
  var sidebar = document.querySelector('.side-bar-container');
  var header = document.querySelector('.header-container');

  if (sidebar.classList.contains('show')) {
    sidebar.classList.remove('show');
    setTimeout(() => header.classList.remove('header-no-shadow'), 200);
  } else {
    sidebar.classList.add('show');
    header.classList.add('header-no-shadow');
  }
});

// Add event listeners to all sidebar buttons
document.querySelectorAll('.nav-bar, .nav-bar5').forEach(button => {
  button.addEventListener('click', function() {
    document.querySelectorAll('.nav-bar, .nav-bar5').forEach(btn => {
      btn.classList.remove('active');
    });
    this.classList.add('active');
  });
});

// Manage clicks outside the sidebar
document.addEventListener('click', function(event) {
  if (!document.querySelector('.side-bar-container').contains(event.target)) {
    // Optional focus management can be added here
  }
});

function goHome() {
  // Check if on the main index page
  if (window.location.pathname.endsWith('index.html')) {
      location.reload(); // Reload if on the index page
  } else {
      window.location.href = 'index.html'; // Go to index page otherwise
  }
}

document.addEventListener("DOMContentLoaded", function() {
  const logo = document.querySelector('.hover-logo');

  // Set the title based on the current URL
  logo.title = window.location.pathname.endsWith('index.html') ? "Reload" : "Home";
  
  // Attach the click event
  logo.onclick = goHome;
});

function loadHome() {
  const mainContent = document.querySelector('.main');
  fetch('cont/00.home/home.html')
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.text();
    })
    .then(data => mainContent.innerHTML = data)
    .catch(error => console.error('Error loading home content:', error));
}


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
    home: "Home",
    mcqsLibrary: "MCQs Library",
    Uni: "BAU",
    contactUs: "Contact Us",
    help: "Help",
    welcome: "Welcome to the Home Page!",
    homeContent: "Here is your home page content.",
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
    home: "الصفحة الرئيسية",
    mcqsLibrary: "مكتبة الأسئلة",
    Uni: "جامعة البلقاء التطبيقية",
    contactUs: "اتصل بنا",
    help: "المساعدة",
    welcome: "مرحبًا بكم في الصفحة الرئيسية!",
    homeContent: "هنا محتوى صفحتك الرئيسية.",
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
    if (index === 0) { // Assuming the first button is the Home button
      btn.textContent = trans.home;
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
  document.querySelector('.main h1').textContent = trans.welcome;
  document.querySelector('.main p').textContent = trans.homeContent;
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
}

// Set default language to English
translatePage('en');

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

  // Select the navigation button and the second rectangle bar
  const navButton = document.querySelector('.nav-button');
  const secondBar = document.getElementById('secondBar');

  // Variable to track the toggle state
  let isToggled = false;

  // Add click event to the navigation button
  navButton.addEventListener('click', () => {
    if (isToggled) {
      // If toggled, set the second bar width back to 70 and adjust y position
      secondBar.setAttribute('width', '70');
      secondBar.setAttribute('y', '70');
    } else {
      // Shrink it to 0 width and move it up to align with the top bar
      secondBar.setAttribute('width', '0');
      secondBar.setAttribute('y', '40'); // Same y-position as the top bar for smooth collapse
    }

    // Toggle the state
    isToggled = !isToggled;
  });