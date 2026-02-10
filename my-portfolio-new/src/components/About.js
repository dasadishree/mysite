document.addEventListener('DOMContentLoaded', () => {
    // typing animation
    const typedElement = document.querySelector('.auto-type');
    if (!typedElement || window.typedInstance) return;
    
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
    
    // stamp popup
    const achievementsBtn = document.getElementById('achievements-btn');
    const popupOverlay = document.getElementById('popup-overlay');
    const popupClose = document.getElementById('popup-close');
    const stampCardFlip = document.getElementById('stamp-card-flip');
    
    if (achievementsBtn && popupOverlay) {
        achievementsBtn.addEventListener('click', () => {
            popupOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            if (stampCardFlip) {
                stampCardFlip.classList.remove('flipped');
                setTimeout(() => {
                    stampCardFlip.classList.add('flipped');
                }, 700);
            }
        });
    }
    
    const closePopup = () => {
        if (popupOverlay) {
            popupOverlay.classList.remove('active');
            document.body.style.overflow = '';
            if (stampCardFlip) {
                stampCardFlip.classList.remove('flipped');
            }
        }
    };
    
    if (popupClose) {
        popupClose.addEventListener('click', closePopup);
    }
    
    if (popupOverlay) {
        popupOverlay.addEventListener('click', (e) => {
            if (e.target === popupOverlay) {
                closePopup();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && popupOverlay.classList.contains('active')) {
                closePopup();
            }
        });
    }
});
