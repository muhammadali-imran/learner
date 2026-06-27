import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApi } from '../hooks/useApi'
import { usePagination } from '../hooks/usePagination'
import { useDebounce } from '../hooks/useDebounce'
import DataTable from '../components/DataTable'
import SearchInput from '../components/SearchInput'
import Badge from '../components/Badge'
import ErrorState from '../components/ErrorState'

export default function LectureHistory() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState('desc')
  const debouncedSearch = useDebounce(search, 300)
  const { page, pageSize, setPage, paginationParams } = usePagination()

  const { data, loading, error, refetch } = useApi('/lecture-history/', {
    params: { ...paginationParams, search: debouncedSearch || undefined, ordering: `${sortOrder === 'desc' ? '-' : ''}${sortBy}` },
  })

  const columns = [
    { field: 'title', header: 'Lecture', sortable: true,
      render: (r) => <span className="font-medium text-slate-800">{r.title}</span> },
    { field: 'course', header: 'Course',
      render: (r) => <span className="text-slate-600">{r.course_title}</span> },
    { field: 'date', header: 'Date', sortable: true,
      render: (r) => <span className="text-slate-500 text-xs">{r.date}</span> },
    { field: 'duration', header: 'Duration',
      render: (r) => <span className="text-slate-500 text-xs">{r.duration}</span> },
    { field: 'watched', header: 'Status',
      render: (r) => <Badge variant={r.watched ? 'green' : 'slate'}>{r.watched ? 'Watched' : 'Partial'}</Badge> },
  ]

  if (error) return <ErrorState message={error} onRetry={refetch} />

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">📼 Lecture History</h2>
          <p className="text-slate-500 text-sm mt-1">All lectures you've attended or watched.</p>
        </div>
        <SearchInput value={search} onChange={setSearch} placeholder="Search lectures…" />
      </div>

      <DataTable
        columns={columns}
        data={data?.results ?? []}
        loading={loading}
        onRowClick={(r) => navigate(`/lectures/${r.id}`)}
        page={page}
        pageSize={pageSize}
        total={data?.count ?? 0}
        onPageChange={setPage}
        onSort={(field, order) => { setSortBy(field); setSortOrder(order) }}
        sortBy={sortBy}
        sortOrder={sortOrder}
        emptyMessage="No lecture history yet."
      />
    </div>
  )
}