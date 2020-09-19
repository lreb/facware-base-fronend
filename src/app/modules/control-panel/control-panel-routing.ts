import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './components/overview/overview.component';
import { OktaAuthGuard } from '@okta/okta-angular';

/**
 * Set routes configuration for this child module
 */
const routes: Routes = [
  { path: 'overview', component: OverviewComponent }
];

/**
 * Decorator
 */
@NgModule({
  imports: [RouterModule.forChild(routes)], // routes configuration
  exports: [RouterModule] // exports this module
})
export class ControlPanelRoutingModule { }
