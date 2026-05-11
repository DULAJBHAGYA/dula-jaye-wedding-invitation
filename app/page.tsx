"use client";

import { useState, useEffect } from "react";

// ─── Countdown Hook ───────────────────────────────────────────────────────────
function useCountdown(target) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = new Date(target) - new Date();
      if (diff <= 0) return setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return time;
}

// ─── Scroll Reveal Hook ───────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("revealed");
        }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ─── Floating Petals — pure SVG, zero emoji ───────────────────────────────────
function Petals() {
  const items = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    left: `${5 + ((i * 37 + 13) % 90)}%`,
    delay: `${(i * 1.3) % 12}s`,
    duration: `${11 + (i % 5) * 1.8}s`,
    size: 8 + (i % 4) * 4,
    opacity: 0.22 + (i % 3) * 0.09,
    rotate: (i * 47) % 360,
  }));

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {items.map(({ id, left, delay, duration, size, opacity, rotate }) => (
        <svg
          key={id}
          className="petal absolute"
          style={{
            left,
            top: "-20px",
            width: size,
            height: size,
            animationDelay: delay,
            animationDuration: duration,
            opacity,
          }}
          viewBox="0 0 24 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse cx="12" cy="10" rx="6" ry="10" fill="#ffc8d5" transform={`rotate(${rotate} 12 14)`} />
          <ellipse cx="12" cy="10" rx="3" ry="6" fill="#f5e6b8" opacity="0.6" transform={`rotate(${rotate} 12 14)`} />
        </svg>
      ))}
    </div>
  );
}

// ─── Ornament Divider — SVG only ──────────────────────────────────────────────
function OrnamentDivider() {
  return (
    <div className="flex items-center justify-center my-8">
      <svg width="280" height="18" viewBox="0 0 280 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gl" x1="0" x2="1">
            <stop offset="0%" stopColor="#e8c97a" stopOpacity="0" />
            <stop offset="100%" stopColor="#e8c97a" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="gr" x1="0" x2="1">
            <stop offset="0%" stopColor="#e8c97a" stopOpacity="1" />
            <stop offset="100%" stopColor="#e8c97a" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="0" y1="9" x2="108" y2="9" stroke="url(#gl)" strokeWidth="1" />
        <circle cx="122" cy="9" r="2" fill="#ffc8d5" />
        <circle cx="140" cy="9" r="3.5" fill="#d4a847" />
        <circle cx="158" cy="9" r="2" fill="#ffc8d5" />
        <path d="M134 4 L137 8 L134 9.5 L131 8Z" fill="#d4a847" opacity="0.6" />
        <path d="M146 4 L149 8 L146 9.5 L143 8Z" fill="#d4a847" opacity="0.6" />
        <path d="M134 14 L137 10 L134 8.5 L131 10Z" fill="#d4a847" opacity="0.6" />
        <path d="M146 14 L149 10 L146 8.5 L143 10Z" fill="#d4a847" opacity="0.6" />
        <line x1="172" y1="9" x2="280" y2="9" stroke="url(#gr)" strokeWidth="1" />
      </svg>
    </div>
  );
}

// ─── Schedule SVG Icons ───────────────────────────────────────────────────────
function ScheduleIcon({ type }) {
  const s = { viewBox: "0 0 24 24", fill: "none", stroke: "#d4a847", strokeWidth: "1.5", width: 20, height: 20 };
  const icons = {
    sun: <svg {...s}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" strokeLinecap="round"/></svg>,
    leaf: <svg {...s}><path d="M17 8C8 10 5.9 16.17 3.82 19.34a1 1 0 0 0 1.38 1.38C7.56 18.69 13.83 16.6 16 8" strokeLinecap="round"/><path d="M3 3l18 18" strokeLinecap="round"/></svg>,
    candle: <svg {...s}><path d="M9 21h6M9 9h6v12H9zM12 9V3"/><path d="M10 5c0-1 1-2 2-2s2 1 2 2" strokeLinecap="round"/></svg>,
    door: <svg {...s}><path d="M3 21h18M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/><circle cx="15" cy="13" r="1" fill="#d4a847" stroke="none"/></svg>,
    plate: <svg {...s}><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM8 12h8M12 8v8" strokeLinecap="round"/></svg>,
    cake: <svg {...s}><path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2 1 2 1M2 21h20M7 8v2M12 8v2M17 8v2" strokeLinecap="round"/></svg>,
  };
  return icons[type] || icons.sun;
}

