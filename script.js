document.querySelector('.nav-button').addEventListener('click', function() {
  var sidebar = document.querySelector('.side-bar-container');
  var header = document.querySelector('.header-container');
  const secondBar = document.getElementById('secondBar');
  let isToggled = secondBar.getAttribute('width') === '0';

  // Toggle sidebar
  if (sidebar.classList.contains('show')) {
    sidebar.classList.remove('show');
    setTimeout(() => header.classList.remove('header-no-shadow'), 200);
    secondBar.setAttribute('width', '70');
    secondBar.setAttribute('y', '70');
  } else {
    sidebar.classList.add('show');
    header.classList.add('header-no-shadow');
    secondBar.setAttribute('width', '0');
    secondBar.setAttribute('y', '40');
  }
});

// Add event listeners to all sidebar buttons
document.querySelectorAll('.nav-bar, .nav-bar5').forEach(button => {
  button.addEventListener('click', function() {
    const page = this.getAttribute('data-page'); // Get the data-page attribute
    if (page) {
      loadContent(page); // Load the relevant content

      // Remove active class from all buttons and set it to the clicked button
      document.querySelectorAll('.nav-bar, .nav-bar5').forEach(btn => {
        btn.classList.remove('active');
      });
      this.classList.add('active'); // Set the clicked button as active
    }
  });
});

// Hide sidebar on scroll
window.addEventListener('scroll', function() {
  var sidebar = document.querySelector('.side-bar-container');
  var header = document.querySelector('.header-container');
  const secondBar = document.getElementById('secondBar');

  if (sidebar.classList.contains('show')) {
    sidebar.classList.remove('show');
    header.classList.remove('header-no-shadow');
    secondBar.setAttribute('width', '70');
    secondBar.setAttribute('y', '70');
  }
});

// Hide sidebar when clicking outside of it
document.addEventListener('click', function(event) {
  var sidebar = document.querySelector('.side-bar-container');
  var header = document.querySelector('.header-container');
  var navButton = document.querySelector('.nav-button');
  const secondBar = document.getElementById('secondBar');

  if (!sidebar.contains(event.target) && !navButton.contains(event.target)) {
    if (sidebar.classList.contains('show')) {
      sidebar.classList.remove('show');
      header.classList.remove('header-no-shadow');
      secondBar.setAttribute('width', '70');
      secondBar.setAttribute('y', '70');
    }
  }
});

document.addEventListener("DOMContentLoaded", function() {
  const logo = document.querySelector('.hover-logo');

  function updateLogoTitle(contentType) {
    logo.title = contentType === '' ? "" : "";
  }

  // Check the current content type
  let currentContentType = sessionStorage.getItem('currentPage') || 'home';
  updateLogoTitle(currentContentType);

  logo.onclick = function() {
    goHome(); // Navigate to home
  };

  // Load content based on stored state
  window.addEventListener('load', function() {
    const storedPage = sessionStorage.getItem('currentPage');
    if (storedPage) {
      loadContent(storedPage); // Load the stored page
      updateLogoTitle(storedPage); // Update logo title
    } else {
      loadContent('main'); // Load default main content
    }
  });
});

// Clear sessionStorage and navigate to home
function goHome() {
  sessionStorage.clear();
  window.location.href = 'index.html'; // Always go to the main index page
}
function loadContent(page) {
  const mainContent = document.querySelector('.main');

  let filePath = '';
  let activeNavButton = '';
  let scriptPath = ''; // To hold the path of the script to be loaded

  switch (page) {
      case 'bau':
          filePath = 'cont/00.bau/bau.html';
          scriptPath = 'cont/00.bau/bau.js'; // Path to BAU specific JavaScript
          activeNavButton = 'nav-bar3';
          break;
      case 'main':
          filePath = 'cont/00.home/home.html';
          activeNavButton = 'nav-bar1';
          break;
      case 'contact': // Handle the Contact Us page
          filePath = 'cont/00.contact/contact.html';
          activeNavButton = 'nav-bar4';
          break;
      default:
          return;
  }

  fetch(filePath)
      .then(response => response.ok ? response.text() : Promise.reject('Failed to load'))
      .then(data => {
          console.log("Loaded HTML:", data); // Debugging line
          mainContent.innerHTML = data;

          // Check for counters after loading the new HTML
          const counters = document.querySelectorAll(".info-container div.counter");

          // Reset and start counters only if the page is 'bau'
          if (page === 'bau') {
              console.log("Resetting counters and starting counting for the 'bau' page.");
              resetCounters(counters); // Pass the counters to the function
              startCounting(); // Start counting animation
          }

          // Activate the correct nav button
          document.querySelectorAll('.nav-bar, .nav-bar5').forEach(btn => {
              btn.classList.remove('active');
          });
          document.getElementById(activeNavButton).classList.add('active');

          // Store the current page in sessionStorage
          sessionStorage.setItem('currentPage', page);

          // Load additional script if necessary
          if (scriptPath) {
              loadScript(scriptPath); // Load the script properly
          }
      })
      .catch(error => console.error('Error loading content:', error));
}


// Function to dynamically load the script
function loadScript(scriptPath) {
  const scriptElement = document.createElement('script');
  scriptElement.src = scriptPath;
  scriptElement.onload = function() {
    console.log(`${scriptPath} loaded successfully.`);
  };
  scriptElement.onerror = function() {
    console.error(`Error loading ${scriptPath}`);
  };
  document.body.appendChild(scriptElement);
}

function resetCounters() {
  const counters = document.querySelectorAll(".info-container div.counter");

  // Ensure counters exist before trying to loop over them
  if (counters.length === 0) {
    console.warn('No counters found to reset.');
    return; // Exit the function if there are no counters
  }

  counters.forEach((counter) => {
    counter.innerText = "0"; // Reset the counter to zero
  });
}


// Function to start counting
function startCounting() {
  const counters = document.querySelectorAll(".info-container .counter");
  
  counters.forEach(counter => {
    let count = 0; // Start counting from 0
    const target = parseInt(counter.getAttribute('data-target')) || 100; // Get target value from a data attribute (set in HTML)

    const interval = setInterval(() => {
      if (count < target) {
        count++;
        counter.innerText = count; // Update the counter display
      } else {
        clearInterval(interval); // Stop counting when the target is reached
      }
    }, 50); // Adjust the speed of counting here (milliseconds)
  });
}

// Load content for the "Contact Us" page
function loadContactUs() {
  loadContent('contact'); // Call the general loadContent function
}
 