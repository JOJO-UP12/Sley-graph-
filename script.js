document.addEventListener('DOMContentLoaded', function() {
    // Hero Slider
    const heroSlider = () => {
        const slides = document.querySelectorAll('.hero-slider .slide');
        let current = 0;
        
        setInterval(() => {
            slides[current].classList.remove('active');
            current = (current + 1) % slides.length;
            slides[current].classList.add('active');
        }, 5000);
    };
    
    // Portfolio Filter
    const portfolioFilter = () => {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    };
    
    // LightGallery
    const initLightGallery = () => {
        lightGallery(document.getElementById('gallery'), {
            selector: '.portfolio-item',
            download: false,
            thumbnail: true,
            animateThumb: true,
            showThumbByDefault: false
        });
    };
    
    // Smooth Scroll
    const smoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };
    
    // Mobile Menu
    const mobileMenu = () => {
        const hamburger = document.querySelector('.hamburger');
        const nav = document.querySelector('.main-nav');
        
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });
    };
    
    // Initialize all functions
    heroSlider();
    portfolioFilter();
    initLightGallery();
    smoothScroll();
    mobileMenu();
});
