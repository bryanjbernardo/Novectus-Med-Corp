document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.hero-section, .vision-mission, .stats-section, .story-section, .map-section, .partners-section, .cta-section');
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
        switch(target.className) {
            case 'hero-section':
                offset = 0;
                break;
            case 'vision-mission':
                offset = window.innerHeight * 0.1;
                break;
            case 'stats-section':
                offset = window.innerHeight * 0.1;
                break;
            case 'story-section':
                offset = window.innerHeight * 0.1;
                break;
            case 'map-section':
                offset = window.innerHeight * 0.1;
                break;
            case 'partners-section':
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
}); 