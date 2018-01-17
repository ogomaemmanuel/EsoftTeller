import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MinistatementAccountsPage } from './ministatement-accounts';

@NgModule({
  declarations: [
    MinistatementAccountsPage,
  ],
  imports: [
    IonicPageModule.forChild(MinistatementAccountsPage),
  ],
})
export class MinistatementAccountsPageModule {}
