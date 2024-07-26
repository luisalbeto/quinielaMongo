// middleware.ts
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret });

  // Definir las rutas protegidas
  const protectedRoutes = ['/dashboard', '/results', '/ranking', '/groups', '/predictions'];

  // Comprobar si la ruta actual está en la lista de rutas protegidas
  const isProtectedRoute = protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route));

  // Redirigir si no hay token en una ruta protegida
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Permitir el acceso si la ruta no es protegida o el usuario está autenticado
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/results/:path*', '/ranking/:path*', '/groups/:path*', '/predictions/:path*'],
};
