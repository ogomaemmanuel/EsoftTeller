import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AtmCardsPage } from './atm-cards';

@NgModule({
  declarations: [
    AtmCardsPage,
  ],
  imports: [
    IonicPageModule.forChild(AtmCardsPage),
  ],
})
export class AtmCardsPageModule {}
