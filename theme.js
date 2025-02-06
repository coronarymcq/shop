// When the DOM is ready, set theme and update main logos.
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  // Set logos and active class based on saved theme
  setInitialLogo(savedTheme);
  setActiveThemeButton(savedTheme);
});

// Function to set the initial logos (main logo, About Us logo, and diagnosis icon)
function setInitialLogo(theme) {
  const logoElement = document.getElementById('main-logo');
  const hoverLogoElement = document.getElementById('hover-logo');
  const darkLogo1 = 'icons/dark-logo.webp';
  const darkLogo2 = 'icons/dark-logo-line.webp';
  const lightLogo1 = 'icons/header-logo-2.webp';
  const lightLogo2 = 'icons/header-logo.webp';

  if (logoElement && hoverLogoElement) {
    if (theme === 'dark') {
      logoElement.src = darkLogo1;
      hoverLogoElement.src = darkLogo2;
    } else {
      logoElement.src = lightLogo1;
      hoverLogoElement.src = lightLogo2;
    }
  }

  // Update the additional About Us logo and diagnosis icon based on the theme
  updateLogo(theme);
  updateDiagnosisIcon(theme);
}

// Function to update the About Us logo based on the theme
function updateLogo(theme) {
  const logoImg = document.querySelector('.logo-aboutus');
  if (logoImg) {
    logoImg.src = theme === 'dark' ? 'icons/logo-dark.webp' : 'icons/logo.webp';
  }
}

// Function to update the diagnosis icon based on the theme
function updateDiagnosisIcon(theme) {
  const diagnosisIcon = document.getElementById('diagnosis-icon');
  if (diagnosisIcon) {
    diagnosisIcon.src = theme === 'dark'
      ? 'icons/diagnosis_white.png'
      : 'icons/diagnosis.png';
    console.log('Diagnosis icon updated to:', diagnosisIcon.src);
  }
}

// Functions to change theme on button clicks
function setLightTheme() {
  document.documentElement.setAttribute('data-theme', 'light');
  localStorage.setItem('theme', 'light');
  switchLogo('light');
  setActiveThemeButton('light');
}

function setDarkTheme() {
  document.documentElement.setAttribute('data-theme', 'dark');
  localStorage.setItem('theme', 'dark');
  switchLogo('dark');
  setActiveThemeButton('dark');
}

// Function to switch the main logos and update additional logos
function switchLogo(theme) {
  const logoElement = document.getElementById('main-logo');
  const hoverLogoElement = document.getElementById('hover-logo');
  const darkLogo1 = 'icons/dark-logo.webp';
  const darkLogo2 = 'icons/dark-logo-line.webp';
  const lightLogo1 = 'icons/header-logo-2.webp';
  const lightLogo2 = 'icons/header-logo.webp';

  if (logoElement && hoverLogoElement) {
    if (theme === 'dark') {
      logoElement.src = darkLogo1;
      hoverLogoElement.src = darkLogo2;
    } else {
      logoElement.src = lightLogo1;
      hoverLogoElement.src = lightLogo2;
    }
  }

  // Update both the About Us logo and the diagnosis icon
  updateLogo(theme);
  updateDiagnosisIcon(theme);
}

// Function to set the active theme button's styling
function setActiveThemeButton(theme) {
  const lightButton = document.getElementById('light-theme-button');
  const darkButton = document.getElementById('dark-theme-button');
  
  if (lightButton && darkButton) {
    lightButton.classList.remove('active');
    darkButton.classList.remove('active');
    
    if (theme === 'light') {
      lightButton.classList.add('active');
    } else {
      darkButton.classList.add('active');
    }
  }
}

// Event listeners for theme buttons
document.getElementById('light-theme-button').addEventListener('click', setLightTheme);
document.getElementById('dark-theme-button').addEventListener('click', setDarkTheme);

// Preload logos for better performance
function preloadLogos() {
  const logosToPreload = [
    'icons/dark-logo.webp',
    'icons/dark-logo-line.webp',
    'icons/header-logo-2.webp',
    'icons/header-logo.webp',
    'icons/logo-dark.webp',
    'icons/logo.webp',
    'icons/diagnosis.png',
    'icons/diagnosis_white.png'
  ];
  logosToPreload.forEach(logoSrc => {
    const img = new Image();
    img.src = logoSrc;
  });
}
preloadLogos();

// Use window.onload to update the diagnosis icon once every element (including the error container) is fully loaded.
window.addEventListener('load', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  updateDiagnosisIcon(savedTheme);
});

// If your dynamic content (loaded from external files) might contain the diagnosis icon,
// use a MutationObserver to update it whenever new nodes are added.
const observer = new MutationObserver((mutationsList) => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const diagIcon = node.querySelector('#diagnosis-icon');
          if (diagIcon) {
            const savedTheme = localStorage.getItem('theme') || 'light';
            updateDiagnosisIcon(savedTheme);
          }
        }
      });
    }
  }
});
const mainContent = document.querySelector('.main');
if (mainContent) {
  observer.observe(mainContent, { childList: true, subtree: true });
}
