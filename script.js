// Function to toggle visibility of the project description
function toggleDescription(descriptionId) {
    var desc = document.getElementById(descriptionId);
    if (desc.style.display === "none") {
        desc.style.display = "block";
    } else {
        desc.style.display = "none";
    }
}

function downloadFile() {
    const link = document.createElement('a');
    link.href = 'assets/ai-fake-audio-detection.pdf';
    link.download = 'AI_Fake_Audio_Paper.pdf'; 
    link.click();
}
const typedText = document.getElementById("typed-text");
const strings = ["Data Scientist", "Data Analyst", "AI Engineer","Web Developer"];
let index = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentString = strings[index];
    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    typedText.textContent = currentString.slice(0, charIndex);

    if (!isDeleting && charIndex === currentString.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1000); // Pause at the end of typing
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        index = (index + 1) % strings.length; // Loop to the next string
        setTimeout(typeEffect, 800); // Pause before typing the next string
    } else {
        setTimeout(typeEffect, isDeleting ? 100 : 150); // Typing speed
    }
}

typeEffect(); // Start the typing effect


        // Wait until the document is fully loaded before setting up Intersection Observer
        document.addEventListener("DOMContentLoaded", function() {
            const fadeElements = document.querySelectorAll('.fade-in');

            // Options for IntersectionObserver
            const options = {
                threshold: 0.5  // Trigger when 50% of the element is visible
            };

            // Create an IntersectionObserver instance
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Add 'visible' class to trigger fade-in animation
                        entry.target.classList.add('visible');
                        // Stop observing this element once it's in view
                        observer.unobserve(entry.target);
                    }
                });
            }, options);

            // Start observing each element with the 'fade-in' class
            fadeElements.forEach(element => {
                observer.observe(element);
            });
        });