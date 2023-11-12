import { createFeature, createReducer, on } from '@ngrx/store'
import { Customer, Offer, TireSet, TireSetWithPrices } from '@nx-shell/tire-storage/tsm-services'
import { CallState, LoadingState } from '@nx-shell/tire-storage/tsm-util'
import {
  createOfferFailure,
  createOfferSuccess,
  loadTireSetSuccess,
  loadTireStoragePriceSuccess,
  removeTireSet,
  selectCustomerSuccess,
  setEndDate,
  setStartDate
} from './offers-crud.actions'

export interface OffersCrudState {
  selectedCustomer: Customer | null;
  customerTireSets: TireSet[] | [];
  selectedTireSet: TireSetWithPrices[] | [];
  startDate: Date | null;
  endDate: Date | null;
  offer: Offer | null;
  selectedCustomerCallState: CallState;
  selectedTireSetCallState: CallState;
  createOfferCallState: CallState;
}

const initialState: OffersCrudState = {
  selectedCustomer: null,
  customerTireSets: [],
  selectedTireSet: [],
  startDate: null,
  endDate: null,
  offer: null,
  selectedCustomerCallState: LoadingState.INIT,
  selectedTireSetCallState: LoadingState.INIT,
  createOfferCallState: LoadingState.INIT
}

export const offersCrudFeature = createFeature({
  name: 'offersCrud',
  reducer: createReducer(
    initialState,
    on(selectCustomerSuccess, (state, action) => {
      return {
        ...state,
        selectedCustomer: action.customer,
        selectedCustomerCallState: LoadingState.LOADED,
      }
    }),
    on(loadTireSetSuccess, (state, action) => {
      return {
        ...state,
        customerTireSets: action.tireSets,
      }
    }),
    on(loadTireStoragePriceSuccess, (state, action) => {
      const tireSet = action.tireSet
      const newObj: TireSetWithPrices = {
        tireSet: tireSet,
        tireStoragePrice: action.tireStoragePrice,
        tirePrice: tireSet.rimsIncluded ? action.tireStoragePrice.priceWithRims : action.tireStoragePrice.price,
        tireSetPrice: tireSet.rimsIncluded ? action.tireStoragePrice.priceWithRims * tireSet.tires.length : action.tireStoragePrice.price * tireSet.tires.length
      }

      return {
        ...state,
        selectedTireSet: [...state.selectedTireSet, newObj],
        selectedTireSetCallState: LoadingState.LOADED,
      }
    }),
    on(removeTireSet, (state, action) => {
      return {
        ...state,
        selectedTireSet: state.selectedTireSet.filter(e => e.tireSet.id !== action.tireSet.id)
      }
    }),
    on(setStartDate, (state, action) => {
      return {
        ...state,
        startDate: action.startDate
      }
    }),
    on(setEndDate, (state, action) => {
      return {
        ...state,
        endDate: action.endDate
      }
    }),
    on(createOfferSuccess, (state, action) => {
      return {
        ...state,
        offer: action.offer,
        createOfferCallState: LoadingState.LOADED,
      }
    }),
    on(createOfferFailure, (state, action) => {
      return {
        ...state,
        offer: null,
        createOfferCallState: { errorMsg: action.error }
      }
    })
  ),
})

