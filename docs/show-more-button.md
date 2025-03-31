# Show More Button Implementation Documentation

## Overview
The "Show More" button implementation in the portfolio website consists of three main components:
1. HTML Structure
2. JavaScript Functionality
3. CSS Styling

## HTML Structure
```html
<div class="btn-load-more">
    <cta-button 
        text="Show More" 
        button-class="btn-dark"
        id="btn-show-more">
    </cta-button>
</div>
```

The button is implemented using a custom web component `<cta-button>` wrapped in a container with class `btn-load-more`. The button has:
- `text` attribute set to "Show More"
- `button-class` set to "btn-dark"
- `id` set to "btn-show-more"

## JavaScript Functionality

### Initialization
The functionality is initialized in `main.js` through the `initPortfolioLoadMore()` function:

```javascript
function initPortfolioLoadMore() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const loadMoreBtn = document.querySelector('.btn-load-more');
    
    // Determine number of items to show based on screen width
    function getItemsToShow() {
        return window.innerWidth <= 768 ? 2 : 4;
    }

    let itemsToShow = getItemsToShow();
    let visibleItems = itemsToShow;
}
```

### Core Functions
1. **updateVisibleItems()**
   - Controls which portfolio items are visible
   - Adds/removes 'hidden' class from items
   - Shows/hides the load more button based on remaining items

2. **showNextItems()**
   - Increases the number of visible items
   - Called when the button is clicked

### Event Listeners
1. Click event on the button to show more items
2. Resize event to adjust visible items based on screen width

## CSS Styling

### Button Container
```css
.btn-load-more {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    transform: scale(0.85);
}
```

### Button Styling
```css
.btn-show-more {
    background-color: var(--secondary-color);
    color: var(--primary-color);
    border: 1px solid var(--border-color);
    border-radius: 100px;
    font-size: 0.9rem;
    font-weight: 500;
    padding: 12px 24px;
    cursor: pointer;
    transition: all 0.25s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
    font-family: var(--font-display);
    margin-top: 20px;
}
```

### Hover Effects
```css
.btn-show-more:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.07);
    transform: translateY(-2px);
}
```

### Hidden Items
```css
.portfolio-item.hidden {
    display: none;
}
```

## Key Features
1. **Responsive Design**
   - Shows different number of items based on screen width
   - Mobile: 2 items initially
   - Desktop: 4 items initially

2. **Smooth Transitions**
   - Button has hover effects with shadow and transform
   - Uses CSS transitions for smooth animations

3. **Dynamic Visibility**
   - Button automatically hides when all items are shown
   - Items are hidden/shown using CSS display property

4. **Theme Integration**
   - Uses CSS variables for colors to support theming
   - Integrates with the site's design system

## Important Notes
1. The button styling is handled by both the custom `cta-button` component and additional CSS classes
2. The button uses the site's CSS variables for theming
3. The implementation includes responsive design considerations
4. The button's appearance is controlled by the `btn-dark` class
5. Transitions are handled by the `transition: all 0.25s ease` property

## Visibility Logic

### Initial State
```javascript
let itemsToShow = getItemsToShow(); // 2 on mobile, 4 on desktop
let visibleItems = itemsToShow;
```

### Visibility Control
The `updateVisibleItems()` function manages both the portfolio items and button visibility:

```javascript
function updateVisibleItems() {
    // 1. Control portfolio items visibility
    portfolioItems.forEach((item, index) => {
        if (index >= visibleItems) {
            item.classList.add('hidden');
        } else {
            item.classList.remove('hidden');
        }
    });

    // 2. Control button visibility
    if (visibleItems >= portfolioItems.length) {
        loadMoreBtn.style.display = 'none';  // Hide button when all items are shown
    } else {
        loadMoreBtn.style.display = 'block'; // Show button when there are more items
    }
}
```

### Show More Logic
When the button is clicked:
1. The `showNextItems()` function is called
2. It increases `visibleItems` by the current `itemsToShow` amount
3. `updateVisibleItems()` is called to:
   - Show the newly visible items
   - Hide the button if all items are now visible

### Responsive Behavior
The visibility logic adapts to screen size:
```javascript
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        const newItemsToShow = getItemsToShow();
        if (newItemsToShow !== itemsToShow) {
            itemsToShow = newItemsToShow;
            visibleItems = Math.min(visibleItems, itemsToShow);
            updateVisibleItems();
        }
    }, 250);
});
```

