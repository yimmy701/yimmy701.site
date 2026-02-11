// Load category data from localStorage
const categoryData = JSON.parse(localStorage.getItem('currentCategory'));

if (!categoryData) {
    window.location.href = 'index.html';
} else {
    // Set page title and description
    document.getElementById('categoryTitle').textContent = categoryData.name;
    document.getElementById('categoryTitle').style.color = categoryData.color;
    document.getElementById('categoryDescription').textContent = categoryData.description;
    
    // Update back button hover color
    const backButton = document.querySelector('.back-button');
    backButton.addEventListener('mouseenter', () => {
        backButton.style.borderColor = categoryData.color;
        backButton.style.color = categoryData.color;
    });
    backButton.addEventListener('mouseleave', () => {
        backButton.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        backButton.style.color = '#e0e0e0';
    });
    
    // Populate projects grid
    const projectsGrid = document.getElementById('projectsGrid');
    
    categoryData.projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.style.animationDelay = `${index * 0.1}s`;
        
        projectCard.innerHTML = `
            <div class="project-image">
                <span>Project Image</span>
            </div>
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
        `;
        
        // Add hover effect with category color
        projectCard.addEventListener('mouseenter', () => {
            projectCard.style.borderColor = `${categoryData.color}60`;
        });
        projectCard.addEventListener('mouseleave', () => {
            projectCard.style.borderColor = 'rgba(255, 255, 255, 0.08)';
        });
        
        projectsGrid.appendChild(projectCard);
    });
    
    // Add fade-in animation
    const style = document.createElement('style');
    style.textContent = `
        .project-card {
            animation: fadeInUp 0.6s ease-out forwards;
            opacity: 0;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}
