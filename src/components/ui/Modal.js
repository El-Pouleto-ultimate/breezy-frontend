// Modal.jsx
// Overlay modal générique réutilisé pour :
//   - CommentThread (wireframe Commentaire_1)
//   - EditProfileModal
//
// Props :
//   isOpen   : boolean — contrôle l'affichage
//   onClose  : function — appelée en cliquant sur l'overlay ou la croix
//   title    : string — titre de la modal (optionnel)
//   children : contenu de la modal

import { useEffect } from "react";

export default function Modal({ isOpen, onClose, title, children }) {
  // Bloque le scroll du body quand la modal est ouverte
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    // Cleanup au démontage
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Ferme la modal avec Échap
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    // Overlay sombre — clic en dehors = ferme
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      {/* Fond grisé (comme dans le wireframe Commentaire_1) */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Contenu de la modal */}
      <div className="relative z-10 bg-breezy-bg rounded-xl shadow-xl w-full max-w-lg mx-4 p-6">
        {/* Header avec titre + bouton fermer */}
        <div className="flex items-center justify-between mb-4">
          {title && <h3 className="font-semibold text-breezy-dark">{title}</h3>}
          <button
            onClick={onClose}
            className="ml-auto text-breezy-muted hover:text-breezy-dark text-xl leading-none"
            aria-label="Fermer"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
