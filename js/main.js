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
    
    // Map of project IDs to their display titles
    const projectTitles = {
        'lseg': 'London Stock Exchange Group (LSEG)',
        'utility': 'TATA Consultancy Services - Interactive / W12 Studio',
        'closetnow': 'FLIR / Raymarine',
        'coast': 'dōTERRA',
        'flex': 'Lavanda',
        'midfunnel': 'Lloyds Bank',
        'corehr': 'CoreHR',
        'bcg': 'Boston Consulting Group - Digital Ventures',
        'monitise': 'Monitise',
        'edtech': 'EdTech'
    };
    
    // Function to open modal
    function openModal(projectName) {
        // Show loading state
        modalContent.innerHTML = '<div class="modal-loader">Loading...</div>';
        
        // Show modal
        modal.classList.add('active');
        document.body.classList.add('modal-open');
        
        // Reset scroll indicator visibility
        const scrollIndicator = modal.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.classList.remove('hidden');
        }
        
        // Generate placeholder image based on project name
        const placeholderImageUrl = getPlaceholderImage(projectName);
        
        // Get project title from mapping or fallback to capitalized project name
        const projectTitle = projectTitles[projectName] || projectName.charAt(0).toUpperCase() + projectName.slice(1);
        
        // Project descriptions
        const projectDescriptions = {
            'lseg': `London Stock Exchange Group (LSEG) is a leading global financial markets infrastructure and data provider. They deliver information, analytics, and technology solutions to customers around the world. LSEG needed a refined digital presence that would reflect their position as a trusted partner in the financial industry.

We partnered with LSEG to create a modern, professional digital experience that communicates their core values of integrity, innovation, and excellence. The design emphasizes clarity and accessibility, making complex financial information easy to navigate for their diverse user base of investors, financial professionals, and corporate clients.`,
            'utility': `TATA Consultancy Services - Interactive / W12 Studio is a global leader in IT services, consulting, and business solutions. They partner with the world's largest businesses in their transformation journeys. TCS needed a digital presence that would showcase their technological expertise and global reach.

Our team created a comprehensive digital strategy that positioned TCS as an innovative and reliable technology partner. The website design focuses on clear communication of their services and solutions through interactive demonstrations and case studies. We also developed a robust content strategy to highlight their thought leadership and industry expertise.`,
            'closetnow': `FLIR / Raymarine is a world-leading industrial technology company specializing in intelligent sensing solutions for defense and industrial applications. They needed a digital platform that would effectively communicate their advanced technological capabilities and diverse product portfolio.

We developed a sophisticated digital presence that showcases FLIR's innovative solutions and technical excellence. The website features intuitive product navigation, detailed technical specifications, and interactive demonstrations. Our work included optimizing the user experience for both technical professionals and procurement specialists.`,
            'coast': `dōTERRA is a global leader in essential oils and wellness products, committed to sharing pure essential oils with the world. They needed a digital experience that would reflect their commitment to purity, sustainability, and holistic wellness.

Our team created an engaging digital platform that brings dōTERRA's natural products to life. The website combines beautiful imagery with educational content, making essential oil benefits and uses accessible to everyone. We also developed an intuitive e-commerce experience that supports their global community of Wellness Advocates.`,
            'flex': `Lavanda is a leading property technology company that provides innovative solutions for the short-term rental and hospitality industry. They needed a digital platform that would showcase their advanced property management capabilities and appeal to property managers and enterprise clients.

We created a sophisticated digital experience that highlights Lavanda's innovative technology and industry expertise. The website design emphasizes their powerful features through interactive demonstrations and clear value propositions. Our work included developing a comprehensive content strategy to establish their thought leadership in the property technology space.`,
            'midfunnel': `Lloyds Bank, one of the UK's largest retail and commercial banks, needed a digital transformation of their business banking services. They sought to create an intuitive, secure platform that would serve their diverse business customer base.

We partnered with Lloyds Bank to develop a modern, user-centric digital banking experience. The design focuses on simplifying complex banking processes while maintaining the highest security standards. Our work included extensive user research and testing to ensure the platform meets the needs of businesses of all sizes.`,
            'corehr': `CoreHR is a leading provider of innovative HR technology solutions that streamline and modernize human resource management for organizations of all sizes. Their comprehensive platform needed a sophisticated digital presence that would showcase their cutting-edge capabilities while maintaining accessibility for HR professionals.

We collaborated with CoreHR to develop a refined brand identity and website that emphasizes their commitment to smarter HR technology. The design focuses on clear communication of complex features, intuitive navigation, and compelling demonstrations of their platform's capabilities. Our work helped position CoreHR as a trusted partner in HR digital transformation.`,
            'bcg': `Boston Consulting Group - Digital Ventures is the corporate innovation and digital business building arm of Boston Consulting Group. They partner with the world's most influential companies to build and scale groundbreaking businesses that deliver uncommon impact.

We worked closely with BCG DV to create a sophisticated and dynamic digital experience that showcases their unique approach to venture building and innovation. The design emphasizes their global reach, technological expertise, and commitment to transformative innovation.`,
            'monitise': `Monitise is a pioneering fintech company that revolutionizes mobile banking, payments, and commerce solutions. As a global leader in digital financial technology, they needed a sophisticated digital presence that would reflect their innovative approach and establish trust with financial institutions and end-users alike.

We collaborated with Monitise to create a refined and professional digital experience that emphasizes their technological leadership and security-first approach. The design showcases their comprehensive suite of mobile financial solutions while maintaining a clear, user-friendly interface. Our work helped strengthen their position as a trusted partner in digital financial services.`,
            'edtech': `Our EdTech client is transforming online learning through an adaptive learning platform that personalizes education for each student. They needed a scalable, engaging solution that would serve both institutional and individual learners.

We developed a modern, accessible learning management system that adapts to individual learning styles and pace. The platform incorporates gamification elements, progress tracking, and collaborative features to enhance engagement. Our design emphasizes clear navigation and mobile responsiveness to support learning anywhere.`
        };
        
        // Get project description or use a default
        const projectDescription = projectDescriptions[projectName] || 
            `This project showcases our work for ${projectName.charAt(0).toUpperCase() + projectName.slice(1)}, demonstrating our approach to brand development, website design, and digital strategy. We collaborated closely with the client to understand their unique challenges and create solutions that drive business results.`;
        
        // Create modal content with title at the top
        const content = `
            <div class="modal-project-title">
                ${projectTitle}
            </div>
            <div class="modal-project-content">
                <div class="modal-project-text">
                    <p style="font-size: 1.2rem !important;">
                        ${projectDescription}
                    </p>
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
                        <img src="${placeholderImageUrl}" alt="${projectName} project image 1" loading="lazy">
                    </div>
                    <div class="modal-project-image">
                        <img src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2000&auto=format&fit=crop" alt="${projectName} project image 2" loading="lazy">
                    </div>
                    <div class="modal-project-image">
                        <img src="https://images.unsplash.com/photo-1481487196290-c152efe083f5?q=80&w=2000&auto=format&fit=crop" alt="${projectName} project image 3" loading="lazy">
                    </div>
                    <div class="modal-project-image">
                        <img src="https://images.unsplash.com/photo-1434682881908-b43d0467b798?q=80&w=2000&auto=format&fit=crop" alt="${projectName} project image 4" loading="lazy">
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
                font-family: var(--font-display);
                font-size: 32px;
                font-weight: 600;
                margin-bottom: 30px;
                padding-bottom: 0;
                border-bottom: none;
                color: var(--text-color);
                letter-spacing: -0.01em;
            }
            
            .modal-project-text p {
                font-size: 1.2rem !important;
            }
            
            @media (max-width: 768px) {
                .modal-project-metadata {
                    flex-direction: column;
                }
                
                .metadata-item {
                    margin-right: 0;
                    margin-bottom: 20px;
                }
                
                .modal-project-title {
                    font-size: 28px;
                }
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
            'midfunnel': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop',
            'corehr': 'images/CoreHR.png',
            'bcg': 'images/BCG.png',
            'monitise': 'images/Monitise.png',
            'edtech': 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2000&auto=format&fit=crop'
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
    
    // Check if modal content is scrollable
    function checkModalScrollable() {
        const modalContainer = modal.querySelector('.modal-container');
        const scrollIndicator = modal.querySelector('.scroll-indicator');
        
        if (modalContainer.scrollHeight > modalContainer.clientHeight) {
            modalContainer.classList.add('scrollable');
            // Show scroll indicator only if content is scrollable
            if (scrollIndicator) {
                scrollIndicator.classList.remove('hidden');
            }
        } else {
            modalContainer.classList.remove('scrollable');
            // Hide scroll indicator if content is not scrollable
            if (scrollIndicator) {
                scrollIndicator.classList.add('hidden');
            }
        }
    }
    
    // Add event listeners for project links
    document.querySelectorAll('.project-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const projectName = this.getAttribute('data-project');
            openModal(projectName);
        });
    });
    
    // Add event listeners for modal
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    
    // Hide scroll indicator when user scrolls
    const modalContainer = modal.querySelector('.modal-container');
    modalContainer.addEventListener('scroll', function() {
        const scrollIndicator = modal.querySelector('.scroll-indicator');
        if (scrollIndicator && !scrollIndicator.classList.contains('hidden')) {
            scrollIndicator.classList.add('hidden');
        }
    });
    
    // Check if modal is scrollable after content is loaded
    modalContent.addEventListener('DOMSubtreeModified', function() {
        setTimeout(checkModalScrollable, 100); // Small delay to ensure content is rendered
    });
    
    // Check scrollable status on window resize
    window.addEventListener('resize', checkModalScrollable);
    
    // Close modal when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Text reveal animation
    const words = document.querySelectorAll('.reveal-text .word');
    let observer = new IntersectionObserver((entries) => {
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
});
