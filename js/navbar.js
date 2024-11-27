document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.querySelector('.fixed-navbar');
    const navLogo = document.querySelector('.nav-logo');
    const scrollThreshold = 50;
    const isAboutPage = window.location.pathname.includes('about.html');
    const isIndexPage = window.location.pathname === '/' || window.location.pathname.includes('index.html');
    let lastScroll = 0;

    function updateNavbar() {
        const currentScroll = window.pageYOffset;

        // Always add 'scrolled' class on all pages except the index
        if (!isIndexPage || currentScroll > scrollThreshold) {
            navbar.classList.add('scrolled');
            navLogo.classList.add('shrink');
        } else {
            navbar.classList.remove('scrolled');
            navLogo.classList.remove('shrink');
        }

        // Hide navbar only on the index page
        if (isIndexPage && !isAboutPage) {
            if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        }

        lastScroll = currentScroll;
    }

    // Initial check
    updateNavbar();

    // Throttle scroll updates
    let ticking = false;
    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                updateNavbar();
                ticking = false;
            });
            ticking = true;
        }
    });
});
