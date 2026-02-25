# IZOQ Inlet — Merchant Payment Gateway

The merchant-facing application for the IZOQ payments ecosystem. Handles crypto payment acceptance, KYB/KYC verification, checkout configuration, and merchant wallet management.

## Pages
- **Dashboard** — Revenue stats, recent orders, chart
- **Transactions** — Full order history with on-chain proof
- **Checkout Builder** — Token whitelist, line items, 15-min rate lock preview
- **API & Integration** — API keys, webhooks, code snippet
- **Verification** — KYB/KYC via Sumsub (unlocks Merchant Wallet)
- **Merchant Wallet** — Generate or import multi-chain wallet (EVM, SOL, BTC, TRX)

## Tech Stack
- React 18
- Vite
- Pure CSS-in-JS (no Tailwind/Bootstrap)

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env
# Fill in your real API keys in .env

# 3. Run locally
npm run dev

# 4. Build for production
npm run build
```

## Deploy to Vercel (recommended)

1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → New Project → Import repo
3. Add your environment variables from `.env.example` in the Vercel dashboard
4. Click Deploy

## Environment Variables

See `.env.example` for all required keys:
- **Sumsub** — KYB/KYC verification
- **Smile ID / Dojah** — Nigeria identity verification
- **Alchemy** — Blockchain RPC
- **Flutterwave / Paystack** — NGN settlement
- **IZOQ Backend** — Core payment API

## Part of IZOQ Systems LTD
- Outlet (User Wallet): separate repo/deployment
- GitHub: [github.com/theboyega/IZOQ-Systems-LTD](https://github.com/theboyega/IZOQ-Systems-LTD)
