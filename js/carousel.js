document.addEventListener("DOMContentLoaded", () => {
    const duplicateCards = (selector) => {
        const track = document.querySelector(selector);
        const container = track.parentElement; // Get the parent container
        const containerWidth = container.offsetWidth; // Width of the container
        const cardWidth = track.children[0].offsetWidth; // Width of a single card
        const totalCards = Math.ceil((containerWidth * 2) / cardWidth); // Calculate the required number of cards

        // Duplicate cards until we have enough to cover the loop
        while (track.children.length < totalCards) {
            [...track.children].forEach((item) => {
                const clone = item.cloneNode(true);
                track.appendChild(clone);
            });
        }
    };

    // Duplicate cards for both rows
    duplicateCards(".row1 .testimonial-track");
    duplicateCards(".row2 .testimonial-track");
});
