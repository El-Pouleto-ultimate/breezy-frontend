// FollowingList.jsx
// Liste des comptes suivis par l'utilisateur (wireframe Homepage_1 panel droit).
// Affiché dans RightPanel sur la homepage.
//
// Props :
//   userId : ID de l'utilisateur dont on affiche les abonnements

import { useState, useEffect } from "react";
import { getFollowing } from "../../services/userService";
import FollowingCard from "./FollowingCard";
import Spinner from "../ui/Spinner";

export default function FollowingList({ userId }) {
  const [users, setUsers]   = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    getFollowing(userId)
      .then((data) => setUsers(data.users || []))
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <div className="flex justify-center py-4"><Spinner size="sm" /></div>;

  if (users.length === 0) {
    return <p className="text-xs text-breezy-muted">Tu ne suis encore personne.</p>;
  }

  return (
    <div className="flex flex-col">
      {users.map((user) => (
        <FollowingCard key={user.id} user={user} />
      ))}
    </div>
  );
}
