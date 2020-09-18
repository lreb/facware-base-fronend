import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';
import { environment } from 'src/environments/environment';
import { AuthenticationMode, LocalStorageItems } from '../../constants/general';
import { ApiRestService } from '../api-rest.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationMode = environment.authenticationMethod;
  Okta = false;
  Jwt = false;

  isAuthenticated: boolean;

  constructor(
    public oktaAuth: OktaAuthService,
    public apiService: ApiRestService,
    private router: Router
  ) {
    // get authentication state for immediate use
    this.oktaAuth.isAuthenticated().then(result => {
      this.isAuthenticated = result;
    });
    // subscribe to authentication state changes
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean) => {
        console.log(isAuthenticated);
        this.isAuthenticated = isAuthenticated;
      }
    );

    this.validateOktaAuthentication();

    this.Okta = environment.authenticationMethod === AuthenticationMode.OKTA ? true : false;
    this.Jwt = environment.authenticationMethod === AuthenticationMode.JWT ? true : false;
    if (this.Okta) {

    }
    if (this.Jwt) {

    }
  }

  async validateAuthentication(){
    if (this.Okta) {
      return this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    } else if (this.Jwt) {
      const helper = new JwtHelperService();
      const isExpired = helper.isTokenExpired(this.getUserToken());
      return !isExpired;
    }
  }

  async validateOktaAuthentication(){
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
  }

  async validateOktaAuthenticationPromise(): Promise<boolean>{
    return await this.oktaAuth.isAuthenticated();
  }

  login() {
    if (this.Okta) {
      this.oktaAuth.loginRedirect('/control-panel/overview');
    } else if (this.Jwt) {
      const objectDemo = {
        id: 0,
        name: 'demo user name',
        email: 'demo@email.com',
        password: 'MysecurePassword'
      };
      this.apiService.post(environment.apis.netCoreAPI.host, '', 'api/Authentication', objectDemo).subscribe(result => {
        localStorage.setItem(LocalStorageItems.FacwareUserDataStorage, JSON.stringify(result.user));
        this.router.navigate(['control-panel', 'overview']);
      },
      (err: any) => console.log(err),
      () => {
        // console.log('done jwt');
      });
    }
  }

  logout() {
    if (this.Okta) {
      localStorage.clear();
      this.oktaAuth.logout('/');
    } else if (this.Jwt) {
      localStorage.clear();
      this.router.navigate(['/']);
    }
  }

  getUserToken(): string {
    const userStorage = JSON.parse(localStorage.getItem(LocalStorageItems.FacwareUserDataStorage));
    return userStorage !== null ? userStorage.token : '';
  }
}
