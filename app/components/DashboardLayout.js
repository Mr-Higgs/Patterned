'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function DashboardLayout({ children }) {
    const router = useRouter()
    const supabase = createClientComponentClient()

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (!session) {
                router.push('/auth/login')
            }
        }

        checkUser()
    }, [router, supabase])

    return (
        <div className="min-h-screen bg-neutral-cream">
            <main>
                {children}
            </main>
        </div>
    )
}

