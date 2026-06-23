import Avatar from '@/components/ui/Avatar'
import { Heart, User, AtSign } from 'lucide-react'
import { timeAgo } from '@/utils/formatDate'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const TYPE_MAP = {
  like: { icon: () => <Heart size={16} fill="#F91880" color="#F91880" />, label: 'a aimé votre Breez' },
  follow: { icon: () => <User size={16} />, label: 'a commencé à vous suivre' },
  mention: { icon: () => <AtSign size={16} />, label: 'vous a mentionné dans un Breez' },
}

export default function NotificationItem({ notif, onClick }) {
  const { icon: Icon, label } = TYPE_MAP[notif.type] || { icon: () => <Heart size={16} fill="#F91880" color="#F91880" />, label: 'action' }
  const router = useRouter()

  function handleClick(e) {
    if (e.target.closest('a')) return // ne pas naviguer deux fois si on clique sur un lien
    if (onClick) onClick(notif)
    if (notif.type === 'follow') {
      router.push(`/profile/${notif.actors[0]._id}`)
    } else if (notif.actors?.[0]?._id) {
      router.push(`/profile/${notif.actors[0]._id}`)
    }
  }

  return (
    <div onClick={handleClick} className={`flex gap-3 px-4 py-3 border-b border-breezy-border hover:bg-breezy-hover transition-colors cursor-pointer ${!notif.read ? 'bg-blue-50/30' : ''}`}>
      {/* Left icon */}
      <div className="flex flex-col items-center pt-1 w-8 flex-shrink-0">
        <Icon />
      </div>

      <div className="flex-1 min-w-0">
        {/* Avatars cliquables */}
        <div className="flex gap-1.5 flex-wrap mb-1">
          {notif.actors?.map(a => (
            <Link key={a._id} href={`/profile/${a._id}`} onClick={e => e.stopPropagation()}>
              <Avatar src={a.avatar} username={a.username} size="sm" />
            </Link>
          ))}
        </div>

        {/* Texte avec noms cliquables */}
        <p className="text-sm text-breezy-dark">
          <Link
            href={`/profile/${notif.actors?.[0]?._id}`}
            onClick={e => e.stopPropagation()}
            className="font-bold hover:underline"
          >
            {notif.actors?.[0]?.username}
          </Link>
          {notif.actors?.length > 1 && (
            <span> et <strong>{notif.actors.length - 1} autres</strong></span>
          )}
          {' '}{label}
        </p>

        {notif.preview && (
          <p className="text-sm text-breezy-muted mt-0.5 line-clamp-2">"{notif.preview}"</p>
        )}
        <p className="text-xs text-breezy-muted mt-0.5">{timeAgo(notif.createdAt)}</p>
      </div>

      {!notif.read && <div className="w-2 h-2 bg-breezy-primary rounded-full mt-1.5 flex-shrink-0" />}
    </div>
  )
}