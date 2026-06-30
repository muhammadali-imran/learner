// src/pages/Settings.jsx
import useTheme from '@shared/hooks/useTheme'
import useSidebar from '@shared/hooks/useSidebar'
import { Link } from 'react-router-dom'
import Card, { CardTitle, CardBody } from '@shared/components/ui/Card'
import PageHeader from '@shared/components/layout/PageHeader'

export default function Settings() {
  const { theme, toggleTheme } = useTheme()
  const { open, toggle } = useSidebar()

  return (
    <div className="space-y-6">
      <PageHeader icon="⚙️" title="Settings" description="Manage your account preferences." />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardTitle>Appearance</CardTitle>
          <CardBody>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-700">Dark mode</span>
              <button
                onClick={toggleTheme}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  theme === 'dark' ? 'bg-purple-600' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardTitle>Sidebar</CardTitle>
          <CardBody>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-700">Default open</span>
              <button
                onClick={toggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  open ? 'bg-purple-600' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    open ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardTitle>Account</CardTitle>
          <CardBody className="space-y-2">
            <Link to="/profile" className="block text-sm text-purple-600 hover:underline">Edit profile</Link>
            <Link to="/privacy" className="block text-sm text-purple-600 hover:underline">Privacy Policy</Link>
            <Link to="/terms" className="block text-sm text-purple-600 hover:underline">Terms of Service</Link>
          </CardBody>
        </Card>

        <Card>
          <CardTitle>Danger Zone</CardTitle>
          <CardBody>
            <p className="text-sm text-slate-500 mb-3">Delete your account and all data. This action cannot be undone.</p>
            <button className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-xl hover:bg-red-700">
              Delete account
            </button>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}