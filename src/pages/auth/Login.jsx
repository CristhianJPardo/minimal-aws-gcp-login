import React, { useEffect, useState } from 'react'
import { signInWithRedirect, signOut, getCurrentUser } from 'aws-amplify/auth'

const Login = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const checkUser = async () => {
      try {
        const current = await getCurrentUser()
        console.log('👤 Usuario autenticado:', current)
        setUser(current)
      } catch {
        setUser(null)
        console.log('👥 No hay usuario autenticado')
      }
    }

    checkUser()
  }, [])

  const handleGoogleSignIn = () => {
    console.log('🌐 handleGoogleSignIn: iniciando flujo OAuth')
    console.log('🌍 window.location.origin:', window.location.origin)
    console.log('📍 Redirigiendo hacia Cognito...')
    signInWithRedirect({ provider: 'Google' })  // Esto lanza el error si ya hay sesión
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      setUser(null)
      console.log('🚪 Sesión cerrada')
    } catch (err) {
      console.error('❌ Error al cerrar sesión:', err)
    }
  }

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-primary p-8 rounded-xl shadow-2xl w-auto lg:w-[450px]">
          <h1 className="text-white text-center text-xl mb-6">
            Ya estás autenticado como <strong>{user.username}</strong>
          </h1>
          <button
            onClick={handleSignOut}
            className="bg-white text-black px-4 py-2 rounded-lg font-bold"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-primary p-8 rounded-xl shadow-2xl w-auto lg:w-[450px]">
        <h1 className="text-3xl text-center uppercase font-bold tracking-[5px] text-white mb-8">
          Iniciar <span className="text-secondary-900">sesión</span>
        </h1>
        <div className="flex justify-center mb-6">
          <button
            onClick={handleGoogleSignIn}
            className="bg-white text-black px-4 py-2 rounded-lg font-bold"
          >
            Entrar con Google
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
