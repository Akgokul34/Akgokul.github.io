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


document.addEventListener("DOMContentLoaded", () => {
    const fadeElements = document.querySelectorAll('.fade-in');

    const options = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    fadeElements.forEach(element => {
        observer.observe(element);
    });

    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    // Throttle function to limit scroll event calls
    const throttle = (func, limit) => {
        let lastFunc;
        let lastRan;
        return function() {
            const context = this;
            const args = arguments;
            if (!lastRan) {
                func.apply(context, args);
                lastRan = Date.now();
            } else {
                clearTimeout(lastFunc);
                lastFunc = setTimeout(function() {
                    if ((Date.now() - lastRan) >= limit) {
                        func.apply(context, args);
                        lastRan = Date.now();
                    }
                }, limit - (Date.now() - lastRan));
            }
        };
    };

    const toggleScrollButton = () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    };

    window.addEventListener('scroll', throttle(toggleScrollButton, 200));

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Disable right-click context menu
    document.addEventListener('contextmenu', event => event.preventDefault());

    // Disable common copy-related keyboard shortcuts
    document.addEventListener('keydown', event => {
        // Check for Ctrl or Cmd key
        if (event.ctrlKey || event.metaKey) {
            // List of keys to block: A, C, X, S, U, Shift+I
            const blockedKeys = ['a', 'c', 'x', 's', 'u', 'i'];
            const key = event.key.toLowerCase();

            if (blockedKeys.includes(key)) {
                // For Shift+I, check shiftKey as well
                if (key === 'i' && !event.shiftKey) {
                    return; // Allow if shift is not pressed
                }
                event.preventDefault();
            }
        }
    });
});
