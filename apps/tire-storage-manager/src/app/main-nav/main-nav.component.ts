import { Component, inject } from '@angular/core'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatListModule } from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon'
import { Observable } from 'rxjs'
import { map, shareReplay } from 'rxjs/operators'
import { CommonModule } from '@angular/common'
import { RouterLink, RouterOutlet } from '@angular/router'
import { Store } from '@ngrx/store'
import { userAuthVm } from '@nx-shell/users/user-auth'

@Component({
  selector: 'tsm-app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    RouterOutlet,
    RouterLink
  ]
})
export class MainNavComponent {
  private breakpointObserver = inject(BreakpointObserver)
  private store = inject(Store)

  loggedInUser$ = this.store.select(userAuthVm).pipe(map(vm => vm.loggedInUser ? vm.loggedInUser.username : null))

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    )
}
