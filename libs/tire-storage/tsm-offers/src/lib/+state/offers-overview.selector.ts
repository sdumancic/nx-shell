import { createSelector } from '@ngrx/store'
import { offersOverviewFeature } from './offers-overview.reducer'
import { LoadingState } from '@nx-shell/tire-storage/tsm-util'

export const selectOffersOverviewVm = createSelector(
  offersOverviewFeature.selectTireSetMetadata,
  offersOverviewFeature.selectTireSetMetadataCallState,
  offersOverviewFeature.selectOffers,
  offersOverviewFeature.selectOffersCallState,
  offersOverviewFeature.selectSearchValues,
  offersOverviewFeature.selectTotalCount,
  offersOverviewFeature.selectSearchMeta,
  (selectedTireSetMetadata, selectedTIreSetMetadataCallState, offers, offersCallState, searchValues, totalCount, searchMeta) => (
    {
      selectedTireSetMetadata,
      selectedTIreSetMetadataLoading: selectedTIreSetMetadataCallState === LoadingState.LOADING,
      selectedTIreSetMetadataLoaded: selectedTIreSetMetadataCallState === LoadingState.LOADED,
      offers,
      offersLoading: offersCallState === LoadingState.LOADING,
      offersLoaded: offersCallState === LoadingState.LOADED,
      searchValues,
      totalCount,
      searchMeta
    })
)
