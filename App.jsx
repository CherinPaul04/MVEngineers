import { useState, useEffect, useRef } from "react";
import './index.css';
import logoImg from './src/logo.jpeg';
import awardImg from './src/Award.png';
import proj01 from './src/01.png';
import proj02 from './src/02.png';
import proj03 from './src/03.png';
import proj04 from './src/04.png';
import proj05 from './src/05.png';
import proj06 from './src/06.png';
import proj07 from './src/07.png';
import proj08 from './src/08.png';
import proj09 from './src/09.png';
import proj10 from './src/10.png';
import proj11 from './src/11.png';
import prod12 from './src/12.png';
import prod13 from './src/13.png';
import prod14 from './src/14.png';
import prod15 from './src/15.png';
import prod16 from './src/16.png';
import prod17 from './src/17.png';
import prod18 from './src/18.png';
import prod19 from './src/19.png';
import prod20 from './src/20.png';
import prod21 from './src/21.png';
import prod22 from './src/22.png';
import prod23 from './src/23.png';
import prod24 from './src/24.png';
import prod25 from './src/25.png';
import prod26 from './src/26.png';
import prod27 from './src/27.png';
import prod28 from './src/28.png';
import prod29 from './src/29.png';
import prod30 from './src/30.png';
import prod31 from './src/31.png';

// ─── Custom Hook: Scroll Animation ───────────────────────────────────────────
function useScrollAnimation(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { setVisible(entry.isIntersecting); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

// ─── Staggered Grid Animation ─────────────────────────────────────────────────
function useStaggerAnimation(count, threshold = 0.1) {
  const ref = useRef(null);
  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timers = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timers = Array.from({ length: count }, (_, i) =>
            setTimeout(() => setVisibleItems(prev => prev.includes(i) ? prev : [...prev, i]), i * 120)
          );
        } else {
          timers.forEach(clearTimeout);
          setVisibleItems([]);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => { timers.forEach(clearTimeout); observer.disconnect(); };
  }, [count, threshold]);

  return [ref, visibleItems];
}

// ─── Row-Based Staggered Grid Animation ───────────────────────────────────────
function useRowStaggerAnimation(threshold = 0.1) {
  const ref = useRef(null);
  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timers = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const rows = [];
          let currentTop = -1;
          Array.from(el.children).forEach((child, i) => {
            if (Math.abs(child.offsetTop - currentTop) > 10) {
              rows.push([i]);
              currentTop = child.offsetTop;
            } else {
              rows[rows.length - 1].push(i);
            }
          });

          rows.forEach((row, rowIndex) => {
            const t = setTimeout(() => {
              setVisibleItems(prev => {
                const next = new Set(prev);
                row.forEach(i => next.add(i));
                return Array.from(next);
              });
            }, rowIndex * 120);
            timers.push(t);
          });
        } else {
          timers.forEach(clearTimeout);
          timers = [];
          setVisibleItems([]);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => { timers.forEach(clearTimeout); observer.disconnect(); };
  }, [threshold]);

  return [ref, visibleItems];
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const IconGear = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
    <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);
const IconWrench = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);
const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
  </svg>
);
const IconPin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const IconStar = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const IconFactory = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
    <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" />
  </svg>
);
const IconLayers = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
    <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
  </svg>
);
const IconRuler = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
    <path d="M4 3h16a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" /><path d="M4 13h16a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1z" /><line x1="8" y1="8" x2="8" y2="13" /><line x1="12" y1="8" x2="12" y2="13" /><line x1="16" y1="8" x2="16" y2="13" /><line x1="8" y1="18" x2="8" y2="21" /><line x1="12" y1="18" x2="12" y2="21" />
  </svg>
);
const IconCpu = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
    <rect x="9" y="9" width="6" height="6" /><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="9" y1="3" x2="9" y2="6" /><line x1="15" y1="3" x2="15" y2="6" /><line x1="9" y1="18" x2="9" y2="21" /><line x1="15" y1="18" x2="15" y2="21" /><line x1="3" y1="9" x2="6" y2="9" /><line x1="3" y1="15" x2="6" y2="15" /><line x1="18" y1="9" x2="21" y2="9" /><line x1="18" y1="15" x2="21" y2="15" />
  </svg>
);
const IconBox = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);
const IconTarget = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
  </svg>
);
const IconAward = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-8 h-8">
    <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);
