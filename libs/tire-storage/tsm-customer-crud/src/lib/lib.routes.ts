import { Route } from '@angular/router'
import { provideState } from '@ngrx/store'
import { provideEffects } from '@ngrx/effects'
import { customerFeature } from './+state/customer.reducer'
import { TsmCustomerCrudComponent } from './tsm-customer-crud/tsm-customer-crud.component'
import * as customerEffects from './+state/customer.effects'

export const tireStorageTsmCustomerCrudRoutes: Route[] = [
  {
    path: ':id',
    component: TsmCustomerCrudComponent,
    data: {
      customerRemarks: 'This are customer remarks'
    },
    providers: [
      provideState(customerFeature),
      provideEffects(customerEffects)
    ],
  }
]
