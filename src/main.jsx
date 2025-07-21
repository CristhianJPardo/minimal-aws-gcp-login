import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import './index.css'
import './App.css'

import { configureAmplify } from './auth/initAmplify'
import awsExports from './auth/aws-exports.jsx'

// Logs y configuración de Amplify (antes del render)
console.log('【ENV】', {
  REGION: import.meta.env.VITE_COGNITO_REGION,
  USER_POOL_ID: import.meta.env.VITE_COGNITO_USER_POOL_ID,
  CLIENT_ID: import.meta.env.VITE_COGNITO_APP_CLIENT_ID,
  OAUTH_DOMAIN: import.meta.env.VITE_COGNITO_OAUTH_DOMAIN,
  REDIRECT_IN: import.meta.env.VITE_REDIRECT_SIGN_IN,
  REDIRECT_OUT: import.meta.env.VITE_REDIRECT_SIGN_OUT,
})

console.log('【awsExports】', awsExports)

console.log('👉 Hosted UI domain (Gen2):', awsExports.Auth.Cognito.loginWith.oauth.domain)

console.log(
  '👉 Hosted UI full URL:',
  `https://${awsExports.Auth.Cognito.loginWith.oauth.domain}.auth.${awsExports.Auth.Cognito.region}.amazoncognito.com`
)

configureAmplify()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
