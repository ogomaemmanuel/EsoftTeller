import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MinistatementPage } from './ministatement';

@NgModule({
  declarations: [
    MinistatementPage,
  ],
  imports: [
    IonicPageModule.forChild(MinistatementPage),
  ],
})
export class MinistatementPageModule {}
