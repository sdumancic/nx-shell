import { inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, exhaustMap, map, of } from 'rxjs'
import { CustomersService } from '@nx-shell/tire-storage/tsm-services'
import { loadCustomers, loadCustomersFailure, loadCustomersSuccess } from './customers.actions'

export const getCustomersEffect = createEffect((actions$ = inject(Actions), customerService = inject(CustomersService)) => {
    return actions$.pipe(
      ofType(loadCustomers),
      exhaustMap(() =>
        customerService.getCustomers$().pipe(
          map(customers => loadCustomersSuccess(customers)),
          catchError((error: string) => of(loadCustomersFailure(error)))
        )
      )
    )
  },
  { functional: true }
)
