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
});

// Mobile Testimonial Scroll Hint Animation
document.addEventListener('DOMContentLoaded', () => {
    const testimonialsSection = document.getElementById('testimonials');
    const firstTestimonialCard = document.querySelector('.testimonials-track .testimonial-card:first-child');

    if (!testimonialsSection || !firstTestimonialCard) {
        console.log('Testimonial elements not found for animation.');
        return; // Exit if elements aren't found
    }

    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the section is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            // Check if the section is intersecting and if we're on a mobile screen (<= 768px)
            if (entry.isIntersecting && window.innerWidth <= 768) {
                console.log('Testimonials in view on mobile, animating first card.');
                firstTestimonialCard.classList.add('animate-bounce-right');
                
                // Optional: Remove class after animation completes to allow re-triggering if needed,
                // or keep it to only run once ever per page load.
                // setTimeout(() => {
                //     firstTestimonialCard.classList.remove('animate-bounce-right');
                // }, 800); // Match animation duration

                // Stop observing after the first time it triggers
                observer.unobserve(testimonialsSection);
            }
        });
    };

    const intersectionObserver = new IntersectionObserver(observerCallback, observerOptions);

    // Delay observation slightly to ensure layout is stable
    setTimeout(() => {
        intersectionObserver.observe(testimonialsSection);
    }, 100);
}); 