import { Component, inject, OnInit } from '@angular/core'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatListModule } from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon'
import { CommonModule } from '@angular/common'
import { RouterLink, RouterOutlet } from '@angular/router'
import { Store } from '@ngrx/store'
import { userAuthVm } from '@nx-shell/users/user-auth'
import { delay, map, Observable, of, shareReplay } from 'rxjs'
import { MatMenuModule } from '@angular/material/menu'

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
    RouterLink,
    MatMenuModule
  ]
})
export class MainNavComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver)
  private store = inject(Store)

  loggedInUser$: Observable<string | null> = of(null)

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    )

  ngOnInit (): void {
    this.loggedInUser$ = this.store.select(userAuthVm).pipe(delay(0), map(vm => vm.loggedInUser ? vm.loggedInUser.username : null))
  }
}
