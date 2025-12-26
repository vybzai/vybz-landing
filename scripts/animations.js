// ANIMATIONS - Initialize after GSAP loads (deferred)
      document.addEventListener('DOMContentLoaded', function() {
        if (typeof gsap === 'undefined') return;

        // Check for reduced motion preference and mobile
        const isMobile = window.innerWidth < 768;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) return;

        gsap.registerPlugin(ScrollTrigger);

        // Simplified animations for mobile
        if (isMobile) {
          gsap.to("h1", {
            scrollTrigger: { trigger: "#hero", start: "top center", toggleActions: "play none none reverse" },
            y: 25, opacity: 0.8, duration: 0.5
          });
        } else {
          gsap.to("h1", {
            scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: 1 },
            y: 50, opacity: 0.8
          });
        }

        // Vibe Cards Stagger Animation
        gsap.from(".vibe-card", {
          scrollTrigger: { trigger: "#trending-vibes", start: "top 80%" },
          y: 50, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power2.out"
        });

        // Product Explainer Animations
        gsap.from(".feature-card", {
          scrollTrigger: { trigger: ".feature-card", start: "top 80%" },
          y: 30, opacity: 0, duration: 0.6, stagger: 0.2, ease: "power2.out"
        });

        gsap.from(".dynamic-count", {
          scrollTrigger: { trigger: ".dynamic-count", start: "top 80%" },
          textContent: 0, duration: 2, ease: "power2.out", snap: { textContent: 1 }
        });
      });

      
