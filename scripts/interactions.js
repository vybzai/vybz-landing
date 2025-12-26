// Tab Navigation for Mockup
      let mapInterval;
      document.querySelectorAll('button[data-screen]').forEach(button => {
        button.addEventListener('click', function() {
          const screen = this.getAttribute('data-screen');
          // Update button states
          document.querySelectorAll('button[data-screen]').forEach(btn => {
            btn.classList.remove('text-white', 'bg-white/10');
            btn.classList.add('text-zinc-400');
          });
          this.classList.remove('text-zinc-400');
          this.classList.add('text-white', 'bg-white/10');
          
          // Update screen images
          document.querySelectorAll('.screen-image').forEach(img => {
            if (img.getAttribute('data-screen') === screen) {
              img.classList.add('active');
              img.style.display = 'block';
            } else {
              img.classList.remove('active');
              img.style.display = 'none';
            }
          });
          
          // Handle Map View cycling
          clearInterval(mapInterval);
          if (screen === 'map') {
            const mapImages = document.querySelectorAll('.map-image');
            let currentIndex = 0;
            // Show first image immediately
            mapImages.forEach((img, i) => {
              img.classList.toggle('active', i === 0);
            });
            mapInterval = setInterval(() => {
              currentIndex = (currentIndex + 1) % mapImages.length;
              mapImages.forEach((img, i) => {
                img.classList.toggle('active', i === currentIndex);
              });
            }, 4000); // 4 seconds per image
          }
        });
      });

      // Tab Filtering for Vibes
      document.querySelectorAll('[data-filter]').forEach(button => {
        button.addEventListener('click', function() {
          const filter = this.getAttribute('data-filter');
          const cards = document.querySelectorAll('.vibe-card');
          document.querySelectorAll('[data-filter]').forEach(btn => btn.classList.remove('active'));
          this.classList.add('active');
          cards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
              card.style.display = 'block';
            } else {
              card.style.display = 'none';
            }
          });
        });
      });

      

      // Feature Card Hover Interactions
      document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
          const feature = this.getAttribute('data-feature');
          document.querySelectorAll('.dynamic-chip').forEach(chip => {
            if (chip.getAttribute('data-feature') === feature) {
              gsap.to(chip, { scale: 1.1, duration: 0.3 });
            } else {
              gsap.to(chip, { scale: 0.9, duration: 0.3 });
            }
          });
        });
        card.addEventListener('mouseleave', function() {
          gsap.to('.dynamic-chip', { scale: 1, duration: 0.3 });
        });
      });

      // iubenda Cookie Policy embed loader
      (function (w,d) {var loader = function () {var s = d.createElement("script"), tag = d.getElementsByTagName("script")[0]; s.src="https://cdn.iubenda.com/iubenda.js"; tag.parentNode.insertBefore(s,tag);}; if(w.addEventListener){w.addEventListener("load", loader, false);}else if(w.attachEvent){w.attachEvent("onload", loader);}else{w.onload = loader;}})(window, document);
    
