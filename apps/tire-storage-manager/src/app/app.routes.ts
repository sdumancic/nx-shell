import { Route } from '@angular/router'

import { UserLoginComponent, UserLogoutComponent, UserProfileComponent } from '@nx-shell/users/user-auth'
import { authGuard } from '@nx-shell/users/user-util'

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
      },
      {
        path: 'profile',
        canMatch: [authGuard],
        component: UserProfileComponent,
      }
    ],
  },
  {
    path: 'customers-overview',
    canMatch: [authGuard],
    loadChildren: () =>
      import('@nx-shell/tire-storage/tsm-customer-overview').then((m) => m.featureCustomerOverviewRoutes),
  },
  {
    path: 'offers',
    canMatch: [authGuard],
    loadChildren: () =>
      import('@nx-shell/tire-storage/tsm-offers').then((m) => m.tireStorageTsmOffersRoutes),
  },
  {
    path: 'customer-details',
    canMatch: [authGuard],
    loadChildren: () =>
      import('@nx-shell/tire-storage/tsm-customer-crud').then((m) => m.tireStorageTsmCustomerCrudRoutes),
  },
]
