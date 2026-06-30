import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function HeroSection() {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('.hero-headline', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 })
        .fromTo('.hero-subheadline', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.5')
        .fromTo('.hero-cta-group', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.4')
        .fromTo(
          '.hero-mockup',
          { y: 60, opacity: 0, scale: 0.92 },
          { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power2.out' },
          '-=0.5'
        )
        .fromTo('.hero-blob', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' }, '-=1.2');
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="hero-mesh relative min-h-[95vh] flex items-center justify-center pt-20 pb-16 px-5 sm:px-8 lg:px-16 overflow-hidden"
      style={{ background: '#ffffff' }}
    >
      {/* Gradient Blobs */}
      <div
        className="hero-blob blob-sky"
        style={{ width: '55vw', height: '55vw', maxWidth: '700px', maxHeight: '700px', top: '-8%', left: '-12%' }}
      />
      <div
        className="hero-blob blob-gold"
        style={{ width: '50vw', height: '50vw', maxWidth: '600px', maxHeight: '600px', bottom: '-5%', right: '-10%' }}
      />
      <div
        className="hero-blob blob-teal"
        style={{
          width: '38vw',
          height: '38vw',
          maxWidth: '480px',
          maxHeight: '480px',
          top: '35%',
          left: '40%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="hero-headline text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy leading-tight tracking-tight mb-5 font-raleway">
            The{' '}
            <span
              className="font-cookie text-5xl sm:text-6xl lg:text-7xl"
              style={{
                background: 'linear-gradient(135deg, #4F92FF 0%, #5CB8B2 40%, #F3B000 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Smarter
            </span>{' '}
            Way to{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #4F92FF 0%, #5CB8B2 40%, #F3B000 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Learn, Teach, and Grow
            </span>{' '}
            Together.
          </h1>
          <p className="hero-subheadline text-lg sm:text-xl text-slate-500 max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed font-cantarell">
            An all-in-one digital classroom built for modern schools. Empowering teachers, engaging
            students, and simplifying administration.
          </p>
          <div className="hero-cta-group flex flex-wrap gap-4 justify-center lg:justify-start">
            <a
              href="#cta"
              className="inline-flex items-center px-7 py-3.5 text-base font-bold rounded-xl text-white shadow-xl font-cantarell"
              style={{
                background: 'linear-gradient(135deg, #4F92FF 0%, #3a7de0 100%)',
                boxShadow: '0 8px 32px rgba(79,146,255,0.3)',
              }}
            >
              Schedule a Free Demo
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
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#"
              className="inline-flex items-center px-7 py-3.5 text-base font-semibold rounded-xl text-navy bg-white border-2 border-slate-200 hover:border-sky-400 font-cantarell"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="#4F92FF"
                stroke="#4F92FF"
                strokeWidth="1"
                className="mr-2"
              >
                <circle cx="12" cy="12" r="10" />
                <polygon points="10,8 16,12 10,16" fill="white" />
              </svg>
              Watch How It Works
            </a>
          </div>
        </div>

        {/* Dashboard Mockup */}
        <div className="hero-mockup flex-1 max-w-md lg:max-w-lg w-full">
          <div
            className="relative rounded-2xl shadow-2xl overflow-hidden border border-slate-200/60"
            style={{
              background: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 20px 60px rgba(26,43,73,0.12), 0 4px 16px rgba(79,146,255,0.08)',
            }}
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <span className="text-xs text-slate-400 ml-2 font-medium font-cantarell">
                EduFlow Dashboard
              </span>
            </div>
            <div className="p-4 sm:p-5 space-y-3">
              <div className="flex gap-3">
                <div
                  className="w-1/2 h-20 rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(79,146,255,0.2), rgba(112,193,255,0.1))',
                  }}
                />
                <div
                  className="w-1/2 h-20 rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(243,176,0,0.2), rgba(255,199,44,0.1))',
                  }}
                />
              </div>
              <div
                className="h-28 rounded-xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(92,184,178,0.18), rgba(120,210,200,0.08))',
                }}
              />
              <div className="flex gap-3">
                <div className="w-1/3 h-14 rounded-lg bg-slate-100" />
                <div className="w-1/3 h-14 rounded-lg bg-slate-100" />
                <div className="w-1/3 h-14 rounded-lg bg-slate-100" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}