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
    
    // Project Modal Functionality
    const modal = document.getElementById('projectModal');
    const modalContent = modal.querySelector('.modal-content');
    const modalClose = modal.querySelector('.modal-close');
    const modalOverlay = modal.querySelector('.modal-overlay');
    
    // Function to open modal
    function openModal(projectName) {
        // Show loading state
        modalContent.innerHTML = '<div class="modal-loader">Loading...</div>';
        
        // Show modal
        modal.classList.add('active');
        document.body.classList.add('modal-open');
        
        // Generate placeholder image based on project name
        const placeholderImageUrl = getPlaceholderImage(projectName);
        
        // Project descriptions
        const projectDescriptions = {
            'lseg': `LSEG (London Stock Exchange Group) is a leading global financial markets infrastructure and data provider. They deliver information, analytics, and technology solutions to customers around the world. LSEG needed a refined digital presence that would reflect their position as a trusted partner in the financial industry.

We partnered with LSEG to create a modern, professional digital experience that communicates their core values of integrity, innovation, and excellence. The design emphasizes clarity and accessibility, making complex financial information easy to navigate for their diverse user base of investors, financial professionals, and corporate clients.`,
            'utility': `Utility is a modern fintech platform that helps businesses streamline their financial operations through an intuitive dashboard and powerful API integrations. The company needed a brand identity and website that conveyed trust, innovation, and simplicity to appeal to both technical and non-technical decision-makers.

Our team created a comprehensive brand strategy and visual identity system that positioned Utility as a forward-thinking yet reliable financial partner. The website design focuses on clear communication of complex features through interactive demonstrations and simplified explanations. We also developed a component library for their marketing team to ensure brand consistency across all digital touchpoints.`,
            'closetnow': `ClosetNow is a direct-to-consumer fashion platform that connects users with personal stylists and provides on-demand wardrobe management. The startup needed a fresh, engaging brand and e-commerce experience to stand out in a competitive market.

We developed a vibrant, personality-driven brand identity that appeals to their target demographic of busy professionals. The website features an intuitive booking system, stylist profiles, and a seamless shopping experience. Our work included comprehensive user testing to optimize the conversion funnel and personalization features that enhance customer retention.`,
            'coast': `Coast is a revolutionary SaaS platform for the hospitality industry, providing hotels and resorts with a unified system for guest management, bookings, and operational efficiency. They approached us to create a brand and digital presence that would appeal to both independent boutique hotels and large hospitality groups.

Our team delivered a sophisticated brand identity that evokes the calm reliability of coastal environments while showcasing the platform's cutting-edge capabilities. The website architecture was designed to address the needs of different stakeholders, from property managers to corporate decision-makers. We also created a series of animated demonstrations that effectively communicate the platform's value proposition.`,
            'flex': `Flex is a workplace management solution that helps companies optimize their hybrid work environments through space booking, team coordination, and analytics. As a new entrant in a growing market, they needed a distinctive brand and product-focused website.

We created a dynamic, adaptable brand system that reflects the flexibility their product offers. The website design emphasizes user testimonials and interactive product tours to build credibility and demonstrate functionality. Our work included developing a comprehensive marketing strategy with content pillars and campaign frameworks to support their launch and ongoing growth.`,
            'midfunnel': `MidFunnel is a B2B marketing automation platform specializing in nurturing leads through the middle of the sales funnel with personalized content and engagement strategies. They needed a brand refresh and website that would position them as thought leaders in their niche.

Our approach focused on creating a sophisticated yet approachable brand identity that appeals to marketing directors and CMOs. The website architecture prioritizes educational content and clear demonstration of ROI, with case studies prominently featured. We also developed a content strategy and visual system for their resource library, webinars, and thought leadership materials.`
        };
        
        // Get project description or use a default
        const projectDescription = projectDescriptions[projectName] || 
            `This project showcases our work for ${projectName.charAt(0).toUpperCase() + projectName.slice(1)}, demonstrating our approach to brand development, website design, and digital strategy. We collaborated closely with the client to understand their unique challenges and create solutions that drive business results.`;
        
        // Create modal content with title at the top
        const content = `
            <div class="modal-project-title">
                ${projectName.charAt(0).toUpperCase() + projectName.slice(1)}
            </div>
            <div class="modal-project-content">
                <div class="modal-project-text">
                    ${projectDescription}
                </div>
                
                <div class="modal-project-metadata">
                    <div class="metadata-item">
                        <div class="metadata-label">Year</div>
                        <div class="metadata-value">2024</div>
                    </div>
                    <div class="metadata-item">
                        <div class="metadata-label">Engagement</div>
                        <div class="metadata-value">Ongoing</div>
                    </div>
                    <div class="metadata-item">
                        <div class="metadata-label">Workstreams</div>
                        <div class="metadata-value">Brand<br>Website<br>Development</div>
                    </div>
                </div>
                
                <div class="modal-project-images">
                    <div class="modal-project-image">
                        <img src="${placeholderImageUrl}" alt="${projectName} project image 1">
                    </div>
                    <div class="modal-project-image">
                        <img src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2000&auto=format&fit=crop" alt="${projectName} project image 2">
                    </div>
                    <div class="modal-project-image">
                        <img src="https://images.unsplash.com/photo-1481487196290-c152efe083f5?q=80&w=2000&auto=format&fit=crop" alt="${projectName} project image 3">
                    </div>
                    <div class="modal-project-image">
                        <img src="https://images.unsplash.com/photo-1434682881908-b43d0467b798?q=80&w=2000&auto=format&fit=crop" alt="${projectName} project image 4">
                    </div>
                </div>
            </div>
        `;
        
        // Update modal content
        modalContent.innerHTML = content;
        
        // Add a style element with an attribute so we can find it later
        const styleElement = document.createElement('style');
        styleElement.setAttribute('data-modal', 'true');
        styleElement.textContent = `
            .modal-project-title {
                font-size: 28px;
                font-weight: bold;
                margin-bottom: 30px;
                padding-bottom: 20px;
                border-bottom: 1px solid #eee;
                color: #000;
            }
            
            .modal-project-content {
                display: grid;
                grid-template-columns: 1fr;
                gap: 30px;
            }
            
            @media (min-width: 768px) {
                .modal-project-content {
                    grid-template-columns: 2fr 1fr;
                }
            }
            
            .modal-project-text {
                white-space: pre-line;
                line-height: 1.6;
            }
            
            .modal-project-metadata {
                display: grid;
                grid-template-columns: 1fr;
                gap: 20px;
            }
            
            .metadata-item {
                margin-bottom: 15px;
            }
            
            .metadata-label {
                font-weight: 600;
                margin-bottom: 5px;
                font-size: 14px;
                color: #666;
            }
            
            .metadata-value {
                font-size: 16px;
                line-height: 1.4;
            }
            
            .modal-project-images {
                grid-column: 1 / -1;
                display: grid;
                grid-template-columns: 1fr;
                gap: 20px;
                margin-top: 20px;
            }
            
            @media (min-width: 768px) {
                .modal-project-images {
                    grid-template-columns: repeat(2, 1fr);
                }
            }
            
            .modal-project-image {
                width: 100%;
                aspect-ratio: 16/9;
                overflow: hidden;
            }
            
            .modal-project-image img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: center;
            }
        `;
        document.head.appendChild(styleElement);
    }
    
    // Function to get placeholder image based on project name
    function getPlaceholderImage(projectName) {
        // Map of project names to placeholder image URLs
        // Using unsplash for high-quality placeholder images that match the project theme
        const placeholderImages = {
            'lseg': 'images/LSEG.png',
            'utility': 'images/TCS.png',
            'closetnow': 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2000&auto=format&fit=crop',
            'coast': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop',
            'flex': 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?q=80&w=2000&auto=format&fit=crop',
            'midfunnel': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop'
        };
        
        // Return the image URL for the project, or a default if not found
        return placeholderImages[projectName] || 'https://images.unsplash.com/photo-1481487196290-c152efe083f5?q=80&w=2000&auto=format&fit=crop';
    }
    
    // Function to close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
        
        // Remove any dynamically added styles
        const dynamicStyles = document.querySelectorAll('style[data-modal]');
        dynamicStyles.forEach(style => style.remove());
        
        // Clear content after animation completes
        setTimeout(() => {
            modalContent.innerHTML = '';
        }, 300);
    }
    
    // Add event listeners for project links
    document.querySelectorAll('.project-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const projectName = this.getAttribute('data-project');
            openModal(projectName);
        });
    });
    
    // Close modal when clicking the close button
    modalClose.addEventListener('click', closeModal);
    
    // Close modal when clicking the overlay
    modalOverlay.addEventListener('click', closeModal);
    
    // Close modal when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});
