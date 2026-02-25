// ============================================
// LEXVANGUARD - JavaScript Functionality
// Author: Jean Avalos
// ============================================

// ===== PRELOADER =====
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    }
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('mainNav');
let lastScroll = 0;

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar on scroll (optional)
    if (currentScroll > lastScroll && currentScroll > 500) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===== AOS ANIMATION INITIALIZATION =====
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 1000,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100,
        delay: 100
    });
}

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ===== MOBILE MENU CLOSE ON CLICK =====
const navbarCollapse = document.querySelector('.navbar-collapse');
const navbarToggler = document.querySelector('.navbar-toggler');

if (navbarCollapse) {
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 992) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: false
                });
                bsCollapse.hide();
            }
        });
    });
}

// ===== FORM VALIDATION & SUBMISSION =====
const consultaForm = document.getElementById('consultaForm');
const successMessage = document.getElementById('successMessage');

if (consultaForm) {
    consultaForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('telefono').value;
        const area = document.getElementById('area').value;
        const mensaje = document.getElementById('mensaje').value;
        const privacidad = document.getElementById('privacidad').checked;
        
        // Validation
        let isValid = true;
        let errorMessage = '';
        
        if (nombre.trim().length < 3) {
            isValid = false;
            errorMessage = 'Por favor ingrese un nombre válido (mínimo 3 caracteres)';
        }
        
        if (!validateEmail(email)) {
            isValid = false;
            errorMessage = 'Por favor ingrese un correo electrónico válido';
        }
        
        if (telefono.trim().length < 9) {
            isValid = false;
            errorMessage = 'Por favor ingrese un número de teléfono válido';
        }
        
        if (!area) {
            isValid = false;
            errorMessage = 'Por favor seleccione un área legal';
        }
        
        if (mensaje.trim().length < 50) {
            isValid = false;
            errorMessage = 'La descripción del caso debe tener al menos 50 caracteres';
        }
        
        if (!privacidad) {
            isValid = false;
            errorMessage = 'Debe aceptar la política de privacidad';
        }
        
        if (!isValid) {
            showAlert(errorMessage, 'danger');
            return;
        }
        
        // Show loading state
        const submitBtn = consultaForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Enviando...';
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Reset form
            consultaForm.reset();
            
            // Show success message
            successMessage.style.display = 'block';
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Reset button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
            
            // Send to analytics (optional)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submission', {
                    'event_category': 'Consulta Legal',
                    'event_label': area
                });
            }
        }, 2000);
    });
}

// ===== EMAIL VALIDATION =====
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ===== ALERT SYSTEM =====
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.setAttribute('role', 'alert');
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    const form = document.getElementById('consultaForm');
    if (form) {
        form.insertAdjacentElement('beforebegin', alertDiv);
        alertDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    }
}

// ===== COUNTER ANIMATION =====
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Trigger counters when visible
const statNumbers = document.querySelectorAll('.stat-number');
let countersTriggered = false;

function checkCounters() {
    if (countersTriggered) return;
    
    statNumbers.forEach(stat => {
        const rect = stat.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const text = stat.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            if (number) {
                stat.textContent = '0';
                animateCounter(stat, number);
                countersTriggered = true;
            }
        }
    });
}

window.addEventListener('scroll', checkCounters);
window.addEventListener('load', checkCounters);

// ===== PARALLAX EFFECT =====
const heroSection = document.querySelector('.hero-section');

if (heroSection) {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    });
}

// ===== SERVICE CARD TILT EFFECT =====
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function(e) {
        card.style.transition = 'none';
    });
    
    card.addEventListener('mousemove', function(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        card.style.transition = 'all 0.3s ease';
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== TESTIMONIALS SLIDER (Optional Enhancement) =====
// If you want to add a slider functionality to testimonials
const testimonialCards = document.querySelectorAll('.testimonial-card');

testimonialCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// ===== LAZY LOADING IMAGES =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));
}

// ===== BACK TO TOP BUTTON =====
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopBtn.className = 'back-to-top';
backToTopBtn.setAttribute('aria-label', 'Volver arriba');
document.body.appendChild(backToTopBtn);

// Add CSS for back to top button
const backToTopStyle = document.createElement('style');
backToTopStyle.textContent = `
    .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #b8860b, #d4af37);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(184, 134, 11, 0.3);
    }
    
    .back-to-top.visible {
        opacity: 1;
        visibility: visible;
    }
    
    .back-to-top:hover {
        background: #0a1828;
        transform: translateY(-5px);
        box-shadow: 0 6px 20px rgba(184, 134, 11, 0.4);
    }
    
    @media (max-width: 768px) {
        .back-to-top {
            bottom: 20px;
            right: 20px;
            width: 45px;
            height: 45px;
            font-size: 18px;
        }
    }
`;
document.head.appendChild(backToTopStyle);

// Show/hide back to top button
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== FORM FIELD VALIDATION ON BLUR =====
const formInputs = document.querySelectorAll('.form-control');

formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        validateField(this);
    });
    
    input.addEventListener('input', function() {
        if (this.classList.contains('is-invalid')) {
            validateField(this);
        }
    });
});

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    
    // Remove previous validation
    field.classList.remove('is-valid', 'is-invalid');
    
    // Skip validation if field is not required and empty
    if (!field.hasAttribute('required') && value === '') {
        return;
    }
    
    // Email validation
    if (field.type === 'email') {
        isValid = validateEmail(value);
    }
    
    // Phone validation
    if (field.id === 'telefono') {
        isValid = value.length >= 9;
    }
    
    // Text validation
    if (field.type === 'text' && field.hasAttribute('required')) {
        isValid = value.length >= 3;
    }
    
    // Textarea validation
    if (field.tagName === 'TEXTAREA' && field.hasAttribute('required')) {
        isValid = value.length >= 50;
    }
    
    // Select validation
    if (field.tagName === 'SELECT' && field.hasAttribute('required')) {
        isValid = value !== '';
    }
    
    // Add validation class
    if (isValid) {
        field.classList.add('is-valid');
    } else {
        field.classList.add('is-invalid');
    }
}

