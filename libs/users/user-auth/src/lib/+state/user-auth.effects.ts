import { inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, exhaustMap, map, of } from 'rxjs'
import { userAuthActions } from './user-auth.actions'
import { AuthService } from '@nx-shell/users/user-services'

export const loginEffect = createEffect((actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(userAuthActions.loginUser),
      exhaustMap((action) =>
        authService.loginUser$(action.username, action.password).pipe(
          map(user => userAuthActions.loginUserSuccess(user)),
          catchError((err: Error) => {
              return of(userAuthActions.loginUserFailure(err.message))
            }
          )
        )
      )
    )
  },
  { functional: true }
)

export const logoutEffect = createEffect((actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(userAuthActions.logoutUser),
      map(user => userAuthActions.logoutUserSuccess()),
    )
  },
  { functional: true }
)

