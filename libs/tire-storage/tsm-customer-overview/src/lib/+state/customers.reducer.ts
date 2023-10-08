import { createFeature, createReducer, on } from '@ngrx/store'
import { loadCustomers, loadCustomersFailure, loadCustomersSuccess } from './customers.actions'
import { Customer } from '@nx-shell/tire-storage/tsm-services'
import { CallState, LoadingState } from '@nx-shell/tire-storage/tsm-util'

export interface CustomersOverviewState {
  customers: Customer[];
  currentCustomer: Customer | null;
  customersCallState: CallState;
}

const initialState: CustomersOverviewState = {
  customers: [],
  currentCustomer: null,
  customersCallState: LoadingState.INIT
}

export const customerOverviewFeature = createFeature({
  name: 'customersOverview',
  reducer: createReducer(
    initialState,
    on(loadCustomers, (state, action) => {
      return {
        ...state,
        customersCallState: LoadingState.LOADING,
      }
    }),
    on(loadCustomersSuccess, (state, action) => {
      return {
        ...state,
        customers: action.customers,
        customersCallState: LoadingState.LOADED,
      }
    }),
    on(loadCustomersFailure, (state, action) => {
      return {
        ...state,
        customers: [],
        customersCallState: { errorMsg: action.error }
      }
    })
  ),
})


