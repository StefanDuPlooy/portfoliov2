# Stefan du Plooy - Interactive CV Portfolio

An animated, interactive CV/portfolio website featuring a unique click-to-start animation sequence and dynamic responsive design.

## Features

### Click-to-Start Animation System
- **Interactive Entry**: Profile picture starts centered with "Click on my face" instruction
- **Smooth Animation Flow**: Picture shrinks → moves to grid position → CV blocks animate from behind
- **Staggered Reveals**: Text content appears with directional movement effects from different directions
- **Responsive Timing**: Animation speeds adapt to screen size for optimal mobile experience

### Dynamic Theme System
- **Dual Themes**: Light and dark mode with smooth transitions
- **Sliding Picture Transition**: Profile images swap seamlessly between themes
- **Block Flip Animations**: CV panels flip during theme changes with staggered timing
- **Spinning Icon**: Animated atom-like icon with startup sequences and theme-change reactions

### Progressive Responsive Design
- **6 Breakpoints**: From ≤479px to ≥1400px with optimized layouts
- **Dynamic Grid Stacking**: Panels progressively stack as screen size decreases
- **Mobile-First Animations**: Faster, touch-optimized interactions on mobile
- **Overflow Protection**: Prevents horizontal scrolling issues on mobile devices

### Interactive Elements
- **Floating Animations**: Subtle continuous movement on CV blocks
- **Touch-Friendly**: Enhanced interactions for mobile devices with proper touch targets
- **Hover Effects**: Scale and shadow transitions on desktop
- **Hidden Scrollbars**: Clean aesthetic while maintaining scroll functionality

## Architecture

**Pure Web Technologies**: No build process or dependencies
- `index.html` - Semantic CV content organized into blocks
- `style.css` - Comprehensive responsive design with advanced animations
- `script.js` - Animation controller with theme management and touch support

## CV Content Structure

- **Header Block**: Name, title, theme toggle, spinning icon
- **Contact Block**: Phone, location, email and LinkedIn actions (stays side-by-side on mobile)
- **Profile Block**: Personal summary with distinctive styling
- **Education Block**: Degrees with structured headers, years, and achievements
- **Skills Block**: Programming languages, tools, databases, and soft skills with tag layout
- **Experience Block**: Work history with consolidated descriptions and bold headings
- **Projects Block**: Notable projects with descriptions and tech stacks

## Design System

**Typography**: Multiple Google Fonts (Inter, Space Grotesk, Plus Jakarta Sans, Sora, etc.)  
**Colors**: Earth tone palette with high contrast ratios  
**Animations**: Smooth cubic-bezier transitions and transforms  
**Layout**: CSS Grid with 15px border radius and modern shadows  

## Responsive Breakpoints

- **≥1400px**: 4-column desktop layout (26px gaps)
- **1200-1399px**: Adjusted 4-column (22px gaps)  
- **1024-1199px**: 3-column with skills spanning full width (20px gaps)
- **768-1023px**: 2-column with shared sections (18px gaps)
- **640-767px**: Mixed layout with strategic 2-column sections (20px gaps)
- **480-639px**: Single column with minimal side-by-side elements (18px gaps)
- **≤479px**: Full single column stack (16px gaps)

## Getting Started

### Local Preview
```bash
# Simple file serving
open index.html

# Or with local server
python -m http.server 8000
```

### Deploy to GitHub Pages
1. Push files to a GitHub repository
2. Go to repository Settings → Pages
3. Select source branch (usually `main` or `master`)
4. Site will be available at `https://username.github.io/repository-name`

## Key Technical Features

- **Responsive Animation Timing**: Different speeds and delays per screen size
- **Touch Device Detection**: Optimized interactions for mobile vs desktop
- **Theme Persistence**: Smooth transitions between light and dark modes
- **Overflow Management**: Prevents horizontal scrolling issues
- **Performance Optimized**: Efficient animations with hardware acceleration
- **Accessibility Considered**: Touch-friendly targets and proper contrast ratios

## Animation Sequence

1. **Initial State**: Centered profile picture with instructions
2. **User Interaction**: Click triggers text fade and smooth scroll to top
3. **Picture Movement**: Shrinks (responsive scale) → moves to grid position → snaps to fit
4. **Block Emergence**: CV blocks animate from picture center to final positions
5. **Text Reveals**: Staggered content animations with directional movement
6. **UI Elements**: Theme toggle and spinning icon appear after sequence completion

## Files Overview

- **CLAUDE.md**: Comprehensive project documentation and development guidance
- **cv.md**: Plain text version of CV content
- **your-profile-picture.jpg**: Light theme profile image
- **your-profile-picture-2.jpg**: Dark theme profile image

---

*Built with vanilla HTML, CSS, and JavaScript for maximum compatibility and performance.*