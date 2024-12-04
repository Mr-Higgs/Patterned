import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    
    try {
      await supabase.auth.exchangeCodeForSession(code)
      
      // Get the user's type to determine which dashboard to redirect to
      const { data: { session } } = await supabase.auth.getSession()
      const userType = session?.user?.user_metadata?.user_type || session?.user?.user_metadata?.role
      
      // Redirect based on user type
      const redirectPath = userType === 'employee' 
        ? '/dashboard/employee'
        : '/dashboard/employer'

      return NextResponse.redirect(new URL(redirectPath, requestUrl.origin))
    } catch (error) {
      console.error('Error in auth callback:', error)
      return NextResponse.redirect(new URL('/auth/login', requestUrl.origin))
    }
  }

  // If no code, redirect to login
  return NextResponse.redirect(new URL('/auth/login', requestUrl.origin))
} 