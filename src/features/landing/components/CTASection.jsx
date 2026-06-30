// ────────────────────────────────────────────────────────────
// File: src/components/landing/CTASection.jsx
// ────────────────────────────────────────────────────────────
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cta-element',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, ctaRef);
    return () => ctx.revert();
  }, []);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setEmailSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section
      id="cta"
      ref={ctaRef}
      className="relative py-20 sm:py-32 px-5 sm:px-8 lg:px-16 overflow-hidden"
    >
      {/* Blended gradient background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(79,146,255,0.35) 0%, transparent 55%),
            radial-gradient(circle at 75% 60%, rgba(243,176,0,0.3) 0%, transparent 55%),
            radial-gradient(circle at 50% 50%, rgba(92,184,178,0.25) 0%, transparent 60%),
            linear-gradient(180deg, #ffffff 0%, #F4F7FA 100%)
          `,
        }}
      />
      <div
        className="blob-sky"
        style={{
          width: '40vw',
          height: '40vw',
          maxWidth: '500px',
          maxHeight: '500px',
          top: '10%',
          left: '-8%',
          opacity: 0.7,
        }}
      />
      <div
        className="blob-gold"
        style={{
          width: '35vw',
          height: '35vw',
          maxWidth: '450px',
          maxHeight: '450px',
          bottom: '5%',
          right: '-6%',
          opacity: 0.7,
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <h2 className="cta-element text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy mb-5 leading-tight font-raleway">
          Transform Your School&apos;s Digital Experience Today
        </h2>
        <p className="cta-element text-lg text-slate-600 mb-10 max-w-lg mx-auto font-cantarell">
          Join 500+ schools already using EduFlow. Schedule a demo or drop your email — we&apos;ll be
          in touch within 24 hours.
        </p>

        <form
          onSubmit={handleEmailSubmit}
          className="cta-element flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your school email"
            className="email-input font-cantarell"
            required
            aria-label="School email address"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-bold rounded-xl text-white shrink-0 shadow-xl font-cantarell"
            style={{
              background: 'linear-gradient(135deg, #4F92FF 0%, #3a7de0 100%)',
              boxShadow: '0 8px 28px rgba(79,146,255,0.35)',
            }}
          >
            Get Started
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-2"
            >
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </button>
        </form>
        {emailSubmitted && (
          <p className="cta-element text-sm font-semibold text-green-600 bg-green-50 inline-block px-4 py-2 rounded-full font-cantarell">
            ✓ Thank you! We&apos;ll reach out shortly.
          </p>
        )}
        <p className="cta-element text-xs text-slate-400 mt-4 font-cantarell">
          No spam, ever. Unsubscribe anytime. Read our{' '}
          <a href="#" className="underline text-sky-500">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </section>
  );
}