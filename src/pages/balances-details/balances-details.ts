import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AccountDetail } from '../../models/accountDetails';

/**
 * Generated class for the BalancesDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-balances-details',
  templateUrl: 'balances-details.html',
  providers: []
})
export class BalancesDetailsPage implements OnInit {
  public accountDetails: AccountDetail[] = [];
  public title: string = "";
  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {

  }
  ngOnInit(): void {
    this.accountDetails = this.navParams.get('accountDetails');
    this.title = this.navParams.get('modalTitle');
    console.log("Modal Title",this.navParams.get('modalTitle'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BalancesDetailsPage');
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
