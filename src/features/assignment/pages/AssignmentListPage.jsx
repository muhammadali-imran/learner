import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAssignments } from '@features/assignment/hooks/useAssignments'
import DataTable from '@shared/components/ui/DataTable'
import SearchInput from '@shared/components/ui/SearchInput'
import Badge from '@shared/components/ui/Badge'
import ErrorState from '@shared/components/ui/ErrorState'

const STATUS_TABS = ['all', 'pending', 'submitted', 'graded', 'overdue']
const STATUS_VARIANT = { pending: 'amber', submitted: 'blue', graded: 'green', overdue: 'red' }

export default function AssignmentListPage() {
  const navigate = useNavigate()
  const [status, setStatus] = useState('all')
  const { data, loading, error, refetch, search, setSearch, page, pageSize, setPage } = useAssignments()

  const columns = [
    { field: 'title', header: 'Assignment', sortable: true,
      render: (r) => (
        <div>
          <p className="font-medium text-slate-800">{r.title}</p>
          <p className="text-xs text-slate-400 mt-0.5">{r.course_title}</p>
        </div>
      )},
    { field: 'due_date', header: 'Due Date', sortable: true,
      render: (r) => (
        <span className={`text-sm ${r.is_overdue ? 'text-red-600 font-medium' : 'text-slate-500'}`}>
          {r.due_date}
        </span>
      )},
    { field: 'max_grade', header: 'Marks',
      render: (r) => <span className="text-slate-500">{r.grade != null ? `${r.grade}/${r.max_grade}` : `/${r.max_grade}`}</span> },
    { field: 'status', header: 'Status',
      render: (r) => <Badge variant={STATUS_VARIANT[r.status] || 'slate'}>{r.status}</Badge> },
  ]

  if (error) return <ErrorState message={error} onRetry={refetch} />

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">📝 Assignments</h2>
          <p className="text-slate-500 text-sm mt-1">Pending and submitted assignments.</p>
        </div>
        <SearchInput value={search} onChange={setSearch} placeholder="Search assignments…" />
      </div>

      <div className="flex gap-2 flex-wrap">
        {STATUS_TABS.map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors
              ${status === s ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            {s}
          </button>
        ))}
      </div>

      <DataTable
        columns={columns}
        data={(data?.results ?? []).filter(r => status === 'all' || r.status === status)}
        loading={loading}
        onRowClick={(r) => navigate(`/assignments/${r.id}`)}
        page={page}
        pageSize={pageSize}
        total={data?.count ?? 0}
        onPageChange={setPage}
        emptyMessage="No assignments found."
      />
    </div>
  )
}