// ===== ACCORDION ANIMATION =====
const accordionButtons = document.querySelectorAll('.accordion-button');

accordionButtons.forEach(button => {
    button.addEventListener('click', function() {
        const icon = this.querySelector('i');
        if (icon) {
            icon.style.transform = this.classList.contains('collapsed') ? 'rotate(0deg)' : 'rotate(180deg)';
        }
    });
});

// ===== PREVENT FORM RESUBMISSION =====
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// ===== TYPING EFFECT FOR HERO (Optional) =====
const heroHighlight = document.querySelector('.hero-title .highlight');

if (heroHighlight) {
    const text = heroHighlight.textContent;
    heroHighlight.textContent = '';
    let index = 0;
    
    function typeWriter() {
        if (index < text.length) {
            heroHighlight.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing effect after page load
    window.addEventListener('load', function() {
        setTimeout(typeWriter, 1500);
    });
}

// ===== MOUSE CURSOR EFFECT (Optional Enhancement) =====
const cursorDot = document.createElement('div');
const cursorOutline = document.createElement('div');

cursorDot.className = 'cursor-dot';
cursorOutline.className = 'cursor-outline';

document.body.appendChild(cursorDot);
document.body.appendChild(cursorOutline);

// Add cursor styles
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    .cursor-dot, .cursor-outline {
        pointer-events: none;
        position: fixed;
        top: 50%;
        left: 50%;
        border-radius: 50%;
        opacity: 0;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
        z-index: 10000;
    }
    
    .cursor-dot {
        width: 8px;
        height: 8px;
        background: #b8860b;
    }
    
    .cursor-outline {
        width: 40px;
        height: 40px;
        border: 2px solid rgba(184, 134, 11, 0.5);
    }
    
    @media (max-width: 1024px) {
        .cursor-dot, .cursor-outline {
            display: none;
        }
    }
`;
document.head.appendChild(cursorStyle);

// Cursor movement
window.addEventListener('mousemove', function(e) {
    const posX = e.clientX;
    const posY = e.clientY;
    
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
    cursorDot.style.opacity = '1';
    
    cursorOutline.style.left = `${posX}px`;
    cursorOutline.style.top = `${posY}px`;
    cursorOutline.style.opacity = '1';
});

// Cursor effects on interactive elements
const interactiveElements = document.querySelectorAll('a, button, .service-card, .testimonial-card');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', function() {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(2)';
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    
    el.addEventListener('mouseleave', function() {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// ===== CONSOLE SIGNATURE =====
console.log('%c🏛️ LexVanguard & Asociados', 'color: #b8860b; font-size: 20px; font-weight: bold;');
console.log('%cDiseñado y desarrollado por Jean Avalos', 'color: #0a1828; font-size: 14px;');
console.log('%c© 2026 Todos los derechos reservados', 'color: #6c757d; font-size: 12px;');

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll-heavy functions
window.addEventListener('scroll', debounce(function() {
    // Any scroll-heavy operations here
}, 10));

// ===== ACCESSIBILITY IMPROVEMENTS =====
// Ensure focus is visible
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-nav');
});

// Add keyboard navigation styles
const a11yStyle = document.createElement('style');
a11yStyle.textContent = `
    body.keyboard-nav *:focus {
        outline: 3px solid #b8860b !important;
        outline-offset: 2px !important;
    }
`;
document.head.appendChild(a11yStyle);

// ===== INITIALIZE ALL FUNCTIONS =====
document.addEventListener('DOMContentLoaded', function() {
    // Any initialization code here
    console.log('LexVanguard website initialized successfully');
});