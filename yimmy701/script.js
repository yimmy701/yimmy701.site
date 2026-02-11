// Category data with colors and descriptions
const categories = [
    { 
        name: 'Design', 
        color: '#4CAF50',
        description: 'Visual design, UI/UX, and creative direction',
        projects: [
            { title: 'Brand Identity System', description: 'Complete visual identity for a tech startup' },
            { title: 'Mobile App UI', description: 'Clean, modern interface design' },
            { title: 'Design System', description: 'Comprehensive component library' }
        ]
    },
    { 
        name: 'Engineering', 
        color: '#2196F3',
        description: 'Software development and technical solutions',
        projects: [
            { title: 'Web Application', description: 'Full-stack e-commerce platform' },
            { title: 'API Development', description: 'RESTful services with Node.js' },
            { title: 'DevOps Pipeline', description: 'Automated deployment infrastructure' }
        ]
    },
    { 
        name: 'Computational Design', 
        color: '#9C27B0',
        description: 'Generative art and algorithmic creativity',
        projects: [
            { title: 'Parametric Architecture', description: 'Algorithm-driven 3D structures' },
            { title: 'Generative Patterns', description: 'Dynamic visual systems' },
            { title: 'Data Visualization', description: 'Interactive information graphics' }
        ]
    },
    { 
        name: 'Guitar', 
        color: '#FF9800',
        description: 'Musical performance and composition',
        projects: [
            { title: 'Original Compositions', description: 'Fingerstyle and classical pieces' },
            { title: 'Cover Arrangements', description: 'Personal interpretations' },
            { title: 'Live Performances', description: 'Concert and recording sessions' }
        ]
    },
    { 
        name: 'Singing', 
        color: '#E91E63',
        description: 'Vocal performance and expression',
        projects: [
            { title: 'Vocal Recordings', description: 'Studio sessions and demos' },
            { title: 'Collaborative Works', description: 'Duets and ensemble pieces' },
            { title: 'Vocal Techniques', description: 'Exploration of different styles' }
        ]
    },
    { 
        name: 'Psychology', 
        color: '#00BCD4',
        description: 'Human behavior and cognitive science',
        projects: [
            { title: 'Research Papers', description: 'Studies in cognitive psychology' },
            { title: 'User Research', description: 'Behavioral analysis for UX' },
            { title: 'Workshop Facilitation', description: 'Teaching psychological concepts' }
        ]
    },
    { 
        name: 'Machine Learning', 
        color: '#FF5722',
        description: 'AI models and intelligent systems',
        projects: [
            { title: 'Image Classification', description: 'CNN-based visual recognition' },
            { title: 'NLP Pipeline', description: 'Text analysis and generation' },
            { title: 'Predictive Models', description: 'Data-driven forecasting' }
        ]
    },
    { 
        name: 'Photography', 
        color: '#FFEB3B',
        description: 'Visual storytelling through the lens',
        projects: [
            { title: 'Portrait Series', description: 'Character and emotion studies' },
            { title: 'Urban Landscapes', description: 'City architecture and street scenes' },
            { title: 'Experimental Photography', description: 'Long exposure and abstract work' }
        ]
    },
    { 
        name: 'Film', 
        color: '#795548',
        description: 'Cinematography and video production',
        projects: [
            { title: 'Short Films', description: 'Narrative storytelling projects' },
            { title: 'Documentary Work', description: 'Real-world subject exploration' },
            { title: 'Music Videos', description: 'Visual interpretation of sound' }
        ]
    },
    { 
        name: 'Crocheting', 
        color: '#F06292',
        description: 'Textile art and handcrafted pieces',
        projects: [
            { title: 'Wearable Art', description: 'Custom clothing and accessories' },
            { title: 'Home Decor', description: 'Blankets, pillows, and decorative items' },
            { title: 'Pattern Design', description: 'Original crochet patterns' }
        ]
    },
    { 
        name: 'Drawing', 
        color: '#607D8B',
        description: 'Illustration and visual art',
        projects: [
            { title: 'Character Design', description: 'Original character illustrations' },
            { title: 'Concept Art', description: 'Visual development sketches' },
            { title: 'Urban Sketching', description: 'On-location observational drawing' }
        ]
    }
];

// Canvas setup
const canvas = document.getElementById('meshCanvas');
const ctx = canvas.getContext('2d');
let nodes = [];
let connections = [];
let hoveredNode = null;
let animationFrame;

// Resize canvas to fill window
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initializeMesh();
}

