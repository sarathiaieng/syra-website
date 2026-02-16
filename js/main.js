// SYRA - Main JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Mark JS as enabled for animations
    document.body.classList.add('js-enabled');

    const navbar = document.getElementById('navbar');

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }

    // Contact Form Logic
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;

            btn.innerText = 'TRANSMITTING...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerText = 'MESSAGE DELIVERED';
                btn.style.background = 'var(--accent)';
                contactForm.reset();

                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = 'var(--primary)';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
            }
        });
    }, observerOptions);

    // Initial reveal elements
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
