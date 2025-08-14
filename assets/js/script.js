/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* Menu hidden */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () =>{
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    this.scrollY >= 50 ? header.classList.add('scroll-header') 
                       : header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

// Add scroll-header styles
const style = document.createElement('style');
style.textContent = `
    .scroll-header {
        background: rgba(255, 255, 255, 0.98) !important;
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }
`;
document.head.appendChild(style);

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
    const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
    this.scrollY >= 350 ? scrollUp?.classList.add('show-scroll')
                        : scrollUp?.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            sectionsClass?.classList.add('active-link')
        }else{
            sectionsClass?.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

// Add active-link styles
const activeLinkStyle = document.createElement('style');
activeLinkStyle.textContent = `
    .nav__link.active-link {
        color: var(--primary-color) !important;
    }
    
    @media (min-width: 768px) {
        .nav__link.active-link::after {
            width: 100% !important;
        }
    }
`;
document.head.appendChild(activeLinkStyle);

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 400,
    reset: false
})

// Check if ScrollReveal is loaded before using it
if (typeof ScrollReveal !== 'undefined') {
    sr.reveal('.hero__content, .section__header')
    sr.reveal('.hero__image', {origin: 'right'})
    sr.reveal('.info__card', {interval: 100})
    sr.reveal('.plan__card', {interval: 100})
    sr.reveal('.gallery__item', {interval: 100})
    sr.reveal('.contact__card, .contact__form', {interval: 100})
    sr.reveal('.footer__content', {origin: 'bottom'})
} else {
    // Fallback animation for when ScrollReveal is not available
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

    // Observe elements for animations
    document.querySelectorAll('.info__card, .plan__card, .gallery__item, .contact__card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

/*=============== CONTACT FORM ===============*/
const contactForm = document.getElementById('contact-form')

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault()
        
        // Get form data
        const formData = new FormData(this)
        const name = formData.get('name') || document.getElementById('name')?.value
        const email = formData.get('email') || document.getElementById('email')?.value
        const phone = formData.get('phone') || document.getElementById('phone')?.value
        const subject = formData.get('subject') || document.getElementById('subject')?.value
        const message = formData.get('message') || document.getElementById('message')?.value
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification('Por favor, complete todos los campos obligatorios.', 'error')
            return
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            showNotification('Por favor, ingrese un email válido.', 'error')
            return
        }
        
        // Simulate form submission
        showNotification(
            `¡Gracias ${name}! Tu consulta sobre Las Verganas ha sido recibida. Silvia y Natalia se contactarán contigo pronto.`,
            'success'
        )
        
        // Reset form
        this.reset()
        
        // Log form data (in real implementation, send to server)
        console.log('Consulta Las Verganas:', {
            name,
            email,
            phone,
            subject,
            message,
            timestamp: new Date().toISOString()
        })
    })
}

/*=============== NOTIFICATION SYSTEM ===============*/
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification')
    existingNotifications.forEach(notification => notification.remove())
    
    // Create notification element
    const notification = document.createElement('div')
    notification.className = `notification notification--${type}`
    notification.innerHTML = `
        <div class="notification__content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span class="notification__message">${message}</span>
            <button class="notification__close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `
    
    // Add notification styles
    const notificationStyles = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            max-width: 400px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
            border-left: 4px solid;
        }
        
        .notification--success {
            border-left-color: #27ae60;
        }
        
        .notification--error {
            border-left-color: #e74c3c;
        }
        
        .notification--info {
            border-left-color: #3498db;
        }
        
        .notification__content {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 16px 20px;
        }
        
        .notification__content i:first-child {
            font-size: 20px;
        }
        
        .notification--success .notification__content i:first-child {
            color: #27ae60;
        }
        
        .notification--error .notification__content i:first-child {
            color: #e74c3c;
        }
        
        .notification--info .notification__content i:first-child {
            color: #3498db;
        }
        
        .notification__message {
            flex: 1;
            font-size: 14px;
            line-height: 1.4;
            color: #2c3e50;
        }
        
        .notification__close {
            background: none;
            border: none;
            color: #7f8c8d;
            cursor: pointer;
            font-size: 16px;
            padding: 4px;
            border-radius: 4px;
            transition: all 0.2s ease;
        }
        
        .notification__close:hover {
            background: #ecf0f1;
            color: #2c3e50;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @media (max-width: 768px) {
            .notification {
                top: 90px;
                left: 20px;
                right: 20px;
                max-width: none;
            }
        }
    `
    
    // Add styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const styleElement = document.createElement('style')
        styleElement.id = 'notification-styles'
        styleElement.textContent = notificationStyles
        document.head.appendChild(styleElement)
    }
    
    // Add to page
    document.body.appendChild(notification)
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-in'
            setTimeout(() => notification.remove(), 300)
        }
    }, 5000)
}

// Add slideOutRight animation
const slideOutStyle = document.createElement('style');
slideOutStyle.textContent = `
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(slideOutStyle);

