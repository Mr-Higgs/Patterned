import { NextResponse } from 'next/server';
import { supabase } from './lib/supabase';

export async function middleware(req) {
  const url = req.nextUrl.clone();
  const pathname = req.nextUrl.pathname;

  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/signup', '/reset-password'];

  // Check session from Supabase
  const { data: session } = await supabase.auth.getSession();
  const role = session?.user?.role;

  // Allow access to public routes
  if (publicRoutes.includes(pathname)) {
    if (session && role) {
      // Redirect logged-in users away from public routes
      if (role === 'admin') return NextResponse.redirect(new URL('/dashboard/admin', req.url));
      if (role === 'employer') return NextResponse.redirect(new URL('/dashboard/employer', req.url));
      if (role === 'employee') return NextResponse.redirect(new URL('/dashboard/employee', req.url));
    }
    return NextResponse.next();
  }

  // Handle authenticated user redirection based on role
  if (session) {
    if (role === 'admin' && pathname !== '/dashboard/admin') {
      return NextResponse.redirect(new URL('/dashboard/admin', req.url));
    }
    if (role === 'employer' && pathname !== '/dashboard/employer') {
      return NextResponse.redirect(new URL('/dashboard/employer', req.url));
    }
    if (role === 'employee' && pathname !== '/dashboard/employee') {
      return NextResponse.redirect(new URL('/dashboard/employee', req.url));
    }
    return NextResponse.next();
  }

  // Redirect unauthenticated users to login
  if (!session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}
