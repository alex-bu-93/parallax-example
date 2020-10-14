import { Injectable }                                                        from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable }                                                        from 'rxjs';
import isEmpty                                                               from 'lodash-es/isEmpty';

/**
 * Interceptor's responsibility - add bearer (if has any) token to all requests headers
 * Result: 'Authorization': 'Bearer + request token'
 */
@Injectable()
export class BearerInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem('token');
    let headers = isEmpty(request.headers.keys()) ? new HttpHeaders() : request.headers;
    headers = token ? headers.set('Authorization', `Bearer ${token}`) : headers;
    request = request.clone({headers});
    return next.handle(request);
  }
}
