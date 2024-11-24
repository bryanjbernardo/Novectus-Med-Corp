document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Select all elements to animate
    const elementsToAnimate = document.querySelectorAll(`
        .hero-title,
        .hero-description,
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
    const sections = document.querySelectorAll('.hero-section, .vision-mission, .stats-section, .story-section, .map-section, .partners-section, .cta-section');
    const dots = document.querySelectorAll('.scroll-dot');

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

    // Smooth scroll function
    const smoothScroll = (target) => {
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

    // Map animations
    const mapObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const markers = entry.target.querySelectorAll('.country-marker');
                markers.forEach(marker => {
                    marker.querySelector('.marker-dot').style.animation = 'none';
                    marker.querySelector('.marker-line').style.animation = 'none';
                    marker.querySelector('.country-name').style.animation = 'none';
                    
                    void marker.offsetWidth;
                    
                    marker.querySelector('.marker-dot').style.animation = '';
                    marker.querySelector('.marker-line').style.animation = '';
                    marker.querySelector('.country-name').style.animation = '';
                });
            }
        });
    }, {
        threshold: 0.2
    });

    const mapSection = document.querySelector('.map-container');
    if (mapSection) {
        mapObserver.observe(mapSection);
    }

    // Initial animations for above-fold content
    const aboveFoldElements = document.querySelectorAll('.hero-content, .hero-title, .hero-description');
    aboveFoldElements.forEach(element => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    });

    // Handle URL hash on page load
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            setTimeout(() => {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }

    // Handle clicks on anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                
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