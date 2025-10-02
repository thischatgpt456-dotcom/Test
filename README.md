# Future MD Academy — MCAT Tutoring (Next.js + Tailwind)

This is a ready-to-deploy Next.js project that contains your marketing site with animations (framer-motion), icons (lucide-react), and SEO tags (react-helmet).

## One‑time setup (local)
1. Install Node.js 18+ (https://nodejs.org/).
2. In a terminal:
   ```bash
   npm install
   npm run dev
   ```
   Visit http://localhost:3000

## Deploy on Vercel
1. Create a new **GitHub** repo (public or private).
2. Upload all files in this folder to that repo (or push via git).
3. In **Vercel**, choose “New Project” → import the GitHub repo.
4. Framework preset: **Next.js**. Keep defaults. Click **Deploy**.
5. After it builds, you’ll get a live URL.

### Notes
- The contact form uses Formspree. Edit `FORM_ENDPOINT` in `components/FutureMDAcademySite.jsx` with your real Formspree endpoint (https://formspree.io/forms).
- All styles are via Tailwind (already configured).
- If you want to use `next/head` instead of `react-helmet`, you can swap it later—this setup keeps your original code intact.
