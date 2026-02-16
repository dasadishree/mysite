document.addEventListener('DOMContentLoaded', () => {
    const experienceItems = document.querySelectorAll('.experience-item');
    const stripItems = document.querySelectorAll('.strip');
    const overlay = document.getElementById('windows-overlay');
    const closeBtn = document.getElementById('windows-close');
    const titleText = document.getElementById('windows-title');
    const previewImg = document.getElementById('win-preview-img');
    const header = document.getElementById('win-header');
    const description = document.getElementById('win-description');
    const treeItems = document.getElementById('tree-items');
    
    let experiencesData = [];
    let currentExperienceId = null;
    
    // load experiences
    async function loadExperiences() {
        try {
            const response = await fetch('/data/experiences.json');
            const data = await response.json();
            experiencesData = data.experiences;
            populateTreeView();
        } catch (error) {
            console.error('Error loading experiences:', error);
        }
    }
    
    function populateTreeView() {
        treeItems.innerHTML = '';
        experiencesData.forEach(exp => {
            const item = document.createElement('div');
            item.className = 'tree-item';
            item.dataset.experienceId = exp.id;
            item.innerHTML = `<span class="tree-item-icon">📄</span><span>${exp.name}</span>`;
            item.addEventListener('click', () => {
                selectExperience(exp.id);
            });
            treeItems.appendChild(item);
        });
    }
    
    // select
    function selectExperience(id) {
        const experience = experiencesData.find(exp => exp.id === id);
        if (!experience) return;
        currentExperienceId = id;
        titleText.textContent = experience.name;
        previewImg.src = `/src/assets/collage/${experience.image}`;
        previewImg.alt = experience.name;
        header.textContent = experience.header;
        description.textContent = experience.description;
        document.querySelectorAll('.tree-item').forEach(item => {
            if (item.dataset.experienceId === id) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
    
    // popup
    function openPopup(experienceId) {
        if (experiencesData.length === 0) {
            loadExperiences().then(() => {
                selectExperience(experienceId);
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        } else {
            selectExperience(experienceId);
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    // close
    function closePopup() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    experienceItems.forEach(item => {
        item.addEventListener('click', () => {
            const experienceId = item.getAttribute('data-experience-id');
            if (experienceId) {
                openPopup(experienceId);
            }
        });
    });
    
    stripItems.forEach(strip => {
        strip.addEventListener('click', () => {
            const experienceId = strip.getAttribute('data-experience-id');
            if (experienceId) {
                openPopup(experienceId);
            }
        });
    });
    if (closeBtn) {
        closeBtn.addEventListener('click', closePopup);
    }    
    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closePopup();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closePopup();
        }
    });
    
    loadExperiences();
});
