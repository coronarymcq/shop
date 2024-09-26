// Load the theme and logo from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  // Set logos based on saved theme
  setInitialLogo(savedTheme);
});

// Function to set the logo based on the theme
function setInitialLogo(theme) {
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
}

// Function to toggle between light and dark themes
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light'; 
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  // Apply the new theme
  document.documentElement.setAttribute('data-theme', newTheme);
  
  // Save the new theme to localStorage
  localStorage.setItem('theme', newTheme);
  
  // Update logos immediately on toggle
  switchLogo(newTheme);
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
}

// Event listener for the theme toggle button
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

// Preload logos for better performance
function preloadLogos() {
  const logosToPreload = [
    'icons/dark-logo.webp',
    'icons/dark-logo-line.webp',
    'icons/header-logo-2.webp',
    'icons/header-logo.webp'
  ];
  logosToPreload.forEach(logoSrc => {
    const img = new Image();
    img.src = logoSrc;
  });
}

// Preload logos on initial load
preloadLogos();
