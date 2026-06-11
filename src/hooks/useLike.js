// useLike.js
// Hook qui gère le like d'un post (Fx6).
// Utilise l'"optimistic update" : on met à jour l'UI immédiatement
// avant même que l'API réponde, pour une expérience fluide.
// Si l'API échoue, on annule le changement.

import { useState } from "react";
import { toggleLike } from "../services/postService";

export function useLike(post, onUpdate) {
  // État local initialisé depuis les données du post
  const [liked, setLiked]             = useState(post.likedByMe || false);
  const [likesCount, setLikesCount]   = useState(post.likesCount || 0);
  const [loading, setLoading]         = useState(false);

  async function handleLike() {
    if (loading) return; // évite les doubles-clics

    // 1. Optimistic update — on change l'UI avant l'appel API
    const wasLiked      = liked;
    const prevCount     = likesCount;
    setLiked(!wasLiked);
    setLikesCount(wasLiked ? prevCount - 1 : prevCount + 1);

    setLoading(true);
    try {
      const data = await toggleLike(post._id);
      // 2. On synchronise avec la vraie valeur renvoyée par l'API
      setLiked(data.liked);
      setLikesCount(data.likesCount);
      // Notifie le parent pour mettre à jour la liste
      if (onUpdate) onUpdate({ ...post, likedByMe: data.liked, likesCount: data.likesCount });
    } catch {
      // 3. En cas d'erreur, on annule l'optimistic update
      setLiked(wasLiked);
      setLikesCount(prevCount);
    } finally {
      setLoading(false);
    }
  }

  return { liked, likesCount, handleLike, loading };
}
