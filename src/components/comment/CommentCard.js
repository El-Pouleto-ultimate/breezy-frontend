// CommentCard.jsx
// Affiche un commentaire et ses réponses imbriquées (Fx7, Fx8).
//
// Props :
//   comment : objet { _id, author, content, createdAt, replies: [] }
//   postId  : ID du post parent (pour les réponses)

import { useState } from "react";
import { timeAgo } from "../../utils/formatDate";
import { replyToComment } from "../../services/commentService";
import Avatar from "../ui/Avatar";
import Button from "../ui/Button";

export default function CommentCard({ comment, postId }) {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [replies, setReplies] = useState(comment.replies || []);
  const [loading, setLoading] = useState(false);

  // Soumet une réponse à ce commentaire (Fx8)
  async function handleReply(e) {
    e.preventDefault();
    if (!replyContent.trim() || loading) return;
    setLoading(true);
    try {
      const newReply = await replyToComment(postId, comment._id, { content: replyContent });
      setReplies((prev) => [...prev, newReply]);
      setReplyContent("");
      setShowReplyBox(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex gap-2.5">
      <Avatar src={comment.author?.avatar} username={comment.author?.username} size="sm" />

      <div className="flex-1">
        {/* En-tête auteur + date */}
        <div className="flex items-baseline gap-1.5">
          <span className="text-sm font-medium text-breezy-dark">{comment.author?.username}</span>
          <span className="text-xs text-breezy-muted">· {timeAgo(comment.createdAt)}</span>
        </div>

        {/* Contenu */}
        <p className="text-sm text-breezy-dark mt-0.5">{comment.content}</p>

        {/* Lien "Répondre" */}
        <button
          onClick={() => setShowReplyBox((v) => !v)}
          className="text-xs text-breezy-muted hover:text-breezy-dark mt-1 underline-offset-2 hover:underline"
        >
          Répondre
        </button>

        {/* Formulaire de réponse (Fx8) */}
        {showReplyBox && (
          <form onSubmit={handleReply} className="flex gap-2 mt-2">
            <input
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Ta réponse..."
              className="flex-1 bg-white border border-breezy-border rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-breezy-dark"
            />
            <Button type="submit" size="sm" disabled={!replyContent.trim()} loading={loading}>
              Envoyer
            </Button>
          </form>
        )}

        {/* Réponses imbriquées */}
        {replies.length > 0 && (
          <div className="mt-3 flex flex-col gap-2 pl-3 border-l-2 border-breezy-border">
            {replies.map((reply) => (
              <div key={reply._id} className="flex gap-2">
                <Avatar src={reply.author?.avatar} username={reply.author?.username} size="sm" />
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs font-medium text-breezy-dark">{reply.author?.username}</span>
                    <span className="text-xs text-breezy-muted">· {timeAgo(reply.createdAt)}</span>
                  </div>
                  <p className="text-xs text-breezy-dark">{reply.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
