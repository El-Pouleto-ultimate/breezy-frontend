import Avatar from '@/components/ui/Avatar'
import { timeAgo } from '@/utils/formatDate'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function HeartIcon() { return <svg viewBox="0 0 24 24" className="w-5 h-5 fill-breezy-like"><path d="M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z" /></svg> }
function PersonIcon() { return <svg viewBox="0 0 24 24" className="w-5 h-5 fill-breezy-dark"><path d="M17.863 13.44c1.477 1.58 2.366 3.67 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.79 1.155-4.88 2.632-6.46C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44zM12 2C9.791 2 8 3.79 8 6s1.791 4 4 4 4-1.79 4-4-1.791-4-4-4z" /></svg> }
function MentionIcon() { return <svg viewBox="0 0 24 24" className="w-5 h-5 fill-breezy-primary"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10h5v-2h-5c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8v1.5c0 .827-.673 1.5-1.5 1.5S17 13.327 17 12.5V8h-2v.341C14.457 7.815 13.259 7.5 12 7.5c-2.481 0-4.5 2.019-4.5 4.5s2.019 4.5 4.5 4.5c1.396 0 2.649-.606 3.527-1.565C15.98 15.868 16.697 16 17.5 16c1.93 0 3.5-1.57 3.5-3.5V12c0-5.514-4.486-10-10-10zm0 13c-1.378 0-2.5-1.122-2.5-2.5S10.622 10 12 10s2.5 1.122 2.5 2.5S13.378 15 12 15z" /></svg> }

const TYPE_MAP = {
  like: { icon: HeartIcon, label: 'a aimé votre Breez' },
  follow: { icon: PersonIcon, label: 'a commencé à vous suivre' },
  mention: { icon: MentionIcon, label: 'vous a mentionné dans un Breez' },
}

export default function NotificationItem({ notif, onClick }) {
  const { icon: Icon, label } = TYPE_MAP[notif.type] || { icon: HeartIcon, label: 'action' }
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