import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useApi } from '../hooks/useApi'
import { useMutation } from '../hooks/useMutation'
import { useToast } from '../components/Toast'
import VideoPlayer from '../components/VideoPlayer'
import Loading from '../components/Loading'
import ErrorState from '../components/ErrorState'
import Card, { CardTitle } from '../components/Card'
import Badge from '../components/Badge'

export default function LecturePage() {
  const { id } = useParams()
  const toast = useToast()
  const [notes, setNotes] = useState('')
  const [notesSaved, setNotesSaved] = useState(false)

  const { data: lecture, loading, error } = useApi(`/lectures/${id}/`)
  const { mutate: saveNotes, loading: saving } = useMutation(`/lectures/${id}/notes/`, 'post')
  const { mutate: markWatched } = useMutation(`/lectures/${id}/mark-watched/`, 'post')

  const handleSaveNotes = async () => {
    const res = await saveNotes({ content: notes })
    if (res) {
      setNotesSaved(true)
      toast.success('Notes saved!')
      setTimeout(() => setNotesSaved(false), 3000)
    } else {
      toast.error('Could not save notes.')
    }
  }

  const handleProgress = async (currentTime, duration) => {
    // Mark watched when 90% complete
    if (duration && currentTime / duration > 0.9 && !lecture?.watched) {
      await markWatched({})
    }
  }

  if (loading) return <Loading fullscreen />
  if (error)   return <ErrorState message={error} />
  if (!lecture) return null

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link to="/classroom" className="hover:text-slate-700">Classroom</Link>
        <span>/</span>
        <span className="text-slate-800 font-medium truncate">{lecture.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main: video */}
        <div className="lg:col-span-2 space-y-4">
          <VideoPlayer
            src={lecture.video_url}
            title={lecture.title}
            poster={lecture.thumbnail}
            type={lecture.video_type || 'native'}
            onProgress={handleProgress}
          />

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-800">{lecture.title}</h2>
                <p className="text-sm text-slate-500 mt-1">{lecture.instructor_name} · {lecture.date}</p>
              </div>
              <Badge variant={lecture.watched ? 'green' : 'slate'}>
                {lecture.watched ? '✓ Watched' : 'Not watched'}
              </Badge>
            </div>
            {lecture.description && (
              <p className="text-sm text-slate-600 mt-4 leading-relaxed">{lecture.description}</p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Notes */}
          <Card>
            <CardTitle>📝 My Notes</CardTitle>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={10}
              placeholder="Take notes as you watch…"
              className="w-full mt-3 px-3 py-2.5 text-sm border border-slate-200 rounded-xl resize-none
                focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none text-slate-700"
            />
            <button
              onClick={handleSaveNotes}
              disabled={saving || !notes.trim()}
              className="mt-3 w-full py-2 text-sm font-semibold bg-purple-600 text-white rounded-xl
                hover:bg-purple-700 disabled:opacity-50 transition-colors"
            >
              {saving ? 'Saving…' : notesSaved ? '✓ Saved' : 'Save notes'}
            </button>
          </Card>

          {/* Attachments */}
          {lecture.attachments?.length > 0 && (
            <Card>
              <CardTitle>📁 Resources</CardTitle>
              <div className="mt-3 space-y-2">
                {lecture.attachments.map((a) => (
                  <a
                    key={a.id}
                    href={a.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-purple-600 hover:underline"
                  >
                    <span>📎</span>{a.name}
                  </a>
                ))}
              </div>
            </Card>
          )}

          {/* Navigation */}
          <div className="flex gap-2">
            {lecture.prev_lecture && (
              <Link
                to={`/lectures/${lecture.prev_lecture}`}
                className="flex-1 py-2.5 text-center text-sm font-medium border border-slate-200 rounded-xl hover:bg-slate-50"
              >
                ← Prev
              </Link>
            )}
            {lecture.next_lecture && (
              <Link
                to={`/lectures/${lecture.next_lecture}`}
                className="flex-1 py-2.5 text-center text-sm font-semibold bg-purple-600 text-white rounded-xl hover:bg-purple-700"
              >
                Next →
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}