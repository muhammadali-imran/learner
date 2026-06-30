import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApi } from '@shared/hooks/useApi'
import { useDebounce } from '@shared/hooks/useDebounce'
import SearchInput from '@shared/components/ui/SearchInput'
import ProgressBar from '@shared/components/ui/ProgressBar'
import Badge from '@shared/components/ui/Badge'
import ErrorState from '@shared/components/ui/ErrorState'
import EmptyState from '@shared/components/ui/EmptyState'
import Skeleton from '@shared/components/ui/Skeleton'

const STATUS_VARIANT = { active: 'green', completed: 'blue', dropped: 'red', pending: 'amber' }

export default function EnrolledCoursePage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const debouncedSearch = useDebounce(search, 300)

  const { data, loading, error, refetch } = useApi('/my-courses/', {
    params: { search: debouncedSearch || undefined, status: filter === 'all' ? undefined : filter },
  })

  const courses = data?.results ?? data ?? []

  const tabs = ['all', 'active', 'completed']

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">🎓 My Courses</h2>
          <p className="text-slate-500 text-sm mt-1">Your enrolled courses and progress.</p>
        </div>
        <SearchInput value={search} onChange={setSearch} placeholder="Search my courses…" />
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors
              ${filter === t ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            {t}
          </button>
        ))}
      </div>

      {error ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[1,2,3,4].map(i => <Skeleton.Card key={i} />)}
        </div>
      ) : courses.length === 0 ? (
        <EmptyState
          icon="🎓"
          title="No courses found"
          message="Explore the catalogue and enroll in a course to get started."
          action={{ label: 'Browse courses', onClick: () => navigate('/courses') }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {courses.map((c) => (
            <div
              key={c.id}
              onClick={() => navigate(`/courses/${c.id}`)}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 cursor-pointer hover:shadow-md transition-shadow"
            >
              {c.thumbnail && (
                <img src={c.thumbnail} alt={c.title} className="w-full h-32 object-cover rounded-xl mb-4" />
              )}
              <div className="flex items-start justify-between gap-2 mb-3">
                <h3 className="font-semibold text-slate-800 text-sm leading-snug">{c.title}</h3>
                <Badge variant={STATUS_VARIANT[c.enrollment_status] || 'slate'}>
                  {c.enrollment_status || 'active'}
                </Badge>
              </div>
              <p className="text-xs text-slate-500 mb-4">{c.instructor_name}</p>
              <ProgressBar value={c.progress ?? 0} label="Progress" color="purple" />
              <div className="flex justify-between text-xs text-slate-400 mt-3">
                <span>{c.lectures_completed ?? 0}/{c.lectures_total ?? 0} lectures</span>
                {c.next_deadline && <span>Due {c.next_deadline}</span>}
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); navigate(`/classroom/${c.id}`) }}
                className="mt-4 w-full py-2 text-sm font-semibold text-purple-600 border border-purple-200 rounded-xl hover:bg-purple-50 transition-colors"
              >
                Go to classroom →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}