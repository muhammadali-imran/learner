// import Navbar from '@shared/components/ui/Navbar';
import HeroSection from '@features/landing/components/HeroSection';
import SocialProof from '@features/landing/components/SocialProof';
import FeaturesGrid from '@features/landing/components/FeaturesGrid';
import BenefitSimulator from '@features/landing/components/BenefitSimulator';
import Testimonials from '@features/landing/components/Testimonials';
import CTASection from '@features/landing/components/CTASection';
import Footer from '@shared/components/layout/Footer';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Logo from '@shared/components/ui/logo';

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
    const navRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom top',
        onUpdate: (self) => {
          if (self.direction === -1 && self.progress < 0.05) {
            gsap.to(navRef.current, {
              background: 'rgba(255,255,255,0.75)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              duration: 0.35,
            });
          } else if (self.direction === 1 && self.progress > 0.02) {
            gsap.to(navRef.current, {
              background: 'rgba(255,255,255,0.92)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
              duration: 0.35,
            });
          }
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-white text-navy overflow-x-hidden">
      {/* <Navbar /> */}
      <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-8 lg:px-16 py-3.5 bg-white/75 backdrop-blur-lg border-b border-transparent"
      style={{ willChange: 'background, box-shadow' }}
    >
      <Logo />
      <div className="hidden md:flex items-center gap-8 font-cantarell">
        <a href="#features" className="nav-item text-sm font-semibold text-slate-600 hover:text-navy">
          Features
        </a>
        <a href="#benefits" className="nav-item text-sm font-semibold text-slate-600 hover:text-navy">
          Benefits
        </a>
        <a href="#testimonials" className="nav-item text-sm font-semibold text-slate-600 hover:text-navy">
          Testimonials
        </a>
        <a href="#cta" className="nav-item text-sm font-semibold text-slate-600 hover:text-navy">
          About
        </a>
      </div>
      <div className="flex items-center gap-3">
        <a
          href="#cta"
          className="nav-item inline-flex items-center px-5 py-2.5 text-sm font-bold rounded-xl text-white shadow-lg font-cantarell"
          style={{
            background: 'linear-gradient(135deg, #4F92FF 0%, #3a7de0 100%)',
            boxShadow: '0 4px 18px rgba(79,146,255,0.35)',
          }}
        >
          Launch App
        </a>
        <button
          className="md:hidden nav-item p-2 rounded-lg hover:bg-slate-100"
          aria-label="Menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A2B49" strokeWidth="2.2" strokeLinecap="round">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
      </div>
    </nav>
      <HeroSection />
      <SocialProof />
      <FeaturesGrid />
      <BenefitSimulator />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  );
}