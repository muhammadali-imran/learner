import { NavLink } from 'react-router-dom'
import useSidebar from '@shared/hooks/useSidebar'
import useAuth from '@shared/hooks/useAuth'
import Avatar from '@shared/components/ui/Avatar'

const navItems = [
  { to: '/dashboard',   label: 'Dashboard',   icon: '🏠' },
  { to: '/courses',     label: 'Courses',      icon: '📚' },
  { to: '/classroom',   label: 'Classroom',    icon: '🎓' },
  { to: '/assignments', label: 'Assignments',  icon: '📝' },
  { to: '/quizzes',     label: 'Quizzes',      icon: '❓' },
  { to: '/attendance',  label: 'Attendance',   icon: '✅' },
  { to: '/grades',      label: 'Grades',       icon: '📊' },
  { to: '/schedule',    label: 'Schedule',     icon: '📅' },
  { to: '/library',     label: 'Library',      icon: '🗂️' },
  { to: '/fees',        label: 'Fees',         icon: '💳' },
  { to: '/discussions', label: 'Discussions',  icon: '💬' },
]

const bottomItems = [
  { to: '/profile',  label: 'Profile',  icon: '👤' },
  { to: '/settings', label: 'Settings', icon: '⚙️' },
  { to: '/support',  label: 'Support',  icon: '🆘' },
]

export default function Sidebar() {
  const { open } = useSidebar()
  const { user } = useAuth()

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-20 lg:hidden transition-opacity duration-200 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      />

      <aside
        className={`
          fixed top-0 left-0 h-full z-30 flex flex-col bg-[#1e1b4b] text-white
          transition-all duration-300 ease-in-out
          ${open ? 'w-64' : 'w-0 lg:w-16 overflow-hidden'}
        `}
      >
        {/* Logo */}
        <div className={`flex items-center gap-3 px-4 py-5 border-b border-white/10 min-h-16 ${!open && 'lg:justify-center lg:px-0'}`}>
          <span className="text-2xl">⚡</span>
          {open && <span className="font-bold text-lg tracking-tight">Learner</span>}
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-3 scrollbar-thin">
          {navItems.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              title={label}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 mx-2 my-0.5 rounded-xl text-sm font-medium transition-colors
                ${isActive
                  ? 'bg-purple-600 text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
                }
                ${!open && 'lg:justify-center lg:px-0 lg:mx-1'}`
              }
            >
              <span className="text-lg leading-none">{icon}</span>
              {open && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Bottom section */}
        <div className="py-3 border-t border-white/10">
          {bottomItems.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              title={label}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 mx-2 my-0.5 rounded-xl text-sm font-medium transition-colors
                ${isActive
                  ? 'bg-purple-600 text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
                }
                ${!open && 'lg:justify-center lg:px-0 lg:mx-1'}`
              }
            >
              <span className="text-lg leading-none">{icon}</span>
              {open && <span>{label}</span>}
            </NavLink>
          ))}

          {/* User */}
          {open && user && (
            <div className="flex items-center gap-3 px-4 py-3 mx-2 mt-2 rounded-xl bg-white/10">
              <Avatar name={user.name || user.email} size="sm" />
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{user.name || 'Student'}</p>
                <p className="text-xs text-white/50 truncate">{user.email}</p>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}
