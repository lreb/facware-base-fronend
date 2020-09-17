import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { ApiRestService } from 'src/app/shared/services/api-rest.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  title = 'okta-client';
  isAuthenticated: boolean;
  infos;
  userName: string;

  constructor(
    public oktaAuth: OktaAuthService,
    private api: ApiRestService
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
    this.getData();
  }

  async ngOnInit() {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    console.log(this.oktaAuth.getAccessToken());
    console.log(this.oktaAuth.getIdToken());
    console.log(this.oktaAuth.getOktaConfig());
    console.log(this.oktaAuth.getUser());
    // returns an array of claims
    const userClaims = await this.oktaAuth.getUser();
    console.log(userClaims);
    // user name is exposed directly as property
    this.userName = userClaims.email;

    console.log(localStorage.getItem('okta-token-storage'))
  }

  logout() {
    this.oktaAuth.logout('/');
  }

  getData(): void {
    this.api.get(environment.apis.netCoreAPI.host, '',
    `OData/Album?$filter=name eq 'The Court of the Crimson King'&$select=id&$count=true`).subscribe(
      (data) => {
        console.log(data);
        this.infos = data;
      },
      (err: any) => console.log(err),
      () => console.log('done users')
    );
  }
}
