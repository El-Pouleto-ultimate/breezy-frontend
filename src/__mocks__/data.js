// ─── Mock Data ────────────────────────────────────────────────────────
// Données fictives réalistes pour tester tout le frontend sans API.
// Activer avec NEXT_PUBLIC_USE_MOCKS=true dans .env.local

// ──── USERS ────────────────────────────────────────────────────────────
export const MOCK_USERS = {
  me: {
    _id: 'user_me',
    id: 'user_me',
    username: 'Alex Mercer',
    email: 'alex@breezy.dev',
    avatar: '',
    bio: 'Digital designer & developer. Building minimal interfaces and drinking too much espresso. Opinions are my own.',
    location: 'Paris, France',
    createdAt: '2022-04-01T00:00:00Z',
    followingCount: 2,
    followersCount: 4,
    followedByMe: false,
  },
  sarah: {
    _id: 'user_sarah',
    id: 'user_sarah',
    username: 'Sarah Chen',
    email: 'sarah@breezy.dev',
    avatar: '',
    bio: 'Product designer @DesignCo. Lover of minimal UI and great typography.',
    location: 'Lyon, France',
    createdAt: '2023-01-15T00:00:00Z',
    followingCount: 320,
    followersCount: 5400,
    followedByMe: true,
  },
  marcus: {
    _id: 'user_marcus',
    id: 'user_marcus',
    username: 'Marcus Johnson',
    email: 'marcus@breezy.dev',
    avatar: '',
    bio: 'Full-stack developer. Open source enthusiast. Coffee addict.',
    location: 'Bordeaux, France',
    createdAt: '2023-06-20T00:00:00Z',
    followingCount: 189,
    followersCount: 3200,
    followedByMe: false,
  },
  elena: {
    _id: 'user_elena',
    id: 'user_elena',
    username: 'Elena Dubois',
    email: 'elena@breezy.dev',
    avatar: '',
    bio: 'UX researcher. Passionate about accessibility and inclusive design.',
    location: 'Marseille, France',
    createdAt: '2023-03-10T00:00:00Z',
    followingCount: 450,
    followersCount: 8900,
    followedByMe: true,
  },
  thomas: {
    _id: 'user_thomas',
    id: 'user_thomas',
    username: 'Thomas Petit',
    email: 'thomas@breezy.dev',
    avatar: '',
    bio: 'Frontend engineer. Vue.js & React enthusiast.',
    location: 'Toulouse, France',
    createdAt: '2024-01-05T00:00:00Z',
    followingCount: 210,
    followersCount: 1800,
    followedByMe: false,
  },
}

