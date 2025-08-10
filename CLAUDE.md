# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an animated, interactive CV/portfolio website for Stefan du Plooy. The site features a unique animation sequence where blocks start from the center of the screen and animate to their final grid positions, creating an engaging visual experience.

## Architecture

The project uses vanilla HTML, CSS, and JavaScript with no build process or dependencies:

- `index.html` - Main HTML structure containing CV content organized into blocks
- `style.css` - CSS styles with grid layout, animations, and responsive design
- `script.js` - JavaScript animation controller handling the entrance sequence
- `cv.md` - Plain text version of CV content for reference
- `your-profile-picture.jpg` - Profile image

## Key Components

### Grid Layout System
The main container uses CSS Grid with defined areas:
- `grid-template-areas` defines the layout structure at style.css:24-28
- Responsive grid using `fr` units for flexible column sizing
- Blocks are positioned using `grid-area` properties

### Animation System
Complex animation sequence controlled by `script.js`:
1. Picture starts centered and shrinks (scale 0.85)
2. Picture moves to grid position while maintaining size
3. Picture snaps into grid and resizes to fit
4. CV blocks animate from behind the picture to their positions
5. Text content animates with staggered timing
6. Floating effects add subtle motion

### Block Structure
CV content is organized into semantic blocks:
- Header block (name and title)
- Contact block (phone, location, email, LinkedIn)
- Profile block (personal summary)
- Education block (degrees and achievements)
- Skills block (programming languages, tools, soft skills)
- Experience block (work history)
- Projects block (notable projects)

## Development Commands

Since this is a static website with no build process:

**Preview locally:**
```bash
# Open index.html in any browser
open index.html
# or
python -m http.server 8000  # For local server
```

**Deploy to GitHub Pages:**
- Push files to repository
- Enable GitHub Pages in repository settings
- Site will be available at username.github.io/repository-name

## Animation Timing

The animation sequence is precisely timed:
- Initial delay: 2000ms
- Picture shrink: 500ms delay
- Picture move: 2000ms delay
- Grid snap: 2800ms delay
- Block animations: Staggered 100ms intervals
- Text animations: Variable delays per block type

## Styling Approach

- Dark theme (#131112 background)
- Two main block colors: #D4C7B4 (light blocks) and #4C4C44 (dark blocks)
- Border radius: 15-20px for rounded corners
- Hover effects: scale(1.05) transform
- Floating animation: 3px vertical movement
- Typography: Inter font family with multiple Google Fonts loaded

## File Organization

All files are in the root directory with no subdirectories or complex structure. The design prioritizes simplicity and direct browser compatibility without any build tools or dependencies.