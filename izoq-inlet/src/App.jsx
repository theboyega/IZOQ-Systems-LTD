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

  /* ═══════════════════════════════════════════════════
     MOBILE OPTIMIZATION
  ═══════════════════════════════════════════════════ */

  /* Hamburger button — hidden on desktop */
  .hamburger {
    display: none;
    background: transparent;
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 8px 10px;
    color: var(--text);
    cursor: pointer;
    font-size: 18px;
    line-height: 1;
    position: fixed;
    top: 14px;
    left: 14px;
    z-index: 200;
  }

  /* Mobile sidebar overlay */
  .sidebar-overlay {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.6);
    backdrop-filter: blur(4px);
    z-index: 149;
  }
  .sidebar-overlay.open { display: block; }

  /* ── Tablet 768–1024px ── */
  @media (max-width: 1024px) {
    .sidebar { width: 200px; padding: 16px 0; }
    .main { margin-left: 200px; padding: 24px; }
    .grid-4 { grid-template-columns: 1fr 1fr; }
    .stats-grid { grid-template-columns: 1fr 1fr; }
  }

  /* ── Mobile ≤768px ── */
  @media (max-width: 768px) {
    /* Show hamburger, hide sidebar by default */
    .hamburger { display: flex; align-items: center; justify-content: center; }

    .sidebar {
      position: fixed;
      left: -260px;
      top: 0;
      bottom: 0;
      width: 260px;
      z-index: 150;
      transition: left 0.28s cubic-bezier(0.4, 0, 0.2, 1);
      overflow-y: auto;
    }
    .sidebar.mobile-open { left: 0; }

    /* Main takes full width */
    .main {
      margin-left: 0;
      padding: 72px 16px 24px;
      min-height: 100vh;
    }

    /* Page header */
    .page-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
      margin-bottom: 20px;
    }
    .page-header h1 { font-size: 22px; }

    /* Grids → single column */
    .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; gap: 12px; }
    .stats-grid { grid-template-columns: 1fr 1fr; gap: 12px; }

    /* Cards */
    .card { padding: 18px; border-radius: 14px; }
    .card-sm { padding: 14px 16px; }

    /* Stat cards */
    .stat-card { padding: 16px 18px; }
    .stat-value { font-size: 22px; }
    .stat-label { font-size: 10px; }

    /* Tables → scrollable */
    .table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; border-radius: 12px; }
    table { min-width: 600px; }
    th, td { padding: 10px 12px; font-size: 12px; }

    /* Buttons */
    .btn { font-size: 13px; padding: 9px 16px; }
    .btn-sm { font-size: 11px; padding: 6px 10px; }

    /* Checkout builder — stack columns */
    .checkout-grid { grid-template-columns: 1fr !important; }
    .checkout-preview { margin-top: 16px; }

    /* API keys — truncate long keys */
    .key-value {
      font-size: 10px !important;
      max-width: 180px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* Verification steps — stack */
    .steps-horizontal { flex-direction: column; gap: 12px; }
    .step-connector { display: none; }

    /* Wallet — stack address/actions */
    .wallet-address-row { flex-direction: column; align-items: flex-start; gap: 8px; }
    .wallet-address { font-size: 10px; word-break: break-all; }

    /* Modals / drawers */
    .seed-grid { grid-template-columns: 1fr 1fr !important; gap: 8px; }
    .modal-inner { padding: 20px 16px; }
    .token-grid { grid-template-columns: 1fr 1fr !important; gap: 8px; }

    /* Input font-size 16px to prevent iOS zoom */
    input, select, textarea { font-size: 16px !important; }

    /* Sidebar top logo area padding for hamburger */
    .sidebar-logo { padding-left: 56px; }
  }

  /* ── Small phones ≤380px ── */
  @media (max-width: 380px) {
    .main { padding: 68px 12px 20px; }
    .stats-grid { grid-template-columns: 1fr; }
    .card { padding: 14px; }
    .stat-value { font-size: 20px; }
    th, td { padding: 8px 10px; }
  }
