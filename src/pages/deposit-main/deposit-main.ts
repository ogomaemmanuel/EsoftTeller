import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerDetailsserviceProvider } from '../../providers/customer-detailsservice/customer-detailsservice';
import { DepositProductCategoryPage } from '../deposit-product-category/deposit-product-category';
import { DepositsMenuPage } from '../deposits-menu/deposits-menu';

/**
 * Generated class for the DepositMainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-deposit-main',
  templateUrl: 'deposit-main.html',
  providers: [CustomerDetailsserviceProvider]
})
export class DepositMainPage {
  customerFormGroup: FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public customerDetailsserviceProvider: CustomerDetailsserviceProvider,
    public alertCtrl: AlertController,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DepositMainPage');
  }

  ngOnInit(): void {
    this.customerFormGroup = this.formBuilder.group({
      CustomerNo: [
        '',
        Validators.compose([Validators.maxLength(10),
        Validators.minLength(1),  
        Validators.pattern('[0-9]{1,6}'),
        Validators.required])
      ],
    });
  }
  submit() {
    this.customerDetailsserviceProvider
      .getCustomerDetailsByNumber(this.customerFormGroup.value.CustomerNo)
      .subscribe(resp => {
        if (resp.ok) {
          this.confirmDeposit(resp.json());
        }
      },
      err => {
        if (err.status == 404) {
          this.alertMemberNotFoundError(JSON.parse(err._body).message);
        }
      });

  }
  confirmDeposit(customer: any) {
    let alert = this.alertCtrl.create({
      title: 'Deposit Money',
      message: 'Do you want to deposit money to ' + customer.customerName+"?",
      buttons: [
      
        {
          text: 'Yes',
          handler: () => {
            this.navCtrl.push(DepositsMenuPage, { customer: customer });
          }
        },
        {
          text: 'No',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    });
    alert.present();
  }

  alertMemberNotFoundError(errorText: any) {
    let alert = this.alertCtrl.create({
      title: 'Member Not Found',
      message: errorText,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          }
        },
      ]
    });
    alert.present();

  }
}
