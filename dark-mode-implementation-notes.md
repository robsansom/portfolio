# Implementing Basic Dark Mode with Toggle

**Overall Difficulty:** Moderate.

It's not extremely complex, especially since the site already uses CSS variables, which is a major advantage. However, it involves touching HTML, CSS, and JavaScript, and requires careful testing.

**Breakdown of Steps:**

1.  **CSS Modifications (The Core Styling):**
    *   **Identify Variables:** List all color-related variables in `:root` (`css/styles.css`). Examples: `--primary-color`, `--secondary-color`, `--background-light`, `--dark-gray`, `--border-color`, etc.
    *   **Define Dark Theme Selector:** Create a selector like `body.dark-mode` or `html[data-theme='dark']`.
    *   **Redefine Variables:** Inside the dark theme selector, redefine the color variables with their dark mode equivalents.
        ```css
        /* Example */
        body.dark-mode {
          --primary-color: #fff;    /* Was black */
          --secondary-color: #1a1a1a; /* Was white */
          --background-light: #121212; /* Was light gray */
          --text-color: #e0e0e0;   /* Was dark */
          --border-color: #333;    /* Was light gray */
          --dark-gray: #bbb;     /* Was dark gray */
          /* ... etc ... */
        }
        ```
    *   **Effort:** Design-intensive part - choosing good dark mode colors, ensuring readability/contrast. Check all elements visually.

2.  **HTML Modification (The Toggle):**
    *   **Add Button/Switch:** Add a toggle element (e.g., `<button id="theme-toggle">Toggle Theme</button>`) in `index.html` (usually header/nav).
    *   **Effort:** Very low.

3.  **JavaScript Modifications (The Logic):**
    *   **Theme Preference Detection:**
        *   Check `localStorage.getItem('theme')` on load.
        *   If no stored value, check `window.matchMedia('(prefers-color-scheme: dark)').matches`.
    *   **Initial Theme Application (Prevent FOIT):**
        *   Apply the theme (`dark-mode` class on `<body>`) based on detection *very early*. Often done with a small inline `<script>` in the `<head>`.
        ```html
        <!-- Example inline script in <head> -->
        <script>
          (function() {
            const theme = localStorage.getItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (theme === 'dark' || (!theme && prefersDark)) {
              document.documentElement.classList.add('dark-mode'); // Or body, depending on selector
            }
          })();
        </script>
        ```
    *   **Toggle Event Listener:**
        *   Get the toggle element (e.g., `document.getElementById('theme-toggle')`).
        *   Add a `click` event listener.
    *   **Handle Click:**
        *   Toggle the `dark-mode` class on the `<body>` (or `<html>`).
        *   Determine the new theme ('dark' or 'light').
        *   Save the new preference to `localStorage.setItem('theme', newTheme)`.
        *   (Optional) Update toggle appearance (icon change).
    *   **Effort:** Moderate. Handle `localStorage`, `matchMedia`, class toggling, and initial load logic carefully.

**Key Considerations:**

*   **Consistency:** Ensure all elements adopt the dark theme.
*   **Color Choices:** Select a good dark palette maintaining contrast and brand feel.
*   **Images/Icons:** Decide on handling images/icons (CSS `filter: invert(1)` might work for simple icons).
*   **FOIT (Flash of Incorrect Theme):** Use an inline script in `<head>` for initial theme application. 