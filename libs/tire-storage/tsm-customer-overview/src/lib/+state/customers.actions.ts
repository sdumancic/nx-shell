import { createAction } from '@ngrx/store'
import { Customer } from '@nx-shell/tire-storage/tsm-services'

export const loadCustomers = createAction(
  '[Customers] Get Customers'
)

export const loadCustomersSuccess = createAction(
  '[Customers] Get Customers Success',
  (customers: Customer[]) => ({ customers })
)

export const loadCustomersFailure = createAction(
  '[Customers] Get Customers Failure',
  (error: string) => ({ error })
)
