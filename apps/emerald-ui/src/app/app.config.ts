import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authenticationInterceptor } from '@emerald/authentication';
import { JwtModule } from '@auth0/angular-jwt';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MatDateFormats,
  provideNativeDateAdapter
} from '@angular/material/core';
import { IsoDateAdapter } from './iso-date-adapter';
import { environment } from '../environments/environment';
import { API_URL_TOKEN } from '@emerald/services';

export function tokenGetter() {
  return localStorage.getItem('auth_token');
}

export const ISO_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'YYYY-MM-DD',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authenticationInterceptor])),
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
        },
      })
    ),
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    { provide: DateAdapter, useClass: IsoDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: ISO_DATE_FORMATS },
    { provide: API_URL_TOKEN, useValue: environment.apiUrl },
  ],
};
