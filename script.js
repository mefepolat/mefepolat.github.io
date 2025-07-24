// HAMBURGER MENU FUNCTIONALITY
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// ANIMATED BACKGROUND PARTICLES
function createParticles() {
  const particlesContainer = document.querySelector('.floating-particles');
  
  // Create additional floating particles
  for (let i = 0; i < 15; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
      position: absolute;
      width: 2px;
      height: 2px;
      background: #00ffff;
      border-radius: 50%;
      box-shadow: 0 0 10px #00ffff;
      animation: float ${20 + Math.random() * 10}s infinite linear;
      animation-delay: ${Math.random() * 20}s;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      opacity: ${0.3 + Math.random() * 0.7};
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

// GLITCH EFFECT
function addGlitchEffect() {
  const title = document.querySelector('.glitch-effect');
  if (title) {
    setInterval(() => {
      if (Math.random() < 0.1) {
        title.style.textShadow = `
          ${Math.random() * 10 - 5}px 0 #ff0080,
          ${Math.random() * 10 - 5}px 0 #00ffff,
          ${Math.random() * 10 - 5}px 0 #8000ff
        `;
        setTimeout(() => {
          title.style.textShadow = '0 0 20px #00ffff';
        }, 50);
      }
    }, 100);
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

// PARALLAX EFFECT FOR SECTIONS
function addParallaxEffect() {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.profile-glow, .about-overlay');
    
    parallaxElements.forEach(element => {
      const speed = 0.5;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
}

// CURSOR TRAIL EFFECT
function createCursorTrail() {
  const trail = [];
  const trailLength = 10;
  
  for (let i = 0; i < trailLength; i++) {
    const dot = document.createElement('div');
    dot.className = 'cursor-trail';
    dot.style.cssText = `
      position: fixed;
      width: 4px;
      height: 4px;
      background: #00ffff;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      opacity: ${1 - i / trailLength};
      transform: scale(${1 - i / trailLength});
      transition: all 0.1s ease;
      box-shadow: 0 0 10px #00ffff;
    `;
    document.body.appendChild(dot);
    trail.push(dot);
  }
  
  let mouseX = 0, mouseY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  function animateTrail() {
    let x = mouseX, y = mouseY;
    
    trail.forEach((dot, index) => {
      const nextDot = trail[index + 1] || trail[0];
      dot.style.left = x + 'px';
      dot.style.top = y + 'px';
      
      if (nextDot) {
        x += (nextDot.offsetLeft - x) * 0.3;
        y += (nextDot.offsetTop - y) * 0.3;
      }
    });
    
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
    card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
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

// NAVIGATION ACTIVE STATE
function updateActiveNavigation() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  window.addEventListener('scroll', () => {
    let current = '';
    const navHeight = document.querySelector('nav').offsetHeight;
    
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
  });
}

// PROJECT CARD INTERACTION
function addProjectCardEffects() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    const overlay = card.querySelector('.project-overlay');
    const img = card.querySelector('.project-img');
    
    card.addEventListener('mouseenter', () => {
      if (overlay) overlay.style.opacity = '1';
      if (img) img.style.transform = 'scale(1.05)';
    });
    
    card.addEventListener('mouseleave', () => {
      if (overlay) overlay.style.opacity = '0';
      if (img) img.style.transform = 'scale(1)';
    });
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