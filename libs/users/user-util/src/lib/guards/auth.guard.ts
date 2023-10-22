import { Store } from '@ngrx/store'
import { inject } from '@angular/core'
import { userAuthVm } from '@nx-shell/users/user-auth'
import { map } from 'rxjs/operators'
import { CanMatchFn, Router } from '@angular/router'

export const authGuard: CanMatchFn = (route, segments) => {
  const store = inject(Store)
  const router = inject(Router)
  return store.select(userAuthVm).pipe(
    map(vm => {
      if (vm.loggedInUser && vm.loggedInUser.username) {
        return true
      }
      router.navigate(['users', 'login'])
      return false
    }))
}
