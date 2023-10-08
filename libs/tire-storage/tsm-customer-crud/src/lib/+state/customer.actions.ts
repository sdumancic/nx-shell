import { createAction, props } from '@ngrx/store'
import { Customer, CustomerMetadata } from '@nx-shell/tire-storage/tsm-services'

export const loadCustomer = createAction(
  '[Customer] Get Customers',
  props<{ id: number }>()
)

export const loadCustomerSuccess = createAction(
  '[Customer] Get Customer Success',
  (customer: Customer) => ({ customer })
)

export const loadCustomerFailure = createAction(
  '[Customer] Get Customer Failure',
  (error: string) => ({ error })
)

export const loadCustomerMetadata = createAction(
  '[Customer] Get Customer Metadata'
)

export const loadCustomerMetadataSuccess = createAction(
  '[Customer] Get Customer Metadata Success',
  (metadata: CustomerMetadata) => ({ metadata })
)

export const loadCustomerMetadataFailure = createAction(
  '[Customer] Get Customer Metadata Failure',
  (error: string) => ({ error })
)
