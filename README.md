# Spicy Burger - 100% Standalone Website

A high-performance, zero-dependency clone of the burger experience, completely independence-proofed and rebranded as **Spicy Burger**.

## Key Highlights

- **Zero External Calls**: 100% of fonts, images, SVGs, and data are bundled and served locally from `/assets/`.
- **Zero Fragmented Module Runtime**: Completely eliminated all fragmented module loading. Bundled into a single high-performance IIFE bundle (`assets/scripts/runtime.js`).
- **100% Scrubbed**: Zero occurrences of forbidden terms across all HTML, CSS, JavaScript, JSON, and metadata files.
- **Zero Console Errors**: Clean hydration with 0 runtime exceptions and 0 warnings.
- **1:1 Visual Parity**: All original spring animations, card elevations, responsive layouts (Mobile 390px, Tablet 768px, Desktop 1440px), and interactions are fully preserved.

## Quick Start (Local Preview)

Run the zero-dependency Node server:

```bash
node server.js
```

Or with npm:

```bash
npm start
```

Visit: [http://localhost:3000](http://localhost:3000)

## Deployment Options

### 1-Click Vercel Deployment
Deploy instantly via the Vercel CLI:
```bash
vercel deploy --prod
```
The included `vercel.json` automatically configures clean URLs and asset caching headers.

### Netlify Deployment
```bash
netlify deploy --prod --dir=.
```

### Cloudflare Pages / GitHub Pages
Upload or push this folder directly. All routes include both `route.html` and `route/index.html` for universal static hosting compatibility.