// ─── RSVP Form ────────────────────────────────────────────────────────────────
function RSVPForm() {
  const [form, setForm] = useState({ name: "", email: "", guests: "1", attending: "yes", message: "" });
  const [submitted, setSubmitted] = useState(false);

  if (submitted)
    return (
      <div className="text-center py-14 space-y-5">
        <svg className="mx-auto" width="72" height="72" viewBox="0 0 72 72" fill="none">
          <circle cx="36" cy="36" r="34" stroke="#d4a847" strokeWidth="1.5" />
          <circle cx="36" cy="36" r="26" stroke="#ffc8d5" strokeWidth="1" />
          <path d="M22 36 L31 45 L50 26" stroke="#d4a847" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--gold-600)", fontSize: "1.6rem" }}>
          Ayubowan!
        </h3>
        <p style={{ fontFamily: "'Lato', sans-serif", color: "var(--blush-700)", fontSize: "0.9rem", lineHeight: 1.7 }}>
          Thank you, {form.name}.<br />We look forward to celebrating with you.
        </p>
      </div>
    );

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-5 max-w-lg mx-auto">
      {[
        { id: "name", label: "Full Name", type: "text", placeholder: "Your name" },
        { id: "email", label: "Email Address", type: "email", placeholder: "you@example.com" },
      ].map(({ id, label, type, placeholder }) => (
        <div key={id} className="space-y-1">
          <label
            className="block text-xs tracking-widest uppercase font-semibold"
            style={{ color: "var(--gold-600)" }}
          >
            {label}
          </label>
          <input
            type={type}
            required
            value={form[id]}
            onChange={(e) => setForm({ ...form, [id]: e.target.value })}
            placeholder={placeholder}
            className="w-full rounded-xl px-4 py-3 text-sm transition focus:outline-none"
            style={{
              background: "rgba(255,255,255,0.7)",
              border: "1px solid #ffc8d5",
              color: "var(--blush-800)",
            }}
          />
        </div>
      ))}

      <div className="grid grid-cols-2 gap-4">
        {[
          { id: "attending", label: "Attending?", options: [{ v: "yes", l: "Joyfully Accept" }, { v: "no", l: "Regretfully Decline" }] },
          { id: "guests", label: "No. of Guests", options: [1,2,3,4].map((n) => ({ v: String(n), l: String(n) })) },
        ].map(({ id, label, options }) => (
          <div key={id} className="space-y-1">
            <label className="block text-xs tracking-widest uppercase font-semibold" style={{ color: "var(--gold-600)" }}>
              {label}
            </label>
            <select
              value={form[id]}
              onChange={(e) => setForm({ ...form, [id]: e.target.value })}
              className="w-full rounded-xl px-4 py-3 text-sm transition focus:outline-none"
              style={{ background: "rgba(255,255,255,0.7)", border: "1px solid #ffc8d5", color: "var(--blush-800)" }}
            >
              {options.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
            </select>
          </div>
        ))}
      </div>

      <div className="space-y-1">
        <label className="block text-xs tracking-widest uppercase font-semibold" style={{ color: "var(--gold-600)" }}>
          Message to the Couple
        </label>
        <textarea
          rows={3}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Share your wishes..."
          className="w-full rounded-xl px-4 py-3 text-sm transition focus:outline-none resize-none"
          style={{ background: "rgba(255,255,255,0.7)", border: "1px solid #ffc8d5", color: "var(--blush-800)" }}
        />
      </div>

      <button
        type="submit"
        className="w-full text-white font-semibold tracking-widest uppercase text-xs py-4 rounded-xl shadow-lg transition-all duration-300 hover:opacity-90 active:scale-95"
        style={{ background: "linear-gradient(135deg, #d4a847, #b8892c)" }}
      >
        Confirm Attendance
      </button>
    </form>
  );
}

