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
  exports:[
    BalacesPage
  ]
})
export class BalacesPageModule {}
