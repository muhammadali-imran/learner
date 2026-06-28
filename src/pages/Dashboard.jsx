import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { useApi } from '../hooks/useApi'
import StatCard from '../components/StatCard'
import ProgressBar from '../components/ProgressBar'
import Skeleton from '../components/Skeleton'
import Card, { CardTitle } from '../components/Card'
import Badge from '../components/Badge'
import PageHeader from '../components/PageHeader'

export default function Dashboard() {

  const { user } = useAuth()

  // Fetch data from API – returns { data, loading, error }
  const { data: stats, loading: statsLoading } = useApi('/dashboard/stats/')
  const { data: courses, loading: coursesLoading } = useApi('/my-courses/', { params: { limit: 4 } })
  const { data: upcoming, loading: upcomingLoading } = useApi('/upcoming/', { params: { limit: 3 } })

  const greeting = () => {
    const h = new Date().getHours()
    if (h < 12) return 'Good morning'
    if (h < 17) return 'Good afternoon'
    return 'Good evening'
  }

  // Helper to safely map API data (fallback to empty arrays if not loaded)
  const statItems = Array.isArray(stats) ? stats : []
  const courseItems = Array.isArray(courses) ? courses : []
  const upcomingItems = Array.isArray(upcoming) ? upcoming : []

  return (
    <div className="space-y-7">
      {/* Greeting */}
      
      <PageHeader 
        title={`${greeting()}, ${user?.name?.split(' ')[0] || 'Student'} 👋`} 
        description="Here's what's happening with your studies today." 
        />

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statsLoading
          ? Array.from({ length: 4 }).map((_, i) => <Skeleton.Card key={i} />)
          : statItems.map((s) => (
              <StatCard
                key={s.title}
                title={s.title}
                value={s.value}
                icon={s.icon}
                trend={s.trend}
                trendPositive={s.trendPositive}
              />
            ))
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

          {coursesLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : courseItems.length === 0 ? (
            <p className="text-sm text-slate-400 py-4">No courses yet. Start exploring!</p>
          ) : (
            <div className="space-y-5">
              {courseItems.map((c) => (
                <div key={c.id}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <Link
                        to={`/courses/${c.id}`}
                        className="text-sm font-semibold text-slate-800 hover:text-purple-600 transition-colors"
                      >
                        {c.title}
                      </Link>
                      <p className="text-xs text-slate-500 mt-0.5">{c.instructor || c.instructor_name}</p>
                    </div>
                    <span className="text-xs font-semibold text-slate-600">
                      {typeof c.progress === 'number' ? `${c.progress}%` : '0%'}
                    </span>
                  </div>
                  <ProgressBar value={c.progress ?? 0} showValue={false} />
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Upcoming deadlines */}
        <Card>
          <CardTitle className="mb-5">Upcoming</CardTitle>

          {upcomingLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          ) : upcomingItems.length === 0 ? (
            <p className="text-sm text-slate-400 py-4">No upcoming deadlines.</p>
          ) : (
            <div className="space-y-4">
              {upcomingItems.map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <span className="text-lg mt-0.5">
                    {item.type === 'quiz' ? '❓' : '📝'}
                  </span>
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
          )}

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