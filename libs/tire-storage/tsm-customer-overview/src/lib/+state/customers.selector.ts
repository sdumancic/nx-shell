import { createSelector } from '@ngrx/store'
import { customerOverviewFeature, CustomersOverviewState } from './customers.reducer'

export const selectCustomerGenders = createSelector(
  customerOverviewFeature.selectCustomersOverviewState,
  (state: CustomersOverviewState) => [...new Set(state.customers.map(customer => customer.gender))])

export const selectBookListPageViewModel = createSelector(
  customerOverviewFeature.selectCustomers,
  selectCustomerGenders,
  customerOverviewFeature.selectCurrentCustomer,
  customerOverviewFeature.selectError,
  (customers, genders, currentCustomer, error) => ({ customers, genders, currentCustomer, error })
)