const IconMenu = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
const IconClose = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ─── Styled fonts injection ───────────────────────────────────────────────────
const FontStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

    :root {
      --brand: #2666a2;
      --brand-light: #d1e2f8;
      --brand-muted: #97badf;
      --accent: #06b6d4;
      --accent-dark: #0891b2;
      --bg-main: #fbfdff;
    }

    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }

    body {
      margin: 0;
      font-family: 'DM Sans', system-ui, sans-serif;
      background: var(--bg-main);
      color: #1e2a3a;
    }

    .font-display { font-family: 'Sora', system-ui, sans-serif; }

    .glass-nav {
      background: rgba(251, 253, 255, 0.82);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(38, 102, 162, 0.12);
    }

    .glass-card {
      background: rgba(255, 255, 255, 0.72);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(209, 226, 248, 0.7);
      box-shadow: 0 2px 24px rgba(38, 102, 162, 0.06), inset 0 1px 0 rgba(255,255,255,0.9);
    }

    .card-hover {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .card-hover:hover {
      transform: translateY(-6px);
      box-shadow: 0 12px 40px rgba(38, 102, 162, 0.16), inset 0 1px 0 rgba(255,255,255,0.9);
    }

    .btn-primary {
      background: linear-gradient(135deg, #2666a2 0%, #1a4f84 100%);
      color: #fff;
      border: none;
      border-radius: 8px;
      padding: 12px 28px;
      font-family: 'DM Sans', sans-serif;
      font-weight: 600;
      font-size: 0.95rem;
      cursor: pointer;
      transition: all 0.25s ease;
      box-shadow: 0 4px 14px rgba(38, 102, 162, 0.3);
    }
    .btn-primary:hover {
      background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
      box-shadow: 0 6px 20px rgba(6, 182, 212, 0.4), 0 0 0 3px rgba(6, 182, 212, 0.15);
      transform: translateY(-1px);
    }

    .btn-outline {
      background: transparent;
      color: #2666a2;
      border: 2px solid #2666a2;
      border-radius: 8px;
      padding: 10px 26px;
      font-family: 'DM Sans', sans-serif;
      font-weight: 600;
      font-size: 0.95rem;
      cursor: pointer;
      transition: all 0.25s ease;
    }
    .btn-outline:hover {
      background: #2666a2;
      color: #fff;
      box-shadow: 0 4px 14px rgba(38, 102, 162, 0.25);
    }

    .accent-line {
      width: 48px;
      height: 3px;
      background: linear-gradient(90deg, #2666a2, #06b6d4);
      border-radius: 2px;
    }

    .hero-gradient {
      background: linear-gradient(135deg, #0a111a 0%, #0f1e32 40%, #0a1628 100%);
    }

    .orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      pointer-events: none;
      animation: pulse-orb 6s ease-in-out infinite;
    }
    @keyframes pulse-orb {
      0%, 100% { opacity: 0.12; transform: scale(1); }
      50% { opacity: 0.22; transform: scale(1.1); }
    }

    .fade-up {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .fade-up.visible {
      opacity: 1;
      transform: translateY(0);
    }

    .project-frame {
      background: linear-gradient(135deg, #e8f0fa 0%, #dce8f5 100%);
      border: 2px dashed #97badf;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }
    .project-frame::before {
      content: '';
      position: absolute;
      inset: 0;
      background: repeating-linear-gradient(
        45deg,
        transparent,
        transparent 12px,
        rgba(38,102,162,0.04) 12px,
        rgba(38,102,162,0.04) 24px
      );
    }

    .award-frame {
      background: linear-gradient(135deg, #fefce8 0%, #fef9c3 50%, #fef08a 100%);
      border: 2px solid #f59e0b;
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }
    .award-frame::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse at center, rgba(245,158,11,0.1) 0%, transparent 70%);
    }

    .logo-frame {
      background: #fff;
      border: 1.5px solid rgba(209, 226, 248, 0.8);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .logo-frame:hover {
      border-color: #2666a2;
      box-shadow: 0 4px 16px rgba(38, 102, 162, 0.1);
    }

    .equip-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(38, 102, 162, 0.08);
      border: 1px solid rgba(38, 102, 162, 0.2);
      border-radius: 8px;
      padding: 10px 16px;
      font-family: 'DM Sans', sans-serif;
      font-size: 0.88rem;
      font-weight: 500;
      color: #1a4f84;
    }

    .nav-link {
      color: #3a5a80;
      font-weight: 500;
      font-size: 0.93rem;
      text-decoration: none;
      transition: color 0.2s;
      cursor: pointer;
      position: relative;
    }
    .nav-link::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 2px;
      bottom: -4px;
      left: 0;
      background: linear-gradient(90deg, #2666a2, #06b6d4);
      transform: scaleX(0);
      transform-origin: bottom right;
      transition: transform 0.3s ease-out;
    }
    .nav-link:hover { color: #2666a2; }
    .nav-link:hover::after {
      transform: scaleX(1);
      transform-origin: bottom left;
    }

    .section-eyebrow {
      font-family: 'DM Sans', sans-serif;
      font-size: 0.78rem;
      font-weight: 600;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: #06b6d4;
    }

    .hero-pattern {
      background-image: radial-gradient(circle at 1px 1px, rgba(38,102,162,0.2) 1px, transparent 0);
      background-size: 28px 28px;
    }

    @media (max-width: 640px) {
      .hide-mobile { display: none; }
    }

    .gst-chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(6,182,212,0.1);
      border: 1px solid rgba(6,182,212,0.3);
      border-radius: 20px;
      padding: 4px 14px;
      font-size: 0.82rem;
      font-weight: 500;
      color: #0891b2;
      letter-spacing: 0.04em;
    }
  `}</style>
);

// ─── Section Wrapper ──────────────────────────────────────────────────────────
function AnimatedSection({ children, className = "", delay = 0 }) {
  const [ref, visible] = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={`fade-up ${visible ? "visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ─── Capability Card ──────────────────────────────────────────────────────────
const capabilities = [
  { icon: <IconGear />, title: "Special Purpose Machines", desc: "Custom SPMs engineered from concept to production — drilling, punching, gas-filling, lacquer-coating, welding, and leak-testing rigs with full PLC integration.", tag: "SPM" },
  { icon: <IconWrench />, title: "Welding Fixtures", desc: "MIG and spot-welding jigs for sheet metal, tubular parts, and full-frame assemblies — featuring pneumatic clamping, rotary tables, and poka-yoke counters.", tag: "Fixtures" },
  { icon: <IconRuler />, title: "Receiving & Special Gauges", desc: "Precision inspection tooling — tubular-part gauges, bore gauges, and special-purpose measurement instruments for production floor use.", tag: "Gauges" },
  { icon: <IconTarget />, title: "Panel Checkers", desc: "Dedicated checking fixtures to validate sheet-metal panel geometry, ensuring dimensional conformance on every production batch.", tag: "Inspection" },
  { icon: <IconBox />, title: "Collets & Toolholding", desc: "Double angular collets, standard and custom-diameter collets for consistent workholding on VMC machining centres.", tag: "Tooling" },
  { icon: <IconCpu />, title: "VMC Job Work", desc: "In-house Vertical Machining Centre capacity (HAAS & COSMOS) for precision aluminum die-casting and ferrous component work up to 800 × 500 mm.", tag: "Machining" },
];

// ─── Projects Data ────────────────────────────────────────────────────────────
const projects = [
  { client: "Hero MotoCorp · Haridwar", title: "Shocker Assembly SPM", cat: "Special Purpose Machine", color: "#dbeafe", img: proj01 },
  { client: "Benling India", title: "Harry Frame Welding Fixture", cat: "Welding Fixture", color: "#dcfce7", img: proj02 },
  { client: "Okinawa Autotech", title: "Front Frame Weld Fixture", cat: "Welding Fixture", color: "#fce7f3", img: proj03 },
  { client: "Okinawa Autotech", title: "Final Dual Frame Assembly Weld Fixture", cat: "Welding Fixture", color: "#ede9fe", img: proj04 },
  { client: "Okinawa Autotech", title: "Final Lite Frame Assembly Weld Fixture", cat: "Welding Fixture", color: "#e0f2fe", img: proj05 },
  { client: "Mahindra", title: "Final Dashboard Weld Fix", cat: "Welding Fixture", color: "#fef3c7", img: proj06 },
  { client: "Mahindra", title: "Final Hood Weld Fix", cat: "Welding Fixture", color: "#fef3c7", img: proj07 },
  { client: "Okinawa Autotech", title: "Handle Welding Fixture", cat: "Welding Fixture", color: "#fce7f3", img: proj08 },
  { client: "Internal / Multi-client", title: "Tipping Lever Welding Fixture", cat: "Welding Fixture", color: "#e0f2fe", img: proj09 },
  { client: "KRR", title: "MFF Leakage Testing SPM", cat: "Special Purpose Machine", color: "#dcfce7", img: proj10 },
  { client: "Maruti Suzuki", title: "Brake Pedal Load Testing SPM", cat: "Special Purpose Machine", color: "#ede9fe", img: proj11 },
];

// ─── Product Catalog Data ─────────────────────────────────────────────────────
const productSections = [
  {
    id: "spms",
    title: "Special Purpose Machines (SPMs)",
    eyebrow: "SPM",
    products: [
      {
        cat: "SPMs",
        name: "Lacquer Coating Machine (S.P.M.) With PLC Control",
        desc: "High-precision automated lacquer coating machine featuring integrated PLC control for consistent application and process monitoring.",
        imgs: [prod12],
      },
      {
        cat: "SPMs",
        name: "Drilling and Punching Machine (S.P.M.) for Bike Handle with Drill Head & PLC Control",
        desc: "Specialized drilling and punching system designed for automotive bike handles, equipped with a dedicated drill head and advanced PLC automated control.",
        imgs: [prod13],
      },
      {
        cat: "SPMs",
        name: "Gas Filling Machine (S.P.M.) with PLC Control",
        desc: "Concept-driven automated gas filling unit integrated with standard PLC controls for safety and precise volume management.",
        imgs: [prod14],
      },
      {
        cat: "SPMs",
        name: "Welding Machine (S.P.M.) for Fuel Tank With Rotary Table & PLC Control",
        desc: "Heavy-duty fuel tank welding machine featuring a motorized rotary table and automated PLC programming for seamless, high-quality seams.",
        imgs: [prod15],
      },
    ],
  },
  {
    id: "vmc-fixtures",
    title: "VMC / HMC Machining Fixtures",
    eyebrow: "VMC / HMC",
    products: [
      {
        cat: "VMC Rotary Fixture",
        name: "Rotary Machining Fixture for Aluminum Die Casting Component",
        desc: "Advanced rotary machining fixture featuring robust pneumatic clamping, optimized for aluminum die casting components on VMC or HMC centers.",
        imgs: [prod16],
      },
      {
        cat: "VMC Machining Fixture",
        name: "VMC Machining Fixture (Standard)",
        desc: "High-rigidity manufacturing fixture tailored for precision components during vertical machining center operations.",
        imgs: [prod17],
      },
    ],
  },
  {
    id: "welding-fixtures",
    title: "Welding Fixtures",
    eyebrow: "Welding",
    products: [
      {
        cat: "Spot Welding Fixture",
        name: "Spot Welding Fixture With PLC Control & Spot Counter for Poka-Yoke",
        desc: "Smart spot welding fixture equipped with PLC control and an automatic spot counter to ensure mistake-proofing (Poka-Yoke) during assembly loops.",
        imgs: [prod18, prod19, prod20, prod21],
      },
      {
        cat: "MIG Welding Fixture",
        name: "MIG Welding Fixture for Sheet Metal & Tubular Parts",
        desc: "Specialized fixture featuring an integrated PLC system and integrated copper pipe routing for optimized air flow cooling. Ideal for sheet metal and tubular component fabrication.",
        imgs: [prod22],
      },
      {
        cat: "Welding Fixture",
        name: "Welding Fixture For Bike Carrier With Pneumatic Clamping & Rotary Stand",
        desc: "Ergonomic welding setup for bike carriers, featuring quick-acting pneumatic clamps mounted on a flexible rotary stand.",
        imgs: [prod23],
      },
      {
        cat: "Welding Fixture",
        name: "Welding Fixture For Seat Cushion Frame with Pneumatic Clamping",
        desc: "Production-ready welding fixture engineered specifically for automotive seat cushion frames utilizing pneumatic hold-downs.",
        imgs: [prod24],
      },
    ],
  },
  {
    id: "inspection-gauges",
    title: "Inspection & Gauging Systems",
    eyebrow: "Inspection",
    products: [
      {
        cat: "Tubular Parts Receiving Gauge",
        name: "Precision Receiving Gauge for Tubular Assemblies",
        desc: "Quality control dimensional check gauge designed to verify the tolerances and profiles of formed tubular parts.",
        imgs: [prod25],
      },
      {
        cat: "Panel Checker",
        name: "Automotive Panel Checker Unit",
        desc: "Precision-machined checking fixture for validating sheet metal body panels and contours.",
        imgs: [prod26],
      },
      {
        cat: "Panel Checker",
        name: "Component Profile Panel Checker",
        desc: "Heavy-duty inspection fixture ensuring absolute repeatability and quality alignment for stamped exterior components.",
        imgs: [prod27],
      },
    ],
  },
  {
    id: "material-handling",
    title: "Material Handling & Industrial Components",
    eyebrow: "Handling",
    products: [
      {
        cat: "Trolley",
        name: "Heavy Duty Material Handling Trolleys",
        desc: "Rugged, ergonomic shop floor trolleys designed for secure transport of fixtures, parts, and materials across manufacturing environments.",
        imgs: [prod28, prod29, prod30],
      },
      {
        cat: "Gripping Collets",
        name: "Double Angular Collet & Collet Dia 30",
        desc: "High-precision double angular gripping collets and standard 30mm diameter collets designed for reliable machine tool workholding.",
        imgs: [prod31],
      },
    ],
  },
];

const oemCustomers = [
  "Hero MotoCorp", "Mahindra", "Maruti Suzuki", "Okinawa Autotech",
  "Benling India", "Honda Motorcycle", "TVS Motor", "Bajaj Auto",
];
const tier1Customers = [
  "Subros", "Minda Industries", "Lumax", "Sona BLW",
  "Motherson", "Endurance Tech", "Varroc", "UNO Minda",
];

const equipment = [
  { name: "VMC — HAAS", spec: "Bed: 600 × 400 mm", qty: "1 Unit" },
  { name: "VMC — COSMOS", spec: "Bed: 800 × 500 mm", qty: "1 Unit" },
  { name: "CMM — Hexagon", spec: "700 × 1000 × 700 mm", qty: "1 Unit" },
  { name: "Lathe Machine", spec: "M1TR series", qty: "2 Units" },
  { name: "Surface Grinder", spec: "Precision", qty: "4 Units" },
  { name: "ARC Welding Set", spec: "Heavy duty", qty: "1 Unit" },
  { name: "MIG Welding Set", spec: "CO₂ shielded", qty: "1 Unit" },
  { name: "Gas Cutter", spec: "Oxy-fuel", qty: "1 Unit" },
  { name: "Surface Table", spec: "Granite grade", qty: "2 Units" },
  { name: "Generator (32 kW)", spec: "4-Cylinder", qty: "1 Unit" },
];

const inspection = [
  "Vernier Caliper", "Micrometer (all sizes)", "Bore Gauge", "Magnetic V-Block",
  "Dial Indicator (Puppy)", "Slip Gauge Box", "Dial Height Gauge",
  "Digital Height Gauge", "Hardness Tester",
];

const quality = [
  "Achieve highest level of customer satisfaction through continuous process improvement.",
  "Minimize rejections during manufacturing through in-process checks.",
  "Identify and eliminate avoidable costs while maintaining quality.",
  "Set measurable targets and review regularly at team level.",
];

// ─── Navigation ───────────────────────────────────────────────────────────────
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = ["Capabilities", "Projects", "Products", "Awards", "Equipment", "Contact"];

  return (
    <nav
      className="glass-nav"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "box-shadow 0.3s",
        boxShadow: scrolled ? "0 4px 32px rgba(38,102,162,0.10)" : "none",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10, flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden"
          }}>
            <img src={logoImg} alt="M.V.E Industries Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <div className="font-display" style={{ fontWeight: 700, fontSize: "1.05rem", color: "#0f1e32", lineHeight: 1.1 }}>M.V.Engineers</div>
            <div style={{ fontSize: "0.7rem", color: "#11549bff", fontWeight: 500, letterSpacing: "0.06em" }}>FARIDABAD, HARYANA</div>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {navItems.map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">{item}</a>
          ))}
          <a href="#contact">
            <button className="btn-primary" style={{ padding: "8px 20px", fontSize: "0.88rem" }}>Get a Quote</button>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: "#2666a2" }}
          className="show-mobile"
        >
          {menuOpen ? <IconClose /> : <IconMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          background: "rgba(251,253,255,0.97)", backdropFilter: "blur(12px)",
          padding: "16px 24px 24px", borderTop: "1px solid rgba(209,226,248,0.7)",
        }}>
          {navItems.map(item => (
            <div key={item} style={{ padding: "12px 0", borderBottom: "1px solid rgba(209,226,248,0.4)" }}>
              <a href={`#${item.toLowerCase()}`} className="nav-link" onClick={() => setMenuOpen(false)}>{item}</a>
            </div>
          ))}
          <div style={{ marginTop: 16 }}>
            <button className="btn-primary" style={{ width: "100%" }}>Get a Quote</button>
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      className="hero-gradient"
      style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", paddingTop: 80 }}
    >
      {/* Background pattern */}
      <div className="hero-pattern" style={{ position: "absolute", inset: 0, opacity: 0.6 }} />

      {/* Ambient orbs */}
      <div className="orb" style={{ width: 500, height: 500, background: "#2666a2", top: "-10%", right: "-5%", opacity: 0.14 }} />
      <div className="orb" style={{ width: 320, height: 320, background: "#06b6d4", bottom: "10%", left: "-8%", opacity: 0.10, animationDelay: "2s" }} />
      <div className="orb" style={{ width: 220, height: 220, background: "#2666a2", bottom: "30%", right: "20%", opacity: 0.08, animationDelay: "4s" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px", position: "relative", zIndex: 2, width: "100%" }}>
        <div style={{ maxWidth: 720 }}>
          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 24 }}>
            <div style={{ width: 32, height: 2, background: "#06b6d4", marginTop: 6, flexShrink: 0 }} />
            <span className="section-eyebrow" style={{ color: "#06b6d4", lineHeight: 1.4 }}>Founded by Mrs. Rubi Singh & Mr. Ajit Singh & Shailendra Singh & Sonu Pratap Singh · Est. 15+ years</span>
          </div>

          {/* Main heading */}
          <h1 className="font-display" style={{
            color: "#ffffff", fontSize: "clamp(2.4rem, 6vw, 4rem)", fontWeight: 800,
            lineHeight: 1.1, margin: "0 0 24px",
            letterSpacing: "-0.02em",
          }}>
            Precision Tooling &<br />
            <span style={{ background: "linear-gradient(90deg, #06b6d4, #2666a2)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Special Purpose Machines
            </span>
          </h1>

          {/* Tagline */}
          <p style={{ color: "#97badf", fontSize: "1.15rem", lineHeight: 1.7, margin: "0 0 16px", maxWidth: 560, fontWeight: 300 }}>
            Serving India's automotive and manufacturing sector with high-quality SPMs, welding fixtures and gauges since inception.
          </p>

          {/* Motto badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: "rgba(6,182,212,0.12)", border: "1px solid rgba(6,182,212,0.3)",
            borderRadius: 30, padding: "8px 20px", marginBottom: 40,
          }}>
            <IconStar />
            <span style={{ color: "#06b6d4", fontSize: "0.9rem", fontWeight: 600 }}>
              "Quality Manufacturing at Economical Cost"
            </span>
          </div>

          {/* CTA buttons */}
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button className="btn-primary" style={{ fontSize: "1rem", padding: "13px 32px" }}
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
              View Projects
            </button>
            <button className="btn-outline" style={{ color: "#97badf", borderColor: "rgba(151,186,223,0.4)", fontSize: "1rem" }}
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
              Contact Us
            </button>
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", gap: 40, marginTop: 64, flexWrap: "wrap" }}>
            {[["15+", "Years Experience"], ["10", "Team Members"], ["6+", "OEM Clients"], ["3", "Major Machines"]].map(([num, label]) => (
              <div key={label}>
                <div className="font-display" style={{ fontSize: "2rem", fontWeight: 700, color: "#fff", lineHeight: 1 }}>{num}</div>
                <div style={{ fontSize: "0.82rem", color: "#97badf", marginTop: 4, fontWeight: 400 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to bottom, transparent, #fbfdff)" }} />
    </section>
  );
}

// ─── Capabilities Section ─────────────────────────────────────────────────────
function Capabilities() {
  const [ref, visibleItems] = useStaggerAnimation(capabilities.length);

  return (
    <section id="capabilities" style={{ padding: "100px 24px", background: "#fbfdff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <AnimatedSection>
          <div style={{ marginBottom: 56, maxWidth: 560 }}>
            <span className="section-eyebrow">What We Build</span>
            <h2 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 700, color: "#0f1e32", margin: "10px 0 16px", lineHeight: 1.2 }}>
              Core Capabilities
            </h2>
            <div className="accent-line" style={{ marginBottom: 16 }} />
            <p style={{ color: "#4a6080", lineHeight: 1.7, fontSize: "1rem" }}>
              From concept engineering to precision fabrication — we design and manufacture tooling that keeps production lines running at peak efficiency.
            </p>
          </div>
        </AnimatedSection>

        <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
          {capabilities.map((cap, i) => (
            <div
              key={cap.title}
              className={`glass-card card-hover fade-up ${visibleItems.includes(i) ? "visible" : ""}`}
              style={{
                borderRadius: 16, padding: "28px 28px 24px",
                transitionDelay: `${i * 60}ms`,
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 16 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                  background: "linear-gradient(135deg, rgba(38,102,162,0.10) 0%, rgba(6,182,212,0.08) 100%)",
                  border: "1px solid rgba(38,102,162,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#2666a2",
                }}>
                  {cap.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <span style={{
                      fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em",
                      textTransform: "uppercase", color: "#06b6d4",
                      background: "rgba(6,182,212,0.1)", padding: "2px 8px",
                      borderRadius: 20, border: "1px solid rgba(6,182,212,0.2)",
                    }}>{cap.tag}</span>
                  </div>
                  <h3 className="font-display" style={{ fontSize: "1rem", fontWeight: 700, color: "#0f1e32", margin: 0, lineHeight: 1.3 }}>{cap.title}</h3>
                </div>
              </div>
              <p style={{ color: "#4a6080", fontSize: "0.9rem", lineHeight: 1.65, margin: 0 }}>{cap.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Projects Section ─────────────────────────────────────────────────────────
function Projects() {
  const [ref, visibleItems] = useRowStaggerAnimation(0.08);
  const [activeProjectImage, setActiveProjectImage] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveProjectImage(null);
    };
    if (activeProjectImage) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeProjectImage]);

  return (
    <>
      <section id="projects" style={{ padding: "100px 24px", background: "#0a111a", position: "relative", overflow: "hidden" }}>
        {/* Dark orbs */}
        <div className="orb" style={{ width: 500, height: 500, background: "#2666a2", top: "-8%", right: "-5%", opacity: 0.10 }} />
        <div className="orb" style={{ width: 300, height: 300, background: "#06b6d4", bottom: "5%", left: "-5%", opacity: 0.07, animationDelay: "3s" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <AnimatedSection>
            <div style={{ marginBottom: 56, maxWidth: 560 }}>
              <span className="section-eyebrow">Portfolio</span>
              <h2 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 700, color: "#fff", margin: "10px 0 16px", lineHeight: 1.2 }}>
                Recent Projects
              </h2>
              <div className="accent-line" style={{ marginBottom: 16 }} />
              <p style={{ color: "#97badf", lineHeight: 1.7, fontSize: "1rem", fontWeight: 300 }}>
                Tooling solutions delivered to India's leading two-wheeler OEMs, EV manufacturers, and Tier-I suppliers.
              </p>
            </div>
          </AnimatedSection>

          <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "60px 24px" }}>
            {projects.map((proj, i) => (
              <div
                key={proj.title}
                className={`fade-up card-hover ${visibleItems.includes(i) ? "visible" : ""}`}
                style={{
                  borderRadius: 16, overflow: "hidden",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(151,186,223,0.15)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
                }}
              >
                {/* Image frame */}
                <div
                  className="project-frame"
                  style={{ height: 160, background: proj.img ? 'transparent' : 'rgba(38,102,162,0.15)', border: proj.img ? 'none' : '2px dashed rgba(151,186,223,0.2)', cursor: proj.img ? 'pointer' : 'default' }}
                  onClick={() => { if (proj.img) setActiveProjectImage(proj.img); }}
                >
                  {proj.img ? (
                    <img src={proj.img} alt={proj.title} style={{ position: 'relative', zIndex: 2, width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "0 16px" }}>
                      <IconLayers />
                      <div style={{ fontSize: "0.72rem", color: "#97badf", marginTop: 6, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                        Tooling Photo
                      </div>
                      <div style={{ fontSize: "0.66rem", color: "#4a6080", marginTop: 2 }}>Project image asset</div>
                    </div>
                  )}
                </div>

                {/* Card body */}
                <div style={{ padding: "20px 20px 22px" }}>
                  <div style={{ fontSize: "0.72rem", color: "#06b6d4", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>{proj.cat}</div>
                  <h3 className="font-display" style={{ fontSize: "0.98rem", fontWeight: 700, color: "#e2eaf6", margin: "0 0 8px", lineHeight: 1.3 }}>{proj.title}</h3>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#06b6d4", flexShrink: 0 }} />
                    <span style={{ fontSize: "0.82rem", color: "#97badf", fontWeight: 500 }}>{proj.client}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {activeProjectImage && (
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px'
          }}
          onClick={() => setActiveProjectImage(null)}
        >
          <div style={{
            position: "relative", display: "flex",
            width: "90vw", maxWidth: "1000px",
            height: "85vh", maxHeight: "700px",
            background: "#fff",
            borderRadius: 16,
            padding: 12,
            boxShadow: "0 20px 60px rgba(0,0,0,0.8)"
          }}>
            <button
              style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                background: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.9)',
                color: '#000',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
                transition: 'background 0.2s, transform 0.2s',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.transform = 'scale(1.05)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)'; e.currentTarget.style.transform = 'scale(1)'; }}
              onClick={() => setActiveProjectImage(null)}
            >
              <IconClose />
            </button>
            <img
              src={activeProjectImage}
              alt="Project Full"
              style={{
                width: "100%", height: "100%",
                objectFit: "contain", borderRadius: 8,
                display: "block"
              }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
}

// ─── Awards & Customers Section ───────────────────────────────────────────────
function Awards() {
  const [isAwardImageOpen, setIsAwardImageOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsAwardImageOpen(false);
    };
    if (isAwardImageOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAwardImageOpen]);

  return (
    <>
      <section id="awards" style={{ padding: "100px 24px", background: "#0a111a", position: "relative", overflow: "hidden" }}>
        {/* Dark orbs */}
        <div className="orb" style={{ width: 400, height: 400, background: "#2666a2", top: "-5%", left: "-5%", opacity: 0.12 }} />
        <div className="orb" style={{ width: 300, height: 300, background: "#06b6d4", bottom: "5%", right: "-5%", opacity: 0.08 }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <AnimatedSection>
            <div style={{ marginBottom: 64, textAlign: "center" }}>
              <span className="section-eyebrow">Recognition</span>
              <h2 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 700, color: "#fff", margin: "10px 0 16px", lineHeight: 1.2 }}>
                Awards & Customers
              </h2>
              <div className="accent-line" style={{ margin: "0 auto 0" }} />
            </div>
          </AnimatedSection>

          {/* Award Spotlight */}
          <AnimatedSection delay={100}>
            <div style={{
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(245,158,11,0.3)",
              borderRadius: 20, padding: "40px 40px 44px", marginBottom: 72,
              display: "grid", gridTemplateColumns: "200px 1fr", gap: 48, alignItems: "center",
            }}>
              {/* Award image */}
              <div
                className="award-frame"
                style={{ height: 200, width: 200, padding: 0, cursor: 'pointer', overflow: 'hidden' }}
                onClick={() => setIsAwardImageOpen(true)}
              >
                <img src={awardImg} alt="Platinum Medal Award" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  {[...Array(5)].map((_, i) => <span key={i} style={{ color: "#f59e0b" }}><IconStar /></span>)}
                  <span style={{ color: "#f59e0b", fontWeight: 700, fontSize: "0.9rem", marginLeft: 4 }}>Platinum Medal</span>
                </div>
                <h3 className="font-display" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 700, margin: "0 0 12px", lineHeight: 1.3 }}>
                  Auto Oil Dispensing Machine
                </h3>
                <p style={{ color: "#97badf", lineHeight: 1.65, margin: "0 0 20px", fontSize: "0.95rem" }}>
                  Our automated oil dispensing solution for 5 fuel tank models, installed at Hero MotoCorp Ltd, Dharuhera — was awarded the prestigious <strong style={{ color: "#fbbf24" }}>Platinum Medal</strong> in recognition of quality, innovation, and production impact.
                </p>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <div style={{ background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.3)", borderRadius: 8, padding: "8px 16px", color: "#fbbf24", fontSize: "0.85rem", fontWeight: 600 }}>
                    Hero MotoCorp Ltd · Dharuhera
                  </div>
                  <div style={{ background: "rgba(38,102,162,0.2)", border: "1px solid rgba(38,102,162,0.4)", borderRadius: 8, padding: "8px 16px", color: "#93c5fd", fontSize: "0.85rem", fontWeight: 600 }}>
                    5 Fuel Tank Models
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* OEM Customers */}
          <AnimatedSection delay={150}>
            <div style={{ marginBottom: 48 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                <h3 className="font-display" style={{ color: "#fff", fontSize: "1.15rem", fontWeight: 700, margin: 0 }}>Esteemed OEM Customers</h3>
                <div style={{ flex: 1, height: 1, background: "rgba(151,186,223,0.2)" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
                {oemCustomers.map(name => (
                  <div key={name} className="logo-frame" style={{
                    height: 72, background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(151,186,223,0.2)",
                  }}>
                    <div style={{ textAlign: "center", padding: "8px 12px" }}>
                      <div style={{ fontSize: "0.72rem", color: "#97badf", marginBottom: 2, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>OEM</div>
                      <div style={{ fontSize: "0.85rem", color: "#e2eaf6", fontWeight: 600 }}>{name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Tier I Customers */}
          <AnimatedSection delay={200}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                <h3 className="font-display" style={{ color: "#fff", fontSize: "1.15rem", fontWeight: 700, margin: 0 }}>Esteemed Tier I Customers</h3>
                <div style={{ flex: 1, height: 1, background: "rgba(151,186,223,0.2)" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
                {tier1Customers.map(name => (
                  <div key={name} className="logo-frame" style={{
                    height: 72, background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(6,182,212,0.15)",
                  }}>
                    <div style={{ textAlign: "center", padding: "8px 12px" }}>
                      <div style={{ fontSize: "0.72rem", color: "#06b6d4", marginBottom: 2, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>Tier I</div>
                      <div style={{ fontSize: "0.85rem", color: "#e2eaf6", fontWeight: 600 }}>{name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {isAwardImageOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px'
          }}
          onClick={() => setIsAwardImageOpen(false)}
        >
          <div style={{
            position: "relative", display: "flex",
            width: "90vw", maxWidth: "1000px",
            height: "85vh", maxHeight: "700px",
            background: "#fff",
            borderRadius: 16,
            padding: 12,
            boxShadow: "0 20px 60px rgba(0,0,0,0.8)"
          }}>
            <button
              style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                background: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.9)',
                color: '#000',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
                transition: 'background 0.2s, transform 0.2s',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.transform = 'scale(1.05)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)'; e.currentTarget.style.transform = 'scale(1)'; }}
              onClick={() => setIsAwardImageOpen(false)}
            >
              <IconClose />
            </button>
            <img
              src={awardImg}
              alt="Platinum Medal Award Full"
              style={{
                width: "100%", height: "100%",
                objectFit: "contain", borderRadius: 8,
                display: "block"
              }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
}

// ─── Product Catalog Section ──────────────────────────────────────────────────
function ProductCard({ product, onImageClick }) {
  const [imgIdx, setImgIdx] = useState(0);
  const hasMultiple = product.imgs.length > 1;
  return (
    <div
      className="card-hover"
      style={{
        borderRadius: 16, overflow: "hidden",
        background: "#fff",
        border: "1px solid rgba(209,226,248,0.7)",
        boxShadow: "0 2px 20px rgba(38,102,162,0.06)",
        display: "flex", flexDirection: "column",
        height: "100%",
      }}
    >
      {/* Image frame */}
      <div
        className="project-frame"
        style={{
          height: 180, position: "relative", overflow: "hidden",
          border: "none", cursor: "pointer", background: "#dce8f5",
        }}
        onClick={() => onImageClick(product.imgs, imgIdx)}
      >
        <img
          src={product.imgs[imgIdx]}
          alt={product.name}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 2 }}
        />
        {hasMultiple && (
          <>
            {/* Prev/Next buttons */}
            <button
              onClick={e => { e.preventDefault(); e.stopPropagation(); setImgIdx(idx => (idx - 1 + product.imgs.length) % product.imgs.length); }}
              style={{
                position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)",
                zIndex: 10, background: "rgba(0,0,0,0.45)", border: "none", borderRadius: "50%",
                width: 28, height: 28, color: "#fff", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem",
              }}
            >‹</button>
            <button
              onClick={e => { e.preventDefault(); e.stopPropagation(); setImgIdx(idx => (idx + 1) % product.imgs.length); }}
              style={{
                position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)",
                zIndex: 10, background: "rgba(0,0,0,0.45)", border: "none", borderRadius: "50%",
                width: 28, height: 28, color: "#fff", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem",
              }}
            >›</button>
            {/* Dots */}
            <div style={{
              position: "absolute", bottom: 8, left: 0, right: 0,
              display: "flex", justifyContent: "center", gap: 5, zIndex: 10,
            }}>
              {product.imgs.map((_, di) => (
                <div
                  key={di}
                  onClick={e => { e.preventDefault(); e.stopPropagation(); setImgIdx(di); }}
                  style={{
                    width: di === imgIdx ? 16 : 6, height: 6,
                    borderRadius: 3, background: di === imgIdx ? "#fff" : "rgba(255,255,255,0.5)",
                    transition: "all 0.25s", cursor: "pointer",
                  }}
                />
              ))}
            </div>
          </>
        )}
        {/* Multi-image badge */}
        {hasMultiple && (
          <div style={{
            position: "absolute", top: 8, right: 8, zIndex: 10,
            background: "rgba(38,102,162,0.85)", color: "#fff",
            fontSize: "0.68rem", fontWeight: 700, padding: "2px 8px",
            borderRadius: 20, letterSpacing: "0.05em",
          }}>{imgIdx + 1}/{product.imgs.length}</div>
        )}
      </div>

      {/* Card body */}
      <div style={{ padding: "18px 20px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{
          fontSize: "0.70rem", color: "#06b6d4", fontWeight: 700,
          textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6,
        }}>{product.cat}</div>
        <h3 className="font-display" style={{
          fontSize: "0.92rem", fontWeight: 700, color: "#0f1e32",
          margin: "0 0 10px", lineHeight: 1.35,
        }}>{product.name}</h3>
        <p style={{ fontSize: "0.82rem", color: "#4a6080", lineHeight: 1.6, margin: 0 }}>
          {product.desc}
        </p>
      </div>
    </div>
  );
}

function ProductCatalog() {
  const [lightbox, setLightbox] = useState(null); // { imgs, idx }

  useEffect(() => {
    const handleKey = e => {
      if (!lightbox) return;
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox(lb => ({ ...lb, idx: (lb.idx + 1) % lb.imgs.length }));
      if (e.key === "ArrowLeft") setLightbox(lb => ({ ...lb, idx: (lb.idx - 1 + lb.imgs.length) % lb.imgs.length }));
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightbox]);

  return (
    <>
      <section id="products" style={{ padding: "100px 24px", background: "#fbfdff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <AnimatedSection>
            <div style={{ marginBottom: 64, maxWidth: 560 }}>
              <span className="section-eyebrow">Product Catalog</span>
              <h2 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 700, color: "#0f1e32", margin: "10px 0 16px", lineHeight: 1.2 }}>
                Our Products
              </h2>
              <div className="accent-line" style={{ marginBottom: 16 }} />
              <p style={{ color: "#4a6080", lineHeight: 1.7, fontSize: "1rem" }}>
                A comprehensive range of precision-engineered SPMs, fixtures, gauges, and industrial components built for India's leading manufacturers.
              </p>
            </div>
          </AnimatedSection>

          {productSections.map((section, si) => (
            <ProductSection
              key={section.id}
              section={section}
              sectionIndex={si}
              onImageClick={(imgs, idx) => setLightbox({ imgs, idx })}
            />
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
            zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center",
            padding: "40px",
          }}
          onClick={() => setLightbox(null)}
        >
          <div style={{
            position: "relative", display: "flex",
            width: "90vw", maxWidth: "1000px",
            height: "85vh", maxHeight: "700px",
            background: "#fff",
            borderRadius: 16,
            padding: 12,
            boxShadow: "0 20px 60px rgba(0,0,0,0.8)"
          }}>
            {/* Close */}
            <button
              style={{
                position: "absolute", top: "-20px", right: "-20px",
                background: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.9)",
                color: "#000", borderRadius: "50%", width: 40, height: 40,
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", zIndex: 10, transition: "background 0.2s, transform 0.2s",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.transform = "scale(1.05)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.8)"; e.currentTarget.style.transform = "scale(1)"; }}
              onClick={() => setLightbox(null)}
            >
              <IconClose />
            </button>

            {/* Prev */}
            {lightbox.imgs.length > 1 && (
              <button
                style={{
                  position: "absolute", left: "-48px", top: "50%", transform: "translateY(-50%)",
                  background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)",
                  color: "#fff", borderRadius: "50%", width: 40, height: 40,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", zIndex: 10, fontSize: "1.2rem",
                }}
                onClick={e => { e.stopPropagation(); setLightbox(lb => ({ ...lb, idx: (lb.idx - 1 + lb.imgs.length) % lb.imgs.length })); }}
              >‹</button>
            )}

            <img
              src={lightbox.imgs[lightbox.idx]}
              alt="Product Full"
              style={{
                width: "100%", height: "100%",
                objectFit: "contain", borderRadius: 8,
                display: "block",
              }}
              onClick={e => e.stopPropagation()}
            />

            {/* Next */}
            {lightbox.imgs.length > 1 && (
              <button
                style={{
                  position: "absolute", right: "-48px", top: "50%", transform: "translateY(-50%)",
                  background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)",
                  color: "#fff", borderRadius: "50%", width: 40, height: 40,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", zIndex: 10, fontSize: "1.2rem",
                }}
                onClick={e => { e.stopPropagation(); setLightbox(lb => ({ ...lb, idx: (lb.idx + 1) % lb.imgs.length })); }}
              >›</button>
            )}

            {/* Dots */}
            {lightbox.imgs.length > 1 && (
              <div style={{
                position: "absolute", bottom: "-28px", left: 0, right: 0,
                display: "flex", justifyContent: "center", gap: 6,
              }}>
                {lightbox.imgs.map((_, di) => (
                  <div
                    key={di}
                    onClick={e => { e.stopPropagation(); setLightbox(lb => ({ ...lb, idx: di })); }}
                    style={{
                      width: di === lightbox.idx ? 20 : 8, height: 8, borderRadius: 4,
                      background: di === lightbox.idx ? "#fff" : "rgba(255,255,255,0.4)",
                      transition: "all 0.25s", cursor: "pointer",
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function ProductSection({ section, sectionIndex, onImageClick }) {
  const [ref, visibleItems] = useStaggerAnimation(section.products.length, 0.08);
  return (
    <div style={{ marginBottom: 72 }}>
      <AnimatedSection delay={sectionIndex * 40}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{
              fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em",
              textTransform: "uppercase", color: "#06b6d4",
              background: "rgba(6,182,212,0.1)", padding: "2px 10px",
              borderRadius: 20, border: "1px solid rgba(6,182,212,0.2)",
              alignSelf: "flex-start",
            }}>{section.eyebrow}</span>
            <h3 className="font-display" style={{
              fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", fontWeight: 700,
              color: "#0f1e32", margin: 0, lineHeight: 1.3,
            }}>{section.title}</h3>
          </div>
          <div style={{ flex: 1, height: 1, background: "rgba(38,102,162,0.12)" }} />
        </div>
      </AnimatedSection>
      <div
        ref={ref}
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 24 }}
      >
        {section.products.map((product, i) => (
          <div
            key={product.name}
            className={`fade-up ${visibleItems.includes(i) ? "visible" : ""}`}
            style={{ transitionDelay: `${i * 80}ms`, height: "100%" }}
          >
            <ProductCard product={product} onImageClick={onImageClick} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Equipment Section ────────────────────────────────────────────────────────
function Equipment() {
  return (
    <section id="equipment" style={{ padding: "100px 24px", background: "#fbfdff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <AnimatedSection>
          <div style={{ marginBottom: 56, maxWidth: 560 }}>
            <span className="section-eyebrow">Infrastructure</span>
            <h2 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 700, color: "#0f1e32", margin: "10px 0 16px", lineHeight: 1.2 }}>
              Equipment & Quality
            </h2>
            <div className="accent-line" style={{ marginBottom: 16 }} />
          </div>
        </AnimatedSection>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 32 }}>
          {/* Machine List */}
          <AnimatedSection delay={0}>
            <div className="glass-card" style={{ borderRadius: 16, padding: "28px 28px 32px" }}>
              <h3 className="font-display" style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f1e32", margin: "0 0 20px" }}>Machinery</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {equipment.map(e => (
                  <div key={e.name} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "10px 14px", borderRadius: 10,
                    background: "rgba(38,102,162,0.04)", border: "1px solid rgba(38,102,162,0.08)",
                  }}>
                    <div>
                      <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#1a3a5c" }}>{e.name}</div>
                      <div style={{ fontSize: "0.78rem", color: "#97badf", marginTop: 2 }}>{e.spec}</div>
                    </div>
                    <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#2666a2", background: "rgba(38,102,162,0.1)", padding: "3px 10px", borderRadius: 20 }}>{e.qty}</div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {/* Inspection Instruments */}
            <AnimatedSection delay={80}>
              <div className="glass-card" style={{ borderRadius: 16, padding: "28px 28px 28px" }}>
                <h3 className="font-display" style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f1e32", margin: "0 0 16px" }}>Inspection Instruments</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {inspection.map(item => (
                    <span key={item} className="equip-badge">{item}</span>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Quality Policy */}
            <AnimatedSection delay={140}>
              <div style={{
                borderRadius: 16, padding: "28px 28px 28px",
                background: "linear-gradient(135deg, #2666a2 0%, #1a4f84 100%)",
                boxShadow: "0 8px 32px rgba(38,102,162,0.25)",
              }}>
                <h3 className="font-display" style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", margin: "0 0 16px" }}>Quality Policy</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {quality.map((q, i) => (
                    <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <div style={{
                        width: 22, height: 22, borderRadius: 6, background: "rgba(255,255,255,0.15)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0, marginTop: 1, color: "#a5f3fc",
                      }}>
                        <IconCheck />
                      </div>
                      <p style={{ color: "rgba(255,255,255,0.82)", fontSize: "0.88rem", lineHeight: 1.55, margin: 0 }}>{q}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Team */}
          <AnimatedSection delay={200} className="h-full">
            <div className="glass-card h-full" style={{ display: "flex", flexDirection: "column", borderRadius: 16, padding: "24px 28px" }}>
              <h3 className="font-display" style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f1e32", margin: "0 0 16px" }}>Our Team · 10 Members</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1, justifyContent: "space-between" }}>
                {[["Managers", 1], ["Marketing", 1], ["Engineers", 2], ["Admin Staff", 2], ["Skilled Workers", 6], ["Semi-Skilled", 1]].map(([role, count]) => (
                  <div key={role} style={{ display: "flex", flex: 1, justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderRadius: 8, background: "rgba(38,102,162,0.04)", border: "1px solid rgba(38,102,162,0.08)" }}>
                    <span style={{ fontSize: "0.9rem", color: "#3a5a80", fontWeight: 500 }}>{role}</span>
                    <span style={{ fontSize: "1rem", fontWeight: 700, color: "#2666a2" }}>{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// ─── Contact / Footer Section ─────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" style={{ padding: "100px 24px 0", background: "#0a111a", position: "relative", overflow: "hidden" }}>
      <div className="orb" style={{ width: 360, height: 360, background: "#2666a2", top: "10%", right: "0", opacity: 0.12 }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <AnimatedSection>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span className="section-eyebrow">Get In Touch</span>
            <h2 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 700, color: "#fff", margin: "10px 0 16px" }}>
              Let's Work Together
            </h2>
            <div className="accent-line" style={{ margin: "0 auto" }} />
          </div>
        </AnimatedSection>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 28, marginBottom: 80 }}>
          {/* Company Info */}
          <AnimatedSection delay={0} className="h-full">
            <div style={{
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(151,186,223,0.15)",
              borderRadius: 16, padding: "32px 28px", height: "100%", display: "flex", flexDirection: "column"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden"
                }}>
                  <img src={logoImg} alt="M.V.E Industries Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <div className="font-display" style={{ fontWeight: 700, fontSize: "1.05rem", color: "#fff" }}>M.V.Engineers</div>
                  <div style={{ fontSize: "0.72rem", color: "#97badf", fontWeight: 500 }}>Proprietor: Mrs. Rubi Singh & Mr. Ajit Singh & Shailendra Singh & Sonu Pratap Singh</div>
                </div>
              </div>
              <p style={{ color: "#97badf", fontSize: "0.9rem", lineHeight: 1.65, margin: "0 0 20px" }}>
                To serve the manufacturing industry with high quality manufacturing process through using latest technology to achieve minimum cost of manufacturing.
              </p>
              <div className="gst-chip">GST: 06TBLPS9413N1ZF</div>
            </div>
          </AnimatedSection>

          {/* Address */}
          <AnimatedSection delay={80} className="h-full">
            <div style={{
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(151,186,223,0.15)",
              borderRadius: 16, padding: "32px 28px", height: "100%", display: "flex", flexDirection: "column"
            }}>
              <h3 className="font-display" style={{ color: "#fff", fontSize: "1rem", fontWeight: 700, margin: "0 0 20px" }}>Address</h3>
              <div style={{ display: "flex", gap: 14, marginBottom: 20 }}>
                <div style={{ color: "#06b6d4", flexShrink: 0, marginTop: 2 }}><IconPin /></div>
                <address style={{ fontStyle: "normal", color: "#97badf", lineHeight: 1.7, fontSize: "0.92rem" }}>
                  MCF-7991, Block-E, Gali No. 29<br />
                  Sanjay Colony, Sector-23<br />
                  Faridabad, Haryana
                </address>
              </div>
              <div style={{ display: "flex", gap: 14 }}>
                <div style={{ color: "#06b6d4", flexShrink: 0, marginTop: 2 }}><IconMail /></div>
                <a href="mailto:sonupratap193@gmail.com" style={{ color: "#93c5fd", fontSize: "0.92rem", textDecoration: "none", fontWeight: 500 }}>
                  sonupratap193@gmail.com
                </a>
              </div>
            </div>
          </AnimatedSection>

          {/* CTA Card */}
          <AnimatedSection delay={160} className="h-full">
            <div style={{
              background: "linear-gradient(135deg, #2666a2 0%, #0891b2 100%)",
              borderRadius: 16, padding: "32px 28px",
              boxShadow: "0 8px 32px rgba(38,102,162,0.3)",
              height: "100%", display: "flex", flexDirection: "column"
            }}>
              <h3 className="font-display" style={{ color: "#fff", fontSize: "1.1rem", fontWeight: 700, margin: "0 0 12px" }}>
                Need Custom Tooling?
              </h3>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.9rem", lineHeight: 1.6, margin: "0 0 24px", flex: 1 }}>
                From concept to commissioning — our engineering team will work with you to design the right solution for your production needs.
              </p>
              <a href="mailto:sonupratap193@gmail.com" style={{ marginTop: "auto" }}>
                <button style={{
                  width: "100%", background: "rgba(255,255,255,0.15)",
                  border: "1.5px solid rgba(255,255,255,0.4)",
                  borderRadius: 10, padding: "12px 0",
                  color: "#fff", fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700, fontSize: "0.95rem", cursor: "pointer",
                  transition: "all 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.25)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(255,255,255,0.1)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  Send an Enquiry →
                </button>
              </a>
            </div>
          </AnimatedSection>
        </div>

        {/* Footer bar */}
        <div style={{
          borderTop: "1px solid rgba(151,186,223,0.12)",
          padding: "24px 0",
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12,
        }}>
          <p style={{ color: "#4a6080", fontSize: "0.82rem", margin: 0 }}>
            © {new Date().getFullYear()} M.V.Engineers, Faridabad. All rights reserved.
          </p>
          <p style={{ color: "#4a6080", fontSize: "0.82rem", margin: 0 }}>
            Manufacturer & Designer · SPM · Jig & Fixtures · Gauges
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <FontStyles />
      <Navbar />
      <main>
        <Hero />
        <Capabilities />
        <Projects />
        <ProductCatalog />
        <Awards />
        <Equipment />
        <Contact />
      </main>
    </>
  );
}
