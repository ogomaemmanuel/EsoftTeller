import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { CustomerProvider } from '../../providers/customer/customer';
import { MinistatementProvider } from '../../providers/ministatement/ministatement';
import { MinistatementAccountsPage } from '../ministatement-accounts/ministatement-accounts';

/**
 * Generated class for the MinistatementMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ministatement-menu',
  templateUrl: 'ministatement-menu.html',
  providers: [MinistatementProvider, CustomerProvider]
})
export class MinistatementMenuPage {
  public accounts: any = []
  constructor(public navCtrl: NavController,
    public customerProvider: CustomerProvider,
    public ministatementProvider: MinistatementProvider,
    public loadingCtrl: LoadingController,
    public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MinistatementMenuPage');
  }
  getLoanAccounts() {

    let loader = this.loadingCtrl.create({
      content: "loading...",
    });
    loader.present();
    this.customerProvider.getLocallyStoredUserId().then(userId => {
      this.ministatementProvider.getLoansAccounts(userId).subscribe(userLoanAccounts => {
        loader.dismiss();
        this.accounts = userLoanAccounts;
        this.navCtrl.push(MinistatementAccountsPage, { accounts: this.accounts, accountType: "Loans Accounts" })
      })
    })

  }

  getSavingAccounts() {
    console.log("Savings Account")
    let loader = this.loadingCtrl.create({
      content: "loading...",
    });
    loader.present();
    this.customerProvider.getLocallyStoredUserId().then(userId => {
      this.ministatementProvider.getSavingsAccounts(userId).subscribe(userLoanAccounts => {
        this.accounts = userLoanAccounts;
        loader.dismiss();
        console.log("accounts from api", userLoanAccounts, "Accpunts", this.accounts);
        this.navCtrl.push(MinistatementAccountsPage, { accounts: this.accounts, accountType: "Savings Accounts" })
      })
    })

  }
  getSharesAccounts() {
    let loader = this.loadingCtrl.create({
      content: "lodaing...",
    });
    loader.present();
    this.customerProvider.getLocallyStoredUserId().then(userId => {
      this.ministatementProvider.getSharesAccounts(userId).subscribe(userLoanAccounts => {
        this.accounts = userLoanAccounts;
        loader.dismiss();
        this.navCtrl.push(MinistatementAccountsPage, { accounts: this.accounts, accountType: "Shares Accounts" })
      })
    })

  }
}
