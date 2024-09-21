document.querySelector('.nav-button').addEventListener('click', function() {
  var sidebar = document.querySelector('.side-bar-container');
  var header = document.querySelector('.header-container');

  // Check if the sidebar is currently shown
  if (sidebar.classList.contains('show')) {
    // Sidebar is shown, so we're hiding it now
    sidebar.classList.remove('show');
    
    // Delay the shadow and border reappearance to match the sidebar animation duration
    setTimeout(function() {
      header.classList.remove('header-no-shadow');
    }, 200); // Same as your CSS transition duration (0.4s)
  } else {
    // Sidebar is hidden, so we're showing it now
    sidebar.classList.add('show');
    
    // Immediately remove the shadow and border
    header.classList.add('header-no-shadow');
  }
});

// Add event listeners to all sidebar buttons
document.querySelectorAll('.nav-bar, .nav-bar5').forEach(button => {
  button.addEventListener('click', function() {
      // Remove 'active' class from all buttons
      document.querySelectorAll('.nav-bar, .nav-bar5').forEach(btn => {
          btn.classList.remove('active');
      });

      // Add 'active' class to the clicked button
      this.classList.add('active');
  });
});

// Add an event listener to the document to manage clicks outside the sidebar
document.addEventListener('click', function(event) {
  if (!document.querySelector('.side-bar-container').contains(event.target)) {
      // Optionally, you can add code here if you want to manage focus differently when clicking outside
      // For instance, keeping the last clicked button highlighted
      // Remove this part if you want the focus to stay on the last clicked button
      // document.querySelectorAll('.nav-bar, .nav-bar5').forEach(button => {
      //     button.classList.remove('active');
      // });
  }
});

function goHome() {
  if (window.location.pathname === '/index.html') {
      location.reload();
  } else {
      window.location.href = 'index.html';
  }
}

function loadHome() {
  const mainContent = document.querySelector('.main');
  fetch('cont/00.home/home.html') // Update this path to the correct location
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.text();
      })
      .then(data => {
          mainContent.innerHTML = data; // Load content from home.html
      })
      .catch(error => console.error('Error loading home content:', error));
}

document.addEventListener("DOMContentLoaded", function () {
  const logo = document.querySelector('.header-logo'); // Assuming your logo has this class
  const currentUrl = window.location.href;

  // Check if we're on the home page
  if (currentUrl.endsWith("index.html")) {
      logo.title = "Reload"; // Change title to "Reload"
  } else {
      logo.title = "Home"; // Otherwise, set it to "Home"
  }

  logo.onclick = function () {
      if (currentUrl.endsWith("index.html")) {
          location.reload(); // Reload if on home page
      } else {
          window.location.href = "index.html"; // Redirect to home page
      }
  };
});


