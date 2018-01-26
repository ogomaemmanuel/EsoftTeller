import { XHRBackend, RequestOptions, Http } from "@angular/http";
import { HttpInterceptor } from "../providers/https-request-interceptor/https-request-interceptor";
import { Storage } from "@ionic/storage";

export function HttpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions,storage:Storage): Http {
    return new HttpInterceptor(xhrBackend, requestOptions,storage);
}