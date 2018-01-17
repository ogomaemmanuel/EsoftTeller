import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { EndPointHostProvider } from '../end-point-host/end-point-host';

/*
  Generated class for the CompanyDetailsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CompanyDetailsProvider extends EndPointHostProvider {

  constructor(public http: Http) {
    super();
  }
  public getCompanyName() {
   return this.http.get(this.getHost() + "company").map(resp => resp);
  }

}
