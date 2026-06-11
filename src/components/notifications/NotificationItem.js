// NotificationItem.jsx
// Affiche une notification individuelle (Fx14 mention, Fx15 like, Fx16 follow).
//
// Props :
//   notification : {
//     id, type: "mention"|"like"|"follow",
//     actor: { username, avatar },
//     postContent, read, createdAt
//   }

import { timeAgo } from "../../utils/formatDate";
import Avatar from "../ui/Avatar";

// Icônes selon le type de notification
const TYPE_CONFIG = {
  mention: { icon: "@", label: "t'a mentionné" },
  like:    { icon: "♥", label: "a aimé ton post" },
  follow:  { icon: "＋", label: "te suit maintenant" },
};

export default function NotificationItem({ notification }) {
  const config = TYPE_CONFIG[notification.type] || { icon: "•", label: "action" };

  return (
    <div className={`flex gap-3 p-3 rounded-lg transition-colors ${notification.read ? "" : "bg-breezy-card border border-breezy-border"}`}>
      {/* Avatar de l'acteur */}
      <div className="relative flex-shrink-0">
        <Avatar src={notification.actor?.avatar} username={notification.actor?.username} size="sm" />
        {/* Badge type */}
        <span className="absolute -bottom-0.5 -right-0.5 text-[9px] bg-white border border-breezy-border rounded-full w-4 h-4 flex items-center justify-center">
          {config.icon}
        </span>
      </div>

      {/* Texte */}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-breezy-dark">
          <strong>{notification.actor?.username}</strong>{" "}
          <span className="text-breezy-muted">{config.label}</span>
        </p>
        {notification.postContent && (
          <p className="text-xs text-breezy-muted mt-0.5 truncate">
            "{notification.postContent}"
          </p>
        )}
        <p className="text-xs text-breezy-muted mt-0.5">{timeAgo(notification.createdAt)}</p>
      </div>

      {/* Point rouge si non lu */}
      {!notification.read && (
        <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0 mt-1" aria-label="Non lu" />
      )}
    </div>
  );
}
