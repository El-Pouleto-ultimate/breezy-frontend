// ErrorBoundary.jsx
// Composant de classe qui intercepte les erreurs JavaScript dans ses enfants
// et affiche un message de fallback au lieu de crasher toute l'app.
// C'est le seul endroit dans Breezy où on DOIT utiliser un composant classe
// (les Error Boundaries ne fonctionnent pas avec les fonctions en React).

import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // Mis à jour quand une erreur est capturée dans un enfant
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // Log l'erreur (en prod : envoyer à Sentry, etc.)
  componentDidCatch(error, info) {
    console.error("ErrorBoundary capturée :", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center gap-4">
          <p className="text-breezy-muted text-sm">
            Quelque chose s'est mal passé. Recharge la page.
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="text-xs underline text-breezy-dark"
          >
            Réessayer
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
