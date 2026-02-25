import { useState, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --bg: #050810;
    --surface: #0d1220;
    --surface2: #131928;
    --border: rgba(255,255,255,0.06);
    --accent: #00e5a0;
    --accent2: #0066ff;
    --accent3: #ff6b35;
    --text: #f0f4ff;
    --muted: #5a6580;
    --danger: #ff4757;
  }

  body {
    font-family: 'Syne', sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    overflow-x: hidden;
  }

  .mono { font-family: 'Space Mono', monospace; }

  /* Layout */
  .app { display: flex; min-height: 100vh; }

  /* Sidebar */
  .sidebar {
    width: 240px;
    background: var(--surface);
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100vh;
    z-index: 100;
    padding: 0;
  }

  .logo-wrap {
    padding: 28px 24px 24px;
    border-bottom: 1px solid var(--border);
  }

  .logo {
    font-size: 26px;
    font-weight: 800;
    letter-spacing: -1px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .logo-dot {
    width: 8px; height: 8px;
    background: var(--accent);
    border-radius: 50%;
    box-shadow: 0 0 12px var(--accent);
    animation: pulse 2s infinite;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(0.8); }
  }

  .logo-tag {
    font-size: 10px;
    color: var(--muted);
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-top: 2px;
  }

  .nav {
    padding: 16px 12px;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .nav-section {
    font-size: 9px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--muted);
    padding: 12px 12px 6px;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.15s;
    font-size: 14px;
    font-weight: 500;
    color: var(--muted);
    border: none;
    background: none;
    width: 100%;
    text-align: left;
  }

  .nav-item:hover { background: var(--border); color: var(--text); }
  .nav-item.active { background: rgba(0,229,160,0.1); color: var(--accent); }
  .nav-item.active .nav-icon { color: var(--accent); }

  .nav-icon { font-size: 16px; width: 20px; text-align: center; }

  .badge {
    margin-left: auto;
    background: var(--accent);
    color: var(--bg);
    border-radius: 10px;
    font-size: 10px;
    font-weight: 700;
    padding: 2px 7px;
  }

  .sidebar-footer {
    padding: 16px;
    border-top: 1px solid var(--border);
  }

  .user-chip {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    background: var(--surface2);
    border-radius: 10px;
    cursor: pointer;
  }

  .avatar {
    width: 32px; height: 32px;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 700;
    color: var(--bg);
    flex-shrink: 0;
  }

  .user-info { flex: 1; min-width: 0; }
  .user-name { font-size: 13px; font-weight: 600; }
  .user-role { font-size: 10px; color: var(--accent); letter-spacing: 1px; }

  /* Main content */
  .main {
    margin-left: 240px;
    flex: 1;
    padding: 32px 36px;
    max-width: calc(100vw - 240px);
  }

  .page-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 32px;
  }

  .page-title { font-size: 28px; font-weight: 800; letter-spacing: -0.5px; }
  .page-sub { font-size: 14px; color: var(--muted); margin-top: 4px; }

  /* Buttons */
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    border-radius: 8px;
    font-family: 'Syne', sans-serif;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s;
    border: none;
  }

  .btn-primary {
    background: var(--accent);
    color: var(--bg);
  }
  .btn-primary:hover { opacity: 0.85; transform: translateY(-1px); }

  .btn-ghost {
    background: var(--surface2);
    color: var(--text);
    border: 1px solid var(--border);
  }
  .btn-ghost:hover { border-color: rgba(255,255,255,0.15); }

  .btn-danger { background: rgba(255,71,87,0.15); color: var(--danger); border: 1px solid rgba(255,71,87,0.3); }

  /* Cards */
  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 24px;
  }

  .card-sm { padding: 16px 20px; }

  /* Stats Grid */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-bottom: 28px;
  }

  .stat-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 20px 24px;
    position: relative;
    overflow: hidden;
  }

  .stat-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
  }

  .stat-card.green::before { background: var(--accent); }
  .stat-card.blue::before { background: var(--accent2); }
  .stat-card.orange::before { background: var(--accent3); }
  .stat-card.purple::before { background: #a855f7; }

  .stat-label { font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 10px; }
  .stat-value { font-size: 28px; font-weight: 800; letter-spacing: -1px; }
  .stat-sub { font-size: 12px; color: var(--muted); margin-top: 4px; display: flex; align-items: center; gap: 4px; }
  .stat-up { color: var(--accent); }
  .stat-down { color: var(--danger); }

  /* Grid layouts */
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
  .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-bottom: 20px; }

  /* Table */
  .table-wrap { overflow-x: auto; }

  table { width: 100%; border-collapse: collapse; }
  thead tr { border-bottom: 1px solid var(--border); }
  th {
    text-align: left;
    padding: 10px 12px;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: var(--muted);
    font-weight: 600;
  }
  td { padding: 14px 12px; font-size: 14px; border-bottom: 1px solid rgba(255,255,255,0.03); }
  tbody tr:hover { background: rgba(255,255,255,0.02); }

  /* Token Badge */
  .token-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: var(--surface2);
    border-radius: 6px;
    padding: 4px 10px;
    font-size: 12px;
    font-weight: 700;
  }

  .token-dot { width: 6px; height: 6px; border-radius: 50%; }
  .eth-dot { background: #627eea; }
  .sol-dot { background: #9945ff; }
  .btc-dot { background: #f7931a; }
  .usdc-dot { background: #2775ca; }

  /* Status badge */
  .status {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.5px;
  }
  .status-confirmed { background: rgba(0,229,160,0.1); color: var(--accent); }
  .status-pending { background: rgba(247,147,26,0.1); color: #f7931a; }
  .status-failed { background: rgba(255,71,87,0.1); color: var(--danger); }

  /* Chain chip */
  .chain-chip {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    color: var(--muted);
    background: var(--surface2);
    padding: 3px 8px;
    border-radius: 4px;
    font-family: 'Space Mono', monospace;
  }

  /* Hash display */
  .hash { font-family: 'Space Mono', monospace; font-size: 11px; color: var(--muted); }
  .hash a { color: var(--accent2); text-decoration: none; }
  .hash a:hover { text-decoration: underline; }

  /* Section title */
  .section-title {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .section-title .see-all {
    font-size: 12px;
    color: var(--accent);
    cursor: pointer;
    font-weight: 500;
  }

  /* Input */
  .input-group { margin-bottom: 16px; }
  .input-label { font-size: 12px; color: var(--muted); margin-bottom: 6px; display: block; letter-spacing: 0.5px; }
  .input {
    width: 100%;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 10px 14px;
    font-family: 'Syne', sans-serif;
    font-size: 14px;
    color: var(--text);
    outline: none;
    transition: border-color 0.15s;
  }
  .input:focus { border-color: var(--accent); }

  select.input { cursor: pointer; }

  /* Token selector */
  .token-list { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
  .token-toggle {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 8px;
    border: 1px solid var(--border);
    background: var(--surface2);
    cursor: pointer;
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    font-weight: 600;
    color: var(--muted);
    transition: all 0.15s;
  }
  .token-toggle.active {
    background: rgba(0,229,160,0.1);
    border-color: rgba(0,229,160,0.4);
    color: var(--accent);
  }

  /* Checkout preview */
  .checkout-preview {
    background: var(--bg);
    border-radius: 12px;
    border: 1px solid var(--border);
    overflow: hidden;
  }

  .checkout-header {
    background: var(--surface);
    padding: 16px 20px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .checkout-body { padding: 20px; }

  .checkout-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid var(--border);
    font-size: 14px;
  }
  .checkout-item:last-child { border-bottom: none; }

  .checkout-total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 12px;
    font-weight: 700;
    font-size: 16px;
  }

  .rate-lock {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(0,229,160,0.08);
    border: 1px solid rgba(0,229,160,0.2);
    border-radius: 8px;
    padding: 10px 14px;
    margin-top: 14px;
    font-size: 13px;
  }

  .countdown {
    font-family: 'Space Mono', monospace;
    color: var(--accent);
    font-size: 15px;
    font-weight: 700;
  }

  /* Wallet Portfolio */
  .portfolio-hero {
    text-align: center;
    padding: 28px;
    background: linear-gradient(135deg, rgba(0,229,160,0.05), rgba(0,102,255,0.05));
    border-radius: 16px;
    border: 1px solid var(--border);
    margin-bottom: 20px;
  }

  .portfolio-label { font-size: 12px; color: var(--muted); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px; }
  .portfolio-balance { font-size: 44px; font-weight: 800; letter-spacing: -2px; }
  .portfolio-sub { font-size: 14px; color: var(--accent); margin-top: 6px; }

  .portfolio-actions { display: flex; gap: 10px; justify-content: center; margin-top: 20px; }

  /* Token row */
  .token-row {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 0;
    border-bottom: 1px solid var(--border);
    cursor: pointer;
    transition: background 0.1s;
  }
  .token-row:hover { background: rgba(255,255,255,0.02); border-radius: 8px; padding-left: 8px; }
  .token-row:last-child { border-bottom: none; }

  .token-icon {
    width: 40px; height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 800;
    flex-shrink: 0;
  }

  .token-name { font-size: 14px; font-weight: 700; }
  .token-chain { font-size: 11px; color: var(--muted); }
  .token-amount { text-align: right; }
  .token-usd { font-size: 15px; font-weight: 700; }
  .token-qty { font-size: 12px; color: var(--muted); font-family: 'Space Mono', monospace; }
  .token-change { font-size: 12px; margin-left: auto; }

  /* KYC / Verification */
  .kyc-step {
    display: flex;
    gap: 16px;
    padding: 16px 0;
    border-bottom: 1px solid var(--border);
    align-items: flex-start;
  }
  .kyc-step:last-child { border-bottom: none; }

  .step-num {
    width: 32px; height: 32px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 14px;
    flex-shrink: 0;
  }
  .step-done { background: rgba(0,229,160,0.15); color: var(--accent); }
  .step-active { background: rgba(0,102,255,0.15); color: var(--accent2); }
  .step-todo { background: var(--surface2); color: var(--muted); }

  .step-title { font-size: 14px; font-weight: 600; margin-bottom: 3px; }
  .step-desc { font-size: 12px; color: var(--muted); }

  /* Sumsub / KYC verification styles */
  .kyc-gate {
    position: relative;
  }

  .kyc-gate-overlay {
    position: absolute; inset: 0;
    background: rgba(5,8,16,0.85);
    backdrop-filter: blur(6px);
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 10;
    padding: 24px;
    text-align: center;
  }

  .kyc-shield {
    width: 64px; height: 64px;
    background: linear-gradient(135deg, rgba(0,229,160,0.15), rgba(0,102,255,0.15));
    border: 1px solid rgba(0,229,160,0.3);
    border-radius: 18px;
    display: flex; align-items: center; justify-content: center;
    font-size: 28px;
    margin-bottom: 14px;
  }

  .kyc-banner {
    background: linear-gradient(135deg, rgba(0,229,160,0.06), rgba(0,102,255,0.06));
    border: 1px solid rgba(0,229,160,0.2);
    border-radius: 12px;
    padding: 14px 18px;
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
  }

  .kyc-badge-dot {
    width: 10px; height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
    animation: pulse 2s infinite;
  }

  .sumsub-step {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    padding: 14px 0;
    border-bottom: 1px solid var(--border);
  }
  .sumsub-step:last-child { border-bottom: none; }

  .sumsub-icon {
    width: 38px; height: 38px;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 17px;
    flex-shrink: 0;
  }

  .limit-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 14px;
    background: var(--surface2);
    border-radius: 8px;
    margin-bottom: 6px;
    font-size: 13px;
  }

  .limit-locked { opacity: 0.45; }

  /* API Key display */
  .api-key-box {
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 12px 16px;
    font-family: 'Space Mono', monospace;
    font-size: 12px;
    color: var(--accent);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    word-break: break-all;
  }

  .copy-btn {
    background: var(--surface2);
    border: none;
    border-radius: 6px;
    padding: 4px 10px;
    font-family: 'Syne', sans-serif;
    font-size: 11px;
    color: var(--muted);
    cursor: pointer;
    flex-shrink: 0;
    transition: all 0.15s;
  }
  .copy-btn:hover { color: var(--text); }

  /* Fee display */
  .fee-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    background: var(--surface2);
    border-radius: 8px;
    font-size: 13px;
    margin-top: 10px;
  }

  /* Modal overlay */
  .modal-overlay {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.7);
    backdrop-filter: blur(8px);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  .modal {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 28px;
    width: 100%;
    max-width: 480px;
    max-height: 90vh;
    overflow-y: auto;
  }

  .modal-title {
    font-size: 20px;
    font-weight: 800;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .close-btn {
    background: var(--surface2);
    border: none;
    border-radius: 6px;
    width: 28px; height: 28px;
    color: var(--muted);
    cursor: pointer;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Progress bar */
  .progress-wrap { margin: 12px 0; }
  .progress-label { display: flex; justify-content: space-between; font-size: 12px; color: var(--muted); margin-bottom: 6px; }
  .progress-bar {
    height: 4px;
    background: var(--surface2);
    border-radius: 4px;
    overflow: hidden;
  }
  .progress-fill {
    height: 100%;
    border-radius: 4px;
    background: linear-gradient(90deg, var(--accent), var(--accent2));
    transition: width 0.5s ease;
  }

  /* Tabs */
  .tabs { display: flex; gap: 4px; background: var(--surface2); border-radius: 10px; padding: 4px; margin-bottom: 24px; }
  .tab {
    flex: 1;
    padding: 8px 12px;
    border-radius: 7px;
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    background: none;
    color: var(--muted);
    transition: all 0.15s;
    text-align: center;
  }
  .tab.active { background: var(--surface); color: var(--text); }

  /* Notification dot */
  .notif-dot {
    width: 8px; height: 8px;
    background: var(--danger);
    border-radius: 50%;
    position: absolute;
    top: -2px; right: -2px;
  }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 4px; height: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }

  /* Withdraw modal */
  .withdraw-amount {
    font-size: 36px;
    font-weight: 800;
    letter-spacing: -1px;
    color: var(--accent);
    text-align: center;
    margin: 16px 0;
  }

  /* Chart bars */
  .mini-chart { display: flex; align-items: flex-end; gap: 3px; height: 40px; margin-top: 8px; }
  .bar {
    flex: 1;
    border-radius: 3px 3px 0 0;
    opacity: 0.7;
    transition: opacity 0.15s;
  }
  .bar:hover { opacity: 1; }
`;

// ── Outlet Data ───────────────────────────────────────────────────────────
const WALLET_TOKENS = [
  { symbol: "ETH",  name: "Ethereum", icon: "⟠", usd: "$2,140.00", qty: "0.82 ETH",    change: "+2.4%", up: true,  bg: "rgba(98,126,234,0.15)",  color: "#627eea" },
  { symbol: "SOL",  name: "Solana",   icon: "◎", usd: "$895.00",   qty: "11.9 SOL",    change: "+5.1%", up: true,  bg: "rgba(153,69,255,0.15)", color: "#9945ff" },
  { symbol: "USDC", name: "USD Coin", icon: "$", usd: "$520.00",   qty: "520.00 USDC", change: "0.0%",  up: true,  bg: "rgba(39,117,202,0.15)",  color: "#2775ca" },
  { symbol: "BTC",  name: "Bitcoin",  icon: "₿", usd: "$320.00",   qty: "0.0048 BTC",  change: "-1.2%", up: false, bg: "rgba(247,147,26,0.15)",  color: "#f7931a" },
];

const WALLET_ACTIVITY = [
  { type: "Received", token: "ETH",  amount: "0.1901", usd: "$495.00", chain: "Ethereum", hash: "0x3f4a...8b2c", status: "confirmed", time: "2m ago" },
  { type: "Sent",     token: "SOL",  amount: "4.2",    usd: "$320.00", chain: "Solana",   hash: "5xHj...9kLm",   status: "confirmed", time: "18m ago" },
  { type: "Received", token: "USDC", amount: "210.00", usd: "$210.00", chain: "Base",     hash: "0xa1b2...7c3d", status: "pending",   time: "34m ago" },
  { type: "Sent",     token: "BTC",  amount: "0.0041", usd: "$180.00", chain: "Bitcoin",  hash: "bc1q...xz9f",   status: "confirmed", time: "1h ago" },
  { type: "Received", token: "ETH",  amount: "0.3102", usd: "$810.00", chain: "Ethereum", hash: "0x8e2f...1a4b", status: "failed",    time: "2h ago" },
];

// ── Shared components ─────────────────────────────────────────────────────
// ── Components ────────────────────────────────────────────────────────────

function StatusBadge({ s }) {
  return <span className={`status status-${s}`}>
    <span>●</span> {s.charAt(0).toUpperCase() + s.slice(1)}
  </span>;
}

function TokenBadge({ token }) {
  const cls = { ETH: "eth-dot", SOL: "sol-dot", BTC: "btc-dot", USDC: "usdc-dot" };
  return <span className="token-badge"><span className={`token-dot ${cls[token] || "usdc-dot"}`} />{token}</span>;
}


// ── USDT ↔ Local Currency Rates ───────────────────────────────────────────
const FIAT_RATES = {
  NGN: { name: "Nigerian Naira",    flag: "🇳🇬", rate: 1610.50, symbol: "₦" },
  GHS: { name: "Ghanaian Cedi",     flag: "🇬🇭", rate: 15.80,   symbol: "₵" },
  KES: { name: "Kenyan Shilling",   flag: "🇰🇪", rate: 129.40,  symbol: "KSh" },
  ZAR: { name: "South African Rand",flag: "🇿🇦", rate: 18.60,   symbol: "R" },
  USD: { name: "US Dollar",         flag: "🇺🇸", rate: 1.00,    symbol: "$" },
  GBP: { name: "British Pound",     flag: "🇬🇧", rate: 0.79,    symbol: "£" },
  EUR: { name: "Euro",              flag: "🇪🇺", rate: 0.92,    symbol: "€" },
};

// USDT price is $1.00 by definition, but we track other tokens too
const CRYPTO_RATES = {
  USDT: { name: "Tether",   icon: "₮", usdPrice: 1.00,    color: "#26a17b", bg: "rgba(38,161,123,0.15)" },
  USDC: { name: "USD Coin", icon: "$", usdPrice: 1.00,    color: "#2775ca", bg: "rgba(39,117,202,0.15)" },
  ETH:  { name: "Ethereum", icon: "⟠", usdPrice: 2605.00, color: "#627eea", bg: "rgba(98,126,234,0.15)" },
  BTC:  { name: "Bitcoin",  icon: "₿", usdPrice: 67200.00,color: "#f7931a", bg: "rgba(247,147,26,0.15)" },
  SOL:  { name: "Solana",   icon: "◎", usdPrice: 75.20,   color: "#9945ff", bg: "rgba(153,69,255,0.15)" },
};

function CurrencyCalculator() {
  const [mode, setMode] = useState("toLocal"); // "toLocal" | "toCrypto"
  const [cryptoKey, setCryptoKey] = useState("USDT");
  const [fiatKey, setFiatKey] = useState("NGN");
  const [cryptoAmt, setCryptoAmt] = useState("100");
  const [fiatAmt, setFiatAmt] = useState("");
  const [lastEdited, setLastEdited] = useState("crypto");

  const fiat = FIAT_RATES[fiatKey];
  const crypto = CRYPTO_RATES[cryptoKey];

  // Conversion: 1 USDT = $1 USD = fiat.rate local units
  const cryptoToFiat = (c) => (parseFloat(c) * crypto.usdPrice * fiat.rate).toFixed(2);
  const fiatToCrypto = (f) => (parseFloat(f) / fiat.rate / crypto.usdPrice).toFixed(6);

  const handleCryptoChange = (val) => {
    setCryptoAmt(val);
    setLastEdited("crypto");
    if (val && !isNaN(val)) setFiatAmt(cryptoToFiat(val));
    else setFiatAmt("");
  };

  const handleFiatChange = (val) => {
    setFiatAmt(val);
    setLastEdited("fiat");
    if (val && !isNaN(val)) setCryptoAmt(fiatToCrypto(val));
    else setCryptoAmt("");
  };

  const swap = () => {
    setMode(m => m === "toLocal" ? "toCrypto" : "toLocal");
    setCryptoAmt(fiatAmt ? fiatToCrypto(fiatAmt) : "");
    setFiatAmt(cryptoAmt ? cryptoToFiat(cryptoAmt) : "");
  };

  const usdEquiv = cryptoAmt && !isNaN(cryptoAmt)
    ? (parseFloat(cryptoAmt) * crypto.usdPrice).toFixed(2)
    : "0.00";

  return (
    <div className="card" style={{ background: "linear-gradient(135deg, rgba(0,229,160,0.04), rgba(0,102,255,0.04))", border: "1px solid rgba(0,229,160,0.15)" }}>
      <div className="section-title" style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 20 }}>⇌</span>
          <div>
            <div>USDT Converter</div>
            <div style={{ fontSize: 11, color: "var(--muted)", fontWeight: 400, letterSpacing: 0.5 }}>Crypto ↔ Local Currency</div>
          </div>
        </div>
        <div style={{ fontSize: 11, color: "var(--accent)", fontFamily: "Space Mono", background: "rgba(0,229,160,0.1)", padding: "3px 10px", borderRadius: 6 }}>
          LIVE RATES
        </div>
      </div>

      {/* Crypto Input */}
      <div style={{ marginBottom: 8 }}>
        <label className="input-label">Crypto Amount</label>
        <div style={{ display: "flex", gap: 8 }}>
          <select
            className="input"
            value={cryptoKey}
            onChange={e => { setCryptoKey(e.target.value); handleCryptoChange(cryptoAmt); }}
            style={{ width: 130, flexShrink: 0 }}
          >
            {Object.entries(CRYPTO_RATES).map(([k, v]) => (
              <option key={k} value={k}>{v.icon} {k}</option>
            ))}
          </select>
          <input
            className="input"
            type="number"
            min="0"
            value={cryptoAmt}
            onChange={e => handleCryptoChange(e.target.value)}
            placeholder="0.00"
            style={{ flex: 1, fontFamily: "Space Mono", fontSize: 16, fontWeight: 700 }}
          />
        </div>
        {cryptoAmt && !isNaN(cryptoAmt) && cryptoKey !== "USDT" && cryptoKey !== "USDC" && (
          <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 5, fontFamily: "Space Mono" }}>
            ≈ ${usdEquiv} USD · 1 {cryptoKey} = ${crypto.usdPrice.toLocaleString()}
          </div>
        )}
      </div>

      {/* Swap Button */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "14px 0" }}>
        <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        <button
          onClick={swap}
          style={{
            background: "var(--surface2)",
            border: "1px solid var(--border)",
            borderRadius: "50%",
            width: 36, height: 36,
            cursor: "pointer",
            fontSize: 16,
            color: "var(--accent)",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s",
            flexShrink: 0,
          }}
          title="Swap direction"
        >
          ⇅
        </button>
        <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
      </div>

      {/* Fiat Input */}
      <div style={{ marginBottom: 16 }}>
        <label className="input-label">Local Currency</label>
        <div style={{ display: "flex", gap: 8 }}>
          <select
            className="input"
            value={fiatKey}
            onChange={e => { setFiatKey(e.target.value); if (cryptoAmt) setFiatAmt(cryptoToFiat(cryptoAmt)); }}
            style={{ width: 130, flexShrink: 0 }}
          >
            {Object.entries(FIAT_RATES).map(([k, v]) => (
              <option key={k} value={k}>{v.flag} {k}</option>
            ))}
          </select>
          <input
            className="input"
            type="number"
            min="0"
            value={fiatAmt}
            onChange={e => handleFiatChange(e.target.value)}
            placeholder="0.00"
            style={{ flex: 1, fontFamily: "Space Mono", fontSize: 16, fontWeight: 700 }}
          />
        </div>
      </div>

      {/* Result Display */}
      {cryptoAmt && fiatAmt && !isNaN(cryptoAmt) && !isNaN(fiatAmt) && (
        <div style={{
          background: "rgba(0,229,160,0.07)",
          border: "1px solid rgba(0,229,160,0.2)",
          borderRadius: 12,
          padding: "16px 18px",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 8, letterSpacing: 0.5 }}>CONVERSION RESULT</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: "Space Mono", fontSize: 22, fontWeight: 700, color: "var(--accent)" }}>
                {fiat.symbol}{parseFloat(fiatAmt).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 3 }}>{fiat.name}</div>
            </div>
            <div style={{ fontSize: 22, color: "var(--muted)" }}>←</div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "Space Mono", fontSize: 22, fontWeight: 700 }}>
                {parseFloat(cryptoAmt).toLocaleString("en-US", { maximumFractionDigits: 6 })} {cryptoKey}
              </div>
              <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 3 }}>{crypto.name}</div>
            </div>
          </div>
        </div>
      )}

      {/* Rate table */}
      <div style={{ borderTop: "1px solid var(--border)", paddingTop: 14 }}>
        <div style={{ fontSize: 11, color: "var(--muted)", letterSpacing: 1, marginBottom: 10 }}>1 {cryptoKey} IN LOCAL CURRENCIES</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          {Object.entries(FIAT_RATES).map(([k, v]) => (
            <div
              key={k}
              onClick={() => setFiatKey(k)}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "7px 10px",
                background: fiatKey === k ? "rgba(0,229,160,0.08)" : "var(--surface2)",
                border: `1px solid ${fiatKey === k ? "rgba(0,229,160,0.3)" : "transparent"}`,
                borderRadius: 8,
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              <span style={{ fontSize: 13 }}>{v.flag} {k}</span>
              <span style={{ fontFamily: "Space Mono", fontSize: 12, color: fiatKey === k ? "var(--accent)" : "var(--muted)" }}>
                {v.symbol}{(crypto.usdPrice * v.rate).toLocaleString("en-US", { maximumFractionDigits: 2 })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


// ── Wallet KYC (Sumsub) ──────────────────────────────────────────────────
function WalletVerification({ onComplete }) {
  const [kycStep, setKycStep] = useState("intro"); // intro | form | liveness | review | done
  const [formData, setFormData] = useState({ fullName: "", dob: "", nationality: "", idType: "nin", idNumber: "" });
  const [livenessProgress, setLivenessProgress] = useState(0);
  const [reviewProgress, setReviewProgress] = useState(0);

  const startLiveness = () => {
    setKycStep("liveness");
    let p = 0;
    const t = setInterval(() => {
      p += 4;
      setLivenessProgress(p);
      if (p >= 100) { clearInterval(t); setTimeout(() => setKycStep("review"), 400); }
    }, 80);
  };

  useEffect(() => {
    if (kycStep === "review") {
      let p = 0;
      const t = setInterval(() => {
        p += 2;
        setReviewProgress(p);
        if (p >= 100) { clearInterval(t); setTimeout(() => { setKycStep("done"); }, 600); }
      }, 60);
      return () => clearInterval(t);
    }
  }, [kycStep]);

  const formValid = formData.fullName.trim() && formData.dob && formData.nationality && formData.idNumber.trim();

  const SUMSUB_STEPS = [
    { icon: "🪪", label: "Identity Document", desc: "National ID, Driver's License or Passport" },
    { icon: "🤳", label: "Liveness Check", desc: "Short selfie video to confirm you're a real person" },
    { icon: "🏠", label: "Proof of Address", desc: "Utility bill or bank statement (last 3 months)" },
    { icon: "🔍", label: "Sumsub AML Screen", desc: "Automated check against global sanctions & PEP lists" },
  ];

  if (kycStep === "intro") return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Wallet Verification</div>
          <div className="page-sub">Powered by Sumsub — required to activate full wallet features</div>
        </div>
      </div>

      {/* Why banner */}
      <div className="kyc-banner" style={{ marginBottom: 24 }}>
        <div className="kyc-badge-dot" style={{ background: "var(--accent2)" }} />
        <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>
          IZOQ is required by the <strong style={{ color: "var(--text)" }}>2026 Nigeria AML Act</strong> and global FATF standards to verify all wallet users. This prevents fraud, money laundering, and scam activity on the platform.
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Left — what happens */}
        <div className="card">
          <div className="section-title">Verification Steps</div>
          <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 16, lineHeight: 1.6 }}>
            Powered by <strong style={{ color: "var(--text)" }}>Sumsub</strong>, an industry-leading KYC provider trusted by Binance, Bybit, and OKX. The process takes under 3 minutes.
          </div>
          {SUMSUB_STEPS.map((s, i) => (
            <div key={i} className="sumsub-step">
              <div className="sumsub-icon" style={{ background: "var(--surface2)" }}>{s.icon}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 3 }}>{s.label}</div>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Right — limits */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="card">
            <div className="section-title">Feature Access</div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: "var(--muted)", letterSpacing: 1, marginBottom: 8 }}>UNVERIFIED</div>
              {[
                { label: "View portfolio balances", ok: true },
                { label: "USDT converter / calculator", ok: true },
                { label: "Send crypto", ok: false },
                { label: "Receive crypto", ok: false },
                { label: "Withdraw to bank", ok: false },
                { label: "Import external wallet", ok: false },
                { label: "P2P transfers via $IZOQ Tag", ok: false },
              ].map((r, i) => (
                <div key={i} className={`limit-row ${r.ok ? "" : "limit-locked"}`}>
                  <span>{r.label}</span>
                  <span style={{ color: r.ok ? "var(--accent)" : "var(--danger)", fontWeight: 700 }}>
                    {r.ok ? "✓" : "✗"}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 11, color: "var(--muted)", letterSpacing: 1, marginBottom: 8 }}>VERIFIED</div>
            <div style={{ fontSize: 12, color: "var(--accent)", background: "rgba(0,229,160,0.07)", border: "1px solid rgba(0,229,160,0.2)", borderRadius: 8, padding: "10px 12px", lineHeight: 1.7 }}>
              All features unlocked · Higher transaction limits · Priority support · $IZOQ Tag activated
            </div>
          </div>

          <div className="card" style={{ background: "linear-gradient(135deg, rgba(0,229,160,0.04), rgba(0,102,255,0.04))", border: "1px solid rgba(0,229,160,0.15)" }}>
            <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 14, lineHeight: 1.6 }}>
              Your data is processed by Sumsub under strict GDPR / NDPR compliance. IZOQ does not store your ID documents — they are held by Sumsub under their certified data infrastructure.
            </div>
            <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "13px 0", fontSize: 15 }}
              onClick={() => setKycStep("form")}>
              🛡 Start Verification
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (kycStep === "form") return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Identity Details</div>
          <div className="page-sub">Step 1 of 3 — Personal information</div>
        </div>
        <button className="btn btn-ghost" onClick={() => setKycStep("intro")}>← Back</button>
      </div>

      {/* Progress */}
      <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
        {["Personal Info", "Liveness Check", "Under Review"].map((label, i) => (
          <div key={i} style={{ flex: 1 }}>
            <div style={{ height: 4, borderRadius: 4, background: i === 0 ? "var(--accent2)" : "var(--surface2)", marginBottom: 6 }} />
            <div style={{ fontSize: 11, color: i === 0 ? "var(--text)" : "var(--muted)", textAlign: "center" }}>{label}</div>
          </div>
        ))}
      </div>

      <div style={{ maxWidth: 560, margin: "0 auto" }}>
        <div className="card">
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, padding: "10px 14px", background: "rgba(0,102,255,0.07)", border: "1px solid rgba(0,102,255,0.2)", borderRadius: 10 }}>
            <span style={{ fontSize: 18 }}>🔒</span>
            <span style={{ fontSize: 12, color: "var(--muted)" }}>Secured by <strong style={{ color: "var(--text)" }}>Sumsub</strong> · End-to-end encrypted · GDPR compliant</span>
          </div>

          <div className="input-group">
            <label className="input-label">Full Legal Name</label>
            <input className="input" placeholder="As it appears on your ID"
              value={formData.fullName}
              onChange={e => setFormData(d => ({ ...d, fullName: e.target.value }))} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div className="input-group">
              <label className="input-label">Date of Birth</label>
              <input className="input" type="date"
                value={formData.dob}
                onChange={e => setFormData(d => ({ ...d, dob: e.target.value }))} />
            </div>
            <div className="input-group">
              <label className="input-label">Nationality</label>
              <select className="input" value={formData.nationality}
                onChange={e => setFormData(d => ({ ...d, nationality: e.target.value }))}>
                <option value="">Select country</option>
                <option>Nigerian</option>
                <option>Ghanaian</option>
                <option>Kenyan</option>
                <option>South African</option>
                <option>British</option>
                <option>American</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <div className="input-group">
            <label className="input-label">ID Document Type</label>
            <div style={{ display: "flex", gap: 8 }}>
              {[["nin", "National ID (NIN)"], ["drivers", "Driver's License"], ["passport", "Int'l Passport"]].map(([val, label]) => (
                <button key={val}
                  className={`token-toggle ${formData.idType === val ? "active" : ""}`}
                  onClick={() => setFormData(d => ({ ...d, idType: val }))}
                  style={{ flex: 1, justifyContent: "center", fontSize: 12 }}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="input-group">
            <label className="input-label">ID Number</label>
            <input className="input" placeholder="Enter your ID number"
              value={formData.idNumber}
              onChange={e => setFormData(d => ({ ...d, idNumber: e.target.value }))}
              style={{ fontFamily: "Space Mono" }} />
          </div>
          <div className="input-group">
            <label className="input-label">Upload Document Photo</label>
            <div style={{
              border: "2px dashed var(--border)", borderRadius: 10, padding: "24px",
              textAlign: "center", color: "var(--muted)", fontSize: 13, cursor: "pointer",
              background: "var(--surface2)",
            }}>
              📎 Click to upload front of ID<br />
              <span style={{ fontSize: 11, marginTop: 4, display: "block" }}>JPG, PNG or PDF · Max 10MB</span>
            </div>
          </div>
          <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 4 }}
            onClick={startLiveness} disabled={!formValid}>
            Next: Liveness Check →
          </button>
        </div>
      </div>
    </div>
  );

  if (kycStep === "liveness") return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Liveness Check</div>
          <div className="page-sub">Step 2 of 3 — Confirm you're a real person</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
        {["Personal Info", "Liveness Check", "Under Review"].map((label, i) => (
          <div key={i} style={{ flex: 1 }}>
            <div style={{ height: 4, borderRadius: 4, background: i <= 1 ? (i === 1 ? "var(--accent2)" : "var(--accent)") : "var(--surface2)", marginBottom: 6 }} />
            <div style={{ fontSize: 11, color: i <= 1 ? "var(--text)" : "var(--muted)", textAlign: "center" }}>{label}</div>
          </div>
        ))}
      </div>

      <div style={{ maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
        <div className="card">
          {/* Simulated camera feed */}
          <div style={{
            width: "100%", aspectRatio: "4/3",
            background: "radial-gradient(ellipse at center, #0d1a2e 0%, #050810 100%)",
            borderRadius: 12, marginBottom: 20,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            border: `2px solid ${livenessProgress > 0 ? "var(--accent)" : "var(--border)"}`,
            position: "relative", overflow: "hidden",
          }}>
            {/* Scan lines */}
            <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,229,160,0.02) 2px, rgba(0,229,160,0.02) 4px)" }} />
            {/* Face oval */}
            <div style={{
              width: 140, height: 175,
              border: `3px solid ${livenessProgress > 0 ? "var(--accent)" : "rgba(255,255,255,0.2)"}`,
              borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 56,
              position: "relative",
              boxShadow: livenessProgress > 0 ? "0 0 24px rgba(0,229,160,0.3)" : "none",
              transition: "all 0.3s",
            }}>
              {livenessProgress >= 100 ? "✓" : "🤳"}
            </div>
            {livenessProgress > 0 && livenessProgress < 100 && (
              <div style={{ position: "absolute", bottom: 16, left: 16, right: 16 }}>
                <div style={{ fontSize: 12, color: "var(--accent)", marginBottom: 6, textAlign: "left" }}>
                  Scanning... {livenessProgress}%
                </div>
                <div style={{ height: 3, background: "rgba(255,255,255,0.1)", borderRadius: 3 }}>
                  <div style={{ height: "100%", width: `${livenessProgress}%`, background: "var(--accent)", borderRadius: 3, transition: "width 0.1s" }} />
                </div>
              </div>
            )}
            {livenessProgress >= 100 && (
              <div style={{ position: "absolute", bottom: 16, fontSize: 13, color: "var(--accent)", fontWeight: 700 }}>
                ✓ Liveness confirmed!
              </div>
            )}
          </div>

          <div style={{ fontSize: 14, color: "var(--muted)", marginBottom: 20, lineHeight: 1.7 }}>
            Sumsub will take a short selfie video to confirm you are a real person. Look directly at the camera and follow the on-screen prompts. <strong style={{ color: "var(--text)" }}>No photos are stored by IZOQ.</strong>
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginBottom: 20 }}>
            {["Good lighting", "Face centred", "No glasses", "No hat"].map(tip => (
              <span key={tip} style={{ fontSize: 12, background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 20, padding: "4px 12px", color: "var(--muted)" }}>
                ✓ {tip}
              </span>
            ))}
          </div>

          {livenessProgress === 0 && (
            <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "13px 0" }}
              onClick={() => { setLivenessProgress(1); }}>
              📷 Start Camera & Scan
            </button>
          )}
          {livenessProgress >= 100 && (
            <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "13px 0" }}
              onClick={() => setKycStep("review")}>
              Submit for Review →
            </button>
          )}
        </div>
      </div>
    </div>
  );

  if (kycStep === "review") return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Under Review</div>
          <div className="page-sub">Step 3 of 3 — Sumsub is processing your submission</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
        {["Personal Info", "Liveness Check", "Under Review"].map((label, i) => (
          <div key={i} style={{ flex: 1 }}>
            <div style={{ height: 4, borderRadius: 4, background: "var(--accent2)", marginBottom: 6, transition: "background 0.3s" }} />
            <div style={{ fontSize: 11, color: "var(--text)", textAlign: "center" }}>{label}</div>
          </div>
        ))}
      </div>

      <div style={{ maxWidth: 520, margin: "0 auto", textAlign: "center" }}>
        <div className="card">
          <div style={{ fontSize: 52, marginBottom: 16 }}>🔍</div>
          <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>Sumsub is reviewing your submission</div>
          <div style={{ fontSize: 14, color: "var(--muted)", marginBottom: 24, lineHeight: 1.7 }}>
            Your documents and liveness data are being verified. This typically takes a few seconds in demo mode. In production this can take up to 2 minutes.
          </div>

          <div className="progress-wrap" style={{ marginBottom: 24 }}>
            <div className="progress-label">
              <span>AML & Identity Check</span>
              <span style={{ color: "var(--accent)" }}>{reviewProgress}%</span>
            </div>
            <div className="progress-bar" style={{ height: 8 }}>
              <div className="progress-fill" style={{ width: `${reviewProgress}%`, transition: "width 0.1s" }} />
            </div>
          </div>

          {[
            { label: "Document authenticity", done: reviewProgress >= 30 },
            { label: "Face match verification", done: reviewProgress >= 55 },
            { label: "Sanctions & PEP screening", done: reviewProgress >= 75 },
            { label: "Risk scoring", done: reviewProgress >= 90 },
            { label: "Final approval", done: reviewProgress >= 100 },
          ].map((check, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "8px 14px", borderRadius: 8,
              background: check.done ? "rgba(0,229,160,0.06)" : "var(--surface2)",
              marginBottom: 6, transition: "background 0.4s",
            }}>
              <span style={{ color: check.done ? "var(--accent)" : "var(--muted)", fontSize: 14 }}>
                {check.done ? "✓" : "○"}
              </span>
              <span style={{ fontSize: 13, color: check.done ? "var(--text)" : "var(--muted)" }}>{check.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (kycStep === "done") return (
    <div>
      <div style={{ maxWidth: 520, margin: "60px auto", textAlign: "center" }}>
        <div className="card" style={{ background: "linear-gradient(135deg, rgba(0,229,160,0.06), rgba(0,102,255,0.06))", border: "1px solid rgba(0,229,160,0.3)", animation: "fadeIn 0.5s ease" }}>
          <div style={{ fontSize: 60, marginBottom: 16 }}>🎉</div>
          <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Wallet Verified!</div>
          <div style={{ fontSize: 14, color: "var(--muted)", marginBottom: 24, lineHeight: 1.7 }}>
            Your identity has been confirmed by Sumsub. Your IZOQ wallet is now fully activated — all features are unlocked.
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
            {["Send & receive crypto", "Withdraw to bank account", "Import external wallets", "P2P via $IZOQ Tag", "Higher transaction limits"].map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(0,229,160,0.06)", border: "1px solid rgba(0,229,160,0.15)", borderRadius: 8, padding: "9px 14px" }}>
                <span style={{ color: "var(--accent)" }}>✓</span>
                <span style={{ fontSize: 13 }}>{f}</span>
              </div>
            ))}
          </div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(0,229,160,0.1)", border: "1px solid rgba(0,229,160,0.3)",
            borderRadius: 20, padding: "6px 16px", fontSize: 12, color: "var(--accent)",
            marginBottom: 20, fontWeight: 700,
          }}>
            🛡 Verified by Sumsub · AML Cleared
          </div>
          <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "13px 0", fontSize: 15 }}
            onClick={onComplete}>
            ◈ Go to My Wallet
          </button>
        </div>
      </div>
    </div>
  );

  return null;
}


function Wallet() {
  const [kycVerified, setKycVerified] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [importMethod, setImportMethod] = useState("seed");
  const [importInput, setImportInput] = useState("");
  const [watchAddresses, setWatchAddresses] = useState([]);
  const [importDone, setImportDone] = useState(false);
  const [importedSource, setImportedSource] = useState("");
  const total = WALLET_TOKENS.reduce((s, t) => s + parseFloat(t.usd.replace("$", "").replace(",", "")), 0);

  const CHAINS_USER = [
    { name: "Ethereum / EVM", icon: "⟠", color: "#627eea", prefix: "0x" },
    { name: "Solana",         icon: "◎", color: "#9945ff", prefix: "" },
    { name: "Bitcoin",        icon: "₿", color: "#f7931a", prefix: "bc1q" },
    { name: "TRON (TRC-20)", icon: "◈", color: "#ef0027", prefix: "" },
  ];

  const handleImport = () => {
    setImportedSource(importMethod === "seed" ? "Imported via Seed Phrase" : "Watch Addresses");
    setImportDone(true);
    setShowImport(false);
  };

  const wordCount = importInput.trim().split(/\s+/).filter(Boolean).length;
  const seedValid = wordCount === 12 || wordCount === 24;

  // Show full verification flow
  if (showVerification) return (
    <WalletVerification onComplete={() => { setKycVerified(true); setShowVerification(false); }} />
  );

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">My Wallet</div>
          <div className="page-sub">
            IZOQ Outlet — Multi-chain portfolio
            {kycVerified
              ? <span style={{ color: "var(--accent)", marginLeft: 8 }}>· 🛡 Verified by Sumsub</span>
              : importDone && <span style={{ color: "var(--accent)", marginLeft: 8 }}>· {importedSource} ✦</span>}
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {!kycVerified && (
            <button className="btn btn-ghost" style={{ borderColor: "rgba(255,71,87,0.3)", color: "var(--danger)" }}
              onClick={() => setShowVerification(true)}>
              ⚠ Verify Wallet
            </button>
          )}
          <button className="btn btn-ghost" onClick={() => setShowImport(true)}>⬇ Import Wallet</button>
        </div>
      </div>

      {/* KYC banner if unverified */}
      {!kycVerified && (
        <div style={{
          background: "rgba(255,71,87,0.05)",
          border: "1px solid rgba(255,71,87,0.25)",
          borderRadius: 12,
          padding: "14px 18px",
          marginBottom: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 22 }}>🛡</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>Wallet verification required</div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>
                Send, receive, withdraw and import features are locked until you complete Sumsub KYC verification.
              </div>
            </div>
          </div>
          <button className="btn btn-primary" style={{ flexShrink: 0 }}
            onClick={() => setShowVerification(true)}>
            🛡 Verify Now
          </button>
        </div>
      )}

      <div className="portfolio-hero">
        <div className="portfolio-label">Total Portfolio Value</div>
        <div className="portfolio-balance">${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}</div>
        <div className="portfolio-sub">↑ +3.2% today ($116.80)</div>
        <div className="portfolio-actions">
          <button className="btn btn-ghost" disabled={!kycVerified} style={{ opacity: kycVerified ? 1 : 0.4, cursor: kycVerified ? "pointer" : "not-allowed" }}>⬆ Send</button>
          <button className="btn btn-ghost" disabled={!kycVerified} style={{ opacity: kycVerified ? 1 : 0.4, cursor: kycVerified ? "pointer" : "not-allowed" }}>⬇ Receive</button>
          <button className="btn btn-ghost" onClick={() => kycVerified ? setShowImport(true) : null}
            style={{ opacity: kycVerified ? 1 : 0.4, cursor: kycVerified ? "pointer" : "not-allowed" }}>
            ⬇ Import Wallet
          </button>
          <button className="btn btn-primary"
            onClick={() => kycVerified ? setShowWithdraw(true) : setShowVerification(true)}>
            {kycVerified ? "🏦 Withdraw to Bank" : "🛡 Verify to Withdraw"}
          </button>
        </div>
      </div>

      {/* Two-column layout: Assets + Calculator */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        {/* Assets with KYC gate overlay on restricted actions */}
        <div className="card kyc-gate">
          <div className="section-title">
            Assets
            {kycVerified
              ? <span style={{ fontSize: 11, color: "var(--accent)", fontWeight: 600 }}>🛡 Verified</span>
              : <span style={{ fontSize: 11, color: "var(--danger)", fontWeight: 600 }}>⚠ Unverified</span>}
          </div>
          {WALLET_TOKENS.map((t, i) => (
            <div key={i} className="token-row">
              <div className="token-icon" style={{ background: t.bg, color: t.color }}>{t.icon}</div>
              <div style={{ flex: 1 }}>
                <div className="token-name">{t.symbol}</div>
                <div className="token-chain">{t.name}</div>
              </div>
              <div className="token-amount">
                <div className="token-usd">{t.usd}</div>
                <div className="token-qty">{t.qty}</div>
              </div>
              <div className={`token-change ${t.up ? "stat-up" : "stat-down"}`} style={{ width: 55, textAlign: "right" }}>
                {t.change}
              </div>
            </div>
          ))}
        </div>

        <CurrencyCalculator />
      </div>

      {/* Withdraw modal */}
      {showWithdraw && kycVerified && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowWithdraw(false)}>
          <div className="modal">
            <div className="modal-title">
              Withdraw to Bank
              <button className="close-btn" onClick={() => setShowWithdraw(false)}>✕</button>
            </div>
            <div className="input-group">
              <label className="input-label">Select Asset</label>
              <select className="input">
                {WALLET_TOKENS.map(t => <option key={t.symbol}>{t.symbol} — {t.usd} available</option>)}
              </select>
            </div>
            <div className="input-group">
              <label className="input-label">Amount (USD)</label>
              <div className="withdraw-amount">$495.00</div>
            </div>
            <div className="input-group">
              <label className="input-label">Bank Account</label>
              <select className="input">
                <option>Zenith Bank **** 4821</option>
                <option>GTBank **** 2290</option>
              </select>
            </div>
            <div className="fee-bar">
              <span style={{ color: "var(--muted)" }}>IZOQ Fee (1%)</span>
              <span>−$4.95</span>
            </div>
            <div className="fee-bar" style={{ marginTop: 6 }}>
              <span style={{ color: "var(--muted)" }}>You receive</span>
              <span style={{ color: "var(--accent)", fontWeight: 700 }}>$490.05</span>
            </div>
            <button className="btn btn-primary" style={{ width: "100%", marginTop: 16, justifyContent: "center" }}>
              Confirm Withdrawal
            </button>
          </div>
        </div>
      )}

      {/* Import Wallet modal */}
      {showImport && kycVerified && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowImport(false)}>
          <div className="modal" style={{ maxWidth: 520 }}>
            <div className="modal-title">
              Import Wallet
              <button className="close-btn" onClick={() => setShowImport(false)}>✕</button>
            </div>
            <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 16, lineHeight: 1.6 }}>
              Connect a wallet you already use — Bitget, MetaMask, Trust Wallet, Phantom, or any BIP-39 compatible wallet. You can also paste addresses from your merchant wallet to sync it here.
            </div>
            <div className="tabs" style={{ marginBottom: 20 }}>
              <button className={`tab ${importMethod === "seed" ? "active" : ""}`} onClick={() => setImportMethod("seed")}>
                🔑 Seed Phrase
              </button>
              <button className={`tab ${importMethod === "address" ? "active" : ""}`} onClick={() => setImportMethod("address")}>
                📋 Watch Addresses
              </button>
            </div>
            {importMethod === "seed" && (
              <>
                <div style={{ background: "rgba(255,71,87,0.05)", border: "1px solid rgba(255,71,87,0.2)", borderRadius: 10, padding: "10px 14px", fontSize: 12, color: "#ff8a94", marginBottom: 16, display: "flex", gap: 8 }}>
                  <span style={{ flexShrink: 0 }}>⚠</span>
                  <span>Your phrase is encrypted locally and never transmitted. IZOQ will never ask for it outside this screen.</span>
                </div>
                <div className="input-group">
                  <label className="input-label">12 or 24-Word Recovery Phrase</label>
                  <textarea className="input" rows={4} placeholder="word1 word2 word3 ... word12"
                    value={importInput} onChange={e => setImportInput(e.target.value)}
                    style={{ fontFamily: "Space Mono", fontSize: 13, resize: "none" }} />
                  {importInput && (
                    <div style={{ marginTop: 5, fontSize: 11, color: seedValid ? "var(--accent)" : "var(--muted)" }}>
                      {wordCount} word{wordCount !== 1 ? "s" : ""} entered {seedValid ? "✓ Valid length" : "— needs 12 or 24"}
                    </div>
                  )}
                </div>
                <div className="input-group">
                  <label className="input-label">Derivation Path</label>
                  <select className="input">
                    <option>m/44'/60'/0'/0 — Ethereum (default)</option>
                    <option>m/44'/501'/0'/0' — Solana</option>
                    <option>m/44'/0'/0'/0 — Bitcoin</option>
                  </select>
                </div>
                <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}
                  onClick={handleImport} disabled={!seedValid}>⬇ Import & Derive Addresses</button>
              </>
            )}
            {importMethod === "address" && (
              <>
                <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 14, lineHeight: 1.6 }}>
                  Paste your receiving addresses for each chain. IZOQ will track balances and incoming payments. <strong style={{ color: "var(--text)" }}>Read-only</strong> — no keys needed.
                </div>
                {CHAINS_USER.map((chain, i) => (
                  <div key={i} className="input-group">
                    <label className="input-label" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ color: chain.color }}>{chain.icon}</span>{chain.name}
                    </label>
                    <input className="input"
                      placeholder={chain.prefix ? `${chain.prefix}...` : "Enter address..."}
                      value={watchAddresses[i] || ""}
                      onChange={e => { const arr = [...watchAddresses]; arr[i] = e.target.value; setWatchAddresses(arr); }}
                      style={{ fontFamily: "Space Mono", fontSize: 12 }} />
                  </div>
                ))}
                <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}
                  onClick={handleImport} disabled={watchAddresses.filter(Boolean).length === 0}>✦ Import Addresses</button>
              </>
            )}
            <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid var(--border)" }}>
              <div style={{ fontSize: 11, color: "var(--muted)", letterSpacing: 1, marginBottom: 8 }}>COMPATIBLE WALLETS</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {["Bitget Wallet", "MetaMask", "Trust Wallet", "Phantom", "Ledger", "Coinbase Wallet", "OKX Wallet", "Rainbow"].map(w => (
                  <span key={w} style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 6, padding: "3px 9px", fontSize: 11, color: "var(--muted)" }}>{w}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


function Activity() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? WALLET_ACTIVITY : WALLET_ACTIVITY.filter(t => t.status === filter);

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Activity</div>
          <div className="page-sub">Your on-chain transaction history</div>
        </div>
      </div>

      <div className="tabs" style={{ maxWidth: 400, marginBottom: 20 }}>
        {["all", "confirmed", "pending", "failed"].map(f => (
          <button key={f} className={`tab ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Token</th>
                <th>Chain</th>
                <th>Amount</th>
                <th>Tx Hash</th>
                <th>Status</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((tx, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600, fontSize: 13 }}>{tx.type}</td>
                  <td><TokenBadge token={tx.token} /></td>
                  <td><span className="chain-chip">{tx.chain}</span></td>
                  <td>
                    <div style={{ fontWeight: 700 }}>{tx.usd}</div>
                    <div className="hash">{tx.amount} {tx.token}</div>
                  </td>
                  <td><div className="hash"><a href="#" onClick={e => e.preventDefault()}>{tx.hash}</a></div></td>
                  <td><StatusBadge s={tx.status} /></td>
                  <td style={{ color: "var(--muted)", fontSize: 13 }}>{tx.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


// ── IZOQ Outlet App ───────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState("wallet");

  const nav = [
    { id: "wallet",   label: "My Wallet",    icon: "◈" },
    { id: "activity", label: "Activity",     icon: "≡" },
    { id: "userkyc",  label: "Verification", icon: "✦" },
  ];

  const renderPage = () => {
    switch (page) {
      case "wallet":   return <Wallet />;
      case "activity": return <Activity />;
      case "userkyc":  return <WalletVerification onComplete={() => setPage("wallet")} />;
      default:         return <Wallet />;
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <aside className="sidebar">
          <div className="logo-wrap">
            <div className="logo"><div className="logo-dot" />IZOQ</div>
            <div className="logo-tag">User Outlet</div>
          </div>

          <nav className="nav">
            <div className="nav-section">My Wallet</div>
            {nav.map(item => (
              <button
                key={item.id}
                className={`nav-item ${page === item.id ? "active" : ""}`}
                onClick={() => setPage(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="sidebar-footer">
            <div className="user-chip">
              <div className="avatar">AO</div>
              <div className="user-info">
                <div className="user-name">Alex Okafor</div>
                <div className="user-role">OUTLET USER</div>
              </div>
            </div>
          </div>
        </aside>

        <main className="main">
          {renderPage()}
        </main>
      </div>
    </>
  );
}
