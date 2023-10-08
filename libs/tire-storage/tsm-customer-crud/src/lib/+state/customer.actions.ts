import { createActionGroup, emptyProps, props } from '@ngrx/store'
import { Customer, CustomerMetadata } from '@nx-shell/tire-storage/tsm-services'

export const customerActions = createActionGroup({
  source: 'Customer',
  events: {
    'Fetch Customer': props<{ id: number }>(),
    'Fetch Customer Success': (customer: Customer) => ({ customer }),
    'Fetch Customer Failure': (error: string) => ({ error }),
    'Fetch Customer Metadata': emptyProps(),
    'Fetch Customer Metadata Success': (metadata: CustomerMetadata) => ({ metadata }),
    'Fetch Customer Metadata Failure': (error: string) => ({ error })
  },
})
/*
export const loadCustomer = createAction(
  '[Customer] Fetch Customer',
  props<{ id: number }>()
)

export const loadCustomerSuccess = createAction(
  '[Customer] Fetch Customer Success',
  (customer: Customer) => ({ customer })
)

export const loadCustomerFailure = createAction(
  '[Customer] Fetch Customer Failure',
  (error: string) => ({ error })
)

export const loadCustomerMetadata = createAction(
  '[Customer] Fetch Customer Metadata'
)

export const loadCustomerMetadataSuccess = createAction(
  '[Customer] Fetch Customer Metadata Success',
  (metadata: CustomerMetadata) => ({ metadata })
)

export const loadCustomerMetadataFailure = createAction(
  '[Customer] Fetch Customer Metadata Failure',
  (error: string) => ({ error })
)

 */
