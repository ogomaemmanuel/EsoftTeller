import { Component, OnInit } from '@angular/core';
import { Platform, LoadingController } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserAuthProvider } from '../../providers/user-auth/user-auth';
import { AlertController, MenuController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { RegistrationPage } from '../registration/registration';
import { HomePage } from '../home/home';
import { ContactUsPage } from '../contact-us/contact-us';
import { ErrorAlertProvider } from '../../providers/error-alert/error-alert';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ChangeOtpPage } from '../change-otp/change-otp';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [UserAuthProvider]
})
export class LoginPage implements OnInit {
  public telephone: string;
  public pin: string;
  public memberNoStored: boolean;
  public userLoginFormGroup: FormGroup;
  constructor(public menuCtrl: MenuController,
    public userAuthProvider: UserAuthProvider,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private errorAlertProvider: ErrorAlertProvider,
    private loadingCtrl: LoadingController,
    private storage: Storage,
    public alertCtrl: AlertController) {
    // this.menuCtrl.enabled=false;
  }

  ngOnInit(): void {
    this.userLoginFormGroup = this.formBuilder.group({
      MemberNo: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{1,}')])],
      Pin: ['', Validators.compose([Validators.required, Validators.maxLength(4), Validators.minLength(4), Validators.pattern('[0-9]{4,4}')])],
     // DeviceInfo: new FormControl('', Validators.compose([Validators.required])),
    })
    //this.getUserMemberNo();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.menuCtrl.swipeEnable(false)

  }
  ionViewWillEnter() {
    this.menuCtrl.swipeEnable(false)
  }

  ionViewDidLeave() {

    this.menuCtrl.swipeEnable(false)
  }
  authenticate() {
    let MemberNo = this.userLoginFormGroup.value['MemberNo'];
    let pin = this.userLoginFormGroup.value['Pin']
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();
    this.userAuthProvider.authenticateUser(pin, MemberNo).subscribe(loginStatus => {
      if (loginStatus.ok) {
        loader.dismiss();
        if (loginStatus.json().user.otPwrd)
          this.navCtrl.push(ChangeOtpPage, { userId: loginStatus.json().user.tbl_CustomerId });
        else {
          this.storeUserMemberNo(MemberNo);
          this.navCtrl.setRoot(HomePage, { userId: loginStatus.json().user.tbl_CustomerId });
        }
      }
    }, error => {
      loader.dismiss();
      if (error.status == 400) {
        this.errorAlertProvider.alertError(JSON.parse(error._body), "Login Error");
      }
      else {
        this.errorAlertProvider.alertError("Could not login, retry or contact your nearest branch", "Login Error");
      }

    });
  }
  goToRegistrationPage() {
    this.navCtrl.push(RegistrationPage)
  }

  goToContactUsPage() {
    this.navCtrl.push(ContactUsPage);
  }
  presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }
  gotToForgotPasswordPage() {
    this.navCtrl.push(ForgotPasswordPage);
  }

  storeUserMemberNo(memberNo: string) {

    this.storage.set("MemberNo", memberNo);


  }

  getUserMemberNo() {
    this.storage.get("MemberNo").then(mem => {
      this.memberNoStored = true;

      return mem;
     
     
    }).catch(err=>{
      return '';
    });

  }
}
