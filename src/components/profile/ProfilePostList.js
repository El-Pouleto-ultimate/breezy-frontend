// ProfilePostList.jsx
// Affiche les posts publiés par un utilisateur sur sa page profil (Fx4, Fx11).
//
// Props :
//   userId : ID de l'utilisateur dont on affiche les posts

import { useState, useEffect, useCallback } from "react";
import { getUserPosts } from "../../services/postService";
import PostCard from "../feed/PostCard";
import Spinner from "../ui/Spinner";
import Button from "../ui/Button";

export default function ProfilePostList({ userId }) {
  const [posts, setPosts]           = useState([]);
  const [page, setPage]             = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState("");

  const loadPosts = useCallback(async (pageNum) => {
    if (!userId) return;
    setLoading(true);
    setError("");
    try {
      const data = await getUserPosts(userId, pageNum);
      setPosts((prev) => (pageNum === 1 ? data.posts : [...prev, ...data.posts]));
      setTotalPages(data.totalPages);
      setPage(pageNum);
    } catch {
      setError("Impossible de charger les posts.");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Recharge quand userId change (navigation entre profils)
  useEffect(() => {
    setPosts([]);
    loadPosts(1);
  }, [loadPosts]);

  // Met à jour un post après like
  function handleUpdate(updatedPost) {
    setPosts((prev) => prev.map((p) => (p._id === updatedPost._id ? updatedPost : p)));
  }

  if (loading && posts.length === 0) return <div className="flex justify-center py-8"><Spinner size="lg" /></div>;
  if (error) return <p className="text-sm text-breezy-muted text-center py-8">{error}</p>;
  if (posts.length === 0) return <p className="text-sm text-breezy-muted text-center py-8">Aucun post publié.</p>;

  return (
    <div className="flex flex-col gap-3">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} onUpdate={handleUpdate} />
      ))}
      {page < totalPages && (
        <div className="flex justify-center pt-2">
          <Button variant="secondary" size="sm" onClick={() => loadPosts(page + 1)} loading={loading}>
            Charger plus
          </Button>
        </div>
      )}
    </div>
  );
}
