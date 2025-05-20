import { Injectable } from '@angular/core';
import {
  HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable()
export class InjectSessionInterceptor implements HttpInterceptor {

  constructor(
    private cookieService: CookieService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    try {
      const token = this.cookieService.get('idToken');
      const newRequest = request.clone({
        url: request.url.includes('?') ? `${request.url}&auth=${token}` : `${request.url}?auth=${token}`
      });

      return next.handle(newRequest).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            console.warn('🔐 Token vencido o inválido. Cerrando sesión...');
            this.cookieService.delete('idToken');
            this.router.navigate(['/auth/login']);
          }
          return throwError(() => error);
        })
      );

    } catch (e) {
      console.log('🔴🔴🔴 Ojito error', e);
      return next.handle(request);
    }
  }
}