// ─── Map Embed ────────────────────────────────────────────────────────────────
function MapEmbed() {
  return (
    <div className="rounded-3xl overflow-hidden shadow-2xl" style={{ border: "3px solid rgba(255,255,255,0.9)" }}>
      <iframe
        title="BMICH Colombo — Wedding Venue"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.798467128636!2d79.86132631477373!3d6.9218375950127505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae259251b73c1d5%3A0x2cd5cc3ca22babb5!2sBandaranaike%20Memorial%20International%20Conference%20Hall!5e0!3m2!1sen!2slk!4v1700000000000"
        width="100%"
        height="380"
        style={{ border: 0, display: "block" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

// ─── Nav Dots ─────────────────────────────────────────────────────────────────
function NavDots({ sections, active }) {
  return (
    <nav className="fixed right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3" aria-label="Page navigation">
      {sections.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          title={label}
          aria-label={label}
          className="block w-2.5 h-2.5 rounded-full border-2 transition-all duration-300"
          style={{
            background: active === id ? "#d4a847" : "transparent",
            borderColor: "#e8c97a",
            transform: active === id ? "scale(1.35)" : "scale(1)",
          }}
        />
      ))}
    </nav>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
function Section({ id, children, className = "", style = {} }) {
  return (
    <section id={id} className={`relative z-10 ${className}`} style={style}>
      {children}
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function WeddingPage() {
  const WEDDING_DATE = "2025-11-15T06:00:00";
  const countdown = useCountdown(WEDDING_DATE);
  useScrollReveal();

  const navSections = [
    { id: "hero",      label: "Home" },
    { id: "story",     label: "Our Story" },
    { id: "schedule",  label: "Schedule" },
    { id: "countdown", label: "Countdown" },
    { id: "venue",     label: "Venue" },
    { id: "rsvp",      label: "RSVP" },
  ];

  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0.4 }
    );
    navSections.forEach(({ id }) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  const schedule = [
    { time: "6:00 AM",  title: "Nekath — Auspicious Moment",    icon: "sun",    desc: "The sacred hour begins. Dulaj and Jayanithya exchange garlands under the guidance of the astrologer's chosen nekath, witnessed by elders and family." },
    { time: "7:00 AM",  title: "Poruwa Ceremony",               icon: "leaf",   desc: "The couple ascends the Poruwa, the traditional decorated platform, for the Sinhalese wedding ritual. Blessings are chanted and betel leaves exchanged." },
    { time: "8:30 AM",  title: "Pirith and Blessings",          icon: "candle", desc: "Buddhist monks chant Pirith, protective verses, to bless the union. Family members tie the magul daama (auspicious thread) around the couple's wrists." },
    { time: "10:00 AM", title: "Reception Doors Open",          icon: "door",   desc: "Guests are warmly welcomed into the beautifully decorated reception hall with traditional Sri Lankan hospitality and floral arrangements." },
    { time: "12:00 PM", title: "Wedding Lunch",                  icon: "plate",  desc: "A grand Sri Lankan feast featuring rice and curry, kiribath, and traditional sweets, enjoyed together as one family." },
    { time: "3:00 PM",  title: "Cake Cutting and Celebrations", icon: "cake",   desc: "The couple cuts the wedding cake and the afternoon fills with music, dancing, and cherished moments with loved ones." },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Marcellus&family=Lato:wght@300;400;600&display=swap');

        :root {
          --gold-100: #fdf6e3;
          --gold-200: #f5e6b8;
          --gold-300: #e8c97a;
          --gold-400: #d4a847;
          --gold-500: #b8892c;
          --gold-600: #9a6f1a;
          --pink-50:  #fff5f7;
          --pink-100: #ffe4eb;
          --pink-200: #ffc8d5;
          --blush-700: #8b4f62;
          --blush-800: #6b3248;
        }

        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: #fffaf8; font-family: 'Lato', sans-serif; }

        /* Petal fall */
        @keyframes petalFall {
          0%   { transform: translateY(-40px) rotate(0deg);    opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.45; }
          100% { transform: translateY(110vh) rotate(560deg);  opacity: 0; }
        }
        .petal { animation: petalFall linear infinite; }

        /* Scroll reveal */
        [data-reveal] { opacity: 0; transform: translateY(28px); transition: opacity 0.9s ease, transform 0.9s ease; }
        [data-reveal].revealed { opacity: 1; transform: translateY(0); }
        [data-reveal][data-delay="1"] { transition-delay: 0.1s; }
        [data-reveal][data-delay="2"] { transition-delay: 0.22s; }
        [data-reveal][data-delay="3"] { transition-delay: 0.36s; }
        [data-reveal][data-delay="4"] { transition-delay: 0.5s; }
        [data-reveal][data-delay="5"] { transition-delay: 0.65s; }

        /* Hero entry animations */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .a1 { animation: fadeUp 1.1s ease 0.1s  both; }
        .a2 { animation: fadeUp 1.1s ease 0.3s  both; }
        .a3 { animation: fadeUp 1.1s ease 0.5s  both; }
        .a4 { animation: fadeUp 1.1s ease 0.7s  both; }
        .a5 { animation: fadeUp 1.1s ease 0.9s  both; }
        .a6 { animation: fadeUp 1.1s ease 1.1s  both; }

        /* Countdown pulse */
        @keyframes softPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(212,168,71,0.28); }
          50%      { box-shadow: 0 0 0 9px rgba(212,168,71,0); }
        }
        .cd-card { animation: softPulse 3s ease infinite; }

        /* Gradient border utility */
        .gb-card {
          position: relative;
          background: rgba(255,255,255,0.75);
          backdrop-filter: blur(14px);
        }
        .gb-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1.5px;
          background: linear-gradient(135deg, #e8c97a, #ffc8d5, #e8c97a);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        /* Timeline vertical line */
        .tl-item { position: relative; padding-left: 2.5rem; }
        .tl-item::before {
          content: '';
          position: absolute;
          left: 1.35rem;
          top: 3.2rem;
          bottom: -1rem;
          width: 1.5px;
          background: linear-gradient(to bottom, var(--gold-300), var(--pink-200), transparent);
        }
        .tl-item:last-child::before { display: none; }

        /* Diamond background pattern */
        .diamond-bg {
          background-image: url("data:image/svg+xml,%3Csvg width='44' height='44' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M22 2L42 22L22 42L2 22Z' fill='none' stroke='%23e8c97a' stroke-width='0.5' opacity='0.2'/%3E%3C/svg%3E");
          background-size: 44px 44px;
        }

        /* Scroll cue bounce */
        @keyframes cue { 0%,100%{transform:translateY(0)} 50%{transform:translateY(7px)} }
        .scroll-cue { animation: cue 2.2s ease infinite; }

        /* Hero name responsive size */
        .hero-name { font-family:'Cormorant Garamond',serif; font-weight:300; font-size:clamp(3rem,9.5vw,6.5rem); line-height:1; color:var(--blush-800); }
        .hero-amp  { font-family:'Cormorant Garamond',serif; font-style:italic; font-size:clamp(1.5rem,4vw,2.8rem); color:var(--gold-400); }
      `}</style>

      <Petals />
      <NavDots sections={navSections} active={activeSection} />

      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <Section
        id="hero"
        className="min-h-screen flex flex-col items-center justify-center text-center px-6 diamond-bg overflow-hidden"
        style={{ background: "linear-gradient(155deg,#fff9fb 0%,#fffaf5 55%,#fff5f0 100%)" }}
      >
        {/* Corner bracket ornaments */}
        {[["top-6 left-6","0 0"],["top-6 right-6","1 0"],["bottom-6 left-6","0 1"],["bottom-6 right-6","1 1"]].map(([pos, scale]) => (
          <div key={pos} className={`absolute ${pos} pointer-events-none`} style={{ transform: `scale(${scale.split(" ").map((v,i)=>(i===0?v==="1"?-1:1:v==="1"?-1:1)).join(",")})` }}>
            <svg width="52" height="52" viewBox="0 0 52 52" fill="none" opacity="0.22">
              <path d="M2 22 L2 2 L22 2" stroke="#d4a847" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
              <circle cx="2" cy="2" r="2" fill="#d4a847" />
            </svg>
          </div>
        ))}

        <div className="relative z-10 max-w-3xl mx-auto space-y-2">
          <p className="a1 font-body text-xs tracking-[0.5em] uppercase" style={{ color:"var(--gold-400)" }}>
            The Wedding of
          </p>

          <h1 className="a2 hero-name">Dulaj</h1>

          <div className="a3 flex items-center justify-center gap-5 py-1">
            <div className="h-px w-16 md:w-28" style={{ background:"linear-gradient(to right,transparent,#e8c97a)" }} />
            <span className="hero-amp">&amp;</span>
            <div className="h-px w-16 md:w-28" style={{ background:"linear-gradient(to left,transparent,#e8c97a)" }} />
          </div>

          <h1 className="a4 hero-name">Jayanithya</h1>

          <div className="a5">
            <OrnamentDivider />
            <p className="font-heading tracking-widest text-base" style={{ color:"var(--blush-700)" }}>
              15 &middot; November &middot; 2025
            </p>
            <p className="font-body text-xs tracking-[0.35em] mt-1.5 uppercase" style={{ color:"var(--gold-500)" }}>
              BMICH, Colombo, Sri Lanka
            </p>
          </div>

          <div className="a6 flex flex-col sm:flex-row gap-3 justify-center pt-5">
            <a href="#rsvp" className="inline-block px-9 py-3 rounded-full text-white text-xs font-semibold tracking-widest uppercase shadow-lg transition-all hover:opacity-90 hover:scale-105"
              style={{ background:"linear-gradient(135deg,#d4a847,#b8892c)" }}>
              RSVP Now
            </a>
            <a href="#schedule" className="inline-block px-9 py-3 rounded-full text-xs font-semibold tracking-widest uppercase transition-all hover:scale-105"
              style={{ border:"1.5px solid var(--gold-300)", color:"var(--gold-600)" }}>
              View Schedule
            </a>
          </div>

          {/* Scroll cue */}
          <div className="scroll-cue mt-12 flex flex-col items-center gap-1.5 opacity-35">
            <div className="w-px h-8" style={{ background:"linear-gradient(to bottom,transparent,#ffaabf)" }} />
            <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
              <path d="M1 1L7 7L13 1" stroke="#ffaabf" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </Section>

      {/* ══ OUR STORY ═════════════════════════════════════════════════════ */}
      <Section id="story" className="py-24 px-6" style={{ background:"#fffdf9" }}>
        <div className="max-w-3xl mx-auto text-center">
          <p data-reveal className="font-body text-xs tracking-[0.5em] uppercase mb-2" style={{ color:"var(--gold-400)" }}>
            Our Story
          </p>
          <h2 data-reveal data-delay="1" className="font-display text-4xl md:text-5xl font-light" style={{ color:"var(--blush-800)", fontFamily:"'Cormorant Garamond',serif" }}>
            Two Hearts, One Journey
          </h2>
          <OrnamentDivider />

          <p data-reveal data-delay="2" className="font-body text-base leading-loose mb-10" style={{ color:"var(--blush-700)" }}>
            In the warmth of a Sri Lankan sunrise, two souls found each other. Dulaj and Jayanithya's
            love story blossomed amidst the fragrance of jasmine and temple flowers — a bond blessed
            by family, faith, and the timeless traditions of our beautiful island. Together, they walk
            forward into a life adorned with love, laughter, and the grace of a thousand blessings.
          </p>

          {/* Lotus ring motif */}
          <div data-reveal data-delay="3" className="mx-auto mb-8" style={{ width:148, height:148 }}>
            <svg viewBox="0 0 148 148" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="74" cy="74" r="70" stroke="#e8c97a" strokeWidth="0.8" opacity="0.35"/>
              <circle cx="74" cy="74" r="58" stroke="#ffc8d5" strokeWidth="0.8" opacity="0.4"/>
              {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg,i) => (
                <ellipse key={i} cx="74" cy="74" rx="4.5" ry="16"
                  fill={i%2===0?"#ffc8d5":"#f5e6b8"}
                  opacity="0.5"
                  transform={`rotate(${deg} 74 74) translate(0 -40)`}
                />
              ))}
              <circle cx="74" cy="74" r="22" fill="#fffdf9" stroke="#d4a847" strokeWidth="1.5"/>
              <circle cx="74" cy="74" r="15" fill="#fdf6e3"/>
              <text x="74" y="71" textAnchor="middle"
                style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"9.5px", fill:"#9a6f1a", fontStyle:"italic" }}>
                D &amp; J
              </text>
              <text x="74" y="82" textAnchor="middle"
                style={{ fontFamily:"'Lato',sans-serif", fontSize:"5.5px", fill:"#b8892c", letterSpacing:"1.5px" }}>
                2025
              </text>
            </svg>
          </div>

          <p data-reveal data-delay="4" className="font-display italic text-xl" style={{ fontFamily:"'Cormorant Garamond',serif", color:"var(--gold-500)" }}>
            "Where there is love, there is life."
          </p>
        </div>
      </Section>

      {/* ══ SCHEDULE ══════════════════════════════════════════════════════ */}
      <Section id="schedule" className="py-24 px-6"
        style={{ background:"linear-gradient(160deg,#fff5f7 0%,#fffaf5 100%)" }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-14">
            <p data-reveal className="font-body text-xs tracking-[0.5em] uppercase mb-2" style={{ color:"var(--gold-400)" }}>
              The Ceremony
            </p>
            <h2 data-reveal data-delay="1" className="font-display text-4xl md:text-5xl font-light"
              style={{ fontFamily:"'Cormorant Garamond',serif", color:"var(--blush-800)" }}>
              Wedding Day Schedule
            </h2>
            <OrnamentDivider />
          </div>

          {schedule.map((item, i) => (
            <div key={i} data-reveal data-delay={String((i%5)+1)} className="tl-item mb-10">
              <div className="flex gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center shadow-sm"
                  style={{ background:"linear-gradient(135deg,#fdf6e3,#f5e6b8)", border:"1.5px solid var(--gold-300)" }}>
                  <ScheduleIcon type={item.icon} />
                </div>
                <div className="pb-6 flex-1" style={{ borderBottom:"1px solid #fce4ea" }}>
                  <p className="font-body text-xs tracking-widest uppercase mb-0.5" style={{ color:"var(--gold-500)" }}>
                    {item.time}
                  </p>
                  <h3 className="font-heading text-lg mb-1.5" style={{ fontFamily:"'Marcellus',serif", color:"var(--blush-800)" }}>
                    {item.title}
                  </h3>
                  <p className="font-body text-sm leading-relaxed" style={{ color:"var(--blush-700)" }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ══ COUNTDOWN ═════════════════════════════════════════════════════ */}
      <Section id="countdown" className="py-28 px-6 relative overflow-hidden diamond-bg"
        style={{ background:"linear-gradient(135deg,#6b3248 0%,#8b4f62 45%,#9a6f1a 100%)" }}>
        <div className="absolute inset-0 diamond-bg pointer-events-none" style={{ opacity:0.07 }} />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <p data-reveal className="font-body text-xs tracking-[0.5em] uppercase mb-3" style={{ color:"var(--gold-300)" }}>
            Counting Down to Forever
          </p>
          <h2 data-reveal data-delay="1" className="font-display text-4xl md:text-5xl font-light text-white mb-12"
            style={{ fontFamily:"'Cormorant Garamond',serif" }}>
            The Big Day
          </h2>

          <div className="grid grid-cols-4 gap-3 md:gap-5 max-w-lg mx-auto">
            {[
              { val: countdown.days,    label: "Days" },
              { val: countdown.hours,   label: "Hours" },
              { val: countdown.minutes, label: "Minutes" },
              { val: countdown.seconds, label: "Seconds" },
            ].map(({ val, label }, i) => (
              <div key={i} data-reveal data-delay={String(i+1)}
                className="cd-card gb-card rounded-2xl py-6 px-2 text-center"
                style={{ background:"rgba(255,255,255,0.07)", backdropFilter:"blur(10px)" }}>
                <div className="font-display font-light text-white leading-none mb-1.5"
                  style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2rem,6vw,3.5rem)" }}>
                  {String(val).padStart(2,"0")}
                </div>
                <div className="font-body text-xs tracking-widest uppercase" style={{ color:"var(--gold-300)" }}>
                  {label}
                </div>
              </div>
            ))}
          </div>

          <p data-reveal data-delay="5" className="font-display italic text-lg mt-12"
            style={{ fontFamily:"'Cormorant Garamond',serif", color:"rgba(255,200,213,0.85)" }}>
            15 November 2025 &middot; 6:00 AM &middot; BMICH, Colombo
          </p>
        </div>
      </Section>

      {/* ══ VENUE ═════════════════════════════════════════════════════════ */}
      <Section id="venue" className="py-24 px-6" style={{ background:"#fffdf9" }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p data-reveal className="font-body text-xs tracking-[0.5em] uppercase mb-2" style={{ color:"var(--gold-400)" }}>
              Venue
            </p>
            <h2 data-reveal data-delay="1" className="font-display text-4xl md:text-5xl font-light"
              style={{ fontFamily:"'Cormorant Garamond',serif", color:"var(--blush-800)" }}>
              Where We Celebrate
            </h2>
            <OrnamentDivider />
          </div>

          <div data-reveal data-delay="2" className="text-center mb-8">
            <h3 className="font-heading text-xl md:text-2xl mb-2" style={{ fontFamily:"'Marcellus',serif", color:"var(--blush-800)" }}>
              Bandaranaike Memorial International Conference Hall
            </h3>
            <p className="font-body text-sm tracking-wide" style={{ color:"var(--blush-700)" }}>
              BMICH, Bauddhaloka Mawatha, Colombo 07, Sri Lanka
            </p>

            {/* Info pills */}
            <div className="flex flex-wrap justify-center gap-3 mt-5">
              {[
                { label:"6:00 AM — 5:00 PM", path:"M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2" },
                { label:"Colombo 07",        path:"M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0zM12 10m-3 0a3 3 0 1 0 6 0 3 3 0 1 0-6 0" },
                { label:"+94 11 269 5000",   path:"M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.08 4.18 2 2 0 0 1 5.07 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L9.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" },
              ].map(({ label, path }) => (
                <span key={label} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-body tracking-wide"
                  style={{ background:"var(--gold-100)", color:"var(--gold-600)", border:"1px solid var(--gold-200)" }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d={path} strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {label}
                </span>
              ))}
            </div>

            <div className="mt-6">
              <a href="https://maps.google.com/?q=BMICH+Colombo" target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full text-xs font-semibold tracking-widest uppercase text-white shadow-md transition-all hover:scale-105 hover:opacity-90"
                style={{ background:"linear-gradient(135deg,var(--gold-400),var(--gold-500))" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" strokeLinecap="round"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                Get Directions
              </a>
            </div>
          </div>

          <div data-reveal data-delay="3"><MapEmbed /></div>
        </div>
      </Section>

      {/* ══ RSVP ══════════════════════════════════════════════════════════ */}
      <Section id="rsvp" className="py-24 px-6"
        style={{ background:"linear-gradient(160deg,#fff5f7 0%,#fffaf5 100%)" }}>
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-12">
            <p data-reveal className="font-body text-xs tracking-[0.5em] uppercase mb-2" style={{ color:"var(--gold-400)" }}>
              Kindly Reply
            </p>
            <h2 data-reveal data-delay="1" className="font-display text-4xl md:text-5xl font-light"
              style={{ fontFamily:"'Cormorant Garamond',serif", color:"var(--blush-800)" }}>
              RSVP
            </h2>
            <p data-reveal data-delay="2" className="font-body text-sm mt-3" style={{ color:"var(--blush-700)" }}>
              Please reply by{" "}
              <span className="font-semibold" style={{ color:"var(--gold-500)" }}>1st November 2025</span>
            </p>
            <OrnamentDivider />
          </div>

          <div data-reveal data-delay="3" className="gb-card rounded-3xl p-8 md:p-10 shadow-xl">
            <RSVPForm />
          </div>
        </div>
      </Section>

      {/* ══ FOOTER ════════════════════════════════════════════════════════ */}
      <footer className="py-14 px-6 text-center" style={{ background:"#6b3248" }}>
        <svg className="mx-auto mb-6" width="200" height="16" viewBox="0 0 200 16" fill="none" opacity="0.4">
          <defs>
            <linearGradient id="fl" x1="0" x2="1"><stop offset="0%" stopColor="#e8c97a" stopOpacity="0"/><stop offset="100%" stopColor="#e8c97a" stopOpacity="1"/></linearGradient>
            <linearGradient id="fr" x1="0" x2="1"><stop offset="0%" stopColor="#e8c97a" stopOpacity="1"/><stop offset="100%" stopColor="#e8c97a" stopOpacity="0"/></linearGradient>
          </defs>
          <line x1="0" y1="8" x2="78" y2="8" stroke="url(#fl)" strokeWidth="1"/>
          <circle cx="90" cy="8" r="2" fill="#ffc8d5"/>
          <circle cx="100" cy="8" r="3" fill="#e8c97a"/>
          <circle cx="110" cy="8" r="2" fill="#ffc8d5"/>
          <line x1="122" y1="8" x2="200" y2="8" stroke="url(#fr)" strokeWidth="1"/>
        </svg>

        <p className="font-display italic text-2xl" style={{ fontFamily:"'Cormorant Garamond',serif", color:"rgba(255,200,213,0.9)" }}>
          Dulaj &amp; Jayanithya
        </p>
        <p className="font-body text-xs tracking-widest uppercase mt-1.5" style={{ color:"rgba(255,170,191,0.45)" }}>
          15 November 2025 &middot; Colombo, Sri Lanka
        </p>
        <p className="font-body text-xs mt-5" style={{ color:"rgba(255,170,191,0.3)" }}>
          Crafted with love
        </p>
      </footer>
    </>
  );
}