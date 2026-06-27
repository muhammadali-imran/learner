// src/pages/GradesPage.jsx
import { useApi } from '../hooks/useApi'
import { usePagination } from '../hooks/usePagination'
import DataTable from '../components/DataTable'
import Badge from '../components/Badge'
import ErrorState from '../components/ErrorState'
import PageHeader from '../components/PageHeader'

export default function GradesPage() {
  const { page, pageSize, setPage, paginationParams } = usePagination()
  const { data, loading, error, refetch } = useApi('/grades/', { params: paginationParams })

  const gradeVariant = (g) => {
    if (g >= 80) return 'green'
    if (g >= 60) return 'blue'
    if (g >= 50) return 'amber'
    return 'red'
  }

  const columns = [
    { field: 'course_title', header: 'Course', render: r => <span className="font-medium">{r.course_title}</span> },
    { field: 'grade', header: 'Grade', render: r => <Badge variant={gradeVariant(r.grade)}>{r.grade}%</Badge> },
    { field: 'letter', header: 'Letter' },
    { field: 'remarks', header: 'Remarks', render: r => <span className="text-xs">{r.remarks || '—'}</span> },
  ]

  if (error) return <ErrorState message={error} onRetry={refetch} />

  return (
    <div className="space-y-6">
      <PageHeader icon="📊" title="Grades" description="Your grades and GPA across all courses." />
      <DataTable
        columns={columns}
        data={data?.results ?? []}
        loading={loading}
        page={page}
        pageSize={pageSize}
        total={data?.count ?? 0}
        onPageChange={setPage}
        emptyMessage="No grades available."
      />
    </div>
  )
}