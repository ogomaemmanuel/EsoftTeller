import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { RegistrationModel } from "../../models/registrationModel";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountsDetailsServiceProvider } from '../../providers/acconts-details-service/acconts-details-service';
import { LoginPage } from '../login/login';
import { Device } from '@ionic-native/device';
import { ErrorAlertProvider } from '../../providers/error-alert/error-alert';


/**
 * Generated class for the RegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
  providers: [AccountsDetailsServiceProvider]
})
export class RegistrationPage implements OnInit {

  registrationModel: RegistrationModel;
  registrationModelFormGroup: FormGroup;
  submitAttempt: boolean = false;
  constructor(
    public accountsDetailsServiceProvider: AccountsDetailsServiceProvider,
    public menuCtrl: MenuController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private errorAlertProvider: ErrorAlertProvider,
    private  loadingCtrl: LoadingController,
    private device: Device,
  ) {

  }

  ngOnInit(): void {
    this.registrationModel = new RegistrationModel()
    this.registrationModelFormGroup = this.formBuilder.group({
      CustomerNo: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{1,6}')])],
      IdNo: ['', Validators.compose([Validators.required, Validators.pattern('^\\w+$')])],
      //idNo: ['',Validators.compose([Validators.maxLength(10), Validators.pattern('[0-9]{5-10}'), Validators.required])],
    });
  }

  ionViewDidLoad() {
    this.menuCtrl.swipeEnable(false)
  }
  ionViewWillEnter() {

    this.menuCtrl.swipeEnable(false)
  }

  ionViewDidLeave() {

    this.menuCtrl.swipeEnable(false)
  }
  submit() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();
    this.submitAttempt = true;
    let registrationDetails = this.registrationModelFormGroup.value;
    registrationDetails.DeviceInfo = this.device.uuid||"ccb87f40a87ee5cf";
    this.accountsDetailsServiceProvider.registerNewUser(registrationDetails)
      .subscribe(resp => {
        loader.dismiss();
        if (resp.ok) {
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
        }
      }, error => {
        loader.dismiss();
        if (error.status == 400) {

          let erroMessages = JSON.parse(error._body);
          this.errorAlertProvider.alertError(erroMessages, "Registration Error");
        }
        else {
          this.errorAlertProvider.alertError("There was an error in Registration,retry or visit your nearest branch for help", "Registration Error");
        }

      });
  }
}