/*=============== GALLERY MODAL WITH NAVIGATION ===============*/
const galleryItems = document.querySelectorAll('.gallery__item')
const galleryImages = [
    {
        src: 'assets/images/vista a la sierra.jpeg',
        title: 'Vista Panorámica',
        description: 'Ubicación privilegiada con vista a las sierras'
    },
    {
        src: 'assets/images/cabañas.jpeg',
        title: 'Cabañas en Construcción',
        description: 'Avance de la obra principal'
    },
    {
        src: 'assets/images/progreso de obra.jpeg',
        title: 'Progreso de Obra',
        description: 'Estado actual de la construcción'
    }
]

let currentImageIndex = 0

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentImageIndex = index
        openGalleryModal()
    })
})

function openGalleryModal() {
    const modal = document.createElement('div')
    modal.className = 'gallery-modal'
    modal.innerHTML = `
        <div class="gallery-modal__overlay">
            <div class="gallery-modal__content">
                <button class="gallery-modal__close">
                    <i class="fas fa-times"></i>
                </button>
                <button class="gallery-modal__nav gallery-modal__prev">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button class="gallery-modal__nav gallery-modal__next">
                    <i class="fas fa-chevron-right"></i>
                </button>
                <div class="gallery-modal__image-container">
                    <img src="${galleryImages[currentImageIndex].src}" 
                         alt="${galleryImages[currentImageIndex].title}" 
                         class="gallery-modal__image">
                </div>
                <div class="gallery-modal__info">
                    <h3 class="gallery-modal__title">${galleryImages[currentImageIndex].title}</h3>
                    <p class="gallery-modal__description">${galleryImages[currentImageIndex].description}</p>
                    <div class="gallery-modal__counter">
                        <span>${currentImageIndex + 1}</span> / <span>${galleryImages.length}</span>
                    </div>
                </div>
            </div>
        </div>
    `
    
    // Add modal styles
    const modalStyles = `
        .gallery-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            animation: fadeIn 0.3s ease-out;
        }
        
        .gallery-modal__overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            cursor: pointer;
        }
        
        .gallery-modal__content {
            position: relative;
            max-width: 90vw;
            max-height: 90vh;
            background: var(--glass-white);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 16px;
            overflow: hidden;
            cursor: default;
            animation: zoomIn 0.3s ease-out;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
        }
        
        .gallery-modal__close {
            position: absolute;
            top: 15px;
            right: 15px;
            width: 45px;
            height: 45px;
            background: rgba(0, 0, 0, 0.7);
            border: none;
            border-radius: 50%;
            color: white;
            font-size: 20px;
            cursor: pointer;
            z-index: 10001;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
        }
        
        .gallery-modal__close:hover {
            background: rgba(0, 0, 0, 0.9);
            transform: scale(1.1);
        }
        
        .gallery-modal__nav {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 50px;
            height: 50px;
            background: rgba(0, 0, 0, 0.7);
            border: none;
            border-radius: 50%;
            color: white;
            font-size: 20px;
            cursor: pointer;
            z-index: 10001;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
        }
        
        .gallery-modal__nav:hover {
            background: rgba(0, 0, 0, 0.9);
            transform: translateY(-50%) scale(1.1);
        }
        
        .gallery-modal__prev {
            left: 15px;
        }
        
        .gallery-modal__next {
            right: 15px;
        }
        
        .gallery-modal__image-container {
            position: relative;
            width: 100%;
            max-height: 70vh;
            overflow: hidden;
        }
        
        .gallery-modal__image {
            width: 100%;
            height: auto;
            max-height: 70vh;
            object-fit: contain;
            display: block;
            transition: transform 0.3s ease;
        }
        
        .gallery-modal__info {
            padding: 25px;
            text-align: center;
        }
        
        .gallery-modal__title {
            font-family: var(--font-primary);
            font-size: 1.8rem;
            font-weight: 600;
            color: var(--primary-color);
            margin-bottom: 10px;
        }
        
        .gallery-modal__description {
            color: var(--text-light);
            line-height: 1.6;
            margin-bottom: 15px;
            font-size: 1.1rem;
        }
        
        .gallery-modal__counter {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            background: var(--gradient-secondary);
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-weight: 600;
            font-size: 0.9rem;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes zoomIn {
            from { 
                opacity: 0;
                transform: scale(0.8);
            }
            to { 
                opacity: 1;
                transform: scale(1);
            }
        }
        
        @keyframes slideNext {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slidePrev {
            from { transform: translateX(-100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @media (max-width: 768px) {
            .gallery-modal__content {
                max-width: 95vw;
                max-height: 95vh;
            }
            
            .gallery-modal__image {
                max-height: 60vh;
            }
            
            .gallery-modal__info {
                padding: 20px;
            }
            
            .gallery-modal__title {
                font-size: 1.5rem;
            }
            
            .gallery-modal__description {
                font-size: 1rem;
            }
            
            .gallery-modal__nav {
                width: 40px;
                height: 40px;
                font-size: 16px;
            }
            
            .gallery-modal__close {
                width: 40px;
                height: 40px;
                font-size: 16px;
            }
        }
    `
    
    // Add styles if not already added
    if (!document.querySelector('#gallery-modal-styles-v2')) {
        const styleElement = document.createElement('style')
        styleElement.id = 'gallery-modal-styles-v2'
        styleElement.textContent = modalStyles
        document.head.appendChild(styleElement)
    }
    
    // Add to page
    document.body.appendChild(modal)
    document.body.style.overflow = 'hidden'
    
    // Update image function
    function updateImage(direction = null) {
        const img = modal.querySelector('.gallery-modal__image')
        const title = modal.querySelector('.gallery-modal__title')
        const description = modal.querySelector('.gallery-modal__description')
        const counter = modal.querySelector('.gallery-modal__counter')
        
        // Add animation class based on direction
        if (direction) {
            img.style.animation = direction === 'next' ? 'slideNext 0.3s ease-out' : 'slidePrev 0.3s ease-out'
        }
        
        img.src = galleryImages[currentImageIndex].src
        img.alt = galleryImages[currentImageIndex].title
        title.textContent = galleryImages[currentImageIndex].title
        description.textContent = galleryImages[currentImageIndex].description
        counter.innerHTML = `<span>${currentImageIndex + 1}</span> / <span>${galleryImages.length}</span>`
        
        // Remove animation after completion
        setTimeout(() => {
            img.style.animation = ''
        }, 300)
    }
    
    // Navigation functions
    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length
        updateImage('next')
    }
    
    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length
        updateImage('prev')
    }
    
    // Close modal functionality
    const closeModal = () => {
        modal.style.animation = 'fadeOut 0.3s ease-in'
        setTimeout(() => {
            if (document.body.contains(modal)) {
                document.body.removeChild(modal)
                document.body.style.overflow = 'auto'
            }
        }, 300)
    }
    
    // Event listeners
    modal.querySelector('.gallery-modal__overlay').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeModal()
    })
    
    modal.querySelector('.gallery-modal__close').addEventListener('click', closeModal)
    modal.querySelector('.gallery-modal__next').addEventListener('click', nextImage)
    modal.querySelector('.gallery-modal__prev').addEventListener('click', prevImage)
    
    // Keyboard navigation
    const handleKeyboard = (e) => {
        switch(e.key) {
            case 'Escape':
                closeModal()
                document.removeEventListener('keydown', handleKeyboard)
                break
            case 'ArrowRight':
                nextImage()
                break
            case 'ArrowLeft':
                prevImage()
                break
        }
    }
    document.addEventListener('keydown', handleKeyboard)
    
    // Touch/swipe support for mobile
    let startX = 0
    let endX = 0
    
    modal.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX
    })
    
    modal.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX
        const diffX = startX - endX
        
        if (Math.abs(diffX) > 50) { // Minimum swipe distance
            if (diffX > 0) {
                nextImage() // Swipe left - next image
            } else {
                prevImage() // Swipe right - previous image
            }
        }
    })
}

