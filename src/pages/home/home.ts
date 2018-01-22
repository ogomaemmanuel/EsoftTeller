import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PopoverController } from 'ionic-angular/components/popover/popover-controller';
import { CompanyDetailsProvider } from '../../providers/company-details/company-details';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { TellerServiceProvider } from '../../providers/teller-service/teller-service';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
@IonicPage()
export class HomePage implements OnInit {
  public companyName: string = "";
  constructor(public menuCtrl: MenuController,
    public storage: Storage,
    public events: Events,
    public navCtrl: NavController,
    private popoverCtrl: PopoverController,
    private companyDetailsProvider: CompanyDetailsProvider,
    private tellerServiceProvider: TellerServiceProvider,
    public navParams: NavParams) {

  }
  ionViewWillEnter() {
    this.menuCtrl.swipeEnable(true)
  }


  ngOnInit(): void {
    var userId = this.navParams.get('userId');
    console.log("the userId is ", userId);
    if (userId !== undefined) {
      this.tellerServiceProvider.GetTellerDetails(userId).subscribe(data => {
       let teller = data;
        this.storage.set("customerDetails", JSON.stringify(teller.json()))
        this.events.publish("userLogedIn", teller.json());
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
