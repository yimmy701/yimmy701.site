// Category data with colors and descriptions
const categories = [
    { 
        name: 'Design', 
        color: '#4CAF50',
        description: 'Visual design, UI/UX, and creative direction',
        projects: [
            { title: 'Brand Identity System', description: 'Complete visual identity for a tech startup' },
            { title: 'Mobile App UI', description: 'Clean, modern interface design' },
            { title: 'Design System', description: 'Comprehensive component library' },
            { title: 'Website Redesign', description: 'Modern portfolio website' },
            { title: 'Logo Design', description: 'Minimalist brand marks' }
        ]
    },
    { 
        name: 'Engineering', 
        color: '#2196F3',
        description: 'Software development and technical solutions',
        projects: [
            { title: 'Web Application', description: 'Full-stack e-commerce platform' },
            { title: 'API Development', description: 'RESTful services with Node.js' },
            { title: 'DevOps Pipeline', description: 'Automated deployment infrastructure' },
            { title: 'Database Optimization', description: 'Performance tuning' }
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
            { title: 'Cover Arrangements', description: 'Personal interpretations' }
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
            { title: 'Workshop Facilitation', description: 'Teaching psychological concepts' },
            { title: 'Case Studies', description: 'Applied psychology research' },
            { title: 'Experiments', description: 'Behavioral studies' },
            { title: 'Analysis Reports', description: 'Data-driven insights' }
        ]
    },
    { 
        name: 'Machine Learning', 
        color: '#FF5722',
        description: 'AI models and intelligent systems',
        projects: [
            { title: 'Image Classification', description: 'CNN-based visual recognition' },
            { title: 'NLP Pipeline', description: 'Text analysis and generation' },
            { title: 'Predictive Models', description: 'Data-driven forecasting' },
            { title: 'Neural Networks', description: 'Deep learning experiments' }
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
            { title: 'Documentary Work', description: 'Real-world subject exploration' }
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
            { title: 'Urban Sketching', description: 'On-location observational drawing' },
            { title: 'Digital Illustrations', description: 'Tablet-based artwork' }
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
let time = 0;

// Resize canvas to fill container
function resizeCanvas() {
    const container = canvas.parentElement;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    initializeMesh();
}

// Calculate node radius based on project count
function calculateRadius(projectCount) {
    const minRadius = 45;
    const maxRadius = 85;
    const minProjects = Math.min(...categories.map(c => c.projects.length));
    const maxProjects = Math.max(...categories.map(c => c.projects.length));
    
    if (maxProjects === minProjects) return (minRadius + maxRadius) / 2;
    
    const normalized = (projectCount - minProjects) / (maxProjects - minProjects);
    return minRadius + (normalized * (maxRadius - minRadius));
}

// Initialize node positions in a more organic scattered pattern
function initializeMesh() {
    nodes = [];
    connections = [];
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const baseRadius = Math.min(canvas.width, canvas.height) * 0.3;
    
    // Create nodes in a scattered circular pattern with some randomness
    categories.forEach((category, index) => {
        const angle = (index / categories.length) * Math.PI * 2 - Math.PI / 2;
        
        // Add some randomness to the position for organic feel
        const radiusVariation = baseRadius * (0.8 + Math.random() * 0.4);
        const angleVariation = angle + (Math.random() - 0.5) * 0.3;
        
        const x = centerX + Math.cos(angleVariation) * radiusVariation;
        const y = centerY + Math.sin(angleVariation) * radiusVariation;
        
        const nodeRadius = calculateRadius(category.projects.length);
        
        nodes.push({
            x,
            y,
            baseX: x,
            baseY: y,
            radius: nodeRadius,
            baseRadius: nodeRadius,
            category: category.name,
            color: category.color,
            description: category.description,
            projects: category.projects,
            hoverScale: 1,
            targetHoverScale: 1,
            breathePhase: Math.random() * Math.PI * 2, // Random start phase for breathing
            breatheSpeed: 0.8 + Math.random() * 0.4 // Slightly different speeds
        });
    });
    
    // Create connections - connect each node to 2-3 nearby nodes
    nodes.forEach((node, i) => {
        // Find distances to all other nodes
        const distances = nodes.map((otherNode, j) => {
            if (i === j) return { index: j, distance: Infinity };
            const dx = node.x - otherNode.x;
            const dy = node.y - otherNode.y;
            return { index: j, distance: Math.sqrt(dx * dx + dy * dy) };
        });
        
        // Sort by distance and connect to 2-3 nearest
        distances.sort((a, b) => a.distance - b.distance);
        const connectCount = 2 + Math.floor(Math.random() * 2); // 2 or 3 connections
        
        for (let k = 0; k < connectCount && k < distances.length; k++) {
            const targetIndex = distances[k].index;
            
            // Check if connection already exists
            const exists = connections.some(conn => 
                (conn.from === i && conn.to === targetIndex) ||
                (conn.from === targetIndex && conn.to === i)
            );
            
            if (!exists) {
                connections.push({
                    from: i,
                    to: targetIndex,
                    baseOpacity: 0.12
                });
            }
        }
    });
}

// Draw the mesh
function draw() {
    time += 0.01;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw connections - ALWAYS VISIBLE as grey lines
    connections.forEach(conn => {
        const fromNode = nodes[conn.from];
        const toNode = nodes[conn.to];
        
        const isConnectedToHover = hoveredNode && 
            (conn.from === nodes.indexOf(hoveredNode) || conn.to === nodes.indexOf(hoveredNode));
        
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        
        if (isConnectedToHover) {
            // Highlighted when connected to hovered node
            ctx.strokeStyle = `${hoveredNode.color}60`;
            ctx.lineWidth = 2.5;
        } else {
            // Always visible grey lines
            ctx.strokeStyle = `rgba(100, 100, 100, ${conn.baseOpacity})`;
            ctx.lineWidth = 1.5;
        }
        
        ctx.stroke();
    });
    
    // Draw nodes with breathing animation
    nodes.forEach(node => {
        // Update hover animation
        node.hoverScale += (node.targetHoverScale - node.hoverScale) * 0.1;
        
        const isHovered = node === hoveredNode;
        
        // Breathing animation - subtle size change
        const breatheAmount = Math.sin(time * node.breatheSpeed + node.breathePhase) * 0.03 + 1;
        const currentRadius = node.baseRadius * node.hoverScale * breatheAmount;
        
        // Outer glow for hovered node
        if (isHovered) {
            const gradient = ctx.createRadialGradient(node.x, node.y, currentRadius * 0.5, node.x, node.y, currentRadius * 1.8);
            gradient.addColorStop(0, `${node.color}50`);
            gradient.addColorStop(1, 'transparent');
            ctx.fillStyle = gradient;
            ctx.fillRect(node.x - currentRadius * 1.8, node.y - currentRadius * 1.8, currentRadius * 3.6, currentRadius * 3.6);
        }
        
        // Node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        
        if (isHovered) {
            ctx.fillStyle = `${node.color}35`;
            ctx.strokeStyle = node.color;
            ctx.lineWidth = 3;
        } else {
            ctx.fillStyle = 'rgba(60, 60, 60, 0.4)';
            ctx.strokeStyle = 'rgba(120, 120, 120, 0.6)';
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
    
    // Keep tooltip on screen
    let left = mouseX + offsetX;
    let top = mouseY + offsetY;
    
    // Adjust if tooltip would go off screen
    if (left + 250 > window.innerWidth) {
        left = mouseX - 250 - offsetX;
    }
    if (top + 100 > window.innerHeight) {
        top = mouseY - 100 - offsetY;
    }
    
    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';
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
        
        if (distance < node.radius * 1.1) {
            if (hoveredNode !== node) {
                hoveredNode = node;
                node.targetHoverScale = 1.2;
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
