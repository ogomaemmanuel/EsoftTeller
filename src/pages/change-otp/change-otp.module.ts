import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangeOtpPage } from './change-otp';

@NgModule({
  declarations: [
    ChangeOtpPage,
  ],
  imports: [
    IonicPageModule.forChild(ChangeOtpPage),
  ],
  exports:[
    ChangeOtpPage
  ]
})
export class ChangeOtpPageModule {}
