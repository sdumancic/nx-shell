import { createFeature, createReducer, on } from '@ngrx/store'
import { Customer, Offer, TireSet, TireSetWithPrices } from '@nx-shell/tire-storage/tsm-services'
import { CallState, LoadingState } from '@nx-shell/tire-storage/tsm-util'
import {
  clearStore,
  createOfferFailure,
  createOfferSuccess,
  loadTireSetSuccess,
  loadTireStoragePriceSuccess,
  removeTireSet,
  selectCustomerSuccess,
  setEditMode,
  setEndDate,
  setStartDate,
  updateOfferFailure,
  updateOfferSuccess
} from './offers-crud.actions'
import { EditMode } from '@nx-shell/tire-storage/tsm-domain'

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
  editMode: EditMode
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
  createOfferCallState: LoadingState.INIT,
  editMode: EditMode.INIT
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
        selectedTireSet: action.clearSelectedTireSet ? [] : state.selectedTireSet
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
    }),
    on(updateOfferSuccess, (state, action) => {
      return {
        ...state,
        offer: action.offer,
        createOfferCallState: LoadingState.LOADED,
      }
    }),
    on(updateOfferFailure, (state, action) => {
      return {
        ...state,
        offer: null,
        createOfferCallState: { errorMsg: action.error }
      }
    }),
    on(setEditMode, (state, action) => {
      return {
        ...state,
        editMode: action.editMode
      }
    }),
    on(clearStore, (state) => {
      return {
        ...state,
        selectedCustomer: null,
        customerTireSets: [],
        selectedTireSet: [],
        startDate: null,
        endDate: null,
        offer: null,
        selectedCustomerCallState: LoadingState.INIT,
        selectedTireSetCallState: LoadingState.INIT,
        createOfferCallState: LoadingState.INIT,
        editMode: EditMode.INIT
      }
    }),
  ),
})

