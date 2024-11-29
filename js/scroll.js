document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            // Skip the navbar when applying animations
            if (entry.target.classList.contains('secondary-navbar')) {
                return;
            }
            
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Select all elements to animate, excluding the navbar
    const elementsToAnimate = document.querySelectorAll(`
        .about-hero-overlay,
        .vision-container,
        .mission-container,
        .vision-image,
        .mission-image,
        .stats-boxes .stat-box,
        .timeline-item,
        .partners-content,
        .partner-logo,
        .map-content,
        .map-title,
        .map-description,
        .map-description-2,
        .contact-frame,
        .cta-title,
        .cta-text
    `);

    // Start observing each element
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });

    // Scroll Progress Indicator
    const sections = document.querySelectorAll('.landing, .vision-mission, .stats-section, .story-section, .map-section, .partners-section, .cta-section');
    const dots = document.querySelectorAll('.scroll-dot');

    // Enhanced smooth scroll function
    const smoothScroll = (target) => {
        if (!target) return;
        
        const targetPosition = target.offsetTop;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let start = null;

        const animation = (currentTime) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const progress = Math.min(timeElapsed / duration, 1);

            const easeInOutCubic = t => t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
            window.scrollTo(0, startPosition + (distance * easeInOutCubic(progress)));

            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    };

    // Update active dot based on scroll position
    const updateActiveDot = () => {
        const currentPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const offset = windowHeight * 0.3;

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop - offset;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (currentPosition >= sectionTop && currentPosition < sectionBottom) {
                dots.forEach(dot => dot.classList.remove('active'));
                dots[index].classList.add('active');
            }
        });
    };

    // Add click handlers to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            smoothScroll(sections[index]);
        });
    });

    // Update dots on scroll
    window.addEventListener('scroll', () => {
        requestAnimationFrame(updateActiveDot);
    });

    // Handle anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                smoothScroll(targetElement);
                
                const sectionIndex = Array.from(sections).findIndex(section => 
                    section.contains(targetElement)
                );
                if (sectionIndex !== -1) {
                    dots.forEach(dot => dot.classList.remove('active'));
                    dots[sectionIndex].classList.add('active');
                }
            }
        });
    });
});
