document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileBtn = document.querySelector('.mobile-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    mobileBtn.addEventListener('click', () => {
        mobileBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Toggle body overflow when menu is open to prevent scrolling behind
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) { // Only close if on mobile
                mobileBtn.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = ''; // Restore body scroll
            }
        });
    });
    
    // Navbar scroll effect (shrink and add shadow)
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 20) { // After scrolling 20px
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Active link highlighting based on scroll position
    const sections = document.querySelectorAll('section'); // Get all sections
    const navItems = document.querySelectorAll('.nav-item'); // Get all navigation list items
    
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Check if the current scroll position is within the section
            // Adjust -100 to fine-tune when the active state changes
            if (window.scrollY >= sectionTop - 100 && window.scrollY < sectionTop + sectionHeight - 100) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        // Remove 'active' class from all links and add to the current one
        navItems.forEach(item => {
            const link = item.querySelector('.nav-link');
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default jump
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Ignore empty href
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Scroll to the target element, accounting for fixed navbar height
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust 80px for navbar height
                    behavior: 'smooth' // Smooth scroll animation
                });
            }
        });
    });
    
    // Ensure body scroll is restored if window is resized from mobile to desktop while menu is open
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileBtn.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
});
