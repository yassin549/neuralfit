'use client'
import { signIn, signOut, useSession } from 'next-auth/react'

export default function Home() {
  const { data: session } = useSession()
  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold">NeuralFit</h1>
      <p className="mt-4">MVP foundation</p>

      <div className="mt-6">
        {!session && (
          <button onClick={() => signIn('google')} className="btn">
            Sign in with Google
          </button>
        )}
        {session && (
          <>
            <p>Welcome, {session.user?.name}</p>
            <button onClick={() => signOut()} className="btn">
              Sign out
            </button>
          </>
        )}
      </div>
    </main>
  )
}
