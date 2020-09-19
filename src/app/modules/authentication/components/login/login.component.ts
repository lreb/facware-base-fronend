import { Component, OnInit } from '@angular/core';
import {
  OktaAuthService,
} from '@okta/okta-angular';
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
    this.isAuthenticated = await this.authenticationService.validateAuthentication();
  }

  login() {
    this.authenticationService.login();
  }

  logout() {
    this.authenticationService.logout();
  }

}
