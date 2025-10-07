/*=============== UPDATE PAGE FUNCTIONALITY ===============*/

// Get all update header items
const updateHeaders = document.querySelectorAll('.update-header-item');

if (updateHeaders.length > 0) {
    // Add click event listeners to each update header
    updateHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            const arrow = this.querySelector('.update-arrow');
            
            // Check if the content is currently active
            const isActive = targetContent.classList.contains('active');
            
            // Close all other active contents
            closeAllUpdateContents();
            
            // If the clicked content wasn't active, open it
            if (!isActive) {
                openUpdateContent(targetContent, arrow);
            }
        });
    });

    // Function to open update content
    function openUpdateContent(content, arrow) {
        content.classList.add('active');
        arrow.classList.add('rotated');
        
        // Change arrow icon to up
        arrow.classList.remove('ri-arrow-down-s-line');
        arrow.classList.add('ri-arrow-up-s-line');
        
        // Add smooth animation
        content.style.maxHeight = content.scrollHeight + 'px';
    }

    // Function to close update content
    function closeUpdateContent(content, arrow) {
        content.classList.remove('active');
        arrow.classList.remove('rotated');
        
        // Change arrow icon to down
        arrow.classList.remove('ri-arrow-up-s-line');
        arrow.classList.add('ri-arrow-down-s-line');
        
        // Reset max-height
        content.style.maxHeight = '0px';
    }

    // Function to close all update contents
    function closeAllUpdateContents() {
        const allContents = document.querySelectorAll('.update-content');
        const allArrows = document.querySelectorAll('.update-arrow');
        
        allContents.forEach((content, index) => {
            if (allArrows[index]) {
                closeUpdateContent(content, allArrows[index]);
            }
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllUpdateContents();
        }
    });

    // Auto-close when clicking outside
    document.addEventListener('click', function(e) {
        const isUpdateItem = e.target.closest('.update-item');
        
        if (!isUpdateItem && updateHeaders.length > 0) {
            closeAllUpdateContents();
        }
    });

    // Add loading animation when opening content
    function addLoadingAnimation(content) {
        content.classList.add('loading');
        
        setTimeout(() => {
            content.classList.remove('loading');
        }, 300);
    }

    // Enhanced version with loading animation
    updateHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            
            const isActive = targetContent.classList.contains('active');
            
            if (!isActive) {
                addLoadingAnimation(targetContent);
            }
        });
    });

    // Smooth scroll to opened content on mobile
    function scrollToContent(element) {
        if (window.innerWidth <= 768) {
            setTimeout(() => {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                });
            }, 300);
        }
    }

    // Add smooth scrolling for mobile
    updateHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            
            if (!targetContent.classList.contains('active')) {
                scrollToContent(this.closest('.update-item'));
            }
        });
    });

    // Add hover effect for better UX
    updateHeaders.forEach(header => {
        header.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        header.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
}