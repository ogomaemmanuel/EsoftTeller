import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/do';
import { Customer } from "../../models/customer";
import { EndPointHostProvider } from '../end-point-host/end-point-host';

/*
  Generated class for the CustomerDetailsserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CustomerDetailsserviceProvider extends EndPointHostProvider {
  public customer: Customer;
  private endpoint:string="";
  constructor(public http: Http) {
    super();
    this.endpoint=this.getHost();
    console.log('Hello CustomerDetailsserviceProvider Provider');
  }

  getCustumerDetails(id: string) {
    return this.http.get(this.endpoint+"customers/"+id).do(res => {
     
    })
      .map(resp => resp.json());
  }

  getCustomerDetailsByNumber(customerNo:string){
    return this.http.get(this.endpoint+"customers/member/" + customerNo).do(res => {
      
    })      .map(resp => resp);
    
  }

  setCustomerPin(){



  }

}
