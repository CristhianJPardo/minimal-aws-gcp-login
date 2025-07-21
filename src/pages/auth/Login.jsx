import React, { useEffect, useState } from 'react'
import {
  signIn,
  signUp,
  confirmSignUp,
  getCurrentUser,
  signOut,
  signInWithRedirect,
} from 'aws-amplify/auth'

const Login = () => {
  const [user, setUser] = useState(null)
  const [form, setForm] = useState({ email: '', password: '', code: '' })
  const [stage, setStage] = useState('signIn') // 'signIn' | 'signUp' | 'confirm'

  useEffect(() => {
    const checkUser = async () => {
      try {
        const u = await getCurrentUser()
        console.log('👤 Usuario autenticado:', u)
        setUser(u)
      } catch {
        setUser(null)
        console.log('👥 No hay usuario autenticado')
      }
    }

    checkUser()
  }, [])

  const handleChange = e => {
    console.log('✍️ handleChange:', e.target.name, e.target.value)
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleGoogleSignIn = () => {
    console.log('🌐 handleGoogleSignIn: iniciando flujo OAuth')
    signInWithRedirect({ provider: 'Google' })
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      console.log('🚪 Sesión cerrada')
      setUser(null)
    } catch (err) {
      console.error('❌ Error al cerrar sesión:', err)
    }
  }

  const handleSignUp = async () => {
    console.log('📝 handleSignUp con:', form)
    try {
      await signUp({
        username: form.email,
        password: form.password,
        options: { userAttributes: { email: form.email } },
      })
      setStage('confirm')
    } catch (err) {
      console.error('❌ signUp error:', err)
      alert(err.message || err)
    }
  }

  const handleConfirmSignUp = async () => {
    console.log('🔑 handleConfirmSignUp con código:', form.code)
    try {
      await confirmSignUp({
        username: form.email,
        confirmationCode: form.code,
      })
      setStage('signIn')
    } catch (err) {
      console.error('❌ confirmSignUp error:', err)
      alert(err.message || err)
    }
  }

  const handleSignIn = async () => {
    console.log('🔐 handleSignIn con:', form)
    try {
      const res = await signIn({
        username: form.email,
        password: form.password,
      })
      console.log('✔️ signIn response:', res)
      const u = await getCurrentUser()
      setUser(u)
    } catch (err) {
      console.error('❌ signIn error:', err)
      alert(err.message || err)
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
      <div className="bg-primary p-8 rounded-xl shadow-2xl w-auto lg:w-[450px] text-white">
        {stage === 'signUp' && (
          <>
            <h3 className="text-xl mb-4 font-bold">Registro</h3>
            <input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full mb-3 px-3 py-2 text-black rounded"
            />
            <input
              name="password"
              type="password"
              placeholder="Contraseña"
              onChange={handleChange}
              className="w-full mb-3 px-3 py-2 text-black rounded"
            />
            <button
              onClick={handleSignUp}
              className="bg-white text-black w-full py-2 rounded font-bold mb-4"
            >
              Registrarse
            </button>
            <p className="text-center">
              ¿Ya tienes cuenta?{' '}
              <a
                className="text-blue-400 underline cursor-pointer"
                onClick={() => setStage('signIn')}
              >
                Inicia sesión
              </a>
            </p>
          </>
        )}

        {stage === 'confirm' && (
          <>
            <h3 className="text-xl mb-4 font-bold">Confirmación</h3>
            <input
              name="code"
              placeholder="Código de verificación"
              onChange={handleChange}
              className="w-full mb-3 px-3 py-2 text-black rounded"
            />
            <button
              onClick={handleConfirmSignUp}
              className="bg-white text-black w-full py-2 rounded font-bold"
            >
              Confirmar
            </button>
          </>
        )}

        {stage === 'signIn' && (
          <>
            <h3 className="text-xl mb-4 font-bold">Iniciar sesión</h3>
            <input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full mb-3 px-3 py-2 text-black rounded"
            />
            <input
              name="password"
              type="password"
              placeholder="Contraseña"
              onChange={handleChange}
              className="w-full mb-3 px-3 py-2 text-black rounded"
            />
            <button
              onClick={handleSignIn}
              className="bg-white text-black w-full py-2 rounded font-bold mb-2"
            >
              Entrar
            </button>
            <button
              onClick={handleGoogleSignIn}
              className="bg-white text-black w-full py-2 rounded font-bold mt-2"
            >
              Entrar con Google
            </button>
            <p className="text-center mt-4">
              ¿No tienes cuenta?{' '}
              <a
                className="text-blue-400 underline cursor-pointer"
                onClick={() => setStage('signUp')}
              >
                Regístrate
              </a>
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default Login
