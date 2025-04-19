// Function to toggle visibility of the project description
function toggleDescription(descriptionId) {
    const desc = document.getElementById(descriptionId);
    if (desc.style.display === "none") {
        desc.style.display = "block";
    } else {
        desc.style.display = "none";
    }
}

// Function to download a file
function downloadFile() {
    const link = document.createElement('a');
    link.href = 'assets/ai-fake-audio-detection.pdf';
    link.download = 'AI_Fake_Audio_Paper.pdf'; 
    link.click();
}

// Typing effect class for modularity and configurability
class TypingEffect {
    constructor(elementId, strings, typingSpeed = 150, deletingSpeed = 100, pauseDelay = 1000) {
        this.element = document.getElementById(elementId);
        this.strings = strings;
        this.typingSpeed = typingSpeed;
        this.deletingSpeed = deletingSpeed;
        this.pauseDelay = pauseDelay;
        this.index = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.type();
    }

    type() {
        const currentString = this.strings[this.index];
        if (this.isDeleting) {
            this.charIndex--;
        } else {
            this.charIndex++;
        }

        this.element.textContent = currentString.slice(0, this.charIndex);

        if (!this.isDeleting && this.charIndex === currentString.length) {
            this.isDeleting = true;
            setTimeout(() => this.type(), this.pauseDelay);
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.index = (this.index + 1) % this.strings.length;
            setTimeout(() => this.type(), this.pauseDelay / 1.25);
        } else {
            setTimeout(() => this.type(), this.isDeleting ? this.deletingSpeed : this.typingSpeed);
        }
    }
}

// Initialize typing effect
document.addEventListener('DOMContentLoaded', () => {
    new TypingEffect("typed-text", ["Data Scientist", "Data Analyst", "AI Engineer", "Web Developer"]);
});

// Intersection Observer for fade-in animations
document.addEventListener("DOMContentLoaded", () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    const options = { threshold: 0.5 };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    fadeElements.forEach(element => observer.observe(element));
});

// Smooth scrolling for navigation links
document.querySelectorAll('a.nav-link[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Contact form submission handling with enhanced validation and feedback
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!form.checkValidity()) {
            formMessage.textContent = 'Please fill out all required fields correctly.';
            formMessage.style.color = 'red';
            formMessage.setAttribute('role', 'alert');
            return;
        }

        formMessage.textContent = 'Sending message...';
        formMessage.style.color = 'black';

        setTimeout(() => {
            formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
            formMessage.style.color = 'green';
            formMessage.setAttribute('role', 'alert');
            form.reset();
        }, 1500);
    });
});

// Back to top button functionality with accessibility improvements
document.addEventListener('DOMContentLoaded', () => {
    const backToTopBtn = document.getElementById('backToTopBtn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        backToTopBtn.focus();
    });
});

// Disable right-click context menu for content protection
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// Disable certain keyboard shortcuts for content protection
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        const blockedKeys = ['c', 'x', 's', 'u', 'i', 'j'];
        const key = e.key.toLowerCase();

        if (blockedKeys.includes(key)) {
            if ((key === 'i' || key === 'j') && !e.shiftKey) {
                return;
            }
            e.preventDefault();
        }
    }
    if (e.key === 'F12') {
        e.preventDefault();
    }
});
