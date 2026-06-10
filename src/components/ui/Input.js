// Input.jsx
// Champ de saisie stylisé et réutilisable.
//
// Props :
//   error     : string — message d'erreur à afficher sous le champ
//   className : classes supplémentaires
//   ...rest   : tous les attributs HTML d'un <input> (type, value, onChange, etc.)

export default function Input({ error, className = "", ...rest }) {
  return (
    <div className="flex flex-col gap-1">
      <input
        className={`
          bg-white border rounded-lg px-3 py-2 text-sm
          text-breezy-dark placeholder:text-breezy-muted
          focus:outline-none focus:ring-2 focus:ring-breezy-dark
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors duration-150
          ${error ? "border-red-400 bg-red-50" : "border-breezy-border"}
          ${className}
        `}
        {...rest}
      />
      {/* Message d'erreur sous le champ */}
      {error && (
        <p className="text-xs text-red-600">{error}</p>
      )}
    </div>
  );
}
