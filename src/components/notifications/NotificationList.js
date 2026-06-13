import NotificationItem from './NotificationItem'
import Spinner from '@/components/ui/Spinner'
import Button from '@/components/ui/Button'

export default function NotificationList({ notifications, loading, onReadAll }) {
  if (loading) return (
    <div className="flex justify-center py-12"><Spinner size="lg" /></div>
  )
  if (notifications.length === 0) return (
    <div className="flex flex-col items-center py-16 gap-2">
      <p className="text-xl font-bold text-breezy-dark">Aucune notification</p>
      <p className="text-breezy-muted text-sm text-center px-8">
        Quand quelqu'un interagira avec tes posts, tu le verras ici.
      </p>
    </div>
  )

  const hasUnread = notifications.some(n => !n.read)

  return (
    <div>
      {hasUnread && (
        <div className="flex justify-end px-4 py-2 border-b border-breezy-border">
          <button onClick={onReadAll} className="text-sm text-breezy-primary font-medium hover:underline">
            Tout marquer comme lu
          </button>
        </div>
      )}
      {notifications.map(n => (
        <NotificationItem key={n._id} notif={n} />
      ))}
    </div>
  )
}
