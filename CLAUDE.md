# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an animated, interactive CV/portfolio website for Stefan du Plooy. The site features a unique click-to-start animation sequence where blocks start from the center of the screen and animate to their final grid positions, creating an engaging visual experience.

## Architecture

The project uses vanilla HTML, CSS, and JavaScript with no build process or dependencies:

- `index.html` - Main HTML structure containing CV content organized into blocks
- `style.css` - CSS styles with comprehensive responsive design, grid layout, and animations
- `script.js` - JavaScript animation controller with theme toggle and touch support
- `cv.md` - Plain text version of CV content for reference
- `your-profile-picture.jpg` / `your-profile-picture-2.jpg` - Profile images for light/dark themes

## Key Components

### Responsive Grid Layout System
The main container uses CSS Grid with multiple breakpoints:
- Desktop: 4-column grid (2fr 1fr 2.7fr 2.8fr) with compact row heights (0.25fr 0.25fr 0.35fr)
- Tablet: 2-column responsive grid
- Mobile: Single-column stacked layout
- Responsive typography scaling with clamp() functions
- Touch-friendly interactions for mobile devices
- Hidden scrollbars with maintained functionality

### Click-to-Start Animation System
Interactive animation sequence controlled by `script.js`:
1. **Initial State**: Profile picture centered with instruction text
2. **User Click**: Text fades, page scrolls to top smoothly, animation begins after 400ms delay
3. **Picture Animation**: Shrinks (scale 0.85), moves to grid position, snaps to fit
4. **Block Animation**: CV blocks animate from behind picture to final positions
5. **Text Animation**: Staggered text reveals with directional movement effects
6. **Theme Toggle**: Appears after animation with spinning icon

### Interactive Elements
- **Click Instructions**: "Click on my face" text above picture, "Best viewed on desktop" below
- **Theme Toggle**: Button in header (40px) with sliding picture transition between light/dark images
- **Spinning Icon**: Large animated atom-like icon (70px) in header bar positioned at 30% top, 25px left
- **Touch Support**: Enhanced touch interactions for mobile devices with proper touch targets
- **Floating Effects**: Subtle continuous floating animations on CV blocks (3px movement)

### Block Structure
CV content organized into semantic blocks:
- Header block (name, title, theme toggle, spinning icon) - 35px padding, relative positioning
- Contact block (phone, location, email, LinkedIn actions) - modern action buttons
- Profile block (personal summary) - reduced text size (1.1em)
- Education block (degrees and achievements) - structured with years and details
- Skills block (programming languages, tools, databases, soft skills) - tag-based layout
- Experience block (work history with consolidated bullet points matching cv.md)
- Projects block (notable projects with descriptions and tools used)

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

The click-to-start animation sequence:
- **Click Response**: Immediate text fade (400ms) + smooth scroll to top
- **Animation Start**: 400ms delay after click (waiting for text fade completion)
- **Picture Shrink**: Mobile 200-300ms, Desktop 300ms delay
- **Picture Move**: Mobile 800ms, Desktop 1200ms delay  
- **Block Animations**: Staggered 60-100ms intervals (responsive)
- **Text Animations**: Variable delays per block type (150-300ms)
- **Theme Toggle Appearance**: 4000ms after start
- **Spinning Icon Start**: 5000ms after start with startup spin animation

## Responsive Design

### Breakpoints
- **≥1600px**: Large desktops - 35px padding, larger typography, 35px gap
- **≤1400px**: Standard desktops - 35px padding, 16px gap, optimized grid
- **≤1200px**: Medium screens - 35px padding, 14px gap, compact layout
- **≤1024px**: Small laptops/large tablets - 30px padding, 2-column grid
- **≤768px**: Tablets portrait - 28px padding, single column
- **≤640px**: Mobile devices - 24px padding, smaller typography
- **≤480px**: Small mobile - 20px padding, minimal spacing

### Theme System
- **Light Theme**: #131112 background, #D4C7B4/#4C4C44 blocks
- **Dark Theme**: #4C372F background, #171612/#AA977A blocks
- **Theme Toggle**: Sliding picture transition with flip animations on blocks
- **Icon Colors**: Automatic color adaptation with !important declarations for visibility
- **Profile Pictures**: Automatic swapping between light/dark theme images

## Styling Approach

- **Typography**: Multiple Google Fonts (Inter, Space Grotesk, Plus Jakarta Sans, Sora, etc.)
- **Colors**: Carefully chosen earth tones with high contrast ratios and opacity variations
- **Animations**: Smooth cubic-bezier transitions and transforms
- **Accessibility**: Touch-friendly targets, hidden scrollbars, user-select disabled on UI elements
- **Modern CSS**: Grid layouts, clamp() functions, white-space: nowrap for text consistency
- **Border Radius**: 15px for modern rounded corners
- **Box Shadows**: 0 8px 32px rgba(0, 0, 0, 0.3) for depth

## User Experience

- **Click-to-Start**: Prevents animation from starting automatically, user must interact
- **Instruction Text**: Clear guidance with modern Space Grotesk font
- **Smooth Scrolling**: Ensures user sees full animation from top of page
- **Responsive Text**: Single-line text with nowrap for consistent display
- **Desktop Optimization**: Clear messaging about best viewing experience
- **Touch-Friendly**: Proper touch targets and interactions for mobile users

## File Organization

All files are in the root directory with no subdirectories or complex structure. The design prioritizes simplicity and direct browser compatibility without any build tools or dependencies.