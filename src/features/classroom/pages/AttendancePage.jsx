// src/pages/AttendancePage.jsx
import { useAttendance } from '@features/classroom/hooks/useAttendance'
import DataTable from '@shared/components/ui/DataTable'
import Badge from '@shared/components/ui/Badge'
import ErrorState from '@shared/components/ui/ErrorState'
import PageHeader from '@shared/components/layout/PageHeader'

export default function AttendancePage() {
  const { data, loading, error, refetch, page, pageSize, setPage } = useAttendance()

  const columns = [
    { field: 'course_title', header: 'Course', render: r => <span className="font-medium">{r.course_title}</span> },
    { field: 'total_classes', header: 'Total' },
    { field: 'attended', header: 'Attended' },
    { field: 'percentage', header: 'Percentage', render: r => {
      const pct = r.percentage ?? 0
      const variant = pct >= 75 ? 'green' : pct >= 50 ? 'amber' : 'red'
      return <Badge variant={variant}>{pct}%</Badge>
    }},
  ]

  if (error) return <ErrorState message={error} onRetry={refetch} />

  return (
    <div className="space-y-6">
      <PageHeader icon="✅" title="Attendance" description="Your attendance record per course." />
      <DataTable
        columns={columns}
        data={data?.results ?? []}
        loading={loading}
        page={page}
        pageSize={pageSize}
        total={data?.count ?? 0}
        onPageChange={setPage}
        emptyMessage="No attendance data yet."
      />
    </div>
  )
}