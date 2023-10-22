import { createActionGroup, emptyProps, props } from '@ngrx/store'
import { User } from '@nx-shell/users/user-services'

export const userAuthActions = createActionGroup({
  source: 'User',
  events: {
    'Login User': props<{ username: string, password: string }>(),
    'Login User Success': (user: User) => ({ user }),
    'Login User Failure': (error: string) => ({ error }),
    'Logout User': emptyProps,
    'Logout User Success': emptyProps,
    'Fetch User': props<{ id: number }>(),
    'Fetch User Success': (user: User) => ({ user }),
    'Fetch User Failure': (error: string) => ({ error }),
    'Fetch Users': emptyProps(),
    'Fetch Users Success': (users: User[]) => ({ users }),
    'Fetch Users Failure': (error: string) => ({ error }),
    'Create User': props<{ user: User }>(),
    'Create User Success': (user: User) => ({ user }),
    'Create User Failure': (error: string) => ({ error }),
    'Update User': props<{ id: number, user: Partial<User> }>(),
    'Update User Success': (user: User) => ({ user }),
    'Update User Failure': (error: string) => ({ error }),
  },
})

