import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { EndPointHostProvider } from '../end-point-host/end-point-host';

/*
  Generated class for the TellerServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TellerServiceProvider extends EndPointHostProvider {

  constructor(public http: Http) {
    super();
    console.log('Hello TellerServiceProvider Provider');
  }


  public Login(teller:any){
   return this.http.get(this.getHost()+"teller/login",{params:teller}).map(resp=>resp);
  }

  public GetTellerDetails(tellerId:string){
    return this.http.get(this.getHost()+"teller/"+tellerId+"/details").map(resp=>resp);
  }
}
