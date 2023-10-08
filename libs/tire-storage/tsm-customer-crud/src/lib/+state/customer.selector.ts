import { createSelector } from '@ngrx/store'
import { customerFeature } from './customer.reducer'

export const selectCustomerViewModel = createSelector(
  customerFeature.selectCustomer,
  customerFeature.selectMetadata,
  customerFeature.selectError,
  customerFeature.selectLoading,
  (customer, metadata, error) => ({ customer, metadata, error })
)
