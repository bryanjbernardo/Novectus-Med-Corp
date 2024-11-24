document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.fixed-navbar');
    const navLogo = document.querySelector('.nav-logo');
    const scrollThreshold = 50;
    
    // Only apply scroll behavior on index.html
    const isIndexPage = window.location.pathname === '/' || 
                       window.location.pathname.includes('index.html');

    function updateNavbar() {
        if (!isIndexPage) {
            navbar.classList.add('scrolled');
            return;
        }

        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('scrolled');
            // Add smooth class for transition
            navbar.classList.add('smooth-transition');
            // Add shrink class to logo
            navLogo.classList.add('shrink');
        } else {
            navbar.classList.remove('scrolled');
            navbar.classList.remove('smooth-transition');
            // Remove shrink class from logo
            navLogo.classList.remove('shrink');
        }
    }

    // Initial check
    updateNavbar();

    // Add scroll event listener with throttling
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateNavbar();
                ticking = false;
            });
            ticking = true;
        }
    });
});
