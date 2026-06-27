import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 mt-auto">
      <div className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-500">
        <span>© {new Date().getFullYear()} Learner. All rights reserved.</span>
        <nav className="flex gap-4">
          <Link to="/about" className="hover:text-slate-700 transition-colors">About</Link>
          <Link to="/privacy" className="hover:text-slate-700 transition-colors">Privacy</Link>
          <Link to="/terms" className="hover:text-slate-700 transition-colors">Terms</Link>
          <Link to="/support" className="hover:text-slate-700 transition-colors">Support</Link>
        </nav>
      </div>
    </footer>
  )
}
