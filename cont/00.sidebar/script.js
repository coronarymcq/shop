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
    }, 500); // Same as your CSS transition duration (0.5s)
  } else {
    // Sidebar is hidden, so we're showing it now
    sidebar.classList.add('show');
    
    // Immediately remove the shadow and border
    header.classList.add('header-no-shadow');
  }
});
