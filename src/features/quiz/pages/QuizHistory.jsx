import { useNavigate } from 'react-router-dom'
import { useQuizAttempts } from '@features/quiz/hooks/useQuizAttempts'
import DataTable from '@shared/components/ui/DataTable'
import Badge from '@shared/components/ui/Badge'
import ErrorState from '@shared/components/ui/ErrorState'

export default function QuizHistory() {
  const navigate = useNavigate()
  const { data, loading, error, refetch, page, pageSize, setPage } = useQuizAttempts()

  const scoreVariant = (s) => {
    if (s >= 80) return 'green'
    if (s >= 50) return 'amber'
    return 'red'
  }

  const columns = [
    { field: 'quiz_title',  header: 'Quiz',
      render: (r) => <span className="font-medium text-slate-800">{r.quiz_title}</span> },
    { field: 'course_title', header: 'Course',
      render: (r) => <span className="text-slate-500">{r.course_title}</span> },
    { field: 'score',  header: 'Score', sortable: true,
      render: (r) => <Badge variant={scoreVariant(r.score)}>{r.score}%</Badge> },
    { field: 'passed', header: 'Result',
      render: (r) => <Badge variant={r.passed ? 'green' : 'red'}>{r.passed ? 'Passed' : 'Failed'}</Badge> },
    { field: 'submitted_at', header: 'Date',
      render: (r) => <span className="text-slate-400 text-xs">{r.submitted_at}</span> },
    { field: 'actions', header: '',
      render: (r) => (
        <button
          onClick={(e) => { e.stopPropagation(); navigate(`/quizzes/${r.quiz_id}/result`) }}
          className="text-xs text-purple-600 hover:underline font-medium"
        >
          View result
        </button>
      )},
  ]

  if (error) return <ErrorState message={error} onRetry={refetch} />

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">📋 Quiz History</h2>
        <p className="text-slate-500 text-sm mt-1">Your past quiz attempts and scores.</p>
      </div>
      <DataTable
        columns={columns}
        data={data?.results ?? []}
        loading={loading}
        onRowClick={(r) => navigate(`/quizzes/${r.quiz_id}/result`)}
        page={page}
        pageSize={pageSize}
        total={data?.count ?? 0}
        onPageChange={setPage}
        emptyMessage="No quiz attempts yet."
      />
    </div>
  )
}