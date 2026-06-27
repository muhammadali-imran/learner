import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import StatCard from '../components/StatCard'
import ProgressBar from '../components/ProgressBar'
import Skeleton from '../components/Skeleton'
import Card, { CardTitle } from '../components/Card'
import Badge from '../components/Badge'

// Fallback demo data shown while API is not connected
const DEMO_STATS = [
  { title: 'Enrolled Courses', value: 6, icon: '📚', trend: '1 new this week', trendPositive: true },
  { title: 'Assignments Due', value: 3, icon: '📝', trend: 'Next: Tomorrow', trendPositive: false },
  { title: 'Quiz Score Avg', value: '84%', icon: '❓', trend: '+5% vs last month', trendPositive: true },
  { title: 'Attendance Rate', value: '91%', icon: '✅', trend: 'On track', trendPositive: true },
]

const DEMO_COURSES = [
  { id: 1, title: 'Mathematics II',     instructor: 'Dr. Ahsan',   progress: 68, status: 'active' },
  { id: 2, title: 'Physics',            instructor: 'Dr. Malik',   progress: 45, status: 'active' },
  { id: 3, title: 'English Literature', instructor: 'Ms. Fatima',  progress: 82, status: 'active' },
  { id: 4, title: 'Chemistry',          instructor: 'Dr. Siddiqui',progress: 30, status: 'active' },
]

const DEMO_UPCOMING = [
  { id: 1, title: 'Physics Lab Report',     due: 'Tomorrow, 11:59 PM', type: 'assignment' },
  { id: 2, title: 'Math Chapter 5 Quiz',    due: 'Wed, 10:00 AM',      type: 'quiz' },
  { id: 3, title: 'English Essay (Draft 1)',due: 'Thu, 11:59 PM',       type: 'assignment' },
]

export default function Dashboard() {
  const { user } = useAuth()
  // Swap `null` with real endpoints when backend is ready
  // const { data: stats, loading: statsLoading } = useApi('/dashboard/stats/')
  const statsLoading = false
  const stats = DEMO_STATS

  const greeting = () => {
    const h = new Date().getHours()
    if (h < 12) return 'Good morning'
    if (h < 17) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <div className="space-y-7">
      {/* Greeting */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          {greeting()}, {user?.name?.split(' ')[0] || 'Student'} 👋
        </h2>
        <p className="text-slate-500 text-sm mt-1">Here's what's happening with your studies today.</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statsLoading
          ? Array(4).fill(0).map((_, i) => <Skeleton.Card key={i} />)
          : stats.map((s) => <StatCard key={s.title} {...s} />)
        }
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* My courses progress */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <CardTitle>My Courses</CardTitle>
            <Link to="/courses" className="text-sm text-purple-600 font-medium hover:underline">
              View all →
            </Link>
          </div>
          <div className="space-y-5">
            {DEMO_COURSES.map((c) => (
              <div key={c.id}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <Link
                      to={`/courses/${c.id}`}
                      className="text-sm font-semibold text-slate-800 hover:text-purple-600 transition-colors"
                    >
                      {c.title}
                    </Link>
                    <p className="text-xs text-slate-500 mt-0.5">{c.instructor}</p>
                  </div>
                  <span className="text-xs font-semibold text-slate-600">{c.progress}%</span>
                </div>
                <ProgressBar value={c.progress} showValue={false} />
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming deadlines */}
        <Card>
          <CardTitle className="mb-5">Upcoming</CardTitle>
          <div className="space-y-4">
            {DEMO_UPCOMING.map((item) => (
              <div key={item.id} className="flex items-start gap-3">
                <span className="text-lg mt-0.5">{item.type === 'quiz' ? '❓' : '📝'}</span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{item.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{item.due}</p>
                </div>
                <Badge variant={item.type === 'quiz' ? 'purple' : 'amber'}>
                  {item.type}
                </Badge>
              </div>
            ))}
          </div>
          <Link
            to="/assignments"
            className="mt-5 block text-center text-sm font-medium text-purple-600 hover:underline"
          >
            All deadlines →
          </Link>
        </Card>
      </div>
    </div>
  )
}
