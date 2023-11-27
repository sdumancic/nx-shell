import { Route } from '@angular/router'
import { TsmCustomerOverviewHomeComponent } from './tsm-customer-overview-home/tsm-customer-overview-home.component'
import { TsmSignalsPlaygroundComponent } from './signals-playground/tsm-signals-playground.component'

export const featureCustomerOverviewRoutes: Route[] = [
  {
    path: '',
    component: TsmCustomerOverviewHomeComponent,
  },
  {
    path: 'playground',
    component: TsmSignalsPlaygroundComponent,
  },
]
