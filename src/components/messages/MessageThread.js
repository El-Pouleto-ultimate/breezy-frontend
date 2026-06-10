// MessageThread.jsx
// Affiche le fil de messages d'une conversation (Fx17).
//
// Props :
//   messages  : tableau de messages { id, content, senderId, createdAt }
//   currentUserId : ID de l'utilisateur connecté (pour aligner gauche/droite)

import { useEffect, useRef } from "react";
import { timeAgo } from "../../utils/formatDate";

export default function MessageThread({ messages, currentUserId }) {
  const bottomRef = useRef(null);

  // Scroll automatique vers le dernier message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-sm text-breezy-muted">
        Commence la conversation !
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto flex flex-col gap-2 p-4">
      {messages.map((msg) => {
        const isOwn = msg.senderId === currentUserId;
        return (
          <div
            key={msg.id}
            className={`flex flex-col max-w-xs ${isOwn ? "self-end items-end" : "self-start items-start"}`}
          >
            <div className={`px-3 py-2 rounded-xl text-sm ${isOwn ? "bg-breezy-dark text-white" : "bg-breezy-card border border-breezy-border text-breezy-dark"}`}>
              {msg.content}
            </div>
            <span className="text-[10px] text-breezy-muted mt-0.5">{timeAgo(msg.createdAt)}</span>
          </div>
        );
      })}
      {/* Ancre invisible pour le scroll auto */}
      <div ref={bottomRef} />
    </div>
  );
}
