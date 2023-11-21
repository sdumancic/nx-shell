import { createAction, props } from '@ngrx/store'
import { Offer, TireSetMetadata } from '@nx-shell/tire-storage/tsm-services'
import { OffersOverviewSearchValues, SearchMeta } from '@nx-shell/tire-storage/tsm-domain'

export const loadMetadata = createAction(
  '[Offers Overview]  Load metadata'
)

export const loadMetadataSuccess = createAction(
  '[Offers Overview] Load metadata Success',
  (tireSetMetadata: TireSetMetadata) => ({ tireSetMetadata })
)

export const loadMetadataFailure = createAction(
  '[Offers Overview] Load metadata Failure',
  (error: string) => ({ error })
)

export const setSearchValues = createAction(
  '[Offers Overview]  Set search values',
  props<{ searchValues: OffersOverviewSearchValues }>()
)

export const setPagination = createAction(
  '[Offers Overview]  Set pagination',
  props<{ index: number, size: number }>()
)
export const setSort = createAction(
  '[Offers Overview]  Set pagination',
  props<{ attribute: string, order?: string }>()
)

export const searchOffers = createAction(
  '[Offers Overview]  Search offers',
  props<{ searchValues?: OffersOverviewSearchValues, searchMeta?: SearchMeta }>()
)

export const searchOffersSuccess = createAction(
  '[Offers Overview] Search offers Success',
  (data: Offer[], totalCount: number) => ({ offers: data, totalCount: totalCount })
)

export const searchOffersFailure = createAction(
  '[Offers Overview] Search offers Failure',
  (error: string) => ({ error })
)

export const acceptOffer = createAction(
  '[Offers Overview]  Accept offer',
  props<{ id: number }>()
)

export const acceptOfferSuccess = createAction(
  '[Offers Overview] Accept offers Success',
  (offer: Offer) => ({ offer })
)

export const acceptOfferFailure = createAction(
  '[Offers Overview] Accept offers Failure',
  (error: string) => ({ error })
)

export const rejectOffer = createAction(
  '[Offers Overview]  Reject offer',
  props<{ id: number }>()
)
export const rejectOfferSuccess = createAction(
  '[Offers Overview] Reject offers Success',
  (offer: Offer) => ({ offer })
)

export const rejectOfferFailure = createAction(
  '[Offers Overview] Reject offers Failure',
  (error: string) => ({ error })
)


