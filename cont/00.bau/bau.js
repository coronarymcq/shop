// Moved the counting logic outside of DOMContentLoaded
let started = false;

function resetCounters(counters) {
  counters.forEach((counter) => {
    counter.innerText = counter.classList.contains("ST") ? "0+" : "0"; // Reset to 0 or '0+' for Students
  });
  started = false; // Reset the flag so animation can start again
}

function startCounting() {
  const counters = document.querySelectorAll(".info-container div");
  
  if (started) return; // Prevent multiple triggers
  
  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-target");
    let count = 0;

    // Customize speed and increment for each counter based on its class
    let increment, speed;

    if (counter.classList.contains("FA")) {
      increment = Math.ceil(target / 9000); // Make faculties count slower
      speed = 170; // Slower speed for faculties
    } else {
      increment = Math.ceil(target / 250); // Faster increments for other counters
      speed = 15; // Faster speed for other counters
    }

    const updateCount = () => {
      count += increment;

      if (count < target) {
        if (counter.classList.contains("QS")) {
          counter.innerText = "#" + count; // Append # for QS Ranking
        } else {
          counter.innerText =
            count + (counter.classList.contains("ST") ? "+" : "");
        }
        setTimeout(updateCount, speed); // Adjust speed here per counter
      } else {
        if (counter.classList.contains("QS")) {
          counter.innerText = "#" + target; // Final target with #
        } else {
          counter.innerText =
            target + (counter.classList.contains("ST") ? "+" : "");
        }
      }
    };

    updateCount();
  });
  started = true; // Mark as started to prevent multiple triggers
}

// Intersection Observer to trigger animation and reset
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !started) {
      startCounting();
    } else if (!entry.isIntersecting) {
      resetCounters(entry.target.querySelectorAll(".info-container div")); // Pass counters specific to the current view
    }
  });
});

// Start observing the .all-container
const infoContainer = document.querySelector(".all-container");
observer.observe(infoContainer);
