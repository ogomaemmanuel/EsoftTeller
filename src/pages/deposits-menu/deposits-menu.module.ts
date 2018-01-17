import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DepositsMenuPage } from './deposits-menu';

@NgModule({
  declarations: [
    DepositsMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(DepositsMenuPage),
  ],
})
export class DepositsMenuPageModule {}
