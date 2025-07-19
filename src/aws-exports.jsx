// src/aws-exports.js
export default {
  Auth: {
    region: import.meta.env.VITE_COGNITO_REGION,
    userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
    userPoolWebClientId: import.meta.env.VITE_COGNITO_APP_CLIENT_ID,
    oauth: {
      domain: import.meta.env.VITE_COGNITO_OAUTH_DOMAIN,
      scope: ['openid', 'email', 'profile'],
      redirectSignIn: import.meta.env.VITE_REDIRECT_SIGN_IN,
      redirectSignOut: import.meta.env.VITE_REDIRECT_SIGN_OUT,
      responseType: 'code',
    },
  },
}
