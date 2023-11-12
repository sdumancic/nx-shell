import { Actions, createEffect, ofType } from '@ngrx/effects'
import { inject } from '@angular/core'
import { TireSetService, TireStoragePricingService } from '@nx-shell/tire-storage/tsm-services'
import {
  loadTireSetFailure,
  loadTireSetSuccess,
  loadTireStoragePriceFailure,
  loadTireStoragePriceSuccess,
  selectCustomerSuccess,
  selectTireSetSuccess
} from './offers-crud.actions'
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs'

export const selectCustomerEffect = createEffect((
    actions$ = inject(Actions),
    tireSetService = inject(TireSetService),
    tireStoragePricing = inject(TireStoragePricingService)) => {
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
    tireSetService = inject(TireSetService),
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


