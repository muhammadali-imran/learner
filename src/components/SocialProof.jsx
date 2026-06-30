// ────────────────────────────────────────────────────────────
// File: src/components/landing/SocialProof.jsx
// ────────────────────────────────────────────────────────────
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const trustedSchools = [
  'Horizon Academy',
  'Meridian Schools',
  'Pinnacle Education',
  'Oakbridge Prep',
  'Crestview International',
  'Willow Creek K-12',
  'Northstar Learning',
  'Summit Day School',
  'Evergreen Collegiate',
  'Brightpath Academy',
];

export default function SocialProof() {
  const tickerRef = useRef(null);

  useEffect(() => {
    if (!tickerRef.current) return;
    const track = tickerRef.current;
    const width = track.scrollWidth / 2;
    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: -width,
        duration: 30,
        ease: 'none',
        repeat: -1,
      });
    });
    return () => ctx.revert();
  }, []);

  const duplicated = [...trustedSchools, ...trustedSchools];

  return (
    <section className="py-10 sm:py-14 bg-cool border-y border-slate-200/60 overflow-hidden">
      <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-widest mb-6 font-cantarell">
        Trusted by over 500+ forward-thinking schools
      </p>
      <div className="ticker-wrapper">
        <div ref={tickerRef} className="ticker-track">
          {duplicated.map((name, i) => (
            <div key={i} className="flex items-center gap-2 shrink-0 opacity-50 hover:opacity-80">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white font-cantarell"
                style={{
                  background:
                    i % 3 === 0 ? '#4F92FF' : i % 3 === 1 ? '#5CB8B2' : '#F3B000',
                }}
              >
                {name.charAt(0)}
              </div>
              <span className="text-sm font-semibold text-slate-500 whitespace-nowrap font-cantarell">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}