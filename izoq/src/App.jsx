import { useState, useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  :root {
    --bg: #050810; --surface: #0d1220; --surface2: #131928;
    --border: rgba(255,255,255,0.06); --accent: #00e5a0;
    --accent2: #0066ff; --accent3: #ff6b35; --text: #f0f4ff;
    --muted: #5a6580; --danger: #ff4757;
  }
  html { scroll-behavior: smooth; }
  body { font-family: 'Syne', sans-serif; background: var(--bg); color: var(--text); overflow-x: hidden; cursor: none; }

  .cursor { position: fixed; width: 12px; height: 12px; background: var(--accent); border-radius: 50%; pointer-events: none; z-index: 9999; transform: translate(-50%,-50%); transition: width 0.2s, height 0.2s; mix-blend-mode: difference; }
  .cursor.hovering { width: 20px; height: 20px; }
  .cursor-ring { position: fixed; width: 36px; height: 36px; border: 1px solid rgba(0,229,160,0.4); border-radius: 50%; pointer-events: none; z-index: 9998; transform: translate(-50%,-50%); transition: width 0.25s, height 0.25s; }
  .cursor-ring.hovering { width: 56px; height: 56px; border-color: var(--accent); }

  body::before { content:''; position:fixed; inset:0; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E"); pointer-events:none; z-index:1; opacity:0.4; }

  nav { position:fixed; top:0; left:0; right:0; z-index:100; padding:20px 60px; display:flex; align-items:center; justify-content:space-between; background:rgba(5,8,16,0.8); backdrop-filter:blur(20px); border-bottom:1px solid var(--border); transition:all 0.3s; }
  .nav-logo { display:flex; align-items:center; gap:10px; font-size:22px; font-weight:800; letter-spacing:-1px; text-decoration:none; color:var(--text); cursor:none; }
  .logo-dot { width:8px; height:8px; background:var(--accent); border-radius:50%; box-shadow:0 0 14px var(--accent); animation:pulse 2s infinite; }
  .nav-links { display:flex; align-items:center; gap:36px; list-style:none; }
  .nav-links a { font-size:14px; font-weight:600; color:var(--muted); text-decoration:none; transition:color 0.2s; cursor:none; }
  .nav-links a:hover { color:var(--text); }
  .nav-cta { display:flex; gap:10px; }

  .btn { display:inline-flex; align-items:center; gap:8px; padding:10px 22px; border-radius:8px; font-family:'Syne',sans-serif; font-size:13px; font-weight:700; cursor:none; transition:all 0.2s; border:none; text-decoration:none; }
  .btn-primary { background:var(--accent); color:var(--bg); }
  .btn-primary:hover { opacity:0.88; transform:translateY(-2px); box-shadow:0 8px 24px rgba(0,229,160,0.25); }
  .btn-ghost { background:transparent; color:var(--text); border:1px solid var(--border); }
  .btn-ghost:hover { border-color:rgba(255,255,255,0.2); background:rgba(255,255,255,0.04); }
  .btn-lg { padding:15px 32px; font-size:15px; border-radius:10px; }
  .btn-xl { padding:18px 40px; font-size:16px; border-radius:12px; }

  .hero { min-height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:120px 40px 80px; position:relative; overflow:hidden; }
  .hero-bg { position:absolute; inset:0; z-index:0; }
  .hero-bg::before { content:''; position:absolute; top:-20%; left:50%; transform:translateX(-50%); width:800px; height:800px; background:radial-gradient(ellipse,rgba(0,229,160,0.08) 0%,transparent 70%); animation:heroGlow 6s ease-in-out infinite alternate; }
  .hero-bg::after { content:''; position:absolute; bottom:-10%; left:20%; width:500px; height:500px; background:radial-gradient(ellipse,rgba(0,102,255,0.07) 0%,transparent 70%); animation:heroGlow2 8s ease-in-out infinite alternate; }
  .hero-grid { position:absolute; inset:0; background-image:linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px); background-size:60px 60px; mask-image:radial-gradient(ellipse 80% 60% at 50% 50%,black,transparent); }
  .hero-content { position:relative; z-index:2; max-width:900px; }
  .hero-eyebrow { display:inline-flex; align-items:center; gap:8px; background:rgba(0,229,160,0.08); border:1px solid rgba(0,229,160,0.2); border-radius:100px; padding:6px 16px; font-size:11px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:var(--accent); margin-bottom:32px; animation:fadeUp 0.8s ease both; }
  .hero-eyebrow-dot { width:6px; height:6px; background:var(--accent); border-radius:50%; animation:pulse 2s infinite; }
  .hero-title { font-size:clamp(48px,7vw,88px); font-weight:800; line-height:1.0; letter-spacing:-3px; margin-bottom:28px; animation:fadeUp 0.8s 0.1s ease both; }
  .hero-title .line1 { display:block; color:var(--text); }
  .hero-title .line2 { display:block; background:linear-gradient(135deg,var(--accent) 0%,var(--accent2) 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
  .hero-sub { font-size:18px; color:var(--muted); max-width:560px; margin:0 auto 48px; line-height:1.7; font-weight:400; animation:fadeUp 0.8s 0.2s ease both; }
  .hero-sub strong { color:var(--text); font-weight:700; }
  .hero-actions { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; margin-bottom:64px; animation:fadeUp 0.8s 0.3s ease both; }
  .hero-stats { display:flex; gap:48px; justify-content:center; flex-wrap:wrap; animation:fadeUp 0.8s 0.4s ease both; }
  .hero-stat { text-align:center; }
  .hero-stat-value { font-size:28px; font-weight:800; letter-spacing:-1px; color:var(--text); display:block; }
  .hero-stat-label { font-size:12px; color:var(--muted); letter-spacing:1px; text-transform:uppercase; margin-top:4px; display:block; }
  .scroll-hint { position:absolute; bottom:32px; left:50%; transform:translateX(-50%); display:flex; flex-direction:column; align-items:center; gap:6px; color:var(--muted); font-size:11px; letter-spacing:2px; text-transform:uppercase; animation:fadeUp 1s 0.8s ease both; z-index:2; }
  .scroll-line { width:1px; height:40px; background:linear-gradient(to bottom,var(--muted),transparent); animation:scrollPulse 2s ease-in-out infinite; }

  .ticker-section { background:var(--surface); border-top:1px solid var(--border); border-bottom:1px solid var(--border); padding:20px 0; overflow:hidden; }
  .ticker-track { display:flex; animation:ticker 40s linear infinite; white-space:nowrap; }
  .ticker-item { display:inline-flex; align-items:center; gap:10px; padding:0 40px; font-size:13px; font-weight:700; color:var(--muted); font-family:'Space Mono',monospace; border-right:1px solid var(--border); }
  .ticker-item span { color:var(--accent); }

  section { padding:100px 60px; position:relative; }
  .section-label { font-size:10px; letter-spacing:3px; text-transform:uppercase; color:var(--accent); font-weight:700; margin-bottom:14px; }
  .section-title { font-size:clamp(32px,4vw,52px); font-weight:800; letter-spacing:-1.5px; line-height:1.1; margin-bottom:18px; }
  .section-sub { font-size:16px; color:var(--muted); max-width:520px; line-height:1.7; }

  .how-section { background:var(--surface); border-top:1px solid var(--border); border-bottom:1px solid var(--border); }
  .how-grid { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:start; max-width:1200px; margin:0 auto; }
  .steps-list { display:flex; flex-direction:column; }
  .step-item { display:flex; gap:24px; padding:28px 0; border-bottom:1px solid var(--border); opacity:0; transform:translateX(20px); transition:opacity 0.5s ease, transform 0.5s ease; }
  .step-item:last-child { border-bottom:none; }
  .step-item.visible { opacity:1; transform:translateX(0); }
  .step-number { font-family:'Space Mono',monospace; font-size:11px; color:var(--accent); font-weight:700; letter-spacing:1px; flex-shrink:0; padding-top:4px; width:32px; }
  .step-title { font-size:17px; font-weight:700; margin-bottom:6px; }
  .step-desc { font-size:13px; color:var(--muted); line-height:1.7; }

  .apps-grid { display:grid; grid-template-columns:1fr 1fr; gap:24px; margin-top:60px; }
  .app-card { border-radius:24px; padding:48px; border:1px solid var(--border); position:relative; overflow:hidden; transition:transform 0.3s, box-shadow 0.3s; opacity:0; transform:translateY(30px); }
  .app-card.visible { opacity:1; transform:translateY(0); transition:opacity 0.6s ease, transform 0.6s ease; }
  .app-card:hover { transform:translateY(-4px); box-shadow:0 24px 60px rgba(0,0,0,0.4); }
  .app-card.inlet { background:linear-gradient(135deg,rgba(0,229,160,0.06) 0%,rgba(0,102,255,0.04) 100%); border-color:rgba(0,229,160,0.15); }
  .app-card.outlet { background:linear-gradient(135deg,rgba(0,102,255,0.06) 0%,rgba(255,107,53,0.04) 100%); border-color:rgba(0,102,255,0.15); }
  .app-card::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; }
  .app-card.inlet::before { background:linear-gradient(90deg,var(--accent),var(--accent2)); }
  .app-card.outlet::before { background:linear-gradient(90deg,var(--accent2),var(--accent3)); }
  .app-icon { width:56px; height:56px; border-radius:16px; display:flex; align-items:center; justify-content:center; font-size:26px; margin-bottom:24px; position:relative; z-index:1; }
  .app-card.inlet .app-icon { background:rgba(0,229,160,0.12); }
  .app-card.outlet .app-icon { background:rgba(0,102,255,0.12); }
  .app-tag { display:inline-block; font-size:9px; font-weight:700; letter-spacing:2px; text-transform:uppercase; padding:3px 10px; border-radius:100px; margin-bottom:14px; position:relative; z-index:1; }
  .app-card.inlet .app-tag { background:rgba(0,229,160,0.1); color:var(--accent); }
  .app-card.outlet .app-tag { background:rgba(0,102,255,0.1); color:var(--accent2); }
  .app-name { font-size:28px; font-weight:800; letter-spacing:-1px; margin-bottom:10px; position:relative; z-index:1; }
  .app-desc { font-size:14px; color:var(--muted); line-height:1.75; margin-bottom:32px; position:relative; z-index:1; }
  .app-features { display:flex; flex-direction:column; gap:10px; margin-bottom:36px; position:relative; z-index:1; }
  .app-feature { display:flex; align-items:center; gap:10px; font-size:13px; color:var(--muted); }
  .feature-dot { width:6px; height:6px; border-radius:50%; flex-shrink:0; }
  .app-card.inlet .feature-dot { background:var(--accent); }
  .app-card.outlet .feature-dot { background:var(--accent2); }
  .app-cta { position:relative; z-index:1; display:flex; gap:10px; flex-wrap:wrap; }

  .ecosystem-section { background:var(--surface); border-top:1px solid var(--border); border-bottom:1px solid var(--border); text-align:center; }
  .ecosystem-inner { max-width:1000px; margin:0 auto; }
  .chains-grid { display:flex; justify-content:center; gap:12px; flex-wrap:wrap; margin:48px 0; }
  .chain-pill { display:flex; align-items:center; gap:10px; background:var(--surface2); border:1px solid var(--border); border-radius:100px; padding:8px 16px; font-size:13px; font-weight:700; transition:all 0.2s; cursor:default; }
  .chain-pill:hover { border-color:rgba(255,255,255,0.2); transform:translateY(-2px); }
  .chain-icon { font-size:16px; }
  .currencies-strip { display:flex; justify-content:center; gap:12px; flex-wrap:wrap; margin-top:24px; }
  .currency-chip { background:rgba(255,255,255,0.04); border:1px solid var(--border); border-radius:8px; padding:6px 14px; font-size:12px; font-weight:700; color:var(--muted); font-family:'Space Mono',monospace; }

  .compliance-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; margin-top:56px; max-width:1200px; margin-left:auto; margin-right:auto; }
  .compliance-card { background:var(--surface); border:1px solid var(--border); border-radius:20px; padding:32px; opacity:0; transform:translateY(24px); transition:opacity 0.5s ease, transform 0.5s ease; }
  .compliance-card.visible { opacity:1; transform:translateY(0); }
  .compliance-icon { font-size:28px; margin-bottom:16px; }
  .compliance-title { font-size:16px; font-weight:700; margin-bottom:8px; }
  .compliance-desc { font-size:13px; color:var(--muted); line-height:1.7; }

  .cta-section { text-align:center; padding:120px 60px; position:relative; overflow:hidden; }
  .cta-section::before { content:''; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:600px; height:600px; background:radial-gradient(ellipse,rgba(0,229,160,0.07) 0%,transparent 70%); pointer-events:none; }
  .cta-inner { position:relative; z-index:1; max-width:640px; margin:0 auto; }
  .cta-title { font-size:clamp(36px,5vw,60px); font-weight:800; letter-spacing:-2px; line-height:1.05; margin-bottom:20px; }
  .cta-sub { font-size:16px; color:var(--muted); margin-bottom:44px; line-height:1.7; }
  .cta-actions { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; }

  footer { background:var(--surface); border-top:1px solid var(--border); padding:60px; }
  .footer-inner { max-width:1200px; margin:0 auto; display:grid; grid-template-columns:2fr 1fr 1fr 1fr; gap:48px; }
  .footer-logo { display:flex; align-items:center; gap:8px; font-size:20px; font-weight:800; letter-spacing:-0.5px; margin-bottom:14px; text-decoration:none; color:var(--text); cursor:none; }
  .footer-tagline { font-size:13px; color:var(--muted); line-height:1.7; max-width:240px; margin-bottom:20px; }
  .footer-badge { display:inline-flex; align-items:center; gap:6px; background:rgba(0,229,160,0.08); border:1px solid rgba(0,229,160,0.2); border-radius:100px; padding:5px 12px; font-size:10px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:var(--accent); }
  .footer-col-title { font-size:11px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:var(--muted); margin-bottom:18px; }
  .footer-links { display:flex; flex-direction:column; gap:12px; list-style:none; }
  .footer-links a { font-size:13px; color:var(--muted); text-decoration:none; transition:color 0.2s; cursor:none; }
  .footer-links a:hover { color:var(--text); }
  .footer-bottom { max-width:1200px; margin:40px auto 0; padding-top:24px; border-top:1px solid var(--border); display:flex; align-items:center; justify-content:space-between; font-size:12px; color:var(--muted); }

  .modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.85); backdrop-filter:blur(12px); z-index:500; display:flex; align-items:center; justify-content:center; padding:20px; opacity:0; pointer-events:none; transition:opacity 0.3s; }
  .modal-overlay.open { opacity:1; pointer-events:all; }
  .modal { background:var(--surface); border:1px solid var(--border); border-radius:24px; padding:40px; width:100%; max-width:480px; transform:translateY(20px) scale(0.97); transition:transform 0.3s ease; position:relative; max-height:90vh; overflow-y:auto; }
  .modal-overlay.open .modal { transform:translateY(0) scale(1); }
  .modal-close { position:absolute; top:20px; right:20px; background:var(--surface2); border:none; border-radius:8px; width:32px; height:32px; color:var(--muted); cursor:none; font-size:16px; display:flex; align-items:center; justify-content:center; transition:all 0.15s; }
  .modal-close:hover { color:var(--text); }
  .modal-eyebrow { font-size:10px; letter-spacing:2px; text-transform:uppercase; color:var(--accent); font-weight:700; margin-bottom:10px; }
  .modal-title { font-size:24px; font-weight:800; letter-spacing:-0.5px; margin-bottom:6px; }
  .modal-sub { font-size:13px; color:var(--muted); margin-bottom:28px; line-height:1.6; }
  .form-group { margin-bottom:14px; }
  .form-label { font-size:11px; color:var(--muted); margin-bottom:5px; display:block; letter-spacing:0.5px; }
  .form-input { width:100%; background:var(--surface2); border:1px solid var(--border); border-radius:8px; padding:10px 14px; font-family:'Syne',sans-serif; font-size:14px; color:var(--text); outline:none; transition:border-color 0.15s; }
  .form-input:focus { border-color:var(--accent); }
  select.form-input { cursor:pointer; }
  .form-row { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
  .form-submit { width:100%; margin-top:8px; padding:13px; font-size:15px; justify-content:center; border-radius:10px; }
  .modal-footer { text-align:center; margin-top:16px; font-size:12px; color:var(--muted); line-height:1.6; }
  .modal-footer a { color:var(--accent); text-decoration:none; cursor:none; }
  .error-box { display:none; background:rgba(255,71,87,0.08); border:1px solid rgba(255,71,87,0.25); border-radius:8px; padding:10px 14px; font-size:12px; color:var(--danger); margin-bottom:12px; }
  .error-box.show { display:block; }

  .reveal { opacity:0; transform:translateY(28px); transition:opacity 0.6s ease, transform 0.6s ease; }
  .reveal.visible { opacity:1; transform:translateY(0); }

  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1);}50%{opacity:0.5;transform:scale(0.8);} }
  @keyframes fadeUp { from{opacity:0;transform:translateY(24px);}to{opacity:1;transform:translateY(0);} }
  @keyframes heroGlow { from{transform:translateX(-50%) scale(1);opacity:0.6;}to{transform:translateX(-50%) scale(1.15);opacity:1;} }
  @keyframes heroGlow2 { from{transform:scale(1) translateX(0);opacity:0.5;}to{transform:scale(1.2) translateX(40px);opacity:0.9;} }
  @keyframes scrollPulse { 0%,100%{opacity:0.4;transform:scaleY(1);}50%{opacity:1;transform:scaleY(1.2);} }
  @keyframes ticker { from{transform:translateX(0);}to{transform:translateX(-50%);} }

  /* ── Mobile nav drawer ── */
  .mobile-menu-btn { display:none; background:transparent; border:1px solid var(--border); border-radius:8px; padding:8px 10px; color:var(--text); cursor:pointer; font-size:18px; line-height:1; }
  .mobile-nav { display:none; position:fixed; inset:0; background:rgba(5,8,16,0.98); backdrop-filter:blur(24px); z-index:99; flex-direction:column; align-items:center; justify-content:center; gap:32px; }
  .mobile-nav.open { display:flex; }
  .mobile-nav a, .mobile-nav button { font-size:24px; font-weight:800; color:var(--text); text-decoration:none; background:none; border:none; cursor:pointer; letter-spacing:-0.5px; transition:color 0.2s; }
  .mobile-nav a:hover, .mobile-nav button:hover { color:var(--accent); }
  .mobile-nav-close { position:absolute; top:24px; right:24px; background:var(--surface2); border:none; border-radius:8px; width:40px; height:40px; color:var(--muted); cursor:pointer; font-size:20px; display:flex; align-items:center; justify-content:center; }
  .mobile-nav-cta { display:flex; flex-direction:column; gap:12px; width:100%; max-width:280px; margin-top:16px; }
  .mobile-nav-cta .btn { justify-content:center; padding:16px; font-size:15px; border-radius:12px; }

  /* ── Tablet 768–1024px ── */
  @media(max-width:1024px){
    nav { padding:16px 32px; }
    .nav-links { gap:20px; }
    .hero { padding:110px 32px 70px; }
    section { padding:80px 32px; }
    .how-grid { gap:48px; }
    .apps-grid { gap:16px; }
    .app-card { padding:36px; }
    .footer-inner { grid-template-columns:1fr 1fr; gap:40px; }
    footer { padding:48px 32px; }
    .compliance-grid { grid-template-columns:repeat(2,1fr); }
    .cta-section { padding:100px 32px; }
  }

  /* ── Mobile ≤768px ── */
  @media(max-width:768px){
    body { cursor:auto; }
    .cursor, .cursor-ring { display:none; }

    /* Nav */
    nav { padding:14px 20px; }
    .nav-links { display:none; }
    .nav-cta { display:none; }
    .mobile-menu-btn { display:flex; align-items:center; justify-content:center; }

    /* Hero */
    .hero { padding:100px 20px 60px; min-height:100svh; }
    .hero-eyebrow { font-size:9px; letter-spacing:1px; padding:5px 12px; text-align:center; }
    .hero-title { letter-spacing:-1.5px; margin-bottom:20px; }
    .hero-sub { font-size:15px; margin-bottom:36px; padding:0 4px; }
    .hero-actions { flex-direction:column; align-items:center; gap:12px; margin-bottom:48px; }
    .hero-actions .btn-xl { width:100%; max-width:320px; justify-content:center; padding:16px 24px; font-size:15px; }
    .hero-stats { gap:0; width:100%; border:1px solid var(--border); border-radius:16px; overflow:hidden; }
    .hero-stat { flex:1; padding:16px 8px; border-right:1px solid var(--border); }
    .hero-stat:last-child { border-right:none; }
    .hero-stat-value { font-size:18px; }
    .hero-stat-label { font-size:9px; letter-spacing:0.5px; }
    .scroll-hint { display:none; }

    /* Ticker */
    .ticker-item { padding:0 24px; font-size:12px; }

    /* Sections */
    section { padding:60px 20px; }
    .section-title { letter-spacing:-0.5px; }

    /* How it works */
    .how-section { padding:60px 20px; }
    .how-grid { grid-template-columns:1fr; gap:36px; }
    .step-item { padding:20px 0; gap:16px; }
    .step-title { font-size:15px; }
    .step-desc { font-size:13px; }

    /* Apps */
    .apps-grid { grid-template-columns:1fr; gap:16px; }
    .app-card { padding:28px 24px; border-radius:20px; }
    .app-icon { width:48px; height:48px; font-size:22px; margin-bottom:16px; }
    .app-name { font-size:22px; }
    .app-desc { font-size:13px; margin-bottom:24px; }
    .app-features { gap:8px; margin-bottom:28px; }
    .app-feature { font-size:12px; }
    .app-cta { flex-direction:column; }
    .app-cta .btn-lg { justify-content:center; padding:14px; font-size:14px; width:100%; }

    /* Ecosystem */
    .ecosystem-section { padding:60px 20px; }
    .chains-grid { gap:8px; margin:32px 0; }
    .chain-pill { padding:6px 12px; font-size:12px; gap:6px; border-radius:100px; }
    .chain-icon { font-size:14px; }
    .currencies-strip { gap:8px; }
    .currency-chip { padding:5px 10px; font-size:11px; }

    /* Compliance */
    .compliance-grid { grid-template-columns:1fr; gap:12px; margin-top:36px; }
    .compliance-card { padding:24px; border-radius:16px; }
    .compliance-icon { font-size:24px; margin-bottom:12px; }
    .compliance-title { font-size:15px; }
    .compliance-desc { font-size:12px; }

    /* CTA */
    .cta-section { padding:70px 20px; }
    .cta-title { letter-spacing:-1px; }
    .cta-sub { font-size:14px; margin-bottom:32px; }
    .cta-actions { flex-direction:column; align-items:center; }
    .cta-actions .btn-xl { width:100%; max-width:320px; justify-content:center; padding:16px 24px; font-size:15px; }

    /* Footer */
    footer { padding:40px 20px; }
    .footer-inner { grid-template-columns:1fr; gap:32px; }
    .footer-bottom { flex-direction:column; gap:8px; text-align:center; margin-top:24px; }

    /* Modal */
    .modal { padding:28px 20px; border-radius:20px; max-height:95svh; }
    .modal-title { font-size:20px; }
    .modal-sub { font-size:12px; margin-bottom:20px; }
    .form-row { grid-template-columns:1fr; gap:0; }
    .form-input { font-size:16px; } /* prevents iOS zoom */
    .form-submit { padding:15px; font-size:14px; }
  }

  /* ── Small phones ≤380px ── */
  @media(max-width:380px){
    .hero-eyebrow { font-size:8px; }
    .app-card { padding:24px 18px; }
    .chain-pill { font-size:11px; padding:5px 10px; }
  }
