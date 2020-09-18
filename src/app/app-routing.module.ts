import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OktaAuthGuard, OktaCallbackComponent, OktaLoginRedirectComponent } from '@okta/okta-angular';
import { HomeComponent } from './components/home/home.component';
import { MessageListComponent } from './components/message-list/message-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'control-panel',
    loadChildren: () => import('./modules/control-panel/control-panel.module').then(m => m.ControlPanelModule)
    //, canActivate: [ OktaAuthGuard ]
  },
  {
    path: 'authentication',
    loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  { path: 'home', component: HomeComponent },
  { path: 'implicit/callback', component: OktaCallbackComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'messages', component: MessageListComponent },
  { path: '**', redirectTo: '/not-found' },
  { path: 'not-found', component: PageNotFoundComponent }
];
/**
 * Decorator for a moduel
 */
@NgModule({
  imports: [RouterModule.forRoot(routes
     // , {enableTracing: true} // enalbe this for debug routing
    )
  ],
  exports: [RouterModule] // export routes aputside this module (used in module who imports this module)
})
export class AppRoutingModule { }
