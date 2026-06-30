import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuiz } from '@features/quiz/hooks/useQuiz'
import { useToast } from '@shared/contexts/NotificationContext'
import QuizQuestion from '@features/quiz/components/QuizQuestion'
import CountDownTimer from '@features/quiz/components/CountDownTimer'
import Loading from '@shared/components/ui/Loading'
import ErrorState from '@shared/components/ui/ErrorState'
import ConfirmDialog from '@shared/components/ui/ConfirmDialog'

export default function QuizPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const toast = useToast()
  const { quiz, loading, error, answers, setAnswer, submit, submitting } = useQuiz(id)
  const [current, setCurrent] = useState(0)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const handleSubmit = async () => {
    setConfirmOpen(false)
    const result = await submit()
    if (result) {
      toast.success('Quiz submitted successfully!')
      navigate(`/quizzes/${id}/result`)
    } else {
      toast.error('Submission failed. Please try again.')
    }
  }

  if (loading) return <Loading fullscreen />
  if (error)   return <ErrorState message={error} />
  if (!quiz)   return null

  const questions = quiz.questions ?? []
  const answered  = Object.keys(answers).length
  const total     = questions.length

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800">{quiz.title}</h2>
            <p className="text-sm text-slate-500 mt-0.5">{answered}/{total} answered</p>
          </div>
          {quiz.duration_seconds && (
            <CountDownTimer
              seconds={quiz.duration_seconds}
              onExpire={() => { toast.warning('Time is up! Auto-submitting…'); handleSubmit() }}
            />
          )}
        </div>

        {/* Progress bar */}
        <div className="mt-4 w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-purple-500 rounded-full transition-all duration-300"
            style={{ width: `${total ? (answered / total) * 100 : 0}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Question navigator */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sticky top-20">
            <p className="text-xs font-semibold text-slate-500 uppercase mb-3">Questions</p>
            <div className="grid grid-cols-5 lg:grid-cols-4 gap-1.5">
              {questions.map((q, idx) => {
                const isAnswered = answers[q.id] !== undefined
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrent(idx)}
                    className={`h-9 w-full rounded-lg text-sm font-semibold transition-colors
                      ${current === idx
                        ? 'bg-purple-600 text-white'
                        : isAnswered
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                  >
                    {idx + 1}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="lg:col-span-3 space-y-4">
          {questions[current] && (
            <QuizQuestion
              question={{ ...questions[current], number: current + 1 }}
              answer={answers[questions[current].id]}
              onChange={setAnswer}
            />
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between gap-3">
            <button
              disabled={current === 0}
              onClick={() => setCurrent((p) => p - 1)}
              className="px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-40"
            >
              ← Previous
            </button>

            {current < total - 1 ? (
              <button
                onClick={() => setCurrent((p) => p + 1)}
                className="px-5 py-2.5 bg-purple-600 text-white rounded-xl text-sm font-semibold hover:bg-purple-700"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={() => setConfirmOpen(true)}
                className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-700"
              >
                Submit quiz
              </button>
            )}
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleSubmit}
        loading={submitting}
        title="Submit quiz?"
        message={`You've answered ${answered} of ${total} questions. You cannot change your answers after submitting.`}
        confirmLabel="Submit"
        variant="primary"
      />
    </div>
  )
}