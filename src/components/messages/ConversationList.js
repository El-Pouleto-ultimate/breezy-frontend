// ConversationList.jsx
// Liste les conversations de l'utilisateur dans la page Messages (Fx17).
//
// Props :
//   conversations      : tableau de conversations
//   activeId           : ID de la conversation active
//   onSelectConversation : function(conversation)

import Avatar from "../ui/Avatar";
import { timeAgo } from "../../utils/formatDate";

export default function ConversationList({ conversations, activeId, onSelectConversation }) {
  if (conversations.length === 0) {
    return (
      <div className="p-4 text-sm text-breezy-muted">
        Aucune conversation.
      </div>
    );
  }

  return (
    <div className="flex flex-col border-r border-breezy-border h-full overflow-y-auto">
      {conversations.map((conv) => (
        <button
          key={conv.id}
          onClick={() => onSelectConversation(conv)}
          className={`
            flex gap-3 items-center p-3 text-left hover:bg-breezy-card transition-colors
            ${activeId === conv.id ? "bg-breezy-card" : ""}
          `}
        >
          <Avatar src={conv.otherUser?.avatar} username={conv.otherUser?.username} size="sm" />
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-baseline">
              <span className="text-sm font-medium text-breezy-dark truncate">
                {conv.otherUser?.username}
              </span>
              <span className="text-[10px] text-breezy-muted ml-2 flex-shrink-0">
                {conv.lastMessage ? timeAgo(conv.lastMessage.createdAt) : ""}
              </span>
            </div>
            <p className="text-xs text-breezy-muted truncate">
              {conv.lastMessage?.content || "Aucun message"}
            </p>
          </div>
          {/* Indicateur non lu */}
          {conv.unreadCount > 0 && (
            <span className="bg-breezy-dark text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0">
              {conv.unreadCount}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
