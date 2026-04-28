import {useState, useEffect, useRef} from "react";
import {motion, useInView, AnimatePresence} from "framer-motion";
import logoImg from "./assets/logo.png";
import p1 from "./assets/img/p1.jpeg";
import p2 from "./assets/img/p2.jpeg";
import p3 from "./assets/img/p3.jpeg";
import p4 from "./assets/img/p4.jpeg";
import p5 from "./assets/img/p5.jpeg";

/* ─── Scroll-triggered wrapper ─── */
function Reveal({children, delay = 0, direction = "up", className = ""}) {
  const ref = useRef(null);
  const inView = useInView(ref, {once: true, margin: "-60px"});
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
    },
    visible: {opacity: 1, y: 0, x: 0},
  };
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={{duration: 0.6, delay, ease: [0.22, 1, 0.36, 1]}}
    >
      {children}
    </motion.div>
  );
}

/* ─── Ripple button ─── */
function RippleButton({children, variant = "primary", style = {}, onClick}) {
  const [ripples, setRipples] = useState([]);
  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const r = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      id: Date.now(),
    };
    setRipples((p) => [...p, r]);
    setTimeout(() => setRipples((p) => p.filter((rp) => rp.id !== r.id)), 600);
    onClick?.();
  };
  const base = {
    position: "relative",
    overflow: "hidden",
    border: "none",
    cursor: "pointer",
    padding: "14px 32px",
    borderRadius: 6,
    fontWeight: 700,
    fontSize: 14,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    transition: "all .3s",
    ...style,
  };
  const colors =
    variant === "primary"
      ? {background: "#E8443A", color: "#fff"}
      : {background: "#1a1a1a", color: "#fff"};
  return (
    <motion.button
      style={{...base, ...colors}}
      whileHover={{scale: 1.04, boxShadow: "0 8px 24px rgba(232,68,58,.35)"}}
      whileTap={{scale: 0.97}}
      onClick={handleClick}
    >
      {children}
      {ripples.map((r) => (
        <span
          key={r.id}
          style={{
            position: "absolute",
            left: r.x,
            top: r.y,
            width: 120,
            height: 120,
            marginLeft: -60,
            marginTop: -60,
            borderRadius: "50%",
            background: "rgba(255,255,255,.35)",
            transform: "scale(0)",
            animation: "rippleAnim .6s ease-out",
          }}
        />
      ))}
    </motion.button>
  );
}

