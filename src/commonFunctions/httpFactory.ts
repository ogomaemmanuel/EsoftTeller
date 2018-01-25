import { XHRBackend, RequestOptions, Http } from "@angular/http";
import { HttpInterceptor } from "../providers/https-request-interceptor/https-request-interceptor";

export function HttpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http {
    return new HttpInterceptor(xhrBackend, requestOptions);
}