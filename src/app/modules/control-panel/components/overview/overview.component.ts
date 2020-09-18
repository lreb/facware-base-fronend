import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { ApiRestService } from 'src/app/shared/services/api-rest.service';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  authMode = environment.authenticationMethod;
  isAuthenticated: boolean;
  infos;
  userName: string;

  constructor(
    public oktaAuth: OktaAuthService,
    private api: ApiRestService,
    private authenticationService: AuthenticationService
  ) {
    // // get authentication state for immediate use
    // this.oktaAuth.isAuthenticated().then(result => {
    //   this.isAuthenticated = result;
    // });
    // subscribe to authentication state changes
    // this.oktaAuth.$authenticationState.subscribe(
    //   (isAuthenticated: boolean) => {
    //     console.log(isAuthenticated);
    //     this.isAuthenticated = isAuthenticated;
    //   }
    // );
    this.getData();
  }

  async ngOnInit() {
    this.isAuthenticated = await this.authenticationService.validateAuthentication();
     // = await this.authenticationService.validateOktaAuthenticationPromise();

    // this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    // // returns an array of claims
    // const userClaims = await this.oktaAuth.getUser();
    // // user name is exposed directly as property
    // this.userName = userClaims.email;
  }

  logout() {
    this.authenticationService.logout();
  }

  getData(): void {
    this.api.get(environment.apis.netCoreAPI.host, '',
    `OData/Album?$filter=name eq 'The Court of the Crimson King'&$select=id&$count=true`).subscribe(
      (data) => {
        console.log(data);
        this.infos = data;
      },
      (err: any) => console.log(err),
      () => {
        // console.log('done users');
      }
    );
  }
}
