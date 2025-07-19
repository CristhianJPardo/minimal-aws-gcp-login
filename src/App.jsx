// src/App.jsx
import React, { useState, useEffect } from 'react'
import {
  signUp,
  confirmSignUp,
  signIn,
  signOut,
  signInWithRedirect,
  getCurrentUser,
} from 'aws-amplify/auth'

export default function App() {
  console.log('🔄 App render start')
  const [user, setUser] = useState(null)
  const [form, setForm] = useState({ email: '', password: '', code: '' })
  const [stage, setStage] = useState('signIn') // 'signIn' | 'signUp' | 'confirm'

  useEffect(() => {
    console.log('🚀 useEffect: checking current user')
    ;(async () => {
      try {
        const u = await getCurrentUser()
        console.log('👤 Current user:', u)
        setUser(u)
      } catch (e) {
        console.log('👥 No hay usuario logueado')
        setUser(null)
      }
    })()
  }, [])

  const handleChange = e => {
    console.log('✍️ handleChange:', e.target.name, e.target.value)
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSignUp = async () => {
    console.log('📝 handleSignUp con:', form)
    try {
      const res = await signUp({
        username: form.email,
        password: form.password,
        options: { userAttributes: { email: form.email } },
      })
      console.log('✔️ signUp response:', res)
      setStage('confirm')
    } catch (err) {
      console.error('❌ signUp error:', err)
      alert(err.message || err)
    }
  }

  const handleConfirmSignUp = async () => {
    console.log('🔑 handleConfirmSignUp con código:', form.code)
    try {
      const res = await confirmSignUp({
        username: form.email,
        confirmationCode: form.code,
      })
      console.log('✔️ confirmSignUp response:', res)
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
      console.log('👤 Usuario tras signIn:', u)
      setUser(u)
    } catch (err) {
      console.error('❌ signIn error:', err)
      alert(err.message || err)
    }
  }

  const handleSignOut = async () => {
    console.log('🚪 handleSignOut')
    await signOut()
    console.log('✔️ signOut completo')
    setUser(null)
  }

  const handleGoogleSignIn = () => {
    console.log('🌐 handleGoogleSignIn: iniciando flujo OAuth')
    console.log('▶️ redirigir a:', import.meta.env.VITE_COGNITO_OAUTH_DOMAIN)
    signInWithRedirect({ provider: 'Google' })
  }

  if (user) {
    return (
      <div style={{ maxWidth: 300, margin: 'auto' }}>
        <h2>¡Bienvenido, {user.username}!</h2>
        <button onClick={handleSignOut}>Cerrar sesión</button>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 300, margin: 'auto' }}>
      {stage === 'signUp' && (
        <>
          <h3>Registro</h3>
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            onChange={handleChange}
          />
          <button onClick={handleSignUp}>Registrarse</button>
          <p>
            ¿Ya tienes cuenta?{' '}
            <span
              style={{ color: 'blue', cursor: 'pointer' }}
              onClick={() => setStage('signIn')}
            >
              Iniciar sesión
            </span>
          </p>
        </>
      )}

      {stage === 'confirm' && (
        <>
          <h3>Confirma tu cuenta</h3>
          <input
            name="code"
            placeholder="Código de verificación"
            onChange={handleChange}
          />
          <button onClick={handleConfirmSignUp}>Confirmar</button>
        </>
      )}

      {stage === 'signIn' && (
        <>
          <h3>Iniciar sesión</h3>
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            onChange={handleChange}
          />
          <button onClick={handleSignIn}>Entrar</button>
          <button
            style={{ marginTop: 10 }}
            onClick={handleGoogleSignIn}
          >
            Entrar con Google
          </button>
          <p>
            ¿No tienes cuenta?{' '}
            <span
              style={{ color: 'blue', cursor: 'pointer' }}
              onClick={() => setStage('signUp')}
            >
              Regístrate
            </span>
          </p>
        </>
      )}
    </div>
  )
}
