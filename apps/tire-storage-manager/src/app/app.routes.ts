import { Route } from '@angular/router'

export const appRoutes: Route[] = [
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
