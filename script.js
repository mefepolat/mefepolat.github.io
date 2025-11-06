// HAMBURGER MENU TOGGLE
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// SMOOTH SCROLL FOR NAVIGATION LINKS
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ANIMATE SKILL BARS ON SCROLL
const animateSkillBars = () => {
  const skillBars = document.querySelectorAll('.skill-progress');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skillLevel = entry.target.getAttribute('data-skill');
        entry.target.style.width = skillLevel + '%';
      }
    });
  }, {
    threshold: 0.5
  });

  skillBars.forEach(bar => observer.observe(bar));
};

// FADE IN ANIMATION ON SCROLL
const fadeInOnScroll = () => {
  const elements = document.querySelectorAll('.details-container, .project-card, .contact-info-container');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1
  });

  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
  });
};

// NAVBAR BACKGROUND ON SCROLL
const navbarScroll = () => {
  const nav = document.querySelector('nav');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      nav.style.background = 'rgba(10, 14, 39, 0.98)';
      nav.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.3)';
    } else {
      nav.style.background = 'rgba(10, 14, 39, 0.85)';
      nav.style.boxShadow = 'none';
    }
  });
};

// ADD PARTICLES TO BACKGROUND
const createParticles = () => {
  const particlesContainer = document.querySelector('.floating-particles');
  const particleCount = 30;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 4 + 1;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: rgba(99, 102, 241, 0.6);
      border-radius: 50%;
      left: ${x}%;
      top: ${y}%;
      animation: floatParticle ${duration}s ease-in-out ${delay}s infinite;
      box-shadow: 0 0 10px rgba(99, 102, 241, 0.8);
    `;
    
    particlesContainer.appendChild(particle);
  }

  // Add keyframes for particle animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatParticle {
      0%, 100% {
        transform: translate(0, 0);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
};

// TYPING EFFECT FOR TITLE
const typingEffect = () => {
  const title = document.querySelector('#profile .title');
  if (!title) return;
  
  const text = title.textContent;
  title.textContent = '';
  title.style.opacity = '1';
  
  let index = 0;
  const typeInterval = setInterval(() => {
    if (index < text.length) {
      title.textContent += text.charAt(index);
      index++;
    } else {
      clearInterval(typeInterval);
    }
  }, 100);
};

// CURSOR TRAIL EFFECT
const createCursorTrail = () => {
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  const cursor = document.createElement('div');
  cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid rgba(99, 102, 241, 0.5);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.2s ease;
  `;
  document.body.appendChild(cursor);

  const animateCursor = () => {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    requestAnimationFrame(animateCursor);
  };

  animateCursor();

  // Expand cursor on hover over interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .icon');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(1.5)';
      cursor.style.borderColor = 'rgba(139, 92, 246, 0.8)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
      cursor.style.borderColor = 'rgba(99, 102, 241, 0.5)';
    });
  });
};

// INITIALIZE ALL FUNCTIONS
document.addEventListener('DOMContentLoaded', () => {
  animateSkillBars();
  fadeInOnScroll();
  navbarScroll();
  createParticles();
  
  // Typing effect with delay
  setTimeout(typingEffect, 500);
  
  // Cursor trail effect (only on desktop)
  if (window.innerWidth > 768) {
    createCursorTrail();
  }
  
  // Add active link highlighting
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });
});

// PRELOAD IMAGES
window.addEventListener('load', () => {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (img.complete) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', () => {
        img.classList.add('loaded');
      });
    }
  });
});

// ADD PARALLAX EFFECT TO BACKGROUND
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector('.animated-bg');
  if (parallax) {
    parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});
