"use client";

import { useState, useEffect, useRef } from "react";
import {
  FaBirthdayCake,
  FaDoorOpen,
  FaHeart,
  FaLeaf,
  FaRegLightbulb,
  FaSun,
  FaUtensils,
} from "react-icons/fa";
import type React from "react";
import { MdDirections } from "react-icons/md";

// ─── Audio Player ─────────────────────────────────────────────────────────────
function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
  const audio = audioRef.current;

  if (!audio) return;

  audio.loop = true;
  audio.volume = 0.45;

  const handleTimeUpdate = () => {
    if (audio.duration) {
      setProgress((audio.currentTime / audio.duration) * 100);
    }
  };

  audio.addEventListener("timeupdate", handleTimeUpdate);

  return () => {
    audio.removeEventListener("timeupdate", handleTimeUpdate);
  };
}, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => {});
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
  };

  const skipBack = () => {
    const a = audioRef.current;
    if (a) a.currentTime = Math.max(0, a.currentTime - 10);
  };
  const skipForward = () => {
    const a = audioRef.current;
    if (a) a.currentTime = Math.min(a.duration || 0, a.currentTime + 10);
  };
  const prevTrack = () => {
    const a = audioRef.current;
    if (a) a.currentTime = 0;
  };
  const nextTrack = () => {
    const a = audioRef.current;
    if (a) {
      a.currentTime = 0;
      a.pause();
      setPlaying(false);
    }
  };
  const toggleMute = () => {
    const a = audioRef.current;
    if (!a) return;
    a.muted = !muted;
    setMuted(!muted);
  };

  return (
    <div className="inline-flex flex-col items-center gap-3  backdrop-blur-xl  rounded-3xl pt-16 py-4">
      <audio ref={audioRef} src="/wedding-music.mp3" preload="auto" />

      {/* Label row */}
      <div className="flex items-center gap-2">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#a07c2e"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
        <span className="font-[Lato] text-[10px] tracking-[0.25em] uppercase text-[#a07c2e]">
          {playing ? "Now Playing" : "Forever Begins"}
        </span>
        <button
          onClick={toggleMute}
          aria-label={muted ? "Unmute" : "Mute"}
          className="ml-1 cursor-pointer bg-transparent border-none p-0 flex items-center"
        >
          {muted ? (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#a07c2e"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#a07c2e"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          )}
        </button>
      </div>

      {/* Progress bar */}
      <div
        className="w-full h-[3px] bg-[#f0e4ba] rounded-full cursor-pointer relative"
        onClick={seek}
      >
        <div
          className="h-full bg-[#c9a84c] rounded-full relative transition-all duration-300"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#c9a84c] rounded-full shadow-md" />
        </div>
      </div>

      {/* Transport controls */}
      <div className="flex items-center gap-4">
        {/* Rewind */}
        <button
          onClick={skipBack}
          aria-label="Rewind 10s"
          className="cursor-pointer bg-transparent border-none p-1 flex items-center justify-center hover:opacity-70 transition-opacity"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#c9a84c">
            <polygon points="11,5 1,12 11,19" />
            <polygon points="23,5 13,12 23,19" />
          </svg>
        </button>
        {/* Prev track */}
        <button
          onClick={prevTrack}
          aria-label="Previous"
          className="cursor-pointer bg-transparent border-none p-1 flex items-center justify-center hover:opacity-70 transition-opacity"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#c9a84c">
            <polygon points="19,5 9,12 19,19" />
            <rect x="5" y="5" width="3" height="14" rx="1" />
          </svg>
        </button>
        {/* Play / Pause circle */}
        <button
          onClick={toggle}
          aria-label={playing ? "Pause" : "Play"}
          className="w-11 h-11 rounded-full border-2 border-[#c9a84c] flex items-center justify-center cursor-pointer bg-transparent hover:bg-[#c9a84c] transition-all duration-200 group"
        >
          {playing ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect
                x="6"
                y="4"
                width="4"
                height="16"
                rx="1"
                className="fill-[#c9a84c] group-hover:fill-white transition-colors"
              />
              <rect
                x="14"
                y="4"
                width="4"
                height="16"
                rx="1"
                className="fill-[#c9a84c] group-hover:fill-white transition-colors"
              />
            </svg>
          ) : (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              className="ml-0.5 fill-[#c9a84c] group-hover:fill-white transition-colors"
            >
              <polygon points="5,3 19,12 5,21" />
            </svg>
          )}
        </button>
        {/* Next track */}
        <button
          onClick={nextTrack}
          aria-label="Next"
          className="cursor-pointer bg-transparent border-none p-1 flex items-center justify-center hover:opacity-70 transition-opacity"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#c9a84c">
            <polygon points="5,5 15,12 5,19" />
            <rect x="16" y="5" width="3" height="14" rx="1" />
          </svg>
        </button>
        {/* Fast forward */}
        <button
          onClick={skipForward}
          aria-label="Skip forward"
          className="cursor-pointer bg-transparent border-none p-1 flex items-center justify-center hover:opacity-70 transition-opacity"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#c9a84c">
            <polygon points="1,5 11,12 1,19" />
            <polygon points="13,5 23,12 13,19" />
          </svg>
        </button>
      </div>

      {/* Animated equaliser bars */}
      {playing && (
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-0.5 bg-[#c9a84c] rounded-sm"
              style={{
                animation: `audioBar 0.8s ease-in-out ${i * 0.15}s infinite alternate`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Countdown Hook ───────────────────────────────────────────────────────────
function useCountdown(target: string | Date) {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  useEffect(() => {
    const tick = () => {
      const diff = new Date(target).getTime() - new Date().getTime();
      if (diff <= 0) {
        setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
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
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ─── August Calendar ──────────────────────────────────────────────────────────
function AugustCalendar() {
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const startDay = 6;
  const totalDays = 31;
  const weddingDay = 6;
  const cells: (number | null)[] = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= totalDays; d++) cells.push(d);

  return (
    <div className=" backdrop-blur-xl rounded-3xl  p-7 max-w-sm mx-auto ">
      <div className="text-center mb-5">
        <p className="font-[Lato] text-[10px] tracking-[0.4em] uppercase text-[#c9a84c] mb-1">
          Mark Your Calendar
        </p>
        <h3 className="font-[Cormorant_Garamond] text-2xl text-[#5a3e00] font-light m-0">
          August 2026
        </h3>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {days.map((d) => (
          <div
            key={d}
            className="font-[Lato] text-[10px] tracking-wide text-[#c9a84c] font-semibold py-1"
          >
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {cells.map((d, i) => {
          const isWedding = d === weddingDay;

          return (
            <div
              key={i}
              className={`relative py-1.5 px-0.5 text-[13px] font-[Lato] ${
                d ? "text-[#5a3e00]" : "text-transparent"
              }`}
            >
              {isWedding ? (
                <div className="relative flex items-center justify-center">
                  <FaHeart className="text-[#c9a84c] text-[28px] drop-shadow-md" />

                  <span className="absolute text-[11px] font-semibold text-white">
                    {d}
                  </span>
                </div>
              ) : (
                d || ""
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-7 text-center border-t border-[#c9a84c]/20 pt-4">
        <p className="font-[Cormorant_Garamond] italic text-base text-[#c9a84c] m-0">
          Thursday, 6th August 2026
        </p>
        <p className="font-[Lato] text-[10px] tracking-[0.3em] uppercase text-[#a07c2e] mt-1">
          9:00 AM · Hotel Golden Ray, Dambulla
        </p>
      </div>
    </div>
  );
}

// ─── Schedule Icons ───────────────────────────────────────────────────────────
function ScheduleIcon({ type }: { type: string }) {
  const iconClass = "text-[#c9a84c] text-[18px]";

  const icons: Record<string, React.ReactNode> = {
    sun: <FaSun className={iconClass} />,
    leaf: <FaLeaf className={iconClass} />,
    candle: <FaRegLightbulb className={iconClass} />,
    door: <FaDoorOpen className={iconClass} />,
    plate: <FaUtensils className={iconClass} />,
    cake: <FaBirthdayCake className={iconClass} />,
  };

  return icons[type] ?? <FaSun className={iconClass} />;
}

// ─── RSVP Form ────────────────────────────────────────────────────────────────
function RSVPForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    guests: "1",
    attending: "yes",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) =>
    setForm((prev) => ({
      ...prev,
      [e.target.id || e.target.name]: e.target.value,
    }));

  if (submitted) {
    return (
      <div className="text-center py-14 flex flex-col items-center gap-5">
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
          <circle cx="36" cy="36" r="34" stroke="#c9a84c" strokeWidth="1.5" />
          <circle cx="36" cy="36" r="26" stroke="#e8d5a3" strokeWidth="1" />
          <path
            d="M22 36 L31 45 L50 26"
            stroke="#c9a84c"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h3 className="font-[Cormorant_Garamond] text-[#c9a84c] text-2xl m-0">
          Ayubowan!
        </h3>
        <p className="font-[Lato] text-[#7a5a00] text-sm leading-7 m-0">
          Thank you, {form.name}.<br />
          We look forward to celebrating with you.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl px-4 py-3 text-xs border border-[#e8d5a3] text-[#5a3e00] outline-none font-[Lato] box-border focus:border-[#c9a84c] transition-colors";
  const labelClass =
    "text-[10px] tracking-[0.4em] uppercase font-semibold text-[#c9a84c] font-[Lato]";

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 max-w-lg mx-auto"
    >
      {[
        {
          id: "name",
          label: "Full Name",
          type: "text",
          placeholder: "Your name",
        },
        {
          id: "email",
          label: "Email Address",
          type: "email",
          placeholder: "you@example.com",
        },
      ].map(({ id, label, type, placeholder }) => (
        <div key={id} className="flex flex-col gap-1.5">
          <label className={labelClass}>{label}</label>
          <input
            id={id}
            type={type}
            required
            value={form[id as keyof typeof form]}
            onChange={handleChange}
            placeholder={placeholder}
            className={inputClass}
          />
        </div>
      ))}
      <div className="grid grid-cols-2 gap-4">
        {[
          {
            name: "attending",
            label: "Attending?",
            options: [
              { value: "yes", label: "Joyfully Accept" },
              { value: "no", label: "Regretfully Decline" },
            ],
          },
          {
            name: "guests",
            label: "No. of Guests",
            options: [1, 2, 3, 4].map((n) => ({
              value: String(n),
              label: String(n),
            })),
          },
        ].map(({ name, label, options }) => (
          <div key={name} className="flex flex-col gap-1.5">
            <label className={labelClass}>{label}</label>
            <select
              name={name}
              value={form[name as keyof typeof form]}
              onChange={handleChange}
              className={inputClass}
            >
              {options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-1.5">
        <label className={labelClass}>Message to the Couple</label>
        <textarea
          name="message"
          rows={3}
          value={form.message}
          onChange={handleChange}
          placeholder="Share your wishes..."
          className={`${inputClass} resize-none`}
        />
      </div>
      <button
        type="submit"
        className="bg-[rgba(58,38,0,0.90)] text-white border-none rounded-xl py-4 text-[11px] tracking-[0.25em] uppercase font-semibold font-[Lato] cursor-pointer hover:opacity-90 transition-opacity"
      >
        Confirm Attendance
      </button>
    </form>
  );
}

// ─── Map Embed ────────────────────────────────────────────────────────────────
function MapEmbed() {
  return (
    <div className="overflow-hidden border-2 border-[rgba(58,38,0,0.90)] shadow-2xl shadow-[#c9a84c]/20">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.1677878710634!2d80.64148437500593!3d7.877506092144833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afca538e953f979%3A0xdb117c22883cffd9!2sHotel%20Golden%20Ray%20-%20Dambulla!5e0!3m2!1sen!2slk!4v1778488876984!5m2!1sen!2slk"
        width="600"
        height="420"
        className="border-0 w-full block"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

// ─── Nav Dots ─────────────────────────────────────────────────────────────────
function NavDots({
  sections,
  active,
}: {
  sections: { id: string; label: string }[];
  active: string;
}) {
  return (
    <nav className="fixed right-2.5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2.5">
      {sections.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          title={label}
          className="block rounded-sm transition-all duration-300"
          style={{
            width: "2px",
            height: active === id ? "40px" : "32px",
            background: active === id ? "#c9a84c" : "rgba(201,168,76,0.3)",
          }}
        />
      ))}
    </nav>
  );
}

// ─── Section Wrapper ──────────────────────────────────────────────────────────
function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative z-10 ${className}`}>
      {children}
    </section>
  );
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
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        }),
      { threshold: 0.4 },
    );
    navSections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const schedule = [
    {
      time: "6:00 AM",
      title: "Nekath — Auspicious Moment",
      icon: "sun",
      desc: "The sacred hour begins. Dulaj and Jayanithya exchange garlands under the guidance of the astrologer's chosen nekath, witnessed by elders and family.",
    },
    {
      time: "7:00 AM",
      title: "Poruwa Ceremony",
      icon: "leaf",
      desc: "The couple ascends the Poruwa, the traditional decorated platform, for the Sinhalese wedding ritual. Blessings are chanted and betel leaves exchanged.",
    },
    {
      time: "8:30 AM",
      title: "Pirith and Blessings",
      icon: "candle",
      desc: "Buddhist monks chant Pirith, protective verses, to bless the union. Family members tie the magul daama (auspicious thread) around the couple's wrists.",
    },
    {
      time: "10:00 AM",
      title: "Reception Doors Open",
      icon: "door",
      desc: "Guests are warmly welcomed into the beautifully decorated reception hall with traditional Sri Lankan hospitality and floral arrangements.",
    },
    {
      time: "12:00 PM",
      title: "Wedding Lunch",
      icon: "plate",
      desc: "A grand Sri Lankan feast featuring rice and curry, kiribath, and traditional sweets, enjoyed together as one family.",
    },
    {
      time: "3:00 PM",
      title: "Cake Cutting and Celebrations",
      icon: "cake",
      desc: "The couple cuts the wedding cake and the afternoon fills with music, dancing, and cherished moments with loved ones.",
    },
  ];

  return (
    <>
      {/* ══ GLOBAL STYLES ═════════════════════════════════════════════════ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Marcellus&family=Lato:wght@300;400;600&family=Allura&display=swap');

        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; }

        /* ── Marble site-wide background ── */
        body {
          margin: 0;
          font-family: 'Lato', sans-serif;
          background-color: #fdfbf7;
          background-image: url('/images/hero.png');
          background-size: cover;
          background-attachment: fixed;
          background-repeat: no-repeat;
          background-position: center center;
        }

        /* ── Global warm ivory overlay so marble is a subtle texture ── */
        body::before {
        content: '';
        position: fixed;
        inset: 0;
        background: rgba(253, 250, 240, 0.50);
        z-index: 0;
        pointer-events: none;
      }

        /* ── Reveal animations ── */
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
          0%,100% { box-shadow: 0 0 0 0 rgba(201,168,76,0.28); }
          50%      { box-shadow: 0 0 0 9px rgba(201,168,76,0); }
        }
        .cd-card { animation: }

        /* ── Gold-bordered glass card ── */
        .gb-card { position: relative; background: rgba(255,252,240,0.85); backdrop-filter: blur(14px); }
        .gb-card::before {
          content: ''; position: absolute; inset: 0; border-radius: inherit; padding: 1.5px;
          background: linear-gradient(135deg, #e8d5a3, #f5ecc8, #e8d5a3);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude; pointer-events: none;
        }

        /* ── Timeline connector line ── */
        .tl-item { position: relative; padding-left: 2.5rem; }
        .tl-item::before {
          content: ''; position: absolute; left: 1.35rem; top: 3.2rem; bottom: -1rem;
          width: 1.5px; background: linear-gradient(to bottom, #e8d5a3, #f5ecc8, transparent);
        }
        .tl-item:last-child::before { display: none; }

        /* ── Scroll cue ── */
        @keyframes cue { 0%,100%{transform:translateY(0)} 50%{transform:translateY(7px)} }
        .scroll-cue { animation: cue 2.2s ease infinite; }

        /* ── Audio equaliser bars ── */
        @keyframes audioBar { from { height: 4px; } to { height: 16px; } }

        /* ── Typography ── */
        .hero-name { font-family:'Allura',serif; font-weight:100; font-size:clamp(3rem,9.5vw,6rem); line-height:1; color:#8a6200; }
        .hero-amp  { font-family:'Allura',serif; font-style:italic; font-size:clamp(1.5rem,4vw,2.8rem); color:#c9a84c; }

        /* ── Calendar wedding-day pulse ── */
        @keyframes calPulse {
          0%,100% { transform: scale(1); box-shadow: 0 4px 14px rgba(201,168,76,0.45); }
          50%      { transform: scale(1.06); box-shadow: 0 6px 22px rgba(201,168,76,0.65); }
        }
        .wedding-day { animation: calPulse 2.5s ease infinite; }

        /* ── Section backgrounds — semi-transparent to let marble breathe ── */
        .section-light  { background: rgba(253, 250, 240, 0.78); backdrop-filter: blur(4px); }
        .section-light2 { background: rgba(255, 253, 244, 0.72); backdrop-filter: blur(4px); }
        .section-dark   { background: rgba(58, 38, 0, 0.90);     backdrop-filter: blur(4px); }

        /* ──────────────────────────────────────────────────────────────
           HERO FLORAL IMAGES
           Desktop  : left floral (mirrored) + right floral flanking the text
           Mobile   : single centred floral above the names
        ────────────────────────────────────────────────────────────── */

        /* Drops the black PNG background using multiply blend */
        .floral-img { mix-blend-mode: multiply; }

        /* Desktop – left floral (horizontally mirrored) */
        .hero-floral-left {
          position: absolute;
          left: -30px;
          top: 50%;
          transform: translateY(-54%) scaleX(-1);
          width: clamp(200px, 22vw, 340px);
          opacity: 0.90;
          pointer-events: none;
          animation: floralSwayLeft 9s ease-in-out infinite alternate;
        }

        /* Desktop – right floral */
        .hero-floral-right {
          position: absolute;
          right: -30px;
          top: 50%;
          transform: translateY(-54%);
          width: clamp(200px, 22vw, 340px);
          opacity: 0.90;
          pointer-events: none;
          animation: floralSwayRight 9s ease-in-out infinite alternate;
        }

        @keyframes floralSwayLeft {
          from { transform: translateY(-54%) scaleX(-1) translateX(0px) rotate(-1deg); }
          to   { transform: translateY(-54%) scaleX(-1) translateX(-8px) rotate(1deg); }
        }
        @keyframes floralSwayRight {
          from { transform: translateY(-54%) translateX(0px) rotate(1deg); }
          to   { transform: translateY(-54%) translateX(8px) rotate(-1deg); }
        }

        /* Mobile – single centred floral, hidden on desktop */
        .hero-floral-mobile {
          display: none;
          width: 200px;
          margin: 0 auto 4px;
          opacity: 0.88;
          animation: floralBob 8s ease-in-out infinite alternate;
        }

        @keyframes floralBob {
          from { transform: translateY(0); }
          to   { transform: translateY(-8px); }
        }

        /* Responsive swap */
        @media (max-width: 768px) {
          .hero-floral-left,
          .hero-floral-right { display: none !important; }
          .hero-floral-mobile { display: block; }
        }
      `}</style>

      {/* ══ SIDE NAVIGATION DOTS ══════════════════════════════════════════ */}
      <NavDots sections={navSections} active={activeSection} />

      {/* ══ HERO SECTION ══════════════════════════════════════════════════
          Layout (desktop)  : left floral | centred text | right floral
          Layout (mobile)   : centred floral on top, then text below
      ════════════════════════════════════════════════════════════════════ */}
      <Section
        id="hero"
        className="min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
      >
        {/* Soft warm veil over marble in hero only */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#fdfaec]/70 via-[#fdfaec]/70 to-[#fdfaec]/90 z-0 pointer-events-none" />
        {/* Desktop: left floral (mirrored) */}
        <img
          src="/D_J_01__2476_x_3280_px_.png"
          alt=""
          aria-hidden="true"
          className="hero-floral-left floral-img"
        />

        {/* Desktop: right floral */}
        <img
          src="/D_J_01__2476_x_3280_px_.png"
          alt=""
          aria-hidden="true"
          className="hero-floral-right floral-img"
        />

        {/* Centre content */}
        <div className="relative z-10 max-w-2xl mx-auto w-full">
          {/* Mobile-only: single top floral */}
          <img
            src="/D_J_01__2476_x_3280_px_.png"
            alt=""
            aria-hidden="true"
            className="hero-floral-mobile floral-img"
          />

          <p className="a1 font-[Lato] text-[11px] tracking-[0.5em] uppercase text-[#c9a84c] mb-2">
            We're Getting Married
          </p>

          <h1 className="a2 hero-name pt-8">Dulaj</h1>

          <div className="a3 flex items-center justify-center gap-5 py-2">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#e8d5a3]" />
            <span className="hero-amp">&amp;</span>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#e8d5a3]" />
          </div>

          <h1 className="a4 hero-name">Jayanithya</h1>

          <div className="a5 mt-5">
            <p className="font-[Marcellus] text-[#7a5a00] text-large tracking-[0.18em]">
              06 &middot; August &middot; 2026
            </p>
          </div>

          {/* Audio Player */}
          <div className="a6 mt-9 flex justify-center">
            <AudioPlayer />
          </div>

          {/* Scroll cue */}
          <div className="scroll-cue mt-10 flex flex-col items-center gap-2 opacity-40">
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#7a5a00] font-[Cormorant_Garamond]">
              Scroll
            </span>
            <div className="w-px h-7 bg-gradient-to-b from-transparent to-[#7a5a00]" />
            <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
              <path
                d="M1 1L7 7L13 1"
                stroke="#c9a84c"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </Section>

      {/* ══ OUR STORY SECTION ═════════════════════════════════════════════ */}
      <Section id="story" className="section-light py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p
            data-reveal
            className="font-[Lato] text-[10px] tracking-[0.5em] uppercase text-[#c9a84c] mb-2"
          >
            Our Story
          </p>
          <h2
            data-reveal
            data-delay="1"
            className="font-[Cormorant_Garamond] text-[clamp(2rem,5vw,3rem)] font-light text-[#5a3e00] m-0"
          >
            Two Hearts, One Journey
          </h2>
          <p
            data-reveal
            data-delay="2"
            className="font-[Lato] text-[#7a5a00] leading-loose text-[15px] mb-10"
          >
            In the warmth of a Sri Lankan sunrise, two souls found each other.
            Dulaj and Jayanithya's love story blossomed amidst the fragrance of
            jasmine and temple flowers, a bond blessed by family, faith, and the
            timeless traditions of our beautiful island. Together, they walk
            forward into a life adorned with love, laughter, and the grace of a
            thousand blessings.
          </p>

          {/* Lotus monogram */}
          <div data-reveal data-delay="3" className="mx-auto mb-8 w-48 h-48">
            <svg
              viewBox="0 0 300 300"
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              role="img"
            >
              <title>D &amp; J 2026 Lotus Monogram</title>

              <defs>
                <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fffbe8" stopOpacity="1" />
                  <stop offset="100%" stopColor="#f5e9c0" stopOpacity="1" />
                </radialGradient>
                <radialGradient id="centerGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fffdf5" />
                  <stop offset="100%" stopColor="#f5e9c0" />
                </radialGradient>
                <radialGradient id="petalGrad" cx="50%" cy="20%" r="80%">
                  <stop offset="0%" stopColor="#f5dfa0" />
                  <stop offset="100%" stopColor="#c9a030" />
                </radialGradient>
                <radialGradient id="innerPetal" cx="50%" cy="20%" r="80%">
                  <stop offset="0%" stopColor="#fff6d6" />
                  <stop offset="100%" stopColor="#e8c56a" />
                </radialGradient>
                <filter
                  id="softGlow"
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="140%"
                >
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="2.5"
                    result="blur"
                  />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter
                  id="petalGlow"
                  x="-30%"
                  y="-30%"
                  width="160%"
                  height="160%"
                >
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="1.2"
                    result="blur"
                  />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Soft background glow circle */}
              <circle
                cx="150"
                cy="150"
                r="140"
                fill="url(#bgGlow)"
                opacity="0.15"
              />

              {/* Outer decorative rings */}
              <g opacity="0.18">
                <circle
                  cx="150"
                  cy="150"
                  r="134"
                  fill="none"
                  stroke="#b8942a"
                  strokeWidth="0.5"
                />
                <circle
                  cx="150"
                  cy="150"
                  r="126"
                  fill="none"
                  stroke="#d4aa40"
                  strokeWidth="0.3"
                />
              </g>

              {/* Outer sparse petal layer */}
              <g filter="url(#petalGlow)">
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
                  <ellipse
                    key={deg}
                    cx="150"
                    cy="150"
                    rx="6"
                    ry="28"
                    fill={i % 2 === 0 ? "#c9a030" : "#dbb84a"}
                    opacity="0.45"
                    transform={`rotate(${deg} 150 150) translate(0 -64)`}
                  />
                ))}
              </g>

              {/* Mid dense petal layer */}
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(
                (deg, i) => (
                  <ellipse
                    key={deg}
                    cx="150"
                    cy="150"
                    rx="5"
                    ry="22"
                    fill="url(#petalGrad)"
                    opacity={i % 2 === 0 ? "0.75" : "0.55"}
                    transform={`rotate(${deg} 150 150) translate(0 -50)`}
                  />
                ),
              )}

              {/* Inner tight petal layer */}
              {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((deg) => (
                <ellipse
                  key={deg}
                  cx="150"
                  cy="150"
                  rx="3.5"
                  ry="13"
                  fill="url(#innerPetal)"
                  opacity="0.65"
                  transform={`rotate(${deg} 150 150) translate(0 -34)`}
                />
              ))}

              {/* Center medallion */}
              <circle
                cx="150"
                cy="150"
                r="36"
                fill="#fffdf5"
                stroke="#c9a030"
                strokeWidth="1.2"
                filter="url(#softGlow)"
              />
              <circle
                cx="150"
                cy="150"
                r="32"
                fill="url(#centerGrad)"
                stroke="#e8c56a"
                strokeWidth="0.6"
              />
              <circle
                cx="150"
                cy="150"
                r="28"
                fill="none"
                stroke="#c9a030"
                strokeWidth="0.4"
                strokeDasharray="3 2"
              />

              {/* Monogram text */}
              <text
                x="150"
                y="146"
                textAnchor="middle"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "14px",
                  fill: "#7a5500",
                  fontStyle: "italic",
                  fontWeight: 600,
                  letterSpacing: "1px",
                }}
              >
                D &amp; J
              </text>
              <text
                x="150"
                y="159"
                textAnchor="middle"
                style={{
                  fontFamily: "'Lato', Helvetica, sans-serif",
                  fontSize: "7px",
                  fill: "#c9a030",
                  letterSpacing: "2.5px",
                  fontWeight: 400,
                }}
              >
                2026
              </text>

              {/* Orbiting gold dot accents */}
              <g opacity="0.5">
                {[0, 60, 120, 180, 240, 300].map((deg) => (
                  <circle
                    key={deg}
                    cx="150"
                    cy="150"
                    r="1.2"
                    fill="#c9a030"
                    opacity="0.7"
                    transform={`rotate(${deg} 150 150) translate(0 -40)`}
                  />
                ))}
              </g>

              {/* Outer border rings */}
              <circle
                cx="150"
                cy="150"
                r="117"
                fill="none"
                stroke="#c9a030"
                strokeWidth="0.6"
                opacity="0.3"
              />
              <circle
                cx="150"
                cy="150"
                r="112"
                fill="none"
                stroke="#e8d5a3"
                strokeWidth="0.3"
                opacity="0.25"
              />
            </svg>
          </div>

          <p
            data-reveal
            data-delay="4"
            className="font-[Cormorant_Garamond] italic text-xl text-[#c9a84c]"
          >
            &ldquo;Where there is love, there is life.&rdquo;
          </p>
        </div>
      </Section>

      {/* ══ SCHEDULE SECTION ══════════════════════════════════════════════ */}
      <Section id="schedule" className="section-light2 py-24 px-6">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-14">
            <p
              data-reveal
              className="font-[Lato] text-[10px] tracking-[0.5em] uppercase text-[#c9a84c] mb-2"
            >
              The Ceremony
            </p>
            <h2
              data-reveal
              data-delay="1"
              className="font-[Cormorant_Garamond] text-[clamp(2rem,5vw,3rem)] font-light text-[#5a3e00] m-0"
            >
              Wedding Day Schedule
            </h2>
          </div>
          {schedule.map((item, i) => (
            <div
              key={i}
              data-reveal
              data-delay={String((i % 5) + 1)}
              className="tl-item mb-10"
            >
              <div className="flex gap-5">
                <div className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-[#fffdf0] to-[#f5ecc8] border-[1.5px] border-[#e8d5a3]">
                  <ScheduleIcon type={item.icon} />
                </div>
                <div className="pb-6 flex-1 border-b border-[#e8d5a3]/60">
                  <p className="font-[Lato] text-[10px] tracking-[0.3em] uppercase text-[#c9a84c] mb-1">
                    {item.time}
                  </p>
                  <h3 className="font-[Marcellus] text-[1.05rem] text-[#5a3e00] mb-2 mt-0">
                    {item.title}
                  </h3>
                  <p className="font-[Lato] text-[13.5px] text-[#7a5a00] leading-relaxed m-0">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ══ CALENDAR SECTION ══════════════════════════════════════════════ */}
      <Section id="calendar" className="section-light py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p
            data-reveal
            className="font-[Lato] text-[10px] tracking-[0.5em] uppercase text-[#c9a84c] mb-2"
          >
            Save the Date
          </p>
          <h2
            data-reveal
            data-delay="1"
            className="font-[Cormorant_Garamond] text-[clamp(2rem,5vw,3rem)] font-light text-[#5a3e00] m-0"
          >
            Mark Your Calendar
          </h2>
          <div data-reveal data-delay="2">
            <AugustCalendar />
          </div>
        </div>
      </Section>

      {/* ══ COUNTDOWN SECTION ═════════════════════════════════════════════ */}
      <Section
        id="countdown"
        className="section-dark py-28 px-6 overflow-hidden"
      >
        {/* Subtle gold shimmer overlay on dark section */}
        <div className="absolute inset-0 bg-[url('/D_J_01__Website_.png')] bg-cover bg-fixed opacity-10 z-0 pointer-events-none" />
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <p
            data-reveal
            className="font-[Lato] text-[10px] tracking-[0.5em] uppercase text-[#e8d5a3]/80 mb-3"
          >
            Counting Down to Forever
          </p>
          <h2
            data-reveal
            data-delay="1"
            className="font-[Cormorant_Garamond] text-[clamp(2rem,5vw,3rem)] font-light text-[#f5ecc8] mb-12"
          >
            The Big Day
          </h2>
          <div className="grid grid-cols-4 gap-3 max-w-sm mx-auto">
            {[
              { val: countdown.days, label: "Days" },
              { val: countdown.hours, label: "Hours" },
              { val: countdown.minutes, label: "Minutes" },
              { val: countdown.seconds, label: "Seconds" },
            ].map(({ val, label }, i) => (
              <div
                key={i}
                data-reveal
                data-delay={String(i + 1)}
                className="cd-card bg-white/10 backdrop-blur-md rounded-2xl py-6 px-2 text-center border border-[#c9a84c]/30"
              >
                <div className="font-[Cormorant_Garamond] text-[clamp(2rem,6vw,3.5rem)] font-light text-[#f5ecc8] leading-none mb-2">
                  {String(val).padStart(2, "0")}
                </div>
                <div className="font-[Lato] text-[9px] tracking-[0.2em] uppercase text-[#e8d5a3]/80">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ══ VENUE SECTION ═════════════════════════════════════════════════ */}
      <Section id="venue" className="section-light py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <p
              data-reveal
              className="font-[Lato] text-[10px] tracking-[0.5em] uppercase text-[#c9a84c] mb-2"
            >
              Venue
            </p>
            <h2
              data-reveal
              data-delay="1"
              className="font-[Cormorant_Garamond] text-[clamp(2rem,5vw,3rem)] font-light text-[#5a3e00] m-0"
            >
              Where We Celebrate
            </h2>
          </div>
          <div data-reveal data-delay="2" className="text-center mb-8">
            <h3 className="font-[Marcellus] text-[1.35rem] text-[#5a3e00] mb-1.5 mt-0">
              Hotel Golden Ray
            </h3>
            <p className="font-[Lato] text-sm tracking-wide text-[#7a5a00]">
              Dambulla, Sri Lanka
            </p>

            <div className="mt-4">
              <a
                href="https://maps.google.com/?q=Hotel+Golden+Ray+Dambulla"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3 rounded-2xl text-[10px] font-semibold tracking-[0.25em] uppercase text-white bg-[rgba(58,38,0,0.90)] no-underline font-[Lato] hover:opacity-90 transition-opacity"
              >
                Get Directions
                <MdDirections className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div data-reveal data-delay="3">
            <MapEmbed />
          </div>
        </div>
      </Section>

      {/* ══ RSVP SECTION ══════════════════════════════════════════════════ */}
      <Section id="rsvp" className="section-light2 py-24 px-6">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-12">
            <p
              data-reveal
              className="font-[Lato] text-[10px] tracking-[0.5em] uppercase text-[#c9a84c] mb-2"
            >
              Kindly Reply
            </p>
            <h2
              data-reveal
              data-delay="1"
              className="font-[Cormorant_Garamond] text-[clamp(2rem,5vw,3rem)] font-light text-[#5a3e00] m-0"
            >
              RSVP
            </h2>
            <p
              data-reveal
              data-delay="2"
              className="font-[Lato] text-sm text-[#7a5a00] mt-3"
            >
              Please reply by{" "}
              <span className="font-semibold text-[#c9a84c]">
                01st June 2026
              </span>
            </p>
          </div>
          <div
            data-reveal
            data-delay="3"
            className=" rounded-3xl p-5 shadow-2xl shadow-[#c9a84c]/10"
          >
            <RSVPForm />
          </div>
        </div>
      </Section>

      {/* ══ FOOTER ════════════════════════════════════════════════════════ */}
      <footer className="section-dark py-14 px-6 text-center">
        <svg
          className="mx-auto mb-6"
          width="200"
          height="16"
          viewBox="0 0 200 16"
          fill="none"
          opacity="0.5"
        >
          <defs>
            <linearGradient id="fl2" x1="0" x2="1">
              <stop offset="0%" stopColor="#e8d5a3" stopOpacity="0" />
              <stop offset="100%" stopColor="#e8d5a3" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="fr2" x1="0" x2="1">
              <stop offset="0%" stopColor="#e8d5a3" stopOpacity="1" />
              <stop offset="100%" stopColor="#e8d5a3" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line
            x1="0"
            y1="8"
            x2="78"
            y2="8"
            stroke="url(#fl2)"
            strokeWidth="1"
          />
          <circle cx="90" cy="8" r="2" fill="#f5ecc8" />
          <circle cx="100" cy="8" r="3" fill="#e8d5a3" />
          <circle cx="110" cy="8" r="2" fill="#f5ecc8" />
          <line
            x1="122"
            y1="8"
            x2="200"
            y2="8"
            stroke="url(#fr2)"
            strokeWidth="1"
          />
        </svg>
        <p className="font-[Cormorant_Garamond] italic text-2xl text-[#f5ecc8]/90 m-0 mb-2">
          Dulaj &amp; Jayanithya
        </p>
        <p className="font-[Lato] text-[10px] tracking-[0.3em] uppercase text-[#e8d5a3]/40 m-0 mb-5">
          06 August 2026 &middot; Hotel Golden Ray, Dambulla
        </p>
        <div className="mb-5">
          <p className="font-[Lato] text-[10px] tracking-[0.3em] uppercase text-[#e8d5a3]/40 mb-2">
            Contact For More Information
          </p>

          <div className="flex flex-col items-center gap-1">
            <a
              href="tel:+94768323678"
              className="font-[Cormorant_Garamond] text-[#f5ecc8]/90 text-lg no-underline hover:text-[#e8d5a3] transition-colors"
            >
              Dulaj — +94 76 832 3678
            </a>

            <a
              href="tel:+94771234567"
              className="font-[Cormorant_Garamond] text-[#f5ecc8]/90 text-lg no-underline hover:text-[#e8d5a3] transition-colors"
            >
              Jayanithya — +94 77 123 4567
            </a>
          </div>
        </div>
        <p className="font-[Lato] text-[11px] text-[#e8d5a3]/25 m-0">
          Crafted with love
        </p>
      </footer>
    </>
  );
}
