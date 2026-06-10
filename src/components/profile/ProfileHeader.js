// ProfileHeader.jsx
// En-tête de la page profil : photo + nom + @nickname + bio (Fx10).
// Wireframe : Profil_Utilisateur_1 & Compte_Autre_1 & Compte_Suivi_1
//
// Props :
//   profile  : objet { id, username, bio, avatar, followersCount, followingCount }
//   isOwn    : boolean — true si c'est le profil de l'utilisateur connecté

export default function ProfileHeader({ profile, isOwn }) {
  if (!profile) return null;

  return (
    <div className="flex gap-5 items-start p-4 bg-breezy-card border border-breezy-border rounded-xl">
      {/* Photo de profil (grand cercle) */}
      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-breezy-border flex-shrink-0 bg-breezy-panel flex items-center justify-center text-2xl font-semibold text-breezy-muted">
        {profile.avatar
          ? <img src={profile.avatar} alt={`Photo de ${profile.username}`} className="w-full h-full object-cover" />
          : profile.username?.charAt(0).toUpperCase()
        }
      </div>

      {/* Infos */}
      <div className="flex flex-col gap-1 min-w-0">
        {/* Nom complet */}
        <h2 className="text-base font-semibold text-breezy-dark truncate">
          {profile.username}
        </h2>
        {/* @nickname */}
        <p className="text-sm text-breezy-muted">@{profile.username}</p>
        {/* Biographie courte */}
        {profile.bio && (
          <p className="text-sm text-breezy-dark mt-1 leading-snug">{profile.bio}</p>
        )}
        {/* Compteurs followers / following */}
        <div className="flex gap-4 mt-2 text-xs text-breezy-muted">
          <span><strong className="text-breezy-dark">{profile.followersCount ?? 0}</strong> abonnés</span>
          <span><strong className="text-breezy-dark">{profile.followingCount ?? 0}</strong> abonnements</span>
        </div>
      </div>
    </div>
  );
}
