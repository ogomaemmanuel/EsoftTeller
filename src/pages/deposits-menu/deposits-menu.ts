import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DepositTransactionPage } from '../deposit-transaction/deposit-transaction';
//import { AccountsDetailsServiceProvider } from '../../providers/acconts-details-service/acconts-details-service';
import { MinistatementProvider } from '../../providers/ministatement/ministatement';
import { CustomerProvider } from '../../providers/customer/customer';

/**
 * Generated class for the DepositsMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-deposits-menu',
  templateUrl: 'deposits-menu.html',
})
export class DepositsMenuPage {
private customer:any
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public ministatementProvider: MinistatementProvider,
    ) {
  }
  ngOnInit(): void {
    this.customer=this.navParams.get("customer");
      }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DepositsMenuPage');
  }
  getLoanAccounts(){ 
    
    this.ministatementProvider.getLoansAccounts(this.customer.tbl_CustomerID).subscribe(accounBalances=>{
    this.navCtrl.push(DepositTransactionPage,{accountDetails:accounBalances,accountCategory:"Loans",customer:this.customer});

  });
  }

  getSharesAccounts(){
    this.ministatementProvider.getSharesAccounts(this.customer.tbl_CustomerID).subscribe(accounBalances=>{
    this.navCtrl.push(DepositTransactionPage,{accountDetails:accounBalances,accountCategory:"Shares",customer:this.customer},);

  });
  }

  getSavingAccounts(){
    this.ministatementProvider.getSavingsAccounts(this.customer.tbl_CustomerID).subscribe(accounBalances=>{
      this.navCtrl.push(DepositTransactionPage,{accountDetails:accounBalances,accountCategory:"Savings",customer:this.customer});
  
    });
  }
}
