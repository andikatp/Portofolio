# Creative Developer Portfolio

A modern, high-performance personal portfolio website built with **React 19**, **TypeScript**, **Vite 8**, **Tailwind CSS v4**, and **Framer Motion**. Features dynamic SVG page transitions, an interactive preloader, magnetic cursor interactions, an infinite project marquee, and Headless CMS integration with Contentful.

---

## ✨ Features

- **Dynamic Page Transitions**: Custom SVG arch ("u"-curtain shape) page transitions between routes using Framer Motion.
- **Interactive Preloader**: Animated introductory loader for seamless page initializations.
- **Magnetic UI Elements**: Cursor-reactive magnetic hover physics on interactive buttons and actions.
- **Interactive Work Marquee**: Dynamic infinite scrolling project showcase with drag/touch gesture controls for desktop and mobile.
- **Headless CMS (Contentful)**: Dynamic fetching of work entries, descriptions, tags, gallery media, and external URLs with local data fallbacks.
- **Background Location Routing**: React Router v7 background routing support for seamless project modal views and about drawer overlays.
- **Comprehensive Analytics & Performance**: Built-in integration for Google Analytics (GA4), Vercel Analytics, and Vercel Speed Insights.
- **Production Class Obfuscation**: Automated CSS class name obfuscation using `tailwindcss-obfuscator` during production builds.

---

## 🛠️ Tech Stack

- **Core**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/), `@fontsource-variable/inter`
- **Animation**: [Framer Motion / Motion v13](https://motion.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **CMS**: [Contentful SDK](https://www.contentful.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Linting & Compiler**: [Oxlint](https://oxc.rs/docs/guide/usage/linter.html), React Compiler (`babel-plugin-react-compiler`)

---

## 📁 Project Structure

```text
src/
├── assets/          # Static media and assets
├── components/      # Global layout & UI primitives
│   ├── analytics/   # GA4 analytics integration
│   ├── layout/      # Main layout wrappers & navbar
│   └── ui/          # Preloader, Page transition SVG, Magnetic elements
├── context/         # React Context (Page transition state management)
├── features/        # Feature-driven modules
│   ├── about/       # About section drawer & details
│   ├── contact/     # Contact page section
│   ├── hero/        # Hero section view & animations
│   └── works/       # Project marquee, detail modal, services & data
├── lib/             # Third-party service clients (Contentful, Analytics)
├── pages/           # Route views (HomePage, WorksPage, ContactPage)
└── utils/           # Utility functions & helpers
```

---

## ⚙️ Environment Variables

To configure optional Contentful CMS integration and Google Analytics tracking, create a `.env` file in the root directory:

```env
# Contentful Headless CMS (Optional - falls back to local data if omitted)
VITE_CONTENTFUL_SPACE_ID=your_space_id
VITE_CONTENTFUL_ACCESS_TOKEN=your_delivery_access_token

# Google Analytics GA4 (Optional - logs to console in development mode if omitted)
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

## 🚀 Getting Started

### 1. Installation

Install the project dependencies:

```bash
npm install
```

### 2. Development

Run the Vite development server locally:

```bash
npm run dev
```

### 3. Build & Production Preview

Compile TypeScript types and bundle the application for production (includes Tailwind class obfuscation):

```bash
npm run build
npm run preview
```

### 4. Code Quality & Linting

Run Oxlint for fast code analysis:

```bash
npm run lint
```

---

## 🌐 Deployment

This application is ready for deployment on [Vercel](https://vercel.com) or any modern static site hosting service.

When building on Vercel or locally, the production build automatically runs `tsc -b && vite build`, applying the React Compiler optimizations and obfuscating Tailwind CSS class names for production security and efficiency.
