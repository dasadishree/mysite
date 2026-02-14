document.addEventListener('DOMContentLoaded', () => {
    const projectItems = document.querySelectorAll('.project-item');
    const popupOverlay = document.getElementById('project-popup-overlay');
    const popupClose = document.getElementById('project-popup-close');
    const popupHeader = document.getElementById('project-popup-header');
    const slideImage = document.getElementById('project-slide-image');
    const slideSubheading = document.getElementById('project-subheading');
    const slideDescription = document.getElementById('project-description');
    const slideIndicator = document.getElementById('project-slide-indicator');
    const projectLinks = document.getElementById('project-links');
    const prevBtn = document.getElementById('project-prev-btn');
    const nextBtn = document.getElementById('project-next-btn');
    
    let currentProject = null;
    let currentSlideIndex = 0;
    let allSlides = [];
    
    //popup
    projectItems.forEach(item => {
        item.addEventListener('click', () => {
            const projectData = JSON.parse(item.getAttribute('data-project-data'));
            currentProject = projectData;
            openPopup(projectData);
        });
    });
    
    function openPopup(project) {
        currentProject = project;
        allSlides = project.slides || [];
        currentSlideIndex = 0;
        popupHeader.textContent = project.header;
        updateSlide();
        popupOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function updateSlide() {
        if (!currentProject || allSlides.length === 0) return;
        
        const slide = allSlides[currentSlideIndex];
        slideSubheading.textContent = slide.subheading || "";
        slideDescription.textContent = slide.description || "";
        
        //set slide image
        if (slide.image) {
            slideImage.src = `/src/assets/${slide.image}`;
        }
        slideImage.alt = slide.subheading || currentProject.header;
        updateLinks(slide);
        const totalSlides = allSlides.length;
        slideIndicator.textContent = `${currentSlideIndex + 1} / ${totalSlides}`;
        
        // update buttons
        prevBtn.disabled = currentSlideIndex === 0;
        nextBtn.disabled = currentSlideIndex === allSlides.length - 1;
    }
    
    function updateLinks(slide) {
        projectLinks.innerHTML = "";
        
        if (slide.deployLink || slide.codeLink) {
            const linksContainer = document.createElement('div');
            linksContainer.className = 'project-links-container';
            
            if (slide.deployLink) {
                const deployLink = document.createElement('a');
                deployLink.href = slide.deployLink;
                deployLink.target = '_blank';
                deployLink.rel = 'noopener noreferrer';
                deployLink.className = 'project-link project-link-deploy';
                deployLink.textContent = 'View';
                linksContainer.appendChild(deployLink);
            }
            
            if (slide.codeLink) {
                const codeLink = document.createElement('a');
                codeLink.href = slide.codeLink;
                codeLink.target = '_blank';
                codeLink.rel = 'noopener noreferrer';
                codeLink.className = 'project-link project-link-code';
                codeLink.textContent = 'See Code';
                linksContainer.appendChild(codeLink);
            }
            
            projectLinks.appendChild(linksContainer);
        }
    }
    
    //nav button
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentSlideIndex > 0) {
                currentSlideIndex--;
                updateSlide();
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentProject && currentSlideIndex < allSlides.length - 1) {
                currentSlideIndex++;
                updateSlide();
            }
        });
    }
    
    // close
    const closePopup = () => {
        popupOverlay.classList.remove('active');
        document.body.style.overflow = '';
        currentProject = null;
        currentSlideIndex = 0;
        allSlides = [];
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
        
        // escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && popupOverlay.classList.contains('active')) {
                closePopup();
            }
        });
    }
});
