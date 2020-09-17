import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';
import { OktaAuthService } from '@okta/okta-angular';
import { Observable, from } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private oktaAuth: OktaAuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.isAuthenticated()
      .pipe(mergeMap((isAuthenticated) => {
        if (!isAuthenticated) {
          return next.handle(request);
        }

        return this.getAccessToken()
          .pipe(
            mergeMap((accessToken) => {
              request = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${accessToken}`
                }
              });
              return next.handle(request);
            })
          );
      }))
  }

  private isAuthenticated(): Observable<boolean> {
    const observableFromPromise =  from(this.oktaAuth.isAuthenticated());
    return observableFromPromise;
  }

  private getAccessToken(): Observable<string> {
    const observableFromPromise =  from(this.oktaAuth.getAccessToken());
    return observableFromPromise;
  }
}
