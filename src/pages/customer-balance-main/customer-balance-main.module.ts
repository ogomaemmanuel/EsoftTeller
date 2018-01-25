import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerBalanceMainPage } from './customer-balance-main';

@NgModule({
  declarations: [
    CustomerBalanceMainPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerBalanceMainPage),
  ],
})
export class CustomerBalanceMainPageModule {}
