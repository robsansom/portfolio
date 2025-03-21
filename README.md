# Design Portfolio

A modern, clean design portfolio website showcasing creative work and projects.

## Project Structure

```
portfolio/
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── images/
├── work/
│   └── ditto.html
├── tos.html
├── index.html
└── README.md
```

## Features

- Responsive design that works on mobile, tablet, and desktop
- Modern, minimalist UI with clean typography
- Interactive elements including smooth scrolling and animations
- Project case studies
- Terms of Service page

## Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla)
- Google Fonts (Inter)

## Deployment

This site is deployed using GitHub Pages and can be viewed at: https://robsansom.github.io/design/

## How to Run Locally

Simply open the `index.html` file in a web browser to view the website locally.

For the best experience, use a local server. You can use the following command if you have Python installed:

```bash
# For Python 3.x
python3 -m http.server

# For Python 2.x
python -m SimpleHTTPServer
```

Then open your browser and navigate to `http://localhost:8000`.

## Customization

To customize this portfolio:

1. Modify the content in the HTML files to match your needs
2. Update the styles in `css/styles.css` to change colors, fonts, or layout
3. Add your own JavaScript functionality in `js/main.js`
4. Add your own images to the `images/` directory

## License

Copyright © 2025. All rights reserved.

## Script Reference

### Deployment Scripts

- **`scripts/git_commit.sh`** - Main script for committing changes and deploying to GitHub Pages

### Recovery Scripts

- **`scripts/restore-stable.sh`** - Restores the site to the stable version (STABLE-BACKUP branch)

## Usage

### To deploy changes:
```bash
./scripts/git_commit.sh
```

### To restore to stable version:
```bash
./scripts/restore-stable.sh
```