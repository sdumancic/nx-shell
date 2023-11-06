import { createAction } from '@ngrx/store'
import { Customer, TireSet } from '@nx-shell/tire-storage/tsm-services'

export const loadOffer = createAction(
  '[Offers CRUD] Load offer'
)

/*export const loadOfferSuccess = createAction(
  '[Offers CRUD] Load offer Success',
  (offer: Offer) => ({ offer })
)*/

export const loadOfferFailure = createAction(
  '[Offers CRUD] Load offer Failure',
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

