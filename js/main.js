// Main JavaScript file for portfolio site animations and interactions

document.addEventListener('DOMContentLoaded', () => {
    // --- Dark Mode Toggle Logic (Android Style) ---
    const themeToggleCheckbox = document.getElementById('theme-toggle-checkbox');
    console.log('Theme toggle checkbox found:', themeToggleCheckbox);

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeToggleCheckbox) themeToggleCheckbox.checked = true;
    }

    // Function to set the toggle state based on current theme
    const setToggleState = () => {
        if (document.body.classList.contains('dark-mode')) {
            themeToggleCheckbox.checked = true;
        } else {
            themeToggleCheckbox.checked = false;
        }
    };

    if (themeToggleCheckbox) {
        // Set initial toggle state on load based on body class
        setToggleState(); 
        console.log('Initial theme toggle state set.');

        themeToggleCheckbox.addEventListener('change', () => {
            console.log('Theme toggle changed!');

            console.log('Body classes BEFORE toggle:', document.body.className);
            // Toggle the .dark-mode class on the <body> element
            document.body.classList.toggle('dark-mode');
            console.log('Body classes AFTER toggle:', document.body.className);

            // Determine the new theme state based on body class
            let newTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
            console.log('New theme saved:', newTheme);

            // Save the new theme preference to localStorage
            localStorage.setItem('theme', newTheme);
        });
    } else {
        console.error('Theme toggle checkbox element not found!');
    }
    // --- End Dark Mode Toggle Logic ---

    // Add a subtle parallax effect to the hero section
    const hero = document.querySelector('.hero');
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    let hasScrolled = false;

    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            
            // Parallax effect
            if (scrollPosition < 600) {
                hero.style.transform = `translateY(${scrollPosition * 0.1}px)`;
            }

            // Show buttons on first scroll on mobile
            if (window.innerWidth <= 480 && !hasScrolled && scrollPosition > 10) {
                hasScrolled = true;
                heroButtons.forEach(button => {
                    button.classList.add('visible');
                });
            }
        });

        // Hide buttons initially on mobile
        if (window.innerWidth <= 480) {
            heroButtons.forEach(button => {
                button.classList.remove('visible');
            });
        }

        // Handle resize
        window.addEventListener('resize', function() {
            if (window.innerWidth <= 480 && !hasScrolled) {
                heroButtons.forEach(button => {
                    button.classList.remove('visible');
                });
            } else {
                heroButtons.forEach(button => {
                    button.classList.add('visible');
                });
            }
        });
    }
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const hash = this.getAttribute('href');
            // Skip empty hash or just "#"
            if (hash === '#') return;
            
            const target = document.querySelector(hash);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Mobile navigation toggle - DISABLED
    const createMobileNav = () => {
        // Mobile navigation disabled as requested
        return;
        
        // Original code commented out
        /*
        const nav = document.querySelector('.nav');
        if (!nav.querySelector('.mobile-toggle')) {
            const mobileToggle = document.createElement('button');
            mobileToggle.classList.add('mobile-toggle');
            mobileToggle.innerHTML = '<span></span><span></span><span></span>';
            mobileToggle.setAttribute('aria-label', 'Toggle Navigation');
            
            const navLinks = document.querySelector('.nav-links');
            
            mobileToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                mobileToggle.classList.toggle('active');
            });
            
            nav.prepend(mobileToggle);
            
            // Add mobile navigation styles
            const style = document.createElement('style');
            style.textContent = `
                @media (max-width: 768px) {
                    .nav-links {
                        position: absolute;
                        top: 100%;
                        left: 0;
                        width: 100%;
                        background: white;
                        flex-direction: column;
                        padding: 20px;
                        box-shadow: 0 10px 20px rgba(0,0,0,0.1);
                        transform: translateY(-10px);
                        opacity: 0;
                        pointer-events: none;
                        transition: all 0.3s ease;
                        z-index: 1000;
                    }
                    
                    .nav-links.active {
                        transform: translateY(0);
                        opacity: 1;
                        pointer-events: all;
                    }
                    
                    .mobile-toggle {
                        display: block;
                        background: none;
                        border: none;
                        width: 30px;
                        height: 30px;
                        position: relative;
                        cursor: pointer;
                        margin-right: 20px;
                    }
                    
                    .mobile-toggle span {
                        display: block;
                        width: 100%;
                        height: 2px;
                        background: black;
                        position: absolute;
                        left: 0;
                        transition: all 0.3s ease;
                    }
                    
                    .mobile-toggle span:nth-child(1) {
                        top: 6px;
                    }
                    
                    .mobile-toggle span:nth-child(2) {
                        top: 14px;
                    }
                    
                    .mobile-toggle span:nth-child(3) {
                        top: 22px;
                    }
                    
                    .mobile-toggle.active span:nth-child(1) {
                        transform: rotate(45deg);
                        top: 14px;
                    }
                    
                    .mobile-toggle.active span:nth-child(2) {
                        opacity: 0;
                    }
                    
                    .mobile-toggle.active span:nth-child(3) {
                        transform: rotate(-45deg);
                        top: 14px;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        */
    };
    
    // Initialize mobile navigation on smaller screens - DISABLED
    const initMobileNav = () => {
        // Mobile navigation disabled as requested
        return;
        
        // Original code commented out
        /*
        if (window.innerWidth <= 768) {
            createMobileNav();
        }
        */
    };
    
    // Call the function
    initMobileNav();
    
    // Disable the resize listener for mobile nav
    // window.addEventListener('resize', initMobileNav);
    
    // Show More button functionality
    const showMoreBtn = document.querySelector('#btn-show-more');
    const hiddenItems = document.querySelectorAll('.portfolio-item.hidden');
    
    if (showMoreBtn && hiddenItems.length > 0) {
        showMoreBtn.addEventListener('click', function() {
            hiddenItems.forEach(item => {
                item.classList.remove('hidden');
            });
            
            // Instead of hiding the button, disable it and update its appearance
            const button = showMoreBtn.querySelector('.btn');
            if (button) {
                button.style.opacity = '0.5';
                button.style.cursor = 'not-allowed';
                button.style.pointerEvents = 'none';
            }
        });
    }

    // Testimonial slider functionality
    const track = document.querySelector('.testimonials-track');
    const prevButton = document.querySelector('.testimonial-button.prev');
    const nextButton = document.querySelector('.testimonial-button.next');
    const cards = document.querySelectorAll('.testimonial-card');
    // let currentIndex = 0; // Original state variable

    if (track && prevButton && nextButton) {

        /* === START: ORIGINAL SCROLL LOGIC (Temporarily Commented Out) ===
        // Original state variable
        let currentIndex = 0;

        // Update button states - always enabled for continuous scrolling
        const updateButtons = () => {
            prevButton.disabled = false;
            nextButton.disabled = false;
            prevButton.style.opacity = '1';
            nextButton.style.opacity = '1';
        };

        // Scroll to card with restart behavior
        const scrollToCard = (index) => {
            // Handle circular scrolling for both directions
            if (index < 0) {
                index = cards.length - 1;
            } else if (index >= cards.length - 1) {
                // If we're at the last card, show it first, then reset to first after a short delay
                if (index === cards.length - 1) {
                    const lastCard = cards[cards.length - 1];
                    track.scrollLeft = lastCard.offsetLeft - track.offsetLeft; // Scroll to last card
                    currentIndex = cards.length - 1;

                    // After showing the last card briefly, go back to the first
                    setTimeout(() => {
                        const firstCard = cards[0];
                        track.scrollLeft = firstCard.offsetLeft - track.offsetLeft; // Scroll to first card
                        currentIndex = 0;
                        updateButtons();
                    }, 1500); // Delay before looping back

                } else { // index > cards.length -1, loop back to start immediately
                    index = 0;
                    const firstCard = cards[0];
                     track.scrollLeft = firstCard.offsetLeft - track.offsetLeft; // Scroll to first card
                     currentIndex = 0;
                }

            } else {
                // Scroll to the target card
                const targetCard = cards[index];
                if (targetCard) {
                     track.scrollLeft = targetCard.offsetLeft - track.offsetLeft;
                     currentIndex = index;
                }
            }
             updateButtons(); // Update buttons after scroll action
        };

        // Event listeners for buttons
        prevButton.addEventListener('click', () => {
            scrollToCard(currentIndex - 1);
        });

        nextButton.addEventListener('click', () => {
            scrollToCard(currentIndex + 1);
        });

        // Initial button state
        updateButtons();
        === END: ORIGINAL SCROLL LOGIC === */

        // === START: SIMPLIFIED SCROLL LOGIC (For Testing CSS Snapping) ===
        function updateSimpleButtons() {
            const scrollLeft = track.scrollLeft;
            const scrollWidth = track.scrollWidth;
            const clientWidth = track.clientWidth;
            
            prevButton.disabled = scrollLeft <= 0;
            nextButton.disabled = scrollLeft >= (scrollWidth - clientWidth - 1); // Allow for rounding errors

            prevButton.style.opacity = prevButton.disabled ? '0.15' : '1';
            nextButton.style.opacity = nextButton.disabled ? '0.15' : '1';
        }

        prevButton.addEventListener('click', () => {
            const cardWidth = cards[0] ? cards[0].offsetWidth : 400; // Get width or fallback
            const gap = 24; // Match CSS gap
            track.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
        });

        nextButton.addEventListener('click', () => {
            const cardWidth = cards[0] ? cards[0].offsetWidth : 400;
            const gap = 24;
            track.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
        });

        // Update buttons initially and on scroll
        track.addEventListener('scroll', updateSimpleButtons, { passive: true });
        updateSimpleButtons();
        // === END: SIMPLIFIED SCROLL LOGIC ===
    }
    
    // Add fade-in animation styles
    const addAnimationStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            .portfolio-item, 
            .pricing-card, 
            .faq-item, 
            h1, h2, h3, 
            .btn:not(.btn-load-more .btn), 
            .pricing-features li,
            .testimonial-card, 
            .hero-text, 
            .project-cta p, 
            .footer-brand, 
            .footer-links, 
            .footer-contact {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .fade-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            /* Ensure Show More button and CTA buttons are always visible */
            .btn-load-more .btn,
            .hero-buttons .btn,
            .cta-buttons .btn {
                opacity: 1 !important;
                transform: none !important;
                transition: transform 0.25s ease, box-shadow 0.25s ease !important;
            }
        `;
        document.head.appendChild(style);
    };
    
    // Initialize animations
    addAnimationStyles();
    
    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.portfolio-item, .pricing-card, .faq-item, h1, h2, h3, .btn:not(.btn-load-more):not(.btn-show-more), .testimonial-card, .hero-text, .project-cta p, .footer-brand, .footer-links, .footer-contact');
        
        elements.forEach(element => {
            const position = element.getBoundingClientRect();
            
            // Check if element is in viewport
            if (position.top < window.innerHeight - 50) {
                element.classList.add('fade-in');
            }
        });
    };
    
    // Run animation check on load and scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Add FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('h4');
        const answer = item.querySelector('p');
        
        if (question && answer) {
            // Initially hide answers
            answer.style.display = 'none';
            
            // Add plus/minus indicator
            const indicator = document.createElement('span');
            indicator.classList.add('faq-indicator');
            indicator.textContent = '+';
            question.appendChild(indicator);
            
            // Add click event
            question.addEventListener('click', () => {
                const isOpen = answer.style.display === 'block';
                
                // Close all other answers
                faqItems.forEach(otherItem => {
                    const otherAnswer = otherItem.querySelector('p');
                    const otherIndicator = otherItem.querySelector('.faq-indicator');
                    if (otherItem !== item && otherAnswer) {
                        otherAnswer.style.display = 'none';
                        if (otherIndicator) otherIndicator.textContent = '+';
                    }
                });
                
                // Toggle current answer
                answer.style.display = isOpen ? 'none' : 'block';
                indicator.textContent = isOpen ? '+' : '-';
            });
        }
    });
    
    // Add styles for FAQ accordion
    const faqStyles = document.createElement('style');
    faqStyles.textContent = `
        .faq-item h4 {
            cursor: pointer;
            position: relative;
            padding-right: 30px;
        }
        
        .faq-indicator {
            position: absolute;
            right: 0;
            top: 0;
            font-size: 1.5rem;
            line-height: 1;
        }
        
        .faq-item p {
            margin-top: -10px;
            padding-bottom: 20px;
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(faqStyles);
    
    // Initialize everything
    const init = () => {
        createMobileNav();
        initMobileNav();
        
        // Add animation styles and initialize animations
        addAnimationStyles();
        animateOnScroll();
        
        // Setup the original text reveal animation
        initOriginalTextReveal();

        // Initialize testimonials carousel only if the container exists
        const testimonialsContainer = document.querySelector('.testimonials .container .testimonials-container');
        if (testimonialsContainer) {
            initTestimonialsCarousel();
        }
    };
    
    // Initialize original text reveal animation - restoring the original behavior
    const initOriginalTextReveal = () => {
        // Select words from both text-reveal and project content
        const words = document.querySelectorAll('.reveal-text .word, .project-content .word');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 1.0,
            rootMargin: '-10% 0px -10% 0px'
        });
        
        words.forEach(word => {
            observer.observe(word);
        });
    };

    // Call init when DOM is loaded
    init();

    // Add to scroll event
    window.addEventListener('scroll', () => {
        animateOnScroll();
    });

    // Handle resize for responsive changes
    window.addEventListener('resize', () => {
        animateOnScroll();
    });
});
