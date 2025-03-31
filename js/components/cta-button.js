class CTAButton extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['href', 'text', 'button-class', 'pulse'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    render() {
        console.log('cta-button rendering...');
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
    }
}

customElements.define('cta-button', CTAButton); 