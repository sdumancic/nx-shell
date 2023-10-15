import { createFeature, createReducer, on } from '@ngrx/store'
import { Customer, CustomerMetadata } from '@nx-shell/tire-storage/tsm-services'
import { CallState, LoadingState } from '@nx-shell/tire-storage/tsm-util'
import { customerActions } from './customer.actions'

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
    on(customerActions.fetchCustomer, (state, action) => {
      return {
        ...state,
        customerCallState: LoadingState.LOADING
      }
    }),
    on(customerActions.fetchCustomerSuccess, (state, action) => {
      return {
        ...state,
        customerCallState: LoadingState.LOADED,
        customer: action.customer,
      }
    }),
    on(customerActions.fetchCustomerFailure, (state, action) => {
      return {
        ...state,
        customerCallState: { errorMsg: action.error }
      }
    }),
    on(customerActions.fetchCustomerMetadata, (state, action) => {
      return {
        ...state,
        metadataCallState: LoadingState.LOADING
      }
    }),
    on(customerActions.fetchCustomerMetadataSuccess, (state, action) => {
      return {
        ...state,
        metadataCallState: LoadingState.LOADED,
        metadata: action.metadata,
      }
    }),
    on(customerActions.fetchCustomerMetadataFailure, (state, action) => {
      return {
        ...state,
        metadataCallState: { errorMsg: action.error }
      }
    }),
    on(customerActions.createCustomer, (state, action) => {
      return {
        ...state,
        customerCallState: LoadingState.LOADING
      }
    }),
    on(customerActions.createCustomerSuccess, (state, action) => {
      return {
        ...state,
        customerCallState: LoadingState.LOADED,
        customer: action.customer,
      }
    }),
    on(customerActions.createCustomerFailure, (state, action) => {
      return {
        ...state,
        customerCallState: { errorMsg: action.error }
      }
    }),
    on(customerActions.updateCustomer, (state, action) => {
      return {
        ...state,
        customerCallState: LoadingState.LOADING
      }
    }),
    on(customerActions.updateCustomerSuccess, (state, action) => {
      return {
        ...state,
        customerCallState: LoadingState.LOADED,
        customer: action.customer,
      }
    }),
    on(customerActions.updateCustomerFailure, (state, action) => {
      return {
        ...state,
        customerCallState: { errorMsg: action.error }
      }
    }),
  ),
})



