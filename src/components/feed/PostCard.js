// PostCard.jsx
// Card affichant un post dans le feed (Fx5).
// Wireframe : avatar · nom · @nickname · date | texte | actions 💬 🔁 ♡
//
// Props :
//   post     : objet post { _id, author, content, createdAt, likesCount, likedByMe, commentsCount }
//   onUpdate : function(updatedPost) — mise à jour après like

import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { timeAgo } from "../../utils/formatDate";
import Avatar from "../ui/Avatar";
import PostActions from "./PostActions";
import FollowButton from "./FollowButton";
import CommentThread from "../comment/CommentThread";

export default function PostCard({ post, onUpdate }) {
  const { user } = useAuth();
  const [showComments, setShowComments] = useState(false);

  const isOwnPost = user?.id === post.author?._id;

  return (
    <>
      <article className="bg-breezy-card border border-breezy-border rounded-xl p-4 flex gap-3">
        {/* Avatar — lien vers le profil de l'auteur */}
        <Link to={isOwnPost ? "/profile" : `/profile/${post.author?._id}`} className="flex-shrink-0">
          <Avatar src={post.author?.avatar} username={post.author?.username} size="md" />
        </Link>

        <div className="flex-1 min-w-0">
          {/* En-tête : nom · @nickname · date + bouton follow */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-baseline gap-1.5 flex-wrap min-w-0">
              <Link
                to={isOwnPost ? "/profile" : `/profile/${post.author?._id}`}
                className="font-semibold text-sm text-breezy-dark hover:underline truncate"
              >
                {post.author?.username}
              </Link>
              <span className="text-breezy-muted text-xs truncate">
                @{post.author?.username}
              </span>
              <span className="text-breezy-muted text-xs">
                · {timeAgo(post.createdAt)}
              </span>
            </div>

            {/* Bouton suivre (person+) — masqué pour ses propres posts */}
            {!isOwnPost && (
              <FollowButton
                userId={post.author?._id}
                initialFollowing={post.author?.followedByMe}
              />
            )}
          </div>

          {/* Contenu du post */}
          <p className="mt-1.5 text-sm text-breezy-dark leading-relaxed whitespace-pre-wrap break-words">
            {post.content}
          </p>

          {/* Barre d'actions : 💬 🔁 ♡ */}
          <PostActions
            post={post}
            onComment={() => setShowComments(true)}
            onUpdate={onUpdate}
          />
        </div>
      </article>

      {/* Modal commentaires (Fx7) — s'affiche sur clic de l'icône 💬 */}
      <CommentThread
        post={post}
        isOpen={showComments}
        onClose={() => setShowComments(false)}
      />
    </>
  );
}
