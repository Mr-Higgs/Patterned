import Link from 'next/link'
import Header from './components/Header'
import Footer from './components/Footer'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-text">Welcome to Patterned</h2>
            <p className="mt-2 text-center text-sm text-text">
              Please sign in or create an account to get started.
            </p>
          </div>
          <div className="mt-8 space-y-6">
            <div>
              <Link href="/auth/login" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-background bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                Sign In
              </Link>
            </div>
            <div>
              <Link href="/auth/signup" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-text bg-accent hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
        
      </main>
      <Footer />
    </div>
  )
}

