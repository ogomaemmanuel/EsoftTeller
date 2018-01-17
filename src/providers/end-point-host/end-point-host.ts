import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the EndPointHostProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EndPointHostProvider {
private devHost:string="http://localhost:53725/"
private  productionHost:string="http://192.168.0.213:7010/EsoftMobileApi_Published/"
  constructor() {
  }

  public  getHost():string{
     return this.productionHost;
  }
}
