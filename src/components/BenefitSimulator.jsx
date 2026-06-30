import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const benefitTabs = [
  {
    id: 'teachers',
    label: 'For Teachers',
    icon: '🍎',
    benefits: [
      {
        title: 'Auto-Grade Assignments',
        desc: 'AI instantly grades quizzes and written responses, freeing up evenings and weekends.',
      },
      {
        title: 'Real-Time Classroom Insights',
        desc: 'See which students are struggling mid-lesson with live comprehension indicators.',
      },
      {
        title: 'One-Click Lesson Plans',
        desc: 'Access a rich library of curriculum-aligned lesson templates shared by educators worldwide.',
      },
    ],
    stat: '6+ hrs',
    statLabel: 'Saved per week',
  },
  {
    id: 'students',
    label: 'For Students',
    icon: '🚀',
    benefits: [
      {
        title: 'Gamified Learning Paths',
        desc: 'Earn badges and streak rewards as you master new concepts at your own pace.',
      },
      {
        title: 'Instant Doubt Resolution',
        desc: 'AI tutor answers questions 24/7, plus peer discussion boards for collaborative learning.',
      },
      {
        title: 'Personalized Revision Plans',
        desc: 'The platform identifies weak areas and auto-generates targeted practice sets.',
      },
    ],
    stat: '94%',
    statLabel: 'Reported confidence boost',
  },
  {
    id: 'admins',
    label: 'For Administrators',
    icon: '📊',
    benefits: [
      {
        title: 'Centralized School Dashboard',
        desc: 'Monitor attendance, teacher performance, and resource utilization across all grades.',
      },
      {
        title: 'Automated Compliance Reports',
        desc: 'Generate government-ready reports with one click — no more manual data entry.',
      },
      {
        title: 'Smart Resource Allocation',
        desc: 'AI predicts enrollment trends and suggests optimal staffing and budget distribution.',
      },
    ],
    stat: '40%',
    statLabel: 'Reduction in admin overhead',
  },
];

export default function BenefitSimulator() {
  const [activeTab, setActiveTab] = useState('teachers');
  const tabContentRef = useRef(null);
  const activeBenefitData = benefitTabs.find((t) => t.id === activeTab);

  useEffect(() => {
    if (!tabContentRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        tabContentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
      );
    });
    return () => ctx.revert();
  }, [activeTab]);

  return (
    <section id="benefits" className="py-20 sm:py-28 px-5 sm:px-8 lg:px-16 bg-cool">
      <div className="max-w-5xl mx-auto text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-4 font-raleway">
          See what EduFlow can do for you
        </h2>
        <p className="text-lg text-slate-500 max-w-xl mx-auto font-cantarell">
          Choose your role and discover tailored benefits.
        </p>
      </div>

      {/* Tab buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-10 max-w-5xl mx-auto">
        {benefitTabs.map((tab) => (
          <button
            key={tab.id}
            className={`benefit-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            aria-pressed={activeTab === tab.id}
            aria-label={tab.label}
          >
            <span className="mr-1.5">{tab.icon}</span> {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div ref={tabContentRef} className="tab-content-panel max-w-3xl mx-auto" key={activeTab}>
        <div className="bg-white rounded-2xl p-7 sm:p-10 border border-slate-100 shadow-lg">
          <div className="flex flex-col sm:flex-row gap-8 items-start">
            <div className="flex-1 space-y-5">
              {activeBenefitData?.benefits.map((b, i) => (
                <div key={i} className="flex gap-4">
                  <div
                    className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-sm font-bold text-white font-cantarell"
                    style={{
                      background: i === 0 ? '#4F92FF' : i === 1 ? '#5CB8B2' : '#F3B000',
                    }}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-navy mb-1 font-raleway">{b.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed font-cantarell">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="shrink-0 text-center sm:text-right">
              <div
                className="text-5xl sm:text-6xl font-extrabold font-raleway"
                style={{
                  background:
                    'linear-gradient(135deg, #4F92FF 0%, #5CB8B2 50%, #F3B000 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {activeBenefitData?.stat}
              </div>
              <p className="text-sm font-semibold text-slate-500 mt-1 font-cantarell">
                {activeBenefitData?.statLabel}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}