### Key Points
1. The button uses `display: none/block` for visibility toggling
2. Button visibility is controlled by JavaScript, not CSS
3. The button disappears completely when all items are shown
4. The number of visible items is maintained during screen resizes
5. A debounced resize handler prevents excessive updates 

## State and Styling Retention

### Component Structure
The button is implemented as a permanent custom web component with fixed attributes:
```html
<cta-button 
    text="Show More" 
    button-class="btn-dark"
    id="btn-show-more">
</cta-button>
```

### State Management
```javascript
// Core state variables
let itemsToShow = getItemsToShow();  // Base number to show (2 or 4)
let visibleItems = itemsToShow;      // Current number shown

// These variables ONLY track content state
// They do not affect button styling
```

### Style Preservation
1. **CSS Transitions**
```css
.btn-show-more {
    transition: all 0.25s ease;
    background-color: var(--secondary-color);
    color: var(--primary-color);
    border: 1px solid var(--border-color);
    /* other styles... */
}
```

2. **Binary Visibility**
```javascript
// The button is either fully visible or completely hidden
if (visibleItems >= portfolioItems.length) {
    loadMoreBtn.style.display = 'none';
} else {
    loadMoreBtn.style.display = 'block';
}
```

### Key Aspects of Style Retention
1. **No Class Manipulation**
   - The button maintains its original classes throughout
   - No classes are added or removed during expansion
   - Only portfolio items receive class changes

2. **Permanent Attributes**
   - `button-class="btn-dark"` remains constant
   - `text="Show More"` never changes
   - Component attributes are fixed

3. **Style Sources**
The button's appearance comes from three unchanging sources:
   - The `btn-dark` class
   - The custom component styles
   - The `.btn-show-more` class styles

4. **Theme Integration**
   - Uses CSS variables for colors
   - Inherits from the site's theme system
   - Variables update automatically with theme changes

### Why Styling Remains Consistent
1. Classes never change during interactions
2. Attributes remain constant
3. Uses CSS variables for theming
4. Binary visibility (show/hide) only
5. No intermediate states exist

### Potential Style Issues
If the button's appearance changes unexpectedly, check for:
1. CSS variable modifications
2. Unintended class additions/removals
3. Component re-rendering
4. Transition property overrides 

## Debugging Guide

### Console Logging Points
Add these logs to debug state changes:
```javascript
function updateVisibleItems() {
    console.log('Current visible items:', visibleItems);
    console.log('Total items:', portfolioItems.length);
    console.log('Button display state:', loadMoreBtn.style.display);
    
    portfolioItems.forEach((item, index) => {
        if (index >= visibleItems) {
            item.classList.add('hidden');
        } else {
            item.classList.remove('hidden');
        }
    });
}
```

### Style Inspection
Check these in DevTools:
1. Computed styles tab for:
   - `background-color`
   - `color`
   - `border-color`
   - `transition`
2. Elements panel for:
   - Applied classes
   - Inline styles
   - Inherited CSS variables

### Common Issues and Solutions
1. **Button Style Changes After Click**
   ```javascript
   // Add this to prevent any class changes
   loadMoreBtn.addEventListener('click', (e) => {
       e.preventDefault();
       e.stopPropagation();
       showNextItems();
   });
   ```

2. **Transition Glitches**
   ```css
   /* Force hardware acceleration */
   .btn-show-more {
       transform: translateZ(0);
       backface-visibility: hidden;
       perspective: 1000px;
   }
   ```

## CSS Variable Inheritance

### Variable Flow
```css
:root {
    /* Light theme defaults */
    --secondary-color: #ffffff;
    --primary-color: #000000;
    --border-color: #e0e0e0;
}

body.dark-mode {
    /* Dark theme overrides */
    --secondary-color: #1a1a1a;
    --primary-color: #ffffff;
    --border-color: #333333;
}

/* Button inherits from current theme */
.btn-show-more {
    background-color: var(--secondary-color);
    color: var(--primary-color);
    border-color: var(--border-color);
}
```

### Variable Usage in Component
The `cta-button` component should:
1. Not define its own color variables
2. Always inherit from parent theme
3. Use the same variable names consistently

## Component Lifecycle

### Initialization
```javascript
// In cta-button.js
class CTAButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        // Important: Don't add/remove classes here
    }

    render() {
        // Use attributes, don't modify them
        const buttonClass = this.getAttribute('button-class');
        const text = this.getAttribute('text');
        // ...
    }
}
```

