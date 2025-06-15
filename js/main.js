document.addEventListener("DOMContentLoaded", function () {
  // Initialize all components
  initNavigation();

  // Only initialize components that are visible in the viewport on load
  initHeroCanvas();

  // Lazy initialize other components
  initScrollAnimations();

  // Initialize portfolio directly instead of using requestIdleCallback
  console.log("Main.js: Initializing portfolio");
  initPortfolio();
  
  // Use requestIdleCallback only for custom cursor
  if ("requestIdleCallback" in window) {
    requestIdleCallback(() => initCustomCursor());
  } else {
    // Fallback for browsers that don't support requestIdleCallback
    setTimeout(() => initCustomCursor(), 200);
  }

  // Setup intersection observers for lazy loading components
  setupLazyLoading();
});

// Helper functions for performance optimization
function debounce(func, wait) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function () {
    const context = this;
    const args = arguments;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Setup lazy loading using Intersection Observer
function setupLazyLoading() {
  // Only create observer if supported
  if ("IntersectionObserver" in window) {
    const lazyLoadOptions = {
      rootMargin: "200px", // Load elements 200px before they enter viewport
      threshold: 0.01,
    };

    const lazyLoadObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const section = entry.target;
          const sectionId = section.id;

          // Initialize specific functionality for the section that came into view
          if (sectionId === "experience" && !section.dataset.initialized) {
            enhanceExperienceSection();
            section.dataset.initialized = "true";
          }

          lazyLoadObserver.unobserve(section);
        }
      });
    }, lazyLoadOptions);

    // Observe all sections except hero (which is already initialized)
    document.querySelectorAll("section:not(#hero)").forEach((section) => {
      lazyLoadObserver.observe(section);
    });
  }
}

// Navigation functionality
function initNavigation() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const nav = document.querySelector(".main-nav");
  const navItems = document.querySelectorAll(".nav-links li");
  const body = document.body;

  // Add index for staggered animation
  navItems.forEach((item, index) => {
    item.style.setProperty("--i", index);
  });

  // Toggle mobile menu
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("nav-active");
      body.classList.toggle("menu-open");

      // Animate hamburger to X
      const bars = menuToggle.querySelectorAll(".bar");
      bars[0].classList.toggle("bar-top-active");
      bars[1].classList.toggle("bar-middle-active");
      bars[2].classList.toggle("bar-bottom-active");
    });
  }

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    const isNavLink = e.target.closest(".nav-links");
    const isMenuToggle = e.target.closest(".menu-toggle");
    
    if (!isNavLink && !isMenuToggle && navLinks.classList.contains("nav-active")) {
      navLinks.classList.remove("nav-active");
      body.classList.remove("menu-open");
      
      const bars = menuToggle.querySelectorAll(".bar");
      bars[0].classList.remove("bar-top-active");
      bars[1].classList.remove("bar-middle-active");
      bars[2].classList.remove("bar-bottom-active");
    }
  });

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      // Close mobile menu if open
      if (navLinks.classList.contains("nav-active")) {
        navLinks.classList.remove("nav-active");
        body.classList.remove("menu-open");
        
        const bars = menuToggle.querySelectorAll(".bar");
        bars[0].classList.remove("bar-top-active");
        bars[1].classList.remove("bar-middle-active");
        bars[2].classList.remove("bar-bottom-active");
      }

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: "smooth",
        });
      }
    });
  });

  // Change navigation style on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      nav.classList.add("nav-scrolled");
    } else {
      nav.classList.remove("nav-scrolled");
    }
  });
}

