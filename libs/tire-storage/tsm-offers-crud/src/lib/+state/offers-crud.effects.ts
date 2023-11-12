import { Actions, createEffect, ofType } from '@ngrx/effects'
import { inject } from '@angular/core'
import { Offer, OfferService, TireSetService, TireStoragePricingService } from '@nx-shell/tire-storage/tsm-services'
import {
  createOffer,
  createOfferFailure,
  createOfferSuccess,
  loadTireSetFailure,
  loadTireSetSuccess,
  loadTireStoragePriceFailure,
  loadTireStoragePriceSuccess,
  selectCustomerSuccess,
  selectTireSetSuccess
} from './offers-crud.actions'
import { catchError, concatMap, exhaustMap, filter, map, of, switchMap, withLatestFrom } from 'rxjs'
import { Store } from '@ngrx/store'
import { selectOffersCrudViewModel } from './offers-crud.selector'
import { OfferStatusEnum } from '@nx-shell/tire-storage/tsm-domain'
import { MessageAction, MessageBusService } from '@nx-shell/core'
import { HttpErrorResponse } from '@angular/common/http'

export const selectCustomerEffect = createEffect((
    actions$ = inject(Actions),
    tireSetService = inject(TireSetService)) => {
    return actions$.pipe(
      ofType(selectCustomerSuccess),
      exhaustMap((val) => {
          let customerId: number
          if (val.customer.id) {
            customerId = val.customer.id
            return tireSetService.getTireSetsForCustomer$(customerId).pipe(
              map(tireSet => loadTireSetSuccess(tireSet)),
              catchError((error: string) => of(loadTireSetFailure(error)))
            )
          }
          return []
        }
      )
    )
  },
  { functional: true }
)

export const selectTireSetEffect = createEffect((
    actions$ = inject(Actions),
    tireStoragePricing = inject(TireStoragePricingService)) => {
    return actions$.pipe(
      ofType(selectTireSetSuccess),
      switchMap(data => {
          const tireSet = data.tireSet
          return tireStoragePricing.getTireStoragePriceForTire$(tireSet?.size ? tireSet?.size : 0).pipe(
            map(price => loadTireStoragePriceSuccess(price[0], tireSet)),
            catchError((error: string) => of(loadTireStoragePriceFailure(error)))
          )
        }
      )
    )
  },
  { functional: true }
)

export const createOfferEffect = createEffect((
    actions$ = inject(Actions),
    store = inject(Store),
    messageBus = inject(MessageBusService),
    offerService = inject(OfferService)) => {
    return actions$.pipe(
      ofType(createOffer),
      withLatestFrom(store.select(selectOffersCrudViewModel)),
      map(data => {
        return {
          customer: data[1].selectedCustomer,
          tireSets: data[1].selectedTireSet,
          startDate: data[1].startDate,
          endDate: data[1].endDate,
          totalPrice: data[1].tireSetTotalValue
        }
      }),
      filter(data => data.customer !== null && data.tireSets.length > 0 && data.startDate !== null && data.endDate !== null),
      concatMap(data => {
          const offer: Offer = {
            customer: data.customer!,
            tireSets: data.tireSets,
            startDate: data.startDate!,
            endDate: data.endDate!,
            totalPrice: data.totalPrice,
            status: OfferStatusEnum.PLACED
          }
          return offerService.createOffer$(offer).pipe(
            map(offer => createOfferSuccess(offer)),
            catchError((error: HttpErrorResponse) => {
              messageBus.push({ type: MessageAction.ERROR, data: { name: 'Error while creating offer', message: error.message } })
              return of(createOfferFailure(error.message))
            })
          )
        }
      )
    )
  },
  { functional: true }
)


