import { createSelector } from '@ngrx/store'
import { getError, LoadingState } from '@nx-shell/tire-storage/tsm-util'
import { userAuthFeature } from './user-auth.reducer'

export const userAuthVm = createSelector(
  userAuthFeature.selectLoggedInUser,
  userAuthFeature.selectLoginCallState,
  userAuthFeature.selectUsersOverview,
  userAuthFeature.selectUsersOverviewCallState,
  (loggedInUser, loginCallState, userOverview, userOverviewCallState) => ({
    loggedInUser,
    loginInProgress: loginCallState === LoadingState.LOADING,
    loginSuccess: loginCallState === LoadingState.LOADED,
    loginError: getError(loginCallState),
    userOverview,
    userOverviewLoading: userOverviewCallState === LoadingState.LOADING,
    userOverviewLoaded: userOverviewCallState === LoadingState.LOADED,
    userOverviewError: getError(userOverviewCallState)
  })
)

export const selectLoggedInUser = createSelector(
  userAuthFeature.selectLoggedInUser,
  (user) => ({
    user
  })
)
