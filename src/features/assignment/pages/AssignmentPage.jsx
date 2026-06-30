import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useApi } from '@shared/hooks/useApi'
import { useFileUpload } from '@features/assignment/hooks/useFileUpload'
import { useToast } from '@shared/contexts/NotificationContext'
import FileUpload from '@features/assignment/components/FileUpload'
import Loading from '@shared/components/ui/Loading'
import ErrorState from '@shared/components/ui/ErrorState'
import Card, { CardTitle } from '@shared/components/ui/Card'
import Badge from '@shared/components/ui/Badge'

const STATUS_VARIANT = { pending: 'amber', submitted: 'blue', graded: 'green', overdue: 'red' }

export default function AssignmentPage() {
  const { id } = useParams()
  const toast = useToast()
  const { data: assignment, loading, error, refetch } = useApi(`/assignments/${id}/`)
  const { upload, progress, loading: uploading } = useFileUpload()
  const [selectedFile, setSelectedFile] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async () => {
    if (!selectedFile) return
    const res = await upload(selectedFile, `/assignments/${id}/submit/`)
    if (res) {
      toast.success('Assignment submitted successfully!')
      setSubmitted(true)
      setSelectedFile(null)
      refetch()
    } else {
      toast.error('Submission failed. Please try again.')
    }
  }

  if (loading) return <Loading fullscreen />
  if (error)   return <ErrorState message={error} />
  if (!assignment) return null

  const isSubmitted = assignment.status === 'submitted' || assignment.status === 'graded' || submitted
  const isOverdue   = assignment.is_overdue && !isSubmitted

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <Link to="/assignments" className="text-sm text-slate-400 hover:text-slate-600">← Assignments</Link>

      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">{assignment.title}</h2>
            <p className="text-sm text-slate-500 mt-1">{assignment.course_title}</p>
          </div>
          <Badge variant={isOverdue ? 'red' : STATUS_VARIANT[assignment.status] || 'slate'}>
            {isOverdue ? 'Overdue' : assignment.status}
          </Badge>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5">
          <Info label="Due date"    value={assignment.due_date} />
          <Info label="Max marks"   value={assignment.max_grade} />
          {assignment.grade != null && <Info label="Your grade" value={`${assignment.grade}/${assignment.max_grade}`} />}
          {assignment.submissions_count != null && <Info label="Submissions" value={assignment.submissions_count} />}
        </div>
      </div>

      {/* Description */}
      {assignment.description && (
        <Card>
          <CardTitle>Instructions</CardTitle>
          <div className="mt-3 prose prose-sm prose-slate max-w-none">
            <p className="text-slate-700 leading-relaxed whitespace-pre-line">{assignment.description}</p>
          </div>
        </Card>
      )}

      {/* Resources */}
      {assignment.resources?.length > 0 && (
        <Card>
          <CardTitle>📎 Attachments</CardTitle>
          <div className="mt-3 space-y-2">
            {assignment.resources.map((r) => (
              <a key={r.id} href={r.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-purple-600 hover:underline">
                <span>📁</span>{r.name}
              </a>
            ))}
          </div>
        </Card>
      )}

      {/* Feedback */}
      {assignment.feedback && (
        <Card>
          <CardTitle>💬 Instructor Feedback</CardTitle>
          <p className="text-sm text-slate-700 mt-3 leading-relaxed">{assignment.feedback}</p>
        </Card>
      )}

      {/* Submission */}
      {!isSubmitted ? (
        <Card>
          <CardTitle>📤 Submit your work</CardTitle>
          <div className="mt-4 space-y-4">
            <FileUpload
              onFileSelect={setSelectedFile}
              accept={assignment.allowed_types || '*'}
              maxSizeMB={assignment.max_file_size_mb || 20}
              label={selectedFile ? `Selected: ${selectedFile.name}` : 'Upload your assignment file'}
            />
            {uploading && (
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
              </div>
            )}
            <button
              onClick={handleSubmit}
              disabled={!selectedFile || uploading}
              className="w-full py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 disabled:opacity-50 transition-colors"
            >
              {uploading ? `Uploading… ${progress}%` : 'Submit assignment'}
            </button>
          </div>
        </Card>
      ) : (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
          <span className="text-4xl block mb-2">✅</span>
          <p className="font-semibold text-emerald-800">Assignment submitted</p>
          {assignment.submitted_at && (
            <p className="text-sm text-emerald-600 mt-1">{assignment.submitted_at}</p>
          )}
        </div>
      )}
    </div>
  )
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-xs text-slate-400">{label}</p>
      <p className="text-sm font-semibold text-slate-700 mt-0.5">{value ?? '—'}</p>
    </div>
  )
}