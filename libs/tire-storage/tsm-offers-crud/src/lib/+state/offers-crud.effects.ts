import { Actions, createEffect, ofType } from '@ngrx/effects'
import { inject } from '@angular/core'
import { TireSetService } from '@nx-shell/tire-storage/tsm-services'
import { loadTireSetFailure, loadTireSetSuccess, selectCustomerSuccess } from './offers-crud.actions'
import { catchError, exhaustMap, map, of } from 'rxjs'

export const selectCustomerEffect = createEffect((actions$ = inject(Actions), tireSetService = inject(TireSetService)) => {
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
