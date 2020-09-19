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

    this.validateAuthentication();

    this.Okta = environment.authenticationMethod === AuthenticationMode.OKTA ? true : false;
    this.Jwt = environment.authenticationMethod === AuthenticationMode.JWT ? true : false;
    if (this.Okta) {

    }
    if (this.Jwt) {

    }
  }
  /**
   * Validate user authetication
   */
  async validateAuthentication(){
    if (this.Okta) {
      this.isAuthenticated = await this.oktaAuth.isAuthenticated();
      return this.isAuthenticated;
    } else if (this.Jwt) {
      const helper = new JwtHelperService();
      const isExpired = helper.isTokenExpired(this.getUserToken());
      return !isExpired;
    }
  }

  /**
   * Login and create a JWT/Okta
   */
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
  /**
   * clean session
   */
  logout() {
    if (this.Okta) {
      localStorage.clear();
      this.oktaAuth.logout('/');
    } else if (this.Jwt) {
      localStorage.clear();
      this.router.navigate(['/']);
    }
  }
  /**
   * Get user token for JWT mode
   */
  getUserToken(): string {
    const userStorage = JSON.parse(localStorage.getItem(LocalStorageItems.FacwareUserDataStorage));
    return userStorage !== null ? userStorage.token : '';
  }
}
