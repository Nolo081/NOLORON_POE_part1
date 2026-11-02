//Changes will be made in here

Project description:

 NOLORON is a modern, high-end website designed for a multi versed technology enterprise from SA. Built on a clean off-white and deep charcoal look, the platform is created  to showcase software solutions, web development projects, cybersecurity, and infrastructure services with an emphasis on clarity, performance, and responsive layout architecture.

project plans:

The ultimate goal for NOLORON is to evolve  into a fully functional quality website. While current phases(part 1-2) focus on semantic multi-page HTML architecture and responsive CSS styling without JavaScript, future Parts will integrate interactive web features, dark mode toggling, dynamic portfolio filtering, and direct backend service request handlers.


1. Content Refinement
Company Profile Research: Conducted extended research to expand content copy across all pages (index.html, about.html, services.html, contact.html), detailing company history, service capabilities, and long-term vision.
Branding & Assets: Acquired and added updated high-resolution media assets, including the newly refreshed corporate logo (images/verygoodsolutions-logo.jpg) and system interface screenshots.
Resource Linking: Added live external project links and GitHub source code repositories into the portfolio.html architecture to provide verifiable proof of software development work.

2.  (CSS/style.css)
Changed the overall layout of the website in terms of the headers, grids, etc., added grids, forms, 
Header & Navigation Bar:
Glassmorphic Sticky Header:added fixed header placement (position: sticky) with background blur filters (backdrop-filter: blur(12px)).   
CSS
Navigation Links: Styled upper-case menu links with hover background highlights and structured spacing.   
CSS
Global Layout & Typography:
CSS Custom Properties (:root): Consolidated color schemes (--bg, --panel, --ink, --muted) for centralized theme management.   
CSS
Background Grid Pattern: Applied subtle linear-gradient background grid accents across all page bodies.   
CSS
Top-Box Sections: Designed eye catching lead banner layouts with large typography (clamp()) and call-to-action buttons.

Portfolio page: 
added
 custom showcase containers (.portfolio-card, .single-showcase, .logo-showcase) showing  side-by-side branding boxes, technical tags, highlight grids, and primary action buttons.   
CSS
Forms: added a structured contact form panel (.form-panel, .form-group) featuring custom input fields, focus states, dropdowns, textareas, and submit button styling.   
CSS
Footer:
Minimalist Footer: Formatted bottom footer bar with consistent typography, letter-spacing, and student identifier attribution.   
CSS
Responsiveness:
Media Queries: added  adjustments for screens under 900px, 850px, and 768px to convert complex multi-column grids and header alignments into touch-friendly layouts

Part 3 changes:

1. Form Validation & Asynchronous Submission (AJAX)
* included a custom JavaScript event handler for asynchronous form submissions via the FormSubmit AJAX endpoint without full-page reloads.
* Enforced HTML5 validation alongside custom Regular Expressions (`namePattern`) for input filtering.
* Implemented minimum character checks (10+ characters) on message fields to prevent blank/spam submissions.
* Added dynamic UI feedback states: button disabling during transmission (`"Sending..."`) and state restoration upon completion.

2.  Dark / Light Mode Theme Switching
* added a global theme system using CSS Custom Properties (`:root` variables) for easy color palette swapping.
* Custom-built an interactive SVG Light Bulb toggle button integrated cleanly within the site navigation bar with the help of ai.
* Implemented `localStorage` state persistence to preserve user theme selection across multi-page navigation.
* Designed separate background grid rules (`[data-theme="dark"] body`) ensuring crisp grid line visibility in dark mode while leaving standard light mode styles completely untouched.

 3. Search Engine Optimization (SEO) & Academic Compliance
* Applied `<title>` tags across all site pages (`index.html`, `about.html`, `services.html`, `portfolio.html`, `contact.html`).
* Comprehensive `<meta name="description">` and `<meta name="keywords">` optimization across all HTML heads.
* Verified proper semantic HTML structure and external JavaScript module linking (`js/script.js`).

-