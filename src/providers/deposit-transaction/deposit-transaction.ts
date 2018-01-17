import { Injectable } from '@angular/core';
import { Http,Headers, RequestOptions  } from '@angular/http';
import 'rxjs/add/operator/map';
import { EndPointHostProvider } from '../end-point-host/end-point-host';

/*
  Generated class for the DepositTransactionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DepositTransactionProvider extends EndPointHostProvider {
  endPoint: string = "tellers/";
  constructor(public http: Http) {
    super();
    this.endPoint= this.getHost()+this.endPoint;
    console.log('Hello DepositTransactionProvider Provider');
  }

  public depositCash(cashTrx:any){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.endPoint+"deposit", cashTrx,options).map(res => res);

  }
}
