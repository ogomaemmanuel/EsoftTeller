import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AtmCardsPage } from './atm-cards';
import { TrimPipe } from '../../commonFunctions/TrimPipe';
import { PipesModule } from '../../commonFunctions/pipes.module';

@NgModule({
  declarations: [
    AtmCardsPage,
    //TrimPipe
  ],
  imports: [
    IonicPageModule.forChild(AtmCardsPage),
    PipesModule
  ],
  exports:[
    AtmCardsPage
  ]
})
export class AtmCardsPageModule {}
