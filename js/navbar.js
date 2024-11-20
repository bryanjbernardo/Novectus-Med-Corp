// JavaScript to add/remove 'scrolled' class on scroll
window.addEventListener("scroll", function() {
    const navbar = document.querySelector(".fixed-navbar");
    if (window.scrollY > 50) { // Adjust the scroll distance as needed
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});