`;

// ── Data ──────────────────────────────────────────────────────────────────
const TRANSACTIONS = [
  { id: "ORD-9821", item: "2x Denim Jeans, 1x T-Shirt", token: "ETH", amount: "0.1901", usd: "$495.00", chain: "Ethereum", hash: "0x3f4a...8b2c", status: "confirmed", time: "2m ago" },
  { id: "ORD-9820", item: "1x Sneakers Pro", token: "SOL", amount: "4.2", usd: "$320.00", chain: "Solana", hash: "5xHj...9kLm", status: "confirmed", time: "18m ago" },
  { id: "ORD-9819", item: "3x Premium Hoodie", token: "USDC", amount: "210.00", usd: "$210.00", chain: "Base", hash: "0xa1b2...7c3d", status: "pending", time: "34m ago" },
  { id: "ORD-9818", item: "1x Limited Edition Cap", token: "BTC", amount: "0.0041", usd: "$180.00", chain: "Bitcoin", hash: "bc1q...xz9f", status: "confirmed", time: "1h ago" },
  { id: "ORD-9817", item: "2x Running Shoes", token: "ETH", amount: "0.3102", usd: "$810.00", chain: "Ethereum", hash: "0x8e2f...1a4b", status: "failed", time: "2h ago" },
];

const WALLET_TOKENS = [
  { symbol: "ETH", name: "Ethereum", icon: "⟠", usd: "$2,140.00", qty: "0.82 ETH", change: "+2.4%", up: true, bg: "rgba(98,126,234,0.15)", color: "#627eea" },
  { symbol: "SOL", name: "Solana", icon: "◎", usd: "$895.00", qty: "11.9 SOL", change: "+5.1%", up: true, bg: "rgba(153,69,255,0.15)", color: "#9945ff" },
  { symbol: "USDC", name: "USD Coin", icon: "$", usd: "$520.00", qty: "520.00 USDC", change: "0.0%", up: true, bg: "rgba(39,117,202,0.15)", color: "#2775ca" },
  { symbol: "BTC", name: "Bitcoin", icon: "₿", usd: "$320.00", qty: "0.0048 BTC", change: "-1.2%", up: false, bg: "rgba(247,147,26,0.15)", color: "#f7931a" },
];

const CHART_DATA = [62, 78, 55, 90, 72, 85, 95, 68, 88, 92, 76, 100];

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

// ── Pages ─────────────────────────────────────────────────────────────────

function Dashboard({ setPage }) {
  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Good morning, Alex ✦</div>
          <div className="page-sub">Here's what's happening with your IZOQ account</div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-ghost" onClick={() => setPage("api")}>⚡ API Keys</button>
          <button className="btn btn-primary" onClick={() => setPage("checkout")}>+ New Checkout</button>
        </div>
      </div>

      <div className="stats-grid">
        {[
          { label: "Total Volume (30d)", value: "$48,290", sub: "↑ 23% vs last month", cls: "green" },
          { label: "Settled Today", value: "$4,105", sub: "↑ 12 transactions", cls: "blue" },
          { label: "Pending Payouts", value: "$1,820", sub: "2 awaiting settlement", cls: "orange" },
          { label: "Active Orders", value: "7", sub: "3 in last hour", cls: "purple" },
        ].map((s, i) => (
          <div key={i} className={`stat-card ${s.cls}`}>
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Mini Chart */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div className="section-title">
          Revenue (Last 12 weeks)
          <span className="see-all" onClick={() => setPage("transactions")}>View all →</span>
        </div>
        <div className="mini-chart">
          {CHART_DATA.map((h, i) => (
            <div key={i} className="bar" style={{
              height: `${h}%`,
              background: `linear-gradient(180deg, #00e5a0, #0066ff)`,
              opacity: i === CHART_DATA.length - 1 ? 1 : 0.4 + (i / CHART_DATA.length) * 0.4
            }} />
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="card">
        <div className="section-title">
          Recent Orders
          <span className="see-all" onClick={() => setPage("transactions")}>View all →</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Items</th>
                <th>Token</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {TRANSACTIONS.slice(0, 4).map((tx, i) => (
                <tr key={i}>
                  <td><span className="mono" style={{ fontSize: 13 }}>{tx.id}</span></td>
                  <td style={{ color: "var(--muted)", fontSize: 13 }}>{tx.item}</td>
                  <td><TokenBadge token={tx.token} /></td>
                  <td>
                    <div style={{ fontWeight: 700 }}>{tx.usd}</div>
                    <div className="hash">{tx.amount} {tx.token}</div>
                  </td>
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


function Transactions() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? TRANSACTIONS : TRANSACTIONS.filter(t => t.status === filter);

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Transactions</div>
          <div className="page-sub">Full order history with on-chain proof</div>
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
                <th>Order ID</th>
                <th>Items</th>
                <th>Token</th>
                <th>Chain</th>
                <th>Fiat Value</th>
                <th>Tx Hash</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((tx, i) => (
                <tr key={i}>
                  <td><span className="mono">{tx.id}</span></td>
                  <td style={{ color: "var(--muted)", fontSize: 13, maxWidth: 200 }}>{tx.item}</td>
                  <td><TokenBadge token={tx.token} /></td>
                  <td><span className="chain-chip">{tx.chain}</span></td>
                  <td>
                    <div style={{ fontWeight: 700 }}>{tx.usd}</div>
                    <div className="hash">{tx.amount} {tx.token}</div>
                  </td>
                  <td>
                    <div className="hash">
                      <a href="#" onClick={e => e.preventDefault()}>{tx.hash}</a>
                    </div>
                  </td>
                  <td><StatusBadge s={tx.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


function CheckoutBuilder() {
  const [tokens, setTokens] = useState({ ETH: true, SOL: false, BTC: false, USDC: true });
  const [items, setItems] = useState([{ name: "Denim Jeans", qty: 2, price: 180 }, { name: "T-Shirt", qty: 1, price: 45 }]);
  const [countdown, setCountdown] = useState(900);

  useEffect(() => {
    const t = setInterval(() => setCountdown(c => c > 0 ? c - 1 : 900), 1000);
    return () => clearInterval(t);
  }, []);

  const toggleToken = k => setTokens(t => ({ ...t, [k]: !t[k] }));
  const total = items.reduce((sum, i) => sum + i.qty * i.price, 0);
  const mins = Math.floor(countdown / 60);
  const secs = String(countdown % 60).padStart(2, "0");

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Checkout Builder</div>
          <div className="page-sub">IZOQ Inlet — Configure your payment gateway</div>
        </div>
        <button className="btn btn-primary">⬇ Export API Config</button>
      </div>

      <div className="grid-2">
        <div>
          <div className="card" style={{ marginBottom: 20 }}>
            <div className="section-title">Accepted Tokens</div>
            <div className="token-list">
              {["ETH", "SOL", "BTC", "USDC"].map(t => (
                <button key={t} className={`token-toggle ${tokens[t] ? "active" : ""}`} onClick={() => toggleToken(t)}>
                  <span className={`token-dot ${t.toLowerCase()}-dot`} />
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="card" style={{ marginBottom: 20 }}>
            <div className="section-title">Order Line Items</div>
            {items.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                <input className="input" value={item.name} onChange={e => {
                  const n = [...items]; n[i].name = e.target.value; setItems(n);
                }} placeholder="Item name" style={{ flex: 2 }} />
                <input className="input" type="number" value={item.qty} min={1} onChange={e => {
                  const n = [...items]; n[i].qty = +e.target.value; setItems(n);
                }} style={{ flex: 1 }} />
                <input className="input" type="number" value={item.price} onChange={e => {
                  const n = [...items]; n[i].price = +e.target.value; setItems(n);
                }} placeholder="$" style={{ flex: 1 }} />
              </div>
            ))}
            <button className="btn btn-ghost" style={{ width: "100%", marginTop: 4 }}
              onClick={() => setItems([...items, { name: "", qty: 1, price: 0 }])}>
              + Add Item
            </button>
          </div>

          <div className="card">
            <div className="section-title">Rate Lock Settings</div>
            <div style={{ fontSize: 14, color: "var(--muted)", marginBottom: 12 }}>
              IZOQ locks exchange rates for <strong style={{ color: "var(--text)" }}>15 minutes</strong> protecting merchants from volatility.
            </div>
            <div className="fee-bar">
              <span style={{ color: "var(--muted)" }}>Platform Fee</span>
              <span style={{ color: "var(--accent)", fontWeight: 700 }}>1.0%</span>
            </div>
            <div className="fee-bar" style={{ marginTop: 6 }}>
              <span style={{ color: "var(--muted)" }}>Settlement</span>
              <span style={{ fontWeight: 600 }}>Instant (NIP / Visa Direct)</span>
            </div>
          </div>
        </div>

        <div>
          <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 10, letterSpacing: 1 }}>LIVE PREVIEW</div>
          <div className="checkout-preview">
            <div className="checkout-header">
              <div>
                <div style={{ fontWeight: 700 }}>IZOQ Checkout</div>
                <div style={{ fontSize: 11, color: "var(--muted)" }}>Secured by IZOQ</div>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                {Object.entries(tokens).filter(([, v]) => v).map(([k]) => (
                  <span key={k} className="token-badge"><span className={`token-dot ${k.toLowerCase()}-dot`} />{k}</span>
                ))}
              </div>
            </div>

            <div className="checkout-body">
              {items.filter(i => i.name).map((item, i) => (
                <div key={i} className="checkout-item">
                  <span>{item.qty}x {item.name}</span>
                  <span style={{ fontWeight: 600 }}>${(item.qty * item.price).toFixed(2)}</span>
                </div>
              ))}

              <div className="checkout-total">
                <span>Total</span>
                <span style={{ color: "var(--accent)" }}>${total.toFixed(2)}</span>
              </div>

              <div className="rate-lock">
                <span>🔒</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: "var(--muted)" }}>Rate locked for</div>
                  <div className="countdown">{mins}:{secs}</div>
                </div>
                <div style={{ textAlign: "right", fontSize: 12, color: "var(--muted)" }}>
                  ≈ {(total / 2605).toFixed(4)} ETH
                </div>
              </div>

              <button className="btn btn-primary" style={{ width: "100%", marginTop: 14, justifyContent: "center" }}>
                Pay with Crypto
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


function Verification({ setPage }) {
  const [kybComplete, setKybComplete] = useState(false);
  const steps = [
    { label: "Business Registration (CAC)", desc: "Upload CAC Certificate or local business registration docs", status: "done" },
    { label: "KYB Verification", desc: "Real-time validation via Smile ID / Dojah government database", status: "done" },
    { label: "UBO Personal KYC", desc: "National ID + Liveness selfie via Sumsub/Persona", status: kybComplete ? "done" : "active" },
    { label: "AML Screening", desc: "Wallet blacklist check & transaction monitoring enabled", status: kybComplete ? "done" : "todo" },
    { label: "Tax ID Linkage", desc: "Link CAC/NIN to auto-report to Nigeria Revenue Service (NRS)", status: kybComplete ? "done" : "todo" },
  ];
  const progress = kybComplete ? 100 : 60;

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Verification Center</div>
          <div className="page-sub">KYB & KYC — 2026 Nigeria Tax Act compliance</div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="section-title">Compliance Progress</div>
          <div className="progress-wrap">
            <div className="progress-label">
              <span>Verification Status</span>
              <span style={{ color: "var(--accent)" }}>{progress}%{kybComplete ? " — Fully Verified" : ""}</span>
            </div>
            <div className="progress-bar"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
          </div>

          {steps.map((s, i) => (
            <div key={i} className="kyc-step">
              <div className={`step-num step-${s.status}`}>
                {s.status === "done" ? "✓" : s.status === "active" ? "→" : i + 1}
              </div>
              <div>
                <div className="step-title">{s.label}</div>
                <div className="step-desc">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Original KYC form */}
          <div className="card">
            <div className="section-title">Complete KYC</div>
            <div className="input-group">
              <label className="input-label">Full Legal Name</label>
              <input className="input" placeholder="As on National ID" />
            </div>
            <div className="input-group">
              <label className="input-label">ID Type</label>
              <select className="input">
                <option>National ID (NIN)</option>
                <option>Driver's License</option>
                <option>International Passport</option>
              </select>
            </div>
            <div className="input-group">
              <label className="input-label">ID Number</label>
              <input className="input" placeholder="Enter ID number" />
            </div>
            <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}
              onClick={() => setKybComplete(true)}>
              📷 Verify with Liveness Check
            </button>
          </div>

          {/* Regulatory Info */}
          <div className="card">
            <div className="section-title">Regulatory Info</div>
            <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.7 }}>
              IZOQ complies with the <strong style={{ color: "var(--text)" }}>2026 Nigeria Tax Act</strong>. Transaction volumes are automatically reported to the NRS using your CAC/NIN as a universal Tax ID. AML monitoring tracks all transaction hashes in real-time.
            </div>
          </div>

          {/* Wallet CTA — only unlocked after KYB/KYC complete */}
          {kybComplete && (
            <div style={{
              background: "linear-gradient(135deg, rgba(0,229,160,0.08), rgba(0,102,255,0.08))",
              border: "1px solid rgba(0,229,160,0.3)",
              borderRadius: 16,
              padding: 24,
              animation: "fadeIn 0.4s ease",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <div style={{
                  width: 44, height: 44,
                  background: "rgba(0,229,160,0.15)",
                  borderRadius: 12,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 22,
                }}>◈</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>Merchant Wallet Unlocked</div>
                  <div style={{ fontSize: 12, color: "var(--accent)" }}>KYB/KYC verification complete ✦</div>
                </div>
              </div>
              <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 16, lineHeight: 1.6 }}>
                Your business is fully verified. You can now generate a dedicated multi-chain wallet to receive crypto payments — or import an existing wallet you already use (Bitget, MetaMask, etc.).
              </div>
              <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}
                onClick={() => setPage("merchantwallet")}>
                ◈ Set Up Merchant Wallet →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


// ── Shared: mock wallet generator ─────────────────────────────────────────
function generateMnemonic() {
  const words = ["abandon","ability","able","about","above","absent","absorb","abstract","absurd","abuse",
    "access","accident","account","accuse","achieve","acid","acoustic","acquire","across","act",
    "action","actor","actress","actual","adapt","add","addict","address","adjust","admit",
    "advance","advice","aerobic","afford","afraid","again","agent","agree","ahead","aim","air",
    "airport","aisle","alarm","album","alcohol","alert","alien","all","alley","allow","almost",
    "alone","alpha","already","also","alter","always","amateur","amazing","among","amount","amused"];
  return Array.from({ length: 12 }, () => words[Math.floor(Math.random() * words.length)]).join(" ");
}

function generateAddress(prefix) {
  const hex = "0123456789abcdef";
  const rand = (n) => Array.from({ length: n }, () => hex[Math.floor(Math.random() * hex.length)]).join("");
  if (prefix === "0x") return "0x" + rand(40);
  if (prefix === "bc1q") return "bc1q" + rand(38);
  return rand(44);
}

// ── Merchant Wallet Page ──────────────────────────────────────────────────
function MerchantWallet() {
  const [walletState, setWalletState] = useState("none"); // none | setup | generated | imported
  const [setupMode, setSetupMode] = useState(null);       // generate | import
  const [step, setStep] = useState(1);
  const [mnemonic, setMnemonic] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [confirmWord, setConfirmWord] = useState("");
  const [importMethod, setImportMethod] = useState("seed"); // seed | address
  const [importInput, setImportInput] = useState("");
  const [importAddresses, setImportAddresses] = useState([]);
  const [copied, setCopied] = useState("");
  const [showSeed, setShowSeed] = useState(false);
  const [generatedWallet, setGeneratedWallet] = useState(null);

  const CHAINS = [
    { name: "Bitcoin", icon: "₿", color: "#f7931a", prefix: "bc1q", chain: "BTC" },
    { name: "Ethereum", icon: "⟠", color: "#627eea", prefix: "0x", chain: "ETH" },
    { name: "BNB Chain", icon: "🟡", color: "#f3ba2f", prefix: "0x", chain: "BNB" },
    { name: "Solana", icon: "◎", color: "#9945ff", prefix: "", chain: "SOL" },
    { name: "TRON (TRC-20)", icon: "◈", color: "#ef0027", prefix: "T", chain: "TRX" },
    { name: "Ripple XRP", icon: "💧", color: "#00aae4", prefix: "r", chain: "XRP" },
    { name: "Cardano", icon: "💙", color: "#0033ad", prefix: "addr1", chain: "ADA" },
    { name: "Polygon", icon: "🟣", color: "#8247e5", prefix: "0x", chain: "MATIC" },
    { name: "Avalanche", icon: "🔺", color: "#e84142", prefix: "0x", chain: "AVAX" },
    { name: "Litecoin", icon: "Ł", color: "#bfbbbb", prefix: "L", chain: "LTC" },
    { name: "Dogecoin", icon: "🐕", color: "#c2a633", prefix: "D", chain: "DOGE" },
    { name: "Polkadot", icon: "⚫", color: "#e6007a", prefix: "1", chain: "DOT" },
    { name: "Stellar XLM", icon: "✦", color: "#7d00ff", prefix: "G", chain: "XLM" },
    { name: "Cosmos ATOM", icon: "⚛", color: "#2e3148", prefix: "cosmos1", chain: "ATOM" },
    { name: "Algorand", icon: "🌀", color: "#00b4d8", prefix: "", chain: "ALGO" },
    { name: "Fantom", icon: "👻", color: "#1969ff", prefix: "0x", chain: "FTM" },
    { name: "Tezos", icon: "🔵", color: "#2c7df7", prefix: "tz1", chain: "XTZ" },
    { name: "Monero", icon: "🔒", color: "#ff6600", prefix: "4", chain: "XMR" },
    { name: "Zcash", icon: "🛡", color: "#f4b728", prefix: "t1", chain: "ZEC" },
    { name: "Dash", icon: "🔷", color: "#008de4", prefix: "X", chain: "DASH" },
    { name: "EOS", icon: "⚡", color: "#000000", prefix: "", chain: "EOS" },
    { name: "Base", icon: "🔵", color: "#0052ff", prefix: "0x", chain: "BASE" },
    { name: "Arbitrum", icon: "🔷", color: "#28a0f0", prefix: "0x", chain: "ARB" },
    { name: "Optimism", icon: "🔴", color: "#ff0420", prefix: "0x", chain: "OP" },
    { name: "Cronos", icon: "🔶", color: "#002d74", prefix: "0x", chain: "CRO" },
    { name: "NEAR", icon: "🌐", color: "#00c08b", prefix: "", chain: "NEAR" },
    { name: "Hedera HBAR", icon: "📡", color: "#222222", prefix: "0.0.", chain: "HBAR" },
    { name: "Filecoin", icon: "🗄", color: "#0090ff", prefix: "f1", chain: "FIL" },
    { name: "TON", icon: "💎", color: "#0088cc", prefix: "", chain: "TON" },
];

  const startGenerate = () => {
    const seed = generateMnemonic();
    setMnemonic(seed);
    setSetupMode("generate");
    setWalletState("setup");
    setStep(1);
    setConfirmed(false);
    setConfirmWord("");
  };

  const startImport = () => {
    setSetupMode("import");
    setWalletState("setup");
    setStep(1);
    setImportInput("");
    setImportAddresses([]);
  };

  const confirmGenerate = () => {
    const words = mnemonic.split(" ");
    const wallet = {
      addresses: CHAINS.map(c => ({ ...c, address: generateAddress(c.prefix) })),
      mnemonic,
      created: new Date().toLocaleString(),
      source: "IZOQ Generated",
    };
    setGeneratedWallet(wallet);
    setWalletState("generated");
  };

  const confirmImport = () => {
    const wallet = {
      addresses: CHAINS.map(c => ({ ...c, address: generateAddress(c.prefix) })),
      mnemonic: importMethod === "seed" ? importInput : null,
      externalAddresses: importMethod === "address" ? importAddresses : null,
      created: new Date().toLocaleString(),
      source: importMethod === "seed" ? "Imported via Seed Phrase" : "Imported via External Addresses",
    };
    setGeneratedWallet(wallet);
    setWalletState("imported");
  };

  const copyText = (text, key) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(key);
    setTimeout(() => setCopied(""), 2000);
  };

  const mnemonicWords = mnemonic.split(" ");
  // Pick a random word index to confirm
  const confirmIdx = mnemonic ? (mnemonicWords.length > 3 ? 4 : 1) : 0;
  const seedValid = confirmWord.trim().toLowerCase() === (mnemonicWords[confirmIdx - 1] || "").toLowerCase();

  // ── No wallet yet ──
  if (walletState === "none") {
    return (
      <div>
        <div className="page-header">
          <div>
            <div className="page-title">Merchant Wallet</div>
            <div className="page-sub">Your dedicated multi-chain receiving wallet — linked to your merchant account</div>
          </div>
        </div>

        {/* Hero */}
        <div style={{
          background: "linear-gradient(135deg, rgba(0,229,160,0.05) 0%, rgba(0,102,255,0.07) 100%)",
          border: "1px solid rgba(0,229,160,0.15)",
          borderRadius: 20,
          padding: "40px 36px",
          textAlign: "center",
          marginBottom: 24,
        }}>
          <div style={{ fontSize: 52, marginBottom: 16 }}>◈</div>
          <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>No Wallet Connected Yet</div>
          <div style={{ fontSize: 14, color: "var(--muted)", maxWidth: 480, margin: "0 auto 28px" }}>
            Generate a fresh IZOQ multi-chain wallet or import one you already own (from Bitget, MetaMask, Trust Wallet, etc.). This wallet will receive crypto from customers and sync automatically to the IZOQ User Outlet.
          </div>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn btn-primary" style={{ padding: "14px 28px", fontSize: 15 }} onClick={startGenerate}>
              ✦ Generate New Wallet
            </button>
            <button className="btn btn-ghost" style={{ padding: "14px 28px", fontSize: 15 }} onClick={startImport}>
              ⬇ Import Existing Wallet
            </button>
          </div>
        </div>

        {/* Info cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          {[
            { icon: "🔗", title: "Multi-Chain", desc: "One wallet covers EVM chains (Ethereum, Base), Solana, Bitcoin, and TRON — all addresses under one seed." },
            { icon: "⇄", title: "Outlet Sync", desc: "Generated or imported wallets auto-link to your IZOQ User Outlet so you manage everything in one place." },
            { icon: "🛡", title: "Non-Custodial", desc: "IZOQ never holds your keys. Your seed phrase is encrypted locally and never leaves your device." },
          ].map((c, i) => (
            <div key={i} className="card" style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>{c.title}</div>
              <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>{c.desc}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Generate flow ──
  if (walletState === "setup" && setupMode === "generate") {
    return (
      <div>
        <div className="page-header">
          <div>
            <div className="page-title">Generate Wallet</div>
            <div className="page-sub">Step {step} of 3 — Create your IZOQ multi-chain wallet</div>
          </div>
          <button className="btn btn-ghost" onClick={() => setWalletState("none")}>✕ Cancel</button>
        </div>

        {/* Step indicator */}
        <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
          {["Seed Phrase", "Backup Confirm", "Wallet Ready"].map((label, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{
                height: 4, borderRadius: 4,
                background: step > i ? "var(--accent)" : step === i + 1 ? "var(--accent2)" : "var(--surface2)",
                transition: "background 0.3s",
              }} />
              <div style={{ fontSize: 11, color: step === i + 1 ? "var(--text)" : "var(--muted)", textAlign: "center" }}>{label}</div>
            </div>
          ))}
        </div>

        {step === 1 && (
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <div className="card">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <div className="section-title" style={{ marginBottom: 0 }}>Your Secret Recovery Phrase</div>
                <button className="copy-btn" onClick={() => setShowSeed(s => !s)} style={{ padding: "5px 12px" }}>
                  {showSeed ? "🙈 Hide" : "👁 Reveal"}
                </button>
              </div>
              <div style={{
                background: "rgba(255,71,87,0.05)",
                border: "1px solid rgba(255,71,87,0.2)",
                borderRadius: 10,
                padding: "10px 14px",
                fontSize: 12,
                color: "#ff8a94",
                marginBottom: 20,
                display: "flex", gap: 8, alignItems: "flex-start",
              }}>
                <span style={{ flexShrink: 0 }}>⚠</span>
                <span>Never share this phrase with anyone. Anyone with these words can access all your funds. IZOQ will never ask for it.</span>
              </div>

              <div style={{
                display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 20,
                filter: showSeed ? "none" : "blur(8px)",
                userSelect: showSeed ? "text" : "none",
                transition: "filter 0.3s",
              }}>
                {mnemonicWords.map((word, i) => (
                  <div key={i} style={{
                    background: "var(--surface2)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    padding: "8px 12px",
                    display: "flex", gap: 8, alignItems: "center",
                  }}>
                    <span style={{ fontSize: 10, color: "var(--muted)", width: 16 }}>{i + 1}.</span>
                    <span style={{ fontFamily: "Space Mono", fontSize: 13, fontWeight: 700 }}>{word}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <button className="btn btn-ghost" style={{ flex: 1, justifyContent: "center" }}
                  onClick={() => copyText(mnemonic, "seed")}>
                  {copied === "seed" ? "✓ Copied!" : "📋 Copy Phrase"}
                </button>
                <button className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}
                  onClick={() => setStep(2)} disabled={!showSeed}>
                  I've saved it →
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ maxWidth: 520, margin: "0 auto" }}>
            <div className="card">
              <div className="section-title">Verify Your Backup</div>
              <div style={{ fontSize: 14, color: "var(--muted)", marginBottom: 20 }}>
                Enter word <strong style={{ color: "var(--accent)" }}>#{confirmIdx}</strong> from your recovery phrase to confirm you've saved it.
              </div>
              <div className="input-group">
                <label className="input-label">Word #{confirmIdx}</label>
                <input
                  className="input"
                  placeholder={`Enter word #${confirmIdx}`}
                  value={confirmWord}
                  onChange={e => setConfirmWord(e.target.value)}
                  style={{ fontFamily: "Space Mono", fontSize: 15 }}
                  autoFocus
                />
                {confirmWord && (
                  <div style={{ marginTop: 6, fontSize: 12, color: seedValid ? "var(--accent)" : "var(--danger)" }}>
                    {seedValid ? "✓ Correct!" : "✗ Doesn't match — check your phrase"}
                  </div>
                )}
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                <button className="btn btn-ghost" onClick={() => setStep(1)}>← Back</button>
                <button className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}
                  onClick={() => setStep(3)} disabled={!seedValid}>
                  Confirm & Generate →
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <div className="card" style={{ textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
              <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 6 }}>Wallet Ready to Activate</div>
              <div style={{ fontSize: 14, color: "var(--muted)", marginBottom: 28 }}>
                Clicking confirm will generate your multi-chain addresses and link them to your merchant account.
              </div>
              <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                <button className="btn btn-ghost" onClick={() => setStep(2)}>← Back</button>
                <button className="btn btn-primary" style={{ padding: "12px 32px" }} onClick={confirmGenerate}>
                  ✦ Generate My Wallet
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── Import flow ──
  if (walletState === "setup" && setupMode === "import") {
    return (
      <div>
        <div className="page-header">
          <div>
            <div className="page-title">Import Wallet</div>
            <div className="page-sub">Connect your existing wallet — Bitget, MetaMask, Trust Wallet, or any BIP-39 wallet</div>
          </div>
          <button className="btn btn-ghost" onClick={() => setWalletState("none")}>✕ Cancel</button>
        </div>

        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          {/* Method selector */}
          <div className="tabs" style={{ marginBottom: 24 }}>
            <button className={`tab ${importMethod === "seed" ? "active" : ""}`} onClick={() => setImportMethod("seed")}>
              🔑 Seed Phrase
            </button>
            <button className={`tab ${importMethod === "address" ? "active" : ""}`} onClick={() => setImportMethod("address")}>
              📋 Watch Addresses
            </button>
          </div>

          {importMethod === "seed" && (
            <div className="card">
              <div className="section-title">Import via Seed Phrase</div>
              <div style={{
                background: "rgba(255,71,87,0.05)",
                border: "1px solid rgba(255,71,87,0.2)",
                borderRadius: 10,
                padding: "10px 14px",
                fontSize: 12,
                color: "#ff8a94",
                marginBottom: 20,
                display: "flex", gap: 8,
              }}>
                <span style={{ flexShrink: 0 }}>⚠</span>
                <span>Enter your 12 or 24-word BIP-39 phrase. It is encrypted and stored only on your device — IZOQ never transmits or stores it.</span>
              </div>
              <div className="input-group">
                <label className="input-label">Recovery Phrase (12 or 24 words)</label>
                <textarea
                  className="input"
                  rows={4}
                  placeholder="word1 word2 word3 word4 word5 word6 word7 word8 word9 word10 word11 word12"
                  value={importInput}
                  onChange={e => setImportInput(e.target.value)}
                  style={{ fontFamily: "Space Mono", fontSize: 13, resize: "none" }}
                />
              </div>
              <div className="input-group">
                <label className="input-label">Derivation Path (optional)</label>
                <select className="input">
                  <option>m/44'/60'/0'/0 — Ethereum (default)</option>
                  <option>m/44'/501'/0'/0' — Solana</option>
                  <option>m/44'/0'/0'/0 — Bitcoin</option>
                  <option>Custom path...</option>
                </select>
              </div>
              <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}
                onClick={confirmImport}
                disabled={importInput.trim().split(" ").length < 12}>
                ⬇ Import & Derive Addresses
              </button>
            </div>
          )}

          {importMethod === "address" && (
            <div className="card">
              <div className="section-title">Import Watch Addresses</div>
              <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 20, lineHeight: 1.6 }}>
                Add receiving addresses for each chain. IZOQ will monitor these for incoming payments. <strong style={{ color: "var(--text)" }}>Read-only</strong> — no seed required.
              </div>
              {CHAINS.map((chain, i) => (
                <div key={i} className="input-group">
                  <label className="input-label" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ color: chain.color }}>{chain.icon}</span>
                    {chain.name}
                  </label>
                  <input
                    className="input"
                    placeholder={chain.prefix ? `${chain.prefix}...` : "Enter address..."}
                    value={importAddresses[i] || ""}
                    onChange={e => {
                      const arr = [...importAddresses];
                      arr[i] = e.target.value;
                      setImportAddresses(arr);
                    }}
                    style={{ fontFamily: "Space Mono", fontSize: 12 }}
                  />
                </div>
              ))}
              <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}
                onClick={confirmImport}
                disabled={importAddresses.filter(Boolean).length === 0}>
                ✦ Import Addresses
              </button>
            </div>
          )}

          {/* Supported wallets banner */}
          <div style={{
            marginTop: 20,
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            padding: "14px 18px",
          }}>
            <div style={{ fontSize: 11, color: "var(--muted)", letterSpacing: 1, marginBottom: 10 }}>COMPATIBLE WALLETS</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["Bitget Wallet", "MetaMask", "Trust Wallet", "Phantom", "Ledger", "Coinbase Wallet", "Rainbow", "OKX Wallet"].map(w => (
                <span key={w} style={{
                  background: "var(--surface2)",
                  border: "1px solid var(--border)",
                  borderRadius: 6,
                  padding: "4px 10px",
                  fontSize: 12,
                  color: "var(--muted)",
                }}>{w}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Wallet active (generated or imported) ──
  if (walletState === "generated" || walletState === "imported") {
    return (
      <div>
        <div className="page-header">
          <div>
            <div className="page-title">Merchant Wallet</div>
            <div className="page-sub">
              {walletState === "generated" ? "IZOQ Generated · " : "Imported · "}
              {generatedWallet?.created} ·
              <span style={{ color: "var(--accent)", marginLeft: 6 }}>✦ Active</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn-ghost" onClick={startImport}>⬇ Import Another</button>
            <button className="btn btn-danger" onClick={() => { setWalletState("none"); setGeneratedWallet(null); }}>
              ✕ Remove Wallet
            </button>
          </div>
        </div>

        {/* Source badge */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "rgba(0,229,160,0.08)",
          border: "1px solid rgba(0,229,160,0.25)",
          borderRadius: 10,
          padding: "8px 16px",
          fontSize: 13,
          marginBottom: 24,
        }}>
          <span style={{ color: "var(--accent)" }}>◈</span>
          <span>{generatedWallet?.source}</span>
          <span style={{ color: "var(--muted)", marginLeft: 4 }}>· Synced to Outlet ✓</span>
        </div>

        {/* Chain addresses */}
        <div className="card" style={{ marginBottom: 20 }}>
          <div className="section-title">
            Receiving Addresses
            <span style={{ fontSize: 12, color: "var(--muted)", fontWeight: 400 }}>Share these to receive crypto payments</span>
          </div>
          {generatedWallet?.addresses.map((chain, i) => (
            <div key={i} style={{
              padding: "16px 0",
              borderBottom: i < generatedWallet.addresses.length - 1 ? "1px solid var(--border)" : "none",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <div style={{
                  width: 36, height: 36,
                  background: chain.color + "22",
                  borderRadius: 9,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18, color: chain.color,
                  flexShrink: 0,
                }}>
                  {chain.icon}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{chain.name}</div>
                  <div style={{ fontSize: 11, color: "var(--muted)" }}>{chain.chain}</div>
                </div>
                <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                  <button className="copy-btn"
                    style={{ padding: "5px 12px" }}
                    onClick={() => copyText(chain.address, chain.chain)}>
                    {copied === chain.chain ? "✓ Copied" : "📋 Copy"}
                  </button>
                </div>
              </div>
              <div className="api-key-box" style={{ fontFamily: "Space Mono", fontSize: 12, wordBreak: "break-all" }}>
                <span style={{ color: "var(--text)" }}>{chain.address}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Outlet sync + seed backup panel */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div className="card">
            <div className="section-title">Outlet Sync Status</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { label: "IZOQ User Outlet", status: "Synced", color: "var(--accent)" },
                { label: "Merchant Dashboard", status: "Active", color: "var(--accent)" },
                { label: "Checkout API", status: "Receiving", color: "var(--accent2)" },
                { label: "AML Monitor", status: "Watching", color: "var(--accent)" },
              ].map((r, i) => (
                <div key={i} className="fee-bar">
                  <span style={{ color: "var(--muted)", fontSize: 13 }}>{r.label}</span>
                  <span style={{ color: r.color, fontSize: 12, fontWeight: 700 }}>● {r.status}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>
              This wallet is now available in the <strong style={{ color: "var(--text)" }}>User Outlet</strong> — switch to User mode to manage assets and withdraw to your bank.
            </div>
          </div>

          {walletState === "generated" && (
            <div className="card">
              <div className="section-title">Seed Phrase Backup</div>
              <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 14, lineHeight: 1.6 }}>
                Keep your seed phrase safe. This is the only way to recover your wallet if you lose access.
              </div>
              <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "center", marginBottom: 10 }}
                onClick={() => { setShowSeed(s => !s); }}>
                {showSeed ? "🙈 Hide Phrase" : "👁 Reveal Seed Phrase"}
              </button>
              {showSeed && (
                <div style={{
                  display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6, marginTop: 8,
                }}>
                  {mnemonicWords.map((word, i) => (
                    <div key={i} style={{
                      background: "var(--surface2)",
                      borderRadius: 6,
                      padding: "6px 10px",
                      display: "flex", gap: 6,
                    }}>
                      <span style={{ fontSize: 9, color: "var(--muted)", paddingTop: 2 }}>{i + 1}.</span>
                      <span style={{ fontFamily: "Space Mono", fontSize: 12, fontWeight: 700 }}>{word}</span>
                    </div>
                  ))}
                </div>
              )}
              {showSeed && (
                <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "center", marginTop: 10 }}
                  onClick={() => copyText(mnemonic, "seed2")}>
                  {copied === "seed2" ? "✓ Copied!" : "📋 Copy All Words"}
                </button>
              )}
            </div>
          )}

          {walletState === "imported" && (
            <div className="card">
              <div className="section-title">Import Another Wallet</div>
              <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 14, lineHeight: 1.6 }}>
                Want to use a different wallet or add additional receiving addresses? You can import another wallet at any time.
              </div>
              <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "center", marginBottom: 10 }} onClick={startImport}>
                ⬇ Import Another Wallet
              </button>
              <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "center" }} onClick={startGenerate}>
                ✦ Generate New Wallet Instead
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}


function ApiKeys() {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">API & Integration</div>
          <div className="page-sub">IZOQ Checkout API for merchant developers</div>
        </div>
      </div>

      <div className="grid-2">
        <div>
          <div className="card" style={{ marginBottom: 20 }}>
            <div className="section-title">API Keys</div>
            <div className="input-group">
              <label className="input-label">Live API Key</label>
              <div className="api-key-box">
                <span>izoq_live_sk_9xK2mPqR7vN4wL8tB3...</span>
                <button className="copy-btn" onClick={copy}>{copied ? "✓ Copied" : "Copy"}</button>
              </div>
            </div>
            <div className="input-group">
              <label className="input-label">Test API Key</label>
              <div className="api-key-box">
                <span>izoq_test_sk_2aH7jGcD5nM1kE6...</span>
                <button className="copy-btn">Copy</button>
              </div>
            </div>
            <button className="btn btn-danger" style={{ marginTop: 8 }}>⟳ Regenerate Keys</button>
          </div>

          <div className="card">
            <div className="section-title">Webhook Settings</div>
            <div className="input-group">
              <label className="input-label">Webhook URL</label>
              <input className="input" placeholder="https://your-site.com/izoq/webhook" />
            </div>
            <div className="input-group">
              <label className="input-label">Events to receive</label>
              {["payment.confirmed", "payment.pending", "settlement.complete"].map(ev => (
                <div key={ev} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <input type="checkbox" defaultChecked id={ev} />
                  <label htmlFor={ev} className="mono" style={{ fontSize: 12, cursor: "pointer" }}>{ev}</label>
                </div>
              ))}
            </div>
            <button className="btn btn-primary">Save Webhook</button>
          </div>
        </div>

        <div className="card">
          <div className="section-title">Quick Integration</div>
          <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 12 }}>Add the IZOQ checkout button to your site:</div>
          <div className="api-key-box" style={{ flexDirection: "column", alignItems: "flex-start", gap: 8, fontFamily: "Space Mono", lineHeight: 1.8 }}>
            <span style={{ color: "var(--muted)" }}>{"// 1. Install"}</span>
            <span>npm install @izoq/checkout</span>
            <br />
            <span style={{ color: "var(--muted)" }}>{"// 2. Initialize"}</span>
            <span>{`import IZOQ from '@izoq/checkout';`}</span>
            <br />
            <span>{`const izoq = new IZOQ({`}</span>
            <span>{`  apiKey: 'izoq_live_sk_...',`}</span>
            <span>{`  tokens: ['ETH', 'USDC'],`}</span>
            <span>{`  chains: ['ethereum', 'base'],`}</span>
            <span>{`  currency: 'NGN'`}</span>
            <span>{`});`}</span>
            <br />
            <span style={{ color: "var(--muted)" }}>{"// 3. Create payment"}</span>
            <span>{`const session = await izoq.createPayment({`}</span>
            <span>{`  amount: 49500, // in kobo`}</span>
            <span>{`  items: lineItems,`}</span>
            <span>{`  orderId: 'ORD-9822'`}</span>
            <span>{`});`}</span>
          </div>
        </div>
      </div>
    </div>
  );
}


