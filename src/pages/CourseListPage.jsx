import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApi } from '../hooks/useApi'
import { usePagination } from '../hooks/usePagination'
import { useDebounce } from '../hooks/useDebounce'
import SearchInput from '../components/SearchInput'
import DataTable from '../components/DataTable'
import Badge from '../components/Badge'
import ErrorState from '../components/ErrorState'

export default function CourseListPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)
  const { page, pageSize, setPage, paginationParams } = usePagination()

  const { data, loading, error } = useApi('/courses/', {
    params: { ...paginationParams, search: debouncedSearch },
  })

  const columns = [
    { field: 'title', header: 'Course', sortable: true, render: (row) => (
      <div className="font-medium text-slate-800">{row.title}</div>
    )},
    { field: 'instructor', header: 'Instructor', render: (row) => row.instructor_name || '—' },
    { field: 'status', header: 'Status', render: (row) => (
      <Badge variant={row.status === 'active' ? 'green' : 'slate'}>{row.status}</Badge>
    )},
    { field: 'duration', header: 'Duration' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">📚 Courses</h2>
          <p className="text-slate-500 text-sm mt-1">Browse all available courses.</p>
        </div>
        <SearchInput value={search} onChange={setSearch} placeholder="Search courses..." />
      </div>

      {error ? (
        <ErrorState message={error} />
      ) : (
        <DataTable
          columns={columns}
          data={data?.results ?? []}
          loading={loading}
          onRowClick={(row) => navigate(`/courses/${row.id}`)}
          page={page}
          pageSize={pageSize}
          total={data?.count ?? 0}
          onPageChange={setPage}
          emptyMessage="No courses found"
        />
      )}
    </div>
  )
}