### State Preservation
The component should:
1. Never modify its own attributes
2. Not maintain internal state
3. Rely on parent for state management

### Event Handling
```javascript
// In main.js
const button = document.querySelector('#btn-show-more');
button.addEventListener('click', (e) => {
    // Prevent any default styling
    e.preventDefault();
    // Stop event from bubbling
    e.stopPropagation();
    // Handle the click
    showNextItems();
});
```

## Testing Checklist
1. **Initial Load**
   - [ ] Button has correct dark/light theme styles
   - [ ] No unwanted transitions on page load
   - [ ] Correct number of items visible

2. **Click Interaction**
   - [ ] Button style remains consistent
   - [ ] Smooth transition of new items
   - [ ] No flickering or style changes

3. **Theme Switch**
   - [ ] Button updates to new theme colors
   - [ ] Transitions remain smooth
   - [ ] No loss of state

4. **Responsive**
   - [ ] Correct items shown on mobile/desktop
   - [ ] Button position remains centered
   - [ ] No style breaks at breakpoints 

## Animation and Transition Behavior

### Animation Stack
```css
/* Base transitions */
.btn-show-more {
    transition: all 0.25s ease;
}

/* Hover animation */
.btn-show-more:hover {
    transform: translateY(-2px);
}

/* Hardware acceleration */
.btn-show-more {
    transform: translateZ(0);
    will-change: transform;
}
```

### Animation Timing
1. **Button Hover**: 250ms ease
2. **Theme Switch**: Instant color change (no transition)
3. **Show/Hide**: No fade - instant display change

### Animation Priorities
```css
/* Override any unwanted transitions during theme switch */
.theme-switching .btn-show-more {
    transition: transform 0.25s ease !important;
    /* Only maintain hover animation during theme switch */
}
```

## Shadow DOM Considerations

### Component Encapsulation
```javascript
// cta-button.js
class CTAButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    // Critical: Style inheritance through shadow DOM
    get styleTemplate() {
        return `
            <style>
                :host {
                    display: inline-block;
                    /* Inherit colors from light/dark theme */
                    color: inherit;
                    background: inherit;
                }
                
                .btn {
                    /* Use CSS custom properties to penetrate shadow DOM */
                    background-color: var(--secondary-color, inherit);
                    color: var(--primary-color, inherit);
                    border-color: var(--border-color, inherit);
                }
            </style>
        `;
    }
}
```

### Theme Penetration
1. **CSS Custom Properties**
   - Pass through shadow DOM boundaries
   - Must be defined at `:root` or `body` level
   - Component must use `var()` syntax

2. **Inherited Properties**
   - `color`
   - `font-family`
   - `font-size`
   - Must be explicitly inherited

## Dark Mode Specific Issues

### Theme Transition Prevention
```css
/* Prevent transition during theme switch */
.btn-show-more {
    /* Remove transition for background/color during theme switch */
    transition: transform 0.25s ease;
    /* Specific properties instead of 'all' */
}

/* Re-enable all transitions after theme switch */
.btn-show-more:not(.theme-switching) {
    transition: all 0.25s ease;
}
```

### Color Inheritance Chain
```css
/* Theme colors must cascade properly */
:root {
    /* Base theme */
    --btn-dark-bg: #000000;
    --btn-dark-color: #ffffff;
}

body.dark-mode {
    /* Dark theme */
    --btn-dark-bg: #ffffff;
    --btn-dark-color: #000000;
}

/* Component specific variables */
.btn-dark {
    --component-bg: var(--btn-dark-bg);
    --component-color: var(--btn-dark-color);
}
```

### Shadow DOM Theme Sync
```javascript
// Ensure shadow DOM updates with theme changes
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class' &&
            mutation.target.classList.contains('dark-mode')) {
            // Force shadow DOM style update
            this.shadowRoot.host.style.display = 'none';
            this.shadowRoot.host.offsetHeight; // Force reflow
            this.shadowRoot.host.style.display = '';
        }
    });
});

observer.observe(document.body, {
    attributes: true
});
```

## Performance Considerations

### Memory Management
```javascript
// Clean up event listeners and observers
disconnectedCallback() {
    this.observer.disconnect();
    this.button.removeEventListener('click', this.handleClick);
}
```

