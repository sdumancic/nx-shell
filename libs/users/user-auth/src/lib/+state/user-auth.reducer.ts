import { createFeature, createReducer, on } from '@ngrx/store'
import { CallState, LoadingState } from '@nx-shell/tire-storage/tsm-util'
import { userAuthActions } from './user-auth.actions'
import { User } from '@nx-shell/users/user-services'

export interface UserAuthState {
  loggedInUser: User | null
  loginCallState: CallState,
  usersOverview: User[],
  usersOverviewCallState: CallState,
}

const initialState: UserAuthState = {
  loggedInUser: null,
  loginCallState: LoadingState.INIT,
  usersOverview: [],
  usersOverviewCallState: LoadingState.INIT,
}

export const userAuthFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(userAuthActions.fetchUsers, (state, action) => {
      return {
        ...state,
        usersOverviewCallState: LoadingState.LOADING,
        usersOverview: []
      }
    }),
    on(userAuthActions.fetchUsersSuccess, (state, action) => {
      return {
        ...state,
        usersOverviewCallState: LoadingState.LOADED,
        usersOverview: action.users,
      }
    }),
    on(userAuthActions.fetchUsersFailure, (state, action) => {
      return {
        ...state,
        usersOverviewCallState: { errorMsg: action.error }
      }
    }),
    on(userAuthActions.loginUser, (state, action) => {
      return {
        ...state,
        loginCallState: LoadingState.LOADING
      }
    }),
    on(userAuthActions.loginUserSuccess, (state, action) => {
      return {
        ...state,
        loginCallState: LoadingState.LOADED,
        loggedInUser: action.user
      }
    }),
    on(userAuthActions.loginUserFailure, (state, action) => {
      return {
        ...state,
        loginCallState: { errorMsg: action.error },
        loggedInUser: null
      }
    }),
    on(userAuthActions.logoutUser, (state, action) => {
      return {
        ...state,
        loggedInUser: null,
        loginCallState: LoadingState.INIT
      }
    }),
    on(userAuthActions.updateUser, (state, action) => {
      return {
        ...state,
        loginCallState: LoadingState.LOADING
      }
    }),
    on(userAuthActions.updateUserSuccess, (state, action) => {
      return {
        ...state,
        loginCallState: LoadingState.LOADED,
        loggedInUser: action.user
      }
    }),
    on(userAuthActions.updateUserFailure, (state, action) => {
      return {
        ...state,
        loginCallState: { errorMsg: action.error },
        loggedInUser: null
      }
    }),
  ),
})




