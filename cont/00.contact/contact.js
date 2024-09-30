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

/*-----------------------------------------------*/

var targetPeakCount = 18500;
var peakCountElement = document.getElementById('count');
var hasPeakAnimated = false; // Flag to prevent multiple animations

// Function to animate the Peak views count
var countUpPeak = function() {
    var currentCount = 0;
    var increment = Math.ceil(targetPeakCount / 300); // Slower increment value for smoother animation

    var updateCount = function() {
        if (currentCount < targetPeakCount) {
            currentCount += increment;
            if (currentCount > targetPeakCount) currentCount = targetPeakCount; // Clamp the value
            peakCountElement.innerText = currentCount.toLocaleString(); // Format number with commas
            requestAnimationFrame(updateCount);
        }
    };

    updateCount();
};

// Create an Intersection Observer for the Peak views section
var peakObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting && !hasPeakAnimated) {
            hasPeakAnimated = true; // Set the flag to true to prevent multiple counts
            countUpPeak();
        }
    });
});

// Observe the Peak views section
peakObserver.observe(document.getElementById('section2'));

/*----------------------------------------------------*/

// Load environment variables
require('dotenv').config();

var botToken = process.env.BOT_TOKEN;
var channelId = process.env.CHANNEL_ID;
var currentCount = 0;
var isCounting = false;
var hasAnimated = false;

// Function to animate the subscriber count
var animateNumber = function(targetNumber) {
    var increment = Math.ceil(targetNumber / 300);
    var subscriberCountElement = document.getElementById('subscriberCount');

    if (isCounting) return;

    isCounting = true;
    currentCount = 0;

    var updateCount = function() {
        if (currentCount < targetNumber) {
            currentCount += increment;
            if (currentCount > targetNumber) currentCount = targetNumber;
            subscriberCountElement.innerText = currentCount.toLocaleString();
            requestAnimationFrame(updateCount);
        } else {
            isCounting = false;
            hasAnimated = true;
        }
    };

    updateCount();
};

// Function to fetch and update the subscriber count from Telegram API
var updateSubscriberCount = function() {
    fetch(`https://api.telegram.org/bot${botToken}/getChatMembersCount?chat_id=${channelId}`)
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                var subscriberCount = data.result;
                if (!hasAnimated) {
                    animateNumber(subscriberCount);
                }
            } else {
                console.error('Error fetching data:', data.description);
            }
        })
        .catch(error => console.error('Fetch error:', error));
};

// Create an Intersection Observer for the subscriber count section
var observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
            updateSubscriberCount();
        }
    });
}, { threshold: 0.1 });

observer.observe(document.getElementById('section3'));

// Optional: Set an interval to update the count every minute if visible
setInterval(() => {
    if (!isCounting && !hasAnimated) {
        updateSubscriberCount();
    }
}, 60000);

/*-------------------------------------------------*/

var targetMCQCount = 1000;
var mcqCountElement = document.getElementById('mcqs');
var hasMCQAnimated = false; // Flag to prevent multiple animations

// Function to animate the MCQs count
var countUpMCQs = function() {
    var currentCount = 0;
    var increment = Math.ceil(targetMCQCount / 300); // Slower increment value for smoother animation

    var updateCount = function() {
        if (currentCount < targetMCQCount) {
            currentCount += increment;
            mcqCountElement.innerText = currentCount.toLocaleString(); // Format number with commas
            requestAnimationFrame(updateCount);
        } else {
            mcqCountElement.innerText = targetMCQCount.toLocaleString() + '+'; // Ensure it ends at the target number with '+'
        }
    };

    updateCount();
};

// Create an Intersection Observer for the MCQs section
var mcqsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting && !hasMCQAnimated) {
            hasMCQAnimated = true; // Set the flag to true to prevent multiple counts
            countUpMCQs();
        }
        // Remove the else block that resets the count and displayed number
    });
});

// Observe the MCQs section
mcqsObserver.observe(document.getElementById('section4'));