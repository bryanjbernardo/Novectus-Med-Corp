document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.secondary-navbar');
    let lastScroll = 0;
    let scrollTimer = null;

    // Get the current page URL and add active class
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.secondary-nav-links a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Handle navbar visibility on scroll with hysteresis
    function updateNavbar() {
        const currentScroll = window.pageYOffset;
        const scrollDelta = currentScroll - lastScroll;
        
        // Add hysteresis to prevent tiny scroll changes from triggering the navbar
        if (Math.abs(scrollDelta) < 5) return;
        
        // Hide navbar when scrolling down, show when scrolling up
        if (scrollDelta > 0 && currentScroll > 100) {
            // Scrolling down - add hide class
            requestAnimationFrame(() => {
                navbar.classList.add('hide');
            });
        } else if (scrollDelta < 0) {
            // Scrolling up - remove hide class
            requestAnimationFrame(() => {
                navbar.classList.remove('hide');
            });
        }

        lastScroll = currentScroll;
    }

    // Throttle and debounce scroll updates for smoother performance
    function handleScroll() {
        if (scrollTimer === null) {
            scrollTimer = setTimeout(() => {
                scrollTimer = null;
                requestAnimationFrame(updateNavbar);
            }, 10); // Small delay for smoother updates
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Show navbar when hovering near top of screen with smooth transition
    let hoverTimer = null;
    document.addEventListener('mousemove', function(e) {
        if (e.clientY < 100) {
            if (hoverTimer) clearTimeout(hoverTimer);
            requestAnimationFrame(() => {
                navbar.classList.remove('hide');
            });
        } else {
            // Small delay before hiding on mouse leave
            hoverTimer = setTimeout(() => {
                if (window.pageYOffset > 100) {
                    requestAnimationFrame(() => {
                        navbar.classList.add('hide');
                    });
                }
            }, 200);
        }
    });
}); 