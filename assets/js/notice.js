/*=============== notice PAGE FUNCTIONALITY ===============*/

// Get all notice header items
const noticeHeaders = document.querySelectorAll('.notice-header-item');

if (noticeHeaders.length > 0) {
    // Add click event listeners to each notice header
    noticeHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            const arrow = this.querySelector('.notice-arrow');
            
            // Check if the content is currently active
            const isActive = targetContent.classList.contains('active');
            
            // Close all other active contents
            closeAllnoticeContents();
            
            // If the clicked content wasn't active, open it
            if (!isActive) {
                opennoticeContent(targetContent, arrow);
            }
        });
    });

    // Function to open notice content
    function opennoticeContent(content, arrow) {
        content.classList.add('active');
        arrow.classList.add('rotated');
        
        // Change arrow icon to up
        arrow.classList.remove('ri-arrow-down-s-line');
        arrow.classList.add('ri-arrow-up-s-line');
        
        // Add smooth animation
        content.style.maxHeight = content.scrollHeight + 'px';
    }

    // Function to close notice content
    function closenoticeContent(content, arrow) {
        content.classList.remove('active');
        arrow.classList.remove('rotated');
        
        // Change arrow icon to down
        arrow.classList.remove('ri-arrow-up-s-line');
        arrow.classList.add('ri-arrow-down-s-line');
        
        // Reset max-height
        content.style.maxHeight = '0px';
    }

    // Function to close all notice contents
    function closeAllnoticeContents() {
        const allContents = document.querySelectorAll('.notice-content');
        const allArrows = document.querySelectorAll('.notice-arrow');
        
        allContents.forEach((content, index) => {
            if (allArrows[index]) {
                closenoticeContent(content, allArrows[index]);
            }
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllnoticeContents();
        }
    });

    // Auto-close when clicking outside
    document.addEventListener('click', function(e) {
        const isnoticeItem = e.target.closest('.notice-item');
        
        if (!isnoticeItem && noticeHeaders.length > 0) {
            closeAllnoticeContents();
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
    noticeHeaders.forEach(header => {
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
    noticeHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            
            if (!targetContent.classList.contains('active')) {
                scrollToContent(this.closest('.notice-item'));
            }
        });
    });

    // Add hover effect for better UX
    noticeHeaders.forEach(header => {
        header.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        header.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
}