import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DepositTransactionPage } from './deposit-transaction';

@NgModule({
  declarations: [
    DepositTransactionPage,
  ],
  imports: [
    IonicPageModule.forChild(DepositTransactionPage),
  ],
  exports:[
    DepositTransactionPage
  ]
})
export class DepositTransactionPageModule {}
