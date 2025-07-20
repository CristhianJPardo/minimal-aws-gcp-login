// src/OAuth2Redirect.jsx
import { useEffect } from 'react'
import { Hub } from 'aws-amplify/utils'
import { getCurrentUser } from 'aws-amplify/auth'

export default function OAuth2Redirect() {
  useEffect(() => {
    console.log('🔁 Escuchando eventos de autenticación (Gen 2)')

    const listener = async ({ payload }) => {
      const { event } = payload
      console.log('🎯 Evento recibido:', event)

      if (event === 'signInWithRedirect') {
        try {
          const user = await getCurrentUser()
          console.log('✅ Usuario autenticado:', user)
          window.location.href = '/'
        } catch (err) {
          console.error('❌ Error al obtener usuario:', err)
        }
      } else if (event === 'signInWithRedirect_failure') {
        console.error('❌ Fallo de login:', payload)
        alert('No se pudo iniciar sesión.')
      }
    }

    Hub.listen('auth', listener)

    return () => {
      Hub.remove('auth', listener)
    }
  }, [])

  return <p>Procesando inicio de sesión...</p>
}
