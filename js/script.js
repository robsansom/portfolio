document.addEventListener('DOMContentLoaded', () => {
    const flickerElement = document.getElementById('flicker-word');
    const desktopBreakpoint = 992;

    let animationTimeout = null;
    let words = ['for', 'with'];
    let currentWordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = true; // Start in paused state

    const typingSpeed = 100;   // Time between typing chars (ms)
    const deletingSpeed = 60;  // Time between deleting chars (ms)
    const pauseDuration = 2000; // Pause time after word is typed (ms)

    function typeAndDeleteAnimation() {
        // Stop if element doesn't exist
        if (!flickerElement) {
            clearTimeout(animationTimeout);
            animationTimeout = null;
            // Reset state if element disappears unexpectedly
            currentWordIndex = 0;
            charIndex = 0;
            isDeleting = false;
            isPaused = true;
            return;
        }

        const currentWord = words[currentWordIndex];

        if (isPaused) {
            // Stay paused, then start deleting
            isPaused = false;
            isDeleting = true;
            charIndex = currentWord.length; // Prepare to delete from end
            animationTimeout = setTimeout(typeAndDeleteAnimation, pauseDuration);
        } else if (isDeleting) {
            // Deleting characters
            if (charIndex > 0) {
                flickerElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                animationTimeout = setTimeout(typeAndDeleteAnimation, deletingSpeed);
            } else {
                // Finished deleting, switch to typing the next word
                isDeleting = false;
                currentWordIndex = (currentWordIndex + 1) % words.length; // Move to next word index
                charIndex = 0; // Start typing from beginning
                animationTimeout = setTimeout(typeAndDeleteAnimation, typingSpeed); // Short delay before typing starts
            }
        } else {
            // Typing characters
            const targetWord = words[currentWordIndex]; // Use the updated index
            if (charIndex < targetWord.length) {
                flickerElement.textContent = targetWord.substring(0, charIndex + 1);
                charIndex++;
                animationTimeout = setTimeout(typeAndDeleteAnimation, typingSpeed);
            } else {
                // Finished typing, enter pause state
                isPaused = true;
                animationTimeout = setTimeout(typeAndDeleteAnimation, pauseDuration);
            }
        }
    }

    function handleResize() {
        clearTimeout(animationTimeout); // Clear any pending animation step
        animationTimeout = null;
        if (flickerElement) {
             flickerElement.textContent = words[0]; // Reset text immediately
        }
       // Reset state
       currentWordIndex = 0;
       charIndex = 0;
       isDeleting = false;
       isPaused = true;

        // Restart animation chain regardless of width
        typeAndDeleteAnimation();
    }

    // Initial setup
    if (flickerElement) {
        handleResize(); // Initial check and start if needed

        let resizeTimeoutDebounce;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeoutDebounce);
            resizeTimeoutDebounce = setTimeout(handleResize, 250); // Debounce resize check
        });
    }

    // Dark Mode Implementation
    console.log('DOM Content Loaded'); // Initial load check

    // --- Helper Function to Update Project Images ---
    const updateProjectImages = (theme) => {
        const projectImages = document.querySelectorAll('.portfolio-image img');
        console.log(`Updating ${projectImages.length} project images for theme: ${theme}`);

        projectImages.forEach(img => {
            let currentSrc = img.src;
            let newSrc = currentSrc; // Default to current src

            // Ensure we're working with relative paths if possible for consistency
            // This part might need adjustment based on how src is resolved by the browser
            const url = new URL(currentSrc);
            const filename = url.pathname.substring(url.pathname.lastIndexOf('/') + 1);

            if (theme === 'dark') {
                // Change to dark version if not already dark
                if (!filename.includes('_dark.png') && filename.includes('.png')) {
                    newSrc = currentSrc.replace('.png', '_dark.png');
                    console.log(`Changing ${filename} to ${newSrc}`);
                }
            } else {
                // Change to light version if currently dark
                if (filename.includes('_dark.png')) {
                    newSrc = currentSrc.replace('_dark.png', '.png');
                    console.log(`Changing ${filename} back to ${newSrc}`);
                }
            }

            // Update src only if it changed
            if (newSrc !== currentSrc) {
                img.src = newSrc;
            }
        });
    };

    // --- Dark Mode Toggle Logic (Android Style) ---
    const themeToggleCheckbox = document.getElementById('theme-toggle-checkbox');
    const body = document.body;

    // Function to apply theme and update toggle/images
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            if (themeToggleCheckbox) themeToggleCheckbox.checked = true;
        } else {
            body.classList.remove('dark-mode');
            if (themeToggleCheckbox) themeToggleCheckbox.checked = false;
        }
        // Update project images based on the applied theme
        updateProjectImages(theme);
    };

    if (themeToggleCheckbox) {
        console.log('Theme toggle checkbox found:', themeToggleCheckbox);

        // Determine initial theme
        const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        console.log('Initial theme determined:', savedTheme);
        applyTheme(savedTheme); // Apply initial theme and update images

        // Listener for toggle changes
        themeToggleCheckbox.addEventListener('change', () => {
            console.log('Theme toggle changed!');
            const isDarkMode = themeToggleCheckbox.checked;
            const newTheme = isDarkMode ? 'dark' : 'light';
            console.log('New theme determined:', newTheme);

            // Save theme preference
            localStorage.setItem('theme', newTheme);
            console.log('Theme preference saved:', newTheme);

            // Apply the new theme
            applyTheme(newTheme);
        });

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {  // Only auto-switch if user hasn't manually set a preference
                const newTheme = e.matches ? 'dark' : 'light';
                console.log('System theme changed to:', newTheme);
                applyTheme(newTheme);
            }
        });
    } else {
        console.warn('Theme toggle checkbox not found!');
    }

    // Portfolio Show More Logic
    const showMoreButton = document.getElementById('btn-show-more');
    const portfolioItems = Array.from(document.querySelectorAll('.portfolio-item'));
    const isMobile = () => window.innerWidth <= 768;
    const getItemsToShow = () => isMobile() ? 2 : 4; // Show 2 on mobile, 4 on desktop
    const totalItems = portfolioItems.length;

    if (showMoreButton && portfolioItems.length > 0) {
        console.log('Portfolio initialization...', `Total items: ${totalItems}`);
        
        // First, hide all items
        portfolioItems.forEach(item => {
            item.style.display = 'none';
            item.classList.add('hidden');
        });
        
        let currentlyShown = getItemsToShow();
        
        // Show initial items based on device
        portfolioItems.slice(0, currentlyShown).forEach(item => {
            item.style.display = '';
            item.classList.remove('hidden');
        });

        // Show button only if there are more items to show
        const buttonWrapper = showMoreButton.closest('.btn-load-more');
        if (totalItems > currentlyShown) {
            if (buttonWrapper) {
                buttonWrapper.style.display = 'flex';
                buttonWrapper.style.justifyContent = 'center';
                buttonWrapper.style.marginTop = '2rem';
            }
            console.log(`Initially showing ${currentlyShown} items, ${totalItems - currentlyShown} items hidden`);
        } else {
            if (buttonWrapper) buttonWrapper.style.display = 'none';
            console.log('All items visible initially, hiding button');
        }

        showMoreButton.addEventListener('click', () => {
            console.log('Show More button clicked.');
            
            // Calculate start and end indices for next batch
            const itemsPerBatch = getItemsToShow(); // Get current batch size based on device
            const start = currentlyShown;
            const end = Math.min(currentlyShown + itemsPerBatch, totalItems);
            
            console.log(`Revealing items ${start} to ${end}`);
            
            // Reveal next batch of items
            portfolioItems.slice(start, end).forEach(item => {
                item.style.display = '';
                item.classList.remove('hidden');
            });
            
            // Update count of shown items
            currentlyShown = end;
            
            // Hide button if we've shown all items
            if (currentlyShown >= totalItems) {
                if (buttonWrapper) buttonWrapper.style.display = 'none';
                console.log('All items shown, hiding button');
            } else {
                console.log(`${totalItems - currentlyShown} items still hidden`);
            }
        });

        // Handle resize events to adjust visible items
        window.addEventListener('resize', () => {
            const newBatchSize = getItemsToShow();
            console.log(`Window resized, new batch size: ${newBatchSize}`);
            
            // Only readjust if we're showing the initial batch
            if (currentlyShown <= newBatchSize) {
                currentlyShown = newBatchSize;
                
                // Hide all items first
                portfolioItems.forEach(item => {
                    item.style.display = 'none';
                    item.classList.add('hidden');
                });
                
                // Show the correct number of items
                portfolioItems.slice(0, currentlyShown).forEach(item => {
                    item.style.display = '';
                    item.classList.remove('hidden');
                });
                
                // Update button visibility
                if (buttonWrapper) {
                    buttonWrapper.style.display = totalItems > currentlyShown ? 'flex' : 'none';
                }
            }
        });
    } else {
        console.log('Portfolio initialization skipped - missing button or no items');
        const buttonWrapper = showMoreButton?.closest('.btn-load-more');
        if (buttonWrapper) buttonWrapper.style.display = 'none';
    }

    // --- Testimonial Carousel Logic ---
    const testimonialsTrack = document.querySelector('.testimonials-track');
    const prevButton = document.querySelector('.testimonial-button.prev');
    const nextButton = document.querySelector('.testimonial-button.next');
    let testimonialCards = []; // Initialize as empty array

    if (testimonialsTrack) {
        testimonialCards = Array.from(testimonialsTrack.children); // Populate cards if track exists
        console.log(`Found ${testimonialCards.length} testimonial cards.`);
    }

    let currentScroll = 0;

    function updateButtons() {
        if (!prevButton || !nextButton || !testimonialsTrack) return;
        // Disable prev if at the beginning
        prevButton.disabled = currentScroll <= 0;
        // Disable next if at the end (or very close to it)
        // Add a small buffer (e.g., 5px) to account for fractional pixel values
        nextButton.disabled = currentScroll >= testimonialsTrack.scrollWidth - testimonialsTrack.clientWidth - 5;
        console.log(`Scroll: ${currentScroll}, Max: ${testimonialsTrack.scrollWidth - testimonialsTrack.clientWidth}, Prev: ${prevButton.disabled}, Next: ${nextButton.disabled}`);
    }

    if (prevButton && nextButton && testimonialsTrack && testimonialCards.length > 0) {
        console.log('Carousel buttons and track found.');
        prevButton.addEventListener('click', () => {
            // Calculate scroll amount based on the width of the first card + gap
            const cardWidth = testimonialCards[0].offsetWidth;
            const gap = parseInt(window.getComputedStyle(testimonialsTrack).gap) || 24; // Get gap or default
            const scrollAmount = cardWidth + gap;
            currentScroll = Math.max(0, currentScroll - scrollAmount);
            testimonialsTrack.scrollTo({
                left: currentScroll,
                behavior: 'smooth'
            });
            console.log('Prev button clicked, scrolling left.');
        });

        nextButton.addEventListener('click', () => {
            const cardWidth = testimonialCards[0].offsetWidth;
            const gap = parseInt(window.getComputedStyle(testimonialsTrack).gap) || 24;
            const scrollAmount = cardWidth + gap;
            const maxScroll = testimonialsTrack.scrollWidth - testimonialsTrack.clientWidth;
            currentScroll = Math.min(maxScroll, currentScroll + scrollAmount);
            testimonialsTrack.scrollTo({
                left: currentScroll,
                behavior: 'smooth'
            });
            console.log('Next button clicked, scrolling right.');
        });

        // Update buttons on scroll end (using a timeout to approximate)
        let scrollTimeout;
        testimonialsTrack.addEventListener('scroll', () => {
            currentScroll = testimonialsTrack.scrollLeft; // Update current scroll position
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                console.log('Scroll finished, updating buttons.');
                updateButtons();
            }, 150); // Adjust timeout as needed
        });

        // Initial button state update and on resize
        updateButtons();
        window.addEventListener('resize', () => {
            console.log('Window resized, updating buttons.');
            // Recalculate max scroll on resize might be needed if layout changes significantly
            updateButtons();
        });

    } else {
        console.warn('Testimonial carousel elements not found or no cards present.');
        // Optionally hide buttons if carousel isn't fully set up
        if (prevButton) prevButton.style.display = 'none';
        if (nextButton) nextButton.style.display = 'none';
    }
});
