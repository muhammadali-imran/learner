/**
 * Renders a single quiz question based on its type.
 *
 * <QuizQuestion
 *   question={{ id, number, text, type: 'mcq'|'true_false'|'short', options: [{id,text}], points }}
 *   answer={selectedValue}
 *   onChange={(questionId, value) => {}}
 *   disabled={false}
 *   showResult={false}
 *   correctAnswer={correctValue}
 * />
 */
export default function QuizQuestion({
  question,
  answer,
  onChange,
  disabled = false,
  showResult = false,
  correctAnswer,
}) {
  if (!question) return null

  const { id, number, text, type, options = [], points } = question

  const isCorrect  = showResult && answer === correctAnswer
  const isWrong    = showResult && answer !== undefined && answer !== correctAnswer
  const resultRing = isCorrect ? 'ring-2 ring-emerald-400' : isWrong ? 'ring-2 ring-red-400' : ''

  return (
    <div className={`bg-white rounded-2xl border border-slate-100 shadow-sm p-6 ${resultRing}`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-start gap-3">
          <span className="shrink-0 w-7 h-7 rounded-full bg-purple-100 text-purple-700 text-sm font-bold flex items-center justify-center">
            {number || id}
          </span>
          <p className="text-slate-800 font-medium leading-snug">{text}</p>
        </div>
        <span className="shrink-0 text-xs text-slate-400 font-medium">
          {points} {points === 1 ? 'pt' : 'pts'}
        </span>
      </div>

      {/* MCQ */}
      {(type === 'mcq' || type === 'multiple_choice') && (
        <div className="space-y-2 ml-10">
          {options.map((opt) => {
            const selected  = answer === opt.id
            const isRight   = showResult && opt.id === correctAnswer
            const isWrongSel = showResult && selected && opt.id !== correctAnswer

            return (
              <label
                key={opt.id}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer border transition-colors
                  ${isRight      ? 'bg-emerald-50 border-emerald-300 text-emerald-800' :
                    isWrongSel   ? 'bg-red-50 border-red-300 text-red-800' :
                    selected     ? 'bg-purple-50 border-purple-400 text-purple-800' :
                                   'border-slate-200 hover:border-slate-300 text-slate-700'}
                  ${disabled    ? 'cursor-not-allowed opacity-80' : ''}
                `}
              >
                <input
                  type="radio"
                  name={`question-${id}`}
                  value={opt.id}
                  checked={selected}
                  disabled={disabled}
                  onChange={() => onChange?.(id, opt.id)}
                  className="accent-purple-600"
                />
                <span className="text-sm">{opt.text}</span>
                {isRight && <span className="ml-auto text-emerald-600 text-base">✓</span>}
                {isWrongSel && <span className="ml-auto text-red-500 text-base">✗</span>}
              </label>
            )
          })}
        </div>
      )}

      {/* True / False */}
      {type === 'true_false' && (
        <div className="flex gap-3 ml-10">
          {['true', 'false'].map((val) => {
            const selected = answer === val
            const isRight  = showResult && val === correctAnswer
            const isWrong2 = showResult && selected && val !== correctAnswer

            return (
              <button
                key={val}
                disabled={disabled}
                onClick={() => onChange?.(id, val)}
                className={`flex-1 py-3 rounded-xl border text-sm font-semibold capitalize transition-colors
                  ${isRight    ? 'bg-emerald-50 border-emerald-400 text-emerald-700' :
                    isWrong2   ? 'bg-red-50 border-red-400 text-red-700' :
                    selected   ? 'bg-purple-50 border-purple-400 text-purple-700' :
                                 'border-slate-200 text-slate-600 hover:border-slate-300'}
                  ${disabled  ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'}
                `}
              >
                {val}
              </button>
            )
          })}
        </div>
      )}

      {/* Short answer */}
      {type === 'short' && (
        <div className="ml-10">
          <textarea
            value={answer || ''}
            disabled={disabled}
            onChange={(e) => onChange?.(id, e.target.value)}
            rows={3}
            placeholder="Type your answer here…"
            className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-800 resize-none
              focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition
              ${disabled ? 'bg-slate-50 cursor-not-allowed' : 'border-slate-200'}`}
          />
          {showResult && correctAnswer && (
            <p className="mt-2 text-xs text-emerald-700 bg-emerald-50 px-3 py-2 rounded-lg">
              <span className="font-semibold">Model answer:</span> {correctAnswer}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
