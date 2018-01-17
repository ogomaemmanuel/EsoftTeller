import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BalacesPage } from './balaces';

@NgModule({
  declarations: [
    BalacesPage,
  ],
  imports: [
    IonicPageModule.forChild(BalacesPage),
  ],
})
export class BalacesPageModule {}
