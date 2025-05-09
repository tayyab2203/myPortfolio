/*
 * Professional Portfolio - Advanced Animations
 * Designer: Cascade AI
 * Client: Tayyab Sajjad
 */

// Wait until DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  'use strict';
  
  // Initialize preloader
  initPreloader();
  
  // Initialize smooth scrolling
  initSmoothScrolling();
  
  // Initialize navbar effects
  initNavbar();
  
  // Initialize typed.js
  initTypedText();
  
  // Initialize AOS (Animate On Scroll)
  initAOS();
  
  // Initialize Particles.js
  initParticles();
  
  // Initialize skill bars animation
  initSkillBars();
  
  // Initialize back to top button
  initBackToTop();
  
  // Initialize custom cursor (desktop only)
  if (window.innerWidth >= 1200) {
    initCustomCursor();
  }
  
  // Initialize project filter functionality
  initProjectFilter();
  
  // Initialize contact form validation
  initContactForm();
});

// Preloader
function initPreloader() {
  const preloader = document.querySelector('.preloader');
  if (!preloader) return;
  
  // Ensure preloader is visible and centered immediately
  preloader.style.display = 'flex';
  
  // Set timeout for minimum preloader display time (better UX)
  const minDisplayTime = 1000; // 1 second minimum
  const startTime = Date.now();
  
  window.addEventListener('load', function() {
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, minDisplayTime - elapsedTime);
    
    // Use setTimeout to ensure minimum display time
    setTimeout(function() {
      preloader.classList.add('hidden');
      
      setTimeout(function() {
        preloader.style.display = 'none';
      }, 500); // Match transition duration in CSS
    }, remainingTime);
  });
}

// Smooth Scrolling
function initSmoothScrolling() {
  document.documentElement.classList.add('has-smooth-scrolling');
  
  // Handle anchor links smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      if (this.getAttribute('href') === '#') return;
      
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Close mobile menu if open
        const navbarCollapse = document.querySelector('.navbar-collapse');
        const navbarOverlay = document.querySelector('.navbar-overlay');
        
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
          navbarCollapse.classList.remove('show');
          if (navbarOverlay) navbarOverlay.classList.remove('show');
        }
        
        // Scroll to target
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Account for fixed header
          behavior: 'smooth'
        });
      }
    });
  });
}

// Navbar Effects
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  
  // Handle navbar background on scroll
  function updateNavbar() {
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  }
  
  window.addEventListener('scroll', updateNavbar);
  updateNavbar(); // Initial call
  
  // Mobile menu toggle
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  
  if (navbarToggler && navbarCollapse) {
    // Create navbar overlay for mobile
    const overlay = document.createElement('div');
    overlay.className = 'navbar-overlay';
    document.body.appendChild(overlay);
    
    navbarToggler.addEventListener('click', function() {
      navbarCollapse.classList.toggle('show');
      overlay.classList.toggle('show');
      document.body.classList.toggle('no-scroll');
    });
    
    overlay.addEventListener('click', function() {
      navbarCollapse.classList.remove('show');
      overlay.classList.remove('show');
      document.body.classList.remove('no-scroll');
    });
  }
  
  // Active link handling
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar .nav-link');
  
  function highlightNavLink() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  window.addEventListener('scroll', highlightNavLink);
  highlightNavLink(); // Initial call
}

