import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { AccountDetail } from '../../models/accountDetails';
import { EndPointHostProvider } from '../end-point-host/end-point-host';
import { Device } from '@ionic-native/device';
@Injectable()
export class AccountsDetailsServiceProvider extends EndPointHostProvider {
  private endPoint: string = "customers/";
  constructor(public storage: Storage, public http: Http, private device: Device) {
    super();
    this.endPoint = this.getHost() + this.endPoint
  }
  public getSavingsAccountDetails(id: string) {
    return this.http.get(this.endPoint + id + "/savings").do(data => {
    }).map(res => res.json());
  }
  public getLoansAccountDetails(id: string) {
    return this.http.get(this.endPoint + id + "/loans").do(data => {
    }).map(res => res.json());
  }
  public getSharesAccountDetails(id: string) {
    return this.http.get(this.endPoint + id + "/shares").do(data => {
    }).map(res => res.json());
  }
  public registerNewUser(newuser: any) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.endPoint + "register", newuser, options).map(res => res);
  }
  public ResetCustomerOtpPin(pinDetails: any) {
    return this.http.post(this.endPoint + pinDetails.userId + "/set-pin ", pinDetails).map(resp => resp);
  }
  public ChangeCustomerPin(pinDetails: any) {
    return this.http.post(this.endPoint + pinDetails.userId + "/change-pin ", pinDetails).map(resp => resp);
  }
  public SubmitForgotPasswordDetails(pidResetDetails: any) {
    var headers = new Headers();
    pidResetDetails.DeviceInfo=this.device.uuid||"ccb87f40a87ee5cf";
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.endPoint + "forgot-pass", pidResetDetails, options);
  }

  public DeactivateAccount(userId: any) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.endPoint + userId + "/deactivate", {},options);
  }
}
