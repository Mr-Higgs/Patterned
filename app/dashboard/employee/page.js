import ActiveShifts from '../../dashboard/components/ActiveShifts'
import BulletinMessages from '../../dashboard/components/BulletinMessages'
import UserMetrics from '../../dashboard/components/UserMetrics'
import FavoriteEmployers from '../../dashboard/components/FavoriteEmployers'


export default function DashboardPage() {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold text-gray-900">Employee!</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ActiveShifts />
        <BulletinMessages />
      </div>
      <UserMetrics />
      <FavoriteEmployers />
    </div>
  )
}

