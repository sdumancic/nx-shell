import { Route } from '@angular/router'
import { provideState } from '@ngrx/store'
import { provideEffects } from '@ngrx/effects'

import { userAuthEffects, userAuthFeature, UserLoginComponent, UserLogoutComponent } from '@nx-shell/users/user-auth'

export const appRoutes: Route[] = [
  {
    path: 'users',
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: UserLoginComponent,
      },
      {
        path: 'logout',
        component: UserLogoutComponent,
      }
    ],
    providers: [
      provideState(userAuthFeature),
      provideEffects(userAuthEffects)
    ],
  },
  {
    path: 'customers-overview',
    loadChildren: () =>
      import('@nx-shell/tire-storage/tsm-customer-overview').then((m) => m.featureCustomerOverviewRoutes),
  },
  {
    path: 'offers',
    loadChildren: () =>
      import('@nx-shell/tire-storage/tsm-offers').then((m) => m.tireStorageTsmOffersRoutes),
  },
  {
    path: 'customer-details',
    loadChildren: () =>
      import('@nx-shell/tire-storage/tsm-customer-crud').then((m) => m.tireStorageTsmCustomerCrudRoutes),
  },
]
