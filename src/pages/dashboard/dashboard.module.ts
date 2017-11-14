import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { Dashboard } from './dashboard';

@NgModule({
  declarations: [
    Dashboard,
  ],
  imports: [
    IonicPageModule.forChild(Dashboard),
    TranslateModule.forChild()
  ],
  exports: [
    Dashboard
  ]
})
export class DashboardModule { }
