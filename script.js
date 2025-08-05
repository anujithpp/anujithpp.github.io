// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initializeLoading();
    initializeThemeToggle();
    initializeNavigation();
    initializeTypingAnimation();
    initializeScrollAnimations();
    initializeSmoothScrolling();
    initializeParallax();
});

// Loading Screen
function initializeLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Hide loading screen after page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1000);
    });
}

// Theme Toggle Functionality
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add a subtle animation to the toggle button
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    });
    
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
    }
}

// Navigation Functionality
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            if (document.documentElement.getAttribute('data-theme') === 'dark') {
                navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            }
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            if (document.documentElement.getAttribute('data-theme') === 'dark') {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            }
        }
    });
}

// Typing Animation
function initializeTypingAnimation() {
    const typingText = document.getElementById('typing-text');
    const texts = ['developer', 'gamer', 'entrepreneur', 'innovator', 'creator'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            // Pause at end of word
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }
        
        setTimeout(typeText, typingSpeed);
    }
    
    // Start typing animation after a delay
    setTimeout(typeText, 1500);
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.skill-item, .social-link, .section-header');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Animate skill items with stagger effect
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Animate social links with stagger effect
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach((link, index) => {
        link.style.animationDelay = `${index * 0.1}s`;
    });
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll indicator click
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                const offsetTop = aboutSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Hide scroll indicator when scrolling
    window.addEventListener('scroll', function() {
        if (scrollIndicator) {
            const scrolled = window.scrollY;
            if (scrolled > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        }
    });
}

// Parallax Effect for Floating Shapes
function initializeParallax() {
    const shapes = document.querySelectorAll('.shape');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        const rate = scrolled * -0.5;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.1;
            shape.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
}

// Add hover effects to profile image
document.addEventListener('DOMContentLoaded', function() {
    const profileImg = document.getElementById('profile-img');
    
    if (profileImg) {
        profileImg.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(5deg)';
        });
        
        profileImg.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    }
});

// Add click effect to buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    // Scroll-based animations and effects are already handled above
}, 16)); // ~60fps

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Set initial opacity
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Toggle theme with Ctrl/Cmd + D
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        document.getElementById('theme-toggle').click();
    }
    
    // Navigate sections with arrow keys
    if (e.key === 'ArrowDown' && e.ctrlKey) {
        e.preventDefault();
        const sections = ['home', 'about', 'contact'];
        const currentSection = getCurrentSection();
        const currentIndex = sections.indexOf(currentSection);
        const nextIndex = (currentIndex + 1) % sections.length;
        document.querySelector(`[href="#${sections[nextIndex]}"]`).click();
    }
    
    if (e.key === 'ArrowUp' && e.ctrlKey) {
        e.preventDefault();
        const sections = ['home', 'about', 'contact'];
        const currentSection = getCurrentSection();
        const currentIndex = sections.indexOf(currentSection);
        const prevIndex = currentIndex === 0 ? sections.length - 1 : currentIndex - 1;
        document.querySelector(`[href="#${sections[prevIndex]}"]`).click();
    }
});

function getCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    let currentSection = 'home';
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section.id;
        }
    });
    
    return currentSection;
}

// Add active nav link highlighting
window.addEventListener('scroll', throttle(function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section.id;
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}, 100));

// Add CSS for active nav link
const navStyle = document.createElement('style');
navStyle.textContent = `
    .nav-link.active {
        color: var(--accent-primary) !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(navStyle);

