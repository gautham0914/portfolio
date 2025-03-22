// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.getElementById('checkbox');
const navItems = document.querySelectorAll('.nav-links li a');
const contactForm = document.getElementById('contact-form');
const sections = document.querySelectorAll('section[id]');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile nav when link is clicked
navItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Theme Toggle
const currentTheme = localStorage.getItem('theme');

// Check for saved theme preference or prefer-color-scheme
if (currentTheme) {
    document.body.classList.toggle('dark-theme', currentTheme === 'dark');
    themeToggle.checked = currentTheme === 'dark';
} else {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.body.classList.toggle('dark-theme', prefersDarkScheme);
    themeToggle.checked = prefersDarkScheme;
}

themeToggle.addEventListener('change', function() {
    document.body.classList.toggle('dark-theme', this.checked);
    localStorage.setItem('theme', this.checked ? 'dark' : 'light');
});

// Navbar scroll effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add box shadow on scroll
    if (currentScroll > 50) {
        header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
    
    // Call highlight function on scroll
    highlightNavItem();
});

// Active navigation item based on scroll position
function highlightNavItem() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav-links li a[href*="${sectionId}"]`).classList.add('active');
        } else {
            document.querySelector(`.nav-links li a[href*="${sectionId}"]`).classList.remove('active');
        }
    });
}