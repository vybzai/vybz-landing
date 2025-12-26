// URL SLUG MAPPING
      const slugToPage = {
          'home': null,
          'about-us': 'About Us',
          'eula': 'EULA',
          'terms-of-use': 'Terms of Use',
          'privacy-policy': 'Privacy Policy',
          'cookie-policy': 'Cookie Policy',
          'community-guidelines': 'Community Guidelines',
          'parental-guide': 'Parental Guide',
          'account-types': 'Account Types',
          'vybz-for-business': 'VYBZ for Business',
          'ambassador-calendar': 'Ambassador Calendar',
          'become-an-ambassador': 'Become an Ambassador',
          'broken-link-not-broken-heart': 'Broken Link'
      };

      const pageToSlug = {};
      for (const [slug, page] of Object.entries(slugToPage)) {
          if (page) pageToSlug[page] = slug;
      }

      // NAVIGATION LOGIC
      if ('scrollRestoration' in history) {
          history.scrollRestoration = 'manual';
      }

	      function scrollToTopInstant() {
	          const html = document.documentElement;
	          const body = document.body;
	          const prevHtmlScrollBehavior = html.style.scrollBehavior;
	          const prevBodyScrollBehavior = body ? body.style.scrollBehavior : '';

	          html.style.scrollBehavior = 'auto';
	          if (body) body.style.scrollBehavior = 'auto';

	          try {
	              window.scrollTo(0, 0);
	          } finally {
	              html.style.scrollBehavior = prevHtmlScrollBehavior;
	              if (body) body.style.scrollBehavior = prevBodyScrollBehavior;
	          }
	      }

	      function scrollToTopSmooth() {
	          if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
	              scrollToTopInstant();
	              return;
	          }
	          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	      }

	      function goHome() {
	          const home = document.getElementById('home');
	          const isHomeVisible = home && home.classList.contains('active') && getComputedStyle(home).display !== 'none';
	          if (isHomeVisible) {
	              scrollToTopSmooth();
	              const homeUrl = window.location.protocol === 'file:' ? window.location.pathname : '/';
	              history.pushState({ page: 'home' }, '', homeUrl);
	              return;
	          }
	          showPage('home');
	      }

	      function showPage(pageId, updateUrl, options) {
	          const shouldScrollToTop = !(options && options.scrollToTop === false);
	          const onShown = options && typeof options.onShown === 'function' ? options.onShown : null;

	          if (shouldScrollToTop) scrollToTopInstant();

          // Remove legal-route class when going to home (allows proper display)
          if (pageId === 'home') {
              document.documentElement.classList.remove('legal-route');
          }

	          document.querySelectorAll('.page-content').forEach(el => {
	              el.classList.remove('active');
	              setTimeout(() => { if(!el.classList.contains('active')) el.style.display = 'none'; }, 400);
	          });
	          const target = document.getElementById(pageId === 'home' ? 'home' : 'legal-content');
	          target.style.display = 'block';
	          setTimeout(() => {
	              target.classList.add('active');
	              if (typeof ScrollTrigger !== 'undefined' && pageId === 'home') ScrollTrigger.refresh();
	              if (shouldScrollToTop) scrollToTopInstant();
	              if (onShown) onShown();
	          }, 50);

	          // Update URL for home
	          if (updateUrl !== false && pageId === 'home') {
	              const homeUrl = window.location.protocol === 'file:' ? window.location.pathname : '/';
	              history.pushState({ page: 'home' }, '', homeUrl);
	          }
	      }

	      function showLegal(title, updateUrl) {
	          document.getElementById('legal-title').innerText = title;
	          document.getElementById('legal-body').innerHTML = pageContent[title] || pageContent['Broken Link'];
	          showPage('legal', false, { onShown: scrollToTopInstant });

	          // Update URL
	          if (updateUrl !== false) {
	              const slug = pageToSlug[title] || 'broken-link-not-broken-heart';
	              const url = window.location.protocol === 'file:' ? '#' + slug : '/' + slug;
	              history.pushState({ page: title }, '', url);
	          }
	      }

      // Handle browser back/forward
      window.addEventListener('popstate', function(e) {
          if (e.state && e.state.page) {
              if (e.state.page === 'home') {
                  showPage('home', false);
              } else {
                  showLegal(e.state.page, false);
              }
          } else {
              // Default to home
              showPage('home', false);
          }
      });

	      // Route based on URL on page load
	      function initRouter() {
	          const isFile = window.location.protocol === 'file:';
	          const path = isFile
	              ? window.location.hash.replace(/^#\/?/, '').replace(/\/$/, '')
	              : window.location.pathname.replace(/^\//, '').replace(/\/$/, '');

	          if (!path || path === 'home' || path === 'index.html') {
	              // Home page - replace state so back button works correctly
	              if (!isFile) {
	                  history.replaceState({ page: 'home' }, '', '/');
	              }
	              return;
	          }
	
	          // Allow basic anchor navigation when previewing via file://
	          if (isFile && (path === 'hero' || path === 'how')) {
	              if (path === 'how') scrollToHow();
	              return;
	          }

	          // Immediately hide home page (no transition) when loading a legal page directly
	          const home = document.getElementById('home');
	          if (home) {
	              home.classList.remove('active');
              home.style.display = 'none';
          }

	          const pageName = slugToPage[path];
	          if (pageName) {
	              const url = isFile ? '#' + path : '/' + path;
	              history.replaceState({ page: pageName }, '', url);
	              showLegal(pageName, false);
	          } else {
	              // Unknown route - show broken link page
	              const url = isFile ? '#' + path : '/' + path;
	              history.replaceState({ page: 'Broken Link' }, '', url);
	              showLegal('Broken Link', false);
	          }
	      }

      // Initialize router after DOM is ready
      if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', initRouter);
      } else {
          initRouter();
      }

      // Scroll to How It Works section
      function scrollToHow() {
          const scroll = () => {
              const howSection = document.getElementById('how');
              if (!howSection) return;

              const nav = document.querySelector('nav');
              const headerOffset = nav ? nav.offsetHeight : 0;
              const extraOffset = 16;

              const top = howSection.getBoundingClientRect().top + window.pageYOffset - headerOffset - extraOffset;
              window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
          };

          const home = document.getElementById('home');
          const isHomeVisible = home && home.classList.contains('active') && getComputedStyle(home).display !== 'none';
          if (isHomeVisible) {
              requestAnimationFrame(scroll);
              return;
          }

          showPage('home', undefined, {
              scrollToTop: false,
              onShown: () => requestAnimationFrame(scroll),
          });
      }

      
