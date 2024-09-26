// Toggling between light and dark themes and storing the preference in localStorage
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light'; 
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  // Apply the new theme
  document.documentElement.setAttribute('data-theme', newTheme);
  
  // Save the new theme to localStorage
  localStorage.setItem('theme', newTheme);
}

// Load the theme from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
});

// Event listener for the theme toggle button
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
