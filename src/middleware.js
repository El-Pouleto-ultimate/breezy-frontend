import { NextResponse } from 'next/server'

/**
 * Middleware de protection des routes côté serveur.
 * Vérifie la présence d'un cookie d'authentification pour les routes protégées.
 * Complète la protection client-side du layout (app)/layout.js.
 */
export function middleware(request) {
  const { pathname } = request.nextUrl

  // Routes publiques : pas de vérification
  const publicPaths = ['/connect', '/signin', '/register', '/legal']
  const isPublic = publicPaths.some(p => pathname.startsWith(p))
    || pathname === '/'
    || pathname.startsWith('/api/')
    || pathname.startsWith('/_next/')
    || pathname.startsWith('/static/')
    || pathname.includes('.')

  if (isPublic) return NextResponse.next()

  // Routes protégées : vérifier le cookie d'auth
  const hasAuth = request.cookies.get('breezy_auth')?.value

  if (!hasAuth) {
    const url = request.nextUrl.clone()
    url.pathname = '/connect'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Appliquer le middleware à toutes les routes sauf :
     * - _next/static (fichiers statiques)
     * - _next/image (optimisation d'images)
     * - favicon.ico
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
