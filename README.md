# iQ Cars — Official Automotive Dealership Platform

Modern luxury dealership platform for buying certified vehicles in Iraq, with multilingual support (Arabic, Kurdish Sorani, English), multi-currency pricing (USD & IQD), physical vehicle inspection certificate verification, and headless CMS integration with Sanity.

---

## Tech Stack
- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, Tailwind CSS v4, Lucide Icons
- **CMS:** Sanity.io (Headless Vehicle Inventory)
- **Package Manager:** `pnpm`

---

## Local Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## Deploying to Railway

1. **Push to GitHub**: Make sure the latest code is pushed to your repository.
2. **Open Railway**: Go to [railway.com](https://railway.com) and log in.
3. **New Project**: Click **"+ New Project"** $\rightarrow$ **"Deploy from GitHub repo"** $\rightarrow$ Select `MuhamadTAH/car-dealership`.
4. **Environment Variables**:
   In your Railway service $\rightarrow$ **Variables** tab, add:
   ```env
   NODE_ENV=production
   HOSTNAME=0.0.0.0
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
   SANITY_REVALIDATE_SECRET=your_secret_here
   ```
5. **Generate Public Domain**:
   In your Railway service $\rightarrow$ **Settings** $\rightarrow$ **Networking** $\rightarrow$ Click **"Generate Domain"** (e.g. `car-dealership-production.up.railway.app`).

Railway will automatically build using the included `Dockerfile` and go live.
