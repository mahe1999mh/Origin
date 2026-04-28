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
function RippleButton({
  children,
  variant = "primary",
  style = {},
  onClick,
  href,
}) {
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
    borderRadius: 8,
    fontWeight: 700,
    fontSize: 14,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    transition: "all .3s",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    ...style,
  };
  const colors =
    variant === "primary"
      ? {background: "#E8443A", color: "#fff"}
      : variant === "outline"
        ? {
            background: "transparent",
            color: "#fff",
            border: "2px solid rgba(255,255,255,.5)",
          }
        : {background: "#1a1a1a", color: "#fff"};
  const Tag = href ? motion.a : motion.button;
  return (
    <Tag
      href={href}
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
    </Tag>
  );
}

/* ─── Counter animation ─── */
function Counter({end, suffix = "", duration = 2}) {
  const ref = useRef(null);
  const inView = useInView(ref, {once: true});
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, end, duration]);
  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
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
  arrowRight: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  ),
  play: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
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

const stats = [
  // { value: 10, suffix: "+", label: "Projects Completed" },
  // { value: 5, suffix: "+", label: "Years Experience" },
  // { value: 100, suffix: "%", label: "Client Satisfaction" },
  // { value: 50, suffix: "+", label: "Expert Team Members" },
];

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
  {
    num: "01",
    title: "Let's Get Started",
    desc: "We understand your needs and vision.",
    emoji: "🤝",
  },
  {
    num: "02",
    title: "Design Specification",
    desc: "We create smart designs and finalize specifications.",
    emoji: "✏️",
  },
  {
    num: "03",
    title: "Client Agreement",
    desc: "Scope, cost and timeline are agreed and confirmed.",
    emoji: "📋",
  },
  {
    num: "04",
    title: "Planning & Estimation",
    desc: "Detailed planning and estimation for smooth execution.",
    emoji: "📐",
  },
  {
    num: "05",
    title: "Approvals & Documentation",
    desc: "We handle all approvals and required paperwork.",
    emoji: "📄",
  },
  {
    num: "06",
    title: "Construction Begins",
    desc: "Work starts with skilled team and quality materials.",
    emoji: "🏗️",
  },
  {
    num: "07",
    title: "Quality Checks",
    desc: "Regular quality inspections at every stage.",
    emoji: "✅",
  },
  {
    num: "08",
    title: "Site Visits",
    desc: "Scheduled site visits to review progress.",
    emoji: "📍",
  },
  {
    num: "09",
    title: "Interior & Finishing",
    desc: "Interiors and finishes done with perfection.",
    emoji: "🎨",
  },
  {
    num: "10",
    title: "Completion & Handover",
    desc: "Final handover of your dream home.",
    emoji: "🔑",
  },
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
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: .6; } }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .brands-track { display: flex; gap: 60px; align-items: center; animation: marquee 25s linear infinite; width: max-content; }
        .brands-track:hover { animation-play-state: paused; }
        .brand-item { flex-shrink: 0; padding: 16px 28px; background: #fff; border-radius: 14px; border: 1px solid #f0f0f0; display: flex; align-items: center; justify-content: center; height: 72px; min-width: 160px; transition: all .3s; }
        .brand-item:hover { border-color: #E8443A33; box-shadow: 0 4px 20px rgba(0,0,0,.06); transform: translateY(-2px); }
        * { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior: smooth; }
        .section { padding: 100px 24px; max-width: 1200px; margin: 0 auto; }
        @media(max-width:768px) { .section { padding: 60px 16px; } }
        .heading-serif { font-family: 'Playfair Display', Georgia, serif; }
        .section-title { text-align:center; margin-bottom: 12px; font-size: 36px; font-weight: 700; line-height: 1.2; }
        @media(max-width:768px) { .section-title { font-size: 28px; } }
        .section-sub { text-align:center; color:#777; max-width:580px; margin:0 auto 16px; line-height:1.7; font-size:15px; }
        .section-line { width: 60px; height: 3px; background: #E8443A; margin: 0 auto 20px; border-radius: 2px; }
        .grid2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px,1fr)); gap: 48px; }
        .grid3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px,1fr)); gap: 28px; }
        .grid4 { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px,1fr)); gap: 28px; }
        .img-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; }
        @media(max-width:600px) { .img-grid { grid-template-columns: repeat(2,1fr); } }
        .process-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 24px 16px; }
        @media(max-width:1000px) { .process-grid { grid-template-columns: repeat(3, 1fr); } }
        @media(max-width:600px) { .process-grid { grid-template-columns: repeat(2, 1fr); } }
        .process-card { position: relative; display: flex; flex-direction: column; align-items: center; text-align: center; padding: 32px 14px 24px; border-radius: 20px; background: #fff; border: 1px solid #f0f0f0; transition: all .35s cubic-bezier(.22,1,.36,1); cursor: default; }
        .process-card:hover { transform: translateY(-8px); box-shadow: 0 20px 48px rgba(232,68,58,.12); border-color: #E8443A44; }
        .process-num { position: absolute; top: -15px; left: 50%; transform: translateX(-50%); background: linear-gradient(135deg, #E8443A, #c0392b); color: #fff; font-size: 12px; font-weight: 800; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 14px rgba(232,68,58,.35); letter-spacing: 0.5px; }
        .stat-card { text-align: center; padding: 32px 16px; }
        .stat-val { font-size: 42px; font-weight: 800; color: #E8443A; line-height: 1; margin-bottom: 8px; }
        .stat-label { font-size: 14px; color: rgba(255,255,255,.7); font-weight: 500; letter-spacing: 0.5px; }
        @media(max-width:768px) { .stat-val { font-size: 32px; } }
        .nav-link { text-decoration: none; color: #444; font-size: 14px; font-weight: 500; letter-spacing: 0.3px; transition: color .2s; position: relative; padding-bottom: 4px; }
        .nav-link::after { content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 2px; background: #E8443A; transition: width .3s; }
        .nav-link:hover { color: #E8443A; }
        .nav-link:hover::after { width: 100%; }
        .service-card { background: #fff; border-radius: 20px; padding: 36px 28px; text-align: center; border: 1px solid #f0f0f0; transition: all .35s cubic-bezier(.22,1,.36,1); height: 100%; }
        .service-card:hover { transform: translateY(-8px); box-shadow: 0 20px 50px rgba(232,68,58,.12); border-color: #E8443A33; }
        .feature-card { text-align: center; padding: 32px 20px; border-radius: 20px; transition: all .3s; }
        .feature-card:hover { background: #fafafa; }
        .faq-item { background: #fff; border-radius: 14px; margin-bottom: 12px; border: 1px solid #eee; overflow: hidden; transition: all .3s; }
        .faq-item:hover { border-color: #E8443A33; box-shadow: 0 4px 20px rgba(0,0,0,.04); }
        .pkg-card { background: #fff; border-radius: 20px; overflow: hidden; transition: all .35s; height: 100%; }
        .pkg-card:hover { transform: translateY(-8px); box-shadow: 0 24px 56px rgba(0,0,0,.1); }
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
            ? "rgba(255,255,255,.98)"
            : "rgba(255,255,255,.92)",
          backdropFilter: "blur(16px)",
          boxShadow: scrolled ? "0 1px 24px rgba(0,0,0,.06)" : "none",
          transition: "all .4s",
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
            height: scrolled ? 64 : 76,
            transition: "height .4s",
          }}
        >
          <div style={{display: "flex", alignItems: "center"}}>
            <img
              src={logoImg}
              alt={BRAND}
              style={{height: scrolled ? 38 : 46, transition: "height .3s"}}
            />
          </div>
          <div
            style={{display: "flex", alignItems: "center", gap: 36}}
            className="nav-links-desktop"
          >
            <style>{`@media(max-width:768px){.nav-links-desktop{display:none !important;}}`}</style>
            {["Home", "Services", "Packages", "Projects", "FAQ", "Contact"].map(
              (l) => (
                <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">
                  {l}
                </a>
              ),
            )}
            <RippleButton
              style={{padding: "10px 24px", fontSize: 12, borderRadius: 8}}
            >
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
                borderTop: "1px solid #f0f0f0",
              }}
            >
              <div
                style={{
                  padding: "20px 24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 18,
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
                      fontSize: 16,
                      fontWeight: 500,
                    }}
                  >
                    {l}
                  </a>
                ))}
                <RippleButton
                  style={{
                    alignSelf: "flex-start",
                    padding: "10px 24px",
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
          background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
          paddingTop: 76,
        }}
      >
        {/* Background image with overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&h=900&fit=crop') center/cover",
            opacity: 0.25,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(26,26,26,.85) 0%, rgba(45,45,45,.7) 50%, rgba(232,68,58,.15) 100%)",
          }}
        />
        {/* Decorative elements */}
        <div
          style={{
            position: "absolute",
            top: "15%",
            right: "8%",
            width: 300,
            height: 300,
            borderRadius: "50%",
            border: "1px solid rgba(232,68,58,.15)",
            animation: "pulse 4s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "20%",
            right: "15%",
            width: 180,
            height: 180,
            borderRadius: "50%",
            border: "1px solid rgba(232,68,58,.1)",
            animation: "pulse 4s ease-in-out infinite 1s",
          }}
        />

        <div
          className="section"
          style={{width: "100%", position: "relative", zIndex: 2}}
        >
          <div style={{maxWidth: 680}}>
            <Reveal>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(232,68,58,.15)",
                  border: "1px solid rgba(232,68,58,.3)",
                  borderRadius: 50,
                  padding: "8px 20px",
                  marginBottom: 28,
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#E8443A",
                    animation: "pulse 2s infinite",
                  }}
                />
                <span
                  style={{
                    fontSize: 13,
                    color: "#E8443A",
                    fontWeight: 600,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                  }}
                >
                  Bangalore's Trusted Builder
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1
                className="heading-serif"
                style={{
                  fontSize: "clamp(38px,5.5vw,62px)",
                  fontWeight: 700,
                  color: "#fff",
                  lineHeight: 1.12,
                  marginBottom: 20,
                }}
              >
                We Build Homes <br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #E8443A, #ff6b5a)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  That Last Generations
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p
                style={{
                  fontSize: 18,
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: 1.7,
                  marginBottom: 40,
                  maxWidth: 520,
                }}
              >
                {TAGLINE}. Complete turnkey solutions for residential &
                commercial projects across Karnataka.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div
                style={{
                  display: "flex",
                  gap: 16,
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <RippleButton
                  style={{fontSize: 14, padding: "16px 36px", borderRadius: 10}}
                >
                  Get Free Estimate {icons.arrowRight}
                </RippleButton>
                <RippleButton
                  variant="outline"
                  style={{fontSize: 14, padding: "16px 36px", borderRadius: 10}}
                >
                  {icons.play} Watch Our Work
                </RippleButton>
              </div>
            </Reveal>
            <Reveal delay={0.45}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  marginTop: 48,
                }}
              >
                <div style={{display: "flex"}}>
                  {[p1, p2, p3].map((img, i) => (
                    <div
                      key={i}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        border: "3px solid #1a1a1a",
                        overflow: "hidden",
                        marginLeft: i > 0 ? -12 : 0,
                        position: "relative",
                        zIndex: 3 - i,
                      }}
                    >
                      <img
                        src={img}
                        alt=""
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{fontSize: 14, color: "#fff", fontWeight: 600}}>
                    10+ Happy Families
                  </div>
                  <div style={{fontSize: 12, color: "rgba(255,255,255,.5)"}}>
                    Trust us with their dream homes
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
        <div style={{position: "absolute", bottom: -1, left: 0, right: 0}}>
          <svg
            viewBox="0 0 1440 100"
            fill="#fff"
            style={{display: "block", width: "100%"}}
          >
            <path d="M0,60 C360,100 1080,20 1440,60 L1440,100 L0,100 Z" />
          </svg>
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <section
        style={{
          background: "linear-gradient(135deg, #1a1a1a, #2d2d2d)",
          marginTop: -1,
        }}
      >
        <div style={{maxWidth: 1200, margin: "0 auto", padding: "0 24px"}}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px,1fr))",
              gap: 0,
            }}
          >
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1}>
                <div
                  className="stat-card"
                  style={{
                    borderRight:
                      i < stats.length - 1
                        ? "1px solid rgba(255,255,255,.08)"
                        : "none",
                  }}
                >
                  <div className="stat-val">
                    <Counter end={s.value} suffix={s.suffix} />
                  </div>
                  <div className="stat-label">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TRUSTED BRANDS ─── */}
      <section
        style={{background: "#fafafa", padding: "56px 0", overflow: "hidden"}}
      >
        <Reveal>
          <p
            style={{
              textAlign: "center",
              fontSize: 13,
              fontWeight: 700,
              color: "#E8443A",
              letterSpacing: 2,
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            Our Partners
          </p>
          <h3
            className="heading-serif"
            style={{
              textAlign: "center",
              fontSize: 24,
              fontWeight: 700,
              marginBottom: 36,
              color: "#1a1a1a",
            }}
          >
            We Work With Trusted Brands
          </h3>
        </Reveal>
        <div style={{overflow: "hidden", position: "relative"}}>
          {/* Fade edges */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: 80,
              background: "linear-gradient(90deg, #fafafa, transparent)",
              zIndex: 2,
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: 80,
              background: "linear-gradient(270deg, #fafafa, transparent)",
              zIndex: 2,
            }}
          />
          <div className="brands-track">
            {[
              {name: "Somany", color: "#E8192C", weight: 900},
              {name: "Kajaria", color: "#1A5BA0", weight: 800, italic: true},
              {name: "Dr. Fixit", color: "#1A1A1A", weight: 900},
              {name: "Polycab", color: "#CC3300", weight: 800},
              {name: "Asian Paints", color: "#FF6600", weight: 700},
              {name: "Jaquar", color: "#006666", weight: 700, italic: true},
              {name: "UltraTech Cement", color: "#1A1A1A", weight: 900},
              {name: "JSW Steel", color: "#003399", weight: 800},
              // Duplicate for seamless loop
              {name: "Somany", color: "#E8192C", weight: 900},
              {name: "Kajaria", color: "#1A5BA0", weight: 800, italic: true},
              {name: "Dr. Fixit", color: "#1A1A1A", weight: 900},
              {name: "Polycab", color: "#CC3300", weight: 800},
              {name: "Asian Paints", color: "#FF6600", weight: 700},
              {name: "Jaquar", color: "#006666", weight: 700, italic: true},
              {name: "UltraTech Cement", color: "#1A1A1A", weight: 900},
              {name: "JSW Steel", color: "#003399", weight: 800},
            ].map((brand, i) => (
              <div className="brand-item" key={i}>
                <span
                  style={{
                    fontSize: 18,
                    fontWeight: brand.weight,
                    color: brand.color,
                    letterSpacing: 0.5,
                    fontStyle: brand.italic ? "italic" : "normal",
                    whiteSpace: "nowrap",
                  }}
                >
                  {brand.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services" style={{background: "#fff"}}>
        <div className="section">
          <Reveal>
            <p
              style={{
                textAlign: "center",
                fontSize: 13,
                fontWeight: 700,
                color: "#E8443A",
                letterSpacing: 2,
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              What We Do
            </p>
            <h2 className="section-title heading-serif">
              From Soil to Ceiling — We've Got It All
            </h2>
            <div className="section-line" />
            <p className="section-sub" style={{marginBottom: 56}}>
              Bengaluru's top construction professionals. A team of licensed &
              reputed architects, contractors, interior designers & renovators.
            </p>
          </Reveal>
          <div className="grid4">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1}>
                <div className="service-card">
                  <div
                    style={{
                      width: 68,
                      height: 68,
                      borderRadius: 18,
                      background: "linear-gradient(135deg, #E8443A, #d63031)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 22px",
                      boxShadow: "0 8px 24px rgba(232,68,58,.25)",
                    }}
                  >
                    {icons[s.icon]}
                  </div>
                  <h3
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      marginBottom: 12,
                      color: "#1a1a1a",
                    }}
                  >
                    {s.title}
                  </h3>
                  <p style={{fontSize: 14, color: "#777", lineHeight: 1.7}}>
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section style={{background: "#fafafa"}}>
        <div className="section">
          <Reveal>
            <p
              style={{
                textAlign: "center",
                fontSize: 13,
                fontWeight: 700,
                color: "#E8443A",
                letterSpacing: 2,
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              How We Work
            </p>
            <h2 className="section-title heading-serif">
              Our Process.{" "}
              <span style={{color: "#E8443A"}}>Your Dream Home.</span>
            </h2>
            <div className="section-line" />
            <p className="section-sub" style={{marginBottom: 56}}>
              A transparent, step-by-step journey from your first call to the
              moment you unlock your new door.
            </p>
          </Reveal>
          <div className="process-grid">
            {processSteps.map((step, i) => (
              <Reveal key={step.num} delay={i * 0.05}>
                <div className="process-card">
                  <div className="process-num">{step.num}</div>
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #FFF5F4, #FDECEA)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 16,
                      fontSize: 28,
                    }}
                  >
                    {step.emoji}
                  </div>
                  <h4
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#1a1a1a",
                      marginBottom: 8,
                      lineHeight: 1.35,
                    }}
                  >
                    {step.title}
                  </h4>
                  <p style={{fontSize: 12.5, color: "#888", lineHeight: 1.6}}>
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── RECENT WORKS ─── */}
      <section id="projects" style={{background: "#fff"}}>
        <div className="section">
          <Reveal>
            <p
              style={{
                textAlign: "center",
                fontSize: 13,
                fontWeight: 700,
                color: "#E8443A",
                letterSpacing: 2,
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Portfolio
            </p>
            <h2 className="section-title heading-serif">Our Recent Works</h2>
            <div className="section-line" />
            <p className="section-sub" style={{marginBottom: 56}}>
              Experience the essence of thoughtful construction in Bangalore —
              our work speaks volumes about who we are and what we build.
            </p>
          </Reveal>
          <div className="img-grid">
            {projectImages.map((src, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <motion.div
                  whileHover={{scale: 1.03}}
                  style={{
                    borderRadius: 16,
                    overflow: "hidden",
                    aspectRatio: "4/3",
                    cursor: "pointer",
                    boxShadow: "0 4px 20px rgba(0,0,0,.08)",
                    position: "relative",
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
                      transition: "transform .5s",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg, transparent 60%, rgba(0,0,0,.4) 100%)",
                      opacity: 0,
                      transition: "opacity .3s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
                  />
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHAT YOU GET ─── */}
      <section style={{background: "#fafafa"}}>
        <div className="section">
          <Reveal>
            <p
              style={{
                textAlign: "center",
                fontSize: 13,
                fontWeight: 700,
                color: "#E8443A",
                letterSpacing: 2,
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Why Choose Us
            </p>
            <h2 className="section-title heading-serif">
              What You Get When You Hire Us
            </h2>
            <div className="section-line" />
            <p className="section-sub" style={{marginBottom: 56}}>
              At our core are four things that define who we are and what we
              stand for.
            </p>
          </Reveal>
          <div className="grid4">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.1}>
                <div className="feature-card">
                  <div
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: 18,
                      background: "linear-gradient(135deg, #E8443A, #c0392b)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 22px",
                      boxShadow: "0 8px 28px rgba(232,68,58,.25)",
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
                  <p style={{fontSize: 14, color: "#777", lineHeight: 1.7}}>
                    {f.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PACKAGES ─── */}
      <section id="packages" style={{background: "#fff"}}>
        <div className="section">
          <Reveal>
            <p
              style={{
                textAlign: "center",
                fontSize: 13,
                fontWeight: 700,
                color: "#E8443A",
                letterSpacing: 2,
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Pricing
            </p>
            <h2 className="section-title heading-serif">
              Our Turnkey Construction Packages
            </h2>
            <div className="section-line" />
            <p className="section-sub" style={{marginBottom: 56}}>
              Come to our Experience Centre and get a look and feel of what we
              do! No substandard products and no surprises later!
            </p>
          </Reveal>
          <div className="grid3">
            {packages.map((pkg, i) => (
              <Reveal key={pkg.name} delay={i * 0.12}>
                <div
                  className="pkg-card"
                  style={{
                    border: pkg.featured
                      ? "2px solid #E8443A"
                      : "1px solid #eee",
                    position: "relative",
                  }}
                >
                  {pkg.featured && (
                    <div
                      style={{
                        position: "absolute",
                        top: 16,
                        right: -8,
                        background: "#E8443A",
                        color: "#fff",
                        fontSize: 10,
                        fontWeight: 800,
                        letterSpacing: 1.5,
                        padding: "6px 16px 6px 12px",
                        borderRadius: "4px 0 0 4px",
                        boxShadow: "0 2px 8px rgba(232,68,58,.3)",
                      }}
                    >
                      MOST POPULAR
                    </div>
                  )}
                  <div
                    style={{
                      background: pkg.featured
                        ? "linear-gradient(135deg, #E8443A, #c0392b)"
                        : "linear-gradient(135deg, #1a1a1a, #2d2d2d)",
                      color: "#fff",
                      padding: "28px 28px",
                      textAlign: "center",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: 22,
                        fontWeight: 800,
                        letterSpacing: 3,
                        margin: 0,
                      }}
                    >
                      {pkg.name}
                    </h3>
                    <p style={{fontSize: 12, opacity: 0.7, marginTop: 4}}>
                      PACKAGE
                    </p>
                  </div>
                  <div style={{padding: 28}}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 11,
                        marginBottom: 28,
                      }}
                    >
                      {pkg.items.map((item) => (
                        <div
                          key={item}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            fontSize: 13.5,
                            color: "#555",
                          }}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#E8443A"
                            strokeWidth="3"
                            strokeLinecap="round"
                          >
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                          {item}
                        </div>
                      ))}
                    </div>
                    <RippleButton
                      style={{
                        width: "100%",
                        padding: "14px 0",
                        fontSize: 13,
                        borderRadius: 10,
                      }}
                    >
                      GET A QUOTE
                    </RippleButton>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section style={{background: "#fafafa"}}>
        <div className="section">
          <div className="grid2" style={{alignItems: "center"}}>
            <Reveal direction="left">
              <div>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#E8443A",
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    marginBottom: 12,
                  }}
                >
                  About Us
                </p>
                <h2
                  className="heading-serif"
                  style={{
                    fontSize: 36,
                    fontWeight: 700,
                    marginBottom: 12,
                    lineHeight: 1.2,
                  }}
                >
                  Get to Know {BRAND_SHORT}
                </h2>
                <div
                  style={{
                    width: 60,
                    height: 3,
                    background: "#E8443A",
                    borderRadius: 2,
                    marginBottom: 28,
                  }}
                />
                <p
                  style={{
                    color: "#666",
                    lineHeight: 1.8,
                    fontSize: 15,
                    marginBottom: 16,
                  }}
                >
                  {BRAND} is a Bangalore based construction company offering
                  complete turnkey solutions across Karnataka for both
                  residential and commercial projects. We specialize in
                  architectural design, construction, interiors and renovation
                  works — providing end-to-end services from concept to final
                  handover under one roof.
                </p>
                <p
                  style={{
                    color: "#666",
                    lineHeight: 1.8,
                    fontSize: 15,
                    marginBottom: 32,
                  }}
                >
                  Our approach focuses on quality workmanship, timely project
                  delivery and budget-friendly solutions without compromising
                  standards. We are committed to delivering durable, functional,
                  and aesthetically pleasing spaces tailored to our client's
                  needs.
                </p>
                <div style={{display: "flex", gap: 16, flexWrap: "wrap"}}>
                  <RippleButton>Learn More</RippleButton>
                  <RippleButton
                    variant="dark"
                    style={{
                      background: "transparent",
                      color: "#1a1a1a",
                      border: "2px solid #ddd",
                    }}
                  >
                    {icons.phone} Contact Us
                  </RippleButton>
                </div>
              </div>
            </Reveal>
            <Reveal direction="right">
              <div style={{position: "relative"}}>
                <div
                  style={{
                    borderRadius: 20,
                    overflow: "hidden",
                    boxShadow: "0 16px 48px rgba(0,0,0,.1)",
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&h=400&fit=crop"
                    alt="About"
                    style={{width: "100%", display: "block"}}
                  />
                </div>
                {/* Decorative accent */}
                <div
                  style={{
                    position: "absolute",
                    bottom: -16,
                    right: -16,
                    width: 120,
                    height: 120,
                    borderRadius: 20,
                    background: "linear-gradient(135deg, #E8443A22, #E8443A11)",
                    zIndex: -1,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: -16,
                    left: -16,
                    width: 80,
                    height: 80,
                    borderRadius: 16,
                    border: "3px solid #E8443A33",
                    zIndex: -1,
                  }}
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
            <p
              style={{
                textAlign: "center",
                fontSize: 13,
                fontWeight: 700,
                color: "#E8443A",
                letterSpacing: 2,
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Got Questions?
            </p>
            <h2 className="section-title heading-serif">
              What Clients Ask — FAQ's
            </h2>
            <div className="section-line" />
            <p className="section-sub" style={{marginBottom: 48}}>
              Everything you need to know before starting your construction
              journey with us.
            </p>
          </Reveal>
          <div style={{maxWidth: 800, margin: "0 auto"}}>
            {faqs.map((faq, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <div className="faq-item">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{
                      width: "100%",
                      background: "none",
                      border: "none",
                      padding: "20px 24px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                      fontSize: 15,
                      fontWeight: 600,
                      color: openFaq === i ? "#E8443A" : "#333",
                      textAlign: "left",
                      fontFamily: "inherit",
                      transition: "color .2s",
                      gap: 16,
                    }}
                  >
                    <span
                      style={{display: "flex", alignItems: "center", gap: 14}}
                    >
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 800,
                          color: "#E8443A",
                          background: "#E8443A11",
                          width: 28,
                          height: 28,
                          borderRadius: 8,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {faq.q}
                    </span>
                    <motion.span
                      animate={{rotate: openFaq === i ? 180 : 0}}
                      transition={{duration: 0.25}}
                      style={{flexShrink: 0}}
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
                            padding: "0 24px 20px 66px",
                            fontSize: 14,
                            color: "#777",
                            lineHeight: 1.8,
                          }}
                        >
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section
        style={{
          background: "linear-gradient(135deg, #E8443A, #c0392b)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&h=400&fit=crop') center/cover",
            opacity: 0.08,
          }}
        />
        <div
          className="section"
          style={{
            position: "relative",
            textAlign: "center",
            padding: "80px 24px",
          }}
        >
          <Reveal>
            <h2
              className="heading-serif"
              style={{
                fontSize: "clamp(28px,4vw,42px)",
                color: "#fff",
                fontWeight: 700,
                marginBottom: 16,
              }}
            >
              Ready to Build Your Dream Home?
            </h2>
            <p
              style={{
                fontSize: 16,
                color: "rgba(255,255,255,.8)",
                marginBottom: 36,
                maxWidth: 500,
                margin: "0 auto 36px",
              }}
            >
              Get a free consultation and detailed cost estimate for your
              project today.
            </p>
            <div
              style={{
                display: "flex",
                gap: 16,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <RippleButton
                variant="dark"
                style={{fontSize: 14, padding: "16px 40px", borderRadius: 10}}
              >
                Get Free Estimate
              </RippleButton>
              <RippleButton
                variant="outline"
                style={{fontSize: 14, padding: "16px 40px", borderRadius: 10}}
              >
                {icons.phone} Call Now
              </RippleButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer
        id="contact"
        style={{
          background: "#0f0f0f",
          color: "#ccc",
          padding: "72px 24px 32px",
        }}
      >
        <div style={{maxWidth: 1200, margin: "0 auto"}}>
          <div className="grid3" style={{marginBottom: 56}}>
            <div>
              <div style={{marginBottom: 24}}>
                <img src={logoImg} alt={BRAND} style={{height: 48}} />
              </div>
              <p
                style={{
                  fontSize: 13,
                  color: "#666",
                  marginBottom: 20,
                  lineHeight: 1.7,
                }}
              >
                Turnkey | Residential | Commercial | Interiors | Architects |
                Renovation
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  marginBottom: 14,
                  fontSize: 14,
                  color: "#999",
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
                  marginBottom: 10,
                  fontSize: 14,
                }}
              >
                {icons.phone}
                <a
                  href={`tel:${PHONE1.replace(/\s/g, "")}`}
                  style={{color: "#E8443A", textDecoration: "none"}}
                >
                  {PHONE1}
                </a>
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
                <a
                  href={`tel:${PHONE2.replace(/\s/g, "")}`}
                  style={{color: "#E8443A", textDecoration: "none"}}
                >
                  {PHONE2}
                </a>
              </div>
            </div>
            <div>
              <h4
                style={{
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 700,
                  marginBottom: 20,
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
                    color: "#777",
                    textDecoration: "none",
                    fontSize: 14,
                    marginBottom: 12,
                    transition: "all .2s",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "#E8443A";
                    e.target.style.paddingLeft = "4px";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "#777";
                    e.target.style.paddingLeft = "0";
                  }}
                >
                  {l}
                </a>
              ))}
            </div>
            <div>
              <h4
                style={{
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 700,
                  marginBottom: 20,
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
                    color: "#777",
                    textDecoration: "none",
                    fontSize: 13,
                    marginBottom: 14,
                    lineHeight: 1.5,
                    transition: "color .2s",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#E8443A")}
                  onMouseLeave={(e) => (e.target.style.color = "#777")}
                >
                  {p}
                </a>
              ))}
            </div>
          </div>
          <div
            style={{
              borderTop: "1px solid #222",
              paddingTop: 24,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <p style={{fontSize: 12, color: "#555"}}>
              Copyright 2024-2025 {BRAND} | All Rights Reserved
            </p>
            <div style={{display: "flex", gap: 12, alignItems: "center"}}>
              {[
                {icon: icons.whatsapp, href: "https://wa.me/917090762023"},
                {
                  icon: icons.instagram,
                  href: "https://instagram.com/theorigin.dnc",
                },
                {icon: icons.facebook, href: "#"},
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: "#1a1a1a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#999",
                    transition: "all .2s",
                    border: "1px solid #222",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#E8443A";
                    e.currentTarget.style.borderColor = "#E8443A";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#1a1a1a";
                    e.currentTarget.style.borderColor = "#222";
                  }}
                >
                  {social.icon}
                </a>
              ))}
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
          width: 58,
          height: 58,
          borderRadius: "50%",
          background: "#25D366",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 6px 20px rgba(37,211,102,.4)",
          cursor: "pointer",
        }}
      >
        {icons.whatsapp}
      </motion.a>
    </div>
  );
}
