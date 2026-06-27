import { useState } from 'react'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]

/**
 * <Calendar
 *   events={[{ date: '2025-06-15', title: 'Quiz', type: 'quiz' }]}
 *   onDateClick={(date) => console.log(date)}
 * />
 */
export default function Calendar({ events = [], onDateClick }) {
  const today = new Date()
  const [current, setCurrent] = useState(new Date(today.getFullYear(), today.getMonth(), 1))

  const year  = current.getFullYear()
  const month = current.getMonth()

  const firstDay   = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const prev = () => setCurrent(new Date(year, month - 1, 1))
  const next = () => setCurrent(new Date(year, month + 1, 1))

  // Build a map: "YYYY-MM-DD" → events[]
  const eventMap = events.reduce((acc, ev) => {
    const key = ev.date
    acc[key] = acc[key] ? [...acc[key], ev] : [ev]
    return acc
  }, {})

  const typeColor = {
    quiz:       'bg-purple-500',
    assignment: 'bg-amber-500',
    lecture:    'bg-blue-500',
    event:      'bg-emerald-500',
  }

  const cells = []
  // Leading blanks
  for (let i = 0; i < firstDay; i++) cells.push(null)
  // Day numbers
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const pad = (n) => String(n).padStart(2, '0')

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 select-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prev}
          className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
          aria-label="Previous month"
        >
          ‹
        </button>
        <span className="text-sm font-semibold text-slate-800">
          {MONTHS[month]} {year}
        </span>
        <button
          onClick={next}
          className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
          aria-label="Next month"
        >
          ›
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-[11px] font-semibold text-slate-400 py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Cells */}
      <div className="grid grid-cols-7 gap-px">
        {cells.map((day, i) => {
          if (!day) return <div key={`blank-${i}`} />

          const dateStr = `${year}-${pad(month + 1)}-${pad(day)}`
          const isToday =
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
          const dayEvents = eventMap[dateStr] || []

          return (
            <button
              key={dateStr}
              onClick={() => onDateClick?.(dateStr, dayEvents)}
              className={`relative flex flex-col items-center rounded-xl py-1.5 text-sm transition-colors
                ${isToday
                  ? 'bg-purple-600 text-white font-bold'
                  : 'text-slate-700 hover:bg-slate-100'
                }
              `}
            >
              {day}
              {dayEvents.length > 0 && (
                <div className="flex gap-0.5 mt-0.5 flex-wrap justify-center">
                  {dayEvents.slice(0, 3).map((ev, idx) => (
                    <span
                      key={idx}
                      className={`block w-1 h-1 rounded-full ${typeColor[ev.type] || 'bg-slate-400'} ${isToday ? 'opacity-70' : ''}`}
                    />
                  ))}
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-4 pt-3 border-t border-slate-100">
        {Object.entries(typeColor).map(([type, cls]) => (
          <span key={type} className="flex items-center gap-1.5 text-xs text-slate-500 capitalize">
            <span className={`w-2 h-2 rounded-full ${cls}`} />
            {type}
          </span>
        ))}
      </div>
    </div>
  )
}
