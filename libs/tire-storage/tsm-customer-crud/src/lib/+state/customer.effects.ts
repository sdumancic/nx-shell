import { inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, exhaustMap, map, of } from 'rxjs'
import { CustomersMetadataService, CustomersService } from '@nx-shell/tire-storage/tsm-services'
import {
  loadCustomer,
  loadCustomerFailure,
  loadCustomerMetadata,
  loadCustomerMetadataFailure,
  loadCustomerMetadataSuccess,
  loadCustomerSuccess
} from './customer.actions'

export const getCustomerEffect = createEffect((actions$ = inject(Actions), customerService = inject(CustomersService)) => {
    return actions$.pipe(
      ofType(loadCustomer),
      exhaustMap((action) =>
        customerService.getCustomer$(action.id).pipe(
          map(customer => loadCustomerSuccess(customer)),
          catchError((error: string) => of(loadCustomerFailure(error)))
        )
      )
    )
  },
  { functional: true }
)

export const getMetadataEffect =
  createEffect((actions$ = inject(Actions), customerMetadataService = inject(CustomersMetadataService)) => {
      return actions$.pipe(
        ofType(loadCustomerMetadata),
        exhaustMap((action) =>
          customerMetadataService.getCustomerMetadata$().pipe(
            map(metadata => loadCustomerMetadataSuccess(metadata)),
            catchError((error: string) => of(loadCustomerMetadataFailure(error)))
          )
        )
      )
    },
    { functional: true }
  )
