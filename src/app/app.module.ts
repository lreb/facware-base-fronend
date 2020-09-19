import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  OKTA_CONFIG,
  OktaAuthModule,
  OktaAuthService
} from '@okta/okta-angular';

import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { MessageListComponent } from './components/message-list/message-list.component';
import { environment } from 'src/environments/environment';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';

/**
 * Okta configuration object
 */
const oktaConfig = {
  issuer: environment.okta.issuer,
  redirectUri: environment.okta.redirectUri,
  clientId: environment.okta.clientId,
  scope: environment.okta.scope,
  pkce: environment.okta.pkce,
  isAuthenticated: async function(authService: OktaAuthService) {
    const accessToken = await authService.getAccessToken();
    const idToken = await authService.getIdToken();
    return !!(accessToken && idToken);
  },
  tokenManager: {
    storage: 'sessionStorage'
  }
};

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    ProfileComponent,
    HomeComponent,
    MessageListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    OktaAuthModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: OKTA_CONFIG, useValue: oktaConfig },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
