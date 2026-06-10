// AppLayout.jsx
// Layout principal des pages connectées.
// Structure : Sidebar gauche | Contenu principal | Panel droit optionnel
//
// Props :
//   children    : le contenu principal de la page
//   rightPanel  : contenu optionnel pour la colonne droite (ex: FollowingList)

import Sidebar from "./Sidebar";

export default function AppLayout({ children, rightPanel }) {
  return (
    <div className="min-h-screen flex bg-breezy-bg">
      {/* ── Sidebar gauche (fixe) ── */}
      <Sidebar />

      {/* ── Contenu principal ── */}
      <main className="flex-1 max-w-2xl mx-auto px-6 py-6">
        {children}
      </main>

      {/* ── Panel droit optionnel — ex: "Comptes suivis" sur la homepage ── */}
      {rightPanel && (
        <aside className="hidden lg:block w-64 flex-shrink-0 px-4 py-6 border-l border-breezy-border">
          {rightPanel}
        </aside>
      )}
    </div>
  );
}