// Add fadeOut animation
const fadeOutStyle = document.createElement('style');
fadeOutStyle.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(fadeOutStyle);

/*=============== SMOOTH SCROLLING ===============*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute('href'))
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight
            const targetPosition = target.offsetTop - headerHeight
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            })
        }
    })
})

/*=============== LOADING ANIMATION ===============*/
document.addEventListener('DOMContentLoaded', () => {
    // Add loading class to body initially
    document.body.classList.add('loading')
    
    // Remove loading class after a short delay
    setTimeout(() => {
        document.body.classList.remove('loading')
        document.body.classList.add('loaded')
    }, 500)
})

// Add loading styles
const loadingStyles = `
    .loading {
        overflow: hidden;
    }
    
    .loading * {
        animation-play-state: paused !important;
    }
    
    .loaded {
        overflow-x: hidden;
    }
    
    .loaded .hero__content {
        animation: fadeInUp 0.8s ease-out;
    }
    
    .loaded .hero__image {
        animation: fadeInRight 0.8s ease-out 0.2s both;
    }
`;

const loadingStyleElement = document.createElement('style');
loadingStyleElement.textContent = loadingStyles;
document.head.appendChild(loadingStyleElement);

/*=============== CREATE SCROLL UP BUTTON ===============*/
const createScrollUpButton = () => {
    // Check if button already exists
    if (document.getElementById('scroll-up')) return;
    
    const scrollUpButton = document.createElement('a')
    scrollUpButton.id = 'scroll-up'
    scrollUpButton.href = '#inicio'
    scrollUpButton.className = 'scroll-up'
    scrollUpButton.innerHTML = '<i class="fas fa-chevron-up"></i>'
    scrollUpButton.title = 'Volver arriba'
    
    document.body.appendChild(scrollUpButton)
}

