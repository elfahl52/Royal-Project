  // Main JavaScript for Royal Template
document.addEventListener('DOMContentLoaded', function() {
    // Basic functionality
    console.log('Royal Template loaded');
    
    // Advanced Navbar Effects
    const header = document.querySelector('.header-home');
    const navbarBrand = document.querySelector('.navbar-brand');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const bookButton = document.querySelector('.btn-warning');
    
    // Scroll-based navbar effects
    let lastScrollTop = 0;
    let scrollTimer = null;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        
        // Clear timer
        clearTimeout(scrollTimer);
        
        // Set timer to show navbar after scroll stops
        scrollTimer = setTimeout(function() {
            header.style.transform = 'translateY(0)';
        }, 150);
    });
    
    // Mobile menu enhancements
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 991) {
            if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target)) {
                navbarCollapse.classList.remove('show');
            }
        }
    });
    
    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 991) {
                navbarCollapse.classList.remove('show');
            }
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 991) {
            navbarCollapse.classList.remove('show');
        }
    });
    
    // Add active state to current page
    const currentPath = window.location.pathname;
    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (linkPath === currentPath || (currentPath === '/' && linkPath.endsWith('index.html'))) {
            link.classList.add('active');
        }
    });
    
    // Navigation links advanced hover effects
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            createNavRipple(this);
        });
        
        link.addEventListener('click', function(e) {
            // Add active state
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Smooth scroll to section if it's an anchor link
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Book Now button advanced effects
    bookButton.addEventListener('mouseenter', function() {
        createButtonGlow(this);
    });
    
    bookButton.addEventListener('click', function(e) {
        e.preventDefault();
        createBookingRipple(this);
        showBookingNotification();
    });
    
    // Crown sparkle effect
    function createCrownSparkle(element) {
        const crown = element.querySelector('i');
        const sparkle = document.createElement('div');
        sparkle.style.position = 'absolute';
        sparkle.style.width = '4px';
        sparkle.style.height = '4px';
        sparkle.style.background = '#ffc107';
        sparkle.style.borderRadius = '50%';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.animation = 'crownSparkle 1s ease-out forwards';
        
        const rect = crown.getBoundingClientRect();
        sparkle.style.left = (rect.left + rect.width / 2) + 'px';
        sparkle.style.top = (rect.top + rect.height / 2) + 'px';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 1000);
    }
    
    // Navigation ripple effect
    function createNavRipple(element) {
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.background = 'rgba(255, 193, 7, 0.3)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'navRipple 0.6s ease-out forwards';
        
        const rect = element.getBoundingClientRect();
        ripple.style.left = (rect.width / 2) + 'px';
        ripple.style.top = (rect.height / 2) + 'px';
        
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
    
    // Button glow effect
    function createButtonGlow(element) {
        const glow = document.createElement('div');
        glow.style.position = 'absolute';
        glow.style.top = '0';
        glow.style.left = '0';
        glow.style.right = '0';
        glow.style.bottom = '0';
        glow.style.background = 'radial-gradient(circle, rgba(255, 193, 7, 0.4) 0%, transparent 70%)';
        glow.style.borderRadius = '50px';
        glow.style.pointerEvents = 'none';
        glow.style.animation = 'buttonGlow 1s ease-out forwards';
        
        element.appendChild(glow);
        
        setTimeout(() => glow.remove(), 1000);
    }
    
    // Booking ripple effect
    function createBookingRipple(element) {
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.width = '40px';
        ripple.style.height = '40px';
        ripple.style.background = 'rgba(255, 193, 7, 0.5)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'bookingRipple 1.5s ease-out forwards';
        
        const rect = element.getBoundingClientRect();
        ripple.style.left = (rect.width / 2) + 'px';
        ripple.style.top = (rect.height / 2) + 'px';
        
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 1500);
    }
    
    // Booking notification
    function showBookingNotification() {
        const notification = document.createElement('div');
        notification.style.position = 'fixed';
        notification.style.top = '100px';
        notification.style.right = '20px';
        notification.style.background = 'linear-gradient(135deg, #ffc107 0%, #ffca2c 100%)';
        notification.style.color = '#000';
        notification.style.padding = '15px 25px';
        notification.style.borderRadius = '10px';
        notification.style.boxShadow = '0 10px 30px rgba(255, 193, 7, 0.3)';
        notification.style.zIndex = '10001';
        notification.style.transform = 'translateX(400px)';
        notification.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <i class="fas fa-calendar-check" style="font-size: 1.2rem;"></i>
                <div>
                    <strong>Booking Portal</strong><br>
                    <small>Redirecting to booking page...</small>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // Mobile navbar enhancements
    navbarToggler.addEventListener('click', function() {
        createTogglerEffect(this);
    });
    
    function createTogglerEffect(element) {
        const effect = document.createElement('div');
        effect.style.position = 'absolute';
        effect.style.width = '60px';
        effect.style.height = '60px';
        effect.style.background = 'radial-gradient(circle, rgba(255, 193, 7, 0.3) 0%, transparent 70%)';
        effect.style.borderRadius = '50%';
        effect.style.transform = 'translate(-50%, -50%)';
        effect.style.pointerEvents = 'none';
        effect.style.animation = 'togglerEffect 0.6s ease-out forwards';
        
        const rect = element.getBoundingClientRect();
        effect.style.left = (rect.width / 2) + 'px';
        effect.style.top = (rect.height / 2) + 'px';
        
        element.appendChild(effect);
        
        setTimeout(() => effect.remove(), 600);
    }
    
    // Add CSS animations dynamically
    const navbarStyle = document.createElement('style');
    navbarStyle.textContent = `
        @keyframes crownSparkle {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) scale(20);
                opacity: 0;
            }
        }
        
        @keyframes navRipple {
            0% {
                width: 20px;
                height: 20px;
                opacity: 0.3;
            }
            100% {
                width: 100px;
                height: 100px;
                opacity: 0;
            }
        }
        
        @keyframes buttonGlow {
            0% {
                opacity: 0;
                transform: scale(0.8);
            }
            50% {
                opacity: 1;
                transform: scale(1.1);
            }
            100% {
                opacity: 0;
                transform: scale(1.2);
            }
        }
        
        @keyframes bookingRipple {
            0% {
                width: 40px;
                height: 40px;
                opacity: 0.5;
            }
            100% {
                width: 200px;
                height: 200px;
                opacity: 0;
            }
        }
        
        @keyframes togglerEffect {
            0% {
                width: 60px;
                height: 60px;
                opacity: 0.3;
            }
            100% {
                width: 120px;
                height: 120px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(navbarStyle);
    
    // Form submissions
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Enhanced Booking Form Handler
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(bookingForm);
            const bookingData = {
                departureDate: formData.get('departureDate') || bookingForm.querySelector('input[type="date"]').value,
                adults: formData.get('adults') || bookingForm.querySelector('input[placeholder="Adults"]').value,
                children: formData.get('children') || bookingForm.querySelector('input[placeholder="Children"]').value,
                roomType: formData.get('roomType') || bookingForm.querySelector('select').value,
                specialRequests: formData.get('specialRequests') || bookingForm.querySelectorAll('select')[1].value
            };
            
            // Validate form
            if (!validateBookingForm(bookingData)) {
                return;
            }
            
            // Show booking notification
            showBookingConfirmation(bookingData);
            
            // Reset form
            bookingForm.reset();
            
            // Add booking ripple effect
            createBookingRipple(e.target.querySelector('.btn-book-now'));
        });
    }
    
    // Booking form validation
    function validateBookingForm(data) {
        if (!data.departureDate) {
            showNotification('Please select a departure date', 'error');
            return false;
        }
        if (!data.adults || data.adults < 1) {
            showNotification('Please select at least 1 adult', 'error');
            return false;
        }
        if (!data.roomType) {
            showNotification('Please select a room type', 'error');
            return false;
        }
        return true;
    }
    
    // Enhanced booking confirmation
    function showBookingConfirmation(data) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
            color: white;
            padding: 20px 25px;
            border-radius: 15px;
            box-shadow: 0 15px 40px rgba(40, 167, 69, 0.3);
            z-index: 10001;
            max-width: 350px;
            transform: translateX(400px);
            transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        `;
        
        notification.innerHTML = `
            <div style="display: flex; align-items: flex-start; gap: 15px;">
                <div style="background: rgba(255, 255, 255, 0.2); padding: 10px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                    <i class="fas fa-check-circle" style="font-size: 1.5rem;"></i>
                </div>
                <div style="flex: 1;">
                    <h4 style="margin: 0 0 10px 0; font-size: 1.1rem; font-weight: 700;">Booking Confirmed!</h4>
                    <p style="margin: 0 0 15px 0; font-size: 0.9rem; line-height: 1.4;">
                        Your room reservation has been received. We'll send confirmation details shortly.
                    </p>
                    <div style="background: rgba(255, 255, 255, 0.1); padding: 10px; border-radius: 8px; font-size: 0.85rem;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                            <span>Room Type:</span>
                            <strong>${data.roomType || 'Standard'}</strong>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                            <span>Guests:</span>
                            <strong>${data.adults} Adults${data.children > 0 ? ', ' + data.children + ' Children' : ''}</strong>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span>Date:</span>
                            <strong>${new Date(data.departureDate).toLocaleDateString()}</strong>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 500);
        }, 5000);
    }
    
    // General notification function
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        const colors = {
            success: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
            error: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
            info: 'linear-gradient(135deg, #17a2b8 0%, #138496 100%)'
        };
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${colors[type]};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            z-index: 10001;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'info-circle'}" style="font-size: 1.2rem;"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
            
            // Navigation links advanced hover effects
            navLinks.forEach(link => {
                link.addEventListener('mouseenter', function() {
                    createNavRipple(this);
                });
                
                link.addEventListener('click', function(e) {
                    // Add active state
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Smooth scroll to section if it's an anchor link
                    const href = this.getAttribute('href');
                    if (href && href.startsWith('#')) {
                        e.preventDefault();
                        const target = document.querySelector(href);
                        if (target) {
                            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                            window.scrollTo({
                                top: offsetTop,
                                behavior: 'smooth'
                            });
                        }
                    }
                });
            });
            
            // Book Now button advanced effects
            bookButton.addEventListener('mouseenter', function() {
                createButtonGlow(this);
            });
            
            bookButton.addEventListener('click', function(e) {
                e.preventDefault();
                createBookingRipple(this);
                showBookingNotification();
            });
            
            // Crown sparkle effect
            function createCrownSparkle(element) {
                const crown = element.querySelector('i');
                const sparkle = document.createElement('div');
                sparkle.style.position = 'absolute';
                sparkle.style.width = '4px';
                sparkle.style.height = '4px';
                sparkle.style.background = '#ffc107';
                sparkle.style.borderRadius = '50%';
                sparkle.style.pointerEvents = 'none';
                sparkle.style.animation = 'crownSparkle 1s ease-out forwards';
                
                const rect = crown.getBoundingClientRect();
                sparkle.style.left = (rect.left + rect.width / 2) + 'px';
                sparkle.style.top = (rect.top + rect.height / 2) + 'px';
                
                document.body.appendChild(sparkle);
                
                setTimeout(() => sparkle.remove(), 1000);
            }
            
            // Navigation ripple effect
            function createNavRipple(element) {
                const ripple = document.createElement('div');
                ripple.style.position = 'absolute';
                ripple.style.width = '20px';
                ripple.style.height = '20px';
                ripple.style.background = 'rgba(255, 193, 7, 0.3)';
                ripple.style.borderRadius = '50%';
                ripple.style.transform = 'translate(-50%, -50%)';
                ripple.style.pointerEvents = 'none';
                ripple.style.animation = 'navRipple 0.6s ease-out forwards';
                
                const rect = element.getBoundingClientRect();
                ripple.style.left = (rect.width / 2) + 'px';
                ripple.style.top = (rect.height / 2) + 'px';
                
                element.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            }
            
            // Button glow effect
            function createButtonGlow(element) {
                const glow = document.createElement('div');
                glow.style.position = 'absolute';
                glow.style.top = '0';
                glow.style.left = '0';
                glow.style.right = '0';
                glow.style.bottom = '0';
                glow.style.background = 'radial-gradient(circle, rgba(255, 193, 7, 0.4) 0%, transparent 70%)';
                glow.style.borderRadius = '50px';
                glow.style.pointerEvents = 'none';
                glow.style.animation = 'buttonGlow 1s ease-out forwards';
                
                element.appendChild(glow);
                
                setTimeout(() => glow.remove(), 1000);
            }
            
            // Booking ripple effect
            function createBookingRipple(element) {
                const ripple = document.createElement('div');
                ripple.style.position = 'absolute';
                ripple.style.width = '40px';
                ripple.style.height = '40px';
                ripple.style.background = 'rgba(255, 193, 7, 0.5)';
                ripple.style.borderRadius = '50%';
                ripple.style.transform = 'translate(-50%, -50%)';
                ripple.style.pointerEvents = 'none';
                ripple.style.animation = 'bookingRipple 1.5s ease-out forwards';
                
                const rect = element.getBoundingClientRect();
                ripple.style.left = (rect.width / 2) + 'px';
                ripple.style.top = (rect.height / 2) + 'px';
                
                element.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 1500);
            }
            
            // Booking notification
            function showBookingNotification() {
                const notification = document.createElement('div');
                notification.style.position = 'fixed';
                notification.style.top = '100px';
                notification.style.right = '20px';
                notification.style.background = 'linear-gradient(135deg, #ffc107 0%, #ffca2c 100%)';
                notification.style.color = '#000';
                notification.style.padding = '15px 25px';
                notification.style.borderRadius = '10px';
                notification.style.boxShadow = '0 10px 30px rgba(255, 193, 7, 0.3)';
                notification.style.zIndex = '10001';
                notification.style.transform = 'translateX(400px)';
                notification.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                notification.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <i class="fas fa-calendar-check" style="font-size: 1.2rem;"></i>
                        <div>
                            <strong>Booking Portal</strong><br>
                            <small>Redirecting to booking page...</small>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.style.transform = 'translateX(0)';
                }, 10);
                
                setTimeout(() => {
                    notification.style.transform = 'translateX(400px)';
                    setTimeout(() => notification.remove(), 300);
                }, 3000);
            }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (email) {
                alert(`Thank you for subscribing with email: ${email}\nYou'll receive our exclusive offers and updates soon!`);
                this.reset();
            }
        });
    }
    
    // Add CSS animations dynamically
    const navbarStyle = document.createElement('style');
    navbarStyle.textContent = `
        @keyframes crownSparkle {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) scale(20);
                opacity: 0;
            }
        }
        
        @keyframes navRipple {
            0% {
                width: 20px;
                height: 20px;
                opacity: 0.3;
            }
            100% {
                width: 100px;
                height: 100px;
                opacity: 0;
            }
        }
        
        @keyframes buttonGlow {
            0% {
                opacity: 0;
                transform: scale(0.8);
            }
            50% {
                opacity: 1;
                transform: scale(1.1);
            }
            100% {
                opacity: 0;
                transform: scale(1.2);
            }
        }
        
        @keyframes bookingRipple {
            0% {
                width: 40px;
                height: 40px;
                opacity: 0.5;
            }
            100% {
                width: 200px;
                height: 200px;
                opacity: 0;
            }
        }
        
        @keyframes togglerEffect {
            0% {
                width: 60px;
                height: 60px;
                opacity: 0.3;
            }
            100% {
                width: 120px;
                height: 120px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(navbarStyle);
    
    // Scroll-triggered animations using Intersection Observer API
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    element.classList.add('animated');
                    
                    // Add staggered animations for child elements
                    const staggerElements = element.querySelectorAll('.scroll-animate');
                    staggerElements.forEach((el, index) => {
                        setTimeout(() => {
                            el.classList.add('animated');
                        }, index * 100);
                    });
                    
                    animationObserver.unobserve(element);
                }
            });
        }, observerOptions);
        
        // Get all sections
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.classList.add('section-animate');
            animationObserver.observe(section);
        });
        
        // Get individual elements with specific animation classes
        const elementsToAnimate = document.querySelectorAll(
            '.hero-text, .main-title, .description, .btn-yellow, ' +
            '.booking-title, .booking-form, .card, .facility-card, ' +
            '.about-title, .about-subtitle, .about-content, .about-image-wrapper, ' +
            '.testimonial-card, .post-item, .footer-logo, .footer-contact, ' +
            '.footer-links, .newsletter-form, .social-icons'
        );
        
        elementsToAnimate.forEach((element, index) => {
            // Add appropriate animation class based on element type
            if (element.classList.contains('hero-text') || element.classList.contains('main-title')) {
                element.classList.add('hero-animate');
            } else if (element.classList.contains('card') || element.classList.contains('facility-card')) {
                element.classList.add('card-animate');
            } else if (element.classList.contains('testimonial-card')) {
                element.classList.add('testimonial-animate');
            } else if (element.classList.contains('post-item')) {
                element.classList.add('card-animate');
            } else if (element.querySelector('img') && !element.classList.contains('card')) {
                element.classList.add('image-animate');
            } else if (element.classList.contains('btn-yellow') || element.classList.contains('btn-book-now')) {
                element.classList.add('button-animate');
            } else if (element.classList.contains('about-title') || element.classList.contains('about-subtitle')) {
                element.classList.add('text-animate');
            } else if (element.classList.contains('footer-logo') || element.classList.contains('footer-contact')) {
                element.classList.add('footer-animate');
            } else {
                element.classList.add('scroll-animate');
            }
            
            // Add stagger delay
            element.classList.add(`stagger-${(index % 5) + 1}`);
            animationObserver.observe(element);
        });
        
        // Special animations for specific sections
        const hotelSection = document.querySelector('.hotel-sec');
        if (hotelSection) {
            const roomCards = hotelSection.querySelectorAll('.card');
            roomCards.forEach((card, index) => {
                card.classList.add('card-animate', `stagger-${index + 1}`);
                animationObserver.observe(card);
            });
        }
        
        const facilitiesSection = document.querySelector('.facilities-section');
        if (facilitiesSection) {
            const facilityCards = facilitiesSection.querySelectorAll('.facility-card');
            facilityCards.forEach((card, index) => {
                card.classList.add('feature-animate', `stagger-${index + 1}`);
                animationObserver.observe(card);
            });
        }
        
        const aboutSection = document.querySelector('.about-section');
        if (aboutSection) {
            const aboutElements = aboutSection.querySelectorAll('.about-content, .about-image-wrapper');
            aboutElements.forEach((element, index) => {
                element.classList.add('scroll-animate', index === 0 ? 'slide-left' : 'slide-right', `stagger-${index + 1}`);
                animationObserver.observe(element);
            });
        }
        
        const testimonialSection = document.querySelector('.testimonial-sec');
        if (testimonialSection) {
            const testimonialCards = testimonialSection.querySelectorAll('.testimonial-card');
            testimonialCards.forEach((card, index) => {
                card.classList.add('testimonial-animate', `stagger-${index + 1}`);
                animationObserver.observe(card);
            });
        }
        
        const blogSection = document.querySelector('.blog-sec');
        if (blogSection) {
            const blogPosts = blogSection.querySelectorAll('.post-item');
            blogPosts.forEach((post, index) => {
                post.classList.add('card-animate', `stagger-${index + 1}`);
                animationObserver.observe(post);
            });
        }
        
        const footerSection = document.querySelector('.sec-footer');
        if (footerSection) {
            const footerElements = footerSection.querySelectorAll('.footer-logo, .footer-contact, .footer-links, .newsletter-form, .social-icons');
            footerElements.forEach((element, index) => {
                element.classList.add('footer-animate', `stagger-${index + 1}`);
                animationObserver.observe(element);
            });
        }
    }
    
    // Add parallax effect to hero section
    function initParallaxEffect() {
        const heroSection = document.querySelector('.header-home');
        if (heroSection) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const parallax = heroSection.querySelector('.hero-content');
                if (parallax) {
                    const speed = 0.5;
                    parallax.style.transform = `translateY(${scrolled * speed}px)`;
                }
            });
        }
    }
    
    // Add progress bar animation
    function initProgressBarAnimation() {
        const progressBars = document.querySelectorAll('.progress-bar');
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const targetWidth = progressBar.style.width || '0%';
                    progressBar.style.width = '0%';
                    setTimeout(() => {
                        progressBar.style.width = targetWidth;
                    }, 200);
                    progressObserver.unobserve(progressBar);
                }
            });
        }, { threshold: 0.5 });
        
        progressBars.forEach(bar => progressObserver.observe(bar));
    }
    
    // Add counter animation
    function initCounterAnimation() {
        const counters = document.querySelectorAll('.stat-number');
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
                    let current = 0;
                    const increment = target / 100;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            counter.textContent = target.toLocaleString();
                            clearInterval(timer);
                        } else {
                            counter.textContent = Math.floor(current).toLocaleString();
                        }
                    }, 20);
                    counterObserver.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => counterObserver.observe(counter));
    }
    
    // Initialize all animations
    initScrollAnimations();
    initParallaxEffect();
    initProgressBarAnimation();
    initCounterAnimation();
    
    // Intersection Observer automatically handles resize events
});
    document.addEventListener('DOMContentLoaded', function() {
        // Accommodation Section Interactive Effects
document.addEventListener('DOMContentLoaded', function() {
    // Room cards advanced interactions
    const roomCards = document.querySelectorAll('.hotel-sec .card');
    
    roomCards.forEach((card, index) => {
        // Add entrance animation with stagger
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
        
        // Enhanced hover interactions
        card.addEventListener('mouseenter', function() {
            // Add shimmer effect
            createShimmerEffect(this);
            
            // Animate room features
            const features = this.querySelectorAll('.room-features span');
            features.forEach((feature, i) => {
                setTimeout(() => {
                    feature.style.transform = 'translateY(-3px) scale(1.05)';
                    setTimeout(() => {
                        feature.style.transform = 'translateY(-2px) scale(1)';
                    }, 200);
                }, i * 50);
            });
            
            // Add glow effect
            this.style.boxShadow = '0 25px 60px rgba(255, 193, 7, 0.3), 0 0 40px rgba(255, 193, 7, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            // Remove glow effect
            this.style.boxShadow = '';
            
            // Reset features
            const features = this.querySelectorAll('.room-features span');
            features.forEach(feature => {
                feature.style.transform = '';
            });
        });
        
        // Click interaction for booking
        const bookButton = card.querySelector('.img-card a');
        if (bookButton) {
            bookButton.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Create ripple effect
                createRippleEffect(card);
                
                // Get room info
                const roomTitle = card.querySelector('.room-title').textContent;
                const roomPrice = card.querySelector('p sup').textContent + card.querySelector('p span').textContent;
                
                // Show booking modal or alert
                showBookingModal(roomTitle, roomPrice);
            });
        }
    });
    
    // Shimmer effect function
    function createShimmerEffect(element) {
        const shimmer = document.createElement('div');
        shimmer.style.position = 'absolute';
        shimmer.style.top = '0';
        shimmer.style.left = '-100%';
        shimmer.style.width = '100%';
        shimmer.style.height = '100%';
        shimmer.style.background = 'linear-gradient(90deg, transparent, rgba(255, 193, 7, 0.3), transparent)';
        shimmer.style.transform = 'skewX(-20deg)';
        shimmer.style.pointerEvents = 'none';
        shimmer.style.animation = 'shimmerSlide 1s ease-out forwards';
        shimmer.style.zIndex = '1';
        
        element.appendChild(shimmer);
        
        setTimeout(() => {
            shimmer.remove();
        }, 1000);
    }
    
    // Ripple effect function
    function createRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.width = '30px';
        ripple.style.height = '30px';
        ripple.style.background = 'rgba(255, 193, 7, 0.5)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'rippleExpand 1.5s ease-out forwards';
        
        const rect = element.getBoundingClientRect();
        ripple.style.left = (rect.width / 2) + 'px';
        ripple.style.top = (rect.height / 2) + 'px';
        ripple.style.zIndex = '1000';
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 1500);
    }
    
    // Booking modal function
    function showBookingModal(roomTitle, roomPrice) {
        // Create modal overlay
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.right = '0';
        modal.style.bottom = '0';
        modal.style.background = 'rgba(0, 0, 0, 0.8)';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.zIndex = '10000';
        modal.style.opacity = '0';
        modal.style.transition = 'opacity 0.3s ease';
        
        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.style.background = '#fff';
        modalContent.style.padding = '40px';
        modalContent.style.borderRadius = '20px';
        modalContent.style.maxWidth = '500px';
        modalContent.style.width = '90%';
        modalContent.style.textAlign = 'center';
        modalContent.style.transform = 'scale(0.8)';
        modalContent.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        
        modalContent.innerHTML = `
            <div style="margin-bottom: 20px;">
                <i class="fas fa-calendar-check" style="font-size: 3rem; color: #ffc107; margin-bottom: 20px; display: block;"></i>
                <h2 style="color: #333; margin-bottom: 10px;">Booking Request</h2>
                <p style="color: #666; margin-bottom: 20px;">You're about to book: <strong>${roomTitle}</strong></p>
                <p style="color: #333; font-size: 1.5rem; font-weight: 700; margin-bottom: 30px;">${roomPrice}<small style="font-size: 0.8rem; font-weight: 400;">/night</small></p>
            </div>
            <div style="display: flex; gap: 15px; justify-content: center;">
                <button id="confirmBooking" style="background: linear-gradient(135deg, #ffc107 0%, #ffca2c 100%); color: #000; border: none; padding: 12px 30px; border-radius: 30px; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">Confirm Booking</button>
                <button id="cancelBooking" style="background: #e9ecef; color: #666; border: none; padding: 12px 30px; border-radius: 30px; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">Cancel</button>
            </div>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Animate modal in
        setTimeout(() => {
            modal.style.opacity = '1';
            modalContent.style.transform = 'scale(1)';
        }, 10);
        
        // Handle confirm booking
        document.getElementById('confirmBooking').addEventListener('click', function() {
            modal.style.opacity = '0';
            modalContent.style.transform = 'scale(0.8)';
            setTimeout(() => {
                modal.remove();
                showSuccessMessage(roomTitle);
            }, 300);
        });
        
        // Handle cancel booking
        document.getElementById('cancelBooking').addEventListener('click', function() {
            modal.style.opacity = '0';
            modalContent.style.transform = 'scale(0.8)';
            setTimeout(() => {
                modal.remove();
            }, 300);
        });
        
        // Close on overlay click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.opacity = '0';
                modalContent.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    modal.remove();
                }, 300);
            }
        });
    }
    
    // Success message function
    function showSuccessMessage(roomTitle) {
        const message = document.createElement('div');
        message.style.position = 'fixed';
        message.style.top = '20px';
        message.style.right = '20px';
        message.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
        message.style.color = '#fff';
        message.style.padding = '15px 25px';
        message.style.borderRadius = '10px';
        message.style.boxShadow = '0 10px 30px rgba(40, 167, 69, 0.3)';
        message.style.zIndex = '10001';
        message.style.transform = 'translateX(400px)';
        message.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        message.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <i class="fas fa-check-circle" style="font-size: 1.2rem;"></i>
                <div>
                    <strong>Booking Confirmed!</strong><br>
                    <small>${roomTitle} - We'll contact you soon</small>
                </div>
            </div>
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.style.transform = 'translateX(0)';
        }, 10);
        
        setTimeout(() => {
            message.style.transform = 'translateX(400px)';
            setTimeout(() => {
                message.remove();
            }, 300);
        }, 4000);
    }
    
    // Add CSS animations dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shimmerSlide {
            0% { left: -100%; }
            100% { left: 100%; }
        }
        
        @keyframes rippleExpand {
            0% {
                width: 30px;
                height: 30px;
                opacity: 0.5;
            }
            100% {
                width: 400px;
                height: 400px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Scroll-triggered animations for accommodation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const accommodationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInScale 0.8s ease-out forwards';
                accommodationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    roomCards.forEach(card => {
        accommodationObserver.observe(card);
    });
    
    // Initialize Swiper with advanced configuration
    const swiper = new Swiper('.testimonialSwiper', {
            // Core settings
            slidesPerView: 3,
            spaceBetween: 40,
            centeredSlides: true,
            loop: true,
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },
            
            // Advanced effects
            effect: 'creative',
            creativeEffect: {
                prev: {
                    shadow: true,
                    translate: [0, 0, -400],
                    rotate: [0, 0, -15],
                    opacity: 0
                },
                next: {
                    shadow: true,
                    translate: [0, 0, -400],
                    rotate: [0, 0, 15],
                    opacity: 0
                }
            },
            
            // Speed and easing
            speed: 1000,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            
            // Navigation
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
                clickable: true
            },
            
            // Pagination
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
                dynamicMainBullets: 3,
                renderBullet: function (index, className) {
                    return '<span class="' + className + '">' + (index + 1) + '</span>';
                }
            },
            
            // Keyboard and mouse
            keyboard: {
                enabled: true,
                onlyInViewport: true
            },
            mousewheel: {
                invert: false,
                forceToAxis: true
            },
            
            // Touch settings
            touch: {
                touchAngle: 45,
                touchRatio: 1,
                touchEventsTarget: 'container'
            },
            
            // Responsive breakpoints
            breakpoints: {
                640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                    centeredSlides: true
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                    centeredSlides: true
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                    centeredSlides: true
                }
            },
            
            // Events
            on: {
                init: function () {
                    console.log('Swiper initialized with advanced effects');
                    addCustomEffects();
                    updateProgressBar();
                },
                slideChange: function () {
                    updateProgressBar();
                    animateSlideElements();
                    createSlideParticles();
                },
                touchStart: function () {
                    this.autoplay.stop();
                },
                touchEnd: function () {
                    this.autoplay.start();
                }
            }
        });
        
        // Custom effects for enterprise-level experience
        function addCustomEffects() {
            // Add hover effects to navigation buttons
            const navButtons = document.querySelectorAll('.swiper-button-next, .swiper-button-prev');
            navButtons.forEach(btn => {
                btn.addEventListener('mouseenter', function() {
                    this.style.transform = 'scale(1.1) rotate(5deg)';
                    this.style.boxShadow = '0 10px 30px rgba(255, 193, 7, 0.4)';
                });
                
                btn.addEventListener('mouseleave', function() {
                    this.style.transform = 'scale(1) rotate(0deg)';
                    this.style.boxShadow = '';
                });
                
                // Add ripple effect
                btn.addEventListener('click', function(e) {
                    createButtonRipple(this, e);
                });
            });
            
            // Add 3D tilt to active slide
            const swiperContainer = document.querySelector('.testimonialSwiper');
            swiperContainer.addEventListener('mousemove', function(e) {
                const activeSlide = swiper.slides[swiper.activeIndex];
                const rect = activeSlide.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 25;
                const rotateY = (centerX - x) / 25;
                
                activeSlide.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });
            
            swiperContainer.addEventListener('mouseleave', function() {
                const activeSlide = swiper.slides[swiper.activeIndex];
                activeSlide.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
            });
        }
        
        function updateProgressBar() {
            const progressBar = document.getElementById('progressBar');
            if (progressBar) {
                const progress = ((swiper.activeIndex % 4) + 1) / 4 * 100;
                progressBar.style.width = `${progress}%`;
                
                // Add pulse effect
                progressBar.style.boxShadow = '0 0 10px rgba(255, 193, 7, 0.5)';
                setTimeout(() => {
                    progressBar.style.boxShadow = 'none';
                }, 300);
            }
        }
        
        function animateSlideElements() {
            const activeSlide = swiper.slides[swiper.activeIndex];
            const elements = activeSlide.querySelectorAll('.testimonial-text, .testimonial-rating, .testimonial-author');
            
            elements.forEach((el, index) => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    el.style.transition = 'all 0.5s ease';
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
        
        function createSlideParticles() {
            const swiperContainer = document.querySelector('.testimonialSwiper');
            const colors = ['#ffc107', '#ffca2c', '#fff'];
            const particleCount = 6;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.style.position = 'absolute';
                particle.style.width = '4px';
                particle.style.height = '4px';
                particle.style.borderRadius = '50%';
                particle.style.background = colors[Math.floor(Math.random() * colors.length)];
                particle.style.pointerEvents = 'none';
                particle.style.zIndex = '1000';
                particle.style.left = '50%';
                particle.style.top = '50%';
                
                swiperContainer.appendChild(particle);
                
                const angle = (Math.PI * 2 * i) / particleCount;
                const velocity = 60 + Math.random() * 40;
                const lifetime = 1200 + Math.random() * 800;
                
                particle.style.animation = `particle ${lifetime}ms ease-out forwards`;
                particle.style.setProperty('--tx', Math.cos(angle) * velocity + 'px');
                particle.style.setProperty('--ty', Math.sin(angle) * velocity + 'px');
                
                setTimeout(() => particle.remove(), lifetime);
            }
        }
        
        function createButtonRipple(button, event) {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (event.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (event.clientY - rect.top - size / 2) + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple-animation 0.6s ease-out';
            ripple.style.pointerEvents = 'none';
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        }
        
        // Add custom CSS for advanced effects
        const customStyles = document.createElement('style');
        customStyles.textContent = `
            .swiper-button-next,
            .swiper-button-prev {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: linear-gradient(135deg, #ffc107 0%, #ffca2c 100%);
                border: none;
                color: #000;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: 0 5px 20px rgba(255, 193, 7, 0.3);
                margin-top: -25px;
            }
            
            .swiper-button-next:hover,
            .swiper-button-prev:hover {
                transform: scale(1.1) rotate(5deg);
                box-shadow: 0 10px 30px rgba(255, 193, 7, 0.4);
            }
            
            .swiper-button-next:after,
            .swiper-button-prev:after {
                font-size: 1.2rem;
                font-weight: bold;
            }
            
            .swiper-pagination-bullet {
                width: 12px;
                height: 12px;
                background: #e9ecef;
                opacity: 1;
                transition: all 0.3s ease;
            }
            
            .swiper-pagination-bullet-active {
                background: #ffc107;
                transform: scale(1.3);
            }
            
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            @keyframes particle {
                to {
                    transform: translate(var(--tx), var(--ty)) scale(0);
                    opacity: 0;
                }
            }
            
            .testimonial-progress {
                height: 4px;
                background: #e9ecef;
                border-radius: 2px;
                margin: 30px 0 20px;
                overflow: hidden;
                position: relative;
            }
            
            .progress-bar {
                height: 100%;
                background: linear-gradient(90deg, #ffc107, #ffca2c);
                border-radius: 2px;
                transition: width 0.3s ease;
                position: relative;
                overflow: hidden;
            }
            
            .progress-bar::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
                animation: progressShine 2s linear infinite;
            }
            
            @keyframes progressShine {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
            }
        `;
        document.head.appendChild(customStyles);
    }
    
    // Premium Carousel Functions with Advanced Effects
    function updateCarousel(direction = 'next') {
        if (isAnimating || testimonialCards.length === 0) return;
        isAnimating = true;
        
        // Add advanced transition class
        testimonialTrack.classList.add('transitioning');
        
        // Calculate offset with smooth easing
        const offset = -currentIndex * 100;
        testimonialTrack.style.transform = `translateX(${offset}%)`;
        
        // Update active card with advanced effects
        testimonialCards.forEach((card, index) => {
            const isActive = index === currentIndex;
            
            // Add/remove active class with staggered animation
            setTimeout(() => {
                card.classList.toggle('active', isActive);
                
                if (isActive) {
                    // Add entrance animation for active card
                    card.style.animation = 'cardEntrance 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                    
                    // Animate inner elements
                    const elements = card.querySelectorAll('.testimonial-text, .testimonial-rating, .testimonial-author');
                    elements.forEach((el, i) => {
                        el.style.opacity = '0';
                        el.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            el.style.transition = 'all 0.5s ease';
                            el.style.opacity = '1';
                            el.style.transform = 'translateY(0)';
                        }, i * 100);
                    });
                } else {
                    // Reset animation for inactive cards
                    card.style.animation = '';
                }
            }, index * 50);
        });
        
        // Update dots with ripple effect
        const dots = testimonialDots.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            const wasActive = dot.classList.contains('active');
            const isActive = index === currentIndex;
            
            if (isActive && !wasActive) {
                // Create ripple effect on dot
                createDotRipple(dot);
            }
            
            dot.classList.toggle('active', isActive);
        });
        
        // Update progress bar with smooth animation
        const progressWidth = ((currentIndex + 1) / testimonialCards.length) * 100;
        progressBar.style.width = `${progressWidth}%`;
        
        // Add particle effects
        createCarouselParticles();
        
        // Reset animation flag
        setTimeout(() => {
            isAnimating = false;
            testimonialTrack.classList.remove('transitioning');
        }, 1000);
        
        // Restart progress animation
        resetProgressAnimation();
    }
    
    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonialCards.length;
        updateCarousel('next');
    }
    
    function prevTestimonial() {
        currentIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
        updateCarousel('prev');
    }
    
    function goToTestimonial(index) {
        if (index === currentIndex) return;
        currentIndex = index;
        updateCarousel('direct');
    }
    
    // Advanced Auto-play with visual feedback
    function startAutoPlay() {
        stopAutoPlay();
        autoPlayInterval = setInterval(() => {
            // Add visual indicator before auto-play
            testimonialTrack.classList.add('auto-playing');
            setTimeout(() => {
                nextTestimonial();
                testimonialTrack.classList.remove('auto-playing');
            }, 300);
        }, 6000);
        startProgressAnimation();
    }
    
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
        if (progressInterval) {
            clearInterval(progressInterval);
        }
        testimonialTrack.classList.remove('auto-playing');
    }
    
    function startProgressAnimation() {
        let progress = 0;
        const increment = 100 / 60; // 60 steps for 6 seconds
        
        progressInterval = setInterval(() => {
            progress += increment;
            if (progress >= 100) {
                progress = 0;
            }
            progressBar.style.width = `${progress}%`;
            
            // Add pulse effect at certain intervals
            if (progress % 25 === 0) {
                progressBar.style.boxShadow = '0 0 10px rgba(255, 193, 7, 0.5)';
                setTimeout(() => {
                    progressBar.style.boxShadow = 'none';
                }, 200);
            }
        }, 100);
    }
    
    function resetProgressAnimation() {
        progressBar.style.transition = 'none';
        progressBar.style.width = '0%';
        setTimeout(() => {
            progressBar.style.transition = 'width 6s cubic-bezier(0.4, 0, 0.2, 1)';
            startProgressAnimation();
        }, 50);
    }
    
    // Enhanced Event Listeners with Advanced Effects
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (isAnimating) return;
            
            // Add button animation
            prevBtn.style.transform = 'scale(0.9)';
            setTimeout(() => {
                prevBtn.style.transform = 'scale(1)';
            }, 200);
            
            // Create ripple effect
            createButtonRipple(prevBtn, e);
            
            stopAutoPlay();
            prevTestimonial();
            startAutoPlay();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (isAnimating) return;
            
            // Add button animation
            nextBtn.style.transform = 'scale(0.9)';
            setTimeout(() => {
                nextBtn.style.transform = 'scale(1)';
            }, 200);
            
            // Create ripple effect
            createButtonRipple(nextBtn, e);
            
            stopAutoPlay();
            nextTestimonial();
            startAutoPlay();
        });
    }
    
    // Dot navigation
    const dots = testimonialDots.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoPlay();
            goToTestimonial(index);
            startAutoPlay();
        });
    });
    
    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    testimonialTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoPlay();
    });
    
    testimonialTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoPlay();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextTestimonial();
            } else {
                prevTestimonial();
            }
        }
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            stopAutoPlay();
            prevTestimonial();
            startAutoPlay();
        } else if (e.key === 'ArrowRight') {
            stopAutoPlay();
            nextTestimonial();
            startAutoPlay();
        }
    });
    
    // Pause on hover
    testimonialTrack.addEventListener('mouseenter', stopAutoPlay);
    testimonialTrack.addEventListener('mouseleave', startAutoPlay);
    
    // Advanced hover effects
    testimonialCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-10px) scale(1.02) rotateX(2deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0) scale(0.9)';
            }
        });
        
        // 3D tilt effect
        card.addEventListener('mousemove', function(e) {
            if (this.classList.contains('active')) return;
            
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 25;
            const rotateY = (centerX - x) / 25;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(0.9)';
            }
        });
    });
    
    // Add ripple effect to navigation buttons
    function createRipple(button, e) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    prevBtn.addEventListener('click', function(e) {
        createRipple(this, e);
    });
    
    nextBtn.addEventListener('click', function(e) {
        createRipple(this, e);
    });
    
    // Advanced Effect Functions
    function createButtonRipple(button, event) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (event.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (event.clientY - rect.top - size / 2) + 'px';
        ripple.className = 'ripple';
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    function createDotRipple(dot) {
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.width = '30px';
        ripple.style.height = '30px';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 193, 7, 0.3)';
        ripple.style.transform = 'translate(-50%, -50%) scale(0)';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'dotRipple 0.6s ease-out';
        
        dot.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    function createCarouselParticles() {
        const carousel = document.querySelector('.testimonial-carousel');
        const colors = ['#ffc107', '#ffca2c', '#fff'];
        const particleCount = 8;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '6px';
            particle.style.height = '6px';
            particle.style.borderRadius = '50%';
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '1000';
            particle.style.left = '50%';
            particle.style.top = '50%';
            
            carousel.appendChild(particle);
            
            const angle = (Math.PI * 2 * i) / particleCount;
            const velocity = 80 + Math.random() * 60;
            const lifetime = 1500 + Math.random() * 1000;
            
            particle.style.animation = `particle ${lifetime}ms ease-out forwards`;
            particle.style.setProperty('--tx', Math.cos(angle) * velocity + 'px');
            particle.style.setProperty('--ty', Math.sin(angle) * velocity + 'px');
            
            setTimeout(() => particle.remove(), lifetime);
        }
    }
    
    // Add Advanced CSS Animations
    const advancedStyles = document.createElement('style');
    advancedStyles.textContent = `
        .nav-btn {
            position: relative;
            overflow: hidden;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .nav-btn:hover {
            transform: scale(1.1) rotate(5deg);
            box-shadow: 0 10px 30px rgba(255, 193, 7, 0.4);
        }
        
        .nav-btn:active {
            transform: scale(0.95);
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes dotRipple {
            to {
                transform: translate(-50%, -50%) scale(3);
                opacity: 0;
            }
        }
        
        @keyframes particle {
            to {
                transform: translate(var(--tx), var(--ty)) scale(0);
                opacity: 0;
            }
        }
        
        @keyframes cardEntrance {
            from {
                opacity: 0;
                transform: translateY(30px) scale(0.9);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        .testimonial-track.transitioning {
            transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .testimonial-track.auto-playing {
            animation: pulse 0.3s ease-in-out;
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.01); }
        }
        
        .testimonial-card.active {
            animation: cardGlow 2s ease-in-out infinite;
        }
        
        @keyframes cardGlow {
            0%, 100% { box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1); }
            50% { box-shadow: 0 15px 50px rgba(255, 193, 7, 0.2); }
        }
        
        .progress-bar {
            transition: width 6s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
        }
        
        .progress-bar::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            animation: progressShine 2s linear infinite;
        }
        
        @keyframes progressShine {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        
        .dot.active {
            animation: dotPulse 1s ease-in-out infinite;
        }
        
        @keyframes dotPulse {
            0%, 100% { transform: scale(1.2); }
            50% { transform: scale(1.4); }
        }
        
        .testimonial-sec::before {
            animation: shimmer 3s ease-in-out infinite;
        }
        
        @keyframes shimmer {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }
    `;
    document.head.appendChild(advancedStyles);
    
    // Enhanced Touch/Swipe Support
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    
    if (testimonialTrack) {
        testimonialTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
            stopAutoPlay();
            
            // Add visual feedback
            testimonialTrack.style.cursor = 'grabbing';
        });
        
        testimonialTrack.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            handleSwipe();
            startAutoPlay();
            
            testimonialTrack.style.cursor = 'grab';
        });
        
        testimonialTrack.addEventListener('touchmove', (e) => {
            // Prevent default for smooth swipe
            e.preventDefault();
        });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;
        
        // Only allow horizontal swipes
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > swipeThreshold) {
            if (diffX > 0) {
                nextTestimonial();
            } else {
                prevTestimonial();
            }
        }
    }
    
    // Enhanced Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (isAnimating) return;
        
        switch(e.key) {
            case 'ArrowLeft':
                stopAutoPlay();
                prevTestimonial();
                startAutoPlay();
                break;
            case 'ArrowRight':
                stopAutoPlay();
                nextTestimonial();
                startAutoPlay();
                break;
            case 'Home':
                stopAutoPlay();
                goToTestimonial(0);
                startAutoPlay();
                break;
            case 'End':
                stopAutoPlay();
                goToTestimonial(testimonialCards.length - 1);
                startAutoPlay();
                break;
        }
    });
    
    // Advanced Hover Effects
    if (testimonialTrack) {
        testimonialTrack.addEventListener('mouseenter', () => {
            stopAutoPlay();
            testimonialTrack.style.cursor = 'grab';
        });
        
        testimonialTrack.addEventListener('mouseleave', () => {
            startAutoPlay();
            testimonialTrack.style.cursor = 'default';
        });
    }
    
    // 3D Tilt Effect for Cards
    testimonialCards.forEach((card, index) => {
        card.addEventListener('mousemove', (e) => {
            if (!card.classList.contains('active')) return;
            
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            if (card.classList.contains('active')) {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
            }
        });
    });
    
    // Initialize with advanced effects
    if (progressBar) {
        progressBar.style.transition = 'width 6s cubic-bezier(0.4, 0, 0.2, 1)';
    }
    
    // Start with entrance animation
    setTimeout(() => {
        if (testimonialCards.length > 0) {
            updateCarousel('initial');
            startAutoPlay();
        }
    }, 500);
    
    // Intersection Observer for performance
    const testimonialObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startAutoPlay();
                testimonialObserver.unobserve(entry.target);
            } else {
                stopAutoPlay();
            }
        });
    }, { threshold: 0.3 });
    
    const testimonialSection = document.querySelector('.testimonial-sec');
    if (testimonialSection) {
        testimonialObserver.observe(testimonialSection);
    }
    
    console.log('Premium testimonial carousel initialized');
    
    // Intersection Observer for scroll animations
    const testimonialObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startAutoPlay();
                testimonialObserver.unobserve(entry.target);
            } else {
                stopAutoPlay();
            }
        });
    }, { threshold: 0.5 });
    
    testimonialObserver.observe(document.querySelector('.testimonial-sec'));
    
    // Advanced Blog Section Interactions
    const readMoreLinks = document.querySelectorAll('.read-more');
    readMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const postTitle = this.closest('.post-item').querySelector('.post-title').innerText;
            const postCategory = this.closest('.post-item').querySelector('.post-category').innerText;
            
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.background = 'rgba(255, 193, 7, 0.5)';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.pointerEvents = 'none';
            ripple.style.animation = 'ripple 0.6s ease-out';
            
            const rect = this.getBoundingClientRect();
            ripple.style.left = (e.clientX - rect.left) + 'px';
            ripple.style.top = (e.clientY - rect.top) + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
                alert(`📖 Opening: "${postTitle}"\n\nCategory: ${postCategory}\nFull article would open in a new page or modal.`);
            }, 300);
        });
    });
    
    // Advanced hover effects for post items
    const postItems = document.querySelectorAll('.post-item');
    postItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Add glow effect
            this.style.boxShadow = '0 20px 40px rgba(255, 193, 7, 0.2)';
            
            // Animate category badge
            const category = this.querySelector('.post-category');
            if (category) {
                category.style.transform = 'scale(1.1) rotate(2deg)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            // Remove glow effect
            this.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            
            // Reset category badge
            const category = this.querySelector('.post-category');
            if (category) {
                category.style.transform = 'scale(1) rotate(0deg)';
            }
        });
        
        // Add parallax effect on mouse move
        item.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                width: 100px;
                height: 100px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                
                // Add staggered animation to children
                const children = entry.target.querySelectorAll('.post-category, .post-title, .post-excerpt, .read-more');
                children.forEach((child, index) => {
                    child.style.opacity = '0';
                    child.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        child.style.transition = 'all 0.5s ease';
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
                
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all post items
    postItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px) scale(0.95)';
        item.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        scrollObserver.observe(item);
    });
    
    // Add typing effect to section header
    const sectionHeader = document.querySelector('.section-header h3');
    if (sectionHeader) {
        const originalText = sectionHeader.innerText;
        sectionHeader.innerText = '';
        
        let charIndex = 0;
        const typeWriter = () => {
            if (charIndex < originalText.length) {
                sectionHeader.innerText += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typing when header is in view
        const headerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    headerObserver.unobserve(entry.target);
                }
            });
        });
        
        headerObserver.observe(sectionHeader);
    }
    
    // Add particle effect on hover
    postItems.forEach(item => {
        item.addEventListener('mouseenter', function(e) {
            createParticles(e, this);
        });
    });
    
    function createParticles(e, element) {
        const colors = ['#ffc107', '#ffca2c', '#fff'];
        const particleCount = 5;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '1000';
            
            const rect = element.getBoundingClientRect();
            particle.style.left = (e.clientX - rect.left) + 'px';
            particle.style.top = (e.clientY - rect.top) + 'px';
            
            element.appendChild(particle);
            
            const angle = (Math.PI * 2 * i) / particleCount;
            const velocity = 50 + Math.random() * 50;
            const lifetime = 1000 + Math.random() * 1000;
            
            particle.style.animation = `particle ${lifetime}ms ease-out forwards`;
            particle.style.setProperty('--tx', Math.cos(angle) * velocity + 'px');
            particle.style.setProperty('--ty', Math.sin(angle) * velocity + 'px');
            
            setTimeout(() => particle.remove(), lifetime);
        }
    }
    
    // Add particle animation CSS
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes particle {
            to {
                transform: translate(var(--tx), var(--ty));
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(particleStyle);
});

