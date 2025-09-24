'use client'

import { signIn } from 'next-auth/react'

export default function Home() {
  const handleFindSpiritAnimal = () => {
    signIn('twitter', { callbackUrl: '/dashboard' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-12 text-center max-w-md mx-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          🦄 Spirit Animal Finder
        </h1>
        <p className="text-gray-600 mb-8 text-lg">
          Discover your spirit animal by connecting your X (Twitter) account
        </p>
        <button
          onClick={handleFindSpiritAnimal}
          className="bg-black text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Find My Spirit Animal
        </button>
      </div>
    </div>
  )
}