// ──── POSTS ────────────────────────────────────────────────────────────
export const MOCK_POSTS = [
  {
    _id: 'post_1',
    author: MOCK_USERS.sarah,
    content: 'Je viens de terminer la refonte de notre bibliothèque de composants. 47 composants, tous avec le mode sombre. La clé ? Commencer par les tokens, pas les composants. 🎨',
    createdAt: new Date(Date.now() - 1800000).toISOString(),
    likesCount: 234,
    commentsCount: 18,
    repostsCount: 12,
    viewsCount: 4500,
    likedByMe: false,
  },
  {
    _id: 'post_2',
    author: MOCK_USERS.marcus,
    content: "Opinion impopulaire : la plupart des \"design systems\" ne sont que des bibliothèques de composants avec un fichier Figma. Un vrai design system inclut des principes, des règles et une gouvernance. Le code n'est qu'un artefact.",
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    likesCount: 567,
    commentsCount: 45,
    repostsCount: 32,
    viewsCount: 12000,
    likedByMe: true,
  },
  {
    _id: 'post_3',
    author: MOCK_USERS.elena,
    content: "Rappel : si votre interface nécessite un tutoriel, elle n'est pas intuitive. La meilleure UX est invisible. Les utilisateurs devraient avoir l'impression de déjà savoir comment utiliser votre produit.",
    createdAt: new Date(Date.now() - 14400000).toISOString(),
    likesCount: 892,
    commentsCount: 67,
    repostsCount: 45,
    viewsCount: 25000,
    likedByMe: false,
  },
  {
    _id: 'post_4',
    author: MOCK_USERS.me,
    content: "Je viens de publier la nouvelle mise à jour du design system. Focus total sur la réduction et la clarté. Moins de bordures, plus d'espace de respiration. ✨",
    createdAt: new Date(Date.now() - 28800000).toISOString(),
    likesCount: 148,
    commentsCount: 12,
    repostsCount: 4,
    viewsCount: 3200,
    likedByMe: false,
  },
  {
    _id: 'post_5',
    author: MOCK_USERS.thomas,
    content: "Les CSS Container Queries changent la donne. Fini les media queries pour la responsivité au niveau des composants. L'avenir de la mise en page web est là et il est magnifique. 🚀",
    createdAt: new Date(Date.now() - 43200000).toISOString(),
    likesCount: 312,
    commentsCount: 28,
    repostsCount: 15,
    viewsCount: 8700,
    likedByMe: false,
  },
  {
    _id: 'post_6',
    author: MOCK_USERS.sarah,
    content: "L'écart entre \"assez bon\" et \"excellent\" dans le design d'interface, c'est environ 20% d'effort en plus mais 200% d'impact en plus. Le raffinement n'est pas une option—c'est le produit lui-même.",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    likesCount: 445,
    commentsCount: 34,
    repostsCount: 22,
    viewsCount: 15000,
    likedByMe: true,
  },
  {
    _id: 'post_7',
    author: MOCK_USERS.marcus,
    content: "Expérimentation de mises en page structurelles pour le nouveau tableau de bord. Je pense que nous avons enfin trouvé les bons points de rupture responsifs. Après 3 semaines d'itération, ça marche tout simplement. 📐",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    likesCount: 189,
    commentsCount: 15,
    repostsCount: 8,
    viewsCount: 5400,
    likedByMe: false,
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80',
  },
  {
    _id: 'post_8',
    author: MOCK_USERS.elena,
    content: "Je viens de terminer un audit d'accessibilité de 6 mois. Principales conclusions :\n\n• 73% des problèmes concernaient le contraste des couleurs\n• 15% étaient des labels ARIA manquants\n• 12% concernaient la navigation au clavier\n\nLes correctifs étaient étonnamment simples. L'accessibilité n'est pas difficile—elle est juste oubliée.",
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    likesCount: 1200,
    commentsCount: 89,
    repostsCount: 67,
    viewsCount: 45000,
    likedByMe: false,
  },
]

// ──── MY POSTS (for own profile) ───────────────────────────────────────
export const MOCK_MY_POSTS = MOCK_POSTS.filter(p => p.author._id === 'user_me')

// ──── COMMENTS ────────────────────────────────────────────────────────
export const MOCK_COMMENTS = {
  post_1: [
    { _id: 'c1', author: MOCK_USERS.marcus, content: 'C\'est exactement ce dont j\'avais besoin ! J\'aimerais voir l\'architecture des tokens.', createdAt: new Date(Date.now() - 1200000).toISOString() },
    { _id: 'c2', author: MOCK_USERS.elena, content: "Commencer par les tokens est tellement sous-estimé. La plupart des équipes passent directement aux composants et le regrettent plus tard.", createdAt: new Date(Date.now() - 900000).toISOString() },
    { _id: 'c3', author: MOCK_USERS.thomas, content: 'Mode sombre dès le premier jour ! 🌙 Choix intelligent.', createdAt: new Date(Date.now() - 600000).toISOString() },
  ],
  post_2: [
    { _id: 'c4', author: MOCK_USERS.sarah, content: "100% d'accord. La gouvernance est la partie la plus difficile et la plupart des équipes l'ignorent.", createdAt: new Date(Date.now() - 5400000).toISOString() },
    { _id: 'c5', author: MOCK_USERS.me, content: "Exactement ! Nous avons passé 3 mois sur notre document de principes avant d'écrire un seul composant.", createdAt: new Date(Date.now() - 3600000).toISOString() },
  ],
  post_3: [
    { _id: 'c6', author: MOCK_USERS.thomas, content: "Je dirais qu'une certaine complexité est inévitable pour les utilisateurs avancés. L'astuce est la divulgation progressive.", createdAt: new Date(Date.now() - 10800000).toISOString() },
    { _id: 'c7', author: MOCK_USERS.sarah, content: "La divulgation progressive est excellente, mais elle peut aussi masquer des fonctionnalités dont les utilisateurs ont besoin. L'équilibre est la clé.", createdAt: new Date(Date.now() - 7200000).toISOString() },
  ],
}

