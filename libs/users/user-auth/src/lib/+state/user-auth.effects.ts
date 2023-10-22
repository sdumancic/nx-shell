import { inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, exhaustMap, map, of, tap } from 'rxjs'
import { userAuthActions } from './user-auth.actions'
import { AuthService, UserService } from '@nx-shell/users/user-services'

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

export const updateUserEffect = createEffect((actions$ = inject(Actions), userService = inject(UserService)) => {
    return actions$.pipe(
      ofType(userAuthActions.updateUser),
      exhaustMap((action) =>
        userService.updateUser$(action.id, action.user).pipe(
          tap(updatedUser => console.log(updatedUser)),
          map(user => userAuthActions.updateUserSuccess(user)),
          catchError((err: Error) => {
              return of(userAuthActions.updateUserFailure(err.message))
            }
          )
        )
      )
    )
  },
  { functional: true }
)

