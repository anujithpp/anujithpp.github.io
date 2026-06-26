/**
 * Anujith Portfolio - Interactive Logic
 * Clean, modern JavaScript for portfolio interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initScrollHeader();
  initScrollReveal();
  initTypewriter();
  initActiveNavHighlight();
  initMobileMenu();
  initEmailClipboard();
});

/**
 * Email Copy-to-Clipboard
 */
function initEmailClipboard() {
  const emailCard = document.getElementById('contact-email-card');
  const emailAddress = document.getElementById('email-address');
  const clipboardMsg = document.getElementById('email-clipboard-msg');

  if (!emailCard || !emailAddress || !clipboardMsg) return;

  const copyEmail = () => {
    const email = emailAddress.textContent.trim();
    navigator.clipboard.writeText(email).then(() => {
      clipboardMsg.textContent = 'copied!';
      clipboardMsg.classList.add('copied');
      setTimeout(() => {
        clipboardMsg.textContent = 'copy';
        clipboardMsg.classList.remove('copied');
      }, 2000);
    }).catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = email;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      clipboardMsg.textContent = 'copied!';
      clipboardMsg.classList.add('copied');
      setTimeout(() => {
        clipboardMsg.textContent = 'copy';
        clipboardMsg.classList.remove('copied');
      }, 2000);
    });
  };

  emailCard.addEventListener('click', copyEmail);
  emailCard.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      copyEmail();
    }
  });
}

/**
 * Scroll-driven Header and Progress Bar
 */
function initScrollHeader() {
  const header = document.getElementById('header');
  const progressBar = document.getElementById('progress-bar');
  
  if (!header || !progressBar) return;

  const updateHeaderScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    
    progressBar.style.width = `${scrollPercent}%`;

    if (scrollTop > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', updateHeaderScroll, { passive: true });
  updateHeaderScroll();
}

/**
 * Scroll Reveal Animation using Intersection Observer
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  
  if (!revealElements.length) return;

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
}

/**
 * Typewriter Effect for Hero Section
 */
function initTypewriter() {
  const typewriterSpan = document.getElementById('typewriter-text');
  if (!typewriterSpan) return;

  const phrasesData = typewriterSpan.getAttribute('data-phrases');
  const phrases = phrasesData ? JSON.parse(phrasesData) : ["CS Student", "ML Enthusiast"];
  
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  const type = () => {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      typewriterSpan.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typewriterSpan.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      typingSpeed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  };

  setTimeout(type, 1000);
}

/**
 * Active Navigation Highlight based on scroll position
 */
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  if (!sections.length || !navLinks.length) return;

  const highlightNav = () => {
    let currentActiveId = "";
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentActiveId = sectionId;
      }
    });

    if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 10) {
      currentActiveId = sections[sections.length - 1].getAttribute('id');
    }

    navLinks.forEach(link => {
      link.classList.remove('active');
      const hrefValue = link.getAttribute('href');
      if (hrefValue === `#${currentActiveId}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav();
}

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  const navOverlay = document.getElementById('nav-overlay');

  if (!navToggle || !navLinks) return;

  const closeMenu = () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('active');
    if (navOverlay) navOverlay.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  const openMenu = () => {
    navToggle.classList.add('active');
    navLinks.classList.add('active');
    if (navOverlay) navOverlay.classList.add('active');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.classList.contains('active');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  if (navOverlay) {
    navOverlay.addEventListener('click', closeMenu);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navToggle.classList.contains('active')) {
      closeMenu();
    }
  });
}

/**
 * Dark/Light Theme Toggle with localStorage persistence
 */
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  const STORAGE_KEY = 'anujith-theme';

  // Check for saved theme or system preference
  const savedTheme = localStorage.getItem(STORAGE_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.setAttribute('aria-label', 'Switch to light mode');
  }

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
    themeToggle.setAttribute('aria-label', newTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  });
}
