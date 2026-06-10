// PostActions.jsx
// Barre d'actions sous chaque post : commenter · partager · liker (Fx6).
// Wireframe : icônes 💬 🔁 ♡ en bas de chaque card.
// Le cœur devient rouge quand l'utilisateur a liké (wireframe Like_1).
//
// Props :
//   post      : objet post complet
//   onComment : function() — ouvre le thread de commentaires
//   onUpdate  : function(updatedPost) — callback après like

import { useLike } from "../../hooks/useLike";

// Icônes SVG inline
function CommentIcon() { return <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>; }
function RetweetIcon() { return <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>; }
function HeartIcon({ filled }) {
  return filled
    ? <svg className="w-4 h-4 fill-red-500 stroke-red-500" strokeWidth="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
    : <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>;
}

export default function PostActions({ post, onComment, onUpdate }) {
  const { liked, likesCount, handleLike } = useLike(post, onUpdate);

  return (
    <div className="flex items-center gap-4 pt-2 border-t border-breezy-border mt-2">
      {/* Commenter */}
      <button
        onClick={onComment}
        className="flex items-center gap-1.5 text-breezy-muted hover:text-breezy-dark transition-colors text-xs"
        aria-label="Commenter"
      >
        <CommentIcon />
        <span>{post.commentsCount || 0}</span>
      </button>

      {/* Partager / Retweet */}
      <button
        className="flex items-center gap-1.5 text-breezy-muted hover:text-breezy-dark transition-colors text-xs"
        aria-label="Partager"
      >
        <RetweetIcon />
      </button>

      {/* Liker — cœur rouge si liké (Fx6) */}
      <button
        onClick={handleLike}
        className={`flex items-center gap-1.5 transition-colors text-xs ${
          liked ? "text-red-500" : "text-breezy-muted hover:text-red-400"
        }`}
        aria-label={liked ? "Retirer le like" : "Liker"}
        aria-pressed={liked}
      >
        <HeartIcon filled={liked} />
        <span>{likesCount}</span>
      </button>
    </div>
  );
}
