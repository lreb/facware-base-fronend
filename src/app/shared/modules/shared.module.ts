import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
// import { JwtInterceptor } from '../interceptors/jwt-interceptor';
// import { AuthErrorInterceptor } from '../interceptors/auth-error-interceptor';
// import { NgxWebstorageModule } from 'ngx-webstorage';
// import { appInitializer } from '../services/app-initializer';
// import { AuthenticationService } from '../services/authenticator-service';

@NgModule({
  declarations: [
    // RateComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    // FontAwesomeModule, // modules
  ],
  exports: [
    // RateComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    // { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AuthenticationService] },
    // AuthenticationService,
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: AuthErrorInterceptor, multi: true }
  ]
})
export class SharedModule { }
