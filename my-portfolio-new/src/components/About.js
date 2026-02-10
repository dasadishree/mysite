document.addEventListener('DOMContentLoaded', () => {
    // Typing animation
    const typedElement = document.querySelector('.auto-type');
    if (typedElement && !window.typedInstance) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/typed.js@2.0.12';
        script.onload = () => {
            if (typeof Typed !== 'undefined') {
                window.typedInstance = new Typed('.auto-type', {
                    strings: [
                        "i am a woman in STEM!",
                        "i love to run long distance!",
                        "i'm a technology enthusiast!",
                        "i am an aspiring developer!",
                        "i am a hackathon organizer!",
                        "i love creative coding!",
                        "i like reading and have read 300+ books!",
                        "i enjoy researching!",
                        "i'm left handed!",
                        "i <3 tech for social good!",
                        "i have 4 siblings (and i'm the second oldest)!",
                        "i love to learn!",
                        "i'm a linkedin WARRIOR....LOL"
                    ],
                    typeSpeed: 100,
                    backSpeed: 80,
                    loop: true,
                    showCursor: true,
                    cursorChar: '|'
                });
            }
        };
        document.head.appendChild(script);
    }
    
    // Flip card functionality
    const flipCard = document.getElementById('flip-card');
    if (flipCard) {
        flipCard.addEventListener('click', (e) => {
            // Don't flip if clicking on a link
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                return;
            }
            flipCard.classList.toggle('flipped');
        });
    }
});
