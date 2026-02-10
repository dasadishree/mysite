document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    const photo = document.getElementById('main-photo');
    const section = document.querySelector('.meSection');

    // loading images to prevent photo lag
    const imageSources = [];
    for (let i = 1; i <= 26; i++) {
        const img = document.querySelector(`.item-${i} img`);
        if (img && img.src) {
            imageSources.push(img.src);
        }
    }
    const mainImages = [
        document.querySelector('.auraImg img')?.src,
        document.querySelector('.mePhoto')?.src,
    ].filter(Boolean);
    const allImages = [...imageSources, ...mainImages];
    let loadedCount = 0;
    const totalImages = allImages.length;  
    if (totalImages === 0) {
        showContent();
        return;
    }
    // load page once images are loaded
    function showContent() {
        loadingScreen.classList.add('hidden');
        mainContent.style.display = 'block';
        setTimeout(() => {
            loadingScreen.style.display = 'block';
        }, 500);
    }
    allImages.forEach(src => {
        const img = new Image();
        img.onload = () => {
            loadedCount++;
            if (loadedCount === totalImages) {
                setTimeout(showContent, 300);
            }
        };
        img.onerror = () => {
            loadedCount++;
            if (loadedCount === totalImages) {
                setTimeout(showContent, 300);
            }
        };
        img.src = src;
    });

    // images pop out when center photo clipped
    if (photo && section) {
        photo.addEventListener('click', () => {
            section.classList.toggle('is-popped');
        });
    }
});