import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ChangePasswordPage } from '../change-password/change-password';

/**
 * Generated class for the ExtraMenuPopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-extra-menu-popover',
  templateUrl: 'extra-menu-popover.html',
})
export class ExtraMenuPopoverPage {

  constructor( public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
   
  }
  OpenChangePasswordPage() {
    this.navCtrl.push(ChangePasswordPage).then(() => { this.viewCtrl.dismiss(ExtraMenuPopoverPage); });
   
  }

}
