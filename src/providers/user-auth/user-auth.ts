import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { HomePage } from "../../pages/home/home";
import { EndPointHostProvider } from '../end-point-host/end-point-host';
import { Device } from '@ionic-native/device';

/*
  Generated class for the UserAuthProvider provider.
import { UserAuthProvider } from '../providers/user-auth/user-auth';
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class UserAuthProvider extends EndPointHostProvider implements OnInit {
  userId: string = "7e8a41b8-cd73-4cee-956a-4ae693b8cf06";
  private endpoint: string;
  constructor(
    public events: Events,
    public http: Http,
    public navController: NavController,
    private device: Device,
    public alertCtrl: AlertController) {
    super();
    this.endpoint = this.getHost();
    console.log('Hello UserAuthProvider Provider');
  }

  ngOnInit(): void {

  }
  public authenticateUser(pin: string, telephone: string) {
    let deviceUuid = this.device.uuid || "ccb87f40a87ee5cf";
    return this.http.get(this.endpoint + "customers/login?MobileNo=" +
      telephone + "&Pin=" + pin + "&DeviceInfo=" + deviceUuid).map(res => res);
  }
}
