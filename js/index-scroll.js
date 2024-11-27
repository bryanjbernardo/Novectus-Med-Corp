document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('#landing, .map-section, .partners-section, .stats-section, #bento-box, #about-us, #testimonials, .cta-section');
    const dots = document.querySelectorAll('.scroll-progress .scroll-dot');

    const updateActiveDot = () => {
        const currentPosition = window.scrollY + (window.innerHeight / 2);
        const windowHeight = window.innerHeight;

        sections.forEach((section, index) => {
            if (!section) return;
            
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (currentPosition >= sectionTop && currentPosition < sectionBottom) {
                dots.forEach(dot => dot.classList.remove('active'));
                dots[index].classList.add('active');
            }
        });
    };

    const smoothScroll = (target) => {
        if (!target) return;
        
        let offset;
        switch(target.id || target.className) {
            case 'landing':
                offset = 0;
                break;
            case 'map-section':
                offset = window.innerHeight * 0.1;
                break;
            case 'partners-section':
                offset = window.innerHeight * 0.1;
                break;
            case 'stats-section':
                offset = window.innerHeight * 0.1;
                break;
            case 'bento-box':
                offset = window.innerHeight * 0.1;
                break;
            case 'about-us':
                offset = window.innerHeight * 0.1;
                break;
            case 'testimonials':
                offset = window.innerHeight * 0.1;
                break;
            case 'cta-section':
                offset = window.innerHeight * 0.1;
                break;
            default:
                offset = window.innerHeight * 0.1;
        }
        
        const targetPosition = target.offsetTop - offset;
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
            if (progress < 1) requestAnimationFrame(animation);
        };

        requestAnimationFrame(animation);
    };

    dots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = sections[index];
            if (targetSection) {
                smoothScroll(targetSection);
            }
        });
    });

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateActiveDot();
                ticking = false;
            });
            ticking = true;
        }
    });

    updateActiveDot();

    // Landing page animation
    const landingText = document.querySelector('.landing-text');
    const landingImage = document.querySelector('.landing-image');
    
    // Initial state - hide elements
    landingText.style.opacity = '0';
    landingText.style.transform = 'translateY(50px)';
    landingImage.style.opacity = '0';
    landingImage.style.transform = 'translateX(50px)';
    
    // Trigger animations after a short delay
    setTimeout(() => {
        // Animate text
        landingText.style.transition = 'all 1s ease-out';
        landingText.style.opacity = '1';
        landingText.style.transform = 'translateY(0)';
        
        // Animate image with a slight delay
        setTimeout(() => {
            landingImage.style.transition = 'all 1s ease-out';
            landingImage.style.opacity = '1';
            landingImage.style.transform = 'translateX(0)';
        }, 300);
    }, 200);
}); 