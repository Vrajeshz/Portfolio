// Portfolio data structure
const portfolioItems = [
  {
    id: 1,
    title: "💼 Bankist Web – Smooth Banking UI Experience",
    description:
      `A sleek, modern banking front-end project focused on delivering a professional UI/UX. This single-page interface demonstrates advanced JavaScript concepts like lazy loading, smooth scrolling, sticky navigation, modal windows, and tabbed components.
      Highlights:
• Lazy loading for performance optimization
• Section reveal on scroll
• Sticky navigation and page transitions
• Modal for login and tabbed account features`,
    thumbnail: "assets/portfolio/thumbnails/bankistWeb.jpg",
    image: "assets/portfolio/bankistWeb.jpg",
    ViewLive: "http://vrajeshz.github.io/Bankist-Web/",
    technologyTag: "HTML, CSS, JavaScript (DOM manipulation) Intersection Observer API",
    category: "websites",
  },
  {
    id: 2,
    title: "🍽 Omnifood – Smart Food Delivery Website",
    description:
      `A responsive, modern website for a fictional AI-powered food delivery service. Designed using clean layout principles and mobile-first workflow, it ensures a seamless experience on all screen sizes.
Features Implemented:
• Hero section with call-to-action
• Sticky navigation and smooth scrolling
• Responsive design with media queries
• Testimonials, pricing plans, and contact form
• Layout built with flexbox and grid`,
    thumbnail: "assets/portfolio/thumbnails/omnifood.jpg",
    image: "assets/portfolio/omnifood.jpg",
    ViewLive: "http://vrajeshz.github.io/Omnifood/",
    technologyTag: "HTML, CSS (Flexbox Grid), JavaScript (basic DOM events)",
    category: "websites",
  },
  {
    id: 3,
    title: "🏦 Bankist – Functional Banking Web App",
    description:
      `A fully functional banking web application where users can securely manage their accounts. This project simulates real-world banking operations with a clean, interactive design.
Features Implemented:
• User login and logout
• Check account balance and transaction history
• Money transfer between users
• Loan request based on transaction history
• Account closure functionality
• Auto logout after inactivity`,
    thumbnail: "assets/portfolio/thumbnails/bankist.jpg",
    image: "assets/portfolio/bankist.jpg",
    ViewLive: "http://vrajeshz.github.io/Bankist/",
    technologyTag: "HTML, CSS, JavaScript (Array methods event handling timers)",
    category: "websites",
  },
  {
    id: 4,
    title: "🎲 Greedy Game – Two Player Dice Challenge",
    description:
      `A fun, turn-based dice game where two players compete to reach 100 points. Players roll the dice to build their score but risk losing their turn if they roll a 1. Strategic use of the "Hold" button adds a layer of decision-making to the gameplay.
Features Implemented:
• Two-player game logic
• Scoreboard for current and total scores
• Dice roll animations
• Game reset functionality
• Win detection and UI update`,
    thumbnail: "assets/portfolio/thumbnails/GreedyGame.jpg",
    image: "assets/portfolio/GreedyGame.jpg",
    ViewLive: "https://vrajeshz.github.io/Greedy-Game/",
    technologyTag: "HTML, CSS, JavaScript (DOM manipulation game logic)",
    category: "websites",
  },
  {
    id: 5,
    title: "🎲 Greedy Game – Two Player Dice Challenge",
    description:
      `A fun single-player game where the player guesses a randomly generated number between 1 and 20. After each guess, real-time feedback guides the player closer to the correct number. The game includes scoring and a high score tracker to encourage replayability.
Features Implemented:
• Random number generation
• Feedback based on user input
• Score tracking and high score saving
• Restart game without page reload
• Dynamic UI updates based on game state`,
    thumbnail: "assets/portfolio/thumbnails/guessTheNumber.jpg",
    image: "assets/portfolio/guessTheNumber.jpg",
    ViewLive: "http://vrajeshz.github.io/Guess-the-Number/",
    technologyTag: "HTML, CSS, JavaScript (DOM manipulation conditionals)",
    category: "websites",
  }
];

// Sort the portfolioItems array by id
portfolioItems.sort((a, b) => a.id - b.id);