/* ─── Icons ─── */
const icons = {
  check: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  ),
  key: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <circle cx="8" cy="15" r="4" />
      <path d="m11.5 11.5 5-5m0 0h3m-3 0v3" />
    </svg>
  ),
  wallet: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <rect x="2" y="6" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
      <circle cx="17" cy="14" r="1" />
    </svg>
  ),
  clock: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
  architect: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
    </svg>
  ),
  construct: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <rect x="2" y="12" width="6" height="9" />
      <rect x="9" y="8" width="6" height="13" />
      <rect x="16" y="4" width="6" height="17" />
    </svg>
  ),
  interior: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v4m0 12v4M2 12h4m12 0h4" />
    </svg>
  ),
  renovate: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.6-3.6a1 1 0 0 0 0-1.4l-1.6-1.6a1 1 0 0 0-1.4 0z" />
      <path d="m5.2 18.8 8.1-8.1" />
      <path d="M4 22l2-2" />
    </svg>
  ),
  phone: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.8.4 1.7.7 2.4a2 2 0 0 1-.4 2.1L8 9.5a16 16 0 0 0 6.5 6.5l1.3-1.3a2 2 0 0 1 2.1-.4c.8.3 1.6.5 2.4.7a2 2 0 0 1 1.7 2z" />
    </svg>
  ),
  mail: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  location: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  menu: (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  close: (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  ),
  whatsapp: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#25D366">
      <path d="M17.5 14.4c-.3-.1-1.6-.8-1.9-.9-.3-.1-.5-.1-.7.1s-.8 1-.9 1.1c-.2.2-.3.2-.6.1s-1.2-.4-2.3-1.4c-.9-.8-1.4-1.7-1.6-2s0-.5.1-.6l.4-.5.2-.3.1-.3c0-.1 0-.3-.1-.4s-.7-1.6-.9-2.2c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.3s-1 1-1 2.4 1.1 2.8 1.2 3c.2.2 2.1 3.2 5 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.6-.7 1.9-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3zM12 21.8a9.9 9.9 0 0 1-5-1.4L2 22l1.6-4.8A9.9 9.9 0 0 1 12 2.1c5.5 0 9.9 4.5 9.9 9.9 0 5.5-4.5 9.8-9.9 9.8zM12 0C5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 5.9L0 24l6.3-1.6C8 23.3 10 24 12 24c6.6 0 12-5.4 12-12S18.6 0 12 0z" />
    </svg>
  ),
  chevDown: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  ),
  instagram: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zM12 0C8.7 0 8.3 0 7.1.1 5.8.1 4.9.3 4.1.6c-.8.3-1.5.7-2.1 1.3C1.3 2.6.9 3.3.6 4.1.3 4.9.1 5.8.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9c.1 1.3.2 2.2.5 2.9.3.8.7 1.5 1.3 2.1.7.7 1.3 1.1 2.1 1.3.8.3 1.6.5 2.9.5C8.3 24 8.7 24 12 24s3.7 0 4.9-.1c1.3-.1 2.2-.2 2.9-.5.8-.3 1.5-.7 2.1-1.3.7-.7 1.1-1.3 1.3-2.1.3-.8.5-1.6.5-2.9.1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.1-1.3-.2-2.2-.5-2.9-.3-.8-.7-1.5-1.3-2.1C21.4 1.3 20.7.9 19.9.6c-.8-.3-1.6-.5-2.9-.5C15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4A6.2 6.2 0 0 0 12 5.8zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-10.8a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z" />
    </svg>
  ),
  facebook: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12c0-6.6-5.4-12-12-12S0 5.4 0 12c0 6 4.4 11 10.1 11.9v-8.4H7.1V12h3V9.4c0-3 1.8-4.6 4.5-4.6 1.3 0 2.7.2 2.7.2v2.9h-1.5c-1.5 0-2 .9-2 1.9V12h3.3l-.5 3.5h-2.8v8.4C19.6 23 24 18 24 12z" />
    </svg>
  ),
};

/* ─── Data ─── */
const BRAND = "The Origin Design & Construction";
const BRAND_SHORT = "The Origin";
const PHONE1 = "+91 7090762023";
const PHONE2 = "+91 7338070711";
const ADDRESS =
  "No.05, 3rd Cross, AR Layout, JP Nagar - 6th Phase, Bangalore, India 560078";
const TAGLINE = "Building Trust, Crafting Excellence";

const features = [
  {
    icon: "check",
    title: "End to End Ownership",
    desc: "We're your single point of contact — managing designers, architects, structural engineers, site supervisors, quality controllers and more.",
  },
  {
    icon: "key",
    title: "Quality & Discount Assurance",
    desc: "Transparency is achieved for both working process as well as raw material used. Great deals with partnered stores!",
  },
  {
    icon: "wallet",
    title: "Budgets & Time Upfront",
    desc: "Get a clear idea of your total project budget and friendly payment schedule upfront. No false promises now and surprises later.",
  },
  {
    icon: "clock",
    title: "Timely Updates & Delivery",
    desc: "Once a project initiates, there is literally next to no delays when we talk about keeping a check on project status.",
  },
];

const services = [
  {
    icon: "architect",
    title: "Architects",
    desc: "Our architecture is driven by a commitment to excellence, where every detail is thoughtfully designed to enhance lifestyle, durability, and overall living experience. Every design is crafted as per Vastu, completely based on the client's requirements and focused on delivering utmost satisfaction.",
  },
  {
    icon: "construct",
    title: "Constructions",
    desc: "Focused on long-term excellence, we ensure every project meets the highest quality standards and is delivered on time.",
  },
  {
    icon: "interior",
    title: "Interiors",
    desc: "We provide customized interior solutions that balance aesthetics, space utilization, and practical living, with carefully executed detailing that enhances quality and finish.",
  },
  {
    icon: "renovate",
    title: "Renovations",
    desc: "We redefine your existing spaces with innovative renovation solutions that enhance functionality, aesthetics, and long-term durability.",
  },
];

