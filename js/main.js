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
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            btn.innerText = 'TRANSMITTING...';
            btn.disabled = true;

            try {
                // Ensure supabaseClient is available
                if (!window.supabaseClient) {
                    throw new Error('Supabase client not initialized');
                }

                const { error } = await window.supabaseClient
                    .from('contacts')
                    .insert([formData]);

                if (error) throw error;

                btn.innerText = 'MESSAGE DELIVERED';
                btn.style.background = 'var(--accent)';
                contactForm.reset();
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('Submission Error: ' + error.message);
                btn.innerText = 'TRANSMISSION FAILED';
                btn.style.background = '#ff4444';
            } finally {
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = ''; // Reset to CSS default
                    btn.disabled = false;
                }, 3000);
            }
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