// ── IZOQ Inlet App ────────────────────────────────────────────────────────

export default function IZOQInlet() {
  const [page, setPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const nav = [
    { id: "dashboard",      label: "Dashboard",        icon: "⬡" },
    { id: "transactions",   label: "Transactions",     icon: "≡", badge: "7" },
    { id: "checkout",       label: "Checkout Builder", icon: "⊕" },
    { id: "api",            label: "API & Integration",icon: "⌥" },
    { id: "verification",   label: "Verification",     icon: "✦" },
    { id: "merchantwallet", label: "Merchant Wallet",  icon: "◈" },
  ];

  const renderPage = () => {
    switch (page) {
      case "dashboard":      return <Dashboard setPage={setPage} />;
      case "transactions":   return <Transactions />;
      case "checkout":       return <CheckoutBuilder />;
      case "api":            return <ApiKeys />;
      case "verification":   return <Verification setPage={setPage} />;
      case "merchantwallet": return <MerchantWallet />;
      default:               return <Dashboard setPage={setPage} />;
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        {/* Hamburger */}
      <button className="hamburger" onClick={() => setSidebarOpen(true)}>☰</button>

      {/* Overlay */}
      <div className={`sidebar-overlay ${sidebarOpen ? "open" : ""}`} onClick={() => setSidebarOpen(false)} />

      <aside className={`sidebar ${sidebarOpen ? "mobile-open" : ""}`}>
          <div className="logo-wrap">
            <div className="logo"><div className="logo-dot" />IZOQ</div>
            <div className="logo-tag">Merchant Inlet</div>
          </div>

          <nav className="nav">
            <div className="nav-section">Merchant Tools</div>
            {nav.map(item => (
              <button
                key={item.id}
                className={`nav-item ${page === item.id ? "active" : ""}`}
                onClick={() => { setPage(item.id); setSidebarOpen(false); }}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
                {item.badge && <span className="badge">{item.badge}</span>}
              </button>
            ))}
          </nav>

          <div className="sidebar-footer">
            <div className="user-chip">
              <div className="avatar">AO</div>
              <div className="user-info">
                <div className="user-name">Alex Okafor</div>
                <div className="user-role">KYB VERIFIED ✦</div>
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
