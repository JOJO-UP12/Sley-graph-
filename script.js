document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burger.classList.toggle('active');
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            burger.classList.remove('active');
        });
    });

    // Sticky Header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        header.classList.toggle('sticky', window.scrollY > 0);
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Portfolio Filtering
    const categoryBtns = document.querySelectorAll('.category-btn');
    const portfolioGrid = document.querySelector('.portfolio-grid');

    // Sample portfolio items (replace with your actual images)
    const portfolioItems = [
        { category: 'wedding', img: 'https://via.placeholder.com/600x600?text=Mariage+1' },
        { category: 'wedding', img: 'https://via.placeholder.com/600x600?text=Mariage+2' },
        { category: 'family', img: 'https://via.placeholder.com/600x600?text=Famille+1' },
        { category: 'family', img: 'https://via.placeholder.com/600x600?text=Famille+2' },
        { category: 'portrait', img: 'https://via.placeholder.com/600x600?text=Portrait+1' },
        { category: 'portrait', img: 'https://via.placeholder.com/600x600?text=Portrait+2' },
        { category: 'child', img: 'https://via.placeholder.com/600x600?text=Enfant+1' },
        { category: 'child', img: 'https://via.placeholder.com/600x600?text=Enfant+2' },
        { category: 'pregnancy', img: 'https://via.placeholder.com/600x600?text=Grossesse+1' },
        { category: 'pregnancy', img: 'https://via.placeholder.com/600x600?text=Grossesse+2' },
        { category: 'event', img: 'https://via.placeholder.com/600x600?text=Événement+1' },
        { category: 'event', img: 'https://via.placeholder.com/600x600?text=Événement+2' },
        { category: 'fashion', img: 'https://via.placeholder.com/600x600?text=Mode+1' },
        { category: 'fashion', img: 'https://via.placeholder.com/600x600?text=Mode+2' }
    ];

    // Load portfolio items
    function loadPortfolioItems(category = 'all') {
        portfolioGrid.innerHTML = '';
        const filteredItems = category === 'all' 
            ? portfolioItems 
            : portfolioItems.filter(item => item.category === category);

        filteredItems.forEach(item => {
            const portfolioItem = document.createElement('div');
            portfolioItem.className = 'portfolio-item';
            portfolioItem.dataset.category = item.category;
            portfolioItem.innerHTML = `
                <img src="${item.img}" alt="${item.category}">
            `;
            portfolioGrid.appendChild(portfolioItem);
        });

        // Initialize lightbox after loading images
        initLightbox();
    }

    // Filter portfolio items
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.dataset.category;
            loadPortfolioItems(category);
        });
    });

    // Lightbox functionality
    function initLightbox() {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        const lightbox = document.querySelector('.lightbox');
        const lightboxImg = document.querySelector('.lightbox-content');
        const closeLightbox = document.querySelector('.close-lightbox');

        portfolioItems.forEach(item => {
            item.addEventListener('click', () => {
                const imgSrc = item.querySelector('img').src;
                lightboxImg.src = imgSrc;
                lightbox.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });

        closeLightbox.addEventListener('click', () => {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Testimonials Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev-testimonial');
    const nextBtn = document.querySelector('.next-testimonial');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        testimonials[index].classList.add('active');
        currentTestimonial = index;
    }

    prevBtn.addEventListener('click', () => {
        let newIndex = currentTestimonial - 1;
        if (newIndex < 0) newIndex = testimonials.length - 1;
        showTestimonial(newIndex);
    });

    nextBtn.addEventListener('click', () => {
        let newIndex = currentTestimonial + 1;
        if (newIndex >= testimonials.length) newIndex = 0;
        showTestimonial(newIndex);
    });

    // Auto-rotate testimonials
    setInterval(() => {
        let newIndex = currentTestimonial + 1;
        if (newIndex >= testimonials.length) newIndex = 0;
        showTestimonial(newIndex);
    }, 5000);

    // Animate service cards on scroll
    const serviceCards = document.querySelectorAll('.service-card');

    function checkScroll() {
        serviceCards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;
            if (cardTop < window.innerHeight - 100) {
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 200);
            }
        });
    }

    window.addEventListener('scroll', checkScroll);
    window.addEventListener('load', checkScroll);

    // Form submission
    const bookingForm = document.querySelector('.booking-form');
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Merci pour votre demande! Je vous contacterai bientôt pour confirmer.');
        this.reset();
    });

    // Load initial portfolio items
    loadPortfolioItems();
});
