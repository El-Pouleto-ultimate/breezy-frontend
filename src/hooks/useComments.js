// useComments.js
// Hook qui gère le chargement et la création de commentaires (Fx7, Fx8).

import { useState, useEffect } from "react";
import { getComments, createComment, replyToComment } from "../services/commentService";

export function useComments(postId) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  useEffect(() => {
    if (!postId) return;
    setLoading(true);
    getComments(postId)
      .then((data) => setComments(data.comments))
      .catch(() => setError("Impossible de charger les commentaires."))
      .finally(() => setLoading(false));
  }, [postId]);

  // Ajoute un commentaire au post (Fx7)
  async function addComment(content) {
    const newComment = await createComment(postId, { content });
    setComments((prev) => [newComment, ...prev]);
    return newComment;
  }

  // Répond à un commentaire existant (Fx8)
  async function addReply(commentId, content) {
    const reply = await replyToComment(postId, commentId, { content });
    // On insère la réponse sous le bon commentaire parent
    setComments((prev) =>
      prev.map((c) =>
        c._id === commentId
          ? { ...c, replies: [...(c.replies || []), reply] }
          : c
      )
    );
    return reply;
  }

  return { comments, loading, error, addComment, addReply };
}
