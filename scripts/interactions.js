// Tab Navigation for Mockup (robust + scoped)
(function initMockupTabs() {
  // Prevent double-init if scripts get injected/loaded twice
  if (window.__vybzMockupTabsInitialized) return;
  window.__vybzMockupTabsInitialized = true;

  const tabsRoot = document.querySelector('[data-mockup-tabs]');
  const phoneRoot = document.querySelector('[data-mockup-phone]');
  if (!tabsRoot || !phoneRoot) return;

  const buttons = Array.from(tabsRoot.querySelectorAll('button[data-screen]'));
  const screenImages = Array.from(phoneRoot.querySelectorAll('.screen-image'));
  const mapImages = Array.from(phoneRoot.querySelectorAll('.map-image'));
  const homeImages = Array.from(phoneRoot.querySelectorAll('.home-image'));

  let mapInterval = null;
  let homeInterval = null;

  function stopMapCycle() {
    if (!mapInterval) return;
    clearInterval(mapInterval);
    mapInterval = null;
  }

  function stopHomeCycle() {
    if (!homeInterval) return;
    clearInterval(homeInterval);
    homeInterval = null;
  }

  function setActiveButton(activeBtn) {
    buttons.forEach(btn => {
      const isActive = btn === activeBtn;
      btn.classList.toggle('text-white', isActive);
      btn.classList.toggle('bg-white/10', isActive);
      btn.classList.toggle('text-zinc-400', !isActive);
    });
  }

  function setScreen(screen) {
    stopMapCycle();
    stopHomeCycle();

    // Reset all images first
    screenImages.forEach(img => img.classList.remove('active'));

    // Show/hide floating pills based on screen (only visible on Home view)
    const pills = document.querySelectorAll('.dynamic-chip');
    pills.forEach(pill => {
      pill.classList.toggle('hidden-pill', screen !== 'home');
    });

    // Special case: Home view has multiple images we want to cycle
    if (screen === 'home') {
      if (!homeImages.length) return;

      homeImages.forEach((img, i) => img.classList.toggle('active', i === 0));

      if (homeImages.length > 1) {
        let currentIndex = 0;
        homeInterval = setInterval(() => {
          currentIndex = (currentIndex + 1) % homeImages.length;
          homeImages.forEach((img, i) => img.classList.toggle('active', i === currentIndex));
        }, 4000); // 4 seconds per image
      }
      return;
    }

    // Special case: Map view has multiple images we want to cycle
    if (screen === 'map') {
      if (!mapImages.length) return;

      mapImages.forEach((img, i) => img.classList.toggle('active', i === 0));

      if (mapImages.length > 1) {
        let currentIndex = 0;
        mapInterval = setInterval(() => {
          currentIndex = (currentIndex + 1) % mapImages.length;
          mapImages.forEach((img, i) => img.classList.toggle('active', i === currentIndex));
        }, 4000); // 4 seconds per image
      }
      return;
    }

    // All other views: activate the first matching image
    const target = screenImages.find(img => img.getAttribute('data-screen') === screen);
    if (target) target.classList.add('active');
  }

  // Capture the click early so no other handler can interfere
  document.addEventListener('click', function(e) {
    if (!(e.target instanceof Element)) return;
    const btn = e.target.closest('button[data-screen]');
    if (!btn || !tabsRoot.contains(btn)) return;

    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    setActiveButton(btn);
    setScreen(btn.getAttribute('data-screen'));
  }, true);

  // Initial state (Home View is marked with data-active in the HTML)
  const defaultBtn = tabsRoot.querySelector('button[data-screen][data-active]') || buttons[0];
  if (!defaultBtn) return;

  setActiveButton(defaultBtn);
  setScreen(defaultBtn.getAttribute('data-screen'));
})();

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
    
