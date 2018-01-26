import { Injectable } from '@angular/core';
import {
  Http,
  Headers,
  BaseRequestOptions,
  ConnectionBackend,
  RequestOptions,
  Request,
  RequestOptionsArgs
} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Storage } from "@ionic/storage"
import { Response } from '@angular/http';

/*
  Generated class for the HttpsRequestInterceptorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpInterceptor extends Http {
  private localStore: Storage;
  constructor(
    backend: ConnectionBackend,
    defaultOptions: RequestOptions,
    storage: Storage
  ) {

    super(backend, defaultOptions);
    this.localStore = storage;
  }
  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return Observable.fromPromise(this.localStore.get("token")).flatMap(token => {
      console.clear();
      console.log("Request at interceptor");
      if (options == null) {
        options = new RequestOptions();
      }
      if (options.headers == null) {
        options.headers = new Headers();
      }
      options.headers.append('Content-Type', 'application/json');
      if( options.headers.get('Token')==null){
        options.headers.append('Token',JSON.parse(token)); 
      }          
      return super.request(url, options).map(resp=>resp);
    }).catch(err=>{
      console.log("Request at interceptor");
      return super.request(url, options).map(resp=>resp);
    })
  }
}