### Render Optimization
```javascript
// Batch DOM updates
function updateVisibleItems() {
    // Create document fragment
    const fragment = document.createDocumentFragment();
    
    portfolioItems.forEach((item, index) => {
        if (index >= visibleItems) {
            item.classList.add('hidden');
        } else {
            item.classList.remove('hidden');
            fragment.appendChild(item);
        }
    });
    
    // Single reflow/repaint
    container.appendChild(fragment);
}
```

### Paint Performance
```css
/* Optimize compositing */
.btn-show-more {
    transform: translateZ(0);
    will-change: transform;
    /* Use opacity/transform for animations */
    /* Avoid animating layout properties */
}
```

## Browser Compatibility

### Feature Detection
```javascript
// Check for required features
const supportsCustomElements = 'customElements' in window;
const supportsShadowDOM = 'attachShadow' in Element.prototype;
const supportsAdoptedStyleSheets = 'adoptedStyleSheets' in Document.prototype;

// Fallback for older browsers
if (!supportsCustomElements) {
    // Provide alternative implementation
    class FallbackButton extends HTMLElement {
        // ...
    }
}
```

### CSS Fallbacks
```css
.btn-show-more {
    /* Modern browsers */
    background-color: var(--secondary-color);
    /* Fallback for older browsers */
    background-color: #ffffff;
    background-color: var(--secondary-color, #ffffff);
    
    /* Transform fallbacks */
    -webkit-transform: translateY(-2px);
    -moz-transform: translateY(-2px);
    transform: translateY(-2px);
}
```

## Advanced Troubleshooting

### Interactive Debug Console
```javascript
// Copy and paste into browser console
const ButtonDebugger = {
    init() {
        this.button = document.querySelector('#btn-show-more');
        this.container = document.querySelector('.btn-load-more');
        this.attachDebugListeners();
        this.createDebugDisplay();
        console.log('🔍 Button debugger initialized');
    },

    attachDebugListeners() {
        this.button.addEventListener('click', () => this.logState('click'));
        this.button.addEventListener('mouseover', () => this.logState('hover'));
        this.button.addEventListener('mouseout', () => this.logState('hover-out'));
    },

    logState(event) {
        const styles = window.getComputedStyle(this.button);
        console.group(`Button State: ${event}`);
        console.log('Display:', styles.display);
        console.log('Background:', styles.backgroundColor);
        console.log('Transform:', styles.transform);
        console.log('Opacity:', styles.opacity);
        console.groupEnd();
    },

    createDebugDisplay() {
        const display = document.createElement('div');
        display.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 10px;
            border-radius: 4px;
            font-family: monospace;
            z-index: 9999;
        `;
        document.body.appendChild(display);
        
        setInterval(() => {
            const styles = window.getComputedStyle(this.button);
            display.textContent = `
                Button State:
                Display: ${styles.display}
                BG: ${styles.backgroundColor}
                Transform: ${styles.transform}
                Theme: ${document.body.classList.contains('dark-mode') ? 'Dark' : 'Light'}
            `;
        }, 100);
    }
};

// Initialize debugger
ButtonDebugger.init();
```

### Theme Transition Tests
```javascript
// Test theme transitions
const ThemeTransitionTester = {
    async testTransitions() {
        console.group('Theme Transition Test');
        
        // Test 1: Quick theme toggle
        console.log('Test 1: Quick theme toggle');
        await this.toggleTheme();
        await this.wait(1000);
        await this.toggleTheme();
        
        // Test 2: Button hover during transition
        console.log('Test 2: Button hover during transition');
        this.simulateHover(true);
        await this.toggleTheme();
        await this.wait(500);
        this.simulateHover(false);
        
        // Test 3: Multiple rapid toggles
        console.log('Test 3: Rapid theme toggles');
        for(let i = 0; i < 3; i++) {
            await this.toggleTheme();
            await this.wait(200);
        }
        
        console.groupEnd();
    },
    
    async toggleTheme() {
        document.body.classList.toggle('dark-mode');
        return new Promise(resolve => setTimeout(resolve, 100));
    },
    
    simulateHover(hover) {
        const button = document.querySelector('#btn-show-more');
        const event = new MouseEvent(hover ? 'mouseover' : 'mouseout');
        button.dispatchEvent(event);
    },
    
    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
};

