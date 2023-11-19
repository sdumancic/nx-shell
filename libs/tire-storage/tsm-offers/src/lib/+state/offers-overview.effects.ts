import { Actions, createEffect, ofType } from '@ngrx/effects'
import { inject } from '@angular/core'
import { OfferService, TireSetMetadataService } from '@nx-shell/tire-storage/tsm-services'
import {
  acceptOffer,
  acceptOfferFailure,
  acceptOfferSuccess,
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
import { catchError, concatMap, delay, map, of, switchMap, tap, withLatestFrom } from 'rxjs'
import { Store } from '@ngrx/store'
import { selectOffersOverviewVm } from './offers-overview.selector'

export const selectTireSetMetadataEffect = createEffect((
    actions$ = inject(Actions),
    metadataService = inject(TireSetMetadataService)) => {
    return actions$.pipe(
      ofType(loadMetadata),
      switchMap((val) => {
        return metadataService.getTireSetMetadata$().pipe(
          map(tireSetMetadata => loadMetadataSuccess(tireSetMetadata)),
          catchError((error: string) => of(loadMetadataFailure(error)))
        )
      })
    )
  },
  { functional: true }
)

export const searchOffersEffect = createEffect((
    actions$ = inject(Actions),
    store = inject(Store),
    offerService = inject(OfferService)) => {
    return actions$.pipe(
      ofType(searchOffers),
      tap(data => {
        if (data.searchValues) {
          store.dispatch(setSearchValues({ searchValues: data.searchValues }))
        }
        if (data.searchMeta?.pagination) {
          const index = data.searchMeta?.pagination.index
          const size = data.searchMeta?.pagination.size
          store.dispatch(setPagination({ index, size }))
        }
        if (data.searchMeta?.sorting) {
          const attribute = data.searchMeta?.sorting.attribute
          const order = data.searchMeta?.sorting.order
          store.dispatch(setSort({ attribute, order }))
        }
      }),
      delay(0),
      withLatestFrom(
        store.select(selectOffersOverviewVm).pipe(map(val => val.searchValues)),
        store.select(selectOffersOverviewVm).pipe(map(val => val.searchMeta))
      ),
      switchMap(data => {
        const searchValuesFromStore = data[1]
        const searchMetaFromStore = data[2]
        const page = searchMetaFromStore.pagination?.index ? searchMetaFromStore.pagination.index : 1
        const limit = searchMetaFromStore.pagination?.size ? searchMetaFromStore.pagination.size : 10
        return offerService.searchOffers$(searchValuesFromStore, page, limit, searchMetaFromStore.sorting?.attribute, searchMetaFromStore.sorting?.order).pipe(
          map(searchOffersResponse => searchOffersSuccess(searchOffersResponse.data, searchOffersResponse.totalCount)),
          catchError((error: string) => of(searchOffersFailure(error)))
        )
      })
    )
  },
  { functional: true }
)

export const acceptOfferEffect = createEffect((
    actions$ = inject(Actions),
    offerService = inject(OfferService)) => {
    return actions$.pipe(
      ofType(acceptOffer),
      concatMap(val => offerService.findOne$(val.id)),
      concatMap((offer) => {
        return offerService.acceptOffer$(offer).pipe(
          map(offer => acceptOfferSuccess(offer)),
          catchError((error: string) => of(acceptOfferFailure(error)))
        )
      })
    )
  },
  { functional: true }
)



