import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountsDetailsServiceProvider } from '../../providers/acconts-details-service/acconts-details-service';
import { ErrorAlertProvider } from '../../providers/error-alert/error-alert';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { LoginPage } from '../login/login';

/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage implements OnInit {
  public forgotPasswordFormGroup: FormGroup;
  constructor(public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private accountsDetailsServiceProvider: AccountsDetailsServiceProvider,
    private errorAlertProvider: ErrorAlertProvider,
    private alertCtrl:AlertController,
    public navParams: NavParams) {
  }
  ngOnInit(): void {
    this.forgotPasswordFormGroup = this.formBuilder.group(
      {
        MemberNo: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{1,}')])],
        IdNo: ['', Validators.compose([Validators.required, Validators.pattern('[0-9A-Za-z]{1,}')])]
      })

  }

  ionViewDidLoad() {

  }

  public changePin() {
    let forgotPasswordDetais = this.forgotPasswordFormGroup.value;
    this.accountsDetailsServiceProvider.SubmitForgotPasswordDetails(forgotPasswordDetais).subscribe(resp => {
      let alert = this.alertCtrl.create({
        message: resp.json(),
        mode: 'md',
        buttons: [
          {
            text: 'ok',
            role: 'cancel',
            handler: () => {
              this.navCtrl.setRoot(LoginPage);
            }
          },
        ]
      });
      alert.present();


     }, error => {
      if (error.status == 400) {
        console.log("Forgot Pin Errors ", error._body);
        this.errorAlertProvider.alertError(JSON.parse(error._body), "Forgot Pin Errors");
      }
      else {
        this.errorAlertProvider.alertError("Could submit details, retry or contact your nearest branch", "Forgot Pin Errors");
      }

    });
  }

}
