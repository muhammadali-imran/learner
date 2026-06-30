import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const featuresData = [
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="12" fill="rgba(79,146,255,0.12)" />
        <path
          d="M12 14h16M12 20h10M12 26h13M26 20l4 4-4 4"
          stroke="#4F92FF"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: 'Interactive Live Classrooms',
    desc: 'Engage students with real-time quizzes, polls, and breakout rooms. Every session is recorded for easy revision.',
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="12" fill="rgba(243,176,0,0.14)" />
        <path d="M10 28V12l10 8-10 8zM20 28V12l10 8-10 8z" fill="#F3B000" opacity="0.8" />
        <rect x="10" y="28" width="20" height="3" rx="1.5" fill="#F3B000" opacity="0.5" />
      </svg>
    ),
    title: 'Automated Grading & Analytics',
    desc: 'Save teachers hours each week. AI-powered grading with detailed performance dashboards for every student.',
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="12" fill="rgba(92,184,178,0.15)" />
        <circle cx="14" cy="14" r="4" stroke="#5CB8B2" strokeWidth="2.2" fill="none" />
        <circle cx="26" cy="14" r="4" stroke="#5CB8B2" strokeWidth="2.2" fill="none" />
        <path
          d="M10 30c0-4 4-7 9-7h2c5 0 9 3 9 7"
          stroke="#5CB8B2"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    ),
    title: 'Parent-Teacher Portal',
    desc: 'Transparent tracking of milestones, attendance, and behavior. Strengthen the home-school connection effortlessly.',
  },
];

export default function FeaturesGrid() {
  const featuresRef = useRef(null);
  const featureCardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = featureCardsRef.current.filter(Boolean);
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: featuresRef.current,
            start: 'top 78%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, featuresRef);
    return () => ctx.revert();
  }, []);

  const handleMouseMove = useCallback((e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
  }, []);

  const handleMouseLeave = useCallback((e) => {
    const card = e.currentTarget;
    card.style.setProperty('--mouse-x', '50%');
    card.style.setProperty('--mouse-y', '50%');
  }, []);

  return (
    <section id="features" ref={featuresRef} className="py-20 sm:py-28 px-5 sm:px-8 lg:px-16 bg-white">
      <div className="max-w-5xl mx-auto text-center mb-14">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-4 font-raleway">
          Everything your school needs, in one place
        </h2>
        <p className="text-lg text-slate-500 max-w-xl mx-auto font-cantarell">
          Powerful tools designed for teachers, students, and administrators — all working in harmony.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {featuresData.map((feature, idx) => (
          <div
            key={feature.title}
            ref={(el) => (featureCardsRef.current[idx] = el)}
            className="feature-card gsap-stagger p-7"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative z-10">
              <div className="mb-5">{feature.icon}</div>
              <h3 className="text-lg font-bold text-navy mb-2.5 font-raleway">{feature.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-cantarell">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}