// Main JavaScript file for portfolio site animations and interactions

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
    
    // Initialize portfolio load more functionality
    function initPortfolioLoadMore() {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        const loadMoreBtn = document.querySelector('.btn-load-more');
        const itemsToShow = 4;
        let visibleItems = itemsToShow;

        // Initially hide all items beyond the initial count
        portfolioItems.forEach((item, index) => {
            if (index >= itemsToShow) {
                item.classList.add('hidden');
            }
        });

        // Hide load more button if there are no more items to show
        if (portfolioItems.length <= itemsToShow) {
            loadMoreBtn.style.display = 'none';
        }

        loadMoreBtn.addEventListener('click', showNextItems);

        function showNextItems() {
            const hiddenItems = document.querySelectorAll('.portfolio-item.hidden');
            const nextItems = Array.from(hiddenItems).slice(0, itemsToShow);

            nextItems.forEach(item => {
                item.classList.remove('hidden');
                item.classList.add('loading');
                setTimeout(() => {
                    item.classList.remove('loading');
                }, 10);
            });

            visibleItems += nextItems.length;

            // Hide the load more button if all items are shown
            if (visibleItems >= portfolioItems.length) {
                loadMoreBtn.style.display = 'none';
            }
        }
    }
    
    // Initialize testimonials carousel
    function initTestimonialsCarousel() {
        const track = document.querySelector('.testimonials-track');
        const cards = Array.from(track.querySelectorAll('.testimonial-card'));
        const prevButton = document.querySelector('.testimonial-button.prev');
        const nextButton = document.querySelector('.testimonial-button.next');
        const paginationDots = Array.from(document.querySelectorAll('.pagination-dot'));
        let currentIndex = 0;
        let isScrolling = false;

        if (!track || !cards.length) return;

        // Update active pagination dot
        function updatePagination() {
            paginationDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        // Scroll to specific card
        function scrollToCard(index, smooth = true) {
            if (isScrolling) return;
            isScrolling = true;

            currentIndex = Math.min(Math.max(0, index), cards.length - 1);
            const card = cards[currentIndex];
            if (!card) return;

            const cardWidth = card.offsetWidth;
            const gap = 24; // Match the CSS gap value
            const scrollPosition = currentIndex * (cardWidth + gap);

            track.scrollTo({
                left: scrollPosition,
                behavior: smooth ? 'smooth' : 'instant'
            });

            updateNavigation();
            updatePagination();

            setTimeout(() => {
                isScrolling = false;
            }, 500);
        }

        // Handle pagination dot clicks
        paginationDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                scrollToCard(index);
            });
        });

        // Update navigation state
        function updateNavigation() {
            if (!prevButton || !nextButton) return;
            
            const isAtStart = currentIndex === 0;
            const isAtEnd = currentIndex >= cards.length - 1;
            
            prevButton.disabled = isAtStart;
            nextButton.disabled = isAtEnd;
            prevButton.style.opacity = isAtStart ? '0.15' : '1';
            nextButton.style.opacity = isAtEnd ? '0.15' : '1';
        }

        // Handle button navigation
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                if (currentIndex > 0 && !isScrolling) {
                    scrollToCard(currentIndex - 1);
                }
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                if (currentIndex < cards.length - 1 && !isScrolling) {
                    scrollToCard(currentIndex + 1);
                }
            });
        }

        // Handle scroll events to update navigation
        let scrollTimeout;
        track.addEventListener('scroll', () => {
            if (isScrolling) return;
            
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const cardWidth = cards[0].offsetWidth;
                const gap = 24; // Match the CSS gap value
                const scrollPosition = track.scrollLeft;
                const newIndex = Math.round(scrollPosition / (cardWidth + gap));

                if (newIndex !== currentIndex) {
                    currentIndex = Math.min(newIndex, cards.length - 1);
                    updateNavigation();
                    updatePagination();
                }
            }, 150);
        });

        // Initialize state
        updateNavigation();
        updatePagination();
        scrollToCard(0, false);

        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                scrollToCard(currentIndex, false);
            }, 100);
        });
    }
    
    // Initialize everything
    const init = () => {
        createMobileNav();
        initMobileNav();
        
        // Add animation styles and initialize animations
        addAnimationStyles();
        animateOnScroll();
        
        // Setup the original text reveal animation
        initOriginalTextReveal();

        // Initialize portfolio load more functionality
        initPortfolioLoadMore();
        initTestimonialsCarousel();
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
});
