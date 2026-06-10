// ProfileActions.jsx
// Boutons d'action sous le header de profil.
// - Si profil personnel   → "Modifier le profil" (wireframe Profil_Utilisateur_1)
// - Si autre + non suivi  → "Suivre"            (wireframe Compte_Autre_1)
// - Si autre + suivi      → "Ne plus suivre"    (wireframe Compte_Suivi_1)
//
// Props :
//   profile  : objet profil
//   isOwn    : boolean

import { useState } from "react";
import { useFollow } from "../../hooks/useFollow";
import Button from "../ui/Button";
import EditProfileModal from "./EditProfileModal";

export default function ProfileActions({ profile, isOwn, onProfileUpdated }) {
  const [editOpen, setEditOpen] = useState(false);
  const { following, toggleFollow, loading } = useFollow(
    profile?.id,
    profile?.followedByMe || false
  );

  if (!profile) return null;

  // ── Profil personnel : bouton "Modifier le profil" ──
  if (isOwn) {
    return (
      <>
        <Button variant="primary" size="sm" onClick={() => setEditOpen(true)}>
          Modifier le profil
        </Button>

        <EditProfileModal
          profile={profile}
          isOpen={editOpen}
          onClose={() => setEditOpen(false)}
          onSaved={onProfileUpdated}
        />
      </>
    );
  }

  // ── Profil tiers : Suivre / Ne plus suivre ──
  return (
    <Button
      variant={following ? "secondary" : "primary"}
      size="sm"
      onClick={toggleFollow}
      loading={loading}
    >
      {following ? "Ne plus suivre" : "Suivre"}
    </Button>
  );
}
