// FollowingCard.jsx
// Affiche un compte suivi dans le panel droit (wireframe Homepage_1 + Following_1).
// Petit avatar circulaire + @nickname.
//
// Props :
//   user : { id, username, avatar }

import { Link } from "react-router-dom";
import Avatar from "../ui/Avatar";

export default function FollowingCard({ user }) {
  return (
    <Link
      to={`/profile/${user.id}`}
      className="flex items-center gap-2 py-1.5 hover:opacity-80 transition-opacity"
    >
      <Avatar src={user.avatar} username={user.username} size="sm" />
      <span className="text-xs text-breezy-muted">@{user.username}</span>
    </Link>
  );
}
