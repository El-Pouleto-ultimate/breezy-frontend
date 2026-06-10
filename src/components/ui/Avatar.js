// Avatar.jsx
// Affiche la photo de profil d'un utilisateur dans un cercle.
// Si pas d'image, affiche les initiales sur fond coloré.
//
// Props :
//   src      : URL de l'image (optionnel)
//   username : nom d'utilisateur (pour les initiales et l'alt)
//   size     : "sm" | "md" | "lg" (défaut: "md")

const SIZE_CLASSES = {
  sm: "w-8 h-8 text-xs",    // 32px — dans les listes
  md: "w-10 h-10 text-sm",  // 40px — dans les posts
  lg: "w-16 h-16 text-lg",  // 64px — dans le profil
};

export default function Avatar({ src, username = "?", size = "md" }) {
  // Première lettre du nom en majuscule (fallback si pas d'image)
  const initials = username.charAt(0).toUpperCase();

  return (
    <div
      className={`
        ${SIZE_CLASSES[size]}
        rounded-full overflow-hidden flex-shrink-0
        bg-breezy-panel border border-breezy-border
        flex items-center justify-center
        font-medium text-breezy-muted select-none
      `}
      aria-label={`Avatar de ${username}`}
    >
      {src ? (
        <img
          src={src}
          alt={`Photo de profil de ${username}`}
          className="w-full h-full object-cover"
          // Si l'image échoue à charger, on cache l'img (les initiales s'affichent)
          onError={(e) => { e.target.style.display = "none"; }}
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}
