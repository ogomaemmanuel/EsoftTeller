import { Injectable } from '@angular/core';
import { Http,Headers, BaseRequestOptions, ConnectionBackend, RequestOptions, RequestOptionsArgs } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the HttpsRequestInterceptorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpInterceptor extends Http {

  constructor(
    backend: ConnectionBackend,
    defaultOptions: RequestOptions,

  ) {
    
    super(backend, defaultOptions);
  }

  private requestOptions(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }
    if (options.headers == null) {
      options.headers = new Headers({
        'Authorization': `Basic `,
        'X-Auth-Token': localStorage.getItem('token')
      });
    }
    return options;
}

get(url: string, options?: RequestOptionsArgs): Observable<any> {
 if( options.headers == null ){
  options.headers=new Headers();
  options.headers.append("","");
 }
 console.log("get from an intercepter",options);
  return super.get(url,options)
      
      
}


post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
  if( options.headers == null ){
   options.headers=new Headers();
   options.headers.append("","");
  }
   return super.post(url,options)
 }

 put(url: string, body: any, options?: RequestOptionsArgs) : Observable<any>{

  return super.put(url,body,options);
 }

 delete(url: string, options?: RequestOptionsArgs) : Observable<any>{
  return super.put(url,options);
 }
 options(url: string, options?: RequestOptionsArgs) : Observable<any>{
  return super.options(url,options);
 }
 patch(url: string, body: any, options?: RequestOptionsArgs) : Observable<any>{
  return super.patch(url,body,options);
 }

}
