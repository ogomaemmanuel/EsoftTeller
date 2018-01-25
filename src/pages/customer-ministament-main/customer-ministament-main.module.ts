import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerMinistamentMainPage } from './customer-ministament-main';

@NgModule({
  declarations: [
    CustomerMinistamentMainPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerMinistamentMainPage),
  ],
})
export class CustomerMinistamentMainPageModule {}
