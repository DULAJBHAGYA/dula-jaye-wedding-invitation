"use client";

import { useState, useEffect, useRef } from "react";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaMusic } from "react-icons/fa";

// ─── Audio Player ─────────────────────────────────────────────────────────────
function AudioPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.loop = true;
    audio.volume = 0.45;
    const handleCanPlay = () => setLoaded(true);
    audio.addEventListener("canplaythrough", handleCanPlay);
    return () => audio.removeEventListener("canplaythrough", handleCanPlay);
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) { audio.pause(); setPlaying(false); }
    else { audio.play().then(() => setPlaying(true)).catch(() => {}); }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !muted;
    setMuted(!muted);
  };

  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: "10px",
      background: "rgba(255,255,255,0.75)", backdropFilter: "blur(12px)",
      border: "1px solid rgba(183,110,121,0.3)", borderRadius: "100px",
      padding: "10px 18px", boxShadow: "0 4px 20px rgba(183,110,121,0.12)",
    }}>
      <audio ref={audioRef} src="/wedding-music.mp3" preload="auto" />

      <FaMusic size={13} color="#b76e79" style={{ opacity: 0.7 }} />

      <span style={{ fontFamily: "'Lato',sans-serif", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#b76e79" }}>
        {playing ? "Now Playing" : "Wedding Music"}
      </span>

      <button onClick={toggle} aria-label={playing ? "Pause music" : "Play music"} style={{
        width: "36px", height: "36px", borderRadius: "50%",
        background: playing ? "#b76e79" : "transparent",
        border: playing ? "none" : "1.5px solid #b76e79",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", transition: "all 0.2s", flexShrink: 0,
      }}>
        {playing
          ? <FaPause size={13} color="#fff" />
          : <FaPlay size={13} color="#b76e79" style={{ marginLeft: "2px" }} />}
      </button>

      <button onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"} style={{
        background: "none", border: "none", cursor: "pointer", padding: "4px",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {muted
          ? <FaVolumeMute size={15} color="#c9899a" />
          : <FaVolumeUp size={15} color="#c9899a" />}
      </button>

      {playing && (
        <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
          {[1,2,3,4].map(i => (
            <div key={i} style={{
              width: "2px", background: "#b76e79", borderRadius: "2px",
              animation: `audioBar 0.8s ease-in-out ${i * 0.15}s infinite alternate`,
            }} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────
function useCountdown(target) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = new Date(target).getTime() - new Date().getTime();
      if (diff <= 0) { setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
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

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("revealed"); }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ─── Floating Petals ──────────────────────────────────────────────────────────
function Petals() {
  const items = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    left: `${5 + ((i * 37 + 13) % 90)}%`,
    delay: `${(i * 1.3) % 12}s`,
    duration: `${11 + (i % 5) * 1.8}s`,
    size: 7 + (i % 4) * 3,
    opacity: 0.18 + (i % 3) * 0.07,
    rotate: (i * 47) % 360,
  }));
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {items.map(({ id, left, delay, duration, size, opacity, rotate }) => (
        <svg key={id} className="petal absolute" style={{ left, top: "-20px", width: size, height: size, animationDelay: delay, animationDuration: duration, opacity }} viewBox="0 0 24 28" fill="none">
          <ellipse cx="12" cy="10" rx="6" ry="10" fill="#d4868f" transform={`rotate(${rotate} 12 14)`} />
          <ellipse cx="12" cy="10" rx="3" ry="6" fill="#f5dce0" opacity="0.5" transform={`rotate(${rotate} 12 14)`} />
        </svg>
      ))}
    </div>
  );
}

// ─── Ornament Divider ─────────────────────────────────────────────────────────
function OrnamentDivider() {
  return (
    <div className="flex items-center justify-center my-8">
      <svg width="280" height="18" viewBox="0 0 280 18" fill="none">
        <defs>
          <linearGradient id="gl2" x1="0" x2="1"><stop offset="0%" stopColor="#b76e79" stopOpacity="0" /><stop offset="100%" stopColor="#b76e79" stopOpacity="1" /></linearGradient>
          <linearGradient id="gr2" x1="0" x2="1"><stop offset="0%" stopColor="#b76e79" stopOpacity="1" /><stop offset="100%" stopColor="#b76e79" stopOpacity="0" /></linearGradient>
        </defs>
        <line x1="0" y1="9" x2="108" y2="9" stroke="url(#gl2)" strokeWidth="1" />
        <circle cx="122" cy="9" r="2" fill="#f5c6cb" />
        <circle cx="140" cy="9" r="3.5" fill="#b76e79" />
        <circle cx="158" cy="9" r="2" fill="#f5c6cb" />
        <path d="M134 4 L137 8 L134 9.5 L131 8Z" fill="#b76e79" opacity="0.6" />
        <path d="M146 4 L149 8 L146 9.5 L143 8Z" fill="#b76e79" opacity="0.6" />
        <path d="M134 14 L137 10 L134 8.5 L131 10Z" fill="#b76e79" opacity="0.6" />
        <path d="M146 14 L149 10 L146 8.5 L143 10Z" fill="#b76e79" opacity="0.6" />
        <line x1="172" y1="9" x2="280" y2="9" stroke="url(#gr2)" strokeWidth="1" />
      </svg>
    </div>
  );
}

// ─── Calendar Component ───────────────────────────────────────────────────────
function AugustCalendar() {
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  // August 2026 starts on Saturday (6)
  const startDay = 6;
  const totalDays = 31;
  const weddingDay = 6;
  const cells = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= totalDays; d++) cells.push(d);

  return (
    <div style={{
      background: "rgba(255,255,255,0.85)",
      backdropFilter: "blur(14px)",
      borderRadius: "24px",
      border: "1px solid rgba(183,110,121,0.25)",
      padding: "28px 24px",
      maxWidth: "340px",
      margin: "0 auto",
      boxShadow: "0 8px 40px rgba(183,110,121,0.1)",
    }}>
      <div style={{ textAlign: "center", marginBottom: "18px" }}>
        <p style={{ fontFamily: "'Lato',sans-serif", fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#b76e79", marginBottom: "4px" }}>
          Mark Your Calendar
        </p>
        <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.6rem", color: "#6b2d3e", fontWeight: 300, margin: 0 }}>
          August 2026
        </h3>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: "4px", textAlign: "center", marginBottom: "8px" }}>
        {days.map(d => (
          <div key={d} style={{ fontFamily: "'Lato',sans-serif", fontSize: "10px", letterSpacing: "0.08em", color: "#b76e79", fontWeight: 600, padding: "4px 0" }}>
            {d}
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: "4px", textAlign: "center" }}>
        {cells.map((d, i) => {
          const isWedding = d === weddingDay;
          return (
            <div key={i} style={{
              padding: "6px 2px",
              borderRadius: isWedding ? "50%" : "6px",
              background: isWedding ? "#b76e79" : "transparent",
              color: isWedding ? "#fff" : d ? "#5a2d38" : "transparent",
              fontFamily: "'Lato',sans-serif",
              fontSize: "13px",
              fontWeight: isWedding ? 600 : 400,
              position: "relative",
              cursor: isWedding ? "default" : "auto",
              boxShadow: isWedding ? "0 4px 14px rgba(183,110,121,0.45)" : "none",
            }}>
              {d || ""}
              {isWedding && (
                <div style={{
                  position: "absolute",
                  bottom: "-18px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: "8px",
                  color: "#b76e79",
                  letterSpacing: "0.05em",
                  whiteSpace: "nowrap",
                  fontFamily: "'Lato',sans-serif",
                }}>
                  💍
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: "28px", textAlign: "center", borderTop: "1px solid rgba(183,110,121,0.15)", paddingTop: "16px" }}>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontSize: "1rem", color: "#b76e79", margin: 0 }}>
          Thursday, 6th August 2026
        </p>
        <p style={{ fontFamily: "'Lato',sans-serif", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#c9899a", marginTop: "4px" }}>
          9:00 AM · Hotel Golden Ray, Dambulla
        </p>
      </div>
    </div>
  );
}

// ─── Schedule Icons ───────────────────────────────────────────────────────────
function ScheduleIcon({ type }) {
  const props = { viewBox: "0 0 24 24", fill: "none", stroke: "#b76e79", strokeWidth: "1.5", width: 20, height: 20 };
  const icons = {
    sun: <svg {...props}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" strokeLinecap="round" /></svg>,
    leaf: <svg {...props}><path d="M17 8C8 10 5.9 16.17 3.82 19.34a1 1 0 0 0 1.38 1.38C7.56 18.69 13.83 16.6 16 8" strokeLinecap="round" /><path d="M3 3l18 18" strokeLinecap="round" /></svg>,
    candle: <svg {...props}><path d="M9 21h6M9 9h6v12H9zM12 9V3" /><path d="M10 5c0-1 1-2 2-2s2 1 2 2" strokeLinecap="round" /></svg>,
    door: <svg {...props}><path d="M3 21h18M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" /><circle cx="15" cy="13" r="1" fill="#b76e79" stroke="none" /></svg>,
    plate: <svg {...props}><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM8 12h8M12 8v8" strokeLinecap="round" /></svg>,
    cake: <svg {...props}><path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2 1 2 1M2 21h20M7 8v2M12 8v2M17 8v2" strokeLinecap="round" /></svg>,
  };
  return icons[type] ?? icons.sun;
}

// ─── RSVP Form ────────────────────────────────────────────────────────────────
function RSVPForm() {
  const [form, setForm] = useState({ name: "", email: "", guests: "1", attending: "yes", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };
  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.id || e.target.name]: e.target.value }));

  if (submitted) {
    return (
      <div style={{ textAlign: "center", padding: "56px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
          <circle cx="36" cy="36" r="34" stroke="#b76e79" strokeWidth="1.5" />
          <circle cx="36" cy="36" r="26" stroke="#f5c6cb" strokeWidth="1" />
          <path d="M22 36 L31 45 L50 26" stroke="#b76e79" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h3 style={{ fontFamily: "'Cormorant Garamond',serif", color: "#b76e79", fontSize: "1.6rem", margin: 0 }}>Ayubowan!</h3>
        <p style={{ fontFamily: "'Lato',sans-serif", color: "#8b4f62", fontSize: "0.9rem", lineHeight: 1.7, margin: 0 }}>
          Thank you, {form.name}.<br />We look forward to celebrating with you.
        </p>
      </div>
    );
  }

  const inputStyle = {
    width: "100%", borderRadius: "12px", padding: "12px 16px", fontSize: "14px",
    background: "rgba(255,255,255,0.8)", border: "1px solid #f5c6cb", color: "#6b2d3e",
    outline: "none", fontFamily: "'Lato',sans-serif", boxSizing: "border-box",
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "480px", margin: "0 auto" }}>
      {[{ id: "name", label: "Full Name", type: "text", placeholder: "Your name" }, { id: "email", label: "Email Address", type: "email", placeholder: "you@example.com" }].map(({ id, label, type, placeholder }) => (
        <div key={id} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase", fontWeight: 600, color: "#b76e79", fontFamily: "'Lato',sans-serif" }}>{label}</label>
          <input id={id} type={type} required value={form[id]} onChange={handleChange} placeholder={placeholder} style={inputStyle} />
        </div>
      ))}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        {[{ name: "attending", label: "Attending?", options: [{ value: "yes", label: "Joyfully Accept" }, { value: "no", label: "Regretfully Decline" }] }, { name: "guests", label: "No. of Guests", options: [1,2,3,4].map(n => ({ value: String(n), label: String(n) })) }].map(({ name, label, options }) => (
          <div key={name} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase", fontWeight: 600, color: "#b76e79", fontFamily: "'Lato',sans-serif" }}>{label}</label>
            <select name={name} value={form[name]} onChange={handleChange} style={inputStyle}>
              {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <label style={{ fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase", fontWeight: 600, color: "#b76e79", fontFamily: "'Lato',sans-serif" }}>Message to the Couple</label>
        <textarea name="message" rows={3} value={form.message} onChange={handleChange} placeholder="Share your wishes..." style={{ ...inputStyle, resize: "none" }} />
      </div>

      <button type="submit" style={{
        background: "linear-gradient(135deg, #b76e79, #9a4f5e)", color: "#fff",
        border: "none", borderRadius: "12px", padding: "16px", fontSize: "11px",
        letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 600,
        fontFamily: "'Lato',sans-serif", cursor: "pointer", transition: "opacity 0.2s",
      }}>
        Confirm Attendance
      </button>
    </form>
  );
}

// ─── Map Embed ────────────────────────────────────────────────────────────────
function MapEmbed() {
  return (
    <div style={{ borderRadius: "24px", overflow: "hidden", border: "3px solid rgba(255,255,255,0.9)", boxShadow: "0 12px 40px rgba(183,110,121,0.15)" }}>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.1677878710634!2d80.64148437500593!3d7.877506092144833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afca538e953f979%3A0xdb117c22883cffd9!2sHotel%20Golden%20Ray%20-%20Dambulla!5e0!3m2!1sen!2slk!4v1778488876984!5m2!1sen!2slk"
        width="600" height="420" style={{ border: 0, width: "100%", display: "block" }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
    </div>
  );
}

// ─── Nav Dots ─────────────────────────────────────────────────────────────────
function NavDots({ sections, active }) {
  return (
    <nav style={{ position: "fixed", right: "10px", top: "50%", transform: "translateY(-50%)", zIndex: 50, display: "flex", flexDirection: "column", gap: "10px" }}>
      {sections.map(({ id, label }) => (
        <a key={id} href={`#${id}`} title={label} style={{
          display: "block", width: "2px", height: "32px", borderRadius: "2px",
          background: active === id ? "#b76e79" : "rgba(183,110,121,0.25)",
          transition: "all 0.3s", transform: active === id ? "scaleY(1.25)" : "scaleY(1)",
        }} />
      ))}
    </nav>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
function Section({ id, children, style = {} }) {
  return <section id={id} style={{ position: "relative", zIndex: 10, ...style }}>{children}</section>;
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function WeddingPage() {
  const WEDDING_DATE = "2026-08-06T09:00:00";
  const countdown = useCountdown(WEDDING_DATE);
  useScrollReveal();

  const navSections = [
    { id: "hero", label: "Home" },
    { id: "story", label: "Our Story" },
    { id: "schedule", label: "Schedule" },
    { id: "calendar", label: "Calendar" },
    { id: "countdown", label: "Countdown" },
    { id: "venue", label: "Venue" },
    { id: "rsvp", label: "RSVP" },
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
    { time: "6:00 AM", title: "Nekath — Auspicious Moment", icon: "sun", desc: "The sacred hour begins. Dulaj and Jayanithya exchange garlands under the guidance of the astrologer's chosen nekath, witnessed by elders and family." },
    { time: "7:00 AM", title: "Poruwa Ceremony", icon: "leaf", desc: "The couple ascends the Poruwa, the traditional decorated platform, for the Sinhalese wedding ritual. Blessings are chanted and betel leaves exchanged." },
    { time: "8:30 AM", title: "Pirith and Blessings", icon: "candle", desc: "Buddhist monks chant Pirith, protective verses, to bless the union. Family members tie the magul daama (auspicious thread) around the couple's wrists." },
    { time: "10:00 AM", title: "Reception Doors Open", icon: "door", desc: "Guests are warmly welcomed into the beautifully decorated reception hall with traditional Sri Lankan hospitality and floral arrangements." },
    { time: "12:00 PM", title: "Wedding Lunch", icon: "plate", desc: "A grand Sri Lankan feast featuring rice and curry, kiribath, and traditional sweets, enjoyed together as one family." },
    { time: "3:00 PM", title: "Cake Cutting and Celebrations", icon: "cake", desc: "The couple cuts the wedding cake and the afternoon fills with music, dancing, and cherished moments with loved ones." },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Marcellus&family=Lato:wght@300;400;600&family=Allura&display=swap');
        :root {
          --rg-100: #fdf0f2;
          --rg-200: #f5d0d6;
          --rg-300: #e8a8b4;
          --rg-400: #c9899a;
          --rg-500: #b76e79;
          --rg-600: #9a4f5e;
          --rg-700: #7d3347;
          --rg-800: #6b2d3e;
          --rg-900: #5a2030;
        }
        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: #fdf8f8; font-family: 'Lato', sans-serif; }

        @keyframes petalFall {
          0%   { transform: translateY(-40px) rotate(0deg); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.4; }
          100% { transform: translateY(110vh) rotate(540deg); opacity: 0; }
        }
        .petal { animation: petalFall linear infinite; }

        [data-reveal] { opacity: 0; transform: translateY(24px); transition: opacity 0.85s ease, transform 0.85s ease; }
        [data-reveal].revealed { opacity: 1; transform: translateY(0); }
        [data-reveal][data-delay="1"] { transition-delay: 0.1s; }
        [data-reveal][data-delay="2"] { transition-delay: 0.22s; }
        [data-reveal][data-delay="3"] { transition-delay: 0.36s; }
        [data-reveal][data-delay="4"] { transition-delay: 0.5s; }
        [data-reveal][data-delay="5"] { transition-delay: 0.65s; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .a1{animation:fadeUp 1.1s ease 0.1s both} .a2{animation:fadeUp 1.1s ease 0.3s both}
        .a3{animation:fadeUp 1.1s ease 0.5s both} .a4{animation:fadeUp 1.1s ease 0.7s both}
        .a5{animation:fadeUp 1.1s ease 0.9s both} .a6{animation:fadeUp 1.1s ease 1.1s both}

        @keyframes softPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(183,110,121,0.28); }
          50%      { box-shadow: 0 0 0 9px rgba(183,110,121,0); }
        }
        .cd-card { animation: softPulse 3s ease infinite; }

        .gb-card { position: relative; background: rgba(255,255,255,0.8); backdrop-filter: blur(14px); }
        .gb-card::before {
          content: ''; position: absolute; inset: 0; border-radius: inherit; padding: 1.5px;
          background: linear-gradient(135deg, #e8a8b4, #f5d0d6, #e8a8b4);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude; pointer-events: none;
        }

        .tl-item { position: relative; padding-left: 2.5rem; }
        .tl-item::before {
          content: ''; position: absolute; left: 1.35rem; top: 3.2rem; bottom: -1rem;
          width: 1.5px; background: linear-gradient(to bottom, var(--rg-300), var(--rg-200), transparent);
        }
        .tl-item:last-child::before { display: none; }

        .diamond-bg {
          background-image: url("data:image/svg+xml,%3Csvg width='44' height='44' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M22 2L42 22L22 42L2 22Z' fill='none' stroke='%23e8a8b4' stroke-width='0.5' opacity='0.2'/%3E%3C/svg%3E");
          background-size: 44px 44px;
        }

        @keyframes cue { 0%,100%{transform:translateY(0)} 50%{transform:translateY(7px)} }
        .scroll-cue { animation: cue 2.2s ease infinite; }
        @keyframes audioBar {
          from { height: 4px; }
          to   { height: 16px; }
        }

        .hero-name { font-family:'Allura',serif; font-weight:100; font-size:clamp(3rem,9.5vw,6rem); line-height:1; color:var(--rg-600); }
        .hero-amp  { font-family:'Allura',serif; font-style:italic; font-size:clamp(1.5rem,4vw,2.8rem); color:var(--rg-500); }

        @keyframes calPulse {
          0%,100% { transform: scale(1); box-shadow: 0 4px 14px rgba(183,110,121,0.45); }
          50%      { transform: scale(1.06); box-shadow: 0 6px 22px rgba(183,110,121,0.65); }
        }
        .wedding-day { animation: calPulse 2.5s ease infinite; }
      `}</style>

      <Petals />
      <NavDots sections={navSections} active={activeSection} />

      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <Section id="hero" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 24px", background: "linear-gradient(155deg,#fffbfb 0%,#fdf0f2 55%,#fff5f5 100%)" }} className="diamond-bg">
        <div style={{ position: "relative", zIndex: 10, maxWidth: "720px", margin: "0 auto" }}>

          <p className="a1" style={{ fontFamily: "'Lato',sans-serif", fontSize: "11px", letterSpacing: "0.5em", textTransform: "uppercase", color: "#b76e79", marginBottom: "8px" }}>
            We're Getting Married
          </p>

          <h1 className="a2 hero-name" style={{ paddingTop: "32px" }}>Dulaj</h1>

          <div className="a3" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "20px", padding: "8px 0" }}>
            <div style={{ height: "1px", width: "80px", background: "linear-gradient(to right,transparent,#e8a8b4)" }} />
            <span className="hero-amp">&amp;</span>
            <div style={{ height: "1px", width: "80px", background: "linear-gradient(to left,transparent,#e8a8b4)" }} />
          </div>

          <h1 className="a4 hero-name">Jayanithya</h1>

          <div className="a5" style={{ marginTop: "20px" }}>
            <p style={{ fontFamily: "'Marcellus',serif", color: "#8b4f5a", fontSize: "1rem", letterSpacing: "0.18em" }}>
              06 &middot; August &middot; 2026
            </p>
            <p style={{ fontFamily: "'Lato',sans-serif", fontSize: "10px", letterSpacing: "0.35em", textTransform: "uppercase", color: "#b76e79", marginTop: "6px" }}>
              Hotel Golden Ray, Dambulla
            </p>
          </div>

          {/* Audio Player */}
          <div className="a6" style={{ marginTop: "36px" }}>
            <AudioPlayer />
          </div>

          <div className="scroll-cue" style={{ marginTop: "40px", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", opacity: 0.35 }}>
            <span style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.3em", color: "#d4868f", fontFamily: "'Cormorant Garamond',serif" }}>Scroll</span>
            <div style={{ width: "1px", height: "28px", background: "linear-gradient(to bottom,transparent,#d4868f)" }} />
            <svg width="14" height="8" viewBox="0 0 14 8" fill="none"><path d="M1 1L7 7L13 1" stroke="#d4868f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
        </div>
      </Section>

      {/* ══ OUR STORY ═════════════════════════════════════════════════════ */}
      <Section id="story" style={{ padding: "96px 24px", background: "#fffbfb" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
          <p data-reveal style={{ fontFamily: "'Lato',sans-serif", fontSize: "10px", letterSpacing: "0.5em", textTransform: "uppercase", color: "#b76e79", marginBottom: "8px" }}>Our Story</p>
          <h2 data-reveal data-delay="1" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 300, color: "#6b2d3e", margin: 0 }}>Two Hearts, One Journey</h2>
          <OrnamentDivider />
          <p data-reveal data-delay="2" style={{ fontFamily: "'Lato',sans-serif", color: "#8b4f62", lineHeight: 1.9, fontSize: "15px", marginBottom: "40px" }}>
            In the warmth of a Sri Lankan sunrise, two souls found each other. Dulaj and Jayanithya's love story blossomed amidst the fragrance of jasmine and temple flowers — a bond blessed by family, faith, and the timeless traditions of our beautiful island. Together, they walk forward into a life adorned with love, laughter, and the grace of a thousand blessings.
          </p>

          {/* Lotus monogram */}
          <div data-reveal data-delay="3" style={{ margin: "0 auto 32px", width: "148px", height: "148px" }}>
            <svg viewBox="0 0 148 148" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="74" cy="74" r="70" stroke="#e8a8b4" strokeWidth="0.8" opacity="0.35" />
              <circle cx="74" cy="74" r="58" stroke="#f5d0d6" strokeWidth="0.8" opacity="0.4" />
              {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg, i) => (
                <ellipse key={deg} cx="74" cy="74" rx="4.5" ry="16" fill={i % 2 === 0 ? "#f5d0d6" : "#f5e6e8"} opacity="0.55" transform={`rotate(${deg} 74 74) translate(0 -40)`} />
              ))}
              <circle cx="74" cy="74" r="22" fill="#fffbfb" stroke="#b76e79" strokeWidth="1.5" />
              <circle cx="74" cy="74" r="15" fill="#fdf0f2" />
              <text x="74" y="71" textAnchor="middle" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "9.5px", fill: "#9a4f5e", fontStyle: "italic" }}>D &amp; J</text>
              <text x="74" y="82" textAnchor="middle" style={{ fontFamily: "'Lato',sans-serif", fontSize: "5.5px", fill: "#b76e79", letterSpacing: "1.5px" }}>2026</text>
            </svg>
          </div>

          <p data-reveal data-delay="4" style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontSize: "1.2rem", color: "#b76e79" }}>
            &ldquo;Where there is love, there is life.&rdquo;
          </p>
        </div>
      </Section>

      {/* ══ SCHEDULE ══════════════════════════════════════════════════════ */}
      <Section id="schedule" style={{ padding: "96px 24px", background: "linear-gradient(160deg,#fff5f7 0%,#fffbfb 100%)" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <p data-reveal style={{ fontFamily: "'Lato',sans-serif", fontSize: "10px", letterSpacing: "0.5em", textTransform: "uppercase", color: "#b76e79", marginBottom: "8px" }}>The Ceremony</p>
            <h2 data-reveal data-delay="1" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 300, color: "#6b2d3e", margin: 0 }}>Wedding Day Schedule</h2>
            <OrnamentDivider />
          </div>

          {schedule.map((item, i) => (
            <div key={i} data-reveal data-delay={String((i % 5) + 1)} className="tl-item" style={{ marginBottom: "40px" }}>
              <div style={{ display: "flex", gap: "20px" }}>
                <div style={{ flexShrink: 0, width: "48px", height: "48px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#fdf0f2,#f5d0d6)", border: "1.5px solid #e8a8b4" }}>
                  <ScheduleIcon type={item.icon} />
                </div>
                <div style={{ paddingBottom: "24px", flex: 1, borderBottom: "1px solid #f5d0d6" }}>
                  <p style={{ fontFamily: "'Lato',sans-serif", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#b76e79", marginBottom: "4px" }}>{item.time}</p>
                  <h3 style={{ fontFamily: "'Marcellus',serif", fontSize: "1.05rem", color: "#6b2d3e", marginBottom: "8px", marginTop: 0 }}>{item.title}</h3>
                  <p style={{ fontFamily: "'Lato',sans-serif", fontSize: "13.5px", color: "#8b4f62", lineHeight: 1.75, margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ══ CALENDAR ══════════════════════════════════════════════════════ */}
      <Section id="calendar" style={{ padding: "96px 24px", background: "#fffbfb" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
          <p data-reveal style={{ fontFamily: "'Lato',sans-serif", fontSize: "10px", letterSpacing: "0.5em", textTransform: "uppercase", color: "#b76e79", marginBottom: "8px" }}>Save the Date</p>
          <h2 data-reveal data-delay="1" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 300, color: "#6b2d3e", margin: 0 }}>Mark Your Calendar</h2>
          <OrnamentDivider />
          <div data-reveal data-delay="2">
            <AugustCalendar />
          </div>

          {/* Decorative polaroid-style caption cards */}
          <div data-reveal data-delay="3" style={{ display: "flex", gap: "20px", justifyContent: "center", marginTop: "40px", flexWrap: "wrap" }}>
            {[{ label: "Venue", value: "Hotel Golden Ray" }, { label: "City", value: "Dambulla, Sri Lanka" }, { label: "Time", value: "9:00 AM onwards" }].map(({ label, value }) => (
              <div key={label} style={{ background: "#fff", padding: "16px 24px", borderRadius: "16px", border: "1px solid #f5d0d6", boxShadow: "0 4px 16px rgba(183,110,121,0.08)" }}>
                <p style={{ fontFamily: "'Lato',sans-serif", fontSize: "9px", letterSpacing: "0.35em", textTransform: "uppercase", color: "#c9899a", margin: "0 0 4px" }}>{label}</p>
                <p style={{ fontFamily: "'Marcellus',serif", fontSize: "14px", color: "#6b2d3e", margin: 0 }}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ══ COUNTDOWN ═════════════════════════════════════════════════════ */}
      <Section id="countdown" className="diamond-bg" style={{ padding: "112px 24px", background: "linear-gradient(135deg,#6b2d3e 0%,#8b4f62 45%,#9a4f5e 100%)", overflow: "hidden" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 10 }}>
          <p data-reveal style={{ fontFamily: "'Lato',sans-serif", fontSize: "10px", letterSpacing: "0.5em", textTransform: "uppercase", color: "#e8a8b4", marginBottom: "12px" }}>Counting Down to Forever</p>
          <h2 data-reveal data-delay="1" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 300, color: "#fff", marginBottom: "48px" }}>The Big Day</h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "12px", maxWidth: "460px", margin: "0 auto" }}>
            {[{ val: countdown.days, label: "Days" }, { val: countdown.hours, label: "Hours" }, { val: countdown.minutes, label: "Minutes" }, { val: countdown.seconds, label: "Seconds" }].map(({ val, label }, i) => (
              <div key={i} data-reveal data-delay={String(i + 1)} className="cd-card" style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(10px)", borderRadius: "16px", padding: "24px 8px", textAlign: "center", border: "1px solid rgba(255,255,255,0.12)" }}>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,6vw,3.5rem)", fontWeight: 300, color: "#fff", lineHeight: 1, marginBottom: "8px" }}>
                  {String(val).padStart(2, "0")}
                </div>
                <div style={{ fontFamily: "'Lato',sans-serif", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#e8a8b4" }}>{label}</div>
              </div>
            ))}
          </div>

          <p data-reveal data-delay="5" style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontSize: "1.1rem", color: "rgba(245,208,214,0.85)", marginTop: "48px" }}>
            06 August 2026<br />9:00 AM<br />Hotel Golden Ray, Dambulla
          </p>
        </div>
      </Section>

      {/* ══ VENUE ═════════════════════════════════════════════════════════ */}
      <Section id="venue" style={{ padding: "96px 24px", background: "#fffbfb" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p data-reveal style={{ fontFamily: "'Lato',sans-serif", fontSize: "10px", letterSpacing: "0.5em", textTransform: "uppercase", color: "#b76e79", marginBottom: "8px" }}>Venue</p>
            <h2 data-reveal data-delay="1" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 300, color: "#6b2d3e", margin: 0 }}>Where We Celebrate</h2>
            <OrnamentDivider />
          </div>

          <div data-reveal data-delay="2" style={{ textAlign: "center", marginBottom: "32px" }}>
            <h3 style={{ fontFamily: "'Marcellus',serif", fontSize: "1.35rem", color: "#6b2d3e", marginBottom: "6px", marginTop: 0 }}>Hotel Golden Ray</h3>
            <p style={{ fontFamily: "'Lato',sans-serif", fontSize: "13px", letterSpacing: "0.1em", color: "#8b4f62" }}>Dambulla, Sri Lanka</p>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px", marginTop: "20px" }}>
              {[{ label: "9:00 AM — 4:30 PM", path: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2" }, { label: "Dambulla", path: "M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0zM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" }, { label: "+94 76 832 3678", path: "M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.08 4.18 2 2 0 0 1 5.07 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L9.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" }].map(({ label, path }) => (
                <span key={label} style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 16px", borderRadius: "100px", fontFamily: "'Lato',sans-serif", fontSize: "11px", letterSpacing: "0.05em", background: "#fdf0f2", color: "#9a4f5e", border: "1px solid #f5d0d6" }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={path} strokeLinecap="round" strokeLinejoin="round" /></svg>
                  {label}
                </span>
              ))}
            </div>

            <div style={{ marginTop: "24px" }}>
              <a href="https://maps.google.com/?q=Hotel+Golden+Ray+Dambulla" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "12px 28px", borderRadius: "100px", fontSize: "10px", fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: "#fff", background: "linear-gradient(135deg,#b76e79,#9a4f5e)", textDecoration: "none", fontFamily: "'Lato',sans-serif", transition: "opacity 0.2s" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" strokeLinecap="round" /><circle cx="12" cy="10" r="3" /></svg>
                Get Directions
              </a>
            </div>
          </div>

          <div data-reveal data-delay="3"><MapEmbed /></div>
        </div>
      </Section>

      {/* ══ RSVP ══════════════════════════════════════════════════════════ */}
      <Section id="rsvp" style={{ padding: "96px 24px", background: "linear-gradient(160deg,#fff5f7 0%,#fffbfb 100%)" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p data-reveal style={{ fontFamily: "'Lato',sans-serif", fontSize: "10px", letterSpacing: "0.5em", textTransform: "uppercase", color: "#b76e79", marginBottom: "8px" }}>Kindly Reply</p>
            <h2 data-reveal data-delay="1" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 300, color: "#6b2d3e", margin: 0 }}>RSVP</h2>
            <p data-reveal data-delay="2" style={{ fontFamily: "'Lato',sans-serif", fontSize: "13px", color: "#8b4f62", marginTop: "12px" }}>
              Please reply by <span style={{ fontWeight: 600, color: "#b76e79" }}>01st June 2026</span>
            </p>
            <OrnamentDivider />
          </div>
          <div data-reveal data-delay="3" className="gb-card" style={{ borderRadius: "28px", padding: "40px", boxShadow: "0 20px 60px rgba(183,110,121,0.12)" }}>
            <RSVPForm />
          </div>
        </div>
      </Section>

      {/* ══ FOOTER ════════════════════════════════════════════════════════ */}
      <footer style={{ padding: "56px 24px", textAlign: "center", background: "#6b2d3e" }}>
        <svg className="mx-auto mb-6" width="200" height="16" viewBox="0 0 200 16" fill="none" opacity="0.4" style={{ display: "block", margin: "0 auto 24px" }}>
          <defs>
            <linearGradient id="fl2" x1="0" x2="1"><stop offset="0%" stopColor="#e8a8b4" stopOpacity="0" /><stop offset="100%" stopColor="#e8a8b4" stopOpacity="1" /></linearGradient>
            <linearGradient id="fr2" x1="0" x2="1"><stop offset="0%" stopColor="#e8a8b4" stopOpacity="1" /><stop offset="100%" stopColor="#e8a8b4" stopOpacity="0" /></linearGradient>
          </defs>
          <line x1="0" y1="8" x2="78" y2="8" stroke="url(#fl2)" strokeWidth="1" />
          <circle cx="90" cy="8" r="2" fill="#f5d0d6" />
          <circle cx="100" cy="8" r="3" fill="#e8a8b4" />
          <circle cx="110" cy="8" r="2" fill="#f5d0d6" />
          <line x1="122" y1="8" x2="200" y2="8" stroke="url(#fr2)" strokeWidth="1" />
        </svg>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontSize: "1.5rem", color: "rgba(245,208,214,0.9)", margin: "0 0 8px" }}>Dulaj &amp; Jayanithya</p>
        <p style={{ fontFamily: "'Lato',sans-serif", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(245,180,190,0.4)", margin: "0 0 20px" }}>06 August 2026 &middot; Hotel Golden Ray, Dambulla</p>
        <p style={{ fontFamily: "'Lato',sans-serif", fontSize: "11px", color: "rgba(245,180,190,0.25)", margin: 0 }}>Crafted with love</p>
      </footer>
    </>
  );
}