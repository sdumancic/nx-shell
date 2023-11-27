import { createAction, props } from '@ngrx/store'
import { Customer, Offer, TireSet, TireStoragePrice } from '@nx-shell/tire-storage/tsm-services'
import { EditMode } from '@nx-shell/tire-storage/tsm-domain'

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

export const createOrUpdateOffer = createAction(
  '[Offers CRUD] Create offer',
  props<{ id?: string }>()
)

export const createOfferSuccess = createAction(
  '[Offers CRUD] Create offer success',
  (offer: Offer) => ({ offer })
)

export const createOfferFailure = createAction(
  '[Offers CRUD] Create offer Failure',
  (error: string) => ({ error })
)

export const updateOfferSuccess = createAction(
  '[Offers CRUD] Update offer Success',
  (offer: Offer) => ({ offer })
)

export const updateOfferFailure = createAction(
  '[Offers CRUD] Update offer Failure',
  (error: string) => ({ error })
)
export const selectCustomerSuccess = createAction(
  '[Offers CRUD] Select customer success',
  (customer: Customer) => ({ customer })
)

export const loadTireSetSuccess = createAction(
  '[Offers CRUD] Load tire set success',
  (tireSets: TireSet[]) => ({ tireSets })
)

export const loadTireSetFailure = createAction(
  '[Offers CRUD] Load tire set failure',
  (error: string) => ({ error })
)

export const selectTireSetSuccess = createAction(
  '[Offers CRUD] Select tireSet success',
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

export const setEditMode = createAction(
  '[Offers CRUD] Set Edit Mode',
  (editMode: EditMode) => ({ editMode })
)





