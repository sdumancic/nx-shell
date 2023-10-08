import { createFeature, createReducer, on } from '@ngrx/store'
import { loadCustomersFailure, loadCustomersSuccess } from './customers.actions'
import { Customer } from '@nx-shell/tire-storage/tsm-services'

export interface CustomersOverviewState {
  customers: Customer[];
  currentCustomer: string;
  error: string;
}

const initialState: CustomersOverviewState = {
  customers: [],
  currentCustomer: '',
  error: ''
}

export const customerOverviewFeature = createFeature({
  name: 'customersOverview',
  reducer: createReducer(
    initialState,
    on(loadCustomersSuccess, (state, action) => {
      return {
        ...state,
        customers: action.customers,
        error: ''
      }
    }),
    on(loadCustomersFailure, (state, action) => {
      return {
        ...state,
        customers: [],
        error: action.error
      }
    })
  ),
})
/*
export const {
  name,
  reducer,
  selectCustomersOverviewState,
  selectCurrentCustomer,
  selectError,
} = customerOverviewFeature*/

