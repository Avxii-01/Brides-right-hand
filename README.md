# Brides Right Hand — homepage preview
Open index.html, or upload the contents of this folder to a static host. HTML, styles and JavaScript are separate. No framework or build step is required.
----
Only the homepage is built. The four services are interactive, rentals use email availability requests, all inquiry buttons open an email to the supplied address, and the consultation link requests a free consultation by email (no scheduling service is connected). Instagram links to the supplied account; the photo strip is curated placeholder imagery, not a live Instagram feed.

This is a standalone frontend prototype, ready for later custom WordPress theme integration; it is not an installed WordPress theme. No payments are collected.

Before public launch: replace the five WebP placeholder images in assets with Christina's approved media and photographer credits. No real BRH video was supplied, so the hero uses a gently animated still. ASSET-SOURCES.json records the stock placeholders. They are inspiration images, not BRH portfolio or inventory claims. Add final logo, approved Facebook/TikTok URLs and legal pages when supplied. Confirm testimonial publication permission and attribution; supplied text and generic attributions are kept in app.js. Pricing is deliberately omitted pending confirmation.

Motion includes masked headline entrances, scroll-framed hero, image clip reveals, typographic rail, gallery hover, testimonial transitions and a desktop gallery cursor. Reduced-motion preference disables animated effects. Mobile uses native scrolling and a swipeable rental gallery.

## Editorial motion upgrade
V2 adds a pausable three-photo hero with dissolves and slow zoom, a scroll-framed hero and curved edge, staggered word masks, layered arched portrait/inset, opposed type rails, sticky desktop service chapters with changing photographs and jump links, signature parallax/thread, opposing rental-column movement, keyboard/mobile swipe gallery, editorial photo/quote composition, layered collage drift and rotating photo mats, floating inquiry photographs, scroll progress, magnetic desktop buttons and rolling button labels. All motion respects reduced-motion preference; hero autoplay pauses when the tab is hidden. Existing BRH wording, contact details and inquiry-only behavior remain.

References inspected: Leigh & Co., Lumene, EverVow, Dreamday and Wedora. The design takes inspiration from their full-image openings, curves, editorial typography and image-driven composition; this is original BRH implementation, not a claim to reproduce every animation exactly.

Validation: JavaScript syntax, local asset references and anchor targets checked. Desktop (1440px) and mobile (390px) viewport QA passed in Chromium with no JavaScript errors or horizontal overflow.


## Editorial motion upgrade V3
V3 keeps the approved BRH beige / black / white palette and Cormorant Garamond + Jost typography, then adds a scroll-driven word-opacity promise reveal, top-to-bottom image wipes, subtle opposing heading motion, a desktop sticky service-card stack, a sticky story title with scrolling gallery imagery, and a pausable autoplay photo ribbon. The existing pinned hero, curved transition, parallax, photo dissolve, button text roll and reduced-motion support remain. Native smooth scrolling is retained instead of a heavy inertial-scroll library to protect mobile usability and performance.
