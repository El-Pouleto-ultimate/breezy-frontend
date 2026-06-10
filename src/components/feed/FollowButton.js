// FollowButton.jsx
// Bouton person+ / person✓ affiché dans les cards du feed (Fx9).
// Wireframe : icône en haut à droite de chaque post.
//
// Props :
//   userId           : ID de l'auteur du post
//   initialFollowing : boolean — est-ce que l'utilisateur courant suit déjà cet auteur ?

import { useFollow } from "../../hooks/useFollow";
import { useAuth } from "../../hooks/useAuth";

// person+ (non suivi)
function AddPersonIcon() { return <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/></svg>; }
// person✓ (suivi)
function CheckPersonIcon() { return <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>; }

export default function FollowButton({ userId, initialFollowing = false }) {
  const { user } = useAuth();
  const { following, toggleFollow, loading } = useFollow(userId, initialFollowing);

  // On n'affiche pas le bouton pour son propre profil
  if (!user || user.id === userId) return null;

  return (
    <button
      onClick={toggleFollow}
      disabled={loading}
      className={`
        transition-colors p-1 rounded-full
        ${following
          ? "text-breezy-dark opacity-60 hover:opacity-100"
          : "text-breezy-muted hover:text-breezy-dark"
        }
        disabled:opacity-30
      `}
      aria-label={following ? "Ne plus suivre" : "Suivre"}
      title={following ? "Ne plus suivre" : "Suivre"}
    >
      {following ? <CheckPersonIcon /> : <AddPersonIcon />}
    </button>
  );
}
