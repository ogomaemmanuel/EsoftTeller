import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChangePasswordPage } from '../change-password/change-password';
import { AccountsDetailsServiceProvider } from '../../providers/acconts-details-service/acconts-details-service';
import { Customer } from '../../models/customer';
import { CustomerProvider } from '../../providers/customer/customer';
import { AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(
    public navCtrl: NavController,
    private accountsDetailsServiceProvider: AccountsDetailsServiceProvider,
    private customerProvider: CustomerProvider,
    private alertCtrl: AlertController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }
  OpenChangePasswordPage() {
    this.navCtrl.push(ChangePasswordPage);
  }

  DeactivateAccount() {
    this.customerProvider.getLocallyStoredUserId().then(userId => {
      this.accountsDetailsServiceProvider.DeactivateAccount(userId).subscribe(resp => {
        let alert = this.alertCtrl.create({
          buttons: [
            {
              text: 'ok',
              handler: data => {
               this.navCtrl.setRoot(LoginPage);
              }
            },
          ],
          message: resp.json(),
        })
        alert.present();
      }, error => {
        let alert = this.alertCtrl.create({
          buttons: ['ok'],
          message: "Could not deactivate account, retry or visit nearest branch for help"
        })
        alert.present();
      });
    })
  }

  showDeactivatePrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Account Deactivation',
      message: "Are You sure you want to deactivate your acount. By deactivating you will not be able to use the service anymore",
      
      buttons: [
        {
          text: 'Yes',
          handler: data => {
           this.DeactivateAccount();
          }
        },
        {
          text: 'No',
          handler: data => {
          }
        }
      ]
    });
    prompt.present();
  }


}
