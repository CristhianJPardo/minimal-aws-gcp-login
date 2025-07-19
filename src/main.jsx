// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Amplify } from 'aws-amplify'
import awsExports from './aws-exports'
import App from './App'

// 1. Mostrar en consola las env vars clave
console.log('【ENV】', {
  REGION: import.meta.env.VITE_COGNITO_REGION,
  USER_POOL_ID: import.meta.env.VITE_COGNITO_USER_POOL_ID,
  CLIENT_ID: import.meta.env.VITE_COGNITO_APP_CLIENT_ID,
  OAUTH_DOMAIN: import.meta.env.VITE_COGNITO_OAUTH_DOMAIN,
  REDIRECT_IN: import.meta.env.VITE_REDIRECT_SIGN_IN,
  REDIRECT_OUT: import.meta.env.VITE_REDIRECT_SIGN_OUT,
})

// 2. Mostrar la config completa de aws-exports
console.log('【awsExports】', awsExports)

// 3. Prefijo de Hosted UI (Gen 2)
console.log(
  '👉 Hosted UI domain (Gen2):',
  awsExports.Auth.Cognito.loginWith.oauth.domain
)

// 4. URL completa de Hosted UI
console.log(
  '👉 Hosted UI full URL:',
  `https://${awsExports.Auth.Cognito.loginWith.oauth.domain}.auth.${awsExports.Auth.Cognito.region}.amazoncognito.com`
)

// 5. Configurar Amplify
Amplify.configure(awsExports)
console.log('✅ Amplify configured')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
