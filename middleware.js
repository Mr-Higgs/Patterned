import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export async function middleware(req) {
    try {
        const res = NextResponse.next()
        const supabase = createMiddlewareClient({ req, res })
        const { data: { session } } = await supabase.auth.getSession()

        // Define public routes
        const publicRoutes = ['/auth/login', '/auth/signup', '/auth/verify', '/auth/callback']
        if (publicRoutes.includes(req.nextUrl.pathname)) {
            // Redirect logged-in users to their dashboard
            if (session) {
                const userType = session.user?.user_metadata?.user_type || session.user?.user_metadata?.role
                const dashboardPath = userType === 'employee' ? '/dashboard/employee' : '/dashboard/employer'
                return NextResponse.redirect(new URL(dashboardPath, req.url))
            }
            return res
        }

        // Protect dashboard routes
        if (!session) {
            return NextResponse.redirect(new URL('/auth/login', req.url))
        }

        const userType = session.user?.user_metadata?.user_type || session.user?.user_metadata?.role
        const isEmployeeDashboard = req.nextUrl.pathname.startsWith('/dashboard/employee')
        const isEmployerDashboard = req.nextUrl.pathname.startsWith('/dashboard/employer')

        // Redirect based on user type
        if (isEmployeeDashboard && userType !== 'employee') {
            return NextResponse.redirect(new URL('/dashboard/employer', req.url))
        }
        
        if (isEmployerDashboard && userType !== 'employer') {
            return NextResponse.redirect(new URL('/dashboard/employee', req.url))
        }

        return res
    } catch (error) {
        console.error('Middleware error:', error)
        return NextResponse.redirect(new URL('/auth/login', req.url))
    }
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/auth/:path*'
    ]
}
