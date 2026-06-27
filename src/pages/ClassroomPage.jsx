import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApi } from '../hooks/useApi'
import TabBar from '../components/TabBar'
import Badge from '../components/Badge'
import Loading from '../components/Loading'
import ErrorState from '../components/ErrorState'
import EmptyState from '../components/EmptyState'
import ProgressBar from '../components/ProgressBar'

const TABS = [
  { id: 'lectures',    label: 'Lectures',    icon: '🎬' },
  { id: 'assignments', label: 'Assignments', icon: '📝' },
  { id: 'quizzes',     label: 'Quizzes',     icon: '❓' },
  { id: 'resources',   label: 'Resources',   icon: '📁' },
]

export default function ClassroomPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [tab, setTab] = useState('lectures')

  const { data: classroom, loading, error } = useApi(id ? `/classrooms/${id}/` : '/classrooms/active/')
  const classroomId = id || classroom?.id

  const { data: tabData, loading: tabLoading } = useApi(
    classroomId ? `/classrooms/${classroomId}/${tab}/` : null
  )
  const items = tabData?.results ?? tabData ?? []

  if (loading) return <Loading fullscreen />
  if (error)   return <ErrorState message={error} />

  const course = classroom?.course || classroom

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
          <div>
            <p className="text-xs text-purple-600 font-semibold uppercase tracking-wide mb-1">Classroom</p>
            <h2 className="text-2xl font-bold text-slate-800">{course?.title || 'Classroom'}</h2>
            <p className="text-slate-500 text-sm mt-1">{course?.instructor_name}</p>
          </div>
          {course?.progress !== undefined && (
            <div className="w-48">
              <ProgressBar value={course.progress} label="Progress" />
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <TabBar tabs={TABS} active={tab} onChange={setTab} />

      {/* Tab content */}
      {tabLoading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => <Skeleton key={i} className="h-20 w-full" />)}
        </div>
      ) : items.length === 0 ? (
        <EmptyState icon={TABS.find(t=>t.id===tab)?.icon || '📋'} title={`No ${tab} yet`} />
      ) : (
        <div className="space-y-3">
          {tab === 'lectures'    && items.map(l => <LectureRow key={l.id} lecture={l} navigate={navigate} />)}
          {tab === 'assignments' && items.map(a => <AssignmentRow key={a.id} item={a} navigate={navigate} />)}
          {tab === 'quizzes'     && items.map(q => <QuizRow key={q.id} item={q} navigate={navigate} />)}
          {tab === 'resources'   && items.map(r => <ResourceRow key={r.id} item={r} />)}
        </div>
      )}
    </div>
  )
}

function LectureRow({ lecture, navigate }) {
  return (
    <div
      onClick={() => navigate(`/lectures/${lecture.id}`)}
      className="flex items-center gap-4 bg-white rounded-2xl border border-slate-100 shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-xl shrink-0">
        {lecture.is_live ? '🔴' : '🎬'}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-slate-800 text-sm">{lecture.title}</p>
        <p className="text-xs text-slate-400 mt-0.5">{lecture.duration || lecture.date}</p>
      </div>
      <Badge variant={lecture.is_live ? 'red' : lecture.watched ? 'green' : 'slate'}>
        {lecture.is_live ? 'Live' : lecture.watched ? 'Watched' : 'New'}
      </Badge>
    </div>
  )
}

function AssignmentRow({ item, navigate }) {
  return (
    <div
      onClick={() => navigate(`/assignments/${item.id}`)}
      className="flex items-center gap-4 bg-white rounded-2xl border border-slate-100 shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow"
    >
      <span className="text-2xl">📝</span>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-slate-800 text-sm">{item.title}</p>
        <p className="text-xs text-slate-400 mt-0.5">Due: {item.due_date}</p>
      </div>
      <Badge variant={item.submitted ? 'green' : 'amber'}>{item.submitted ? 'Submitted' : 'Pending'}</Badge>
    </div>
  )
}

function QuizRow({ item, navigate }) {
  return (
    <div
      onClick={() => navigate(`/quizzes/${item.id}`)}
      className="flex items-center gap-4 bg-white rounded-2xl border border-slate-100 shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow"
    >
      <span className="text-2xl">❓</span>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-slate-800 text-sm">{item.title}</p>
        <p className="text-xs text-slate-400 mt-0.5">{item.question_count} questions · {item.duration_mins} min</p>
      </div>
      <Badge variant={item.best_score != null ? 'purple' : 'slate'}>
        {item.best_score != null ? `${item.best_score}%` : 'Not taken'}
      </Badge>
    </div>
  )
}

function ResourceRow({ item }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 bg-white rounded-2xl border border-slate-100 shadow-sm p-4 hover:shadow-md transition-shadow"
    >
      <span className="text-2xl">📁</span>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-slate-800 text-sm">{item.title}</p>
        <p className="text-xs text-slate-400 mt-0.5">{item.file_type?.toUpperCase()} · {item.size}</p>
      </div>
      <span className="text-slate-400 text-sm">↓</span>
    </a>
  )
}

// local Skeleton shim
function Skeleton({ className }) {
  return <div className={`animate-pulse rounded-2xl bg-slate-100 ${className}`} />
}