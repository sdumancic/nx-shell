import { createFeature, createReducer, on } from '@ngrx/store'
import { Customer, CustomerMetadata } from '@nx-shell/tire-storage/tsm-services'
import {
  loadCustomer,
  loadCustomerFailure,
  loadCustomerMetadata,
  loadCustomerMetadataFailure,
  loadCustomerMetadataSuccess,
  loadCustomerSuccess
} from './customer.actions'
import { CallState, LoadingState } from '@nx-shell/tire-storage/tsm-util'

export interface CustomerState {
  customer: Customer | null
  customerCallState: CallState,
  metadata: CustomerMetadata,
  metadataCallState: CallState,
}

const initialState: CustomerState = {
  customer: null,
  customerCallState: LoadingState.INIT,
  metadata: {
    genders: [],
    states: []
  },
  metadataCallState: LoadingState.INIT,
}

export const customerFeature = createFeature({
  name: 'customer',
  reducer: createReducer(
    initialState,
    on(loadCustomer, (state, action) => {
      return {
        ...state,
        customerCallState: LoadingState.LOADING
      }
    }),
    on(loadCustomerSuccess, (state, action) => {
      return {
        ...state,
        customerCallState: LoadingState.LOADED,
        customer: action.customer,
      }
    }),
    on(loadCustomerFailure, (state, action) => {
      return {
        ...state,
        customerCallState: { errorMsg: action.error }
      }
    }),
    on(loadCustomerMetadata, (state, action) => {
      return {
        ...state,
        metadataCallState: LoadingState.LOADING
      }
    }),
    on(loadCustomerMetadataSuccess, (state, action) => {
      return {
        ...state,
        metadataCallState: LoadingState.LOADED,
        metadata: action.metadata,
      }
    }),
    on(loadCustomerMetadataFailure, (state, action) => {
      return {
        ...state,
        metadataCallState: { errorMsg: action.error }
      }
    })
  ),
})



