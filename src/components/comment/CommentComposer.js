// CommentComposer.jsx
// Zone de saisie d'un commentaire (Fx7).
// Wireframe : "Votre réponse :" + textarea + bouton "Publier"
//
// Props :
//   postId      : ID du post sur lequel on commente
//   onCommented : function(newComment) — callback après publication

import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { createComment } from "../../services/commentService";
import Avatar from "../ui/Avatar";
import Button from "../ui/Button";

export default function CommentComposer({ postId, onCommented }) {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!content.trim() || loading) return;
    setLoading(true);
    setError("");
    try {
      const newComment = await createComment(postId, { content });
      setContent("");
      if (onCommented) onCommented(newComment);
    } catch {
      setError("Impossible de publier le commentaire.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 items-start">
      <Avatar src={user?.avatar} username={user?.username} size="sm" />
      <div className="flex-1 flex flex-col gap-2">
        <label className="text-xs font-medium text-breezy-muted">Votre réponse :</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="écrire ici"
          rows={2}
          disabled={loading}
          className="
            w-full resize-none bg-white border border-breezy-border rounded-lg
            px-3 py-2 text-sm placeholder:text-breezy-muted
            focus:outline-none focus:ring-2 focus:ring-breezy-dark
          "
        />
        {error && <p className="text-xs text-red-600">{error}</p>}
        <div className="flex justify-end">
          <Button type="submit" size="sm" disabled={!content.trim()} loading={loading}>
            Publier
          </Button>
        </div>
      </div>
    </form>
  );
}
