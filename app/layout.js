import { Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat'
})

export const metadata = {
  title: 'Next.js Supabase Auth',
  description: 'Authentication system using Next.js and Supabase',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable}`}>
      <body className="font-['Montserrat',sans-serif]">
        {children}
      </body>
    </html>
  )
}

