import { Component, inject, OnInit } from '@angular/core'
import { Router, RouterModule } from '@angular/router'
import { HomeComponent } from '@nx-shell/tire-storage/tsm-home'
import { MainNavComponent } from './main-nav/main-nav.component'
import { MatIconRegistry } from '@angular/material/icon'
import { DomSanitizer } from '@angular/platform-browser'
import { userAuthActions } from '@nx-shell/users/user-auth'
import { Store } from '@ngrx/store'
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { DialogService } from '@nx-shell/core'

@Component({
  standalone: true,
  imports: [RouterModule, HomeComponent, MainNavComponent, MatDialogModule, MatFormFieldModule],
  selector: 'tsm-app-shell-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DialogService]
})
export class AppComponent implements OnInit {
  private matIconRegistry = inject(MatIconRegistry)
  private store = inject(Store)
  private domSanitzer = inject(DomSanitizer)
  private router = inject(Router)
  private dialogService = inject(DialogService)
  title = 'tire-storage-manager'

  constructor () {
    this.matIconRegistry.addSvgIcon('login', this.domSanitzer.bypassSecurityTrustResourceUrl('assets/icons/login.svg'))
    this.matIconRegistry.addSvgIcon('logout', this.domSanitzer.bypassSecurityTrustResourceUrl('assets/icons/logout.svg'))
    this.matIconRegistry.addSvgIcon('profile', this.domSanitzer.bypassSecurityTrustResourceUrl('assets/icons/profile.svg'))
    this.matIconRegistry.addSvgIcon('close', this.domSanitzer.bypassSecurityTrustResourceUrl('assets/icons/close.svg'))
    this.matIconRegistry.addSvgIcon('close-big', this.domSanitzer.bypassSecurityTrustResourceUrl('assets/icons/close-big.svg'))
    this.matIconRegistry.addSvgIcon('right-arrow', this.domSanitzer.bypassSecurityTrustResourceUrl('assets/icons/right-arrow.svg'))
    this.matIconRegistry.addSvgIcon('user', this.domSanitzer.bypassSecurityTrustResourceUrl('assets/icons/user.svg'))
    this.matIconRegistry.addSvgIcon('id', this.domSanitzer.bypassSecurityTrustResourceUrl('assets/icons/id.svg'))
    this.matIconRegistry.addSvgIcon('street', this.domSanitzer.bypassSecurityTrustResourceUrl('assets/icons/street.svg'))
    this.matIconRegistry.addSvgIcon('city', this.domSanitzer.bypassSecurityTrustResourceUrl('assets/icons/city.svg'))
    this.matIconRegistry.addSvgIcon('address', this.domSanitzer.bypassSecurityTrustResourceUrl('assets/icons/address.svg'))
    this.matIconRegistry.addSvgIcon('email', this.domSanitzer.bypassSecurityTrustResourceUrl('assets/icons/email.svg'))
    this.matIconRegistry.addSvgIcon('phone', this.domSanitzer.bypassSecurityTrustResourceUrl('assets/icons/phone.svg'))
    this.matIconRegistry.addSvgIcon('close-24px', this.domSanitzer.bypassSecurityTrustResourceUrl('assets/icons/close-24px.svg'))
    this.matIconRegistry.addSvgIcon('edit', this.domSanitzer.bypassSecurityTrustResourceUrl('assets/icons/edit.svg'))
    this.matIconRegistry.addSvgIcon('add-circle', this.domSanitzer.bypassSecurityTrustResourceUrl('assets/icons/add-circle.svg'))
    this.matIconRegistry.addSvgIcon('add', this.domSanitzer.bypassSecurityTrustResourceUrl('assets/icons/add.svg'))
    this.matIconRegistry.addSvgIcon('contact', this.domSanitzer.bypassSecurityTrustResourceUrl('assets/icons/contact.svg'))
    this.matIconRegistry.addSvgIcon('tire', this.domSanitzer.bypassSecurityTrustResourceUrl('assets/icons/tire.svg'))
  }

  ngOnInit (): void {
    setTimeout(() => {
      this.store.dispatch(userAuthActions.loginUser({
        username: 'admin',
        password: 'admin'
      }))
    }, 10)
  }

}