const processSteps = [
  { num: "01", title: "Let's Get Started", desc: "We understand your needs and vision." },
  { num: "02", title: "Design Specification", desc: "We create smart designs and finalize specifications." },
  { num: "03", title: "Client Agreement", desc: "Scope, cost and timeline are agreed and confirmed." },
  { num: "04", title: "Planning & Estimation", desc: "Detailed planning and estimation for smooth execution." },
  { num: "05", title: "Approvals & Documentation", desc: "We handle all approvals and required paperwork." },
  { num: "06", title: "Construction Begins", desc: "Work starts with skilled team and quality materials." },
  { num: "07", title: "Quality Checks", desc: "Regular quality inspections at every stage." },
  { num: "08", title: "Site Visits", desc: "Scheduled site visits to review progress." },
  { num: "09", title: "Interior & Finishing", desc: "Interiors and finishes done with perfection." },
  { num: "10", title: "Completion & Handover", desc: "Final handover of your dream home." },
];

const packages = [
  {
    name: "BUDGET",
    items: [
      "Design & Drawing",
      "Core Construction Materials",
      "Flooring & Wall Tiling",
      "Painting",
      "Electricals",
      "Plumbing",
      "Doors",
      "Windows",
      "Kitchen & Bathroom Fixtures",
      "Fabrication Works",
      "Warranty Period",
      "Site Audit & Reporting",
      "Elevation Budget",
      "Extra Charges",
      "Govt Sanction Assistance",
    ],
  },
  {
    name: "STANDARD",
    items: [
      "Design & Drawing",
      "Core Construction Materials",
      "Flooring & Wall Tiling",
      "Painting",
      "Electricals",
      "Plumbing",
      "Doors",
      "Windows",
      "Kitchen & Bathroom Fixtures",
      "Fabrication Works",
      "Warranty Period",
      "Site Audit & Reporting",
      "Elevation Budget",
      "Extra Charges",
      "Govt Sanction Assistance",
    ],
    featured: true,
  },
  {
    name: "PREMIUM",
    items: [
      "Design & Drawing",
      "Core Construction Materials",
      "Flooring & Wall Tiling",
      "Painting",
      "Electricals",
      "Plumbing",
      "Doors",
      "Windows",
      "Kitchen & Bathroom Fixtures",
      "Fabrication Works",
      "Warranty Period",
      "Site Audit & Reporting",
      "Elevation Budget",
      "Extra Charges",
      "Govt Sanction Assistance",
    ],
  },
];

const faqs = [
  {
    q: "What services do you provide?",
    a: "We offer end-to-end construction services including residential construction, interiors, renovations, commercial projects and complete turnkey solutions from design to final handover.",
  },
  {
    q: "Do you provide interior works as well?",
    a: "Yes, we offer complete interior solutions including modular kitchens, wardrobes, false ceilings, electrical layouts, and finishing works tailored to your design and budget.",
  },
  {
    q: "Do you provide both design and construction?",
    a: "Yes, we provide complete solutions from planning and design to execution and handover.",
  },
  {
    q: "Is front elevation included in the package?",
    a: "Basic elevation design is included. However, execution cost depends on materials like cladding, tiles, granite, textures, and projections and will be charged based on the site and client requirements.",
  },
  {
    q: "How is the construction cost calculated?",
    a: "The construction cost is calculated based on the total slab area (built-up area), which includes the area covered by slab concreting for each floor.",
  },
  {
    q: "Do you provide a detailed quotation?",
    a: "Yes, we provide a transparent and detailed cost breakup before starting the project.",
  },
  {
    q: "What is the payment structure?",
    a: "Payments are made in stages based on construction progress. Each stage — such as substructure works, ground floor structural works, first floor structural works.",
  },
  {
    q: "Will I get regular updates on the project?",
    a: "Yes, we provide regular site updates, including photos and progress reports via WhatsApp or other communication channels.",
  },
  {
    q: "What quality of materials do you use?",
    a: "We use standard branded materials as per the selected package. Upgrades can be done based on client preference.",
  },
  {
    q: "Why should I choose your company?",
    a: "We focus on delivering high-quality construction with strict timelines, clear and transparent pricing and a strong commitment to achieving 100% client satisfaction in every project.",
  },
];

