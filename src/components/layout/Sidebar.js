// Sidebar.jsx
// Navigation latérale gauche présente sur toutes les pages connectées.
// Wireframe : Page d'accueil, Profil (colonne gauche avec logo + liens).
//
// Liens : Page d'accueil · Profil · Notifications · Messages

import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useNotifications } from "../../hooks/useNotifications";

// Icônes en SVG inline pour éviter une dépendance externe
function HomeIcon()  { return <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9"/></svg>; }
function UserIcon()  { return <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"/></svg>; }
function BellIcon()  { return <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>; }
function MailIcon()  { return <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>; }
function LogoutIcon(){ return <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h5a2 2 0 012 2v1"/></svg>; }

export default function Sidebar() {
  const { user, logout } = useAuth();
  const { unreadCount }  = useNotifications();

  // Style du lien actif vs inactif
  function navClass({ isActive }) {
    return `
      flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
      ${isActive
        ? "bg-breezy-panel text-breezy-dark"
        : "text-breezy-muted hover:text-breezy-dark hover:bg-breezy-card"
      }
    `;
  }

  return (
    <aside className="w-44 flex-shrink-0 flex flex-col gap-6 py-6 px-4 border-r border-breezy-border bg-breezy-bg">
      {/* Logo */}
      <div className="flex items-center gap-2 px-3">
        <span className="text-xl text-breezy-dark select-none">≋</span>
        <span className="font-semibold text-breezy-dark">Breezy</span>
      </div>

      {/* Navigation principale */}
      <nav className="flex flex-col gap-1">
        <NavLink to="/home"          className={navClass}><HomeIcon />Page d'accueil</NavLink>
        <NavLink to="/profile"       className={navClass}><UserIcon />Profil</NavLink>
        <NavLink to="/notifications" className={navClass}>
          <div className="relative">
            <BellIcon />
            {/* Badge rouge si notifications non lues */}
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </div>
          Notifications
        </NavLink>
        <NavLink to="/messages"      className={navClass}><MailIcon />Messages</NavLink>
      </nav>

      {/* Bouton déconnexion en bas */}
      <div className="mt-auto">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-breezy-muted hover:text-red-600 hover:bg-red-50 transition-colors w-full"
        >
          <LogoutIcon />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
