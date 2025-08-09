document.addEventListener('DOMContentLoaded', function() {
    const pictureBlock = document.getElementById('pictureBlock');
    const cvBlocks = document.querySelectorAll('.cv-block');
    
    // Animation sequence controller
    let animationStarted = false;
    
    // Start animation after page load
    setTimeout(() => {
        if (!animationStarted) {
            startAnimation();
        }
    }, 2000);
    
    // Also start animation on picture click for immediate interaction
    pictureBlock.addEventListener('click', function() {
        if (!animationStarted) {
            startAnimation();
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
        
        // Step 1: Shrink the picture slightly
        pictureBlock.style.transform = 'translate(-50%, -50%) scale(0.85)';
        
        // Step 2: Move to calculated grid position while maintaining size
        setTimeout(() => {
            // Move to top-left corner of grid area to align with final position
            pictureBlock.style.top = rect.top + 'px';
            pictureBlock.style.left = rect.left + 'px';
            pictureBlock.style.transform = 'translate(0, 0) scale(0.85)';
        }, 500);
        
        // Step 3: Snap into grid and resize to fit
        setTimeout(() => {
            // Keep the transform origin at top-left for smooth growth
            pictureBlock.style.transformOrigin = 'top left';
            pictureBlock.classList.add('moved');
        }, 2000);
        
        // Step 4: As picture snaps into place, animate blocks emerging from behind
        setTimeout(() => {
            animateBlocksFromBehind();
        }, 2800);
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
            
            // Set initial styles (start from picture center, small size)
            animatedBlock.style.cssText = `
                position: fixed;
                top: ${pictureCenterY}px;
                left: ${pictureCenterX}px;
                width: 80px;
                height: 60px;
                background: ${backgroundColor};
                border-radius: 15px;
                transform: translate(-50%, -50%) scale(0.3);
                transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                z-index: 50;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            `;
            
            document.body.appendChild(animatedBlock);
            
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
                    }, 300);
                }, 580);
            }, index * 100);
        });
    }
    
    function animateBlockText(block, blockIndex) {
        // Add the text-animated class to trigger CSS animations
        block.classList.add('text-animated');
        
        // Creative staggered animations for blocks with multiple items
        if (block.id === 'skillsBlock') {
            // Rapid-fire cascade effect
            const skillsSections = block.querySelectorAll('.skills-section');
            skillsSections.forEach((section, index) => {
                section.style.transitionDelay = `${index * 80}ms`;
            });
        }
        
        if (block.id === 'educationBlock') {
            // Smooth sequential flow
            const educationItems = block.querySelectorAll('.education-item');
            educationItems.forEach((item, index) => {
                item.style.transitionDelay = `${200 + (index * 200)}ms`;
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
    
    // Add hover effects and interactions
    cvBlocks.forEach(block => {
        block.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        block.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add subtle floating animation after everything is loaded
    setTimeout(() => {
        addFloatingEffect();
    }, 3000);
    
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
});