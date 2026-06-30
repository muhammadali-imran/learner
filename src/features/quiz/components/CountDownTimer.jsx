// src/components/CountDownTimer.jsx
import { useEffect, useRef } from 'react'
import { useTimer } from '@shared/hooks/useTimer'

/**
 * Countdown timer that auto‑starts on mount.
 * Calls onExpire when time runs out.
 */
export default function CountDownTimer({
  seconds,
  onExpire,
  warnAt = 300,
  dangerAt = 60,
  className = '',
}) {
  const { remaining, formatted, running, start } = useTimer(seconds, onExpire)
  const hasStarted = useRef(false)

  // Auto‑start the timer exactly once after mount
  useEffect(() => {
    if (!hasStarted.current && !running) {
      hasStarted.current = true
      start()
    }
  }, [running, start]) // start is stable, but we include it for safety

  const pct = (remaining / seconds) * 100
  const isDanger = remaining <= dangerAt
  const isWarn = !isDanger && remaining <= warnAt

  const barColor = isDanger ? 'bg-red-500' : isWarn ? 'bg-amber-400' : 'bg-purple-500'
  const textColor = isDanger ? 'text-red-600' : isWarn ? 'text-amber-600' : 'text-slate-700'
  const ringColor = isDanger ? 'ring-red-200' : isWarn ? 'ring-amber-200' : 'ring-purple-100'
  const pulseClass = isDanger ? 'animate-pulse' : ''

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className={`text-xl ${pulseClass}`} aria-hidden>
        ⏱
      </span>
      <div className={`flex flex-col items-center ring-2 ${ringColor} rounded-xl px-3 py-1.5 bg-white`}>
        <span className={`text-lg font-bold font-mono leading-none ${textColor} ${pulseClass}`}>
          {formatted}
        </span>
        <span className="text-[10px] text-slate-400 mt-0.5">remaining</span>
      </div>
      <div className="flex-1 max-w-32 h-1.5 bg-slate-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}