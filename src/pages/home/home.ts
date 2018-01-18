import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { BalacesPage } from "../balaces/balaces";
import { Customer } from "../../models/customer";
import { CustomerDetailsserviceProvider } from "../../providers/customer-detailsservice/customer-detailsservice";
import { Events, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MinistatementMenuPage } from '../ministatement-menu/ministatement-menu';
import { AtmCardsPage } from '../atm-cards/atm-cards';
import { PopoverController } from 'ionic-angular/components/popover/popover-controller';
import { ExtraMenuPopoverPage } from '../extra-menu-popover/extra-menu-popover';
import { CompanyDetailsProvider } from '../../providers/company-details/company-details';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
export interface PageInterface {
  title: string;
  pageName: string;
  tabComponent?: any;
  index?: number;
  icon: string;
}
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [CustomerDetailsserviceProvider],

})
@IonicPage()
export class HomePage implements OnInit {

  private customer: Customer;
  public companyName: string = "";
  constructor(public menuCtrl: MenuController,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public events: Events,
    public customerDetPro: CustomerDetailsserviceProvider,
    public navCtrl: NavController,
    private popoverCtrl: PopoverController,
    private companyDetailsProvider: CompanyDetailsProvider,
    public navParams: NavParams) {

    //this.menuCtrl.enabled(true);

  }
  ionViewWillEnter() {
    this.menuCtrl.swipeEnable(true)
  }


  ngOnInit(): void {
    var userId = this.navParams.get('userId');
    console.log("the userId is ", userId);
    if (userId !== undefined) {
      /* let loader = this.loadingCtrl.create({
        content: "Please wait...",
      });
      loader.present(); */
      this.customerDetPro.getCustumerDetails(userId).subscribe(data => {
        this.customer = data;
        this.storage.set("customerDetails", JSON.stringify(this.customer))
        this.events.publish("userLogedIn", this.customer);
        //loader.dismiss();
      });

    }
  }
  ionViewDidLoad() {
    this.getCompanyName();
  }
  goToDepositCash() {
    this.navCtrl.push('DepositMainPage');
  }



  presentExtraMenuPopover(event: any) {
    let popover = this.popoverCtrl.create('ExtraMenuPopoverPage');
    popover.present({
      ev: event
    });
  }

  getCompanyName() {
    this.storage.get("companyName").then(companyName => {
      if (companyName != undefined) {
        this.companyName = companyName;
      }
      else {
        this.companyDetailsProvider.getCompanyName().subscribe(resp => {
          this.companyName = resp.json();
          this.storage.set("companyName", resp.json());
        }, error => { })
      }
    }).catch(errr => {
      this.companyDetailsProvider.getCompanyName().subscribe(resp => {
        this.companyName = resp.json();
        this.storage.set("companyName", resp.json());
      }, error => { })
    })

  }
}