// Self-executing function to ensure portfolio is initialized
(function() {
  // Log portfolio items to check if they exist
  console.log("Portfolio items:", portfolioItems);
  
  // Call initPortfolio directly to ensure it runs
  document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM loaded, initializing portfolio");
    initPortfolio();
  });
})();

function initPortfolio() {
  console.log("Initializing portfolio...");
  const portfolioGrid = document.querySelector(".portfolio-grid");
  
  // Debug check if portfolio grid exists
  if (!portfolioGrid) {
    console.error("Portfolio grid element not found. Make sure the HTML contains an element with class 'portfolio-grid'");
    return;
  }
  
  console.log("Portfolio grid found:", portfolioGrid);
  
  const filterButtons = document.querySelectorAll(".filter-btn");
  const modal = document.querySelector(".portfolio-modal");
  let currentCategory = "all";
  let currentItemIndex = 0;
  let preloadedImages = new Map(); // For caching preloaded images

  // Create portfolio items
  function renderPortfolioItems(category) {
    console.log("Rendering portfolio items for category:", category);
    
    // Clear grid
    if (portfolioGrid) portfolioGrid.innerHTML = "";

    // Filter and create items
    const filteredItems =
      category === "all"
        ? portfolioItems
        : portfolioItems.filter((item) => item.category === category);

    console.log("Filtered items:", filteredItems);

    if (filteredItems.length === 0) {
      portfolioGrid.innerHTML =
        '<p class="no-items">No items to display in this category</p>';
      return;
    }

    filteredItems.forEach((item) => {
      const portfolioItem = document.createElement("div");
      portfolioItem.className = "portfolio-item";
      portfolioItem.dataset.category = item.category;
      portfolioItem.dataset.id = item.id;

      portfolioItem.innerHTML = `
                <img src="${item.thumbnail}" alt="${item.title}" loading="lazy">
                <div class="portfolio-item-info">
                    <h3>${item.title}</h3>
                    <p>${item.category}</p>
                </div>
                <div class="portfolio-item-hover">
                    <span>View Details</span>
                </div>
            `;

      // 3D hover effect
      portfolioItem.addEventListener("mousemove", handleHover3D);
      portfolioItem.addEventListener("mouseleave", resetHover3D);

      // Open modal on click
      portfolioItem.addEventListener("click", () => {
        openModal(item.id);
      });

      portfolioGrid.appendChild(portfolioItem);
      console.log("Added portfolio item:", item.title);
    });

    // Add animation to items
    animatePortfolioItems();

    // Start preloading the first few full-size images
    preloadNextImages(filteredItems, 0, 3);
  }

  // Preload images for better performance when navigating
  function preloadNextImages(items, startIdx, count) {
    for (let i = 0; i < count && i + startIdx < items.length; i++) {
      const item = items[i + startIdx];
      if (!preloadedImages.has(item.id)) {
        const img = new Image();
        img.src = item.image;
        preloadedImages.set(item.id, img);
      }
    }
  }

  // 3D hover effect - improved for stability
  function handleHover3D(e) {
    // Don't process if we're already transitioning
    if (this.isTransitioning) return;
    
    const item = this;
    const { left, top, width, height } = item.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const centerX = width / 2;
    const centerY = height / 2;

    // Limit the rotation angle to prevent extreme tilting
    const maxRotation = 8;
    const rotateX = Math.max(Math.min((y - centerY) / 10, maxRotation), -maxRotation);
    const rotateY = Math.max(Math.min((centerX - x) / 10, maxRotation), -maxRotation);

    // Apply transform with hardware acceleration
    item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    
    // Ensure image stays visible
    const img = item.querySelector('img');
    if (img) {
      img.style.transform = 'scale(1.1)';
    }
  }

  function resetHover3D() {
    const item = this;
    
    // Mark as transitioning to prevent new hover events during reset
    item.isTransitioning = true;
    
    // Use GSAP for smoother reset animation
    gsap.to(item, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
      clearProps: "transform", // Clean up props after animation
      onComplete: function() {
        item.isTransitioning = false;
        item.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
      }
    });
    
    // Reset the image scale
    const img = item.querySelector('img');
    if (img) {
      gsap.to(img, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out"
      });
    }
  }

  // Enhanced animation for portfolio items
  function animatePortfolioItems() {
    // Clear previous animations
    gsap.killTweensOf(".portfolio-item");

    // Create a staggered entrance animation
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    // Reset initial state
    gsap.set(portfolioItems, {
      opacity: 0,
      y: 100,
      scale: 0.8,
      rotationY: 15,
    });

    // Create timeline for smoother sequence
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    tl.to(".portfolio-filter", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
    });

    tl.to(portfolioItems, {
      opacity: 1,
      y: 0,
      scale: 1,
      rotationY: 0,
      stagger: {
        each: 0.1,
        from: "center",
        grid: "auto",
      },
      duration: 0.8,
      ease: "back.out(1.7)",
      onComplete: () => {
        // Add hover animations after items are loaded
        addHoverEffects();
      },
    });

    // Add particle effects to the background during animation
    createParticleEffect();
  }

  // New particle effect for the portfolio section
  function createParticleEffect() {
    const portfolioSection = document.querySelector(".portfolio-section");
    if (!portfolioSection) return;

    // Create canvas for particles
    if (!document.getElementById("portfolio-particles")) {
      const canvas = document.createElement("canvas");
      canvas.id = "portfolio-particles";
      canvas.style.position = "absolute";
      canvas.style.top = "0";
      canvas.style.left = "0";
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.pointerEvents = "none";
      canvas.style.zIndex = "0";
      portfolioSection.prepend(canvas);

      const ctx = canvas.getContext("2d");
      const particles = [];

      function resizeCanvas() {
        canvas.width = portfolioSection.offsetWidth;
        canvas.height = portfolioSection.offsetHeight;
      }

      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);

      // Create particles
      for (let i = 0; i < 30; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          color: ["#6c5ce7", "#fd79a8", "#00b894"][
            Math.floor(Math.random() * 3)
          ],
          speed: Math.random() * 1 + 0.5,
          angle: Math.random() * 360,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }

      // Animate particles
      function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p) => {
          p.x += Math.cos((p.angle * Math.PI) / 180) * p.speed;
          p.y += Math.sin((p.angle * Math.PI) / 180) * p.speed;

          // Bounce off edges
          if (p.x < 0 || p.x > canvas.width) p.angle = 180 - p.angle;
          if (p.y < 0 || p.y > canvas.height) p.angle = 360 - p.angle;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color
            .replace(")", `, ${p.opacity})`)
            .replace("rgb", "rgba");
          ctx.fill();
        });

        requestAnimationFrame(animateParticles);
      }

      animateParticles();
    }
  }

  // Enhanced hover effects with improved stability
  function addHoverEffects() {
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    portfolioItems.forEach((item) => {
      const img = item.querySelector("img");
      const info = item.querySelector(".portfolio-item-info");

      // Create hover timeline for each item
      const hoverTl = gsap.timeline({ paused: true });

      // More conservative scale to prevent flickering
      hoverTl.to(
        img,
        {
          scale: 1.08,
          filter: "brightness(0.8) contrast(1.2)",
          duration: 0.4,
          ease: "power2.out",
          force3D: true // Force hardware acceleration
        },
        0
      );

      hoverTl.to(
        info,
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          force3D: true
        },
        0
      );

      // Add shine effect element if not exists
      if (!item.querySelector(".shine-effect")) {
        const shineEffect = document.createElement("div");
        shineEffect.classList.add("shine-effect");
        shineEffect.style.position = "absolute";
        shineEffect.style.top = "0";
        shineEffect.style.left = "0";
        shineEffect.style.width = "100%";
        shineEffect.style.height = "100%";
        shineEffect.style.background =
          "linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)";
        shineEffect.style.transform = "translateX(-100%)";
        shineEffect.style.pointerEvents = "none";
        item.appendChild(shineEffect);

        hoverTl.to(
          shineEffect,
          {
            x: "100%",
            duration: 1,
            ease: "power2.out",
          },
          0
        );
      }

      // Throttle function for mousemove events
      const throttledMouseMove = throttle(function(e) {
        // Only run 3D tilt if we're not currently resetting
        if (!item.isTransitioning) {
          const rect = item.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          // Limit rotation for stability
          const maxRotate = 8;
          const rotateX = Math.max(Math.min((y - centerY) / 15, maxRotate), -maxRotate);
          const rotateY = Math.max(Math.min((centerX - x) / 15, maxRotate), -maxRotate);

          gsap.to(item, {
            rotateX: rotateX,
            rotateY: rotateY,
            transformPerspective: 1000,
            duration: 0.4,
            ease: "power1.out",
            force3D: true
          });
        }
      }, 16); // ~60fps

      // Handle mouse events with improved stability
      item.addEventListener("mouseenter", () => {
        // Prevent rapid hover in/out issues
        if (item.hoverTimeout) {
          clearTimeout(item.hoverTimeout);
          item.hoverTimeout = null;
        }
        
        hoverTl.play();
        item.isHovering = true;
      });
      
      item.addEventListener("mouseleave", () => {
        // Slight delay before reversing to prevent flicker on edges
        item.hoverTimeout = setTimeout(() => {
          hoverTl.reverse();
          gsap.to(item, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.6,
            ease: "elastic.out(1, 0.5)",
            force3D: true,
            onComplete: () => {
              item.isHovering = false;
            }
          });
        }, 50);
      });

      // Use throttled mousemove for 3D effect
      item.addEventListener("mousemove", throttledMouseMove);
    });
  }

  // Throttle helper function for mousemove
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

  // Enhance filter functionality with animations
  if (filterButtons) {
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Update active state
        filterButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        // Add pulsing animation to the clicked button
        gsap.fromTo(
          btn,
          { scale: 0.9 },
          { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)" }
        );

        // Get category and render items with enhanced animation
        const category = btn.getAttribute("data-filter");
        currentCategory = category;

        // Animate current items out before rendering new ones
        const currentItems = document.querySelectorAll(".portfolio-item");
        if (currentItems.length) {
          gsap.to(currentItems, {
            opacity: 0,
            y: -50,
            scale: 0.8,
            stagger: 0.05,
            duration: 0.3,
            onComplete: () => renderPortfolioItems(category),
          });
        } else {
          renderPortfolioItems(category);
        }
      });
    });
  }

  // Enhanced modal functionality with image optimization
  function openModal(itemId) {
    if (!modal) return;

    const item = portfolioItems.find((i) => i.id === parseInt(itemId));
    if (!item) return;

    // Set current item index for navigation
    currentItemIndex = portfolioItems.indexOf(item);

    // Clear previous modal content
    const modalContent = modal.querySelector(".modal-content");
    
    // Apply developer project specialized layout to all projects
    modalContent.innerHTML = `
      <span class="close-modal">&times;</span>
      <div class="dev-project-modal">
        <div class="dev-project-bg" style="background-image: url('${item.image}')"></div>
        <div class="dev-project-content">
          <h2 class="dev-project-title">${item.title}</h2>
          <div class="dev-project-description">${item.description}</div>
          <div class="dev-project-meta">
            <div class="dev-project-tech">
              <h4>Technologies</h4>
              <div class="tech-tags">
                ${item.technologyTag.split(',').map(tech => `<span class="tech-tag">${tech.trim()}</span>`).join('')}
              </div>
            </div>
            ${item.ViewLive ? `<a href="${item.ViewLive}" class="dev-project-live" target="_blank">View Live Demo</a>` : ''}
          </div>
        </div>
      </div>
      <div class="modal-navigation">
        <button class="modal-prev">Previous</button>
        <button class="modal-next">Next</button>
      </div>
    `;
    
    // Re-add event listeners for close button
    const closeBtn = modalContent.querySelector(".close-modal");
    if (closeBtn) {
      closeBtn.addEventListener("click", closeModal);
    }
    
    // Re-add event listeners for navigation
    const prevButton = modalContent.querySelector(".modal-prev");
    const nextButton = modalContent.querySelector(".modal-next");
    
    if (prevButton) {
      prevButton.addEventListener("click", function() {
        navigateModal("prev");
      });
    }
    
    if (nextButton) {
      nextButton.addEventListener("click", function() {
        navigateModal("next");
      });
    }

    // Show modal with animation
    modal.classList.add("active");
    document.body.style.overflow = "hidden";

    // Preload next and previous images for smoother navigation
    preloadAdjacentImages(currentItemIndex);
  }

  // Preload adjacent images for smoother modal navigation
  function preloadAdjacentImages(index) {
    let nextIndex = (index + 1) % portfolioItems.length;
    let prevIndex = index - 1 < 0 ? portfolioItems.length - 1 : index - 1;

    // Preload next image
    if (!preloadedImages.has(portfolioItems[nextIndex].id)) {
      const nextImg = new Image();
      nextImg.src = portfolioItems[nextIndex].image;
      preloadedImages.set(portfolioItems[nextIndex].id, nextImg);
    }

    // Preload previous image
    if (!preloadedImages.has(portfolioItems[prevIndex].id)) {
      const prevImg = new Image();
      prevImg.src = portfolioItems[prevIndex].image;
      preloadedImages.set(portfolioItems[prevIndex].id, prevImg);
    }
  }

  // Close modal function
  function closeModal() {
    if (modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  // Close modal when clicking on close button
  const closeModalBtn = modal ? modal.querySelector(".close-modal") : null;
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
  }

  // Close modal when clicking outside of modal content
  if (modal) {
    modal.addEventListener("click", function (e) {
      // Only close if the click is directly on the modal background
      // and not on any of its children
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Modal navigation with fixed functionality and optimized image loading
  function navigateModal(direction) {
    if (!modal) return;
    
    let filteredItems =
      currentCategory === "all"
        ? portfolioItems
        : portfolioItems.filter((item) => item.category === currentCategory);

    if (filteredItems.length <= 1) return; // Don't navigate if only one item

    let newIndex;
    if (direction === "next") {
      newIndex = (currentItemIndex + 1) % portfolioItems.length;
    } else {
      newIndex =
        currentItemIndex - 1 < 0
          ? portfolioItems.length - 1
          : currentItemIndex - 1;
    }

    // Find the item in the entire portfolioItems array
    const newItem = portfolioItems[newIndex];
    currentItemIndex = newIndex;

    // Open the modal with the new item
    openModal(newItem.id);
  }

  // Fix modal navigation button click handlers
  const prevButton = modal ? modal.querySelector(".modal-prev") : null;
  const nextButton = modal ? modal.querySelector(".modal-next") : null;

  if (prevButton) {
    // Remove any existing event listeners to avoid duplicates
    prevButton.replaceWith(prevButton.cloneNode(true));
    // Get the new button reference
    const newPrevButton = modal.querySelector(".modal-prev");
    // Add event listener
    newPrevButton.addEventListener("click", () => {
      navigateModal("prev");
    });
  }

  if (nextButton) {
    // Remove any existing event listeners to avoid duplicates
    nextButton.replaceWith(nextButton.cloneNode(true));
    // Get the new button reference
    const newNextButton = modal.querySelector(".modal-next");
    // Add event listener
    newNextButton.addEventListener("click", () => {
      navigateModal("next");
    });
  }

  // Add keyboard navigation for modal
  document.addEventListener("keydown", function (e) {
    if (!modal.classList.contains("active")) return;

    if (e.key === "Escape") {
      closeModal();
    } else if (e.key === "ArrowLeft") {
      navigateModal("prev");
    } else if (e.key === "ArrowRight") {
      navigateModal("next");
    }
  });

  // Initialize portfolio with all items
  console.log("Rendering all portfolio items");
  renderPortfolioItems("all");
  
  // Add a fallback in case the initial render didn't work
  setTimeout(() => {
    if (portfolioGrid.children.length === 0) {
      console.log("No items rendered, trying again...");
      renderPortfolioItems("all");
    }
  }, 1000);

  // Add event listener for window resize to optimize particle effect
  window.addEventListener(
    "resize",
    debounce(() => {
      const canvas = document.getElementById("portfolio-particles");
      if (canvas) {
        // Resize canvas and adjust particles
        canvas.width = portfolioGrid.offsetWidth;
        canvas.height = portfolioGrid.offsetHeight;
      }
    }, 250)
  ); // Debounce to avoid performance hit

  // Debounce helper function
  function debounce(func, wait) {
    let timeout;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }
}
