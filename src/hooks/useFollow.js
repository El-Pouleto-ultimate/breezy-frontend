// useFollow.js
// Hook qui gère le suivi / désuivi d'un utilisateur (Fx9).
// Même logique d'optimistic update que useLike.

import { useState } from "react";
import { followUser, unfollowUser } from "../services/userService";

export function useFollow(targetUserId, initialFollowing = false) {
  const [following, setFollowing] = useState(initialFollowing);
  const [loading, setLoading]     = useState(false);

  async function toggleFollow() {
    if (loading) return;

    // Optimistic update
    const wasFollowing = following;
    setFollowing(!wasFollowing);
    setLoading(true);

    try {
      if (wasFollowing) {
        await unfollowUser(targetUserId);
      } else {
        await followUser(targetUserId);
      }
    } catch {
      // Rollback si erreur
      setFollowing(wasFollowing);
    } finally {
      setLoading(false);
    }
  }

  return { following, toggleFollow, loading };
}
