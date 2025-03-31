class CTATextAnimation extends HTMLElement {
    constructor() {
        super();
        this.words = [
            'vision',
            'concept',
            'designs',
            'product',
            'brand',
            'interface',
            'UX',
            'research',
            'journeys',
            'prototype',
            'apps',
            'flows',
            'sites',
            'tools',
            'code',
            'style',
            'plan',
            'idea',
            'brief',
            'goals',
            'teams',
            'website',
            'ideas',
            'data',
            'business',
            'platform'
        ];
        this.currentWordIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.isPaused = true;
        this.animationTimeout = null;
        this.typingSpeed = 100;
        this.deletingSpeed = 60;
        this.pauseDuration = 2000;
    }

    connectedCallback() {
        this.setupAnimation();
        this.handleResize = this.handleResize.bind(this);
        window.addEventListener('resize', () => {
            clearTimeout(this.resizeTimeoutDebounce);
            this.resizeTimeoutDebounce = setTimeout(this.handleResize, 250);
        });
        this.handleResize();
    }

    disconnectedCallback() {
        clearTimeout(this.animationTimeout);
        clearTimeout(this.resizeTimeoutDebounce);
        window.removeEventListener('resize', this.handleResize);
    }

    setupAnimation() {
        // Create the HTML structure
        this.innerHTML = `
            <div class="cta-content">
                <h1>
                    <span class="cta-title">Let's bring your <span id="cta-flicker-word">vision</span> to life</span>
                </h1>
                <div class="hero-buttons">
                    <cta-button 
                        href="mailto:design@rsansom.co.uk" 
                        text="Get in Touch" 
                        button-class="btn-dark">
                    </cta-button>
                </div>
            </div>
        `;

        this.flickerElement = this.querySelector('#cta-flicker-word');
        if (this.flickerElement) {
            this.typeAndDeleteAnimation();
        }
    }

    handleResize() {
        clearTimeout(this.animationTimeout);
        this.animationTimeout = null;
        if (this.flickerElement) {
            this.flickerElement.textContent = this.words[0];
        }
        this.currentWordIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.isPaused = true;
        this.typeAndDeleteAnimation();
    }

    typeAndDeleteAnimation() {
        if (!this.flickerElement) {
            clearTimeout(this.animationTimeout);
            this.animationTimeout = null;
            this.currentWordIndex = 0;
            this.charIndex = 0;
            this.isDeleting = false;
            this.isPaused = true;
            return;
        }

        const currentWord = this.words[this.currentWordIndex];

        if (this.isPaused) {
            this.isPaused = false;
            this.isDeleting = true;
            this.charIndex = currentWord.length;
            this.animationTimeout = setTimeout(() => this.typeAndDeleteAnimation(), this.pauseDuration);
        } else if (this.isDeleting) {
            if (this.charIndex > 0) {
                this.flickerElement.textContent = currentWord.substring(0, this.charIndex - 1);
                this.charIndex--;
                this.animationTimeout = setTimeout(() => this.typeAndDeleteAnimation(), this.deletingSpeed);
            } else {
                this.isDeleting = false;
                this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
                this.charIndex = 0;
                this.animationTimeout = setTimeout(() => this.typeAndDeleteAnimation(), this.typingSpeed);
            }
        } else {
            const targetWord = this.words[this.currentWordIndex];
            if (this.charIndex < targetWord.length) {
                this.flickerElement.textContent = targetWord.substring(0, this.charIndex + 1);
                this.charIndex++;
                this.animationTimeout = setTimeout(() => this.typeAndDeleteAnimation(), this.typingSpeed);
            } else {
                this.isPaused = true;
                this.animationTimeout = setTimeout(() => this.typeAndDeleteAnimation(), this.pauseDuration);
            }
        }
    }
}

customElements.define('cta-text-animation', CTATextAnimation); 