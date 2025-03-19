// Main JavaScript file for OFF MENU clone

document.addEventListener('DOMContentLoaded', function() {
    // Add a subtle parallax effect to the hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            if (scrollPosition < 600) {
                hero.style.transform = `translateY(${scrollPosition * 0.1}px)`;
            }
        });
    }
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
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
    
    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.portfolio-item, .pricing-card, .faq-item, h1, h2, h3, .btn');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 50) {
                element.classList.add('fade-in');
                
                // Add staggered animation for pricing features
                if (element.classList.contains('pricing-card')) {
                    const features = element.querySelectorAll('.pricing-features li');
                    features.forEach((feature, index) => {
                        setTimeout(() => {
                            feature.classList.add('fade-in');
                        }, 100 * index);
                    });
                }
            }
        });
    };
    
    // Add fade-in animation styles
    const addAnimationStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            .portfolio-item, .pricing-card, .faq-item, h1, h2, h3, .btn, .pricing-features li {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .fade-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            @keyframes pulse-glow {
                0% {
                    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.2);
                }
                70% {
                    box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
                }
                100% {
                    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
                }
            }
            
            .btn-primary {
                animation: pulse-glow 2s infinite;
            }
        `;
        document.head.appendChild(style);
    };
    
    // Initialize animations
    addAnimationStyles();
    animateOnScroll();
    
    // Listen for scroll events
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
    
    // All initialization functions
    const init = () => {
        createMobileNav();
        initMobileNav();
        
        // Add animation styles and initialize animations
        addAnimationStyles();
        animateOnScroll();
        
        // Setup the original text reveal animation
        initOriginalTextReveal();
        
        // Remove modal-related event listeners since we're now using direct links to project pages
        // initializeModalHandlers(); - modal functionality removed in favor of individual project pages
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
    
    // Initialize the page
    init();

    // Portfolio Load More functionality
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const loadMoreBtn = document.querySelector('.btn-load-more .btn');
    const itemsPerLoad = 4;
    let currentlyShown = itemsPerLoad;

    // Initially hide items beyond the first 4
    portfolioItems.forEach((item, index) => {
        if (index >= itemsPerLoad) {
            item.classList.add('hidden');
        }
    });

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            const hiddenItems = document.querySelectorAll('.portfolio-item.hidden');
            const itemsToShow = Array.from(hiddenItems).slice(0, itemsPerLoad);

            itemsToShow.forEach((item, index) => {
                // Remove hidden class but keep opacity at 0
                item.classList.remove('hidden');
                item.classList.add('loading');

                // Trigger reflow
                void item.offsetWidth;

                // Add transition properties
                item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                
                // Delay each item slightly
                setTimeout(() => {
                    item.classList.remove('loading');
                }, index * 100);
            });

            currentlyShown += itemsToShow.length;

            // If no more items to show, hide the button container completely
            if (currentlyShown >= portfolioItems.length) {
                const btnContainer = loadMoreBtn.closest('.btn-load-more');
                if (btnContainer) {
                    btnContainer.style.opacity = '0';
                    btnContainer.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        btnContainer.style.display = 'none';
                    }, 300); // Match the transition duration
                }
            }
        });
    }
});
