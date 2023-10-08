import { Route } from '@angular/router'
import { provideState } from '@ngrx/store'
import { TsmCustomerOverviewHomeComponent } from './tsm-customer-overview-home/tsm-customer-overview-home.component'
import { customerOverviewFeature } from './+state/customers.reducer'
import { provideEffects } from '@ngrx/effects'
import * as customerOverviewEffects from './+state/customers.effects'

export const featureCustomerOverviewRoutes: Route[] = [
  {
    path: '',
    component: TsmCustomerOverviewHomeComponent,
    providers: [
      provideState(customerOverviewFeature),
      provideEffects(customerOverviewEffects)
    ],
  },
]
