// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
