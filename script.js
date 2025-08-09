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
        
        // Step 4: As picture snaps into place, show other blocks
        setTimeout(() => {
            animateBlocksAppearance();
        }, 2200);
    }
    
    function animateBlocksAppearance() {
        cvBlocks.forEach((block, index) => {
            // Stagger the appearance of each block
            setTimeout(() => {
                block.classList.add('appear');
            }, index * 150);
        });
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