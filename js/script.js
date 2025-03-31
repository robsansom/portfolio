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

            applyTheme(newTheme); // Apply new theme and update images

            // Save the new theme preference to localStorage
            localStorage.setItem('theme', newTheme);
            console.log('Theme saved to localStorage:', newTheme);
        });
    } else {
        console.error('Theme toggle checkbox element not found!');
        // Still apply initial theme even if toggle is missing
        const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        applyTheme(savedTheme);
    }

    // --- Testimonial Carousel Logic ---
    // (Keep existing carousel logic here)
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

    // --- Other Initializations ---
    // (Keep any other existing JS logic here)

    // --- Portfolio Show More Logic ---
    const showMoreButton = document.getElementById('btn-show-more');
    const initialHiddenCount = document.querySelectorAll('.portfolio-item.hidden').length;
    const itemsToShowPerClick = 4; // How many items to reveal each time

    if (showMoreButton && initialHiddenCount > 0) {
        console.log('Show More button and hidden items found.');
        // Ensure button is visible initially if there are hidden items
        showMoreButton.style.display = 'inline-flex'; // Use appropriate display value for cta-button

        showMoreButton.addEventListener('click', () => {
            console.log('Show More button clicked.');
            const currentlyHiddenItems = document.querySelectorAll('.portfolio-item.hidden');
            
            // Reveal the next batch
            for (let i = 0; i < itemsToShowPerClick && i < currentlyHiddenItems.length; i++) {
                currentlyHiddenItems[i].classList.remove('hidden');
                console.log('Revealed item:', currentlyHiddenItems[i]);
            }

            // Check again if any items are still hidden
            const remainingHidden = document.querySelectorAll('.portfolio-item.hidden');
            if (remainingHidden.length === 0) {
                // Hide the button after showing all items
                showMoreButton.style.display = 'none'; 
                console.log('All hidden items shown, button hidden.');
            } else {
                 // Ensure opacity remains 1 after a short delay (using setTimeout)
                 setTimeout(() => {
                    showMoreButton.style.setProperty('opacity', '1', 'important');
                    console.log('Forcing opacity after delay');
                 }, 50); // 50ms delay
            }
        });
    } else if (showMoreButton) {
        // If button exists but no hidden items initially, hide the button
        showMoreButton.style.display = 'none'; 
        console.log('No hidden portfolio items found initially, hiding Show More button.');
    } else {
         console.log('Show More button not found.');
    }
}); 