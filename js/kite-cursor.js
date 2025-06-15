document.addEventListener('DOMContentLoaded', function() {
  // Remove any existing cursor elements
  document.querySelectorAll('.cursor, .cursor-dot, .cursor-ring, .trailing-cursor, .dev-cursor').forEach(el => {
    el.remove();
  });
  
  // Create the kite cursor element
  const kite = document.createElement('div');
  kite.classList.add('kite-cursor');
  document.body.appendChild(kite);
  
  // Variables to track positions
  let mouseX = 0;
  let mouseY = 0;
  let kiteX = 0;
  let kiteY = 0;
  
  // Track the actual mouse position
  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  // Animation function for smooth following
  function animateKite() {
    // Calculate the distance between actual mouse and kite
    const distX = mouseX - kiteX;
    const distY = mouseY - kiteY;
    
    // Apply easing for smooth trailing effect
    // Larger division factor = more delay/trailing effect
    kiteX += distX / 10;
    kiteY += distY / 10;
    
    // Calculate angle to point toward the mouse
    const angle = Math.atan2(mouseY - kiteY, mouseX - kiteX) * 180 / Math.PI;
    
    // Apply position and rotation
    // Rotate so the point of the triangle faces the mouse
    kite.style.left = kiteX + 'px';
    kite.style.top = kiteY + 'px';
    kite.style.transform = `translate(-50%, -50%) rotate(${angle - 90}deg)`;
    
    // Continue the animation
    requestAnimationFrame(animateKite);
  }
  
  // Start the animation
  animateKite();
});
