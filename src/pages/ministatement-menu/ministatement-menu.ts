import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { CustomerProvider } from '../../providers/customer/customer';
import { MinistatementProvider } from '../../providers/ministatement/ministatement';
import { Customer } from '../../models/customer';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
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
export class MinistatementMenuPage implements OnInit {
  ngOnInit(): void {
   this.customer= this.navParams.get("customer");
  }
  public accounts: any = [];
  public customer:Customer=new Customer();
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
   
      this.ministatementProvider.getLoansAccounts( this.customer.tbl_CustomerID).subscribe(userLoanAccounts => {
        loader.dismiss();
        this.accounts = userLoanAccounts;
        this.navCtrl.push('MinistatementAccountsPage', { accounts: this.accounts, accountType: "Loans Accounts",customerId:this.customer.tbl_CustomerID })
      })
    

  }

  getSavingAccounts() {
    console.log("Savings Account")
    let loader = this.loadingCtrl.create({
      content: "loading...",
    });
    loader.present();
   
      this.ministatementProvider.getSavingsAccounts(this.customer.tbl_CustomerID).subscribe(userLoanAccounts => {
        this.accounts = userLoanAccounts;
        loader.dismiss();
        console.log("accounts from api", userLoanAccounts, "Accpunts", this.accounts);
        this.navCtrl.push('MinistatementAccountsPage', { accounts: this.accounts, accountType: "Savings Accounts",customerId:this.customer.tbl_CustomerID })
      })
  

  }
  getSharesAccounts() {
    let loader = this.loadingCtrl.create({
      content: "lodaing...",
    });
    loader.present();
   
      this.ministatementProvider.getSharesAccounts(this.customer.tbl_CustomerID).subscribe(userLoanAccounts => {
        this.accounts = userLoanAccounts;
        loader.dismiss();
        this.navCtrl.push('MinistatementAccountsPage', { accounts: this.accounts, accountType: "Shares Accounts",customerId:this.customer.tbl_CustomerID })
      })
    

  }
}
