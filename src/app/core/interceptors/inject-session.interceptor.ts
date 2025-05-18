import { Injectable } from '@angular/core';
import { HttpRequest,HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class InjectSessionInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    try {
      const token = this.cookieService.get('idToken');
      const newRequest = request.clone({
        url: request.url.includes('?') ? `${request.url}&auth=${token}` : `${request.url}?auth=${token}`
      });
      return next.handle(newRequest);

    } catch (e) {
      console.log('🔴🔴🔴 Ojito error', e)
      return next.handle(request);
    }
  }
}