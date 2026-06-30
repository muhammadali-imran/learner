import { useParams, Link, useNavigate } from 'react-router-dom'
import { useApi } from '@shared/hooks/useApi'
import QuizQuestion from '@features/quiz/components/QuizQuestion'
import Loading from '@shared/components/ui/Loading'
import ErrorState from '@shared/components/ui/ErrorState'

export default function ResultPage() {
  const { id } = useParams()        // quiz id
  const navigate = useNavigate()
  const { data: result, loading, error } = useApi(`/quizzes/${id}/my-result/`)

  if (loading) return <Loading fullscreen />
  if (error)   return <ErrorState message={error} />
  if (!result) return null

  const score   = result.score ?? 0
  const passed  = result.passed
  const correct = result.correct ?? 0
  const total   = result.total ?? 0
  const emoji   = score >= 80 ? '🏆' : score >= 50 ? '👍' : '📘'
  const color   = score >= 80 ? 'emerald' : score >= 50 ? 'amber' : 'red'

  const borderMap  = { emerald: 'border-emerald-400', amber: 'border-amber-400', red: 'border-red-400' }
  const textMap    = { emerald: 'text-emerald-600',   amber: 'text-amber-600',   red: 'text-red-600'   }
  const bgMap      = { emerald: 'bg-emerald-50',      amber: 'bg-amber-50',      red: 'bg-red-50'      }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Score card */}
      <div className={`bg-white rounded-2xl border-2 ${borderMap[color]} shadow-sm p-8 text-center`}>
        <span className="text-6xl block mb-4">{emoji}</span>
        <h2 className="text-3xl font-extrabold text-slate-800 mb-1">{score}%</h2>
        <p className={`text-lg font-semibold ${textMap[color]}`}>{passed ? 'Passed' : 'Failed'}</p>
        <p className="text-slate-500 text-sm mt-2">{result.quiz_title}</p>

        <div className={`grid grid-cols-3 gap-4 mt-6 ${bgMap[color]} rounded-xl p-4`}>
          <Stat label="Correct"   value={correct} />
          <Stat label="Wrong"     value={total - correct} />
          <Stat label="Questions" value={total} />
        </div>

        {result.passed_at && (
          <p className="text-xs text-slate-400 mt-4">Submitted {result.passed_at}</p>
        )}
      </div>

      {/* Review */}
      {result.questions?.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-800">Answer Review</h3>
          {result.questions.map((q, idx) => (
            <QuizQuestion
              key={q.id}
              question={{ ...q, number: idx + 1 }}
              answer={q.your_answer}
              disabled
              showResult
              correctAnswer={q.correct_answer}
            />
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 flex-wrap justify-center pb-6">
        <button
          onClick={() => navigate(`/quizzes/${id}`)}
          className="px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Retake quiz
        </button>
        <Link
          to="/quizzes"
          className="px-5 py-2.5 bg-purple-600 text-white rounded-xl text-sm font-semibold hover:bg-purple-700"
        >
          All quizzes
        </Link>
      </div>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
      <p className="text-xs text-slate-500 mt-0.5">{label}</p>
    </div>
  )
}