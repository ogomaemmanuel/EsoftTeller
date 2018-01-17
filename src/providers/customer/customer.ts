import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Customer } from "../../models/customer";
import { Storage } from '@ionic/storage';
@Injectable()
export class CustomerProvider {
  customer: Customer;
  constructor(public storage: Storage, public http: Http) {
    console.log('Hello CustomerProvider Provider');
  }
  getCustomerDetails(id: string) {
    var response = this.http.get("")
    response.map(res => res.json()).subscribe(data => {
      console.log("customer data " + data)
    })
  }

  public getLocallyStoredUserId(): Promise<string> {
    return this.storage.get("customerDetails").then(data => {
      return JSON.parse(data).tbl_CustomerID;
    });
  }

  public getLocallyStoredUser(){
    return this.storage.get("customerDetails").then(data => {
      return JSON.parse(data);
    });
  }


}
