// ProfilePage.jsx
// Page profil de l'utilisateur connecté (wireframe Profil_Utilisateur_1).
// Affiche : ProfileHeader + bouton "Modifier le profil" + liste des posts.
//
// Fonctionnalités couvertes :
//   Fx4  — affichage des messages sur le profil
//   Fx10 — profil avec photo, nom, bio
//   Fx11 — liste des messages publiés

import { useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileActions from "../components/profile/ProfileActions";
import ProfilePostList from "../components/profile/ProfilePostList";
import Spinner from "../components/ui/Spinner";
import { useAuth } from "../hooks/useAuth";
import { useProfile } from "../hooks/useProfile";

export default function ProfilePage() {
  const { user } = useAuth();
  const { profile, loading, error, saveProfile } = useProfile(user?.id);
  const [currentProfile, setCurrentProfile] = useState(null);

  // Utilise le profil mis à jour si disponible, sinon celui chargé
  const displayProfile = currentProfile || profile;

  if (loading) return (
    <AppLayout>
      <div className="flex justify-center py-16"><Spinner size="lg" /></div>
    </AppLayout>
  );

  if (error) return (
    <AppLayout>
      <p className="text-sm text-breezy-muted text-center py-8">{error}</p>
    </AppLayout>
  );

  return (
    <AppLayout>
      {/* Titre : nom de l'utilisateur (wireframe : "nom de l'utilisateur") */}
      <h1 className="text-2xl font-semibold text-breezy-dark mb-5">
        {displayProfile?.username || "Profil"}
      </h1>

      {/* Header profil : avatar + nom + bio (Fx10) */}
      <ProfileHeader profile={displayProfile} isOwn />

      {/* Bouton "Modifier le profil" sous le header */}
      <div className="mt-3 mb-6">
        <ProfileActions
          profile={displayProfile}
          isOwn
          onProfileUpdated={(updated) => {
            setCurrentProfile(updated);
            saveProfile(updated);
          }}
        />
      </div>

      {/* Posts publiés (Fx4, Fx11) */}
      {user && <ProfilePostList userId={user.id} />}
    </AppLayout>
  );
}
