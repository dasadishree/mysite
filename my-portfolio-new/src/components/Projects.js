document.addEventListener('DOMContentLoaded', () => {
    const projectItems = document.querySelectorAll('.project-item');
    const popupOverlay = document.getElementById('project-popup-overlay');
    const popupClose = document.getElementById('project-popup-close');
    const popupHeader = document.getElementById('project-popup-header');
    const projectImage = document.getElementById('project-image');
    const projectSubheading = document.getElementById('project-subheading');
    const projectDescription = document.getElementById('project-description');
    const projectLinks = document.getElementById('project-links');
    
    let currentProject = null;
    
    // popup 
    projectItems.forEach(item => {
        item.addEventListener('click', () => {
            const projectData = JSON.parse(item.getAttribute('data-project-data'));
            currentProject = projectData;
            openPopup(projectData);
        });
    });
    
    function openPopup(project) {
        currentProject = project;
        popupHeader.textContent = project.subheading || "Project";
        if (project.image) {
            projectImage.src = `/src/assets/projects/${project.image}`;
        }
        projectImage.alt = project.subheading || "Project";
        projectSubheading.textContent = project.subheading || "";
        projectDescription.textContent = project.description || "";
        updateLinks(project);
        popupOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function updateLinks(project) {
        projectLinks.innerHTML = "";
        
        if (project.deployLink || project.codeLink) {
            const linksContainer = document.createElement('div');
            linksContainer.className = 'project-links-container';
            
            if (project.deployLink) {
                const deployLink = document.createElement('a');
                deployLink.href = project.deployLink;
                deployLink.target = '_blank';
                deployLink.rel = 'noopener noreferrer';
                deployLink.className = 'project-link project-link-deploy';
                deployLink.textContent = 'View Live';
                linksContainer.appendChild(deployLink);
            }
            
            if (project.codeLink) {
                const codeLink = document.createElement('a');
                codeLink.href = project.codeLink;
                codeLink.target = '_blank';
                codeLink.rel = 'noopener noreferrer';
                codeLink.className = 'project-link project-link-code';
                codeLink.textContent = 'View Code';
                linksContainer.appendChild(codeLink);
            }
            
            projectLinks.appendChild(linksContainer);
        }
    }
    
    // close
    const closePopup = () => {
        popupOverlay.classList.remove('active');
        document.body.style.overflow = '';
        currentProject = null;
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
