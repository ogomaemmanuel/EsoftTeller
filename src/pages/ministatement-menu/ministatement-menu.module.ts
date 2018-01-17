import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MinistatementMenuPage } from './ministatement-menu';

@NgModule({
  declarations: [
    MinistatementMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(MinistatementMenuPage),
  ],
})
export class MinistatementMenuPageModule {}
