/**
 * Obsidian-Mint Cyber Portfolio Interactive Logic
 * Client-Side JavaScript for Anujith's Developer Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  // Execute interactive initializations
  initScrollHeader();
  initScrollReveal();
  initTypewriter();
  initActiveNavHighlight();
  initClipboardUtility();
});

/**
 * 1. Scroll-driven Navigation Shrink and Progress Bar Update
 */
function initScrollHeader() {
  const header = document.getElementById('header');
  const progressBar = document.getElementById('progress-bar');
  
  if (!header || !progressBar) return;

  const updateHeaderScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // Calculate scroll progress percentage
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${scrollPercent}%`;

    // Add visual shrink & blur modifier to glass header
    if (scrollTop > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', updateHeaderScroll, { passive: true });
  updateHeaderScroll(); // Trigger on initial render
}

/**
 * 2. Intersection Observer for Scroll Reveals
 * Uses native IntersectionObserver to animate content into view.
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  
  if (!revealElements.length) return;

  const revealOptions = {
    threshold: 0.12,     // Fire when 12% of the element is visible
    rootMargin: '0px 0px -50px 0px' // Offset bottom viewport margin
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Once animated, stop observing this specific element for performance
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
}

/**
 * 3. Typewriter Animation Loop
 * Rotates technical focus titles in the Hero section.
 */
function initTypewriter() {
  const typewriterSpan = document.getElementById('typewriter-text');
  if (!typewriterSpan) return;

  // Retrieve array from dataset attributes
  const phrasesData = typewriterSpan.getAttribute('data-phrases');
  const phrases = phrasesData ? JSON.parse(phrasesData) : ["CS Student", "ML Enthusiast"];
  
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100; // Normal typing rate

  const type = () => {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      // Remove character
      typewriterSpan.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // Deleting is faster
    } else {
      // Add character
      typewriterSpan.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100; // Reset normal typing speed
    }

    // Checking phase transitions
    if (!isDeleting && charIndex === currentPhrase.length) {
      // Pause at full word before backspacing
      typingSpeed = 1800; 
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      // Cycle to the next phrase index
      phraseIndex = (phraseIndex + 1) % phrases.length;
      // Brief pause before starting next word
      typingSpeed = 400; 
    }

    setTimeout(type, typingSpeed);
  };

  // Start the typing loop
  setTimeout(type, 1000);
}

/**
 * 4. Active Navigation Indicator
 * Tracks position on page and updates active classes in the navbar.
 */
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  if (!sections.length || !navLinks.length) return;

  const highlightNav = () => {
    let currentActiveId = "";
    const scrollPos = window.scrollY + 120; // Anchor offset padding

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentActiveId = sectionId;
      }
    });

    // Special fallback for bottom of the page
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
  highlightNav(); // Trigger initially
}

/**
 * 5. Clipboard Copy Utility
 * Interactive helper to copy the email address on click.
 */
function initClipboardUtility() {
  const emailCard = document.getElementById('contact-email-card');
  const emailText = document.getElementById('email-address');
  const clipboardMsg = document.getElementById('email-clipboard-msg');

  if (!emailCard || !emailText || !clipboardMsg) return;

  // Add keydown accessibility support for keyboard navigators
  emailCard.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      emailCard.click();
    }
  });

  emailCard.addEventListener('click', () => {
    const textToCopy = emailText.textContent.trim();

    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        // Toggle visual active state classes
        emailCard.classList.add('copied');
        clipboardMsg.textContent = 'copied!';
        
        // Remove focus highlighting temporarily so trigger is distinct
        emailCard.blur();

        // Restore baseline values after timeout
        setTimeout(() => {
          emailCard.classList.remove('copied');
          clipboardMsg.textContent = 'copy';
        }, 2200);
      })
      .catch(err => {
        console.error('Error copying text to clipboard: ', err);
        // Fallback instructions if API block occurs
        clipboardMsg.textContent = 'Press Ctrl+C';
        setTimeout(() => {
          clipboardMsg.textContent = 'copy';
        }, 2500);
      });
  });
}
