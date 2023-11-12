import { createAction } from '@ngrx/store'
import { Customer, Offer, TireSet, TireStoragePrice } from '@nx-shell/tire-storage/tsm-services'

export const loadOffer = createAction(
  '[Offers CRUD] Load offer'
)

export const loadOfferSuccess = createAction(
  '[Offers CRUD] Load offer Success',
  (offer: Offer) => ({ offer })
)

export const loadOfferFailure = createAction(
  '[Offers CRUD] Load offer Failure',
  (error: string) => ({ error })
)

export const createOffer = createAction(
  '[Offers CRUD] Create offer'
)

export const createOfferSuccess = createAction(
  '[Offers CRUD] Create offer success',
  (offer: Offer) => ({ offer })
)

export const createOfferFailure = createAction(
  '[Offers CRUD] Create offer Failure',
  (error: string) => ({ error })
)

export const selectCustomerSuccess = createAction(
  '[Offers CRUD] Select customer',
  (customer: Customer) => ({ customer })
)

export const loadTireSetSuccess = createAction(
  '[Offers CRUD] Load tireset success',
  (tireSets: TireSet[]) => ({ tireSets })
)

export const loadTireSetFailure = createAction(
  '[Offers CRUD] Load tireset failure',
  (error: string) => ({ error })
)

export const selectTireSetSuccess = createAction(
  '[Offers CRUD] Select tireSet',
  (tireSet: TireSet) => ({ tireSet })
)

export const removeTireSet = createAction(
  '[Offers CRUD] Remove tireSet',
  (tireSet: TireSet) => ({ tireSet })
)

export const setStartDate = createAction(
  '[Offers CRUD] Set Offer start date',
  (startDate: Date) => ({ startDate })
)

export const setEndDate = createAction(
  '[Offers CRUD] Set Offer end date',
  (endDate: Date) => ({ endDate })
)

export const loadTireStoragePriceSuccess = createAction(
  '[Offers CRUD] Load tire storage price success',
  (tireStoragePrice: TireStoragePrice, tireSet: TireSet) => ({ tireStoragePrice, tireSet })
)

export const loadTireStoragePriceFailure = createAction(
  '[Offers CRUD] Load tire storage price failure',
  (error: string) => ({ error })
)





