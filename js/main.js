// Main JavaScript file for portfolio site animations and interactions

document.addEventListener('DOMContentLoaded', function() {
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

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

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
            .portfolio-item, .pricing-card, .faq-item, h1, h2, h3, .btn, .pricing-features li,
            .testimonial-card, .hero-text, .project-cta p, .footer-brand, .footer-links, .footer-contact {
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
    
    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.portfolio-item, .pricing-card, .faq-item, h1, h2, h3, .btn:not(.btn-show-more), .testimonial-card, .hero-text, .project-cta p, .footer-brand, .footer-links, .footer-contact');
        
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
    
    // Initialize portfolio load more functionality
    function initPortfolioLoadMore() {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        const loadMoreBtn = document.querySelector('.btn-load-more');
        
        // Function to determine how many items to show based on screen width
        function getItemsToShow() {
            return window.innerWidth <= 768 ? 2 : 4;
        }

        let itemsToShow = getItemsToShow();
        let visibleItems = itemsToShow;

        // Function to update visible items
        function updateVisibleItems() {
            portfolioItems.forEach((item, index) => {
                if (index >= visibleItems) {
                    item.classList.add('hidden');
                } else {
                    item.classList.remove('hidden');
                }
            });

            // Hide load more button if there are no more items to show
            if (visibleItems >= portfolioItems.length) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'block';
            }
        }

        // Initially hide items beyond the initial count
        updateVisibleItems();

        // Show next set of items when clicking load more
        function showNextItems() {
            visibleItems += getItemsToShow();
            updateVisibleItems();
        }

        loadMoreBtn.addEventListener('click', showNextItems);

        // Update visible items when screen size changes
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                const newItemsToShow = getItemsToShow();
                if (newItemsToShow !== itemsToShow) {
                    itemsToShow = newItemsToShow;
                    visibleItems = Math.min(visibleItems, itemsToShow);
                    updateVisibleItems();
                }
            }, 250);
        });
    }
    
    // Initialize testimonials carousel
    function initTestimonialsCarousel() {
        const track = document.querySelector('.testimonials-track');
        const cards = Array.from(track.querySelectorAll('.testimonial-card'));
        const prevButton = document.querySelector('.testimonial-button.prev');
        const nextButton = document.querySelector('.testimonial-button.next');
        let currentIndex = 0;

        if (!track || !cards.length || !prevButton || !nextButton) return;

        function updateButtons() {
            prevButton.disabled = currentIndex <= 0;
            nextButton.disabled = currentIndex >= cards.length - 1;
            prevButton.style.opacity = currentIndex <= 0 ? '0.15' : '1';
            nextButton.style.opacity = currentIndex >= cards.length - 1 ? '0.15' : '1';
        }

        function scrollToCard(index) {
            currentIndex = Math.max(0, Math.min(index, cards.length - 1));
            const card = cards[currentIndex];
            const trackRect = track.getBoundingClientRect();
            const cardRect = card.getBoundingClientRect();
            const scrollLeft = track.scrollLeft + (cardRect.left - trackRect.left);
            
            track.scrollTo({
                left: scrollLeft,
                behavior: 'smooth'
            });
            
            updateButtons();
        }

        // Handle button clicks
        prevButton.addEventListener('click', () => {
            if (currentIndex > 0) {
                scrollToCard(currentIndex - 1);
            }
        });

        nextButton.addEventListener('click', () => {
            if (currentIndex < cards.length - 1) {
                const newIndex = currentIndex + 1;
                const card = cards[newIndex];
                track.scrollLeft = card.offsetLeft - track.offsetLeft;
                currentIndex = newIndex;
                updateButtons();
            }
        });

        // Handle scroll events
        let scrollTimeout;
        track.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const trackRect = track.getBoundingClientRect();
                let nearestIndex = 0;
                let minDistance = Infinity;

                cards.forEach((card, index) => {
                    const cardRect = card.getBoundingClientRect();
                    const distance = Math.abs(cardRect.left - trackRect.left);
                    if (distance < minDistance) {
                        minDistance = distance;
                        nearestIndex = index;
                    }
                });

                if (nearestIndex !== currentIndex) {
                    currentIndex = nearestIndex;
                    updateButtons();
                }
            }, 100);
        });

        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                scrollToCard(currentIndex);
            }, 100);
        });

        // Initialize
        updateButtons();
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

    // Add to scroll event
    window.addEventListener('scroll', () => {
        handleHeroButtonsVisibility();
        animateOnScroll();
    });

    // Handle resize for responsive changes
    window.addEventListener('resize', handleHeroButtonsVisibility);
});
