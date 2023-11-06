import { createFeature, createReducer, on } from '@ngrx/store'
import { Customer, TireSet } from '@nx-shell/tire-storage/tsm-services'
import { CallState, LoadingState } from '@nx-shell/tire-storage/tsm-util'
import { loadTireSetSuccess, selectCustomerSuccess, selectTireSetSuccess } from './offers-crud.actions'

export interface OffersCrudState {
  selectedCustomer: Customer | null;
  customerTireSets: TireSet[] | [];
  selectedTireSet: TireSet | null;
  startDate: Date | null;
  endDate: Date | null;
  selectedCustomerCallState: CallState;
  selectedTireSetCallState: CallState;
}

const initialState: OffersCrudState = {
  selectedCustomer: null,
  customerTireSets: [],
  selectedTireSet: null,
  startDate: null,
  endDate: null,
  selectedCustomerCallState: LoadingState.INIT,
  selectedTireSetCallState: LoadingState.INIT
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
    on(selectTireSetSuccess, (state, action) => {
      return {
        ...state,
        selectedTireSet: action.tireSet,
        selectedTireSetCallState: LoadingState.LOADED,
      }
    })
  ),
})


