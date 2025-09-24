'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Image from 'next/image'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-12 text-center max-w-md mx-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          🎉 Welcome!
        </h1>
        <div className="mb-6">
          {session.user?.image && (
            <Image
              src={session.user.image}
              alt="Profile"
              width={80}
              height={80}
              className="w-20 h-20 rounded-full mx-auto mb-4"
            />
          )}
          <p className="text-xl text-gray-700 mb-2">
            Hello, {session.user?.name}!
          </p>
          <p className="text-gray-600">
            You&apos;re logged in
          </p>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="bg-red-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-red-600 transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}
