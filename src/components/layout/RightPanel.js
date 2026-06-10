// RightPanel.jsx
// Panneau droit affiché sur la homepage (wireframe Homepage_1).
// Affiche la liste "Comptes suivis" de l'utilisateur connecté.

import FollowingList from "../following/FollowingList";
import { useAuth } from "../../hooks/useAuth";

export default function RightPanel() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-semibold text-sm text-breezy-dark">Comptes suivis</h3>
      {user && <FollowingList userId={user.id} />}
    </div>
  );
}
