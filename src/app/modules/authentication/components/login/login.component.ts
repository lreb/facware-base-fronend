import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  OktaAuthService,
} from '@okta/okta-angular';
import { AuthenticationMode } from 'src/app/shared/constants/general';
import { ApiRestService } from 'src/app/shared/services/api-rest.service';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  authenticationMode = environment.authenticationMethod;
  Okta = false;
  Jwt = false;

  title = 'okta-client';
  isAuthenticated: boolean;

  constructor(
    public oktaAuth: OktaAuthService,
    public apiService: ApiRestService,
    private router: Router,
    private authenticationService: AuthenticationService
    ) {
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean) => {
        console.log(isAuthenticated);
        this.isAuthenticated = isAuthenticated;
      }
    );
  }

  async ngOnInit() {
    this.Okta = this.authenticationService.Okta;
    this.Jwt = this.authenticationService.Jwt;
    this.isAuthenticated = await this.authenticationService.validateOktaAuthenticationPromise(); // await this.oktaAuth.isAuthenticated();
    // this.Okta = environment.authenticationMethod === AuthenticationMode.OKTA ? true : false;
    // this.Jwt = environment.authenticationMethod === AuthenticationMode.JWT ? true : false;
    // const userStorage = JSON.parse(localStorage.getItem('facware-user-data-storage'));
    // console.log(userStorage);
    // console.log(userStorage.token);
    // console.log(userStorage.name);
    // console.log(userStorage.email);
  }

  login() {
    this.authenticationService.login();
    // if (this.Okta) {
    //   this.oktaAuth.loginRedirect('/control-panel/overview');
    // }
    // if (this.Jwt) {
    //   const objectDemo = {
    //     id: 0,
    //     name: 'demo user name',
    //     email: 'demo@email.com',
    //     password: 'MysecurePassword'
    //   };
    //   this.apiService.post(environment.apis.netCoreAPI.host, '', 'api/Authentication', objectDemo).subscribe(result => {
    //     console.log(result.user.token);
    //     localStorage.setItem('facware-user-data-storage', JSON.stringify(result.user));
    //     this.router.navigate(['control-panel', 'overview']);
    //   },
    //   (err: any) => console.log(err),
    //   () => console.log('done jwt'));
    // }
  }

  logout() {
    this.authenticationService.logout();
    // if (this.Okta) {
    //   this.oktaAuth.logout('/');
    // }
    // if (this.Jwt) {
    //   this.router.navigate(['/']);
    // }
  }

}