// Typed.js Text Animation
function initTypedText() {
  const typedElement = document.querySelector('#typed');
  
  if (!typedElement) return;
  
  new Typed(typedElement, {
    strings: [
      'Web Developer',
      'UI/UX Designer',
      'Mobile App Developer',
      'Computer Science Student'
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2000,
    loop: true,
    showCursor: true,
    cursorChar: '|'
  });
}

// AOS Initialization
function initAOS() {
  if (typeof AOS === 'undefined') return;
  
  AOS.init({
    duration: 800,
    easing: 'ease-out',
    once: true,
    offset: 50,
    disable: 'mobile'
  });
}

// Particles.js Configuration
function initParticles() {
  if (!document.getElementById('particles-js') || typeof particlesJS === 'undefined') return;
  
  // Check if mobile for reduced particle count
  const isMobile = window.innerWidth < 768;
  
  particlesJS('particles-js', {
    particles: {
      number: {
        value: isMobile ? 30 : 80,
        density: {
          enable: true,
          value_area: isMobile ? 900 : 1200
        }
      },
      color: {
        value: ['#E18335', '#2A3B4C', '#F5F7FA']  // Orange, Navy Blue, Light
      },
      shape: {
        type: ['circle', 'triangle'],
        stroke: {
          width: 0,
          color: '#000000'
        },
        polygon: {
          nb_sides: 5
        }
      },
      opacity: {
        value: 0.3,
        random: true,
        anim: {
          enable: true,
          speed: 0.8,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 4,
        random: true,
        anim: {
          enable: true,
          speed: 2,
          size_min: 0.1,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#405D7B',  // Steel Blue
        opacity: 0.25,
        width: 1.2
      },
      move: {
        enable: true,
        speed: isMobile ? 1.5 : 2.5,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: {
          enable: true,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'grab'
        },
        onclick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 180,
          line_linked: {
            opacity: 0.5
          }
        },
        bubble: {
          distance: 400,
          size: 5.5,
          duration: 2,
          opacity: 0.8,
          speed: 3
        },
        repulse: {
          distance: 200,
          duration: 0.4
        },
        push: {
          particles_nb: isMobile ? 2 : 4
        },
        remove: {
          particles_nb: 2
        }
      }
    },
    retina_detect: true
  });
}

// Skill Bars Animation
function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-bar-progress');
  if (!skillBars.length) return;
  
  const animateSkillBars = function() {
    skillBars.forEach(bar => {
      const percentage = bar.getAttribute('data-width') || '0';
      bar.style.width = percentage;
    });
  };
  
  // Use Intersection Observer for better performance
  if ('IntersectionObserver' in window) {
    const skillsSection = document.querySelector('.skills-section');
    if (!skillsSection) return;
    
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(animateSkillBars, 300);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    observer.observe(skillsSection);
  } else {
    // Fallback for browsers that don't support Intersection Observer
    window.addEventListener('scroll', function() {
      const skillsSection = document.querySelector('.skills-section');
      if (!skillsSection) return;
      
      const sectionTop = skillsSection.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (sectionTop < windowHeight * 0.8) {
        setTimeout(animateSkillBars, 300);
        window.removeEventListener('scroll', arguments.callee);
      }
    });
  }
}

// Back to Top Button
function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');
  if (!backToTopBtn) return;
  
  // Show/hide button based on scroll position
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });
  
  // Smooth scroll to top when clicked
  backToTopBtn.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Custom Cursor
function initCustomCursor() {
  const cursor = document.createElement('div');
  cursor.className = 'cursor';
  document.body.appendChild(cursor);
  
  const cursorFollower = document.createElement('div');
  cursorFollower.className = 'cursor-follower';
  document.body.appendChild(cursorFollower);
  
  document.body.classList.add('custom-cursor-enabled');
  
  document.addEventListener('mousemove', function(e) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    // Add slight delay to follower for smooth effect
    setTimeout(function() {
      cursorFollower.style.left = e.clientX + 'px';
      cursorFollower.style.top = e.clientY + 'px';
    }, 80);
  });
  
  // Detect when cursor is over interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .btn, input, textarea, .project-card, .skill-card');
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
      cursor.classList.add('cursor-hover');
      cursorFollower.classList.add('cursor-hover');
    });
    
    element.addEventListener('mouseleave', function() {
      cursor.classList.remove('cursor-hover');
      cursorFollower.classList.remove('cursor-hover');
    });
  });
}

// Project filter functionality
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectItems = document.querySelectorAll('.project-card');
  
  if (!filterBtns.length || !projectItems.length) return;
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      
      // Add active class to current button
      this.classList.add('active');
      
      const filterValue = this.getAttribute('data-filter');
      
      // Filter projects
      projectItems.forEach(item => {
        if (filterValue === 'all') {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 100);
        } else {
          if (item.classList.contains(filterValue)) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            }, 100);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        }
      });
    });
  });
}

// Contact form validation
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;
  
  form.addEventListener('submit', function(e) {
    let valid = true;
    const nameInput = form.querySelector('input[name="name"]');
    const emailInput = form.querySelector('input[name="email"]');
    const messageInput = form.querySelector('textarea[name="message"]');
    
    // Simple validation
    if (nameInput && nameInput.value.trim() === '') {
      valid = false;
      nameInput.classList.add('is-invalid');
    } else if (nameInput) {
      nameInput.classList.remove('is-invalid');
    }
    
    if (emailInput) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        valid = false;
        emailInput.classList.add('is-invalid');
      } else {
        emailInput.classList.remove('is-invalid');
      }
    }
    
    if (messageInput && messageInput.value.trim() === '') {
      valid = false;
      messageInput.classList.add('is-invalid');
    } else if (messageInput) {
      messageInput.classList.remove('is-invalid');
    }
    
    if (!valid) {
      e.preventDefault();
    }
  });
  
  // Real-time validation
  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('input', function() {
      if (this.classList.contains('is-invalid')) {
        if (this.value.trim() !== '') {
          this.classList.remove('is-invalid');
        }
      }
    });
  });
}

// Window Resize Handler
window.addEventListener('resize', function() {
  // Disable custom cursor on mobile
  if (window.innerWidth < 1200) {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (cursor) cursor.remove();
    if (cursorFollower) cursorFollower.remove();
    
    document.body.classList.remove('custom-cursor-enabled');
  } else if (!document.querySelector('.cursor') && window.innerWidth >= 1200) {
    initCustomCursor();
  }
  
  // Reinitialize AOS
  if (typeof AOS !== 'undefined') {
    AOS.refresh();
  }
});
