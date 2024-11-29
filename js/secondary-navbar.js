document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.secondary-navbar');
    let lastScroll = 0;
    let hideTimeout;

    // Get the current page URL and add active class
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.secondary-nav-links a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Handle navbar visibility on scroll
    function updateNavbar() {
        const currentScroll = window.pageYOffset;
        
        // Hide navbar when scrolling down, show when scrolling up
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down - add hide class instead of inline style
            navbar.classList.add('hide');
        } else {
            // Scrolling up - remove hide class
            navbar.classList.remove('hide');
        }

        // Add debounce to show navbar after stopping scroll
        clearTimeout(hideTimeout);
        hideTimeout = setTimeout(() => {
            navbar.classList.remove('hide');
        }, 1000); // Will show navbar after 1 second of no scrolling

        lastScroll = currentScroll;
    }

    // Throttle scroll updates for better performance
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

    // Show navbar when hovering near top of screen
    document.addEventListener('mousemove', function(e) {
        if (e.clientY < 100) { // When mouse is within 100px of top
            navbar.classList.remove('hide');
        }
    });
}); 