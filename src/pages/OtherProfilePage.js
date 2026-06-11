// OtherProfilePage.jsx
// Page profil d'un autre utilisateur (wireframe Compte_Autre_1 & Compte_Suivi_1).
// Affiche : ProfileHeader + bouton "Suivre" ou "Ne plus suivre" + liste des posts.
//
// La différence avec ProfilePage :
//   - isOwn = false → affiche Suivre/Ne plus suivre au lieu de Modifier
//   - L'userId vient du paramètre URL (:userId)

import { useParams } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileActions from "../components/profile/ProfileActions";
import ProfilePostList from "../components/profile/ProfilePostList";
import Spinner from "../components/ui/Spinner";
import { useProfile } from "../hooks/useProfile";

export default function OtherProfilePage() {
  // Récupère l'ID depuis l'URL : /profile/:userId
  const { userId } = useParams();
  const { profile, loading, error } = useProfile(userId);

  if (loading) return (
    <AppLayout>
      <div className="flex justify-center py-16"><Spinner size="lg" /></div>
    </AppLayout>
  );

  if (error || !profile) return (
    <AppLayout>
      <p className="text-sm text-breezy-muted text-center py-8">
        Profil introuvable.
      </p>
    </AppLayout>
  );

  return (
    <AppLayout>
      {/* Titre : nom de l'utilisateur */}
      <h1 className="text-2xl font-semibold text-breezy-dark mb-5">
        {profile.username}
      </h1>

      {/* Header profil */}
      <ProfileHeader profile={profile} isOwn={false} />

      {/* Bouton Suivre / Ne plus suivre (wireframe Compte_Autre vs Compte_Suivi) */}
      <div className="mt-3 mb-6">
        <ProfileActions profile={profile} isOwn={false} />
      </div>

      {/* Posts de cet utilisateur */}
      <ProfilePostList userId={userId} />
    </AppLayout>
  );
}
