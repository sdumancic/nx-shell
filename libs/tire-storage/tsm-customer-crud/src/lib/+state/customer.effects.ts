import { inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, exhaustMap, map, of } from 'rxjs'
import { CustomersMetadataService, CustomersService } from '@nx-shell/tire-storage/tsm-services'
import { customerActions } from './customer.actions'

export const getCustomerEffect = createEffect((actions$ = inject(Actions), customerService = inject(CustomersService)) => {
    return actions$.pipe(
      ofType(customerActions.fetchCustomer),
      exhaustMap((action) =>
        customerService.getCustomer$(action.id).pipe(
          map(customer => customerActions.fetchCustomerSuccess(customer)),
          catchError((error: string) => of(customerActions.fetchCustomerFailure(error)))
        )
      )
    )
  },
  { functional: true }
)

export const getMetadataEffect =
  createEffect((actions$ = inject(Actions), customerMetadataService = inject(CustomersMetadataService)) => {
      return actions$.pipe(
        ofType(customerActions.fetchCustomerMetadata),
        exhaustMap((action) =>
          customerMetadataService.getCustomerMetadata$().pipe(
            map(metadata => customerActions.fetchCustomerMetadataSuccess(metadata)),
            catchError((error: string) => of(customerActions.fetchCustomerMetadataFailure(error)))
          )
        )
      )
    },
    { functional: true }
  )
