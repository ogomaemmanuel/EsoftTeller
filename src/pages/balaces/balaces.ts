import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events, LoadingController } from 'ionic-angular';
import { AccountsDetailsServiceProvider } from '../../providers/acconts-details-service/acconts-details-service';
import { AccountDetail } from '../../models/accountDetails';
import { BalancesDetailsPage } from '../balances-details/balances-details';
import { Http } from '@angular/http';
import { Customer } from '../../models/customer';
import { CustomerProvider } from '../../providers/customer/customer';

/**
 * Generated class for the BalacesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-balaces',
  templateUrl: 'balaces.html',
  providers: [AccountsDetailsServiceProvider, CustomerProvider]
})
export class BalacesPage implements OnInit {
  public customer: Customer = new Customer();
  public x: any;
  public accountDetails: AccountDetail[];
  public accountDetails2: AccountDetail[]
  private loaderMessage:string="loading";
  constructor(public events: Events,
    public http: Http, public modalCtrl: ModalController,
    public accountdetailProv: AccountsDetailsServiceProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public customerProvider: CustomerProvider,
    public loadingCtrl: LoadingController
  ) {
  }

  ngOnInit(): void {

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BalacesPage');
  }

  getSavingsBalances() {
    let loader = this.loadingCtrl.create({
      content: this.loaderMessage,
    });
    loader.present();
    this.customerProvider.getLocallyStoredUserId().then(customerId => {
      this.accountdetailProv.getSavingsAccountDetails(customerId).subscribe(accounBalances => {
        this.accountDetails = accounBalances;
        loader.dismiss();
        let modal = this.modalCtrl.create(BalancesDetailsPage,{accountDetails:this.accountDetails,modalTitle:"Saving Balances" });
        modal.present();
      });
    });
  }

  getShareBalances() {
    let loader = this.loadingCtrl.create({
      content: this.loaderMessage,
    });
    loader.present();
    this.customerProvider.getLocallyStoredUserId().then(customerId => {
      this.accountdetailProv.getSharesAccountDetails(customerId)
      .subscribe(accounBalances => {
        this.accountDetails = accounBalances;
        loader.dismiss();
        let modal = this.modalCtrl.create(BalancesDetailsPage,
          {accountDetails:this.accountDetails,modalTitle:"Share Balances" });
        modal.present();
      });
    });
  }

  getLoanBalances() {
    let loader = this.loadingCtrl.create({
      content:this.loaderMessage,
    });
    loader.present();
    this.customerProvider.getLocallyStoredUserId().then(customerId => {
      this.accountdetailProv.getLoansAccountDetails(customerId).subscribe(accounBalances => {
        this.accountDetails = accounBalances;
        loader.dismiss();
        let modal = this.modalCtrl.create(BalancesDetailsPage,{accountDetails:this.accountDetails,modalTitle:"Loan Balaces" });
        modal.present();
      });
    });
  }

}
