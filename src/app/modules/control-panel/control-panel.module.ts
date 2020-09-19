import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlPanelRoutingModule } from './control-panel-routing';
import { OverviewComponent } from './components/overview/overview.component';

@NgModule({
  declarations: [OverviewComponent],
  imports: [
    CommonModule,
    ControlPanelRoutingModule
  ]
})
export class ControlPanelModule { }