`;

const CHAINS = [
  {icon:"₿", name:"Bitcoin"}, {icon:"⟠", name:"Ethereum"}, {icon:"🟡", name:"BNB Chain"},
  {icon:"◎", name:"Solana"}, {icon:"◈", name:"TRON"}, {icon:"💧", name:"Ripple XRP"},
  {icon:"💙", name:"Cardano"}, {icon:"🟣", name:"Polygon"}, {icon:"🔺", name:"Avalanche"},
  {icon:"Ł", name:"Litecoin"}, {icon:"🐕", name:"Dogecoin"}, {icon:"⚫", name:"Polkadot"},
  {icon:"✦", name:"Stellar XLM"}, {icon:"⚛", name:"Cosmos"}, {icon:"🌀", name:"Algorand"},
  {icon:"👻", name:"Fantom"}, {icon:"🔵", name:"Tezos"}, {icon:"🔒", name:"Monero"},
  {icon:"🛡", name:"Zcash"}, {icon:"🔷", name:"Dash"}, {icon:"⚡", name:"EOS"},
  {icon:"🔵", name:"Base"}, {icon:"🔷", name:"Arbitrum"}, {icon:"🔴", name:"Optimism"},
  {icon:"🔶", name:"Cronos"}, {icon:"🌐", name:"NEAR"}, {icon:"📡", name:"Hedera"},
  {icon:"🗄", name:"Filecoin"}, {icon:"💎", name:"TON"},
];

const TICKER = [
  ["BTC/NGN","₦62,400,000"],["ETH/NGN","₦4,102,000"],["BNB/NGN","₦940,000"],
  ["SOL/NGN","₦120,400"],["XRP/NGN","₦920"],["ADA/NGN","₦720"],
  ["DOGE/NGN","₦258"],["MATIC/NGN","₦1,140"],["AVAX/NGN","₦56,200"],
  ["LTC/NGN","₦128,400"],["DOT/NGN","₦11,080"],["TRX/NGN","₦242"],
  ["XLM/NGN","₦194"],["ALGO/NGN","₦348"],["TON/NGN","₦8,240"],
  ["ARB/NGN","₦2,460"],["USDT/NGN","₦1,580"],["USDC/NGN","₦1,578"],
  ["ETH/GHS","GH₵ 28,440"],["BTC/KES","KSh 8,120,000"],["USDC/ZAR","R18.40"],
  ["Settlement","INSTANT"],["Platform Fee","1.0%"],
];

// ── Register Modal ──────────────────────────────────────────────────────────
function RegisterModal({ open, onClose }) {
  const [form, setForm] = useState({ firstname:"", lastname:"", business:"", biztype:"", email:"", phone:"", password:"", confirm:"", cac:"" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = () => {
    setError("");
    if (!form.firstname || !form.lastname) return setError("Please enter your full name.");
    if (!form.business) return setError("Please enter your business name.");
    if (!form.biztype) return setError("Please select your business type.");
    if (!form.email || !form.email.includes("@")) return setError("Please enter a valid email address.");
    if (!form.phone) return setError("Please enter your phone number.");
    if (form.password.length < 8) return setError("Password must be at least 8 characters.");
    if (form.password !== form.confirm) return setError("Passwords do not match.");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onClose();
      window.location.href = import.meta.env.VITE_INLET_URL || "/izoq-inlet.html";
    }, 1200);
  };

  return (
    <div className={`modal-overlay ${open ? "open" : ""}`} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-eyebrow">Merchant Registration</div>
        <div className="modal-title">Create your business account</div>
        <div className="modal-sub">Set up your IZOQ Merchant Inlet — accept crypto payments, manage orders and settle instantly to your bank.</div>
        <div className="form-row">
          <div className="form-group"><label className="form-label">First Name</label><input className="form-input" placeholder="Alex" value={form.firstname} onChange={set("firstname")} /></div>
          <div className="form-group"><label className="form-label">Last Name</label><input className="form-input" placeholder="Okafor" value={form.lastname} onChange={set("lastname")} /></div>
        </div>
        <div className="form-group"><label className="form-label">Business Name</label><input className="form-input" placeholder="Your Company Ltd" value={form.business} onChange={set("business")} /></div>
        <div className="form-group">
          <label className="form-label">Business Type</label>
          <select className="form-input" value={form.biztype} onChange={set("biztype")}>
            <option value="">Select business type</option>
            <option>E-commerce / Online Store</option>
            <option>Retail / Physical Store</option>
            <option>Freelance / Agency</option>
            <option>SaaS / Software</option>
            <option>Import / Export</option>
            <option>Other</option>
          </select>
        </div>
        <div className="form-group"><label className="form-label">Business Email</label><input className="form-input" type="email" placeholder="business@company.com" value={form.email} onChange={set("email")} /></div>
        <div className="form-group"><label className="form-label">Phone Number</label><input className="form-input" type="tel" placeholder="+234 800 000 0000" value={form.phone} onChange={set("phone")} /></div>
        <div className="form-row">
          <div className="form-group"><label className="form-label">Password</label><input className="form-input" type="password" placeholder="Min. 8 characters" value={form.password} onChange={set("password")} /></div>
          <div className="form-group"><label className="form-label">Confirm Password</label><input className="form-input" type="password" placeholder="Repeat password" value={form.confirm} onChange={set("confirm")} /></div>
        </div>
        <div className="form-group">
          <label className="form-label">CAC Registration Number <span style={{color:"var(--muted)",fontSize:10}}>(optional)</span></label>
          <input className="form-input" placeholder="RC 000000" value={form.cac} onChange={set("cac")} style={{fontFamily:"Space Mono,monospace",fontSize:13}} />
        </div>
        {error && <div className="error-box show">{error}</div>}
        <button className="btn btn-primary form-submit" onClick={handleSubmit} disabled={loading}>
          {loading ? "Creating account..." : "Create Merchant Account →"}
        </button>
        <div className="modal-footer">
          By signing up you agree to our <a href="#">Terms</a> and <a href="#">Privacy Policy</a>.<br/>
          Already have an account? <a href="#" onClick={onClose}>Sign in →</a>
        </div>
      </div>
    </div>
  );
}

// ── Download Modal ──────────────────────────────────────────────────────────
function DownloadModal({ open, onClose, onMerchant }) {
  return (
    <div className={`modal-overlay ${open ? "open" : ""}`} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{maxWidth:420,textAlign:"center"}}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div style={{fontSize:52,marginBottom:16}}>📱</div>
        <div className="modal-eyebrow" style={{justifyContent:"center"}}>IZOQ Outlet — Mobile App</div>
        <div className="modal-title" style={{fontSize:22,marginBottom:8}}>Download the app</div>
        <div className="modal-sub" style={{margin:"0 auto 28px"}}>The IZOQ Outlet wallet is available as a mobile app on iOS and Android.</div>
        <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:24}}>
          <a href="#" className="btn btn-primary" style={{justifyContent:"center",padding:"14px 24px",fontSize:15,borderRadius:12,gap:12}}>
            <span style={{fontSize:20}}></span> Download on the App Store
          </a>
          <a href="#" className="btn btn-ghost" style={{justifyContent:"center",padding:"14px 24px",fontSize:15,borderRadius:12,gap:12}}>
            <span style={{fontSize:20}}>▶</span> Get it on Google Play
          </a>
        </div>
        <div style={{padding:16,background:"var(--surface2)",borderRadius:12,border:"1px solid var(--border)"}}>
          <div style={{fontSize:10,letterSpacing:2,textTransform:"uppercase",color:"var(--muted)",marginBottom:10}}>What you get</div>
          {["29-chain wallet — BTC, ETH, SOL, BNB, XRP & more","Send, receive & swap crypto","Withdraw to Nigerian bank account","USDT ↔ NGN live converter","P2P via $IZOQ Tag"].map((f,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:10,fontSize:13,color:"var(--muted)",marginBottom:6,textAlign:"left"}}>
              <span style={{color:"var(--accent)",fontSize:14}}>✓</span>{f}
            </div>
          ))}
        </div>
        <div className="modal-footer" style={{marginTop:16}}>
          Are you a business? <a href="#" onClick={e=>{e.preventDefault();onClose();onMerchant();}}>Register as Merchant →</a>
        </div>
      </div>
    </div>
  );
}

// ── Main App ────────────────────────────────────────────────────────────────
export default function App() {
  const [showRegister, setShowRegister] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const mouseRef = useRef({x:0,y:0});
  const ringPos = useRef({x:0,y:0});

  useEffect(() => {
    // Cursor
    const move = e => {
      mouseRef.current = {x:e.clientX,y:e.clientY};
      if(cursorRef.current){ cursorRef.current.style.left=e.clientX+"px"; cursorRef.current.style.top=e.clientY+"px"; }
    };
    document.addEventListener("mousemove", move);
    let raf;
    const animRing = () => {
      ringPos.current.x += (mouseRef.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (mouseRef.current.y - ringPos.current.y) * 0.12;
      if(ringRef.current){ ringRef.current.style.left=ringPos.current.x+"px"; ringRef.current.style.top=ringPos.current.y+"px"; }
      raf = requestAnimationFrame(animRing);
    };
    raf = requestAnimationFrame(animRing);

    // Hover effect
    const addHover = () => {
      document.querySelectorAll("a,button,.chain-pill").forEach(el=>{
        el.addEventListener("mouseenter",()=>{ cursorRef.current?.classList.add("hovering"); ringRef.current?.classList.add("hovering"); });
        el.addEventListener("mouseleave",()=>{ cursorRef.current?.classList.remove("hovering"); ringRef.current?.classList.remove("hovering"); });
      });
    };
    setTimeout(addHover, 100);

    // Scroll
    const onScroll = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);

    // Scroll reveal
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting) e.target.classList.add("visible"); });
    }, {threshold:0.15});
    document.querySelectorAll(".reveal,.app-card,.compliance-card").forEach(el=>observer.observe(el));

    // Steps stagger
    const stepObs = new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.querySelectorAll(".step-item").forEach((s,i)=>setTimeout(()=>s.classList.add("visible"),i*120));
          stepObs.unobserve(e.target);
        }
      });
    },{threshold:0.1});
    const sl = document.querySelector(".steps-list");
    if(sl) stepObs.observe(sl);

    // Escape key
    const onKey = e => { if(e.key==="Escape"){ setShowRegister(false); setShowDownload(false); } };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Lock scroll when modal open
  useEffect(() => {
    document.body.style.overflow = (showRegister || showDownload || mobileMenu) ? "hidden" : "";
  }, [showRegister, showDownload, mobileMenu]);

  const INLET_URL = import.meta.env.VITE_INLET_URL || "/izoq-inlet.html";
  const OUTLET_URL = import.meta.env.VITE_OUTLET_URL || "/izoq-outlet.html";

  return (
    <>
      <style>{styles}</style>
      <div ref={cursorRef} className="cursor" />
      <div ref={ringRef} className="cursor-ring" />

      <RegisterModal open={showRegister} onClose={()=>setShowRegister(false)} />
      <DownloadModal open={showDownload} onClose={()=>setShowDownload(false)} onMerchant={()=>setShowRegister(true)} />

      {/* Mobile Nav Drawer */}
      <div className={`mobile-nav ${mobileMenu ? "open" : ""}`}>
        <button className="mobile-nav-close" onClick={()=>setMobileMenu(false)}>✕</button>
        <a href="#how" onClick={()=>setMobileMenu(false)}>How it works</a>
        <a href="#apps" onClick={()=>setMobileMenu(false)}>Products</a>
        <a href="#ecosystem" onClick={()=>setMobileMenu(false)}>Ecosystem</a>
        <a href="#compliance" onClick={()=>setMobileMenu(false)}>Compliance</a>
        <div className="mobile-nav-cta">
          <button className="btn btn-primary" onClick={()=>{setMobileMenu(false);setShowRegister(true);}}>⬡ Merchant Sign Up</button>
          <button className="btn btn-ghost" onClick={()=>{setMobileMenu(false);setShowDownload(true);}}>📱 Download the App</button>
        </div>
      </div>

      {/* Nav */}
      <nav style={{boxShadow:navScrolled?"0 4px 40px rgba(0,0,0,0.4)":"none"}}>
        <a href="#" className="nav-logo"><div className="logo-dot"/>IZOQ</a>
        <ul className="nav-links">
          <li><a href="#how">How it works</a></li>
          <li><a href="#apps">Products</a></li>
          <li><a href="#ecosystem">Ecosystem</a></li>
          <li><a href="#compliance">Compliance</a></li>
        </ul>
        <div className="nav-cta">
          <button className="btn btn-ghost" onClick={()=>setShowDownload(true)}>📱 Get the App</button>
          <button className="btn btn-primary" onClick={()=>setShowRegister(true)}>Merchant Sign Up →</button>
        </div>
        <button className="mobile-menu-btn" onClick={()=>setMobileMenu(true)}>☰</button>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-bg"><div className="hero-grid"/></div>
        <div className="hero-content">
          <div className="hero-eyebrow"><div className="hero-eyebrow-dot"/>Now Live — Nigeria 2026 · Africa's Payments Layer</div>
          <h1 className="hero-title"><span className="line1">Payments built</span><span className="line2">for Africa's future</span></h1>
          <p className="hero-sub">IZOQ is the crypto payments ecosystem connecting <strong>merchants</strong> who accept digital assets with <strong>users</strong> who want full control of their multi-chain wallet — all in one platform.</p>
          <div className="hero-actions">
            <button className="btn btn-primary btn-xl" onClick={()=>setShowRegister(true)}>⬡ Register as Merchant</button>
            <button className="btn btn-ghost btn-xl" onClick={()=>setShowDownload(true)}>📱 Download the App</button>
          </div>
          <div className="hero-stats">
            <div className="hero-stat"><span className="hero-stat-value">$48M+</span><span className="hero-stat-label">Volume Processed</span></div>
            <div className="hero-stat" style={{borderLeft:"1px solid var(--border)",borderRight:"1px solid var(--border)",padding:"0 48px"}}>
              <span className="hero-stat-value">29 Chains</span><span className="hero-stat-label">All Major Blockchains</span>
            </div>
            <div className="hero-stat"><span className="hero-stat-value">1%</span><span className="hero-stat-label">Platform Fee</span></div>
          </div>
        </div>
        <div className="scroll-hint"><span>Scroll</span><div className="scroll-line"/></div>
      </section>

      {/* Ticker */}
      <div className="ticker-section">
        <div className="ticker-track">
          {[...TICKER,...TICKER].map(([p,v],i)=>(
            <div key={i} className="ticker-item">{p} <span>{v}</span></div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <section className="how-section" id="how">
        <div className="how-grid">
          <div className="reveal">
            <div className="section-label">How it works</div>
            <h2 className="section-title">Simple for merchants.<br/>Powerful for users.</h2>
            <p className="section-sub" style={{marginTop:16}}>From setup to first payment in minutes. IZOQ handles the complexity so you don't have to.</p>
          </div>
          <div className="steps-list">
            {[
              ["01","Register & verify","Create your account as a merchant or user. Complete Sumsub KYC/KYB in under 3 minutes with a valid Nigerian ID and liveness check."],
              ["02","Set up your wallet","Generate a fresh multi-chain wallet or import your existing one from Bitget, MetaMask, Trust Wallet or any BIP-39 compatible app."],
              ["03","Accept or send crypto","Merchants embed the IZOQ checkout on their site via API. Users send, receive and swap across 29 established blockchains."],
              ["04","Settle instantly to your bank","Withdraw to your Nigerian bank account via NIP in seconds. Rates locked for 15 minutes to protect against volatility."],
            ].map(([num,title,desc])=>(
              <div key={num} className="step-item">
                <div className="step-number">{num}</div>
                <div><div className="step-title">{title}</div><div className="step-desc">{desc}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apps */}
      <section id="apps" style={{padding:"100px 60px"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div className="reveal" style={{maxWidth:560}}>
            <div className="section-label">Two apps. One ecosystem.</div>
            <h2 className="section-title">Built for merchants<br/>and their customers</h2>
          </div>
          <div className="apps-grid">
            <div className="app-card inlet">
              <div className="app-icon">⬡</div>
              <div className="app-tag">Merchant Inlet</div>
              <div className="app-name">Accept crypto payments</div>
              <div className="app-desc">The complete merchant gateway. Configure your checkout, manage orders, track revenue, and receive instant NGN settlement — all with one API integration.</div>
              <div className="app-features">
                {["Live checkout builder with rate lock preview","KYB verification + AML monitoring","On-chain transaction history with proof","Dedicated merchant multi-chain wallet","Webhook + REST API integration","2026 Nigeria Tax Act compliant reporting"].map((f,i)=>(
                  <div key={i} className="app-feature"><div className="feature-dot"/>{f}</div>
                ))}
              </div>
              <div className="app-cta">
                <button className="btn btn-primary btn-lg" onClick={()=>setShowRegister(true)}>Register as Merchant →</button>
                <a href={INLET_URL} className="btn btn-ghost btn-lg">View Demo</a>
              </div>
            </div>
            <div className="app-card outlet">
              <div className="app-icon">◈</div>
              <div className="app-tag">User Outlet</div>
              <div className="app-name">Your multi-chain wallet</div>
              <div className="app-desc">The personal crypto wallet built for Africa. Hold, send, receive and convert across 29 blockchains. Withdraw directly to your bank account in NGN, GHS, KES and more.</div>
              <div className="app-features">
                {["29-chain portfolio — BTC, ETH, BNB, SOL, XRP & more","Sumsub KYC — unlocks all features","Live USDT ↔ NGN / GHS / KES converter","Withdraw to bank — instant NIP settlement","Import from Bitget, MetaMask, Phantom","P2P transfers via $IZOQ Tag"].map((f,i)=>(
                  <div key={i} className="app-feature"><div className="feature-dot"/>{f}</div>
                ))}
              </div>
              <div className="app-cta">
                <button className="btn btn-primary btn-lg" style={{background:"var(--accent2)"}} onClick={()=>setShowDownload(true)}>📱 Download App →</button>
                <a href={OUTLET_URL} className="btn btn-ghost btn-lg">View Demo</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem */}
      <section className="ecosystem-section" id="ecosystem">
        <div className="ecosystem-inner">
          <div className="reveal">
            <div className="section-label">Multi-chain ecosystem</div>
            <h2 className="section-title">29 established chains.<br/>Every African currency.</h2>
            <p className="section-sub" style={{margin:"16px auto 0",textAlign:"center"}}>IZOQ supports all major blockchains and settles in your local currency.</p>
          </div>
          <div className="chains-grid">
            {CHAINS.map((c,i)=>(
              <div key={i} className="chain-pill"><span className="chain-icon">{c.icon}</span>{c.name}</div>
            ))}
          </div>
          <div style={{fontSize:11,color:"var(--muted)",letterSpacing:2,textTransform:"uppercase",marginBottom:14}}>Settlement currencies</div>
          <div className="currencies-strip">
            {["NGN ₦","GHS ₵","KES KSh","ZAR R","USD $","GBP £","EUR €"].map(c=>(
              <div key={c} className="currency-chip">{c}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section id="compliance" style={{padding:"100px 60px"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div className="reveal">
            <div className="section-label">Compliance & Security</div>
            <h2 className="section-title">Built for<br/>regulated markets</h2>
            <p className="section-sub" style={{marginTop:14}}>IZOQ is designed from the ground up for the 2026 regulatory landscape in Nigeria and across Africa.</p>
          </div>
          <div className="compliance-grid">
            {[
              ["🛡","Sumsub KYC / KYB","All users undergo identity verification powered by Sumsub — the same provider trusted by Binance, Bybit and OKX."],
              ["📋","2026 Nigeria Tax Act","Transaction volumes are automatically reported to the NRS using CAC/NIN as universal Tax IDs. Zero manual filing required."],
              ["🔍","AML Monitoring","Real-time wallet screening against global sanctions lists and PEP databases. Every transaction hash is tracked and flagged."],
              ["🔒","Non-Custodial Wallets","IZOQ never holds your private keys. Seed phrases are encrypted locally and never transmitted. You are always in full control."],
              ["⚡","Instant Settlement","Fiat settlements via NIP and Visa Direct reach your bank account in seconds — not hours or days."],
              ["🌍","FATF & GDPR Compliant","IZOQ meets international FATF standards for VASPs and processes personal data under GDPR and Nigeria's NDPR framework."],
            ].map(([icon,title,desc],i)=>(
              <div key={i} className="compliance-card" style={{transitionDelay:`${i*0.1}s`}}>
                <div className="compliance-icon">{icon}</div>
                <div className="compliance-title">{title}</div>
                <div className="compliance-desc">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-inner">
          <h2 className="cta-title reveal">Ready to join Africa's payments future?</h2>
          <p className="cta-sub reveal">Whether you're a merchant accepting crypto or a user building wealth — IZOQ is your platform.</p>
          <div className="cta-actions reveal">
            <button className="btn btn-primary btn-xl" onClick={()=>setShowRegister(true)}>⬡ Register as Merchant</button>
            <button className="btn btn-ghost btn-xl" onClick={()=>setShowDownload(true)}>📱 Download the App</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-inner">
          <div>
            <a href="#" className="footer-logo"><div className="logo-dot"/>IZOQ</a>
            <p className="footer-tagline">Africa's crypto payments ecosystem. Built for merchants and users across the continent.</p>
            <div className="footer-badge">● Live — Nigeria 2026</div>
          </div>
          <div>
            <div className="footer-col-title">Products</div>
            <ul className="footer-links">
              <li><a href="#" onClick={e=>{e.preventDefault();setShowRegister(true);}}>Merchant Inlet</a></li>
              <li><a href="#" onClick={e=>{e.preventDefault();setShowDownload(true);}}>User Outlet</a></li>
              <li><a href="#">Checkout API</a></li>
              <li><a href="#">IZOQ Tag</a></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Company</div>
            <ul className="footer-links">
              <li><a href="#">About</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Legal</div>
            <ul className="footer-links">
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">AML Policy</a></li>
              <li><a href="#">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 IZOQ Systems LTD. All rights reserved.</span>
          <span style={{fontFamily:"Space Mono,monospace",fontSize:11}}>Built for Africa · Regulated · Non-custodial</span>
        </div>
      </footer>
    </>
  );
}
