// PostComposer.jsx
// Zone de rédaction et publication d'un post (Fx3).
// Wireframe : "Comment ça va ?" + textarea + bouton "Publier"
// Limite : 280 caractères (charsLeft affiché en bas à gauche).
//
// Props :
//   onPostCreated : function(newPost) — appelée après publication réussie

import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { createPost } from "../../services/postService";
import { charsLeft, isWithinLimit } from "../../utils/truncate";
import Avatar from "../ui/Avatar";
import Button from "../ui/Button";

export default function PostComposer({ onPostCreated }) {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const remaining = charsLeft(content);
  const isOver    = remaining < 0;       // dépassement de la limite
  const isEmpty   = !content.trim();

  async function handlePublish() {
    if (isEmpty || isOver || loading) return;
    setLoading(true);
    setError("");
    try {
      const newPost = await createPost({ content });
      setContent(""); // vide le textarea après publication
      if (onPostCreated) onPostCreated(newPost);
    } catch {
      setError("Impossible de publier. Réessaie.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-breezy-card border border-breezy-border rounded-xl p-4 flex gap-3">
      {/* Avatar de l'utilisateur connecté */}
      <Avatar src={user?.avatar} username={user?.username} size="md" />

      <div className="flex-1 flex flex-col gap-3">
        {/* Placeholder quand vide */}
        {!content && (
          <p className="text-breezy-muted text-sm select-none pointer-events-none absolute mt-[2px]">
            Comment ça va ?
          </p>
        )}

        {/* Textarea */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Comment ça va ?"
          rows={3}
          className="
            w-full resize-none bg-white border border-breezy-border rounded-lg
            px-3 py-2 text-sm text-breezy-dark placeholder:text-breezy-muted
            focus:outline-none focus:ring-2 focus:ring-breezy-dark
          "
          disabled={loading}
          aria-label="Rédiger un post"
        />

        {/* Barre basse : compteur + bouton Publier */}
        <div className="flex items-center justify-between">
          {/* Compteur de caractères */}
          <span className={`text-xs ${isOver ? "text-red-500 font-medium" : "text-breezy-muted"}`}>
            {remaining} caractère{remaining !== 1 ? "s" : ""} restant{remaining !== 1 ? "s" : ""}
          </span>

          <Button
            onClick={handlePublish}
            disabled={isEmpty || isOver}
            loading={loading}
            size="sm"
          >
            Publier
          </Button>
        </div>

        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
    </div>
  );
}
