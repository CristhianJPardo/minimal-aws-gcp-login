// src/OAuth2Redirect.jsx
import { useEffect } from 'react'
import { handleSignIn } from 'aws-amplify/auth'

export default function OAuth2Redirect() {
  useEffect(() => {
    (async () => {
      try {
        await handleSignIn()
        window.location.href = '/' // o la ruta que quieras post-login
      } catch (err) {
        console.error('❌ Error manejando redirección OAuth:', err)
        alert('No se pudo completar el inicio de sesión.')
      }
    })()
  }, [])

  return <p>Procesando inicio de sesión...</p>
}