// ──── NOTIFICATIONS ────────────────────────────────────────────────────
export const MOCK_NOTIFICATIONS = [
  {
    _id: 'n1', type: 'like', read: false, postId: 'post_4',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    actors: [{ _id: 'user_sarah', username: 'Sarah Chen', avatar: '' }],
    preview: 'Just pushed the new design system update. Focusing entirely on reduction and clarity...',
  },
  {
    _id: 'n2', type: 'follow', read: false,
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    actors: [{ _id: 'user_thomas', username: 'Thomas Petit', avatar: '' }],
  },
  {
    _id: 'n3', type: 'mention', read: false, postId: 'post_4',
    createdAt: new Date(Date.now() - 14400000).toISOString(),
    actors: [{ _id: 'user_elena', username: 'Elena Dubois', avatar: '' }],
    preview: "Totalement d'accord avec cette approche. Tu en penses quoi @Alex ? Les espaces blancs changent tout.",
  },
  {
    _id: 'n4', type: 'like', read: true, postId: 'post_2',
    createdAt: new Date(Date.now() - 43200000).toISOString(),
    actors: [
      { _id: 'user_marcus', username: 'Marcus Johnson', avatar: '' },
      { _id: 'user_elena', username: 'Elena Dubois', avatar: '' },
      { _id: 'user_thomas', username: 'Thomas Petit', avatar: '' },
    ],
    preview: "C'est exactement ce qu'il fallait faire.",
  },
  {
    _id: 'n5', type: 'follow', read: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    actors: [{ _id: 'user_marcus', username: 'Marcus Johnson', avatar: '' }],
  },
  {
    _id: 'n6', type: 'mention', read: true, postId: 'post_7',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    actors: [{ _id: 'user_sarah', username: 'Sarah Chen', avatar: '' }],
    preview: "Super boulot sur la refonte ! @Alex tu devrais regarder ce que Marcus a fait côté responsive.",
  },
]

// ──── CONVERSATIONS (messages) ─────────────────────────────────────────
export const MOCK_CONVERSATIONS = [
  {
    id: '1', user: MOCK_USERS.sarah,
    lastMsg: 'Toujours d\'accord pour la revue de design demain ?',
    time: new Date(Date.now() - 120000).toISOString(), unread: true,
  },
  {
    id: '2', user: MOCK_USERS.marcus,
    lastMsg: "Ça marche, je t'envoie le lien Figma ce soir.",
    time: new Date(Date.now() - 3600000).toISOString(), unread: true,
  },
  {
    id: '3', user: MOCK_USERS.elena,
    lastMsg: 'Peux-tu revoir le dernier rapport d\'accessibilité ?',
    time: new Date(Date.now() - 86400000).toISOString(), unread: false,
  },
  {
    id: '4', user: MOCK_USERS.thomas,
    lastMsg: "Fusionnons les changements typographiques d'abord.",
    time: new Date(Date.now() - 172800000).toISOString(), unread: false,
  },
  {
    id: '5', user: { ...MOCK_USERS.sarah, username: 'Design System Guild' },
    lastMsg: 'Elena: Les nouveaux tokens d\'espacement rendent super bien 👌',
    time: new Date(Date.now() - 604800000).toISOString(), unread: false,
  },
]

// ──── MOCK TOKEN ───────────────────────────────────────────────────────
export const MOCK_TOKEN = 'mock_jwt_token_for_frontend_testing_breezy_2024'
