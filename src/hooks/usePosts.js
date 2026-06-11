// usePosts.js
// Hook qui gère le chargement et la pagination du feed (Fx5).
// Retourne les posts, un état de chargement et une fonction pour charger plus.

import { useState, useEffect, useCallback } from "react";
import { getFeed } from "../services/postService";

export function usePosts() {
  const [posts, setPosts]           = useState([]);
  const [page, setPage]             = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState("");

  // Charge la page demandée et ajoute les posts à la liste existante
  const loadPosts = useCallback(async (pageNum = 1) => {
    setLoading(true);
    setError("");
    try {
      const data = await getFeed(pageNum);
      // page 1 = nouveau chargement, on remplace ; sinon on ajoute (infinite scroll)
      setPosts((prev) => (pageNum === 1 ? data.posts : [...prev, ...data.posts]));
      setTotalPages(data.totalPages);
      setPage(pageNum);
    } catch {
      setError("Impossible de charger le fil d'actualités.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Charge le feed au montage du composant
  useEffect(() => {
    loadPosts(1);
  }, [loadPosts]);

  // Ajoute un nouveau post en tête de liste (après publication)
  function prependPost(newPost) {
    setPosts((prev) => [newPost, ...prev]);
  }

  // Met à jour un post existant dans la liste (ex : après like)
  function updatePost(updatedPost) {
    setPosts((prev) =>
      prev.map((p) => (p._id === updatedPost._id ? updatedPost : p))
    );
  }

  function loadMore() {
    if (page < totalPages) loadPosts(page + 1);
  }

  return {
    posts,
    loading,
    error,
    hasMore: page < totalPages,
    loadMore,
    prependPost,
    updatePost,
    refresh: () => loadPosts(1),
  };
}
