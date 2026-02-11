# yimmy701 Personal Portfolio Website

A modern, interactive portfolio website featuring a dynamic mesh visualization of interconnected skills and interests.

## Features

- **Interactive Mesh Homepage**: Circular network visualization with hover effects and smooth animations
- **11 Category Areas**: Design, Engineering, Computational Design, Guitar, Singing, Psychology, Machine Learning, Photography, Film, Crocheting, and Drawing
- **Category Pages**: Dedicated pages for each skill area with project showcases
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Smooth Animations**: Polished transitions and hover effects throughout
- **Tooltip System**: Informative tooltips appear on hover to describe each category

## File Structure

```
yimmy701-portfolio/
├── index.html          # Main homepage with mesh visualization
├── category.html       # Template for category project pages
├── styles.css          # All styling and animations
├── script.js           # Mesh visualization and interactions
├── category.js         # Category page logic
└── README.md          # This file
```

## How to Use

1. **Open the website**: Simply open `index.html` in a web browser
2. **Explore the mesh**: Hover over circular nodes to see them highlight in color
3. **View tooltips**: Tooltips appear showing the category name and description
4. **Navigate**: Click any node to view projects in that category
5. **Return home**: Use the "Back to Mesh" button to return to the main mesh

## Customization Guide

### Adding/Editing Categories

Edit the `categories` array in `script.js`:

```javascript
const categories = [
    { 
        name: 'Your Category Name',
        color: '#HEX_COLOR',  // Choose any hex color
        description: 'Short description of this category',
        projects: [
            { 
                title: 'Project Name', 
                description: 'Project description' 
            },
            // Add more projects...
        ]
    },
    // Add more categories...
];
```

**Color Suggestions:**
- Design: #4CAF50 (green)
- Engineering: #2196F3 (blue)
- Creative: #E91E63 (pink)
- Technical: #FF5722 (orange)
- Academic: #00BCD4 (cyan)

### Adding Projects to Categories

Within each category object, add projects to the `projects` array:

```javascript
projects: [
    { 
        title: 'My New Project', 
        description: 'A brief description of what this project is about' 
    },
    { 
        title: 'Another Project', 
        description: 'More details here' 
    }
]
```

### Changing Colors

**Background gradient:**
Edit in `styles.css` under `body`:
```css
background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%);
```

**Node colors:**
Each category has its own color defined in the `categories` array.

**Default node appearance:**
Edit in `styles.css` or `script.js` where nodes are drawn.

### Customizing Text

**Site title and tagline:**
Edit in `index.html`:
```html
<h1 class="site-title">yimmy701</h1>
<p class="tagline">Your custom tagline here</p>
```

**Instructions text:**
Edit in `index.html`:
```html
<p>Your custom instructions here</p>
```

### Adjusting Mesh Layout

**Circle radius:**
In `script.js`, find `initializeMesh()`:
```javascript
const radius = Math.min(canvas.width, canvas.height) * 0.35; // Change 0.35
```

**Node size:**
In `script.js`:
```javascript
nodes.push({
    // ...
    radius: 60,  // Change node circle size
    // ...
});
```

**Connection density:**
In `script.js`, modify the connections section:
```javascript
// Connect to next node
connections.push({
    from: i,
    to: (i + 1) % nodes.length,
    opacity: 0.15  // Adjust line opacity
});

// Add more connection patterns for denser mesh
```

### Adding Real Project Images

Replace the placeholder in `category.js`:

```javascript
projectCard.innerHTML = `
    <div class="project-image">
        <img src="images/${project.image}" alt="${project.title}">
    </div>
    <h3 class="project-title">${project.title}</h3>
    <p class="project-description">${project.description}</p>
`;
```

Then add an `image` property to your projects:
```javascript
projects: [
    { 
        title: 'Project Name',
        description: 'Description',
        image: 'project1.jpg'  // Add this
    }
]
```

### Mobile Responsiveness

The site is already responsive, but you can adjust breakpoints in `styles.css`:

```css
@media (max-width: 768px) {
    /* Tablet styles */
}

@media (max-width: 480px) {
    /* Mobile styles */
}
```

## Advanced Customization

### Adding Animation Effects

The site uses CSS animations and Canvas animations. To add more:

**CSS animations** (in `styles.css`):
```css
@keyframes yourAnimation {
    from { /* start state */ }
    to { /* end state */ }
}

.element {
    animation: yourAnimation 1s ease-out;
}
```

**Canvas animations** (in `script.js`):
Modify the `draw()` function to add particle effects, lines, or other visual elements.

### Adding More Pages

1. Create a new HTML file (e.g., `about.html`)
2. Copy the structure from `category.html`
3. Add navigation links in `index.html` or other pages
4. Style consistently with existing pages

### Using a CMS or Database

To make updates easier without editing code:

1. **JSON file approach**:
   - Create `data.json` with all your categories and projects
   - Load it with `fetch('data.json')` in `script.js`
   - Update the JSON file to modify content

2. **Backend approach**:
   - Set up a simple backend (Node.js, Python Flask, etc.)
   - Store data in a database (MongoDB, PostgreSQL, etc.)
   - Fetch data via API calls

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Tips

- Keep the number of categories under 15 for optimal performance
- Optimize any images you add (use WebP format, compress files)
- Test on mobile devices to ensure smooth animations
- Consider lazy loading for projects if you have many

## Deployment

### GitHub Pages
1. Create a GitHub repository
2. Upload all files
3. Enable GitHub Pages in repository settings
4. Your site will be live at `https://yourusername.github.io/repository-name`

### Netlify
1. Drag and drop the folder to Netlify
2. Site deploys automatically
3. Get a custom domain or use Netlify's subdomain

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project folder
3. Follow prompts for deployment

## Future Enhancements

Ideas for expanding the site:

- Add search/filter functionality for projects
- Implement project detail pages with more images and information
- Add contact form or social media links
- Create blog section for updates
- Add dark/light mode toggle
- Integrate with CMS for easier updates
- Add animations for page transitions
- Include video backgrounds or particle effects
- Add analytics to track visitors

## Support

For questions or issues:
1. Check that all files are in the same directory
2. Open browser console (F12) to check for JavaScript errors
3. Ensure you're using a modern browser
4. Test on localhost or a web server (some features may not work with file:// protocol)

## License

Free to use and modify for personal projects.

---

**Version**: 1.0  
**Last Updated**: February 2026  
**Created by**: Claude for yimmy701
