// HomePage.jsx
// Page d'accueil (wireframe Homepage_1 & Like_1 & Following_1).
// Contenu : PostComposer + PostList (feed) | Panel droit : FollowingList
//
// Fonctionnalités couvertes :
//   Fx3  — publier un message
//   Fx5  — fil chronologique des utilisateurs suivis
//   Fx6  — liker un post (toggle cœur rouge)
//   Fx7  — ouvrir le thread de commentaires
//   Fx9  — bouton follow dans les cards

import AppLayout from "../components/layout/AppLayout";
import RightPanel from "../components/layout/RightPanel";
import PostComposer from "../components/feed/PostComposer";
import PostList from "../components/feed/PostList";
import { usePosts } from "../hooks/usePosts";

export default function HomePage() {
  const { posts, loading, error, hasMore, loadMore, prependPost, updatePost } = usePosts();

  return (
    <AppLayout rightPanel={<RightPanel />}>
      {/* Titre de la page (wireframe : "Page d'accueil") */}
      <h1 className="text-2xl font-semibold text-breezy-dark mb-5">Page d'accueil</h1>

      {/* Zone de publication (Fx3) */}
      <PostComposer onPostCreated={prependPost} />

      {/* Séparateur */}
      <div className="my-4" />

      {/* Fil d'actualités (Fx5) */}
      <PostList
        posts={posts}
        loading={loading}
        error={error}
        hasMore={hasMore}
        loadMore={loadMore}
        onUpdate={updatePost}
      />
    </AppLayout>
  );
}
