// Enhanced Navbar Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get navbar element
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');
    
    // Function to handle navbar scroll state
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    }

    // Initialize on page load
    handleNavbarScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Handle active link state
    function setActiveLink() {
        let currentSection = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.includes(currentSection) && currentSection !== '') {
                link.classList.add('active');
            } else if (href === 'index.html' && window.location.pathname.includes('index.html')) {
                // Handle index.html active state
                if (currentSection === 'home' || currentSection === '') {
                    link.classList.add('active');
                }
            }
        });
    }
    
    // Check active link on scroll
    window.addEventListener('scroll', setActiveLink);
    
    // Add smooth scrolling to all links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Close the mobile menu when a link is clicked
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
            
            // Only apply to hash links on the same page
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Add click event to close button in mobile menu
    navbarCollapse.addEventListener('click', function(e) {
        // Check if the click happened on the close button (::before pseudo-element)
        const rect = navbarCollapse.getBoundingClientRect();
        if (e.clientX > rect.right - 30 && e.clientY < rect.top + 40) {
            // Close the menu
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        }
    });
    
    // Make ESC key close the mobile menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navbarCollapse.classList.contains('show')) {
            navbarToggler.click();
        }
    });
    
    // Add animation to navbar toggler
    navbarToggler.addEventListener('click', function() {
        this.classList.toggle('toggler-open');
    });
});
