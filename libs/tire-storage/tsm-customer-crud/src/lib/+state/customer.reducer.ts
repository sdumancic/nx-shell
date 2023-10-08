import { createFeature, createReducer, on } from '@ngrx/store'
import { Customer, CustomerMetadata } from '@nx-shell/tire-storage/tsm-services'
import { loadCustomer, loadCustomerFailure, loadCustomerSuccess } from './customer.actions'

export interface CustomerState {
  customer: Customer | null
  loading: boolean,
  metadata: CustomerMetadata,
  error: string | null
}

const initialState: CustomerState = {
  customer: null,
  loading: false,
  metadata: {
    genders: [],
    states: []
  },
  error: null
}

export const customerFeature = createFeature({
  name: 'customer',
  reducer: createReducer(
    initialState,
    on(loadCustomer, (state, action) => {
      return {
        ...state,
        loading: true
      }
    }),
    on(loadCustomerSuccess, (state, action) => {
      return {
        ...state,
        loading: false,
        customer: action.customer,
        error: null
      }
    }),
    on(loadCustomerFailure, (state, action) => {
      return {
        ...state,
        loading: false,
        customer: null,
        error: action.error
      }
    })
  ),
})


