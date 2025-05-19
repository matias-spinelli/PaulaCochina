import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { InjectSessionInterceptor } from '@core/interceptors/inject-session.interceptor';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MatSnackBarModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptorsFromDi()),
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: InjectSessionInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
