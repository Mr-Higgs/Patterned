import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { email, userType } = await request.json()
    const supabase = createRouteHandlerClient({ cookies })

    const { data, error } = await supabase
      .from('newsletter_subscriptions')
      .insert([
        { email, user_type: userType }
      ])
      .select()

    if (error) {
      if (error.code === '23505') { // Unique violation error code
        return NextResponse.json(
          { error: 'This email is already subscribed to our newsletter.' },
          { status: 400 }
        )
      }
      throw error
    }

    return NextResponse.json(
      { message: 'Successfully subscribed to newsletter!', data },
      { status: 200 }
    )
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter.' },
      { status: 500 }
    )
  }
} 