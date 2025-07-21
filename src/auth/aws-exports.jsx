// src/aws-exports.jsx
export default {
  Auth: {
    Cognito: {
      // Región y User Pool
      region: import.meta.env.VITE_COGNITO_REGION,
      userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
      userPoolClientId: import.meta.env.VITE_COGNITO_APP_CLIENT_ID,

      // Gen 2 – ✅ loginWith.oauth
      loginWith: {
        oauth: {
          // Sólo el prefijo; Amplify añadirá
          //   https://<prefix>.auth.<region>.amazoncognito.com
          domain: import.meta.env.VITE_COGNITO_OAUTH_DOMAIN,
          scopes: ['openid','email','profile'],
          redirectSignIn: [import.meta.env.VITE_REDIRECT_SIGN_IN],
          redirectSignOut: [import.meta.env.VITE_REDIRECT_SIGN_OUT],
          responseType: 'code',
        },
        // habilitamos sólo email/password
        email: true,
        username: false,
        phone: false,
      },
    },
  },
}
