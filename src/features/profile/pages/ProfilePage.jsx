// src/pages/ProfilePage.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '@shared/components/ui/Avatar'
import Badge from '@shared/components/ui/Badge'
import Card, { CardTitle, CardBody } from '@shared/components/ui/Card'
import ProgressBar from '@shared/components/ui/ProgressBar'
import Skeleton from '@shared/components/ui/Skeleton'
import ErrorState from '@shared/components/ui/ErrorState'
import EmptyState from '@shared/components/ui/EmptyState'
import { useProfile } from '@features/profile/hooks/useProfile'

export default function ProfilePage() {
  const { profile, loading, error, refetch } = useProfile()

  // For demonstration only – a real app would open a modal or navigate to edit page
  const [isEditing, setIsEditing] = useState(false)

  // Loading state
  if (loading) {
    return (
      <div className="space-y-7">
        <div className="flex items-center gap-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton.Card />
            <Skeleton.Card />
          </div>
          <div className="space-y-6">
            <Skeleton.Card />
            <Skeleton.Card />
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-800">👤 Profile</h2>
        <ErrorState message={error} onRetry={refetch} />
      </div>
    )
  }

  // Empty state (shouldn’t happen if dummy data exists, but just in case)
  if (!profile) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-800">👤 Profile</h2>
        <EmptyState icon="👤" title="No profile found" message="Try again later." />
      </div>
    )
  }

  return (
    <div className="space-y-7">
      {/* Header with avatar and basic info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <Avatar
          src={profile.avatar}
          name={profile.name}
          size="xl"
          className="ring-4 ring-purple-100"
        />
        <div>
          <h2 className="text-2xl font-bold text-slate-800">{profile.name}</h2>
          <p className="text-slate-500 text-sm mt-1">{profile.email}</p>
          {profile.bio && (
            <p className="text-slate-600 text-sm mt-2 max-w-md">{profile.bio}</p>
          )}
          <div className="flex gap-3 mt-3">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 text-sm font-medium bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
            >
              Edit profile
            </button>
            <Link
              to="/settings"
              className="px-4 py-2 text-sm font-medium border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Account settings
            </Link>
          </div>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column – details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal information */}
          <Card>
            <CardTitle>Personal Information</CardTitle>
            <CardBody>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <InfoRow label="Full name" value={profile.name} />
                <InfoRow label="Email" value={profile.email} />
                <InfoRow label="Phone" value={profile.phone} />
                <InfoRow label="Date of birth" value={profile.date_of_birth} />
                <InfoRow label="Address" value={profile.address} />
                <InfoRow label="Education" value={profile.education} />
                <InfoRow
                  label="Member since"
                  value={new Date(profile.enrolled_since).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                  })}
                />
              </div>
            </CardBody>
          </Card>

          {/* Skills */}
          {profile.skills && profile.skills.length > 0 && (
            <Card>
              <CardTitle>Skills</CardTitle>
              <CardBody>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill) => (
                    <Badge key={skill} variant="purple">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardBody>
            </Card>
          )}

          {/* Quick stats */}
          <Card>
            <CardTitle>Academic Summary</CardTitle>
            <CardBody>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <StatBox label="CGPA" value={profile.cgpa} />
                <StatBox label="Courses" value={profile.total_courses} />
                <StatBox label="Completed" value={profile.completed_courses} />
                <StatBox label="Attendance" value={`${profile.attendance_percentage}%`} />
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Right column – progress and quick links */}
        <div className="space-y-6">
          {/* Completion progress */}
          {profile.total_courses > 0 && (
            <Card>
              <CardTitle>Overall Progress</CardTitle>
              <CardBody>
                <ProgressBar
                  value={Math.round((profile.completed_courses / profile.total_courses) * 100)}
                  label="Courses completed"
                />
                <div className="mt-4">
                  <ProgressBar
                    value={profile.attendance_percentage}
                    label="Attendance"
                    color="green"
                  />
                </div>
              </CardBody>
            </Card>
          )}

          {/* Quick links */}
          <Card>
            <CardTitle>Quick Links</CardTitle>
            <CardBody>
              <nav className="space-y-2 text-sm">
                <LinkItem to="/my-courses" label="My Courses" />
                <LinkItem to="/grades" label="Grades" />
                <LinkItem to="/assignments" label="Assignments" />
                <LinkItem to="/attendance" label="Attendance" />
                <LinkItem to="/schedule" label="Schedule" />
                <LinkItem to="/bookmarks" label="Bookmarks" />
              </nav>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Fake editing indicator (for demonstration only) */}
      {isEditing && (
        <div className="fixed bottom-4 right-4 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-lg text-sm font-medium">
          📝 Edit mode active (not functional yet – backend integration required)
        </div>
      )}
    </div>
  )
}

// Small helper components for cleaner markup
function InfoRow({ label, value }) {
  return (
    <div>
      <dt className="text-xs text-slate-400 uppercase tracking-wider">{label}</dt>
      <dd className="mt-1 font-medium text-slate-700">{value || '—'}</dd>
    </div>
  )
}

function StatBox({ label, value }) {
  return (
    <div className="bg-slate-50 rounded-xl p-3 text-center">
      <p className="text-2xl font-bold text-slate-800">{value}</p>
      <p className="text-xs text-slate-500 mt-1">{label}</p>
    </div>
  )
}

function LinkItem({ to, label }) {
  return (
    <Link
      to={to}
      className="block py-2 px-3 -mx-3 rounded-lg text-slate-600 hover:bg-purple-50 hover:text-purple-700 transition-colors"
    >
      {label}
    </Link>
  )
}