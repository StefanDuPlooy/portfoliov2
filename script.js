document.addEventListener('DOMContentLoaded', function() {
    const pictureBlock = document.getElementById('pictureBlock');
    const cvBlocks = document.querySelectorAll('.cv-block');
    const themeToggle = document.getElementById('themeToggle');
    const topInstruction = document.getElementById('topInstruction');
    const bottomNotice = document.getElementById('bottomNotice');
    const body = document.body;
    
    // Animation sequence controller
    let animationStarted = false;
    
    // Theme toggle functionality
    let isDarkTheme = false;
    
    // Enhanced responsive detection for dynamic grid
    function getScreenSize() {
        const width = window.innerWidth;
        if (width >= 1400) return 'xl';
        if (width >= 1200) return 'lg';
        if (width >= 1024) return 'md';
        if (width >= 768) return 'sm';
        if (width >= 640) return 'tablet';
        if (width >= 480) return 'mobile';
        return 'xs';
    }
    
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    function isSmallMobile() {
        return window.innerWidth <= 479;
    }
    
    function isTablet() {
        return window.innerWidth > 640 && window.innerWidth <= 767;
    }
    
    function isMediumScreen() {
        return window.innerWidth > 1023 && window.innerWidth <= 1199;
    }
    
    // Touch device detection
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Theme toggle with improved touch support
    function handleThemeToggle() {
        isDarkTheme = !isDarkTheme;
        
        // Trigger fast spin on spinning icon
        const spinningIcon = document.querySelector('.spinning-icon');
        if (spinningIcon) {
            spinningIcon.classList.remove('started');
            spinningIcon.classList.add('theme-change-spin');
            setTimeout(() => {
                spinningIcon.classList.remove('theme-change-spin');
                spinningIcon.classList.add('started');
            }, 1500);
        }
        
        const profileImg = document.querySelector('.profile-img');
        const allBlocks = document.querySelectorAll('.cv-block');
        const pictureBlock = document.getElementById('pictureBlock');
        
        // Handle picture block with sliding window animation
        const pictureRect = pictureBlock.getBoundingClientRect();
        const newImgSrc = isDarkTheme ? 'your-profile-picture-2.jpg' : 'your-profile-picture.jpg';
        
        // Create sliding window container that overlays the original
        const slideContainer = document.createElement('div');
        slideContainer.style.cssText = `
            position: fixed;
            top: ${pictureRect.top}px;
            left: ${pictureRect.left}px;
            width: ${pictureRect.width}px;
            height: ${pictureRect.height}px;
            border-radius: 15px;
            overflow: hidden;
            z-index: 1001;
            background: transparent;
        `;
        
        // Create current image (slides out) - show what's currently visible
        const currentImg = document.createElement('img');
        currentImg.src = profileImg.src;
        currentImg.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        `;
        
        // Create new image (slides in)
        const newImg = document.createElement('img');
        newImg.src = newImgSrc;
        newImg.style.cssText = `
            position: absolute;
            top: 0;
            left: 100%;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        `;
        
        slideContainer.appendChild(currentImg);
        slideContainer.appendChild(newImg);
        
        // Show sliding container (original stays visible underneath)
        document.body.appendChild(slideContainer);
        
        // Start sliding animation
        setTimeout(() => {
            currentImg.style.transform = 'translateX(-100%)';
            newImg.style.transform = 'translateX(-100%)';
        }, 50);
        
        // Update original image during slide animation (when new image is visible)
        setTimeout(() => {
            profileImg.src = newImgSrc;
        }, 400);
        
        // Fade out overlay to reveal updated original
        setTimeout(() => {
            slideContainer.style.transition = 'opacity 0.2s ease';
            slideContainer.style.opacity = '0';
            
            // Remove overlay after fade completes
            setTimeout(() => {
                if (document.body.contains(slideContainer)) {
                    document.body.removeChild(slideContainer);
                }
            }, 200);
        }, 800);
        
        // Handle CV blocks flip animation
        allBlocks.forEach((panel, index) => {
            // Stagger the animations slightly for a wave effect
            setTimeout(() => {
                if (isDarkTheme) {
                    panel.classList.add('flipping-to-dark');
                } else {
                    panel.classList.add('flipping-to-light');
                }
                
                // Remove animation class after animation completes
                setTimeout(() => {
                    panel.classList.remove('flipping-to-dark', 'flipping-to-light');
                }, 800);
            }, index * 50);
        });
        
        // Change theme and picture at the halfway point of the flip (when it's perpendicular)
        setTimeout(() => {
            if (isDarkTheme) {
                body.classList.add('dark-theme');
                profileImg.src = 'your-profile-picture-2.jpg';
            } else {
                body.classList.remove('dark-theme');
                profileImg.src = 'your-profile-picture.jpg';
            }
        }, 400); // Halfway through the 800ms animation
        
        // Profile colors stay original - no special color change
        
        // Add a subtle bounce animation to the toggle button
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 150);
    }
    
    // Add event listeners for theme toggle with touch support
    if (isTouchDevice) {
        themeToggle.addEventListener('touchend', function(e) {
            e.preventDefault();
            handleThemeToggle();
        }, { passive: false });
    } else {
        themeToggle.addEventListener('click', handleThemeToggle);
    }
    
    // Start animation only on picture click
    pictureBlock.addEventListener('click', function() {
        if (!animationStarted) {
            // Fade out both instruction texts first
            topInstruction.style.opacity = '0';
            bottomNotice.style.opacity = '0';
            
            // Smoothly scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Wait for text to fade, then start animation
            setTimeout(() => {
                startAnimation();
            }, 400); // Match the CSS transition duration
        }
    });
    
    function startAnimation() {
        if (animationStarted) return;
        animationStarted = true;
        
        // Calculate the final position where the picture should go
        const pictureGridArea = document.createElement('div');
        pictureGridArea.style.gridArea = 'picture';
        pictureGridArea.style.visibility = 'hidden';
        document.querySelector('.container').appendChild(pictureGridArea);
        
        const rect = pictureGridArea.getBoundingClientRect();
        document.querySelector('.container').removeChild(pictureGridArea);
        
        // Responsive animation timing and scaling based on screen size
        const screenSize = getScreenSize();
        let shrinkScale, moveDelay, snapDelay;
        
        switch(screenSize) {
            case 'xs':
                shrinkScale = 0.95;
                moveDelay = 150;
                snapDelay = 600;
                break;
            case 'mobile':
                shrinkScale = 0.9;
                moveDelay = 200;
                snapDelay = 700;
                break;
            case 'tablet':
                shrinkScale = 0.87;
                moveDelay = 250;
                snapDelay = 900;
                break;
            case 'sm':
                shrinkScale = 0.85;
                moveDelay = 300;
                snapDelay = 1000;
                break;
            case 'md':
                shrinkScale = 0.83;
                moveDelay = 350;
                snapDelay = 1100;
                break;
            default: // lg, xl
                shrinkScale = 0.85;
                moveDelay = 300;
                snapDelay = 1200;
        }
        
        // Step 1: Shrink the picture slightly
        pictureBlock.style.transform = `translate(-50%, -50%) scale(${shrinkScale})`;
        
        // Step 2: Move to calculated grid position while maintaining size
        setTimeout(() => {
            // Move to top-left corner of grid area to align with final position
            pictureBlock.style.top = rect.top + 'px';
            pictureBlock.style.left = rect.left + 'px';
            pictureBlock.style.transform = `translate(0, 0) scale(${shrinkScale})`;
        }, moveDelay);
        
        // Step 3: Snap into grid and resize to fit
        setTimeout(() => {
            // Keep the transform origin at top-left for smooth growth
            pictureBlock.style.transformOrigin = 'top left';
            pictureBlock.classList.add('moved');
        }, snapDelay);
        
        // Step 4: As picture snaps into place, animate blocks emerging from behind
        let blocksDelay;
        switch(screenSize) {
            case 'xs':
                blocksDelay = 1200;
                break;
            case 'mobile':
                blocksDelay = 1400;
                break;
            case 'tablet':
                blocksDelay = 1600;
                break;
            case 'sm':
                blocksDelay = 1700;
                break;
            case 'md':
                blocksDelay = 1800;
                break;
            default: // lg, xl
                blocksDelay = 2000;
        }
        setTimeout(() => {
            animateBlocksFromBehind();
        }, blocksDelay);
    }
    
    function animateBlocksFromBehind() {
        // Get picture block position as starting point
        const pictureRect = pictureBlock.getBoundingClientRect();
        const pictureCenterX = pictureRect.left + pictureRect.width / 2;
        const pictureCenterY = pictureRect.top + pictureRect.height / 2;
        
        cvBlocks.forEach((block, index) => {
            // Get final position of each block
            const blockRect = block.getBoundingClientRect();
            const blockCenterX = blockRect.left + blockRect.width / 2;
            const blockCenterY = blockRect.top + blockRect.height / 2;
            
            // Create animated placeholder block
            const animatedBlock = document.createElement('div');
            animatedBlock.className = 'animated-block';
            
            // Get block's color scheme
            let backgroundColor = '#D4C7B4';
            if (block.id === 'headerBlock' || block.id === 'profileBlock') {
                backgroundColor = '#4C4C44';
            }
            
            // Responsive initial size and animation duration based on screen size
            const screenSize = getScreenSize();
            let initialWidth, initialHeight, animationDuration, borderRadius;
            
            switch(screenSize) {
                case 'xs':
                    initialWidth = 50;
                    initialHeight = 35;
                    animationDuration = 0.3;
                    borderRadius = 8;
                    break;
                case 'mobile':
                    initialWidth = 60;
                    initialHeight = 40;
                    animationDuration = 0.4;
                    borderRadius = 10;
                    break;
                case 'tablet':
                    initialWidth = 70;
                    initialHeight = 50;
                    animationDuration = 0.5;
                    borderRadius = 12;
                    break;
                case 'sm':
                    initialWidth = 80;
                    initialHeight = 60;
                    animationDuration = 0.6;
                    borderRadius = 15;
                    break;
                default: // md, lg, xl
                    initialWidth = 80;
                    initialHeight = 60;
                    animationDuration = 0.6;
                    borderRadius = 15;
            }
            
            // Set initial styles (start from picture center, small size)
            animatedBlock.style.cssText = `
                position: fixed;
                top: ${pictureCenterY}px;
                left: ${pictureCenterX}px;
                width: ${initialWidth}px;
                height: ${initialHeight}px;
                background: ${backgroundColor};
                border-radius: ${borderRadius}px;
                transform: translate(-50%, -50%) scale(0.3);
                transition: all ${animationDuration}s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                z-index: 50;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            `;
            
            document.body.appendChild(animatedBlock);
            
            // Responsive stagger delay based on screen size
            let staggerDelay, animationTime, textDelay;
            
            switch(screenSize) {
                case 'xs':
                    staggerDelay = 40;
                    animationTime = 300;
                    textDelay = 150;
                    break;
                case 'mobile':
                    staggerDelay = 60;
                    animationTime = 400;
                    textDelay = 200;
                    break;
                case 'tablet':
                    staggerDelay = 70;
                    animationTime = 450;
                    textDelay = 220;
                    break;
                case 'sm':
                    staggerDelay = 80;
                    animationTime = 500;
                    textDelay = 250;
                    break;
                case 'md':
                    staggerDelay = 90;
                    animationTime = 540;
                    textDelay = 280;
                    break;
                default: // lg, xl
                    staggerDelay = 100;
                    animationTime = 580;
                    textDelay = 300;
            }
            
            // Animate to final position with delay
            setTimeout(() => {
                animatedBlock.style.top = blockCenterY + 'px';
                animatedBlock.style.left = blockCenterX + 'px';
                animatedBlock.style.width = blockRect.width + 'px';
                animatedBlock.style.height = blockRect.height + 'px';
                animatedBlock.style.transform = 'translate(-50%, -50%) scale(1)';
                
                // Show real block first, then remove animated one
                setTimeout(() => {
                    // Fade out placeholder while fading in real block simultaneously
                    animatedBlock.style.opacity = '0';
                    animatedBlock.style.transition = 'opacity 0.2s ease';
                    
                    // Make real block visible at the exact same time
                    block.style.opacity = '1';
                    block.style.transform = 'scale(1)';
                    
                    // Remove placeholder after fade out completes
                    setTimeout(() => {
                        if (document.body.contains(animatedBlock)) {
                            document.body.removeChild(animatedBlock);
                        }
                    }, 200);
                    
                    // Animate text content after block is fully visible
                    setTimeout(() => {
                        animateBlockText(block, index);
                    }, textDelay);
                }, animationTime);
            }, index * staggerDelay);
        });
    }
    
    function animateBlockText(block, blockIndex) {
        // Add the text-animated class to trigger CSS animations
        block.classList.add('text-animated');
        
        // Start spinning icon when header block starts animating
        if (block.id === 'headerBlock') {
            const spinningIcon = document.querySelector('.spinning-icon');
            if (spinningIcon) {
                // Show and start with fast spin
                spinningIcon.style.opacity = '1';
                spinningIcon.classList.add('startup-spin');
                setTimeout(() => {
                    // Transition to normal continuous spinning
                    spinningIcon.classList.remove('startup-spin');
                    spinningIcon.classList.add('started');
                }, 1500);
            }
        }
        
        // Creative staggered animations for blocks with multiple items
        if (block.id === 'skillsBlock') {
            // Rapid-fire cascade effect
            const skillsSections = block.querySelectorAll('.skills-section');
            skillsSections.forEach((section, index) => {
                section.style.transitionDelay = `${index * 80}ms`;
            });
        }
        
        if (block.id === 'educationBlock') {
            // Smooth sequential flow for education items
            const educationItems = block.querySelectorAll('.education-item');
            
            // Animate education items with staggered timing
            educationItems.forEach((item, index) => {
                item.style.transitionDelay = `${200 + (index * 150)}ms`;
            });
        }
        
        if (block.id === 'projectsBlock') {
            // Dramatic staggered entrance
            const projectItems = block.querySelectorAll('.project-item');
            projectItems.forEach((item, index) => {
                item.style.transitionDelay = `${150 + (index * 180)}ms`;
            });
        }
    }
    
    // Add hover effects and touch interactions
    cvBlocks.forEach(block => {
        if (isTouchDevice) {
            // Touch device interactions
            let touchStartTime;
            let touchMoved = false;
            
            block.addEventListener('touchstart', function(e) {
                touchStartTime = Date.now();
                touchMoved = false;
                this.style.transform = 'scale(1.02)';
                this.style.transition = 'transform 0.1s ease';
            }, { passive: true });
            
            block.addEventListener('touchmove', function() {
                touchMoved = true;
                this.style.transform = 'scale(1)';
            }, { passive: true });
            
            block.addEventListener('touchend', function() {
                const touchDuration = Date.now() - touchStartTime;
                
                if (!touchMoved && touchDuration < 300) {
                    // Quick tap - add a subtle feedback
                    this.style.transform = 'scale(0.98)';
                    setTimeout(() => {
                        this.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    this.style.transform = 'scale(1)';
                }
                
                this.style.transition = 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
            }, { passive: true });
        } else {
            // Mouse interactions for non-touch devices
            block.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.02)';
                this.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            });
            
            block.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.transition = 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
            });
        }
    });
    
    // Add subtle floating animation after everything is loaded
    setTimeout(() => {
        addFloatingEffect();
    }, 3000);
    
    // Show theme toggle button after all animations complete
    setTimeout(() => {
        themeToggle.classList.add('visible');
    }, 4000);
    
    // Spinning icon will be triggered when header block appears
    
    function addFloatingEffect() {
        cvBlocks.forEach((block, index) => {
            const delay = Math.random() * 2000;
            const duration = 3000 + Math.random() * 2000;
            
            setTimeout(() => {
                block.style.animation = `float ${duration}ms ease-in-out infinite`;
            }, delay);
        });
    }
    
    // Add floating keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translateY(0px) scale(1);
            }
            50% {
                transform: translateY(-3px) scale(1);
            }
        }
    `;
    document.head.appendChild(style);

    // Handle window resize for responsive layout adjustments
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Only handle resize if animation has started
            if (animationStarted && pictureBlock.classList.contains('moved')) {
                // Recalculate grid positioning for moved picture
                const pictureGridArea = document.createElement('div');
                pictureGridArea.style.gridArea = 'picture';
                pictureGridArea.style.visibility = 'hidden';
                document.querySelector('.container').appendChild(pictureGridArea);
                
                const rect = pictureGridArea.getBoundingClientRect();
                document.querySelector('.container').removeChild(pictureGridArea);
                
                // Smoothly adjust picture position
                pictureBlock.style.transition = 'all 0.3s ease';
                pictureBlock.style.top = rect.top + 'px';
                pictureBlock.style.left = rect.left + 'px';
                
                // Reset transition after adjustment
                setTimeout(() => {
                    pictureBlock.style.transition = '';
                }, 300);
            }
        }, 250); // Debounce resize events
    });
});