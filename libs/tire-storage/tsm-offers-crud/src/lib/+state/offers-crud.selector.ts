import { createSelector } from '@ngrx/store'
import { offersCrudFeature } from './offers-crud.reducer'
import { LoadingState } from '@nx-shell/tire-storage/tsm-util'
import { TireSetWithPrices } from '@nx-shell/tire-storage/tsm-services'

export const selectTireSetPrice = createSelector(
  offersCrudFeature.selectSelectedTireSet,
  (tireSetWithPrices: TireSetWithPrices[]) => tireSetWithPrices.reduce((prev, next) => prev + next.tireSetPrice, 0))

export const selectOffersCrudViewModel = createSelector(
  offersCrudFeature.selectSelectedCustomer,
  offersCrudFeature.selectCustomerTireSets,
  offersCrudFeature.selectSelectedTireSet,
  offersCrudFeature.selectStartDate,
  offersCrudFeature.selectEndDate,
  selectTireSetPrice,
  offersCrudFeature.selectSelectedCustomerCallState,
  offersCrudFeature.selectSelectedTireSetCallState,
  (selectedCustomer, customerTireSets, selectedTireSet, startDate, endDate, tireSetTotalValue, selectedCustomerCallState, selectedTireSetCallState) => (
    {
      selectedCustomer,
      customerTireSets,
      selectedTireSet,
      startDate,
      endDate,
      tireSetTotalValue,
      selectedCustomerLoaded: selectedCustomerCallState === LoadingState.LOADED,
      selectedTireSetLoaded: selectedTireSetCallState === LoadingState.LOADED,
    })
)
