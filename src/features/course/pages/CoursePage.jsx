import { useParams, Link } from 'react-router-dom'
import { useCourse } from '@features/course/hooks/useCourse'
import Loading from '@shared/components/ui/Loading'
import ErrorState from '@shared/components/ui/ErrorState'
import Badge from '@shared/components/ui/Badge'
import Card, { CardTitle } from '@shared/components/ui/Card'
import ProgressBar from '@shared/components/ui/ProgressBar'

export default function CoursePage() {
  const { id } = useParams()
  const { data: course, loading, error } = useCourse(id)

  if (loading) return <Loading fullscreen />
  if (error) return <ErrorState message={error} />
  if (!course) return null

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">{course.title}</h2>
        <p className="text-slate-500">{course.instructor_name}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardTitle>Description</CardTitle>
            <p className="text-slate-600 text-sm">{course.description}</p>
          </Card>
          {course.progress !== undefined && (
            <Card>
              <CardTitle>Your Progress</CardTitle>
              <ProgressBar value={course.progress} />
            </Card>
          )}
        </div>

        <div className="space-y-4">
          <Card>
            <CardTitle>Quick Info</CardTitle>
            <dl className="text-sm space-y-2">
              <div><dt className="text-slate-500">Duration</dt><dd className="font-medium">{course.duration}</dd></div>
              <div><dt className="text-slate-500">Status</dt><dd><Badge variant="green">{course.status}</Badge></dd></div>
              <div><dt className="text-slate-500">Students</dt><dd>{course.student_count}</dd></div>
            </dl>
          </Card>
          <Link
            to={`/classroom/${id}`}
            className="block w-full text-center py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700"
          >
            Go to Classroom
          </Link>
        </div>
      </div>
    </div>
  )
}