import Avatar from '@/components/ui/Avatar'
import { timeAgo } from '@/utils/formatDate'

export default function MessageThread({ messages, currentUserId }) {
  if (messages.length === 0) return (
    <div className="flex-1 flex items-center justify-center p-6">
      <p className="text-sm text-breezy-muted">Envoie le premier message !</p>
    </div>
  )

  return (
    <div className="flex-1 overflow-y-auto flex flex-col gap-3 p-4">
      {messages.map(msg => {
        const isMe = msg.senderId === currentUserId
        return (
          <div key={msg._id} className={`flex items-end gap-2 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
            {!isMe && <Avatar src={msg.sender?.avatar} username={msg.sender?.username} size="xs" />}
            <div className={`max-w-[70%] rounded-2xl px-3.5 py-2 text-sm ${isMe ? 'bg-breezy-primary text-white rounded-br-sm' : 'bg-breezy-bg text-breezy-dark rounded-bl-sm'}`}>
              <p>{msg.content}</p>
              <p className={`text-[10px] mt-0.5 ${isMe ? 'text-white/70' : 'text-breezy-muted'} text-right`}>
                {timeAgo(msg.createdAt)}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
