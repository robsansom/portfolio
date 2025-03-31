class CTAButton extends HTMLElement {
    constructor() {
        super();
        console.log('CTAButton constructor called');
        this._logThemeVariables();
    }

    _logThemeVariables() {
        // Get CSS variables from root
        const rootStyles = getComputedStyle(document.documentElement);
        console.log('Theme Variables:', {
            primaryColor: rootStyles.getPropertyValue('--primary-color'),
            secondaryColor: rootStyles.getPropertyValue('--secondary-color'),
            accentColor: rootStyles.getPropertyValue('--accent-color'),
            isDarkMode: document.body.classList.contains('dark-mode')
        });
    }

    _logButtonStyles(buttonElement) {
        if (!buttonElement) return;
        
        const computedStyle = window.getComputedStyle(buttonElement);
        console.log('Button Computed Styles:', {
            backgroundColor: computedStyle.backgroundColor,
            color: computedStyle.color,
            border: computedStyle.border,
            boxShadow: computedStyle.boxShadow,
            opacity: computedStyle.opacity,
            transform: computedStyle.transform,
            transition: computedStyle.transition
        });

        // Log the full cascade of styles
        console.log('Button Style Cascade:', {
            element: buttonElement,
            classList: Array.from(buttonElement.classList),
            inlineStyles: buttonElement.style.cssText,
            computedBackgroundColor: computedStyle.getPropertyValue('background-color'),
            computedColor: computedStyle.getPropertyValue('color')
        });
    }

    connectedCallback() {
        console.log('CTAButton connected to DOM');
        this._logThemeVariables();
        this.render();
    }

    static get observedAttributes() {
        return ['href', 'text', 'button-class', 'pulse'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log('CTAButton attribute changed:', {
            name,
            oldValue,
            newValue,
            currentTheme: document.body.classList.contains('dark-mode') ? 'dark' : 'light'
        });
        if (oldValue !== newValue) {
            this.render();
        }
    }

    render() {
        console.log('CTAButton rendering with attributes:', {
            href: this.getAttribute('href'),
            text: this.getAttribute('text'),
            buttonClass: this.getAttribute('button-class'),
            pulseAnimation: this.hasAttribute('pulse'),
            currentTheme: document.body.classList.contains('dark-mode') ? 'dark' : 'light'
        });

        const href = this.getAttribute('href') || '#';
        const text = this.getAttribute('text') || 'Click Me';
        const buttonClass = this.getAttribute('button-class') || 'btn-dark';
        const pulseAnimation = this.hasAttribute('pulse');

        this.innerHTML = `
            <div class="cta-button-wrapper">
                <a href="${href}" class="btn ${buttonClass}">
                    ${text}
                    ${pulseAnimation ? `
                    <div class="cta-pulse-dot is-large">
                        <div class="cta-pulse"></div>
                    </div>
                    ` : ''}
                </a>
            </div>
        `;

        // Log styles after render
        requestAnimationFrame(() => {
            const buttonElement = this.querySelector('.btn');
            this._logButtonStyles(buttonElement);
        });

        // Double-check styles after a short delay to catch any post-render changes
        setTimeout(() => {
            const buttonElement = this.querySelector('.btn');
            console.log('Button styles after delay:', {
                element: buttonElement,
                isDarkMode: document.body.classList.contains('dark-mode'),
                themeVariables: {
                    primaryColor: getComputedStyle(document.documentElement).getPropertyValue('--primary-color'),
                    secondaryColor: getComputedStyle(document.documentElement).getPropertyValue('--secondary-color')
                }
            });
            this._logButtonStyles(buttonElement);
        }, 100);
    }
}

customElements.define('cta-button', CTAButton); 