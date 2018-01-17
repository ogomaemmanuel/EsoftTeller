import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BalancesDetailsPage } from './balances-details';

@NgModule({
  declarations: [
    BalancesDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(BalancesDetailsPage),
  ],
})
export class BalancesDetailsPageModule {}
