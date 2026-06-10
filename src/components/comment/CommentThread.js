// CommentThread.jsx
// Modal overlay affichant le post original + ses commentaires (Fx7).
// Wireframe de référence : Commentaire_1.png
// Le fond est grisé, le post est visible en haut, le composer en bas.
//
// Props :
//   post    : objet post complet
//   isOpen  : boolean
//   onClose : function

import { useComments } from "../../hooks/useComments";
import Modal from "../ui/Modal";
import Spinner from "../ui/Spinner";
import Avatar from "../ui/Avatar";
import CommentCard from "./CommentCard";
import CommentComposer from "./CommentComposer";
import { timeAgo } from "../../utils/formatDate";

export default function CommentThread({ post, isOpen, onClose }) {
  const { comments, loading, error, addComment } = useComments(isOpen ? post._id : null);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Commentaires">
      {/* Post original affiché en haut de la modal (wireframe Commentaire_1) */}
      <div className="flex gap-3 pb-4 border-b border-breezy-border mb-4">
        <Avatar src={post.author?.avatar} username={post.author?.username} size="md" />
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-semibold text-breezy-dark">{post.author?.username}</span>
            <span className="text-xs text-breezy-muted">@{post.author?.username}</span>
            <span className="text-xs text-breezy-muted">· {timeAgo(post.createdAt)}</span>
          </div>
          <p className="text-sm text-breezy-dark mt-1 leading-relaxed">{post.content}</p>
        </div>
      </div>

      {/* Liste des commentaires existants */}
      <div className="flex flex-col gap-4 max-h-64 overflow-y-auto mb-4">
        {loading && (
          <div className="flex justify-center py-4"><Spinner /></div>
        )}
        {error && (
          <p className="text-sm text-breezy-muted text-center">{error}</p>
        )}
        {!loading && comments.length === 0 && (
          <p className="text-sm text-breezy-muted text-center py-4">
            Aucun commentaire. Sois le premier !
          </p>
        )}
        {comments.map((comment) => (
          <CommentCard key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>

      {/* Zone de rédaction d'un nouveau commentaire */}
      <div className="border-t border-breezy-border pt-4">
        <CommentComposer postId={post._id} onCommented={addComment} />
      </div>
    </Modal>
  );
}