// Initialize node positions in a circular mesh
function initializeMesh() {
    nodes = [];
    connections = [];
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) * 0.35;
    
    // Create nodes in a circular pattern
    categories.forEach((category, index) => {
        const angle = (index / categories.length) * Math.PI * 2 - Math.PI / 2;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        nodes.push({
            x,
            y,
            baseX: x,
            baseY: y,
            radius: 60,
            category: category.name,
            color: category.color,
            description: category.description,
            projects: category.projects,
            hoverScale: 1,
            targetHoverScale: 1
        });
    });
    
    // Create connections between nodes (connect each node to 2-3 nearby nodes)
    nodes.forEach((node, i) => {
        // Connect to next node
        connections.push({
            from: i,
            to: (i + 1) % nodes.length,
            opacity: 0.15
        });
        
        // Connect to node 2 steps away for more interesting mesh
        if (nodes.length > 4) {
            connections.push({
                from: i,
                to: (i + 2) % nodes.length,
                opacity: 0.1
            });
        }
    });
}

// Draw the mesh
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw connections
    connections.forEach(conn => {
        const fromNode = nodes[conn.from];
        const toNode = nodes[conn.to];
        
        const isConnectedToHover = hoveredNode && 
            (conn.from === nodes.indexOf(hoveredNode) || conn.to === nodes.indexOf(hoveredNode));
        
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        
        if (isConnectedToHover) {
            ctx.strokeStyle = `${hoveredNode.color}40`;
            ctx.lineWidth = 2;
        } else {
            ctx.strokeStyle = `rgba(100, 100, 100, ${conn.opacity})`;
            ctx.lineWidth = 1;
        }
        
        ctx.stroke();
    });
    
    // Draw nodes
    nodes.forEach(node => {
        // Update hover animation
        node.hoverScale += (node.targetHoverScale - node.hoverScale) * 0.1;
        
        const isHovered = node === hoveredNode;
        const currentRadius = node.radius * node.hoverScale;
        
        // Outer glow for hovered node
        if (isHovered) {
            const gradient = ctx.createRadialGradient(node.x, node.y, currentRadius * 0.5, node.x, node.y, currentRadius * 1.5);
            gradient.addColorStop(0, `${node.color}40`);
            gradient.addColorStop(1, 'transparent');
            ctx.fillStyle = gradient;
            ctx.fillRect(node.x - currentRadius * 1.5, node.y - currentRadius * 1.5, currentRadius * 3, currentRadius * 3);
        }
        
        // Node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        
        if (isHovered) {
            ctx.fillStyle = `${node.color}30`;
            ctx.strokeStyle = node.color;
            ctx.lineWidth = 3;
        } else {
            ctx.fillStyle = 'rgba(60, 60, 60, 0.3)';
            ctx.strokeStyle = 'rgba(150, 150, 150, 0.5)';
            ctx.lineWidth = 2;
        }
        
        ctx.fill();
        ctx.stroke();
        
        // Node text
        ctx.fillStyle = isHovered ? node.color : '#b0b0b0';
        ctx.font = `${isHovered ? '16px' : '14px'} -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.category, node.x, node.y);
    });
    
    animationFrame = requestAnimationFrame(draw);
}

// Mouse interaction
let tooltip = null;

function createTooltip() {
    tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    document.body.appendChild(tooltip);
}

function updateTooltip(node, mouseX, mouseY) {
    if (!tooltip) return;
    
    tooltip.innerHTML = `
        <div class="tooltip-title">${node.category}</div>
        <div class="tooltip-description">${node.description}</div>
    `;
    
    const offsetX = 20;
    const offsetY = 20;
    
    tooltip.style.left = mouseX + offsetX + 'px';
    tooltip.style.top = mouseY + offsetY + 'px';
    tooltip.classList.add('visible');
}

function hideTooltip() {
    if (tooltip) {
        tooltip.classList.remove('visible');
    }
}

canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    let foundHover = false;
    
    nodes.forEach(node => {
        const distance = Math.sqrt((mouseX - node.x) ** 2 + (mouseY - node.y) ** 2);
        
        if (distance < node.radius) {
            if (hoveredNode !== node) {
                hoveredNode = node;
                node.targetHoverScale = 1.15;
                canvas.style.cursor = 'pointer';
                updateTooltip(node, e.clientX, e.clientY);
            }
            foundHover = true;
        } else {
            node.targetHoverScale = 1;
        }
    });
    
    if (!foundHover && hoveredNode) {
        hoveredNode = null;
        canvas.style.cursor = 'default';
        hideTooltip();
    }
    
    if (foundHover && hoveredNode) {
        updateTooltip(hoveredNode, e.clientX, e.clientY);
    }
});

canvas.addEventListener('click', (e) => {
    if (hoveredNode) {
        openCategoryPage(hoveredNode);
    }
});

// Category page navigation
function openCategoryPage(node) {
    // Store category data
    localStorage.setItem('currentCategory', JSON.stringify({
        name: node.category,
        color: node.color,
        description: node.description,
        projects: node.projects
    }));
    
    // Navigate to category page
    window.location.href = 'category.html';
}

// Initialize
window.addEventListener('resize', resizeCanvas);
createTooltip();
resizeCanvas();
draw();
