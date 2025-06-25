/**
 * Lazy Loading Implementation for Portfolio Project Galleries
 * Loads images and videos as they approach the viewport
 */

class LazyLoader {
    constructor() {
        this.imageObserver = null;
        this.videoObserver = null;
        this.init();
    }

    init() {
        // Check for Intersection Observer support
        if ('IntersectionObserver' in window) {
            this.setupImageObserver();
            this.setupVideoObserver();
            this.observeElements();
        } else {
            // Fallback for older browsers - load all images immediately
            this.loadAllImages();
        }
    }

    setupImageObserver() {
        const imageObserverOptions = {
            root: null,
            rootMargin: '300px', // Start loading 300px before element enters viewport
            threshold: 0.01
        };

        this.imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    this.imageObserver.unobserve(entry.target);
                }
            });
        }, imageObserverOptions);
    }

    setupVideoObserver() {
        const videoObserverOptions = {
            root: null,
            rootMargin: '200px', // Load videos closer to viewport due to larger file sizes
            threshold: 0.01
        };

        this.videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadVideo(entry.target);
                    this.videoObserver.unobserve(entry.target);
                }
            });
        }, videoObserverOptions);
    }

    observeElements() {
        // Observe lazy images
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            // Add loading class immediately to show loading state
            img.classList.add('loading');
            this.imageObserver.observe(img);
        });

        // Observe lazy videos
        const lazyVideos = document.querySelectorAll('video[data-src]');
        lazyVideos.forEach(video => {
            // Add loading class immediately to show loading state
            video.classList.add('loading');
            this.videoObserver.observe(video);
        });
    }

    loadImage(img) {        
        // Create new image to preload
        const imageLoader = new Image();
        
        imageLoader.onload = () => {
            // Image loaded successfully
            img.src = img.dataset.src;
            img.classList.remove('loading');
            img.classList.add('loaded');
            
            // Remove data-src attribute
            delete img.dataset.src;
            
            // Add fade-in effect
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
            
            // Trigger fade-in
            requestAnimationFrame(() => {
                img.style.opacity = '1';
            });
        };
        
        imageLoader.onerror = () => {
            // Handle loading error
            img.classList.remove('loading');
            img.classList.add('error');
            console.warn('Failed to load image:', img.dataset.src);
        };
        
        // Start loading
        imageLoader.src = img.dataset.src;
    }

    loadVideo(video) {
        // Load video source
        const source = video.querySelector('source[data-src]');
        if (source) {
            source.src = source.dataset.src;
            delete source.dataset.src;
        }
        
        // Set video src if it has data-src directly
        if (video.dataset.src) {
            video.src = video.dataset.src;
            delete video.dataset.src;
        }
        
        // Load the video
        video.load();
        
        video.addEventListener('loadeddata', () => {
            video.classList.remove('loading');
            video.classList.add('loaded');
            
            // Add fade-in effect
            video.style.opacity = '0';
            video.style.transition = 'opacity 0.3s ease';
            
            requestAnimationFrame(() => {
                video.style.opacity = '1';
            });
        }, { once: true });
        
        video.addEventListener('error', () => {
            video.classList.remove('loading');
            video.classList.add('error');
            console.warn('Failed to load video:', source?.dataset.src || video.dataset.src || 'unknown source');
        }, { once: true });
    }

    loadAllImages() {
        // Fallback for browsers without Intersection Observer
        const lazyImages = document.querySelectorAll('img[data-src]');
        const lazyVideos = document.querySelectorAll('video[data-src]');
        
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            delete img.dataset.src;
            img.classList.remove('loading');
            img.classList.add('loaded');
        });
        
        lazyVideos.forEach(video => {
            const source = video.querySelector('source[data-src]');
            if (source) {
                source.src = source.dataset.src;
                delete source.dataset.src;
            }
            if (video.dataset.src) {
                video.src = video.dataset.src;
                delete video.dataset.src;
            }
            video.load();
            video.classList.remove('loading');
            video.classList.add('loaded');
        });
    }
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new LazyLoader();
});

// Also initialize if script loads after DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new LazyLoader();
    });
} else {
    new LazyLoader();
} 