// Hero section canvas animation with performance optimizations
function initHeroCanvas() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  // Use logical dimensions for the canvas and scale with CSS
  // for better performance on high DPI screens
  const setCanvasDimensions = () => {
    const devicePixelRatio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * devicePixelRatio;
    canvas.height = rect.height * devicePixelRatio;

    // Scale the context to ensure correct drawing operations
    ctx.scale(devicePixelRatio, devicePixelRatio);

    // Set CSS dimensions
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
  };

  setCanvasDimensions();

  const particles = [];
  // Adjust particle count based on screen size for better performance
  const particleCount = Math.min(
    100,
    Math.floor((window.innerWidth * window.innerHeight) / 8000)
  );
  const colors = ["#6c5ce7", "#fd79a8", "#00b894"];

  class Particle {
    constructor() {
      this.x = (Math.random() * canvas.width) / (window.devicePixelRatio || 1);
      this.y = (Math.random() * canvas.height) / (window.devicePixelRatio || 1);
      this.size = Math.random() * 5 + 1;
      this.speedX = Math.random() * 3 - 1.5;
      this.speedY = Math.random() * 3 - 1.5;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.opacity = Math.random() * 0.5 + 0.1;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Bounce off edges
      if (
        this.x > canvas.width / (window.devicePixelRatio || 1) ||
        this.x < 0
      ) {
        this.speedX = -this.speedX;
      }

      if (
        this.y > canvas.height / (window.devicePixelRatio || 1) ||
        this.y < 0
      ) {
        this.speedY = -this.speedY;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.opacity;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  function init() {
    particles.length = 0; // Clear existing particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  let animationFrameId;
  let lastTime = 0;
  const fpsInterval = 1000 / 30; // Target 30 fps for better performance

  function animate(timestamp) {
    animationFrameId = requestAnimationFrame(animate);

    // Calculate elapsed time since last frame
    const elapsed = timestamp - lastTime;

    // Only update if enough time has passed (frame rate limiting)
    if (elapsed > fpsInterval) {
      lastTime = timestamp - (elapsed % fpsInterval);

      ctx.clearRect(
        0,
        0,
        canvas.width / (window.devicePixelRatio || 1),
        canvas.height / (window.devicePixelRatio || 1)
      );

      // Only draw connections if not on a mobile device (for performance)
      const isMobile = window.innerWidth < 768;
      if (!isMobile) {
        // Connect particles with lines if they're close enough
        ctx.lineWidth = 0.5;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(255, 255, 255, ${
                0.1 * (1 - distance / 100)
              })`;
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      }

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
    }
  }

  // Check if the hero section is in viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }

  // Initialize canvas only if hero section is visible
  function checkHeroVisibility() {
    const heroSection = document.getElementById("hero");
    if (heroSection && isElementInViewport(heroSection)) {
      if (!animationFrameId) {
        init();
        animate(0);
      }
    } else {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    }
  }

  // Initial check
  checkHeroVisibility();

  // Handle window resize with debouncing
  window.addEventListener(
    "resize",
    debounce(() => {
      setCanvasDimensions();
      init();
    }, 250)
  );

  // Handle scroll with throttling to improve performance
  window.addEventListener("scroll", throttle(checkHeroVisibility, 200));
}

// Scroll-based animations with performance improvements
function initScrollAnimations() {
  // Initialize GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // Batch animations to minimize layout thrashing
  ScrollTrigger.config({ ignoreMobileResize: true });

  // Only create animations for elements that are present
  const skillElements = gsap.utils.toArray(".skill-fill");
  if (skillElements.length) {
    // Batch these animations together
    const skillsTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: skillElements[0].parentNode.parentNode,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    skillElements.forEach((skill) => {
      const width = skill.style.width;

      // Set initial state
      gsap.set(skill, { width: 0 });

      // Add to timeline
      skillsTimeline.to(
        skill,
        {
          width: width,
          duration: 1.5,
          ease: "power2.out",
        },
        "<0.2"
      );
    });
  }

  // Animate timeline items
  gsap.utils.toArray(".timeline-item").forEach((item, i) => {
    const direction = i % 2 === 0 ? 50 : -50;

    gsap.from(item, {
      x: direction,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: item,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  });

  // Parallax effect for artist image
  gsap.to(".artist-image", {
    yPercent: 10,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero-section",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  // Animate section headers
  gsap.utils.toArray(".section-header").forEach((header) => {
    gsap.from(header, {
      y: 50,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: header,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  });
}

// Additional function to enhance the experience section (lazy loaded)
function enhanceExperienceSection() {
  // Add interactive elements or animations to the timeline
  const timelineItems = document.querySelectorAll(".timeline-item");

  timelineItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      gsap.to(item, {
        scale: 1.03,
        boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
        duration: 0.3,
      });
    });

    item.addEventListener("mouseleave", () => {
      gsap.to(item, {
        scale: 1,
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        duration: 0.3,
      });
    });
  });
}

function initCustomCursor() {
  const cursorDot = document.querySelector(".cursor-dot");
  const cursorOutline = document.querySelector(".cursor-outline");

  if (!cursorDot || !cursorOutline) return;

  // Use a throttled event handler for mousemove to improve performance
  window.addEventListener(
    "mousemove",
    throttle((e) => {
      const posX = e.clientX;
      const posY = e.clientY;

      // Use transform instead of left/top for better performance
      cursorDot.style.transform = `translate(${posX}px, ${posY}px)`;

      // Use requestAnimationFrame for smoother cursor outline movement
      requestAnimationFrame(() => {
        gsap.to(cursorOutline, {
          x: posX,
          y: posY,
          duration: 0.15,
          ease: "power1.out",
          force3D: true, // Force GPU acceleration
        });
      });
    }, 5)
  ); // Small throttle for smoothness

  // Cursor effects on interactive elements
  const interactiveElements = document.querySelectorAll(
    "a, button, .portfolio-item, .filter-btn, input, textarea"
  );

  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursorDot.style.transform = "translate(-50%, -50%) scale(1.5)";
      cursorOutline.style.transform = "translate(-50%, -50%) scale(1.5)";
      cursorOutline.style.backgroundColor = "rgba(108, 92, 231, 0.1)";
    });

    el.addEventListener("mouseleave", () => {
      cursorDot.style.transform = "translate(-50%, -50%) scale(1)";
      cursorOutline.style.transform = "translate(-50%, -50%) scale(1)";
      cursorOutline.style.backgroundColor = "transparent";
    });
  });

  // Hide cursor when leaving window
  document.addEventListener("mouseleave", () => {
    cursorDot.style.display = "none";
    cursorOutline.style.display = "none";
  });

  document.addEventListener("mouseenter", () => {
    cursorDot.style.display = "block";
    cursorOutline.style.display = "block";
  });
}
