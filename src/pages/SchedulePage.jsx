// src/pages/SchedulePage.jsx
import { useState } from 'react'
import { useApi } from '../hooks/useApi'
import Calendar from '../components/Calendar'
import Card, { CardTitle } from '../components/Card'
import Badge from '../components/Badge'
import Loading from '../components/Loading'
import ErrorState from '../components/ErrorState'
import PageHeader from '../components/PageHeader'

export default function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState(null)
  const { data: events, loading, error } = useApi('/schedule/', {
    params: selectedDate ? { date: selectedDate } : undefined,
  })

  const handleDateClick = (dateStr) => setSelectedDate(dateStr)

  return (
    <div className="space-y-6">
      <PageHeader icon="📅" title="Schedule" description="Your class timetable and upcoming sessions." />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Calendar events={events ?? []} onDateClick={handleDateClick} />
        <div className="lg:col-span-2">
          <Card>
            <CardTitle>{selectedDate ? `Events for ${selectedDate}` : 'Upcoming sessions'}</CardTitle>
            {loading ? <Loading /> : error ? <ErrorState message={error} /> : (
              <div className="mt-3 space-y-3">
                {(events ?? []).length === 0 && <p className="text-sm text-slate-400">No events.</p>}
                {(events ?? []).map(ev => (
                  <div key={ev.id} className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl">
                    <Badge variant={ev.type === 'quiz' ? 'purple' : ev.type === 'lecture' ? 'blue' : 'slate'}>
                      {ev.type}
                    </Badge>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-slate-800">{ev.title}</p>
                      <p className="text-xs text-slate-500">{ev.time || ev.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}