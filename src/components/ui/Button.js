// Button.jsx
// Bouton réutilisable avec trois variantes visuelles.
//
// Props :
//   variant  : "primary" | "secondary" | "danger" (défaut: "primary")
//   size     : "sm" | "md" | "lg" (défaut: "md")
//   disabled : boolean
//   loading  : boolean — affiche "Chargement..." et désactive
//   className: classes Tailwind supplémentaires
//   ...rest  : tous les autres attributs HTML d'un bouton (type, onClick, etc.)

const VARIANT_CLASSES = {
  primary:   "bg-breezy-dark text-white hover:bg-neutral-800 disabled:opacity-50",
  secondary: "bg-breezy-card text-breezy-dark border border-breezy-border hover:bg-breezy-panel disabled:opacity-50",
  danger:    "bg-red-600 text-white hover:bg-red-700 disabled:opacity-50",
};

const SIZE_CLASSES = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  className = "",
  disabled,
  ...rest
}) {
  return (
    <button
      className={`
        ${VARIANT_CLASSES[variant]}
        ${SIZE_CLASSES[size]}
        rounded-lg font-medium transition-colors duration-150
        cursor-pointer disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-breezy-dark focus:ring-offset-1
        ${className}
      `}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? "Chargement..." : children}
    </button>
  );
}
