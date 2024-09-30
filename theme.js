// Load the theme and logo from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  // Set logos and active class based on saved theme
  setInitialLogo(savedTheme);
  setActiveThemeButton(savedTheme);
});

// Function to set the logo based on the theme
function setInitialLogo(theme) {
  const logoElement = document.getElementById('main-logo');
  const hoverLogoElement = document.getElementById('hover-logo');
  const darkLogo1 = 'icons/dark-logo.webp';
  const darkLogo2 = 'icons/dark-logo-line.webp';
  const lightLogo1 = 'icons/header-logo-2.webp';
  const lightLogo2 = 'icons/header-logo.webp';

  // Set the appropriate logo based on the theme
  if (theme === 'dark') {
    logoElement.src = darkLogo1;
    hoverLogoElement.src = darkLogo2;
  } else {
    logoElement.src = lightLogo1;
    hoverLogoElement.src = lightLogo2;
  }

  // Update the additional logo based on the theme
  updateLogo(theme);
}

// Function to set the light theme
function setLightTheme() {
  document.documentElement.setAttribute('data-theme', 'light');
  localStorage.setItem('theme', 'light');
  switchLogo('light');
  setActiveThemeButton('light');
}

// Function to set the dark theme
function setDarkTheme() {
  document.documentElement.setAttribute('data-theme', 'dark');
  localStorage.setItem('theme', 'dark');
  switchLogo('dark');
  setActiveThemeButton('dark');
}

// Function to switch logos based on the theme
function switchLogo(theme) {
  const logoElement = document.getElementById('main-logo');
  const hoverLogoElement = document.getElementById('hover-logo');
  const darkLogo1 = 'icons/dark-logo.webp';
  const darkLogo2 = 'icons/dark-logo-line.webp';
  const lightLogo1 = 'icons/header-logo-2.webp';
  const lightLogo2 = 'icons/header-logo.webp';

  if (theme === 'dark') {
    logoElement.src = darkLogo1;
    hoverLogoElement.src = darkLogo2;
  } else {
    logoElement.src = lightLogo1;
    hoverLogoElement.src = lightLogo2;
  }

  // Update the additional logo based on the theme
  updateLogo(theme);
}

// Function to update the additional logo based on the theme
function updateLogo(theme) {
  const logoImg = document.querySelector('.logo-aboutus'); // Select the logo image
  if (logoImg) { // Check if logoImg exists
    if (theme === 'dark') {
      logoImg.src = '../../icons/logo-dark.webp'; // Change to dark logo
    } else {
      logoImg.src = '../../icons/logo.webp'; // Change to light logo
    }
  }
}

// Function to set active theme button
function setActiveThemeButton(theme) {
  const lightButton = document.getElementById('light-theme-button');
  const darkButton = document.getElementById('dark-theme-button');
  
  // Remove "active" class from both buttons
  lightButton.classList.remove('active');
  darkButton.classList.remove('active');
  
  // Add "active" class to the selected theme button
  if (theme === 'light') {
    lightButton.classList.add('active');
  } else {
    darkButton.classList.add('active');
  }
}

// Event listener for the light theme button
document.getElementById('light-theme-button').addEventListener('click', setLightTheme);

// Event listener for the dark theme button
document.getElementById('dark-theme-button').addEventListener('click', setDarkTheme);

// Preload logos for better performance
function preloadLogos() {
  const logosToPreload = [
    'icons/dark-logo.webp',
    'icons/dark-logo-line.webp',
    'icons/header-logo-2.webp',
    'icons/header-logo.webp',
    '../../icons/logo-dark.webp',
    '../../icons/logo.webp'
  ];
  logosToPreload.forEach(logoSrc => {
    const img = new Image();
    img.src = logoSrc;
  });
}

// Preload logos on initial load
preloadLogos();

/*---------------------------------------*/

// Call ensureLogoIsUpdated on page load to set the logo correctly
ensureLogoIsUpdated();

// Function to ensure the correct logo is displayed based on the theme
function ensureLogoIsUpdated() {
  const currentTheme = localStorage.getItem('theme') || 'light'; // Get current theme
  updateLogo(currentTheme); // Call updateLogo with the current theme
}
