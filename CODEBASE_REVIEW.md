# Codebase Review Summary

This document summarizes the structure and key features of the portfolio website codebase as of March 30, 2024.

*   **Project Type:** Static portfolio website built with HTML, CSS, and vanilla JavaScript.
*   **Structure:**
    *   Main Page: `index.html` (includes Header, Hero, Portfolio Grid, Testimonials, Project CTA, Desktop & Mobile Footers). Uses `<cta-button>` custom element.
    *   Styles:
        *   `css/styles.css`: Main stylesheet (>2300 lines). Contains base styles, CSS variables, styles for all `index.html` sections (Hero, Portfolio, Testimonials, CTA, Footers), project page styles (`.project-header`, `.project-content`, etc.), modal styles, extensive responsive rules (`@media`). Also includes styles for **unused sections** (Pricing, FAQ, Company Logos, Reputation) and potentially unused elements (CTA pulse dot, booking dot, testimonial dots).
        *   `css/components/cta-button.css`: Scoped styles for the custom `<cta-button>` component and its optional pulse animation. Appears consistent with general button styles in `styles.css`.
        *   `css/components/footer.css`: **Unused.** Contains styles for a different, grid-based footer structure (`.site-footer`, `.footer-content`) not implemented in `index.html`.
    *   JavaScript:
        *   `js/main.js`: Handles primary interactions. Includes:
            *   Hero section parallax effect.
            *   Hero button visibility logic for mobile.
            *   Smooth scrolling for anchor links (potentially redundant implementations).
            *   Portfolio "Show More" logic (targets `#btn-show-more` found in `index.html`).
            *   Testimonials carousel logic (implements non-circular scrolling, targets elements in `index.html`).
            *   Fade-in animations on scroll (`.fade-in` class applied to various elements).
            *   Text reveal animation (`.word.visible` logic).
            *   **Disabled/Commented-out code:** Mobile navigation toggle.
            *   **Unused code:** FAQ accordion logic (HTML section absent).
            *   **Potentially redundant/conflicting code:** Contains an alternative `initPortfolioLoadMore` function (targeting `.btn-load-more`, not present in HTML) and remnants of a different circular testimonial scroll logic.
        *   `js/components/cta-button.js`: Defines the `<cta-button>` custom HTML element (Web Component).
    *   Components:
        *   `components/cta-button.html`: File exists but is not directly referenced. The `<cta-button>` element is defined and rendered entirely via JS (`js/components/cta-button.js`). This HTML file might be a leftover artifact.
    *   Assets: `images/` directory.
    *   Portfolio Projects: Individual HTML pages in `work/` (e.g., `work/lseg.html`). Structure likely mirrors project styles defined in `styles.css`.
*   **Key Features & Implementation:**
    *   **Custom Component:** `<cta-button>` defined using vanilla JS Web Component API and styled via `cta-button.css` and potentially `styles.css`.
    *   **Styling:** Uses CSS variables, Google Fonts (Inter, Poppins), Font Awesome icons. `styles.css` is comprehensive but contains significant unused code. Separate desktop/mobile footers are implemented and styled within `styles.css`.
    *   **JavaScript (`main.js`):** Handles active interactions like smooth scroll, testimonials carousel, portfolio loading, and scroll-triggered animations. Contains noticeable legacy/unused/conflicting code.
    *   **Potential Redundancy/Legacy Code:**
        *   `css/components/footer.css` (unused).
        *   Styles in `styles.css` for sections not present in `index.html` (Pricing, FAQ, Company Logos, Reputation).
        *   Code in `js/main.js` related to non-existent HTML elements/sections (FAQ accordion, mobile nav toggle).
        *   Duplicate/conflicting logic in `js/main.js` for portfolio loading and testimonials carousel.
        *   Possible unused styles/elements: `.cta-pulse-dot` (if `pulse` attribute isn't used on buttons), `.booking-dot`, `.testimonial-dot`.
        *   `components/cta-button.html` file likely unused.
*   **Dependencies:** External CDN links for Google Fonts and Font Awesome. 