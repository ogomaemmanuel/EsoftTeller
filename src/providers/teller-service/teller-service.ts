import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { EndPointHostProvider } from '../end-point-host/end-point-host';
import { Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Header } from 'ionic-angular/components/toolbar/toolbar-header';
import {Observable} from 'rxjs/Observable'
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

/*
  Generated class for the TellerServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TellerServiceProvider extends EndPointHostProvider  {
  private UserToken:string="";
  

  constructor(public http: Http,private storage:Storage) {
    super();
    console.log('Hello TellerServiceProvider Provider');
  }


  public Login(teller:any){
   return this.http.get(this.getHost()+"teller/login",{params:teller}).map(resp=>resp);
  }

  public GetTellerDetails(tellerId:string,token?:any){
    var headers = new Headers();
    let tokenPromise =Observable.fromPromise(this.storage.get("token"));
    return  tokenPromise.flatMap(tokenx=>{
    console.log("token xxx is",tokenx);
    headers.append('Token', JSON.parse(tokenx));    
    let options = new RequestOptions({ headers: headers });    
    return this.http.get(this.getHost()+"teller/"+tellerId+"/details",options).map(resp=>resp);
    })
  }
}
