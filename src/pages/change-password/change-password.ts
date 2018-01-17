import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { AccountsDetailsServiceProvider } from '../../providers/acconts-details-service/acconts-details-service';
import { ErrorAlertProvider } from '../../providers/error-alert/error-alert';
import { CustomerProvider } from '../../providers/customer/customer';

/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage implements OnInit {
  private changePinFormGroup: FormGroup
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private accountsDetailsServiceProvider: AccountsDetailsServiceProvider,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private errorAlertProvider: ErrorAlertProvider,
    private customerProvider: CustomerProvider,
  ) {
  }

  ngOnInit(): void {
    this.changePinFormGroup = this.formBuilder.group({
      OldPin: ['', Validators.compose([Validators.required,Validators.maxLength(4),Validators.minLength(4), Validators.pattern('[0-9]{1,}')])],
      NewPin: ['', Validators.compose([Validators.required,Validators.maxLength(4),Validators.minLength(4), Validators.pattern('[0-9]{1,}')])],
      ConfirmPin: ['', Validators.compose([Validators.required,Validators.maxLength(4),Validators.minLength(4), Validators.pattern('[0-9]{1,}')])]
    });
  }
  ionViewDidLoad() {

  }
  changeOldPin() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();
    this.customerProvider.getLocallyStoredUserId().then(userId =>{
      let pinDetails=this.changePinFormGroup.value;
      pinDetails.userId=userId;
      this.accountsDetailsServiceProvider.ChangeCustomerPin(pinDetails).subscribe(resp => {
        if (resp.ok) {
          loader.dismiss();
          let alert = this.alertCtrl.create({
            message: "pin successfully changed",
            buttons: ['ok']
          })
          alert.present();
        }
      }, error => {
        loader.dismiss();
        this.errorAlertProvider.alertError(JSON.parse(error._body),"Password Update Error");
      })

    })
  }
}
