// Mobile Menu Toggle
const mobileBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
let isMenuOpen = false;

mobileBtn.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
        mobileMenu.classList.add('active');
        mobileBtn.innerHTML = '<i class="ph ph-x"></i>';
    } else {
        mobileMenu.classList.remove('active');
        mobileBtn.innerHTML = '<i class="ph ph-list"></i>';
    }
});

// Close menu when clicking a link
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        isMenuOpen = false;
        mobileMenu.classList.remove('active');
        mobileBtn.innerHTML = '<i class="ph ph-list"></i>';
    });
});

// Sticky Navbar Background
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 12, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(10, 10, 12, 0.85)';
        navbar.style.boxShadow = 'none';
    }
});

// Smooth Scroll for Anchor Links (pollyfill-like, though CSS smooth-scroll covers most)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});

// Custom Cursor Effect
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (cursorDot && cursorOutline) {
    window.addEventListener('mousemove', function (e) {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follows instantly
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Outline follows with slight delay (handled by CSS transition or animation frame if preferred, using CSS transition here for simplicity)
        cursorOutline.style.left = `${posX}px`;
        cursorOutline.style.top = `${posY}px`;

        // Add minimal bounce effect
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });
}

// 3D Cursor Effect (Spotlight)
const hero = document.querySelector('.hero');
if (hero) {
    hero.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = hero.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;

        hero.style.setProperty('--mouse-x', `${x}%`);
        hero.style.setProperty('--mouse-y', `${y}%`);
    });
}

// EmailJS Integrated Contact Form
(function () {
    // Initialize EmailJS with your Public Key
    // Initialize EmailJS with your Public Key
    emailjs.init("mcxscr9mvXOsgpW5W");

    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const btn = this.querySelector('button[type="submit"]');
            const originalBtnText = btn.innerHTML;

            // Set loading state
            btn.innerHTML = '<span>Sending...</span> <i class="ph ph-spinner ph-spin"></i>';
            btn.disabled = true;

            const serviceID = 'service_0c8yy33';
            const templateID = 'template_qkry51m';

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    // Success
                    btn.innerHTML = '<span>Sent!</span> <i class="ph ph-check"></i>';
                    btn.style.backgroundColor = '#10b981'; // Green color for success
                    alert('Message sent successfully!');
                    contactForm.reset();

                    // Reset button after delay
                    setTimeout(() => {
                        btn.innerHTML = originalBtnText;
                        btn.style.backgroundColor = '';
                        btn.disabled = false;
                    }, 3000);
                }, (err) => {
                    // Error
                    btn.innerHTML = '<span>Failed</span> <i class="ph ph-warning"></i>';
                    btn.style.backgroundColor = '#ef4444'; // Red color for error
                    btn.disabled = false;
                    alert('Failed to send message. Please check your configuration.');
                    console.error('EmailJS Error:', JSON.stringify(err));

                    // Reset button after delay
                    setTimeout(() => {
                        btn.innerHTML = originalBtnText;
                        btn.style.backgroundColor = '';
                    }, 3000);
                });
        });
    }
})();
