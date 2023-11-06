import { createSelector } from '@ngrx/store'
import { offersCrudFeature } from './offers-crud.reducer'
import { LoadingState } from '@nx-shell/tire-storage/tsm-util'

export const selectOffersCrudViewModel = createSelector(
  offersCrudFeature.selectSelectedCustomer,
  offersCrudFeature.selectCustomerTireSets,
  offersCrudFeature.selectSelectedTireSet,
  offersCrudFeature.selectStartDate,
  offersCrudFeature.selectEndDate,
  offersCrudFeature.selectSelectedCustomerCallState,
  offersCrudFeature.selectSelectedTireSetCallState,
  (selectedCustomer, customerTireSets, selectedTireSet, startDate, endDate, selectedCustomerCallState, selectedTireSetCallState) => (
    {
      selectedCustomer,
      customerTireSets,
      selectedTireSet,
      startDate,
      endDate,
      selectedCustomerLoaded: selectedCustomerCallState === LoadingState.LOADED,
      selectedTireSetLoaded: selectedTireSetCallState === LoadingState.LOADED,
    })
)
