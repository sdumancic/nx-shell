import { createSelector } from '@ngrx/store'
import { customerOverviewFeature, CustomersOverviewState } from './customers.reducer'
import { getError, LoadingState } from '@nx-shell/tire-storage/tsm-util'

export const selectCustomerGenders = createSelector(
  customerOverviewFeature.selectCustomersOverviewState,
  (state: CustomersOverviewState) => [...new Set(state.customers.map(customer => customer.gender))])

export const selectBookListPageViewModel = createSelector(
  customerOverviewFeature.selectCustomers,
  selectCustomerGenders,
  customerOverviewFeature.selectCurrentCustomer,
  customerOverviewFeature.selectCustomersCallState,
  (customers, genders, currentCustomer, callState) => (
    {
      customers,
      genders,
      currentCustomer,
      customersLoading: callState === LoadingState.LOADING,
      customersLoaded: callState === LoadingState.LOADED,
      customersError: getError(callState),
    })
)