document.querySelectorAll('.img-card a').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const roomElement = this.closest('.card')?.querySelector('.room-title')?.innerText || 'this room';
            alert(`✨ You selected "${roomElement}".\n🛎️ Our reservation team will contact you shortly. Experience luxury!`);
        });
  });
//
    
const testimonialsData = [
        {
            id: 1,
            date: "15.03.2025",
            title: "Exceptional Strategy & Execution",
            text: "The French Revolution constituted for the conscience of the dominant aristocratic class a fall from grace, and for us — genuine voices of excellence. Their team redefined our brand perception.",
            moreLabel: "Read full story",
            image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop",
            alt: "Client meeting"
        },
        {
            id: 2,
            date: "22.04.2025",
            title: "Unmatched Creativity & Support",
            text: "Working with this agency was transformative. From UX to final delivery, they exceeded expectations. Our conversion rates soared by 48% within 3 months. Highly recommended for modern brands.",
            moreLabel: "Discover journey",
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop",
            alt: "Team collaboration"
        },
        {
            id: 3,
            date: "10.06.2025",
            title: "Radical Transparency & Results",
            text: "The French Revolution constituted for the conscience of the dominant aristocratic class a paradigm shift. We saw ROI like never before. Their dedication is second to none.",
            moreLabel: "Explore case study",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
            alt: "Business success"
        },
        {
            id: 4,
            date: "01.08.2025",
            title: "Innovative Digital Solutions",
            text: "A partnership that feels like an extension of our own team. They listen, iterate, and deliver stunning results. The platform they built is robust, beautiful, and future-proof.",
            moreLabel: "View results",
            image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop",
            alt: "Digital innovation"
        },
        {
            id: 5,
            date: "18.09.2025",
            title: "Global Impact & Growth",
            text: "The French Revolution constituted for the conscience of the dominant aristocratic class a necessary evolution. Their strategic insights helped us expand into 3 new markets.",
            moreLabel: "Learn more",
            image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop",
            alt: "Global expansion"
        },
        {
            id: 6,
            date: "05.11.2025",
            title: "Customer-Centric & Agile",
            text: "Exceptional experience from start to finish. Their design thinking and agile methodology brought our vision to life. We’ve received countless compliments from our own clients.",
            moreLabel: "Read testimonial",
            image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop",
            alt: "Happy clients"
        }
    ];

    // DOM elements
    const wrapper = document.getElementById('sliderWrapper');
    const prevBtn = document.getElementById('prevArrow');
    const nextBtn = document.getElementById('nextArrow');
    const dotsContainer = document.getElementById('dotsContainer');

    let currentIndex = 0;
    let visibleSlides = 3;
    let slideWidth = 0;
    let gap = 32; // 2rem gap in px
    let totalSlides = testimonialsData.length;
    let autoInterval = null;
    const AUTO_DELAY = 5500;

    // Helper: get visible slides based on screen width
    function getVisibleCount() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1200) return 2;
        return 3;
    }

    // Update dimensions: recalc width per slide (including gap)
    function updateDimensions() {
        if (!wrapper) return;
        const containerRect = wrapper.parentElement?.parentElement?.getBoundingClientRect();
        let containerWidth;
        if (containerRect && containerRect.width) {
            containerWidth = containerRect.width;
        } else {
            containerWidth = wrapper.parentElement?.clientWidth || 1200;
        }
        const newVisible = getVisibleCount();
        visibleSlides = newVisible;
        const totalGapWidth = (visibleSlides - 1) * gap;
        slideWidth = (containerWidth - totalGapWidth) / visibleSlides;
        return slideWidth;
    }

    // Render all slides inside wrapper using data (rich HTML with icons)
    function renderSlides() {
        if (!wrapper) return;
        let slidesHTML = '';
        testimonialsData.forEach((item, idx) => {
            slidesHTML += `
                <div class="slide flex" data-id="${item.id}">
                    <div class="slide-image slider-link">
                        <img src="${item.image}" alt="${item.alt}" loading="lazy">
                        <div class="overlay"></div>
                    </div>
                    <div class="slide-content">
                        <div class="slide-date">
                            <i class="far fa-calendar-alt"></i> ${item.date}
                        </div>
                        <div class="slide-title">${item.title}</div>
                        <div class="slide-text">${item.text}</div>
                        <div class="slide-more">
                            ${item.moreLabel} <i class="fas fa-arrow-right"></i>
                        </div>
                    </div>	
                </div>
            `;
        });
        wrapper.innerHTML = slidesHTML;
    }

    // update dots based on max index (total pages)
    function getMaxIndex() {
        return Math.max(0, totalSlides - visibleSlides);
    }

    function updateDots() {
        const maxIdx = getMaxIndex();
        const dotCount = maxIdx + 1;
        dotsContainer.innerHTML = '';
        for (let i = 0; i < dotCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => {
                if (i !== currentIndex) {
                    currentIndex = i;
                    repositionSlider(true);
                    resetAutoPlay();
                }
            });
            dotsContainer.appendChild(dot);
        }
    }

    // reposition slider using transform
    function repositionSlider(smooth = true) {
        if (!wrapper) return;
        const maxIdx = getMaxIndex();
        if (currentIndex > maxIdx) currentIndex = maxIdx;
        if (currentIndex < 0) currentIndex = 0;
        const translateXValue = - (currentIndex * (slideWidth + gap));
        wrapper.style.transition = smooth ? 'transform 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1)' : 'none';
        wrapper.style.transform = `translateX(${translateXValue}px)`;
        
        // update active dot class
        const allDots = document.querySelectorAll('.dot');
        allDots.forEach((dot, idx) => {
            if (idx === currentIndex) dot.classList.add('active');
            else dot.classList.remove('active');
        });
    }

    // navigation functions
    function nextSlide() {
        const maxIdx = getMaxIndex();
        if (currentIndex < maxIdx) {
            currentIndex++;
            repositionSlider(true);
        } else if (maxIdx >= 0) {
            // infinite loop: go back to first slide (big website style often cycles)
            currentIndex = 0;
            repositionSlider(true);
        }
        resetAutoPlay();
    }

    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            repositionSlider(true);
        } else {
            const maxIdx = getMaxIndex();
            currentIndex = maxIdx;
            repositionSlider(true);
        }
        resetAutoPlay();
    }

    // auto slide
    function startAutoPlay() {
        if (autoInterval) clearInterval(autoInterval);
        autoInterval = setInterval(() => {
            nextSlide();
        }, AUTO_DELAY);
    }

    function resetAutoPlay() {
        if (autoInterval) {
            clearInterval(autoInterval);
            startAutoPlay();
        }
    }

    function stopAutoPlay() {
        if (autoInterval) {
            clearInterval(autoInterval);
            autoInterval = null;
        }
    }

    // resize handler: recalc and re-render dimensions, maintain index
    let resizeTimer;
    function handleResize() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const newVisible = getVisibleCount();
            const oldVisible = visibleSlides;
            updateDimensions();
            if (newVisible !== oldVisible) {
                // visible count changed, need to rebuild dots and reposition
                const maxPossible = getMaxIndex();
                if (currentIndex > maxPossible) currentIndex = Math.max(0, maxPossible);
                updateDots();
                repositionSlider(false);
            } else {
                const maxPossible = getMaxIndex();
                if (currentIndex > maxPossible) currentIndex = maxPossible;
                repositionSlider(false);
                updateDots();
            }
        }, 120);
    }

    // optional: swipe / drag simulation for touch devices (simple)
    let touchStartX = 0;
    let touchEndX = 0;
    function handleTouchStart(e) {
        touchStartX = e.touches[0].clientX;
    }
    function handleTouchEnd(e) {
        touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) nextSlide();
            else prevSlide();
        }
    }

    // initialize slider fully
    function initSlider() {
        renderSlides();
        updateDimensions();
        currentIndex = 0;
        updateDots();
        repositionSlider(false);
        startAutoPlay();

        // event listeners
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            prevSlide();
        });
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            nextSlide();
        });
        window.addEventListener('resize', handleResize);
        
        // pause on hover (big website UX)
        const sliderContainer = document.querySelector('.slider');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', stopAutoPlay);
            sliderContainer.addEventListener('mouseleave', startAutoPlay);
        }

        // touch events for mobile
        wrapper.addEventListener('touchstart', handleTouchStart, { passive: true });
        wrapper.addEventListener('touchend', handleTouchEnd);
        
        // optional: keyboard arrows
        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextSlide();
            }
        });
    }

    // when window fully loaded (ensures image dimensions)
    window.addEventListener('load', () => {
        initSlider();
        // extra re-position after fonts/images
        setTimeout(() => {
            updateDimensions();
            repositionSlider(false);
            updateDots();
        }, 150);
    });

    // In case DOM already ready
    if (document.readyState === 'complete') {
        setTimeout(() => {
            if (!wrapper.hasChildNodes()) initSlider();
        }, 50);
    }
});
    

//

