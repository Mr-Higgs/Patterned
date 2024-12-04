import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Next.js Supabase Auth',
  description: 'Authentication system using Next.js and Supabase',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" 
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

