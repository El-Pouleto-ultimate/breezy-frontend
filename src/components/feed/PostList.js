// PostList.jsx
// Affiche une liste de PostCard avec gestion du chargement, des erreurs
// et du bouton "Charger plus" (pagination).
//
// Props :
//   posts    : tableau de posts
//   loading  : boolean
//   error    : string
//   hasMore  : boolean — s'il y a encore des posts à charger
//   loadMore : function — charge la page suivante
//   onUpdate : function(updatedPost) — mise à jour après like

import PostCard from "./PostCard";
import Spinner from "../ui/Spinner";
import Button from "../ui/Button";

export default function PostList({ posts, loading, error, hasMore, loadMore, onUpdate }) {
  // État : premier chargement (liste vide + loading)
  if (loading && posts.length === 0) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  // État : erreur
  if (error) {
    return (
      <div className="text-center py-8 text-breezy-muted text-sm">
        {error}
      </div>
    );
  }

  // État : liste vide
  if (posts.length === 0) {
    return (
      <div className="text-center py-12 text-breezy-muted text-sm">
        Aucun post pour l'instant. Commence à suivre des utilisateurs !
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} onUpdate={onUpdate} />
      ))}

      {/* Bouton "Charger plus" — visible seulement s'il y a plus de posts */}
      {hasMore && (
        <div className="flex justify-center pt-2">
          <Button variant="secondary" onClick={loadMore} loading={loading} size="sm">
            Charger plus
          </Button>
        </div>
      )}

      {/* Spinner pendant le chargement de la page suivante */}
      {loading && posts.length > 0 && (
        <div className="flex justify-center py-4">
          <Spinner size="md" />
        </div>
      )}
    </div>
  );
}
