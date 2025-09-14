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
          <button onClick={() => signIn('google', { callbackUrl: process.env.NEXT_PUBLIC_BACKEND_URL })} className="p-2 bg-blue-500 text-white rounded">
            Sign in with Google
          </button>
        )}
        {session && (
          <>
            <p>Welcome, {session.user?.name}</p>
            <a href="/chat" className="p-2 bg-green-500 text-white rounded mt-2 inline-block">Go to Chat</a>
            <button onClick={() => signOut()} className="p-2 bg-red-500 text-white rounded mt-2 ml-2">
              Sign out
            </button>
          </>
        )}
      </div>
    </main>
  )
}
