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
// Check if ScrollReveal is loaded before using it
if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
        origin: 'top',
        distance: '60px',
        duration: 2000,
        delay: 400,
        reset: false
    })

    sr.reveal('.hero__content, .section__header')
    sr.reveal('.hero__image', {origin: 'right'})
    sr.reveal('.info__card', {interval: 100})
    sr.reveal('.plan__card', {interval: 100})
    sr.reveal('.gallery__item', {interval: 100})
    sr.reveal('.contact__card, .contact__form', {interval: 100})
    sr.reveal('.footer__content', {origin: 'bottom'})
} else {
    console.log('ScrollReveal not loaded, using fallback animations')
    
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

    // Apply fallback animation to elements
    const animatedElements = document.querySelectorAll('.hero__content, .section__header, .info__card, .plan__card, .gallery__item, .contact__card, .contact__form, .footer__content');
    animatedElements.forEach(el => {
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
        
        // Create email content
        const emailSubject = encodeURIComponent(`Consulta SierraLuna - ${subject}`)
        const emailBody = encodeURIComponent(`
Hola Silvia,

Has recibido una nueva consulta sobre el proyecto SierraLuna:

------- DETALLES DE LA CONSULTA -------
Nombre: ${name}
Email: ${email}
Teléfono: ${phone || 'No proporcionado'}
Motivo: ${subject}

Mensaje:
${message}

------- INFORMACIÓN ADICIONAL -------
Fecha y hora: ${new Date().toLocaleString('es-AR')}
Sitio web: SierraLuna - Plan Conexión San Luis

------- RESPUESTA -------
Podés responder directamente a este email: ${email}

Saludos,
Sistema de contacto SierraLuna
        `)
        
        // Create mailto link to Silvia's email
        const mailtoLink = `mailto:rua_silvia@hotmail.com?subject=${emailSubject}&body=${emailBody}`
        
        // Try to open email client
        try {
            window.location.href = mailtoLink
            
            // Show success message
            showNotification(
                `¡Gracias ${name}! Se abrirá tu cliente de email para enviar la consulta a Silvia (rua_silvia@hotmail.com). También podés contactarla directamente por WhatsApp al +54 9 2665-240838.`,
                'success'
            )
            
            // Reset form after successful submission
            setTimeout(() => {
                this.reset()
            }, 1000)
            
        } catch (error) {
            // Fallback: show email info for manual sending
            showNotification(
                `Para enviar tu consulta, copia esta información y enviala por email a: rua_silvia@hotmail.com o WhatsApp: +54 9 2665-240838`,
                'info'
            )
            console.log('Consulta SierraLuna para copiar:', {
                destinatario: 'rua_silvia@hotmail.com',
                asunto: `Consulta SierraLuna - ${subject}`,
                mensaje: `Nombre: ${name}\nEmail: ${email}\nTeléfono: ${phone}\nConsulta: ${message}`,
                whatsapp: '+54 9 2665-240838'
            })
        }
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
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 DOM loaded, initializing gallery...');
    
    // Gallery configuration
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
    ];

    let currentImageIndex = 0;
    let modal = null;

    // Get all gallery items
    const galleryItems = document.querySelectorAll('.gallery__item');
    console.log('🖼️ Found gallery items:', galleryItems.length);
    
    if (galleryItems.length === 0) {
        console.warn('⚠️ No gallery items found! Checking selector...');
        console.log('Available elements with gallery class:', document.querySelectorAll('[class*="gallery"]'));
    }

    // Add click event to each gallery item
    galleryItems.forEach((item, index) => {
        console.log(`🔗 Setting up click handler for gallery item ${index}`);
        item.style.cursor = 'pointer';
        
        // Add visual feedback
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        item.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('🎯 Gallery item clicked:', index, this);
            currentImageIndex = index;
            openModal();
        });
    });

    function openModal() {
        console.log('🚀 Opening modal for image:', currentImageIndex);
        
        // Remove any existing modal
        const existingModal = document.querySelector('.gallery-modal');
        if (existingModal) {
            console.log('🗑️ Removing existing modal');
            existingModal.remove();
        }
        
        // Create modal HTML
        modal = document.createElement('div');
        modal.className = 'gallery-modal';
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
                        <img src="" alt="" class="gallery-modal__image">
                    </div>
                    <div class="gallery-modal__info">
                        <h3 class="gallery-modal__title"></h3>
                        <p class="gallery-modal__description"></p>
                        <div class="gallery-modal__counter">
                            <span class="current">1</span> / <span class="total">${galleryImages.length}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add modal to page
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        console.log('📎 Modal added to DOM');

        // Update image content
        updateModalImage();

        // Add event listeners
        setupModalEvents();

        // Add entrance animation
        setTimeout(() => {
            modal.classList.add('gallery-modal--active');
            console.log('✨ Modal activated');
        }, 10);
    }

    function updateModalImage() {
        if (!modal) return;

        const image = modal.querySelector('.gallery-modal__image');
        const title = modal.querySelector('.gallery-modal__title');
        const description = modal.querySelector('.gallery-modal__description');
        const current = modal.querySelector('.current');

        const currentImage = galleryImages[currentImageIndex];
        
        image.src = currentImage.src;
        image.alt = currentImage.title;
        title.textContent = currentImage.title;
        description.textContent = currentImage.description;
        current.textContent = currentImageIndex + 1;
    }

    function setupModalEvents() {
        if (!modal) return;

        const closeBtn = modal.querySelector('.gallery-modal__close');
        const prevBtn = modal.querySelector('.gallery-modal__prev');
        const nextBtn = modal.querySelector('.gallery-modal__next');
        const overlay = modal.querySelector('.gallery-modal__overlay');

        // Close modal
        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                closeModal();
            }
        });

        // Navigation
        prevBtn.addEventListener('click', prevImage);
        nextBtn.addEventListener('click', nextImage);

        // Keyboard navigation
        document.addEventListener('keydown', handleKeyboard);
    }

    function closeModal() {
        if (!modal) return;
        
        modal.classList.add('gallery-modal--closing');
        document.removeEventListener('keydown', handleKeyboard);
        
        setTimeout(() => {
            if (modal && document.body.contains(modal)) {
                document.body.removeChild(modal);
                document.body.style.overflow = 'auto';
                modal = null;
            }
        }, 300);
    }

    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        updateModalImage();
    }

    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        updateModalImage();
    }

    function handleKeyboard(e) {
        switch(e.key) {
            case 'Escape':
                closeModal();
                break;
            case 'ArrowRight':
                nextImage();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
        }
    }

    // Add CSS styles for the modal
    const modalStyles = `
        .gallery-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .gallery-modal--active {
            opacity: 1;
        }

        .gallery-modal--closing {
            opacity: 0;
        }

        .gallery-modal__overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .gallery-modal__content {
            position: relative;
            max-width: 85vw;
            max-height: 85vh;
            width: auto;
            height: auto;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(25px);
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            transform: scale(0.8);
            transition: transform 0.3s ease;
            display: flex;
            flex-direction: column;
        }

        .gallery-modal--active .gallery-modal__content {
            transform: scale(1);
        }

        .gallery-modal__close {
            position: absolute;
            top: 15px;
            right: 15px;
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

        .gallery-modal__close:hover {
            background: rgba(0, 0, 0, 0.9);
            transform: scale(1.1);
        }

        .gallery-modal__nav {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 60px;
            height: 60px;
            background: rgba(0, 0, 0, 0.7);
            border: none;
            border-radius: 50%;
            color: white;
            font-size: 24px;
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
            left: 20px;
        }

        .gallery-modal__next {
            right: 20px;
        }

        .gallery-modal__image-container {
            width: 100%;
            flex: 1;
            min-height: 0;
            max-height: calc(85vh - 280px);
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            padding: 20px;
            box-sizing: border-box;
        }

        .gallery-modal__image {
            max-width: 100%;
            max-height: 100%;
            width: auto;
            height: auto;
            object-fit: contain;
            transition: transform 0.3s ease;
            border-radius: 10px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        }

        .gallery-modal__info {
            padding: 25px 30px;
            text-align: center;
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            border-top: 1px solid rgba(255, 255, 255, 0.3);
            flex-shrink: 0;
            max-height: 250px;
            min-height: 160px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .gallery-modal__title {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 1.8rem;
            font-weight: 600;
            color: #1a4d3a;
            margin-bottom: 8px;
            line-height: 1.2;
        }

        .gallery-modal__description {
            color: #7f8c8d;
            line-height: 1.5;
            margin-bottom: 15px;
            font-size: 1rem;
        }

        .gallery-modal__counter {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: linear-gradient(135deg, #d4af37 0%, #f4d03f 100%);
            color: white;
            padding: 8px 16px;
            border-radius: 25px;
            font-weight: 600;
            font-size: 0.9rem;
            box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
        }

        /* Desktop specific improvements */
        @media (min-width: 769px) {
            .gallery-modal__content {
                max-width: 75vw;
                max-height: 85vh;
                min-width: 600px;
            }
            
            .gallery-modal__image-container {
                max-height: calc(85vh - 300px);
                padding: 25px;
            }
            
            .gallery-modal__info {
                padding: 30px 35px 35px 35px;
                max-height: 250px;
                min-height: 180px;
            }
            
            .gallery-modal__title {
                font-size: 1.6rem;
                margin-bottom: 15px;
            }
            
            .gallery-modal__description {
                font-size: 1rem;
                margin-bottom: 25px;
            }
            
            .gallery-modal__counter {
                padding: 12px 20px;
                font-size: 1rem;
            }
        }

        @media (max-width: 768px) {
            .gallery-modal__content {
                max-width: 95vw;
                max-height: 95vh;
            }
            
            .gallery-modal__image-container {
                height: 60vh;
            }
            
            .gallery-modal__info {
                padding: 20px;
            }
            
            .gallery-modal__title {
                font-size: 1.5rem;
            }
            
            .gallery-modal__nav {
                width: 50px;
                height: 50px;
                font-size: 20px;
            }
            
            .gallery-modal__close {
                width: 45px;
                height: 45px;
                font-size: 18px;
            }
            
            .gallery-modal__prev {
                left: 10px;
            }
            
            .gallery-modal__next {
                right: 10px;
            }
        }
    `;

    // Add styles to head if not already added
    if (!document.querySelector('#gallery-modal-styles')) {
        const styleElement = document.createElement('style');
        styleElement.id = 'gallery-modal-styles';
        styleElement.textContent = modalStyles;
        document.head.appendChild(styleElement);
    }

    console.log('Gallery modal initialized successfully!');
});

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
console.log('🏔️ SierraLuna - Complejo Turístico')
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

/*=============== DEBUG FUNCTIONS ===============*/
// Debug function to test gallery functionality
window.testGallery = function() {
    console.log('🧪 Testing gallery functionality...');
    const galleryItems = document.querySelectorAll('.gallery__item');
    console.log('📸 Gallery items found:', galleryItems.length);
    
    if (galleryItems.length > 0) {
        console.log('🎯 Simulating click on first gallery item...');
        galleryItems[0].click();
    } else {
        console.error('❌ No gallery items found!');
        console.log('Available elements:', document.querySelectorAll('[class*="gallery"]'));
    }
};

// Auto-test after 2 seconds if in development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    setTimeout(() => {
        console.log('🔧 Development mode detected - running auto-test');
        window.testGallery();
    }, 3000);
}

console.log('✅ SierraLuna script loaded successfully!');
console.log('🎮 Use window.testGallery() to test gallery functionality');
