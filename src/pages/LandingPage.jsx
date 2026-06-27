import { Link } from 'react-router-dom'

const features = [
  { icon: '📚', title: 'Structured Courses', desc: 'Follow a curated curriculum designed by expert instructors.' },
  { icon: '🎓', title: 'Live Classrooms', desc: 'Attend live sessions and revisit recorded lectures anytime.' },
  { icon: '❓', title: 'Quizzes & Assessments', desc: 'Test your knowledge with timed quizzes and instant feedback.' },
  { icon: '📊', title: 'Progress Tracking', desc: 'Monitor attendance, grades, and course completion at a glance.' },
  { icon: '🗂️', title: 'Digital Library', desc: 'Access textbooks, notes, and study materials in one place.' },
  { icon: '💬', title: 'Discussions', desc: 'Engage with classmates and instructors through course forums.' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 lg:px-16 py-4 border-b border-slate-100 sticky top-0 bg-white/80 backdrop-blur-sm z-10">
        <div className="flex items-center gap-2">
          <span className="text-2xl">⚡</span>
          <span className="text-xl font-bold text-indigo-950">Learner</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 px-4 py-2 rounded-xl transition-colors">
            Sign in
          </Link>
          <Link to="/register" className="text-sm font-semibold bg-purple-600 text-white px-5 py-2.5 rounded-xl hover:bg-purple-700 transition-colors">
            Get started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 lg:px-16 pt-20 pb-24 bg-gradient-to-b from-indigo-50 to-white text-center">
        <p className="text-purple-600 font-semibold text-sm uppercase tracking-widest mb-4">Your digital classroom</p>
        <h1 className="text-5xl lg:text-6xl font-extrabold text-indigo-950 leading-tight mb-6 max-w-3xl mx-auto">
          Learn without limits, grow without boundaries
        </h1>
        <p className="text-lg text-slate-600 max-w-xl mx-auto mb-10">
          Learner brings your entire school experience online — courses, live classes, assignments, quizzes, grades, and more.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link to="/register" className="px-7 py-3.5 bg-purple-600 text-white font-semibold rounded-2xl hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200">
            Start learning free
          </Link>
          <Link to="/login" className="px-7 py-3.5 bg-white text-slate-700 font-semibold rounded-2xl border border-slate-200 hover:bg-slate-50 transition-colors">
            Sign in
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 lg:px-16 py-20">
        <h2 className="text-3xl font-bold text-indigo-950 text-center mb-4">Everything you need to succeed</h2>
        <p className="text-slate-500 text-center mb-12 max-w-xl mx-auto">
          All your academic tools in one place — built for students who mean business.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map(({ icon, title, desc }) => (
            <div key={title} className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-md transition-shadow">
              <span className="text-3xl mb-4 block">{icon}</span>
              <h3 className="text-base font-semibold text-slate-800 mb-2">{title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-16 py-16 bg-indigo-950 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to start?</h2>
        <p className="text-indigo-300 mb-8">Join your school's digital platform today.</p>
        <Link to="/register" className="px-8 py-3.5 bg-purple-500 text-white font-semibold rounded-2xl hover:bg-purple-400 transition-colors">
          Create your account
        </Link>
      </section>

      {/* Footer */}
      <footer className="px-6 lg:px-16 py-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-slate-400">
        <span>© {new Date().getFullYear()} Learner</span>
        <nav className="flex gap-5">
          <Link to="/about" className="hover:text-slate-600 transition-colors">About</Link>
          <Link to="/privacy" className="hover:text-slate-600 transition-colors">Privacy</Link>
          <Link to="/terms" className="hover:text-slate-600 transition-colors">Terms</Link>
          <Link to="/support" className="hover:text-slate-600 transition-colors">Support</Link>
        </nav>
      </footer>
    </div>
  )
}
