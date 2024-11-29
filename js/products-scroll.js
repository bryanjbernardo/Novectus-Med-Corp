document.addEventListener('DOMContentLoaded', () => {
    // Get all sections and dots
    const sections = document.querySelectorAll('.landing, .product-card');
    const dots = document.querySelectorAll('.scroll-dot');

    // Enhanced smooth scroll function with offset
    const smoothScroll = (target) => {
        if (!target) return;
        
        // Add offset to account for navbar height and some padding
        const navbarHeight = document.querySelector('.secondary-navbar').offsetHeight;
        const scrollOffset = navbarHeight + 40; // 40px additional padding
        
        const targetPosition = target.offsetTop - scrollOffset;
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

    // Update active dot based on scroll position with adjusted offset
    const updateActiveDot = () => {
        const currentPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const navbarHeight = document.querySelector('.secondary-navbar').offsetHeight;
        const offset = windowHeight * 0.2 + navbarHeight; // Adjusted offset calculation

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

    // Update dots on scroll with throttling and debouncing
    let ticking = false;
    let scrollTimeout;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateActiveDot();
                ticking = false;
            });
            ticking = true;
        }

        // Add debouncing for smoother updates
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            updateActiveDot();
        }, 150);
    });

    // Initial update
    updateActiveDot();

    // Update on window resize
    window.addEventListener('resize', () => {
        updateActiveDot();
    });
}); 