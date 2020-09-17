export const environment = {
  production: true,
  apis: {
    main: {
      host: 'https://gorest.co.in'
    },
    netCoreAPI: {
      host: 'https://localhost:5001'
    }
  },
  okta: {
    issuer: 'https://{replace-with-okta-domain}.okta.com/oauth2/default',
    redirectUri: window.location.origin + '/implicit/callback',
    clientId: '{replace-with-client-id}',
    scope: `openid profile email nickname middle_name`.split(/\s+/),
    pkce: true
  }
};
