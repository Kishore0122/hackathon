// Include AOS for animations
document.addEventListener("DOMContentLoaded", () => {
    AOS.init({
        duration: 1000, // Animation duration
        once: true // Ensure animation occurs only once
    });
});

// Modal functionality
const modal = document.getElementById('authModal');
const loginBtn = document.getElementById('loginBtn');
const getStartedBtn = document.getElementById('getStartedBtn');
const protectedContent = document.getElementById('protectedContent');
const navbar = document.querySelector('.navbar');
let isLoggedIn = false; // Track login state

// Function to toggle modal visibility
function toggleModal() {
    if (modal) {
        modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
    }
}

// Show or hide protected content based on login state
function updateContentVisibility() {
    if (isLoggedIn) {
        protectedContent.style.display = 'block'; // Show protected content
    } else {
        protectedContent.style.display = 'none'; // Hide protected content
    }
}

// Open modal on button clicks
if (loginBtn) loginBtn.addEventListener('click', toggleModal);
if (getStartedBtn) getStartedBtn.addEventListener('click', toggleModal);

// Close modal when clicking outside the modal content
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            toggleModal();
        }
    });
}

// Form submission handling for login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Extract user input values
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Simulate login authentication
        if (email === 'user@example.com' && password === 'password') {
            isLoggedIn = true;
            console.log('Login successful!');
            toggleModal(); // Close the modal
            updateContentVisibility(); // Show protected content
        } else {
            alert('Invalid email or password. Please try again.');
        }
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId !== '#') {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth' // Smooth scrolling
                });
            }
        }
    });
});

// Navbar scroll effect with throttle for performance
let lastScroll = 0;

// Throttle function for optimized scroll handling
function throttle(fn, wait) {
    let lastTime = 0;
    return function (...args) {
        const now = new Date().getTime();
        if (now - lastTime >= wait) {
            lastTime = now;
            fn(...args);
        }
    };
}

// Scroll event to manage navbar visibility
if (navbar) {
    window.addEventListener(
        'scroll',
        throttle(() => {
            const currentScroll = window.pageYOffset;

            // Apply styles based on scroll direction
            if (currentScroll <= 0) {
                navbar.style.transform = 'translateY(0)';
                navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            } else if (currentScroll > lastScroll) {
                navbar.style.transform = 'translateY(-100%)'; // Hide navbar
            } else {
                navbar.style.transform = 'translateY(0)'; // Show navbar
                navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
            }

            lastScroll = currentScroll;
        }, 100) // Throttle scroll events every 100ms
    );
}

// Initial content visibility update
updateContentVisibility();
