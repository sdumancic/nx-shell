import { ApplicationConfig, LOCALE_ID } from '@angular/core'
import { provideRouter, withComponentInputBinding, withEnabledBlockingInitialNavigation, } from '@angular/router'
import { appRoutes } from './app.routes'
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideStore } from '@ngrx/store'
import { provideEffects } from '@ngrx/effects'
import { provideHttpClient, withFetch } from '@angular/common/http'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import * as fromAuth from '@nx-shell/users/user-auth'
import localeHr from '@angular/common/locales/hr'
import localeDe from '@angular/common/locales/de'
import { registerLocaleData } from '@angular/common'
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core'
import { DateFnsAdapter } from '@angular/material-date-fns-adapter'
import { hr } from 'date-fns/locale'

registerLocaleData(localeHr)
registerLocaleData(localeDe)

const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'dd.MM.yyyy',
  },
  display: {
    dateInput: 'dd.MM.yyyy',
    monthYearLabel: 'MMMM yyyy',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM yyyy'
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation(), withComponentInputBinding()),
    provideAnimations(),
    provideHttpClient(withFetch()),
    provideStore({
      auth: fromAuth.userAuthFeature.reducer
    }),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: true, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
    provideEffects([fromAuth.userAuthEffects]),
    { provide: LOCALE_ID, useValue: 'hr-HR' },
    { provide: MAT_DATE_LOCALE, useValue: hr },
    {
      provide: DateAdapter,
      useClass: DateFnsAdapter,
      deps: [MAT_DATE_LOCALE]
    },
  ],
}
