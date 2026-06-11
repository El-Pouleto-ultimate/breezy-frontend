// useProfile.js
// Hook qui charge le profil d'un utilisateur (Fx10).

import { useState, useEffect } from "react";
import { getUserById, updateProfile } from "../services/userService";

export function useProfile(userId) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    setError("");
    getUserById(userId)
      .then(setProfile)
      .catch(() => setError("Impossible de charger le profil."))
      .finally(() => setLoading(false));
  }, [userId]);

  // Met à jour le profil et rafraîchit l'état local
  async function saveProfile(updates) {
    const updated = await updateProfile(userId, updates);
    setProfile(updated);
    return updated;
  }

  return { profile, loading, error, saveProfile };
}
