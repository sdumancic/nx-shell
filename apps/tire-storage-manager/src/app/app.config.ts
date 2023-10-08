import { ApplicationConfig } from '@angular/core'
import { provideRouter, withComponentInputBinding, withEnabledBlockingInitialNavigation, } from '@angular/router'
import { appRoutes } from './app.routes'
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideStore } from '@ngrx/store'
import { provideEffects } from '@ngrx/effects'
import { provideHttpClient, withFetch } from '@angular/common/http'
import { provideStoreDevtools } from '@ngrx/store-devtools'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation(), withComponentInputBinding()),
    provideAnimations(),
    provideHttpClient(withFetch()),
    provideStore(),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: true, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
    provideEffects(),
  ],
}
