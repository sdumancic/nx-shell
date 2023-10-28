import { Component, inject, OnInit } from '@angular/core'
import { Router, RouterModule } from '@angular/router'
import { HomeComponent } from '@nx-shell/tire-storage/tsm-home'
import { MainNavComponent } from './main-nav/main-nav.component'
import { MatIconRegistry } from '@angular/material/icon'
import { DomSanitizer } from '@angular/platform-browser'
import { userAuthActions } from '@nx-shell/users/user-auth'
import { Store } from '@ngrx/store'

@Component({
  standalone: true,
  imports: [RouterModule, HomeComponent, MainNavComponent],
  selector: 'tsm-app-shell-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private matIconRegistry = inject(MatIconRegistry)
  private store = inject(Store)
  private domSanitzer = inject(DomSanitizer)
  private router = inject(Router)
  title = 'tire-storage-manager'

  constructor () {
    this.matIconRegistry.addSvgIcon('login', this.domSanitzer.bypassSecurityTrustResourceUrl('assets/icons/login.svg'))
    this.matIconRegistry.addSvgIcon('logout', this.domSanitzer.bypassSecurityTrustResourceUrl('assets/icons/logout.svg'))
    this.matIconRegistry.addSvgIcon('profile', this.domSanitzer.bypassSecurityTrustResourceUrl('assets/icons/profile.svg'))
  }

  ngOnInit (): void {
    setTimeout(() => {
      this.store.dispatch(userAuthActions.loginUser({
        username: 'admin',
        password: 'admin'
      }))
    }, 10)

    setTimeout(() => {
      this.router.navigate(['users', 'profile'],)
    }, 500)

  }
}
