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
    const itemsToShowPerClick = 4; // Show 4 items at a time
    const totalItems = portfolioItems.length;

    if (showMoreButton && portfolioItems.length > 0) {
        console.log('Portfolio initialization...', `Total items: ${totalItems}`);
        
        // First, hide all items
        portfolioItems.forEach(item => {
            item.style.display = 'none';
            item.classList.add('hidden');
        });
        
        // Then show first 4 items
        portfolioItems.slice(0, itemsToShowPerClick).forEach(item => {
            item.style.display = '';
            item.classList.remove('hidden');
        });

        // Show button only if there are more than 4 items
        const buttonWrapper = showMoreButton.closest('.btn-load-more');
        if (totalItems > itemsToShowPerClick) {
            if (buttonWrapper) {
                buttonWrapper.style.display = 'flex';
                buttonWrapper.style.justifyContent = 'center';
                buttonWrapper.style.marginTop = '2rem';
            }
            console.log(`Initially showing ${itemsToShowPerClick} items, ${totalItems - itemsToShowPerClick} items hidden`);
        } else {
            if (buttonWrapper) buttonWrapper.style.display = 'none';
            console.log('All items visible initially, hiding button');
        }

        let currentlyShown = itemsToShowPerClick;

        showMoreButton.addEventListener('click', () => {
            console.log('Show More button clicked.');
            
            // Calculate start and end indices for next batch
            const start = currentlyShown;
            const end = Math.min(currentlyShown + itemsToShowPerClick, totalItems);
            
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
    } else {
        console.log('Portfolio initialization skipped - missing button or no items');
        const buttonWrapper = showMoreButton?.closest('.btn-load-more');
        if (buttonWrapper) buttonWrapper.style.display = 'none';
    }
});
