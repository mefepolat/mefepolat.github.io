// HAMBURGER MENU FUNCTIONALITY
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// ANIMATED BACKGROUND PARTICLES (OPTIMIZED)
function createParticles() {
  const particlesContainer = document.querySelector('.floating-particles');
  
  // Create fewer particles for better performance
  for (let i = 0; i < 8; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
      position: absolute;
      width: 2px;
      height: 2px;
      background: #00ffff;
      border-radius: 50%;
      box-shadow: 0 0 8px #00ffff;
      animation: float ${20 + Math.random() * 10}s infinite linear;
      animation-delay: ${Math.random() * 20}s;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      opacity: ${0.4 + Math.random() * 0.5};
      will-change: transform;
    `;
    particlesContainer.appendChild(particle);
  }
}

// SKILL BAR ANIMATIONS
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skillBar = entry.target;
        const skillLevel = skillBar.getAttribute('data-skill');
        skillBar.style.setProperty('--skill-width', skillLevel + '%');
        skillBar.style.width = skillLevel + '%';
      }
    });
  });
  
  skillBars.forEach(bar => observer.observe(bar));
}

// TYPEWRITER EFFECT
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// GLITCH EFFECT (OPTIMIZED)
function addGlitchEffect() {
  const title = document.querySelector('.glitch-effect');
  if (title) {
    let isGlitching = false;
    
    setInterval(() => {
      if (Math.random() < 0.05 && !isGlitching) { // Reduced frequency and prevent overlap
        isGlitching = true;
        title.style.textShadow = `
          ${Math.random() * 8 - 4}px 0 #ff0080,
          ${Math.random() * 8 - 4}px 0 #00ffff,
          ${Math.random() * 8 - 4}px 0 #8000ff
        `;
        setTimeout(() => {
          title.style.textShadow = '0 0 20px #00ffff';
          isGlitching = false;
        }, 80);
      }
    }, 200); // Reduced frequency from 100ms to 200ms
  }
}

// SMOOTH SCROLLING WITH OFFSET FOR FIXED NAV
function smoothScrollToSection(sectionId) {
  const section = document.querySelector(sectionId);
  const navHeight = document.querySelector('nav').offsetHeight;
  
  if (section) {
    const offsetTop = section.offsetTop - navHeight;
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }
}

// UPDATE ALL NAVIGATION LINKS
function updateNavigationLinks() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = link.getAttribute('href');
      smoothScrollToSection(sectionId);
    });
  });
}

// FLOATING ANIMATION FOR ICONS
function addFloatingAnimation() {
  const icons = document.querySelectorAll('.icon-wrapper');
  icons.forEach((icon, index) => {
    icon.style.animationDelay = `${index * 0.2}s`;
  });
}

// PARALLAX EFFECT FOR SECTIONS (THROTTLED)
function addParallaxEffect() {
  let ticking = false;
  
  function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.profile-glow');
    
    parallaxElements.forEach(element => {
      const speed = 0.5;
      element.style.transform = `translate3d(0, ${scrolled * speed}px, 0)`;
    });
    
    ticking = false;
  }
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
}

// CURSOR TRAIL EFFECT (OPTIMIZED)
function createCursorTrail() {
  const trail = [];
  const trailLength = 6; // Reduced from 10
  const positions = [];
  
  for (let i = 0; i < trailLength; i++) {
    const dot = document.createElement('div');
    dot.className = 'cursor-trail';
    dot.style.cssText = `
      position: fixed;
      width: 3px;
      height: 3px;
      background: #00ffff;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      opacity: ${(1 - i / trailLength) * 0.8};
      transform: scale(${1 - i / trailLength});
      will-change: transform;
      box-shadow: 0 0 8px #00ffff;
    `;
    document.body.appendChild(dot);
    trail.push(dot);
    positions.push({ x: 0, y: 0 });
  }
  
  let mouseX = 0, mouseY = 0;
  let lastUpdate = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });
  
  function animateTrail(timestamp) {
    if (timestamp - lastUpdate > 16) { // Limit to ~60fps
      positions[0].x = mouseX;
      positions[0].y = mouseY;
      
      for (let i = 1; i < trailLength; i++) {
        const prev = positions[i - 1];
        const curr = positions[i];
        curr.x += (prev.x - curr.x) * 0.2;
        curr.y += (prev.y - curr.y) * 0.2;
      }
      
      trail.forEach((dot, index) => {
        const pos = positions[index];
        dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${1 - index / trailLength})`;
      });
      
      lastUpdate = timestamp;
    }
    
    requestAnimationFrame(animateTrail);
  }
  
  animateTrail();
}

// CARD REVEAL ANIMATION ON SCROLL
function addScrollRevealAnimation() {
  const cards = document.querySelectorAll('.card-hover, .project-card, .skill-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(card);
  });
}

