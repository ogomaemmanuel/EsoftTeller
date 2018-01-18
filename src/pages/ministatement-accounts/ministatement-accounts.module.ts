import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MinistatementAccountsPage } from './ministatement-accounts';
import { PipesModule } from '../../commonFunctions/pipes.module';

@NgModule({
  declarations: [
    MinistatementAccountsPage,
    //PipesModule
  ],
  imports: [
    IonicPageModule.forChild(MinistatementAccountsPage),
    PipesModule
  ],
  exports:[
    MinistatementAccountsPage
  ]
})
export class MinistatementAccountsPageModule {}
