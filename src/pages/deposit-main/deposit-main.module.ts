import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DepositMainPage } from './deposit-main';

@NgModule({
  declarations: [
    DepositMainPage,
  ],
  imports: [
    IonicPageModule.forChild(DepositMainPage),
  ],
  exports:[
    DepositMainPage
  ]
})
export class DepositMainPageModule {}
