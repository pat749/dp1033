
  function smoothScroll(target) {
    const element = document.querySelector(target);
    const targetPosition = element.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 800; // Adjust the duration as needed
    let startTime;

    function animate(currentTime) {
      if (startTime === undefined) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const scrollAmount = easeInOutQuad(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, scrollAmount);
      if (timeElapsed < duration) requestAnimationFrame(animate);
    }

    // Easing function for smooth scrolling
    function easeInOutQuad(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animate);
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      smoothScroll('#' + targetId);
    });
  });

  // Adjust scrolling speed based on screen size
  function adjustScrollSpeed() {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 768) {
      // For small screens, reduce scrolling duration
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href').substring(1);
          smoothScroll('#' + targetId);
        });
      });
    } else {
      // For larger screens, use the default scrolling duration
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href').substring(1);
          smoothScroll('#' + targetId);
        });
      });
    }
  }

  // Initial call to adjustScrollSpeed() when the page loads
  adjustScrollSpeed();

  // Call adjustScrollSpeed() when the window is resized
  window.addEventListener('resize', adjustScrollSpeed);


