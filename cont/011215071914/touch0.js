document.addEventListener('DOMContentLoaded', () => {
  const sitElements = document.querySelectorAll('.sit a');

  sitElements.forEach(element => {
    element.addEventListener('touchstart', (event) => {
      element.style.color = 'rgb(52, 164, 162)'; // Change color on touch
    });

    element.addEventListener('touchend', () => {
      element.style.color = ''; // Reset color when touch ends
    });

    element.addEventListener('click', () => {
      element.style.color = ''; // Ensure color resets on click
    });
  });
});
