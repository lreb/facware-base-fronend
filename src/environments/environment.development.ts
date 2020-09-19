import { AuthenticationMode, ProtocolTypes } from 'src/app/shared/constants/general';

export const environment = {
  production: true,
  apis: {
    main: {
      host: `${ProtocolTypes.Https}gorest.co.in`
    },
    netCoreAPI: {
      host: `${ProtocolTypes.Https}localhost:5001`
    }
  },
  authenticationMethod: AuthenticationMode.OKTA,
  okta: {
    issuer: `${ProtocolTypes.Https}{replace-with-okta-domain}.okta.com/oauth2/default`,
    redirectUri: window.location.origin + '/implicit/callback',
    clientId: '{replace-with-client-id}',
    scope: `openid profile email nickname middle_name`.split(/\s+/),
    pkce: true
  }
};
