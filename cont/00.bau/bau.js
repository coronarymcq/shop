(function() {
  // Flag to ensure counting only happens once
  let started = false;

  function startCounting() {
    const counters = document.querySelectorAll(".info-container div");
    if (started) return; // Prevent multiple triggers

    counters.forEach((counter) => {
      const target = +counter.getAttribute("data-target");
      let count = 0;
      let increment, speed;

      // Customize speed and increment based on the counter's class
      if (counter.classList.contains("FA")) {
        increment = Math.ceil(target / 9000); // Slower increment for "FA"
        speed = 170;
      } else {
        increment = Math.ceil(target / 250); // Faster for other counters
        speed = 15;
      }

      const updateCount = () => {
        count += increment;
        if (count < target) {
          if (counter.classList.contains("QS")) {
            counter.innerText = "#" + count; // Prefix for QS counters
          } else {
            counter.innerText = count + (counter.classList.contains("ST") ? "+" : "");
          }
          setTimeout(updateCount, speed);
        } else {
          // Set the final value exactly to the target
          if (counter.classList.contains("QS")) {
            counter.innerText = "#" + target;
          } else {
            counter.innerText = target + (counter.classList.contains("ST") ? "+" : "");
          }
        }
      };

      updateCount();
    });

    started = true; // Mark as started so counting isn't re-triggered
  }

  // Intersection Observer to trigger counting when the container is in view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !started) {
        startCounting();
      }
      // No reset is performed when the element goes out of view
    });
  });

  // Observe the container that holds the counters
  const infoContainer = document.querySelector(".all-container");
  if (infoContainer) {
    observer.observe(infoContainer);
  }
})();