// Run transition tests
ThemeTransitionTester.testTransitions();
```

### Style Inheritance Validator
```javascript
// Validate style inheritance
const StyleValidator = {
    validateStyles() {
        const button = document.querySelector('#btn-show-more');
        const shadowRoot = button.shadowRoot;
        
        console.group('Style Inheritance Validation');
        
        // 1. Check CSS Custom Properties
        this.validateCustomProperties(button);
        
        // 2. Check Shadow DOM
        if (shadowRoot) {
            this.validateShadowDOM(shadowRoot);
        }
        
        // 3. Check Computed Styles
        this.validateComputedStyles(button);
        
        console.groupEnd();
    },
    
    validateCustomProperties(element) {
        const styles = getComputedStyle(element);
        const properties = [
            '--secondary-color',
            '--primary-color',
            '--border-color'
        ];
        
        console.group('CSS Custom Properties');
        properties.forEach(prop => {
            const value = styles.getPropertyValue(prop).trim();
            console.log(`${prop}:`, value || '❌ Not set');
        });
        console.groupEnd();
    },
    
    validateShadowDOM(shadowRoot) {
        const buttonElement = shadowRoot.querySelector('.btn');
        if (!buttonElement) {
            console.error('❌ Button element not found in shadow DOM');
            return;
        }
        
        const styles = getComputedStyle(buttonElement);
        console.group('Shadow DOM Styles');
        console.log('Background:', styles.backgroundColor);
        console.log('Color:', styles.color);
        console.log('Border:', styles.borderColor);
        console.groupEnd();
    },
    
    validateComputedStyles(element) {
        const styles = getComputedStyle(element);
        console.group('Computed Styles');
        [
            'display',
            'opacity',
            'transform',
            'transition',
            'backgroundColor',
            'color'
        ].forEach(prop => {
            console.log(`${prop}:`, styles[prop]);
        });
        console.groupEnd();
    }
};

// Run style validation
StyleValidator.validateStyles();
```

### Quick Fix Solutions

1. **Reset Button State**
```javascript
function resetButtonState() {
    const button = document.querySelector('#btn-show-more');
    button.style.cssText = '';  // Clear inline styles
    button.classList.remove('theme-switching');  // Remove any temporary classes
    document.body.classList.remove('theme-switching');  // Clean up theme switch class
    
    // Force repaint
    button.style.display = 'none';
    button.offsetHeight;
    button.style.display = '';
    
    console.log('Button state reset complete');
}
```

2. **Force Theme Update**
```javascript
function forceThemeUpdate() {
    const button = document.querySelector('#btn-show-more');
    const isDark = document.body.classList.contains('dark-mode');
    
    // Temporarily remove transitions
    button.style.transition = 'none';
    
    // Force update
    document.body.classList.remove('dark-mode');
    document.body.offsetHeight; // Force reflow
    if (isDark) {
        document.body.classList.add('dark-mode');
    }
    
    // Restore transitions
    setTimeout(() => {
        button.style.transition = '';
    }, 100);
    
    console.log('Theme update forced');
}
```

3. **Fix Shadow DOM Styles**
```javascript
function fixShadowDOMStyles() {
    const button = document.querySelector('#btn-show-more');
    if (!button.shadowRoot) return;
    
    const style = document.createElement('style');
    style.textContent = `
        :host {
            display: inline-block !important;
            opacity: 1 !important;
        }
        .btn {
            background-color: var(--secondary-color) !important;
            color: var(--primary-color) !important;
            border-color: var(--border-color) !important;
        }
    `;
    
    button.shadowRoot.appendChild(style);
    console.log('Shadow DOM styles fixed');
}
```

### Performance Monitoring

```javascript
const ButtonPerformanceMonitor = {
    init() {
        this.observer = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                console.log(`${entry.name}: ${entry.duration.toFixed(2)}ms`);
            });
        });
        
        this.observer.observe({ entryTypes: ['measure'] });
    },
    
    startMeasure(label) {
        performance.mark(`${label}-start`);
    },
    
    endMeasure(label) {
        performance.mark(`${label}-end`);
        performance.measure(label, `${label}-start`, `${label}-end`);
    },
    
    cleanup() {
        performance.clearMarks();
        performance.clearMeasures();
    }
};

// Usage example:
ButtonPerformanceMonitor.init();
ButtonPerformanceMonitor.startMeasure('theme-switch');
// ... theme switch occurs ...
ButtonPerformanceMonitor.endMeasure('theme-switch');
```