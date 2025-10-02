# Design Guidelines for Yona E-commerce Store

## Design Approach

**Selected Approach**: Reference-Based (E-commerce Leaders)
Drawing inspiration from modern DTC brands, Shopify storefronts, and Allbirds' clean aesthetic. This approach balances visual appeal with conversion-focused design patterns proven in e-commerce.

**Core Principle**: Create a premium, trustworthy shopping experience that showcases products beautifully while maintaining exceptional usability across all devices.

## Color Palette

**Light Mode**:
- Primary: 16 20% 15% (Deep charcoal - sophisticated, premium feel)
- Secondary: 210 15% 95% (Soft blue-grey - backgrounds, cards)
- Accent: 155 45% 45% (Muted sage green - CTAs, highlights)
- Success: 142 50% 45% (Forest green - success states)
- Background: 0 0% 100% (Pure white)
- Text Primary: 16 20% 15%
- Text Secondary: 16 10% 45%

**Dark Mode**:
- Primary: 155 40% 55% (Lighter sage - CTAs)
- Background: 16 25% 8% (Rich dark charcoal)
- Surface: 16 20% 12% (Elevated surfaces)
- Text Primary: 0 0% 95%
- Text Secondary: 0 0% 65%

## Typography

**Font Families** (via Google Fonts):
- Headings: 'Inter' - weights 600, 700, 800
- Body: 'Inter' - weights 400, 500, 600
- Accent/Product Names: 'DM Sans' - weights 500, 700

**Scale**:
- Hero Headline: text-5xl md:text-6xl lg:text-7xl (48-72px)
- Page Titles: text-3xl md:text-4xl (30-36px)
- Section Headers: text-2xl md:text-3xl (24-30px)
- Product Names: text-lg md:text-xl (18-20px)
- Body: text-base (16px)
- Small: text-sm (14px)
- Micro: text-xs (12px)

## Layout System

**Spacing Primitives**: Use Tailwind units 2, 4, 6, 8, 12, 16, 20, 24, 32
- Component padding: p-4, p-6, p-8
- Section spacing: py-16, py-20, py-24, py-32
- Grid gaps: gap-4, gap-6, gap-8
- Element margins: m-2, m-4, m-8

**Container Strategy**:
- Max width: max-w-7xl (1280px)
- Content sections: max-w-6xl
- Centered: mx-auto with px-4 sm:px-6 lg:px-8

**Grid Systems**:
- Product Grid: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
- Feature Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Mobile: Always single column below sm breakpoint

## Component Library

### Navigation
- Sticky header with backdrop blur (backdrop-blur-md bg-white/90)
- Logo left, navigation center, cart/search right
- Mobile: Hamburger menu with slide-in drawer
- Search bar with autocomplete suggestions
- Cart icon with item count badge
- Category mega-menu on hover (desktop)

### Hero Section
- Full-width hero with large product lifestyle image
- Height: 85vh on desktop, 60vh on mobile
- Overlay gradient for text legibility
- Bold headline with CTA button (primary accent color)
- Secondary CTA with outline style and backdrop blur

### Product Cards
- Clean white cards with subtle shadow (shadow-sm hover:shadow-xl transition)
- Product image with 4:5 aspect ratio
- Quick view on hover (desktop) with "Add to Cart" button
- Product name, price, rating stars
- Wishlist heart icon (top right)
- Rounded corners: rounded-lg

### Product Detail Page
- 2-column layout: Image gallery left (60%), details right (40%)
- Sticky product details on scroll
- Image gallery with thumbnails and zoom functionality
- Size/variant selector with visual swatches
- Quantity selector with +/- buttons
- Large "Add to Cart" button
- Accordion for description, shipping, reviews
- "You May Also Like" section at bottom

### Shopping Cart
- Slide-in drawer from right (desktop and mobile)
- Product thumbnail, name, price, quantity controls
- Remove item (X icon)
- Subtotal with prominent "Checkout" button
- Free shipping progress bar
- Empty state with suggested products

### Footer
- 4-column layout on desktop, stacked on mobile
- Columns: Shop, About, Support, Newsletter
- Newsletter signup with email input and button
- Social media icons (Instagram, Facebook, Twitter)
- Payment method icons (Visa, Mastercard, PayPal, etc.)
- Copyright and legal links

## Animations & Interactions

**Minimal, Purposeful Motion**:
- Product card hover: Scale image slightly (scale-105), elevate shadow
- Button hover: Subtle background darkening
- Page transitions: Fade in content on load
- Add to cart: Brief scale animation on cart icon
- NO carousel auto-play, NO parallax scrolling

**Transitions**: Use transition-all duration-300 ease-in-out for most interactions

## Responsive Strategy

**Breakpoints**:
- Mobile: < 640px (base)
- Tablet: 640px - 1024px (sm/md)
- Desktop: > 1024px (lg/xl)

**Mobile Optimizations**:
- Hamburger navigation
- Stacked layouts (no side-by-side on mobile)
- Larger touch targets (min 44px height for buttons)
- Bottom-fixed "Add to Cart" bar on product pages
- Swipeable product image galleries

## Images

**Hero Image**: Large, aspirational lifestyle image showing Yona products in use (e.g., person wearing/using products in beautiful natural setting). High-quality, professional photography. Position: Full-width, 85vh height.

**Product Images**: Clean, white-background product shots with consistent lighting. Multiple angles available in gallery. Aspect ratio 4:5 for consistency.

**Category Banners**: Smaller lifestyle images (16:9 aspect ratio) for category navigation tiles.

**About/Story Section**: Authentic behind-the-scenes or brand story imagery.

## Page-Specific Guidelines

### Homepage
1. Hero with large image and primary CTA
2. Featured product grid (3-4 products)
3. Category showcase (3 tiles with images)
4. Benefits/USP section (3 columns: Free Shipping, Easy Returns, Quality Guarantee)
5. Testimonials carousel (3 visible on desktop)
6. Instagram feed section (6 images in grid)
7. Newsletter signup banner

### Product Catalog
- Filter sidebar (left, collapsible on mobile)
- Sort dropdown (top right)
- Grid/List view toggle
- Pagination or infinite scroll
- "Showing X of Y products" indicator

### Checkout Flow
- Multi-step indicator (Cart → Shipping → Payment → Confirm)
- Clean, minimal design focused on form completion
- Inline validation with helpful error messages
- Trust badges near payment section

## Distinctive Design Elements

- Rounded product cards with generous whitespace
- Sage green accent color for a fresh, sustainable brand feel
- Large, immersive product photography
- Minimal text overlays on images
- Clean, sans-serif typography throughout
- Subtle micro-interactions (no distracting animations)
- Mobile-first responsive design with touch-optimized interfaces

This design creates a premium, conversion-focused e-commerce experience that feels completely fresh and modern - nothing like generic templates.