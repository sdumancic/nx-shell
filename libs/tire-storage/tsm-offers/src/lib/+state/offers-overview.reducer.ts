import { createFeature, createReducer, on } from '@ngrx/store'
import { Offer, TireSetMetadata } from '@nx-shell/tire-storage/tsm-services'
import { CallState, LoadingState } from '@nx-shell/tire-storage/tsm-util'
import {
  acceptOffer,
  loadMetadata,
  loadMetadataFailure,
  loadMetadataSuccess,
  searchOffers,
  searchOffersFailure,
  searchOffersSuccess,
  setPagination,
  setSearchValues,
  setSort
} from './offers-overview.actions'
import { OffersOverviewSearchValues, OfferStatusEnum, SearchMeta } from '@nx-shell/tire-storage/tsm-domain'

export interface OffersOverviewState {
  tireSetMetadata: TireSetMetadata | null;
  tireSetMetadataCallState: CallState;
  offers: Offer[]
  totalCount: number
  searchMeta: SearchMeta
  offersCallState: CallState;
  searchValues: OffersOverviewSearchValues;
}

const initialState: OffersOverviewState = {
  tireSetMetadata: null,
  tireSetMetadataCallState: LoadingState.INIT,
  offers: [],
  offersCallState: LoadingState.INIT,
  totalCount: 0,
  searchMeta: {
    pagination: { index: 1, size: 10 },
    sorting: { attribute: 'id', order: 'asc' }
  },
  searchValues: {
    status: OfferStatusEnum.PLACED,
    seasons: [],
    brands: [],
    widths: [],
    heights: [],
    sizes: [],
    loadIndexes: [],
    speedIndexes: []
  }
}

export const offersOverviewFeature = createFeature({
  name: 'offersOverview',
  reducer: createReducer(
    initialState,
    on(loadMetadata, (state, action) => {
      return {
        ...state,
        tireSetMetadataCallState: LoadingState.LOADING,
      }
    }),
    on(loadMetadataSuccess, (state, action) => {
      return {
        ...state,
        tireSetMetadata: action.tireSetMetadata,
        tireSetMetadataCallState: LoadingState.LOADED,
      }
    }),
    on(loadMetadataFailure, (state, action) => {
      return {
        ...state,
        tireSetMetadata: null,
        tireSetMetadataCallState: { errorMsg: action.error }
      }
    }),
    on(setSearchValues, (state, action) => {
      return {
        ...state,
        searchValues: action.searchValues
      }
    }),
    on(setPagination, (state, action) => {
      return {
        ...state,
        searchMeta: { ...state.searchMeta, pagination: { index: action.index, size: action.size } }
      }
    }),
    on(setSort, (state, action) => {
      return {
        ...state,
        searchMeta: { ...state.searchMeta, sorting: { attribute: action.attribute, order: action.order } }
      }
    }),
    on(searchOffers, (state, action) => {
      return {
        ...state,
        offers: [],
        offersCallState: LoadingState.LOADING,
      }
    }),
    on(searchOffersSuccess, (state, action) => {
      return {
        ...state,
        offers: action.offers,
        totalCount: action.totalCount,
        offersCallState: LoadingState.LOADED,
      }
    }),
    on(searchOffersFailure, (state, action) => {
      return {
        ...state,
        offers: [],
        offersCallState: { errorMsg: action.error }
      }
    }),
    on(acceptOffer, (state, action) => {
      function acceptOfferWithId (id: number) {
        const offerIndex = state.offers.findIndex((offer: Offer) => offer.id === action.id)
        const offers = [...state.offers]
        if (offerIndex > -1) {

          const offerForUpdate = { ...offers[offerIndex] }
          offerForUpdate.status = OfferStatusEnum.ACCEPTED
          offers.splice(offerIndex, 1, offerForUpdate)
          return offers
        }
        return state.offers

      }

      return {
        ...state,
        offers: acceptOfferWithId(action.id),
      }
    }),
  ),
})



