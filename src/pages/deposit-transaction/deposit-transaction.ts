import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AccountDetail } from '../../models/accountDetails';
import { DepositTransactionProvider } from '../../providers/deposit-transaction/deposit-transaction';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DeviceInfoProvider } from '../../providers/device-info/device-info';
import { CustomerProvider } from '../../providers/customer/customer';
import { GreatorThanZeroValidator } from '../../commonFunctions/GreatorThanZeroValidator';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import{Storage} from '@ionic/storage'
import { ErrorAlertProvider } from '../../providers/error-alert/error-alert';
import { PrintServiceProvider } from '../../providers/print-service/print-service';

/**
 * Generated class for the DepositTransactionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-deposit-transaction',
  templateUrl: 'deposit-transaction.html',
})
export class DepositTransactionPage implements OnInit {
  private accountDetails: any = [];
  private selectOptions: any;
  private depositFormGroup: FormGroup;
  public depositTrx: any;
  public customer: any;
  public trxTitle: any;
  constructor(public navCtrl: NavController,
    public depositTransactionProvider: DepositTransactionProvider,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public deviceInfoProvider: DeviceInfoProvider,
    public customerProvider: CustomerProvider,
    private loadingCtrl: LoadingController,
    private storage:Storage,
    private errorAlert: ErrorAlertProvider,
   private   PrintServiceProvider:PrintServiceProvider
  ) {
  }
  ngOnInit(): void {

    this.accountDetails = this.navParams.get('accountDetails');
    this.customer = this.navParams.get("customer");
    this.trxTitle = this.navParams.get("accountCategory");
    console.log("accountDetails in deposit-transaction.ts", this.accountDetails);
    this.selectOptions = {
      subTitle: 'Customer ' + this.trxTitle + ' Accounts',
      mode: 'md'
    };
    this.depositFormGroup = this.formBuilder.group({
      ProductCode: ['', Validators.compose([Validators.required])],
      TrxAmount: ['0.00', Validators.compose([GreatorThanZeroValidator.greatorThanZero, Validators.pattern('^\\d+(\\.(\\d{1,2})){0,1}$|^\\d{1,3}(,\\d{3})*(\\.\\d{1,2})*$'), Validators.required])],
      TellerLoginCode: [''],
    });
  }
  ionViewDidLoad() {

  }
  submit() {
    this.customerProvider.getLocallyStoredUser().then(user => {
      this.depositTrx = this.depositFormGroup.value;
      this.depositTrx.CustomerNo = this.navParams.get("customer").customerNo;
      this.depositTrx.customerName=this.navParams.get("customer").customerName;
      this.depositTrx.DeviceInfo = this.deviceInfoProvider.getDevice();
      this.depositTrx.TellerLoginCode = user.loginCode;
      let loader = this.loadingCtrl.create({
        content:"processing...."
      })
      loader.present();
      this.storage.get("token").then(token=>{
        this.depositTransactionProvider.depositCash(this.depositTrx,token).subscribe(res => {
          if (res.ok) {
            debugger;

            console.log("the receipt is at DepositTransactionPage",res.json())
            loader.dismiss();
            this.PrintServiceProvider.printFile(res.json()).then(()=>{
              this.showRedirectDialog();
            });
           // this.showRedirectDialog();
          }
        }, error => {
          loader.dismiss();
          this.errorAlert.alertError("Cash Deposit Error","")
        });
      });
     
    })
  }

  showRedirectDialog() {
    let alert = this.alertCtrl.create({
      title: 'Cash Deposit',
      message: '<p>Transaction posted successfully.</p>Do you want another transaction for ' + this.navParams.get("customer").customerName + "?",
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.navCtrl.push('DepositsMenuPage', { customer: this.customer });
          }
        },
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            this.navCtrl.setRoot('HomePage');
          }
        }
      ]
    });
    alert.present();
  }

  formatToCurrency() {
    let oldTrxAmount = this.depositFormGroup.controls["TrxAmount"].value;
    oldTrxAmount = oldTrxAmount

    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: '',
      minimumFractionDigits: 2,
      // the default value for minimumFractionDigits depends on the currency
      // and is usually already 2
    });
    console.log("formated amount is ", formatter.format(oldTrxAmount));
    this.depositFormGroup.controls["TrxAmount"].setValue(formatter.format(oldTrxAmount));
    this.depositFormGroup.controls["TrxAmount"].updateValueAndValidity();
  }
}
