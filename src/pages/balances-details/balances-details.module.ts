import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BalancesDetailsPage } from './balances-details';
import { PipesModule } from '../../commonFunctions/pipes.module';

@NgModule({
  declarations: [
    BalancesDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(BalancesDetailsPage),
    PipesModule
  ],
  exports:[
    BalancesDetailsPage
  ]
})
export class BalancesDetailsPageModule {}
