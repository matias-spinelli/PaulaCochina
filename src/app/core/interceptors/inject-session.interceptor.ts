import { Injectable } from '@angular/core';
import {
  HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { AuthServiceService } from '@modules/auth/services/auth-service.service';

@Injectable()
export class InjectSessionInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService, private authService: AuthServiceService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    try {
      // Si es login o signup, no le metemos el token
      if (request.url.includes('/api/auth/login') || request.url.includes('/api/auth/signup')) {
        return next.handle(request);
      }

      const token = this.cookieService.get('idToken');

      const newRequest = request.clone({
        url: request.url.includes('?')
          ? `${request.url}&auth=${token}`
          : `${request.url}?auth=${token}`
      });

      return next.handle(newRequest).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            console.warn('🔐 Token vencido o inválido. Cerrando sesión...');
            this.authService.logout();
          }
          return throwError(() => error);
        })
      );

    } catch (e) {
      console.log('🔴 Ojito error en interceptor', e);
      return next.handle(request);
    }
  }
}
