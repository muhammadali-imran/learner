import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonialsData = [
  {
    quote:
      'EduFlow transformed how our teachers collaborate. The automated grading alone saved each teacher nearly 6 hours per week.',
    name: 'Dr. Sarah Chen',
    role: 'Principal, Horizon International School',
    avatar: 'SC',
    color: '#4F92FF',
  },
  {
    quote:
      'My students love the live quizzes. Engagement has never been higher, and I can finally focus on teaching instead of paperwork.',
    name: 'Marcus Rivera',
    role: '8th Grade Science Teacher',
    avatar: 'MR',
    color: '#F3B000',
  },
  {
    quote:
      'As a parent, I feel so connected to my daughter\'s learning journey. The portal gives me real-time insight without being intrusive.',
    name: 'Priya Patel',
    role: 'Parent of 2 students',
    avatar: 'PP',
    color: '#5CB8B2',
  },
];

export default function Testimonials() {
  const testimonialRef = useRef(null);
  const testimonialCardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = testimonialCardsRef.current.filter(Boolean);
      gsap.fromTo(
        cards,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: testimonialRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, testimonialRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonials" ref={testimonialRef} className="py-20 sm:py-28 px-5 sm:px-8 lg:px-16 bg-white">
      <div className="max-w-5xl mx-auto text-center mb-14">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-4 font-raleway">
          Loved by educators, students, and families
        </h2>
        <p className="text-lg text-slate-500 max-w-xl mx-auto font-cantarell">
          Real stories from real schools using EduFlow every day.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {testimonialsData.map((t, idx) => (
          <div
            key={t.name}
            ref={(el) => (testimonialCardsRef.current[idx] = el)}
            className="testimonial-card gsap-stagger"
          >
            <p className="text-sm text-slate-600 leading-relaxed mb-6 relative z-10 font-cantarell">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="flex items-center gap-3 relative z-10">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white font-cantarell"
                style={{ backgroundColor: t.color }}
              >
                {t.avatar}
              </div>
              <div>
                <p className="font-bold text-navy text-sm font-raleway">{t.name}</p>
                <p className="text-xs text-slate-400 font-cantarell">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}