// Create scroll up button
createScrollUpButton()

/*=============== CONSOLE MESSAGES ===============*/
console.log('🏔️ Las Verganas - Complejo Turístico')
console.log('📍 Ubicación: Nogolí, San Luis, Argentina')
console.log('👭 Emprendedoras: Silvia y Natalia Verga')
console.log('📞 Contacto: +54 9 2665-240838')
console.log('🎯 Plan Conexión San Luis 2025')
console.log('🌟 ¡Sitio web cargado correctamente!')

/*=============== PERFORMANCE MONITORING ===============*/
window.addEventListener('load', () => {
    // Log page load time
    const loadTime = performance.now()
    console.log(`⚡ Página cargada en ${Math.round(loadTime)}ms`)
    
    // Log memory usage if available
    if (performance.memory) {
        const memory = performance.memory
        console.log(`💾 Memoria: ${Math.round(memory.usedJSHeapSize / 1024 / 1024)}MB usados`)
    }
})

/*=============== ERROR HANDLING ===============*/
window.addEventListener('error', (e) => {
    console.error('❌ Error en la página:', e.error)
})

window.addEventListener('unhandledrejection', (e) => {
    console.error('❌ Promise rechazado:', e.reason)
})

/*=============== FORM FIELD VALIDATION ===============*/
const formInputs = document.querySelectorAll('.form__input, .form__select, .form__textarea')

formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        validateField(this)
    })
    
    input.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            validateField(this)
        }
    })
})

function validateField(field) {
    const value = field.value.trim()
    let isValid = true
    
    // Remove previous error classes
    field.classList.remove('error', 'valid')
    
    // Specific validations
    switch(field.type) {
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            isValid = emailRegex.test(value)
            break
        case 'tel':
            if (value) {
                const phoneRegex = /^[\d\s\-\+\(\)]{8,}$/
                isValid = phoneRegex.test(value)
            }
            break
        default:
            if (field.required) {
                isValid = value.length > 0
            }
    }
    
    // Add appropriate class
    if (field.required && !value) {
        field.classList.add('error')
    } else if (value && !isValid) {
        field.classList.add('error')
    } else if (value && isValid) {
        field.classList.add('valid')
    }
    
    return isValid
}

// Add field validation styles
const validationStyles = `
    .form__input.error,
    .form__select.error,
    .form__textarea.error {
        border-color: #e74c3c !important;
        box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
    }
    
    .form__input.valid,
    .form__select.valid,
    .form__textarea.valid {
        border-color: #27ae60 !important;
        box-shadow: 0 0 0 3px rgba(39, 174, 96, 0.1);
    }
`;

const validationStyleElement = document.createElement('style');
validationStyleElement.textContent = validationStyles;
document.head.appendChild(validationStyleElement);
