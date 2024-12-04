import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export async function middleware(req) {
    try {
        const res = NextResponse.next()
        const supabase = createMiddlewareClient({ req, res })

        const {
            data: { session },
            error: sessionError
        } = await supabase.auth.getSession()

        if (sessionError) {
            console.error('Session error:', sessionError)
            return NextResponse.redirect(new URL('/auth/login', req.url))
        }

        // Protect dashboard routes
        if (req.nextUrl.pathname.startsWith('/dashboard')) {
            if (!session) {
                console.log('No session found, redirecting to auth/login')
                return NextResponse.redirect(new URL('/auth/login', req.url))
            }

            // Get user type from session
            const userType = session.user?.user_metadata?.user_type || session.user?.user_metadata?.role
            console.log('User type:', userType)

            if (!userType) {
                console.log('No user type found, redirecting to auth/login')
                return NextResponse.redirect(new URL('/auth/login', req.url))
            }

            // Check for unauthorized access attempts
            const isEmployeeDashboard = req.nextUrl.pathname.startsWith('/dashboard/employee')
            const isEmployerDashboard = req.nextUrl.pathname.startsWith('/dashboard/employer')

            // Only redirect if user tries to access the wrong dashboard
            if (isEmployeeDashboard && userType === 'employer') {
                console.log('Unauthorized access to employee dashboard, redirecting to employer dashboard')
                return NextResponse.redirect(new URL('/dashboard/employer', req.url))
            }
            
            if (isEmployerDashboard && userType === 'employee') {
                console.log('Unauthorized access to employer dashboard, redirecting to employee dashboard')
                return NextResponse.redirect(new URL('/dashboard/employee', req.url))
            }
        }

        return res
    } catch (error) {
        console.error('Middleware error:', error)
        return NextResponse.redirect(new URL('/auth/login', req.url))
    }
}

export const config = {
    matcher: ['/dashboard/:path*']
}
