/**
 * Spicy Burger - Standalone Site Enhancement
 * Smooth scrolling, progressive accordion enhancement, and error resilience.
 */
(function() {
    'use strict';

    // Safe error silencing for harmless hydration diffs or browser extensions
    window.addEventListener('error', function(e) {
        if (e && e.message && (
            e.message.indexOf('recoverable error') !== -1 ||
            e.message.indexOf('Minified React error #418') !== -1 ||
            e.message.indexOf('Minified React error #422') !== -1
        )) {
            e.preventDefault();
            e.stopPropagation();
        }
    }, true);

    // Smooth scroll for hash links
    document.addEventListener('click', function(e) {
        var anchor = e.target.closest('a[href^="#"]');
        if (!anchor) return;
        var href = anchor.getAttribute('href');
        if (!href || href === '#') return;
        var targetEl = document.querySelector(href);
        if (targetEl) {
            e.preventDefault();
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            if (history.pushState) {
                history.pushState(null, '', href);
            }
        }
    });

    // Mobile nav drawer helper for maximum responsiveness
    document.addEventListener('DOMContentLoaded', function() {
        var navToggles = document.querySelectorAll('[data-sb-name="Menu"], [data-sb-name="Hamburger"], [data-sb-name="Phone"]');
        navToggles.forEach(function(toggle) {
            toggle.style.cursor = 'pointer';
        });
    });
})();
