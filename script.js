document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function () {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Dropdown Menu Toggle for Mobile
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        const menu = dropdown.querySelector('.dropdown-menu');

        link.addEventListener('click', function (e) {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                menu.classList.toggle('active');

                // Close other dropdowns when one is opened
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.querySelector('.dropdown-menu').classList.remove('active');
                    }
                });
            }
        });
    });

    // Close menu when clicking outside on mobile
    document.addEventListener('click', function (e) {
        if (window.innerWidth <= 992) {
            if (!e.target.closest('.navbar') && !e.target.closest('.hamburger')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.querySelectorAll('.dropdown-menu').forEach(menu => {
                    menu.classList.remove('active');
                });
            }
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (window.innerWidth <= 992) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });

    // Sticky header on scroll
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }

        lastScroll = currentScroll;
    });



    // Hero animations
    if (document.querySelector('.hero')) {
        // Text animations
        gsap.from('.hero-title', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        });

        gsap.from('.hero-subtitle', {
            duration: 1,
            y: 50,
            opacity: 0,
            delay: 0.2,
            ease: 'power3.out'
        });

        gsap.from('.hero-buttons', {
            duration: 1,
            y: 50,
            opacity: 0,
            delay: 0.4,
            ease: 'power3.out'
        });

        // Image animation
        gsap.from('.pump-image', {
            duration: 1,
            x: 100,
            opacity: 0,
            ease: 'power3.out'
        });

        // Feature items animation
        gsap.utils.toArray('.feature-item').forEach((item, i) => {
            gsap.from(item, {
                duration: 0.8,
                y: 30,
                opacity: 0,
                delay: 0.6 + (i * 0.2),
                ease: 'back.out'
            });
        });

        // Client logos animation
        gsap.utils.toArray('.logo-item').forEach((item, index) => {
                // Set initial state
                gsap.set(item, {
                    y: 20,
                    opacity: 0,
                    visibility: 'hidden'
                });

                // Animate to final state
                gsap.to(item, {
                    duration: 0.8,
                    y: 0,
                    opacity: 0.7,
                    visibility: 'visible',
                    delay: 0.5 + (index * 0.1),
                    ease: 'power2.out',
                    onStart: () => {
                        item.style.willChange = 'transform, opacity';
                    },
                    onComplete: () => {
                        item.style.willChange = 'auto';
                    }
                });
            });

        // Floating pump animation
        const pumpImage = document.querySelector('.pump-image');
        if (pumpImage) {
            gsap.set(pumpImage, { y: 0 });
            if (pumpImage.complete) {
                initPumpAnimation();
            } else {
                pumpImage.addEventListener('load', initPumpAnimation);
            }
        }

        function initPumpAnimation() {
            gsap.to('.pump-image', {
                duration: 6,
                y: -15,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                onStart: () => {
                    document.querySelector('.pump-image').style.willChange = 'transform';
                },
                onComplete: () => {
                    document.querySelector('.pump-image').style.willChange = 'auto';
                }
            });
        }
    }



    // Product Card Animations
    const productCards = document.querySelectorAll('.product-card');
    const productObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                gsap.to(entry.target, {
                    duration: 0.6,
                    opacity: 1,
                    y: 0,
                    ease: 'power2.out',
                    stagger: 0.1
                });
                productObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    productCards.forEach((card, index) => {
        gsap.set(card, { opacity: 0, y: 50 });
        productObserver.observe(card);
    });

    // Add hover effect to product images
    productCards.forEach(card => {
        const img = card.querySelector('.product-image img');
        card.addEventListener('mousemove', (e) => {
            if (window.innerWidth > 768) {
                const x = e.offsetX;
                const y = e.offsetY;
                const centerX = card.offsetWidth / 2;
                const centerY = card.offsetHeight / 2;
                gsap.to(img, {
                    duration: 0.5,
                    rotationX: (y - centerY) / 20,
                    rotationY: (centerX - x) / 20,
                    ease: 'power1.out'
                });
            }
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(img, {
                duration: 0.7,
                rotationX: 0,
                rotationY: 0,
                ease: 'elastic.out(1, 0.5)'
            });
        });
    });

    // Industry Card Animations
    const industryCards = document.querySelectorAll('.industry-card');
    const industryObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                gsap.to(entry.target, {
                    duration: 0.6,
                    opacity: 1,
                    y: 0,
                    delay: index * 0.1,
                    ease: 'back.out(1.7)'
                });
            }
        });
    }, { threshold: 0.1 });

    industryCards.forEach(card => {
        gsap.set(card, { opacity: 0, y: 30 });
        industryObserver.observe(card);
    });

    // About Section Counter Animation
    const counters = document.querySelectorAll('.achievement-number');
    const speed = 200;

    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText;
            const increment = target / speed;
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target + '+';
            }
        });
    }

    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                aboutObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const aboutSection = document.querySelector('.about-section');
    if (aboutSection) {
        aboutObserver.observe(aboutSection);
    }

    // Image hover effect
    const aboutImage = document.querySelector('.about-image .main-image');
    if (aboutImage) {
        aboutImage.parentElement.addEventListener('mousemove', (e) => {
            if (window.innerWidth > 992) {
                const x = e.offsetX / aboutImage.parentElement.offsetWidth * 100;
                const y = e.offsetY / aboutImage.parentElement.offsetHeight * 100;
                aboutImage.style.transformOrigin = `${x}% ${y}%`;
                aboutImage.style.transform = 'scale(1.05)';
            }
        });
        aboutImage.parentElement.addEventListener('mouseleave', () => {
            aboutImage.style.transform = 'scale(1)';
        });
    }

    // Testimonials Slider Animation
    const slider = document.querySelector('.testimonials-slider');
    if (slider) {
        gsap.to(slider, {
            x: () => -(slider.scrollWidth - slider.offsetWidth),
            ease: 'none',
            scrollTrigger: {
                trigger: '.testimonials-section',
                start: 'top center',
                end: 'bottom center',
                scrub: 1,
                invalidateOnRefresh: true
            }
        });
    }



    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const formMessage = document.getElementById('formMessage');
            const submitBtn = this.querySelector('.submit-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            const originalText = btnText.textContent;

            btnText.textContent = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                formMessage.textContent = 'Thank you! Your message has been sent successfully.';
                formMessage.classList.add('success');
                formMessage.style.display = 'block';
                contactForm.reset();
                btnText.textContent = originalText;
                submitBtn.disabled = false;
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            }, 1500);
        });
    }

    // Map Animation
    gsap.from('.map-container', {
        opacity: 0,
        y: 50,
        duration: 0.6,
        scrollTrigger: {
            trigger: '.map-container',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });

    // Footer Year Update
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Back to Top Button
    const backToTopButton = document.getElementById('back-to-top');
    window.addEventListener('scroll', function () {
        backToTopButton.classList.toggle('visible', window.pageYOffset > 300);
    });
    backToTopButton.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Footer Animations
    gsap.utils.toArray('.footer-col').forEach((col, index) => {
        gsap.from(col, {
            opacity: 0,
            y: 50,
            duration: 0.6,
            delay: index * 0.1,
            scrollTrigger: {
                trigger: '.footer',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });
});