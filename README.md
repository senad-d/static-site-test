# DimiMont Home‑Care Marketing Site

This is a statically exported [`Next.js`](https://nextjs.org) single‑page marketing site for **DimiMont Home‑Care**. It is built with the App Router, Tailwind CSS, and a small component system, and is intended to be deployed to static hosting (for example Vercel, Netlify, GitHub Pages, or similar).

The site focuses on:

- A **sticky global header** with navigation and theme toggle  
- A **hero section** highlighting the core value proposition  
- An **about section** describing DimiMont's approach  
- A **projects section** with real project case studies  
- A **contact section** with a Mailchimp‑backed "free estimate" form  
- A **footer** with branding and links  

Static HTML is generated at build time (`output: "export"`) so the site can be hosted from any static file host.

---

## Tech Stack

- **Framework:** [`next`](package.json:47) (App Router, React 19)
- **Language:** TypeScript [`tsconfig.json`](tsconfig.json)
- **Styling:** Tailwind CSS 4 [`tailwind.config.ts`](tailwind.config.ts), [`app/globals.css`](app/globals.css)
- **UI Components:** Radix UI primitives + a local UI kit in [`components/ui`](components/ui/button.tsx)
- **Theming:** `next-themes` & CSS variables, toggle in [`ThemeToggle`](components/layout/theme-toggle.tsx)
- **Forms & Validation:** `react-hook-form` + `zod` [`lib/validations.ts`](lib/validations.ts)
- **Email Marketing / Lead Capture:** Mailchimp via [`subscribeToAudience`](lib/mailchimp.ts:104)
- **Linting:** ESLint 9 [`eslint.config.mjs`](eslint.config.mjs)
- **Build tooling:** Static export via [`next.config.ts`](next.config.ts:3)

---

## Project Structure

High‑level structure of the repository:

```text
.
├─ app/
│  ├─ api/
│  │  └─ subscribe/
│  │     └─ route.ts        # POST /api/subscribe – calls Mailchimp helper
│  ├─ layout.tsx            # Root layout, fonts, providers
│  ├─ page.tsx              # Home page, assembles the sections
│  ├─ globals.css           # Global Tailwind / design tokens
│  └─ favicon.ico
│
├─ components/
│  ├─ layout/               # Layout & chrome components
│  │  ├─ container.tsx
│  │  ├─ logo.tsx
│  │  ├─ scroll-to-contact-cta.tsx
│  │  ├─ section-shell.tsx
│  │  ├─ site-footer.tsx
│  │  ├─ site-header.tsx
│  │  └─ theme-toggle.tsx
│  ├─ sections/             # Page sections
│  │  ├─ hero-section.tsx
│  │  ├─ about-section.tsx
│  │  ├─ projects-section.tsx
│  │  └─ contact-section.tsx
│  ├─ projects/
│  │  ├─ project-card.tsx
│  │  └─ project-gallery.tsx
│  └─ ui/                   # Reusable UI primitives
│     ├─ button.tsx
│     ├─ card.tsx
│     ├─ accordion.tsx
│     └─ ...many more
│
├─ hooks/
│  └─ use-mobile.ts         # Small viewport utilities
│
├─ lib/
│  ├─ mailchimp.ts          # Mailchimp audience subscription helper
│  ├─ projects.ts           # Project case study data
│  ├─ utils.ts              # Generic utility helpers
│  └─ validations.ts        # Zod schemas for forms
│
├─ public/
│  ├─ images/               # Branding and hero imagery
│  └─ project-images/       # Project case study photos
│
├─ types/                   # Ambient type declarations
│  ├─ mailchimp__mailchimp_marketing.d.ts
│  └─ react-resizable-panels.d.ts
│
├─ next.config.ts           # Next.js configuration (static export)
├─ tailwind.config.ts       # Tailwind configuration
├─ eslint.config.mjs        # ESLint configuration
├─ tsconfig.json            # TypeScript configuration
└─ package.json
```

The home page [`Home`](app/page.tsx:19) composes the main sections:

1. Sticky `SiteHeader` with navigation and theme toggle  
2. [`HeroSection`](components/sections/hero-section.tsx:12) with background image and CTA  
3. About section explaining the DimiMont approach  
4. [`ProjectsSection`](components/sections/projects-section.tsx) rendering project case studies from [`projects`](lib/projects.ts:11)  
5. Contact section with a Mailchimp‑backed form  
6. `SiteFooter` with branding and links  

---

## Running the Project Locally

### 1. Install dependencies

Use your preferred package manager in the project root:

```bash
npm install
# or
yarn
# or
pnpm install
# or
bun install
```

### 2. Start the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

The main page is defined in [`app/page.tsx`](app/page.tsx:1). Edits to components in `app/` or `components/` will hot‑reload automatically.

### 3. Lint

```bash
npm run lint
```

ESLint uses the configuration from [`eslint.config.mjs`](eslint.config.mjs).

---

## Static Export & Deployment

This project is configured for **static export** so it can be hosted from a plain file host or a static site platform.

[`next.config.ts`](next.config.ts:3) contains:

```ts
const nextConfig: NextConfig = {
  // Generate a static export in `out/`
  output: "export",

  // If you use next/image anywhere, you almost always need this for static hosting:
  images: {
    unoptimized: true,
  },
};
```

To create a static build:

```bash
npm run build        # next build
npx next export      # exports to ./out
```

or, if you prefer a single step via package.json, you can add a script such as:

```jsonc
{
  "scripts": {
    "export": "next build && next export"
  }
}
```

and then run:

```bash
npm run export
```

The generated `out/` directory can be deployed to:

- Vercel (static deployment)  
- Netlify  
- GitHub Pages  
- Any S3‑style object storage with static hosting  

### Deploying on Vercel

1. Push this repository to GitHub/GitLab/Bitbucket.
2. Import the project in Vercel.
3. Set the **framework** to Next.js.  
4. (Optional, but recommended) Set the following **build command** and **output directory** if you want pure static export:

   - Build Command: `npm run export`  
   - Output Directory: `out`  

5. Add the Mailchimp environment variables (see below).

For dynamic Next.js deployment on Vercel, you can also simply use `npm run build` and let Vercel handle the build without `next export`.

---

## Mailchimp Integration

Lead capture is handled via a small API route and a Mailchimp helper.

### Server‑side helper

[`subscribeToAudience`](lib/mailchimp.ts:104) is responsible for:

- Initializing the Mailchimp SDK with API key and server prefix  
- Computing a subscriber hash from email (`md5`)  
- Upserting a subscriber in the configured audience  
- Adding tags and merge fields (e.g. project description, locale)  
- Mapping Mailchimp errors into user‑friendly messages

Return type:

```ts
export type SubscribeResult = {
  success: boolean;
  message: string;
  errorCode?: SubscribeErrorCode;
};
```

Where [`SubscribeErrorCode`](lib/mailchimp.ts:16) can be one of:

- `"config_error"`
- `"invalid_email"`
- `"already_subscribed"`
- `"server_error"`

Errors are logged server‑side, but only safe messages are returned to the client.

### API Route

The API route [`app/api/subscribe/route.ts`](app/api/subscribe/route.ts) (not shown here) receives the form payload from the contact section, validates it with Zod [`lib/validations.ts`](lib/validations.ts), and calls [`subscribeToAudience`](lib/mailchimp.ts:104).

### Required environment variables

Configure these environment variables in your local `.env.local` and in your hosting provider:

```bash
MAILCHIMP_API_KEY=your-api-key
MAILCHIMP_SERVER_PREFIX=usX           # e.g. "us21"
MAILCHIMP_AUDIENCE_ID=your-audience-id
```

Without these, [`subscribeToAudience`](lib/mailchimp.ts:104) will return a `"config_error"` result and the API route will respond with an appropriate message.

---

## Content & Projects

Project data is stored in [`lib/projects.ts`](lib/projects.ts:11) as a typed array:

```ts
export type Project = {
  id: string;
  title: string;
  description: string;
  objectives: string;
  approach: string;
  results: string;
  imagePaths: string[];
};
```

Each project entry describes a real case study, for example:

- **Family Pergola Oasis in Primorsko‑goranska**  
- **Safer Balcony & Shutter Repair in Zagreb**  
- **Coastal Facade Refresh in Primorje**  
- **Multi‑Room Interior Refresh in Istria**

Images are served from [`public/project-images`](public/project-images/project1-1.jpg) and rendered via [`ProjectGallery`](components/projects/project-gallery.tsx) / [`ProjectCard`](components/projects/project-card.tsx).

Textual content (hero copy, about section, etc.) lives inside the section components in [`components/sections`](components/sections/hero-section.tsx).

---

## Styling & Theming

- Tailwind CSS 4 is configured in [`tailwind.config.ts`](tailwind.config.ts).
- Global styles (including base, components, and utilities layers) are defined in [`app/globals.css`](app/globals.css).
- Color theme and dark mode support are managed using `next-themes` in the layout and [`ThemeToggle`](components/layout/theme-toggle.tsx).
- Animations leverage `tw-animate-css` and Tailwind utility classes (for example the hero headline animation in [`HeroSection`](components/sections/hero-section.tsx:40)).

---

## Development Notes

- **TypeScript strictness:** Strict TypeScript settings are enabled in [`tsconfig.json`](tsconfig.json), so new code should be typed thoroughly.
- **Routing:** The app uses the Next.js App Router under `app/`. Additional pages or routes can be created by adding new segments in `app/`.
- **Client vs server components:**  
  - Layout, header, footer, and most sections are server components by default.  
  - Components that rely on hooks, browser APIs, or `next-themes` must include `"use client";` at the top.

When adding new UI components, prefer the existing patterns in [`components/ui`](components/ui/button.tsx) (variants, size props, etc.) for consistency.

---

## How to Extend

Some examples of how you might extend this project:

- Add more case studies to [`projects`](lib/projects.ts:11) and corresponding images in `public/project-images/`.
- Add new sections (e.g. FAQ, pricing, testimonials) by creating new components in [`components/sections`](components/sections/about-section.tsx) and wiring them into [`Home`](app/page.tsx:19).
- Integrate other analytics or contact solutions by adding additional API routes under `app/api/`.
- Customize the theme by updating CSS variables in [`app/globals.css`](app/globals.css) and the Tailwind config.

---

## License

This project is currently unlicensed. If you plan to reuse or open‑source it, add a license file (e.g. MIT) and update this section accordingly.