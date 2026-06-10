// AuthLayout.jsx
// Layout des pages d'authentification (Connect, SignIn, Register).
// Wireframe : logo à gauche sur fond gris, formulaire à droite.
//
// Props :
//   children : le formulaire (LoginForm, RegisterForm, ou boutons Connect)

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex">
      {/* ── Panneau gauche — logo Breezy ── */}
      <div className="hidden md:flex w-5/12 bg-breezy-panel items-center justify-center flex-col gap-3">
        {/* Logo ≋ (Unicode wind icon — reproduit l'icône du wireframe) */}
        <span className="text-4xl text-breezy-dark select-none">≋</span>
        <span className="text-xl font-semibold tracking-tight text-breezy-dark">Breezy</span>
      </div>

      {/* ── Panneau droit — formulaire ── */}
      <div className="flex-1 flex items-center justify-center p-8 bg-breezy-bg">
        {/* Sur mobile : affiche le logo au-dessus du formulaire */}
        <div className="w-full max-w-sm">
          <div className="flex md:hidden items-center gap-2 mb-8">
            <span className="text-2xl">≋</span>
            <span className="font-semibold text-lg">Breezy</span>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
