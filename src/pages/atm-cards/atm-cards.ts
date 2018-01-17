import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AtmCardsProvider } from '../../providers/atm-cards/atm-cards';
import { CustomerProvider } from '../../providers/customer/customer';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

/**
 * Generated class for the AtmCardsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-atm-cards',
  templateUrl: 'atm-cards.html',
  providers: [AtmCardsProvider, CustomerProvider]
})
export class AtmCardsPage implements OnInit {
  atmCardImagePath: string = "assets/images/credit-card.png";
  atmCards: any = []
  constructor(public customerProvider: CustomerProvider,
    public atmCardsProvider: AtmCardsProvider,
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    public navParams: NavParams) {
  }
  ngOnInit(): void {
    this.getAtmCards();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AtmCardsPage');
  }
  getAtmCards() {
    this.customerProvider.getLocallyStoredUserId().then(userId => {
      this.atmCardsProvider.getAtMCards(userId).subscribe(atmCards => {
        this.atmCards = atmCards;
      })
    })
  }

  blockAtmCard(atmCardId: string, cardIndex: number) {
    console.log("cardIndex is", cardIndex);

    this.customerProvider.getLocallyStoredUserId().then(userId => {
      this.atmCardsProvider.blockAtmCard(atmCardId, userId).subscribe(result => {
        if (result) {
          this.atmCards[cardIndex].enabled = 0;
          this.showSuccessMessage();
        }
      })
    });

  }

  confirmBlockAtm(atmCardId: string, cardIndex: number) {
    let alert = this.alertCtrl.create({
      message: "Do you want to block this Atm card?",
      buttons: [{
        text: "Yes",
        handler: () => {
          this.blockAtmCard(atmCardId, cardIndex);
        }
      },
      {
        text: "No",
        handler: () => {

        }
      }

      ]
    });
    alert.present();
  }

  showSuccessMessage() {
    let alert = this.alertCtrl.create({
      message: "Atm successfully blocked",
      buttons: ["Ok"]
    })
    alert.present();
  }
}
