import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { EndPointHostProvider } from '../end-point-host/end-point-host';

/*
  Generated class for the MinistatementProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MinistatementProvider extends EndPointHostProvider {
  endpoint: string = "customers/";
  constructor(public http: Http) {
    super();
    this.endpoint= this.getHost()+this.endpoint;    
  }
  public getSavingsAccounts(id: string) {
    return this.http.get(this.endpoint + id + "/savings-accounts").map(resp => resp.json());
  }
  public getLoansAccounts(id: string) {
    return this.http.get(this.endpoint + id + "/loans-accounts").map(resp => resp.json());
  }
  public getSharesAccounts(id: string) {
    return this.http.get(this.endpoint + id + "/shares-accounts").map(resp => resp.json());
  }
  public getSavingsMiniStatement(id: string, account: string) {
    return this.http.get(this.endpoint + id + "/savings-statement/" + account).map(resp => resp.json());
  }
  public getLoansMiniStatement(id: string, account: string) {
    return this.http.get(this.endpoint + id + "/loans-statement/" + account).map(resp => resp.json());
  }
  public getSharesMiniStatement(id: string, account: string) {
    return this.http.get(this.endpoint + id + "/shares-statement/" + account).map(resp => resp.json());
  }
}
