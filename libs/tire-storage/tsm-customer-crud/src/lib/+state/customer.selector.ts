import { createSelector } from '@ngrx/store'
import { customerFeature } from './customer.reducer'
import { getError, LoadingState } from '@nx-shell/tire-storage/tsm-util'

export const selectCustomerVM = createSelector(
  customerFeature.selectCustomer,
  customerFeature.selectCustomerCallState,
  customerFeature.selectMetadata,
  customerFeature.selectMetadataCallState,
  (customer, customerCallState, metadata, metadataCallState) => ({
    customer,
    customerLoading: customerCallState === LoadingState.LOADING,
    customerLoaded: customerCallState === LoadingState.LOADED,
    customerError: getError(customerCallState),
    metadata,
    metadataLoading: metadataCallState === LoadingState.LOADING,
    metadataLoaded: metadataCallState === LoadingState.LOADED,
    metadataError: getError(metadataCallState)
  })
)
