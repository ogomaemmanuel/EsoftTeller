import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExtraMenuPopoverPage } from './extra-menu-popover';

@NgModule({
  declarations: [
    ExtraMenuPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(ExtraMenuPopoverPage),
  ],
})
export class ExtraMenuPopoverPageModule {}
