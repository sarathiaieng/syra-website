// SYRA - Next-Gen Premium JS Logic

document.addEventListener('DOMContentLoaded', () => {
    // Mark JS as enabled for scroll animations
    document.body.classList.add('js-enabled');

    const navbar = document.getElementById('navbar');

    // 1. Navbar Scroll Blur & Height Transition
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    // 2. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            // Prevent body scroll when menu is active
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // 3. Card Hover Spotlight Glow (follows cursor)
    const initCardSpotlights = () => {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    };
    initCardSpotlights();

    // Re-initialize card spotlights if content is dynamically loaded or changed
    window.addEventListener('contentChanged', initCardSpotlights);

    // 4. Scroll Reveal Intersection Observer
    const observerOptions = {
        threshold: 0.05,
        rootMargin: '0px 0px -60px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                revealObserver.unobserve(entry.target); // Trigger once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // 5. Interactive Particle Network Background (Hero Canvas)
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationFrameId = null;
        let isVisible = true;

        const mouse = {
            x: null,
            y: null,
            radius: 160 // Mouse interaction range
        };

        // Track mouse movement relative to the hero section
        const heroSection = canvas.closest('.hero-section') || canvas.parentElement;
        if (heroSection) {
            heroSection.addEventListener('mousemove', (e) => {
                const rect = heroSection.getBoundingClientRect();
                mouse.x = e.clientX - rect.left;
                mouse.y = e.clientY - rect.top;
            });

            heroSection.addEventListener('mouseleave', () => {
                mouse.x = null;
                mouse.y = null;
            });
        }

        // Adjust particle density based on screen size
        const getParticleCount = () => {
            return window.innerWidth < 768 ? 35 : 75;
        };

        const resizeCanvas = () => {
            canvas.width = heroSection.clientWidth;
            canvas.height = heroSection.clientHeight;
            initParticles();
        };

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                // Subtle, non-intrusive speeds
                this.vx = (Math.random() - 0.5) * 0.45;
                this.vy = (Math.random() - 0.5) * 0.45;
                this.radius = Math.random() * 2 + 1; // 1px to 3px
                this.color = Math.random() > 0.5 ? 'rgba(0, 242, 255, 0.4)' : 'rgba(112, 0, 255, 0.3)';
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Wrap around edges
                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;

                // Mouse push/pull reaction (subtle)
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const dist = Math.hypot(dx, dy);
                    if (dist < mouse.radius) {
                        const force = (mouse.radius - dist) / mouse.radius;
                        // Push slightly away
                        this.x -= (dx / dist) * force * 0.6;
                        this.y -= (dy / dist) * force * 0.6;
                    }
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        const initParticles = () => {
            particles = [];
            const count = getParticleCount();
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        };

        const drawLines = () => {
            const maxDistance = 120;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const p1 = particles[i];
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.hypot(dx, dy);

                    if (dist < maxDistance) {
                        const alpha = (maxDistance - dist) / maxDistance * 0.12;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        // Gradient line from Cyan to Purple
                        const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
                        grad.addColorStop(0, `rgba(0, 242, 255, ${alpha})`);
                        grad.addColorStop(1, `rgba(112, 0, 255, ${alpha})`);
                        ctx.strokeStyle = grad;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }

                // Interactive lines to the mouse cursor
                if (mouse.x !== null && mouse.y !== null) {
                    const p = particles[i];
                    const dx = mouse.x - p.x;
                    const dy = mouse.y - p.y;
                    const dist = Math.hypot(dx, dy);

                    if (dist < mouse.radius) {
                        const alpha = (mouse.radius - dist) / mouse.radius * 0.18;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.strokeStyle = `rgba(0, 242, 255, ${alpha})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            if (!isVisible) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            drawLines();
            animationFrameId = requestAnimationFrame(animate);
        };

        // Resize management (debounced)
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                resizeCanvas();
            }, 100);
        });

        // Intersection Observer to stop drawing when hero goes out of viewport
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isVisible = entry.isIntersecting;
                if (isVisible) {
                    // Resume animation
                    cancelAnimationFrame(animationFrameId);
                    animate();
                } else {
                    cancelAnimationFrame(animationFrameId);
                }
            });
        }, { threshold: 0 });

        heroObserver.observe(heroSection);

        // Bootstrap
        resizeCanvas();
    }
});
