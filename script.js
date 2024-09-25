document.querySelector('.nav-button').addEventListener('click', function() {
  var sidebar = document.querySelector('.side-bar-container');
  var header = document.querySelector('.header-container');
  const secondBar = document.getElementById('secondBar'); // Select the second rectangle bar
  let isToggled = secondBar.getAttribute('width') === '0'; // Check toggle state based on width

  // Toggle sidebar
  if (sidebar.classList.contains('show')) {
    sidebar.classList.remove('show');
    setTimeout(() => header.classList.remove('header-no-shadow'), 200);
    secondBar.setAttribute('width', '70'); // Reset second bar width when sidebar is hidden
    secondBar.setAttribute('y', '70');
  } else {
    sidebar.classList.add('show');
    header.classList.add('header-no-shadow');
    secondBar.setAttribute('width', '0'); // Shrink second bar when sidebar is shown
    secondBar.setAttribute('y', '40'); // Align with top bar for smooth collapse
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

// Hide sidebar on scroll
window.addEventListener('scroll', function() {
  var sidebar = document.querySelector('.side-bar-container');
  var header = document.querySelector('.header-container');
  const secondBar = document.getElementById('secondBar'); // Select the second rectangle bar

  if (sidebar.classList.contains('show')) {
    sidebar.classList.remove('show');
    header.classList.remove('header-no-shadow');
    secondBar.setAttribute('width', '70'); // Reset second bar width when sidebar is hidden on scroll
    secondBar.setAttribute('y', '70');
  }
});

// Hide sidebar when clicking outside of it
document.addEventListener('click', function(event) {
  var sidebar = document.querySelector('.side-bar-container');
  var header = document.querySelector('.header-container');
  var navButton = document.querySelector('.nav-button');
  const secondBar = document.getElementById('secondBar'); // Select the second rectangle bar

  // Check if click is outside the sidebar and nav button
  if (!sidebar.contains(event.target) && !navButton.contains(event.target)) {
    if (sidebar.classList.contains('show')) {
      sidebar.classList.remove('show');
      header.classList.remove('header-no-shadow');
      secondBar.setAttribute('width', '70'); // Reset second bar width when sidebar is hidden on outside click
      secondBar.setAttribute('y', '70');
    }
  }
});

document.addEventListener("DOMContentLoaded", function() {
  const logo = document.querySelector('.hover-logo');

  // Function to update logo title based on the current content type
  function updateLogoTitle(contentType) {
    logo.title = contentType === 'home' ? "Reload" : "Home";
  }

  // Initially check what content is currently being displayed
  let currentContentType = window.location.pathname.endsWith('/index.html') ? 'home' : 'other';
  updateLogoTitle(currentContentType);

  // Attach the click event to the logo
  logo.onclick = function() {
    goHome(); // This will navigate to home
    fetchContent('home'); // Simulate loading home content
  };

  // Load BAU content
  function loadBAUContent() {
    fetchContent('BAU'); // Change to 'BAU' content type
    updateLogoTitle('BAU'); // Update the logo title to reflect BAU content
  }

  // Example: Fetching other content on page load or based on your logic
  document.getElementById('nav-bar3').addEventListener('click', function() {
    loadBAUContent(); // Call to load BAU content
    sessionStorage.setItem('currentPage', 'bau'); // Store the current page
  });

  // Load content based on stored state or default to the main page
  window.addEventListener('load', function() {
    const storedPage = sessionStorage.getItem('currentPage');
    if (storedPage) {
      loadContent(storedPage); // Load the stored page
      updateLogoTitle(storedPage); // Update the logo title based on stored page
    } else {
      loadContent('main'); // Load default main content if nothing is stored
    }
  });
});

// Function to clear sessionStorage and navigate to home
function goHome() {
  sessionStorage.clear(); // Clear sessionStorage when navigating to home
  window.location.href = 'index.html'; // Always go to the main index page
}

function NavHome() {
  sessionStorage.clear(); // Clear sessionStorage

  // Check if content is already stored in localStorage
  const savedContent = localStorage.getItem('homeContent');

  // Update the logo title
  const logo = document.querySelector('.hover-logo');
  logo.title = "Reload"; // Update the title when navigating to home

  if (savedContent) {
    // If content is in localStorage, load it into .main
    document.querySelector('.main').innerHTML = savedContent;
  } else {
    // Fetch the HTML file if not in localStorage
    fetch('cont/00.home/home.html')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(data => {
        document.querySelector('.main').innerHTML = data; // Insert the fetched HTML into .main
        localStorage.setItem('homeContent', data); // Save content to localStorage
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }
}

// When the page loads, automatically check for saved content
window.addEventListener('load', () => {
  const savedContent = localStorage.getItem('homeContent');
  if (savedContent) {
    document.querySelector('.main').innerHTML = savedContent;
  }
});

// Simulated fetch function to demonstrate changing content
function fetchContent(contentType) {
  console.log(`Fetching ${contentType} content...`);
  // Implement your logic for loading new content here
}

// Function to load specific content
function loadContent(page) {
  const mainContent = document.querySelector('.main');

  // Reset any existing counters
  resetCounters();

  let filePath = '';
  let activeNavButton = '';

  switch (page) {
    case 'bau':
      filePath = 'cont/00.bau/bau.html';
      activeNavButton = 'nav-bar3'; // Set the active button for BAU
      break;
    case 'main':
      filePath = 'cont/00.home/home.html'; // Update to fetch from the correct main content file
      activeNavButton = 'nav-bar1'; // Set the active button for Main
      break;
    // Add cases for other pages if needed
    default:
      return;
  }

  fetch(filePath)
    .then(response => response.ok ? response.text() : Promise.reject('Failed to load'))
    .then(data => {
      mainContent.innerHTML = data;

      // Remove existing script if it exists
      const existingScript = document.querySelector('script[src="cont/00.bau/bau.js"]');
      if (existingScript) {
        existingScript.remove();
      }

      // Load bau.js dynamically after content is loaded if the page is 'bau'
      if (page === 'bau') {
        const script = document.createElement('script');
        script.src = 'cont/00.bau/bau.js'; // Path to your JS file
        script.type = 'text/javascript';
        script.onload = () => {
          console.log("BAU JavaScript loaded");
          startCounting(); // Ensure you call startCounting() if defined in bau.js
        };
        document.body.appendChild(script);
      }

      // Activate the correct nav button
      document.querySelectorAll('.nav-bar, .nav-bar5').forEach(btn => {
        btn.classList.remove('active');
      });
      document.getElementById(activeNavButton).classList.add('active');
    })
    .catch(error => console.error('Error loading content:', error));
}

// Modify the loadBAU function to store the current page
function loadBAU() {
  loadContent('bau'); // Load BAU content
  sessionStorage.setItem('currentPage', 'bau'); // Store the current page in sessionStorage
}

// Function to reset counters
function resetCounters() {
  const counters = document.querySelectorAll(".info-container div");
  counters.forEach((counter) => {
    counter.innerText = counter.classList.contains("ST") ? "0+" : "0"; // Reset to 0 or '0+' for Students
  });
}

/*-----------------------------------------------------------------------*/ 