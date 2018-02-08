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
import { Device } from '@ionic-native/device';
import * as crypto from "crypto-js";


/*
  Generated class for the HttpsRequestInterceptorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpInterceptor extends Http {
  private localStore: Storage;
  private deviceId: string;
  constructor(
    backend: ConnectionBackend,
    defaultOptions: RequestOptions,
    storage: Storage,
    device: Device,


  ) {

    super(backend, defaultOptions);
    this.localStore = storage;
    this.deviceId = device.uuid;
  }
  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return Observable.fromPromise(this.localStore.get("token")).flatMap(token => {
      return super.request(url, this.ChangeRequestHeader(token, options)).map(resp => resp);
    })
  }
  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return Observable.fromPromise(this.localStore.get("token")).flatMap(token => {
      return super.post(url, body, this.ChangeRequestHeader(token, options)).map(resp => resp);
    });

  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return Observable.fromPromise(this.localStore.get("token")).flatMap(token => {
      return super.put(url, body, this.ChangeRequestHeader(token, options)).map(resp => resp);
    })


  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return Observable.fromPromise(this.localStore.get("token")).flatMap(token => {
      return super.delete(url, this.ChangeRequestHeader(token, options)).map(resp => resp);
    })
  }
  patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return Observable.fromPromise(this.localStore.get("token")).flatMap(token => {
      return super.patch(url, body, this.ChangeRequestHeader(token, options)).map(resp => resp);
    })

  }
  head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return Observable.fromPromise(this.localStore.get("token")).flatMap(token => {
      return super.head(url, this.ChangeRequestHeader(token, options)).map(resp => resp);
    })
  }
  options(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return Observable.fromPromise(this.localStore.get("token")).flatMap(token => {
      return super.options(url, this.ChangeRequestHeader(token, options)).map(resp => resp);
    })
  }

  private ChangeRequestHeader(token: string, options?: RequestOptionsArgs): RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }
    if (options.headers == null) {
      options.headers = new Headers();
    }
    if (options.headers.get("Content-Type") == null) {
      options.headers.append('Content-Type', 'application/json');
    }
    if (options.headers.get('Token') == null) {
      options.headers.append('Token', JSON.parse(token));
    }
    let encryptedPass = crypto.SHA256(this.deviceId || 'ccb87f40a87ee5cf').toString();
    options.headers.set("DeviceId", encryptedPass);

    return options;
  }
}