// DYNAMIC BACKGROUND GRADIENT
function addDynamicBackground() {
  const background = document.querySelector('.animated-bg');
  let angle = 0;
  
  function updateGradient() {
    angle += 0.5;
    background.style.background = `
      linear-gradient(${angle}deg, 
        #0a0a0a 0%, 
        #1a1a1a 25%, 
        #0a0a0a 50%, 
        #1a1a1a 75%, 
        #0a0a0a 100%)
    `;
    requestAnimationFrame(updateGradient);
  }
  
  updateGradient();
}

// BUTTON HOVER SOUND EFFECT (Visual feedback)
function addButtonEffects() {
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateY(-3px) scale(1.02)';
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translateY(0) scale(1)';
    });
    
    button.addEventListener('mousedown', () => {
      button.style.transform = 'translateY(-1px) scale(0.98)';
    });
    
    button.addEventListener('mouseup', () => {
      button.style.transform = 'translateY(-3px) scale(1.02)';
    });
  });
}

// NAVIGATION ACTIVE STATE (THROTTLED)
function updateActiveNavigation() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');
  let ticking = false;
  let navHeight = null;
  
  function updateNav() {
    let current = '';
    if (!navHeight) navHeight = document.querySelector('nav').offsetHeight;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - navHeight - 100;
      const sectionHeight = section.clientHeight;
      
      if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
    
    ticking = false;
  }
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateNav);
      ticking = true;
    }
  }, { passive: true });
}

// PROJECT CARD INTERACTION (OPTIMIZED)
function addProjectCardEffects() {
  const articleContainers = document.querySelectorAll('.project-card .article-container');
  
  articleContainers.forEach(container => {
    const img = container.querySelector('.project-img');
    
    container.addEventListener('mouseenter', () => {
      if (img) {
        img.style.transform = 'scale(1.03)';
        img.style.filter = 'brightness(0.8)';
      }
    }, { passive: true });
    
    container.addEventListener('mouseleave', () => {
      if (img) {
        img.style.transform = 'scale(1)';
        img.style.filter = 'brightness(1)';
      }
    }, { passive: true });
  });
}

// OPTIMIZE CARD HOVER PERFORMANCE
function optimizeCardHoverPerformance() {
  const cardHoverElements = document.querySelectorAll('.card-hover');
  
  cardHoverElements.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.willChange = 'transform, border-color';
    }, { passive: true });
    
    card.addEventListener('mouseleave', () => {
      card.style.willChange = 'auto';
    }, { passive: true });
    
    // Clean up will-change after transition completes
    card.addEventListener('transitionend', () => {
      if (!card.matches(':hover')) {
        card.style.willChange = 'auto';
      }
    }, { passive: true });
  });
}

// INITIALIZE ALL ANIMATIONS AND EFFECTS
function initializeEffects() {
  // Basic functionality
  updateNavigationLinks();
  
  // Visual effects
  createParticles();
  addGlitchEffect();
  addFloatingAnimation();
  addScrollRevealAnimation();
  addButtonEffects();
  addProjectCardEffects();
  optimizeCardHoverPerformance(); // Call the new function here
  
  // Scroll-based effects
  animateSkillBars();
  updateActiveNavigation();
  addParallaxEffect();
  
  // Background effects
  addDynamicBackground();
  
  // Interactive effects
  createCursorTrail();
  
  // Typewriter effect for the main title
  const typingElement = document.querySelector('.typing-effect');
  if (typingElement) {
    const text = typingElement.textContent;
    typeWriter(typingElement, text, 150);
  }
}

// PERFORMANCE OPTIMIZATION
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// RESPONSIVE BEHAVIOR
function handleResize() {
  const isMobile = window.innerWidth <= 768;
  const cursorTrail = document.querySelectorAll('.cursor-trail');
  
  // Disable cursor trail on mobile
  if (isMobile) {
    cursorTrail.forEach(dot => dot.style.display = 'none');
  } else {
    cursorTrail.forEach(dot => dot.style.display = 'block');
  }
}

// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', initializeEffects);
window.addEventListener('resize', debounce(handleResize, 250));

// PRELOADER (Optional)
function addPreloader() {
  const preloader = document.createElement('div');
  preloader.innerHTML = `
    <div style="
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #0a0a0a;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      transition: opacity 0.5s ease;
    ">
      <div style="
        color: #00ffff;
        font-family: 'Orbitron', monospace;
        font-size: 2rem;
        text-shadow: 0 0 20px #00ffff;
        animation: pulse 1s infinite;
      ">Loading...</div>
    </div>
  `;
  
  document.body.appendChild(preloader);
  
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(preloader);
      }, 500);
    }, 1000);
  });
}

// Initialize preloader
addPreloader();