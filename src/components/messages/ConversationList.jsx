import Avatar from '@/components/ui/Avatar'
import { timeAgo } from '@/utils/formatDate'

export default function ConversationList({ conversations, activeId, onSelectConversation }) {
  if (conversations.length === 0) return (
    <div className="flex flex-col items-center py-10 gap-2 px-4">
      <p className="text-sm font-bold text-breezy-dark">Aucun message</p>
      <p className="text-xs text-breezy-muted text-center">Commence une conversation !</p>
    </div>
  )

  return (
    <div>
      {conversations.map(conv => (
        <button
          key={conv.id}
          onClick={() => onSelectConversation(conv)}
          className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-breezy-hover transition-colors border-b border-breezy-border text-left ${activeId === conv.id ? 'bg-breezy-bg' : ''}`}
        >
          <Avatar src={conv.otherUser?.avatar} username={conv.otherUser?.username} size="md" />
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-baseline">
              <span className="font-bold text-sm text-breezy-dark truncate">{conv.otherUser?.username}</span>
              <span className="text-xs text-breezy-muted ml-2 flex-shrink-0">{timeAgo(conv.lastMessageAt)}</span>
            </div>
            <p className="text-sm text-breezy-muted truncate mt-0.5">{conv.lastMessage}</p>
          </div>
          {conv.unread && <div className="w-2.5 h-2.5 bg-breezy-primary rounded-full flex-shrink-0" />}
        </button>
      ))}
    </div>
  )
}
