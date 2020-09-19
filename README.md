# FacwareBaseFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

Generate module (simulate) `ng g m <route/module_name> --routing -m  <module_parent> -d`  
Generate component under a module configuration and skip test script `ng g c <component> --routing -m <parent_moduke>  -d  --skip-tests`

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

Run `ng build -c development` to build development environment

Run `ng build -c staging` to build staging environment

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Authentication

we are using JWT and OKTA modes, just fill the correct configuration in environment files and select the mode

we are using a service to support this behavior `AuthenticationService`

### Okta

```typescript
okta: {
  issuer: `${ProtocolTypes.Https}{replace-with-okta-domain}.okta.com/oauth2/default`,
  redirectUri: window.location.origin + '/implicit/callback',
  clientId: '{replace-with-client-id}',
  scope: `openid profile email nickname middle_name`.split(/\s+/),
  pkce: true
}
```

`authenticationMethod: AuthenticationMode.OKTA,`

 `, canActivate: [ OktaAuthGuard ]`  uncomment when use OKTA Guard in routing model

### JWT - self generated

`authenticationMethod: AuthenticationMode.JWT,`

## AdmiLTE

[Source Code](https://github.com/ColorlibHQ/AdminLTE/releases)
[Integrate](https://www.prishusoft.com/blog/Integrate-AdminLTE-theme-to-Angular-Project.html)
[AdminLTE-Angular](https://twanoo67.github.io/ngx-admin-lte/index.html)