const projectImages = [p1, p2, p3, p4, p5];

/* ─── Main Component ─── */
export default function TheOriginDnC() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h, {passive: true});
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div
      style={{
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        color: "#1a1a1a",
        background: "#fff",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Playfair+Display:wght@400;600;700&display=swap');
        @keyframes rippleAnim { to { transform: scale(3); opacity: 0; } }
        * { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior: smooth; }
        .section { padding: 80px 24px; max-width: 1200px; margin: 0 auto; }
        @media(max-width:768px) { .section { padding: 48px 16px; } }
        .heading-serif { font-family: 'Playfair Display', Georgia, serif; }
        .section-title { text-align:center; margin-bottom: 12px; font-size: 32px; font-weight: 700; }
        .section-line { width: 60px; height: 3px; background: #E8443A; margin: 0 auto 40px; border-radius: 2px; }
        .grid2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px,1fr)); gap: 24px; }
        .grid3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px,1fr)); gap: 24px; }
        .grid4 { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px,1fr)); gap: 24px; }
        .img-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; }
        @media(max-width:600px) { .img-grid { grid-template-columns: repeat(2,1fr); } }
        .process-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 32px 20px; }
        @media(max-width:900px) { .process-grid { grid-template-columns: repeat(3, 1fr); } }
        @media(max-width:560px) { .process-grid { grid-template-columns: repeat(2, 1fr); } }
        .process-card { position: relative; display: flex; flex-direction: column; align-items: center; text-align: center; padding: 28px 12px 24px; border-radius: 16px; background: #fff; border: 1px solid #f0f0f0; transition: all .3s; }
        .process-card:hover { transform: translateY(-6px); box-shadow: 0 16px 40px rgba(232,68,58,.10); border-color: #E8443A33; }
        .process-num { position: absolute; top: -14px; left: 50%; transform: translateX(-50%); background: linear-gradient(135deg, #E8443A, #c0392b); color: #fff; font-size: 13px; font-weight: 800; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(232,68,58,.3); letter-spacing: 0.5px; }
      `}</style>

      {/* ─── NAVBAR ─── */}
      <motion.nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: scrolled
            ? "rgba(255,255,255,.97)"
            : "rgba(255,255,255,.92)",
          backdropFilter: "blur(12px)",
          boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,.08)" : "none",
          transition: "all .3s",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: scrolled ? 64 : 72,
            transition: "height .3s",
          }}
        >
          <div style={{display: "flex", alignItems: "center"}}>
            <img src={logoImg} alt={BRAND} style={{ height: scrolled ? 40 : 48, transition: "height .3s" }} />
          </div>
          <div
            style={{display: "flex", alignItems: "center", gap: 32}}
            className="nav-links-desktop"
          >
            <style>{`@media(max-width:768px){.nav-links-desktop{display:none !important;}}`}</style>
            {["Home", "Services", "Packages", "Projects", "FAQ", "Contact"].map(
              (l) => (
                <a
                  key={l}
                  href={`#${l.toLowerCase()}`}
                  style={{
                    textDecoration: "none",
                    color: "#333",
                    fontSize: 14,
                    fontWeight: 500,
                    letterSpacing: 0.5,
                    transition: "color .2s",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#E8443A")}
                  onMouseLeave={(e) => (e.target.style.color = "#333")}
                >
                  {l}
                </a>
              ),
            )}
            <RippleButton style={{padding: "10px 22px", fontSize: 12}}>
              Get Quote
            </RippleButton>
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: "none",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#1a1a1a",
            }}
            className="mob-menu-btn"
          >
            <style>{`.mob-menu-btn{display:none !important;}@media(max-width:768px){.mob-menu-btn{display:block !important;}}`}</style>
            {menuOpen ? icons.close : icons.menu}
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{height: 0, opacity: 0}}
              animate={{height: "auto", opacity: 1}}
              exit={{height: 0, opacity: 0}}
              style={{
                overflow: "hidden",
                background: "#fff",
                borderTop: "1px solid #eee",
              }}
            >
              <div
                style={{
                  padding: "16px 24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                {[
                  "Home",
                  "Services",
                  "Packages",
                  "Projects",
                  "FAQ",
                  "Contact",
                ].map((l) => (
                  <a
                    key={l}
                    href={`#${l.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      textDecoration: "none",
                      color: "#333",
                      fontSize: 15,
                      fontWeight: 500,
                    }}
                  >
                    {l}
                  </a>
                ))}
                <RippleButton
                  style={{
                    alignSelf: "flex-start",
                    padding: "10px 22px",
                    fontSize: 12,
                  }}
                >
                  Get Quote
                </RippleButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ─── HERO ─── */}
      <section
        id="home"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(135deg, #C9956B 0%, #D4A574 50%, #BF8A5E 100%)",
          paddingTop: 72,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&h=900&fit=crop') center/cover",
            opacity: 0.15,
          }}
        />
        <div
          className="section"
          style={{width: "100%", position: "relative", zIndex: 2}}
        >
          <div style={{maxWidth: 640}}>
            <Reveal>
              <h1
                className="heading-serif"
                style={{
                  fontSize: "clamp(36px,5vw,56px)",
                  fontWeight: 700,
                  color: "#fff",
                  lineHeight: 1.15,
                  marginBottom: 8,
                }}
              >
                {BRAND}
              </h1>
              <p style={{ fontSize: 20, color: "rgba(255,255,255,0.9)", fontWeight: 500, marginBottom: 32 }}>
                {TAGLINE}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <RippleButton variant="dark" style={{ fontSize: 16, padding: "14px 36px", marginBottom: 32 }}>
                Get a Free Estimate Now
              </RippleButton>
            </Reveal>
            <Reveal delay={0.3}>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.8)" }}>
                Experience hassle-free home construction with us.
              </p>
            </Reveal>
          </div>
        </div>
        <div style={{position: "absolute", bottom: -1, left: 0, right: 0}}>
          <svg
            viewBox="0 0 1440 80"
            fill="#fff"
            style={{display: "block", width: "100%"}}
          >
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
          </svg>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services" style={{background: "#fff"}}>
        <div className="section">
          <Reveal>
            <h2 className="section-title heading-serif">
              From Soil to Ceiling — We've Got It All
            </h2>
            <div className="section-line" />
            <p
              style={{
                textAlign: "center",
                color: "#666",
                maxWidth: 600,
                margin: "0 auto 48px",
                lineHeight: 1.6,
              }}
            >
              Bengaluru's Top Construction Professionals. We are a team of
              licensed & reputed architects, contractors, interior designers &
              renovators.
            </p>
          </Reveal>
          <div className="grid4">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{
                    y: -8,
                    boxShadow: "0 16px 40px rgba(232,68,58,.12)",
                  }}
                  style={{
                    background: "#fff",
                    borderRadius: 16,
                    padding: 32,
                    textAlign: "center",
                    border: "1px solid #f0f0f0",
                  }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #E8443A, #d63031)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                    }}
                  >
                    {icons[s.icon]}
                  </div>
                  <h3
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      marginBottom: 12,
                      color: "#E8443A",
                    }}
                  >
                    {s.title}
                  </h3>
                  <p style={{fontSize: 14, color: "#666", lineHeight: 1.7}}>
                    {s.desc}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>

          {/* ─── PROCESS TIMELINE ─── */}
          <div style={{marginTop: 80}}>
            <Reveal>
              <h2 className="section-title heading-serif">
                Our Process. <span style={{color: "#E8443A"}}>Your Dream Home.</span>
              </h2>
              <div className="section-line" />
              <p style={{textAlign: "center", color: "#666", maxWidth: 560, margin: "0 auto 48px", lineHeight: 1.6}}>
                A transparent, step-by-step journey from your first call to the moment you unlock your new door.
              </p>
            </Reveal>
            <div className="process-grid">
              {processSteps.map((step, i) => (
                <Reveal key={step.num} delay={i * 0.06}>
                  <div className="process-card">
                    {/* Floating step number badge */}
                    <div className="process-num">{step.num}</div>
                    {/* Icon */}
                    <div style={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #FFF5F4, #FDECEA)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 14,
                      fontSize: 28,
                    }}>
                      {["🤝", "✏️", "📋", "📐", "📄", "🏗️", "✅", "📍", "🎨", "🔑"][i]}
                    </div>
                    {/* Title */}
                    <h4 style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#1a1a1a",
                      marginBottom: 8,
                      lineHeight: 1.35,
                    }}>
                      {step.title}
                    </h4>
                    {/* Description */}
                    <p style={{
                      fontSize: 12.5,
                      color: "#888",
                      lineHeight: 1.6,
                    }}>
                      {step.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── RECENT WORKS ─── */}
      <section id="projects" style={{background: "#fafafa"}}>
        <div className="section">
          <Reveal>
            <h2 className="section-title heading-serif">Our Recent Works</h2>
            <div className="section-line" />
            <p
              style={{
                textAlign: "center",
                color: "#666",
                maxWidth: 600,
                margin: "0 auto 48px",
              }}
            >
              Experience the essence of thoughtful construction in Bangalore —
              our work speaks volumes about who we are and what we build.
            </p>
          </Reveal>
          <div className="img-grid">
            {projectImages.map((src, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <motion.div
                  whileHover={{scale: 1.03}}
                  style={{
                    borderRadius: 12,
                    overflow: "hidden",
                    aspectRatio: "4/3",
                    cursor: "pointer",
                    boxShadow: "0 4px 16px rgba(0,0,0,.08)",
                  }}
                >
                  <img
                    src={src}
                    alt={`Project ${i + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHAT YOU GET ─── */}
      <section style={{background: "#fff"}}>
        <div className="section">
          <Reveal>
            <h2 className="section-title heading-serif">
              What You Get When You Hire Us
            </h2>
            <div className="section-line" />
            <p
              style={{
                textAlign: "center",
                color: "#666",
                maxWidth: 600,
                margin: "0 auto 48px",
              }}
            >
              At our core are four things that define who we are and what we
              stand for. This is what you can count on us.
            </p>
          </Reveal>
          <div className="grid4">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{y: -6}}
                  style={{textAlign: "center", padding: 24}}
                >
                  <div
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #E8443A, #c0392b)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                      boxShadow: "0 8px 24px rgba(232,68,58,.25)",
                    }}
                  >
                    {icons[f.icon]}
                  </div>
                  <h3
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      marginBottom: 10,
                      color: "#1a1a1a",
                    }}
                  >
                    {f.title}
                  </h3>
                  <p style={{fontSize: 14, color: "#666", lineHeight: 1.7}}>
                    {f.desc}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PACKAGES ─── */}
      <section id="packages" style={{ background: "#fafafa" }}>
        <div className="section">
          <Reveal>
            <h2 className="section-title heading-serif">Our Turnkey Construction Packages</h2>
            <div className="section-line" />
            <p style={{ textAlign: "center", color: "#666", maxWidth: 600, margin: "0 auto 48px" }}>
              Come to our Experience Centre and get a look and feel of what we do! No substandard products used and no surprises later!
            </p>
          </Reveal>
          <div className="grid3">
            {packages.map((pkg, i) => (
              <Reveal key={pkg.name} delay={i * 0.12}>
                <motion.div
                  whileHover={{ y: -8, boxShadow: "0 20px 50px rgba(0,0,0,.1)" }}
                  style={{
                    background: "#fff",
                    borderRadius: 16,
                    overflow: "hidden",
                    border: pkg.featured ? "2px solid #E8443A" : "1px solid #eee",
                  }}
                >
                  <div style={{
                    background: pkg.featured ? "#E8443A" : "#1a1a1a",
                    color: "#fff",
                    padding: "20px 28px",
                    textAlign: "center",
                  }}>
                    {pkg.featured && (
                      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, marginBottom: 6, opacity: 0.85 }}>MOST POPULAR</div>
                    )}
                    <h3 style={{ fontSize: 20, fontWeight: 800, letterSpacing: 2, margin: 0 }}>{pkg.name} PACKAGE</h3>
                  </div>
                  <div style={{ padding: 28 }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                      {pkg.items.map((item) => (
                        <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#555" }}>
                          <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#E8443A22", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#E8443A" }} />
                          </div>
                          {item}
                        </div>
                      ))}
                    </div>
                    <RippleButton style={{ width: "100%", padding: "12px 0", fontSize: 12 }}>GET A QUOTE</RippleButton>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section style={{background: "#fff"}}>
        <div className="section">
          <div className="grid2" style={{alignItems: "center"}}>
            <Reveal direction="left">
              <div>
                <h2
                  className="heading-serif"
                  style={{fontSize: 32, fontWeight: 700, marginBottom: 12}}
                >
                  Get to Know {BRAND_SHORT}
                </h2>
                <div
                  style={{
                    width: 60,
                    height: 3,
                    background: "#E8443A",
                    borderRadius: 2,
                    marginBottom: 24,
                  }}
                />
                <p
                  style={{
                    color: "#555",
                    lineHeight: 1.8,
                    fontSize: 15,
                    marginBottom: 16,
                  }}
                >
                  {BRAND} is a Bangalore based construction company offering complete turnkey solutions across Karnataka for both residential and commercial projects. We specialize in architectural design, construction, interiors and renovation works — providing end-to-end services from concept to final handover under one roof.
                </p>
                <p
                  style={{
                    color: "#555",
                    lineHeight: 1.8,
                    fontSize: 15,
                    marginBottom: 24,
                  }}
                >
                  Our approach focuses on quality workmanship, timely project delivery and budget-friendly solutions without compromising standards. We are committed to delivering durable, functional, and aesthetically pleasing spaces tailored to our client's needs.
                </p>
                <RippleButton>Read More</RippleButton>
              </div>
            </Reveal>
            <Reveal direction="right">
              <div
                style={{
                  borderRadius: 16,
                  overflow: "hidden",
                  boxShadow: "0 12px 40px rgba(0,0,0,.1)",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&h=400&fit=crop"
                  alt="About"
                  style={{width: "100%", display: "block"}}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" style={{background: "#fff"}}>
        <div className="section">
          <Reveal>
            <h2 className="section-title heading-serif">What Clients Ask — FAQ's</h2>
            <div className="section-line" />
          </Reveal>
          <div style={{maxWidth: 800, margin: "0 auto"}}>
            {faqs.map((faq, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <motion.div
                  style={{
                    background: "#fafafa",
                    borderRadius: 10,
                    marginBottom: 10,
                    border: "1px solid #eee",
                    overflow: "hidden",
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{
                      width: "100%",
                      background: "none",
                      border: "none",
                      padding: "18px 20px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                      fontSize: 14,
                      fontWeight: 500,
                      color: "#E8443A",
                      textAlign: "left",
                      fontFamily: "inherit",
                    }}
                  >
                    {faq.q}
                    <motion.span
                      animate={{rotate: openFaq === i ? 180 : 0}}
                      transition={{duration: 0.25}}
                    >
                      {icons.chevDown}
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{height: 0}}
                        animate={{height: "auto"}}
                        exit={{height: 0}}
                        style={{overflow: "hidden"}}
                      >
                        <p
                          style={{
                            padding: "0 20px 18px",
                            fontSize: 14,
                            color: "#666",
                            lineHeight: 1.7,
                          }}
                        >
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer
        id="contact"
        style={{
          background: "#1a1a1a",
          color: "#ccc",
          padding: "64px 24px 32px",
        }}
      >
        <div style={{maxWidth: 1200, margin: "0 auto"}}>
          <div className="grid3" style={{marginBottom: 48}}>
            <div>
              <div style={{marginBottom: 20}}>
                <img src={logoImg} alt={BRAND} style={{ height: 48 }} />
              </div>
              <p
                style={{
                  fontSize: 13,
                  color: "#999",
                  marginBottom: 16,
                  lineHeight: 1.6,
                }}
              >
                🏗 Turnkey | Residential | Commercial | Interiors | Architects |
                Renovation
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  marginBottom: 12,
                  fontSize: 14,
                }}
              >
                {icons.location}
                <span>{ADDRESS}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 8,
                  fontSize: 14,
                }}
              >
                {icons.phone}
                <span style={{color: "#E8443A"}}>{PHONE1}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontSize: 14,
                }}
              >
                {icons.phone}
                <span style={{color: "#E8443A"}}>{PHONE2}</span>
              </div>
            </div>
            <div>
              <h4
                style={{
                  color: "#E8443A",
                  fontSize: 14,
                  fontWeight: 700,
                  marginBottom: 16,
                  letterSpacing: 1.5,
                }}
              >
                QUICK LINKS
              </h4>
              {[
                "Our Work",
                "Construction Packages",
                "Design Packages",
                "About Us",
                "Contact",
                "Construction Guide",
                "Get Quote",
              ].map((l) => (
                <a
                  key={l}
                  href="#"
                  style={{
                    display: "block",
                    color: "#999",
                    textDecoration: "none",
                    fontSize: 14,
                    marginBottom: 10,
                    transition: "color .2s",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#E8443A")}
                  onMouseLeave={(e) => (e.target.style.color = "#999")}
                >
                  {l}
                </a>
              ))}
            </div>
            <div>
              <h4
                style={{
                  color: "#E8443A",
                  fontSize: 14,
                  fontWeight: 700,
                  marginBottom: 16,
                  letterSpacing: 1.5,
                }}
              >
                RECENT POSTS
              </h4>
              {[
                "How to Maximize Natural Light in Your Home Design",
                "Staircase Tips To Know Before You Start Your New Home",
                "Top 7 Elevation Cladding Materials for Your New Home",
                "The Best Waterproofing Materials Worth Investing In",
              ].map((p) => (
                <a
                  key={p}
                  href="#"
                  style={{
                    display: "block",
                    color: "#999",
                    textDecoration: "none",
                    fontSize: 13,
                    marginBottom: 12,
                    lineHeight: 1.5,
                    transition: "color .2s",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#E8443A")}
                  onMouseLeave={(e) => (e.target.style.color = "#999")}
                >
                  {p}
                </a>
              ))}
            </div>
          </div>
          <div
            style={{
              borderTop: "1px solid #333",
              paddingTop: 24,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <p style={{fontSize: 12, color: "#666"}}>
              Copyright 2024-2025 {BRAND} | All Rights Reserved
            </p>
            <div
              style={{
                display: "flex",
                gap: 16,
                alignItems: "center",
                color: "#999",
              }}
            >
              {icons.whatsapp}
              <a
                href="https://instagram.com/theorigin.dnc"
                target="_blank"
                rel="noopener"
                style={{color: "#999"}}
              >
                {icons.instagram}
              </a>
              <span style={{color: "#999"}}>{icons.facebook}</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ─── Floating WhatsApp ─── */}
      <motion.a
        href="https://wa.me/917090762023"
        target="_blank"
        rel="noopener"
        whileHover={{scale: 1.1}}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 999,
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "#25D366",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 16px rgba(37,211,102,.4)",
          cursor: "pointer",
        }}
      >
        {icons.whatsapp}
      </motion.a>
    </div>
  );
}
