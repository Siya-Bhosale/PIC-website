// Mobile Menu Toggle
let isMenuOpen = false;

function toggleMobileMenu() {
    const navMobile = document.querySelector('.nav-mobile');
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');
    
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        navMobile.classList.remove('hidden');
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
    } else {
        navMobile.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    }
}

// Smooth Scrolling
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const elementPosition = element.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
    
    // Close mobile menu if open
    if (isMenuOpen) {
        toggleMobileMenu();
    }
}

// Form Submission Handler
function handleFormSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const name = event.target.querySelector('input[type="text"]').value;
    const email = event.target.querySelector('input[type="email"]').value;
    const phone = event.target.querySelector('input[type="tel"]').value;
    
    // Simple validation
    if (!name || !email || !phone) {
        alert('Please fill in all fields');
        return;
    }
    
    // Simulate form submission
    alert(`Thank you ${name}! We've registered your interest and will contact you at ${email}.`);
    
    // Reset form
    event.target.reset();
}

// Header Scroll Effect
function handleScroll() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'hsl(222.2 84% 4.9% / 0.95)';
    } else {
        header.style.background = 'hsl(222.2 84% 4.9% / 0.8)';
    }
}

// Intersection Observer for Animations
function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe cards and sections
    const elementsToObserve = document.querySelectorAll(
        '.feature-card, .activity-card, .event-card, .faculty-card, .benefit-card'
    );
    
    elementsToObserve.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    // Initialize intersection observer
    observeElements();
    
    // Add click listeners to all navigation buttons
    document.querySelectorAll('.nav-btn, .nav-btn-mobile').forEach(button => {
        button.addEventListener('click', function() {
            const sectionId = this.textContent.toLowerCase().trim();
            if (sectionId === 'home') {
                scrollToSection('home');
            } else {
                scrollToSection(sectionId);
            }
        });
    });
    
    // Add click listeners to hero buttons
    document.querySelectorAll('.hero-buttons .btn').forEach(button => {
        button.addEventListener('click', function() {
            if (this.textContent.includes('Mission')) {
                scrollToSection('about');
            } else if (this.textContent.includes('Journey')) {
                scrollToSection('roadmap');
            }
        });
    });
    
    // Add floating animation to decorative elements
    const decorations = document.querySelectorAll('.decoration');
    decorations.forEach((decoration, index) => {
        decoration.style.animation = `float ${6 + index}s ease-in-out infinite`;
        decoration.style.animationDelay = `${index * 2}s`;
    });
});

// Add smooth hover effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.feature-card, .activity-card, .faculty-card, .event-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Parallax effect for hero decorations
function handleParallax() {
    const scrolled = window.pageYOffset;
    const decorations = document.querySelectorAll('.decoration');
    
    decorations.forEach((decoration, index) => {
        const rate = scrolled * -0.5 * (index + 1);
        decoration.style.transform = `translateY(${rate}px)`;
    });
}

// Add parallax listener
window.addEventListener('scroll', handleParallax);

// Add typing effect to hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when hero is visible
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero-title');
    const originalText = heroTitle.textContent;
    
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a small delay before starting the typing effect
                setTimeout(() => {
                    typeWriter(heroTitle, originalText, 80);
                }, 500);
                heroObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    heroObserver.observe(document.querySelector('.hero'));
});
