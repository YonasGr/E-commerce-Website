# Yona - Modern Premium E-commerce Store

<div align="center">

![Yona Logo](https://img.shields.io/badge/Yona-Premium_Accessories-155?style=for-the-badge&logo=shopping-cart&logoColor=white)

[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-4.21-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

**A modern, fully responsive e-commerce platform for premium accessories**

[Live Demo](#) • [Features](#-features) • [Installation](#-getting-started) • [Documentation](#-project-structure)

</div>

---

## 🌟 Overview

**Yona** is a cutting-edge e-commerce platform built with modern web technologies, designed to showcase and sell premium accessories including watches, sunglasses, and fashion items. The application features a clean, minimalist design with smooth animations, an intuitive shopping experience, and full dark mode support.

### ✨ Key Highlights

- 🎨 **Modern Design** - Clean, professional UI with sage green accents
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- 🌓 **Dark Mode** - Complete dark/light theme support
- 🛒 **Shopping Cart** - Real-time cart management with slide-in drawer
- ⚡ **Fast Performance** - Built with Vite for lightning-fast load times
- 🎯 **Type-Safe** - Full TypeScript implementation
- 🎭 **Interactive UI** - Smooth animations and micro-interactions

---

## 🚀 Features

### Customer Experience
- **Hero Section** - Stunning full-width hero with lifestyle imagery
- **Product Catalog** - Grid layout with hover effects and quick actions
- **Product Cards** - High-quality images, ratings, and wishlist functionality
- **Shopping Cart** - Slide-in cart drawer with quantity management
- **Category Browsing** - Visual category cards with product counts
- **Search Functionality** - Fast product search with autocomplete (coming soon)
- **Wishlist** - Save favorite items for later
- **Responsive Navigation** - Mobile-friendly hamburger menu

### Design & UX
- **Shadcn UI Components** - Premium, accessible component library
- **Smooth Animations** - Framer Motion powered interactions
- **Dark Mode** - System-aware theme switching
- **Loading States** - Skeleton screens and loading indicators
- **Toast Notifications** - User feedback for all actions

### Technical Features
- **Component-Based Architecture** - Reusable, maintainable code
- **Type Safety** - Full TypeScript coverage
- **State Management** - React hooks and context
- **Form Validation** - Zod schema validation
- **API Ready** - Backend routes prepared for integration
- **SEO Optimized** - Meta tags and semantic HTML

---

## 🛠️ Technology Stack

### Frontend
- **React 18.3** - Modern UI library
- **TypeScript 5.6** - Type-safe JavaScript
- **Vite 6.0** - Next-generation build tool
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Shadcn UI** - High-quality React components
- **Wouter** - Lightweight routing
- **Lucide React** - Beautiful icon library
- **TanStack Query** - Powerful data fetching

### Backend
- **Express.js** - Fast, minimalist web framework
- **TypeScript** - End-to-end type safety
- **Drizzle ORM** - TypeScript ORM for SQL databases
- **In-Memory Storage** - Fast development iteration

### Developer Experience
- **ESLint** - Code quality and consistency
- **Hot Module Replacement** - Instant development feedback
- **Path Aliases** - Clean import statements
- **Component Examples** - Visual component documentation

---

## 📦 Getting Started

### Prerequisites

- **Node.js** 20.x or higher
- **npm** 10.x or higher

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YonasGr/E-commerce-Website.git
   cd E-commerce-Website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   Navigate to http://localhost:5000
   ```

### Build for Production

```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
yona-ecommerce/
├── client/                    # Frontend application
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── ui/           # Shadcn UI primitives
│   │   │   ├── Header.tsx    # Navigation header
│   │   │   ├── Hero.tsx      # Hero section
│   │   │   ├── ProductCard.tsx
│   │   │   ├── CategoryCard.tsx
│   │   │   ├── CartDrawer.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── examples/     # Component previews
│   │   ├── pages/            # Application pages
│   │   │   ├── Home.tsx      # Homepage
│   │   │   └── not-found.tsx
│   │   ├── lib/              # Utilities
│   │   ├── hooks/            # Custom React hooks
│   │   ├── App.tsx           # Root component
│   │   └── index.css         # Global styles
│   └── index.html
├── server/                    # Backend application
│   ├── routes.ts             # API endpoints
│   ├── storage.ts            # Data layer
│   └── index.ts              # Server entry
├── shared/                    # Shared types & schemas
│   └── schema.ts
├── design_guidelines.md       # Design system documentation
└── README.md
```

---

## 🎨 Design System

Yona follows a carefully crafted design system with:

- **Color Palette**: Sage green primary (#6B9B7E), deep charcoal backgrounds
- **Typography**: Inter for UI, DM Sans for accents
- **Spacing**: Consistent 4px/8px grid system
- **Components**: Built on Shadcn UI with custom styling
- **Animations**: Subtle, purposeful motion design

See [design_guidelines.md](./design_guidelines.md) for complete design documentation.

---

## 🚧 Roadmap

### Phase 1: Core Features (Current)
- ✅ Homepage with hero section
- ✅ Product catalog and cards
- ✅ Shopping cart functionality
- ✅ Category browsing
- ✅ Dark mode support
- ✅ Responsive design

### Phase 2: Enhanced Shopping (Next)
- [ ] Product detail pages
- [ ] Advanced filtering and sorting
- [ ] Product search with autocomplete
- [ ] User reviews and ratings
- [ ] Wishlist persistence
- [ ] Product variants (sizes, colors)

### Phase 3: User Accounts
- [ ] User authentication
- [ ] Order history
- [ ] Saved addresses
- [ ] Profile management

### Phase 4: Checkout & Payments
- [ ] Multi-step checkout flow
- [ ] Stripe payment integration
- [ ] Order confirmation emails
- [ ] Invoice generation

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

---

## 👤 Author

**Yonas Girma**

- 🌐 GitHub: [@YonasGr](https://github.com/YonasGr)
- 📧 Email: yonasgirma222@gmail.com
- 💬 Telegram: [@x_Jonah](https://t.me/x_Jonah)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Shadcn UI](https://ui.shadcn.com/) - Amazing component library
- [Lucide Icons](https://lucide.dev/) - Beautiful icon set
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Vite](https://vitejs.dev/) - Lightning-fast build tool
- [Unsplash](https://unsplash.com/) - High-quality stock photography

---

## 📞 Support

If you encounter any issues or have questions:

- 📧 Email: yonasgirma222@gmail.com
- 💬 Telegram: [@x_Jonah](https://t.me/x_Jonah)
- 🐛 GitHub Issues: [Report a bug](https://github.com/YonasGr/E-commerce-Website/issues)

---

<div align="center">

**Built with ❤️ by Yonas Girma**

⭐ Star this repository if you found it helpful!

</div>
