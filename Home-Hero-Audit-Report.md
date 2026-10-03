# Home Page Hero Audit Report

**Scope:** Inspection of the Home route (`/`), its hero/first-frame sequence, the Garden route, and the related navigation. No website code was changed for this audit.

## Home page

- **Route:** `/`
- **Home file:** `app/page.tsx`
- **Framework/routing:** Next.js App Router; `app/page.tsx` defines `/`.
- **Main component:** `Home`
- **Hero component:** `ScrollCanvasBackground`
- **Hero file:** `components/ScrollCanvasBackground.tsx`
- **Rendering:** `app/page.tsx` imports and renders `ScrollCanvasBackground` directly inside `section#hero`.

## Current Home render order

```text
/
├── Navbar
└── main
    └── section#hero
        └── ScrollCanvasBackground
            └── .hero-sequence
                └── .hero-sticky
                    └── canvas.hero-canvas
```

There is no separate section after the hero in `app/page.tsx`. The canvas sequence itself remains scrollable and draws through 150 Frame 1 images as the user scrolls.

## Hero details

- **React child components inside Hero:** None. `ScrollCanvasBackground` renders wrapper `<div>` elements and a `<canvas>`.
- **Height:** Component inline styles set `.hero-sequence` to `800vh`; `app/globals.css` sets `.hero-sequence` to `400vh`. The inline component style takes precedence, so the rendered sequence is `800vh`. Its sticky canvas area is `100vh`.
- **Background:** A 2D canvas that draws image frames from `/frames/frame-001.jpg` through the Frame 1 sequence, with PNG fallback images if a JPG fails to load.
- **First frame artwork:** The school building/sign, bus, flags, landscaping, and sky are part of `public/frames/frame-001.jpg`.
- **Video:** None.
- **Overlay or gradient inside Hero:** None rendered by `ScrollCanvasBackground`. The `<main>` wrapper has a solid `#fbf9f5` background.
- **HTML heading or subtitle in Hero:** None. The school name visible in the first frame is part of the image artwork.
- **Hero CTA:** None within the hero canvas.
- **Navbar overlay:** `Navbar` is a fixed sibling preceding `<main>`. It displays the logo and school name, navigation, Contact and Apply Now links, and a responsive mobile menu. A fixed gold scroll-progress bar is also rendered by the Navbar.
- **Hero floating/decorative elements:** No separate floating elements in the hero markup; visible scenery is in the frame images.
- **Hero scroll indicator:** No dedicated down-arrow/prompt. The Navbar has a scroll-progress bar.

## Frame 2 and content after Hero

- **Frame 2 present on Home:** **NO**
- **Frame 2 component:** `SecondScrollSequence`
- **Frame 2 file:** `components/SecondScrollSequence.tsx`
- **Frame 2 content:** A separate scroll-driven canvas sequence using images in `/frame2/`.
- **Where rendered:** At the beginning of `app/garden/page.tsx`, not in `app/page.tsx`.
- **What appears after the Home hero:** No other rendered section. Scrolling through the hero changes the displayed Frame 1 image; the end of the sequence is the end of Home content.

## Home section check

| Content | Rendered on Home? |
|---|---|
| Navbar | YES |
| Hero / Frame 1 sequence | YES |
| Frame 2 | NO |
| School Intro | NO |
| School Life | NO |
| Programs / Academics | NO |
| Campus Experience / Facilities | NO |
| Statistics section | NO |
| Testimonials | NO |
| Final CTA / Admissions | NO |
| Footer | NO |

## Garden route

The render order from `app/garden/page.tsx` is:

```text
/garden
├── Navbar
└── main
    ├── SecondScrollSequence (Frame 2)
    ├── AboutOurSchoolSection (School Intro)
    ├── StudentLifeSection (School Life)
    ├── AcademicsSection (Programs / Academics)
    ├── FacilitiesSection (Campus / Facilities)
    ├── GallerySection
    ├── StudentReviewsSection (Testimonials)
    ├── AdmissionsSection (Final CTA)
    └── CinematicFooter
```

`AboutStats` exists as a reusable component, but it is not rendered by the Garden route. Therefore, there is no separate Statistics section in the current Garden render tree.

## Navbar and News route

- **Navbar label says “Garden” instead of “News”:** YES
- **Garden href:** `/garden`
- **Does `/news` exist?** No; requesting `/news` returned HTTP 404.
- **Navbar/footer references to `/news`:** None found in the inspected route/navigation files. The `NewsSection` component remains in the project but is not rendered as a `/news` route by the Home or Garden pages.

## Hero animation audit

- **GSAP / ScrollTrigger:** Not used by the Home hero.
- **Framer Motion:** Not used by the Home hero.
- **R3F / WebGL:** Not used; the hero uses a 2D canvas.
- **Video autoplay:** Not applicable; no video is rendered.
- **Hero entrance animation:** No separate hero entrance animation. The component preloads frame images and draws them to the canvas.
- **Text animation:** No hero text element is rendered; visible school lettering is part of the image artwork.
- **Image animation:** The canvas changes frames as scroll position changes.
- **Scroll-based animation:** Yes. Scroll progress maps to a target index in the 150-frame sequence. A `requestAnimationFrame` loop smooths the transition between target frames.
- **Mouse/pointer interaction:** None found in the Home hero component.
- **Mobile-specific animation:** No separate mobile frame sequence. Canvas sizing uses viewport dimensions and caps device pixel ratio at 2.
- **Reduced-motion handling:** No reduced-motion preference check in the Home hero component.

## Issues found

1. The Home hero is a scroll-driven 150-frame sequence, not a single static frame, although Frame 2 and all later sections are absent from the Home render tree.
2. The hero height is specified as both `400vh` in `app/globals.css` and `800vh` inline in `ScrollCanvasBackground`. The inline `800vh` value takes precedence in the rendered component.
3. The Garden route does not render a separate Statistics section; `AboutStats` is not imported there.
