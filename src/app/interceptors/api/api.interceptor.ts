import { Injectable }                                           from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { environment }                                          from '@environments/environment';
import { Observable }                                           from 'rxjs';
import { includes }                                             from 'lodash-es/lodash';

/**
 * Interceptor's responsibility - update request url
 * Result: final request url = api domain + request url
 */
@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const api = includes(request.url, 'http') ? '' : (environment.apiUrl || '/');
    request = request.clone({url: api + request.url});
    return next.handle(request);
  }
}
