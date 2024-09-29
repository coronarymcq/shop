// Use var to avoid redeclaration errors
var contactContainer = document.getElementById('contact-container');

// Check if the element exists to avoid errors
if (contactContainer) {
    // Get all sections that need to be animated within that container
    const sections = contactContainer.querySelectorAll('.scroll-section');

    // Function to check if the section is visible on the screen
    function checkVisibility() {
        const windowHeight = window.innerHeight;
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionBottom = section.getBoundingClientRect().bottom;

            if (sectionTop < windowHeight && sectionBottom >= 0) {
                section.classList.add('visible'); // Adds the class to make it visible
            } else {
                section.classList.remove('visible'); // Removes the class when scrolling away
            }
        });
    }

    // Run the function on scroll
    window.addEventListener('scroll', checkVisibility);

    // Run the function initially, in case the user is already at a certain scroll position
    checkVisibility();
}
