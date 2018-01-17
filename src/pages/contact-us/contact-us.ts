import { Component ,OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

/**
 * Generated class for the ContactUsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact-us',
  templateUrl: 'contact-us.html',
})
export class ContactUsPage implements OnInit {
 public  userLogggedIn:boolean=false;
  constructor(public menuCtrl: MenuController,public navCtrl: NavController, public navParams: NavParams) {
  }
  ngOnInit(): void {
    
  }
  ionViewDidLoad() {
    if(this.userLogggedIn===false){
      this.menuCtrl.swipeEnable(false);
    }else{
      this.menuCtrl.swipeEnable(true);
    }
    console.log('ionViewDidLoad ContactUsPage');
   

  }
  ionViewWillEnter() {
    if(this.userLogggedIn===false){
      this.menuCtrl.swipeEnable(false);
    }else{
      this.menuCtrl.swipeEnable(true);
    }

    this.menuCtrl.swipeEnable(false)
  }

  ionViewDidLeave() {
    this.menuCtrl.swipeEnable(false)
  }
}
