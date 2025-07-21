// src/AuthUtils.js
export function buildCognitoOAuthUrl({ domain, region, clientId, redirectUri, provider = 'Google', scopes = ['openid','email','profile'] }) {
  // If domain already includes the hosted UI domain suffix, use it as-is
  const host = domain.includes('.auth.')
    ? domain
    : `${domain}.auth.${region}.amazoncognito.com`;
  const base = `https://${host}/oauth2/authorize`;
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    identity_provider: provider,
    scope: scopes.join(' '),
  });
  return `${base}?${params.toString()}`;
}