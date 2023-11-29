import { Component, inject, OnInit } from '@angular/core'
import { Router, RouterModule } from '@angular/router'
import { MainNavComponent } from './main-nav/main-nav.component'
import { MatIconRegistry } from '@angular/material/icon'
import { DomSanitizer } from '@angular/platform-browser'
import { Store } from '@ngrx/store'
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { DialogService } from '@nx-shell/core'
import { userAuthActions } from '@nx-shell/users/user-auth'
import { TsmWarehouseDialogComponent } from '@nx-shell/tire-storage/tsm-warehouse'
import { take } from 'rxjs'

@Component({
  standalone: true,
  imports: [RouterModule, MainNavComponent, MatDialogModule, MatFormFieldModule],
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
    this.matIconRegistry.addSvgIcon('login', this.domSanitzer.bypassSecurityTrustResourceUrl('assets/core/icons/login.svg'))
    this.matIconRegistry.addSvgIcon('logout', this.domSanitzer.bypassSecurityTrustResourceUrl('assets/core/icons/logout.svg'))
    this.matIconRegistry.addSvgIcon('profile', this.domSanitzer.bypassSecurityTrustResourceUrl('assets/core/icons/profile.svg'))
    this.matIconRegistry.addSvgIcon('close', this.domSanitzer.bypassSecurityTrustResourceUrl('assets/core/icons/close.svg'))
    this.matIconRegistry.addSvgIcon('close-big', this.domSanitzer.bypassSecurityTrustResourceUrl('assets/core/icons/close-big.svg'))
    this.matIconRegistry.addSvgIcon('right-arrow', this.domSanitzer.bypassSecurityTrustResourceUrl('assets/core/icons/right-arrow.svg'))
    this.matIconRegistry.addSvgIcon('user', this.domSanitzer.bypassSecurityTrustResourceUrl('assets/core/icons/user.svg'))
    this.matIconRegistry.addSvgIcon('id', this.domSanitzer.bypassSecurityTrustResourceUrl('assets/core/icons/id.svg'))
    this.matIconRegistry.addSvgIcon('street', this.domSanitzer.bypassSecurityTrustResourceUrl('assets/core/icons/street.svg'))
    this.matIconRegistry.addSvgIcon('city', this.domSanitzer.bypassSecurityTrustResourceUrl('assets/core/icons/city.svg'))
    this.matIconRegistry.addSvgIcon('address', this.domSanitzer.bypassSecurityTrustResourceUrl('assets/core/icons/address.svg'))
    this.matIconRegistry.addSvgIcon('email', this.domSanitzer.bypassSecurityTrustResourceUrl('assets/core/icons/email.svg'))
    this.matIconRegistry.addSvgIcon('phone', this.domSanitzer.bypassSecurityTrustResourceUrl('assets/core/icons/phone.svg'))
    this.matIconRegistry.addSvgIcon('close-24px', this.domSanitzer.bypassSecurityTrustResourceUrl('assets/core/icons/close-24px.svg'))
    this.matIconRegistry.addSvgIcon('edit', this.domSanitzer.bypassSecurityTrustResourceUrl('assets/core/icons/edit.svg'))
    this.matIconRegistry.addSvgIcon('add-circle', this.domSanitzer.bypassSecurityTrustResourceUrl('assets/core/icons/add-circle.svg'))
    this.matIconRegistry.addSvgIcon('add', this.domSanitzer.bypassSecurityTrustResourceUrl('assets/core/icons/add.svg'))
    this.matIconRegistry.addSvgIcon('contact', this.domSanitzer.bypassSecurityTrustResourceUrl('assets/core/icons/contact.svg'))
    this.matIconRegistry.addSvgIcon('tire', this.domSanitzer.bypassSecurityTrustResourceUrl('assets/core/icons/tire.svg'))
    this.matIconRegistry.addSvgIcon('delete1', this.domSanitzer.bypassSecurityTrustResourceUrl('assets/core/icons/delete1.svg'))
    this.matIconRegistry.addSvgIcon('delete2', this.domSanitzer.bypassSecurityTrustResourceUrl('assets/core/icons/delete2.svg'))
    this.matIconRegistry.addSvgIcon('delete3', this.domSanitzer.bypassSecurityTrustResourceUrl('assets/core/icons/delete3.svg'))
    this.matIconRegistry.addSvgIcon('filter', this.domSanitzer.bypassSecurityTrustResourceUrl('assets/core/icons/filter.svg'))
    this.matIconRegistry.addSvgIcon('clear-filter', this.domSanitzer.bypassSecurityTrustResourceUrl('assets/core/icons/clear-filter.svg'))
    this.matIconRegistry.addSvgIcon('warehouse1', this.domSanitzer.bypassSecurityTrustResourceUrl('assets/core/icons/warehouse1.svg'))
    this.matIconRegistry.addSvgIcon('warehouse2', this.domSanitzer.bypassSecurityTrustResourceUrl('assets/core/icons/warehouse2.svg'))
    this.matIconRegistry.addSvgIcon('warehouse3', this.domSanitzer.bypassSecurityTrustResourceUrl('assets/core/icons/warehouse3.svg'))
    this.matIconRegistry.addSvgIcon('offer', this.domSanitzer.bypassSecurityTrustResourceUrl('assets/core/icons/offer.svg'))
    this.matIconRegistry.addSvgIcon('contract', this.domSanitzer.bypassSecurityTrustResourceUrl('assets/core/icons/contract.svg'))
    this.matIconRegistry.addSvgIcon('run-flat', this.domSanitzer.bypassSecurityTrustResourceUrl('assets/core/icons/run-flat.svg'))
    this.matIconRegistry.addSvgIcon('rims', this.domSanitzer.bypassSecurityTrustResourceUrl('assets/core/icons/rims.svg'))
    this.matIconRegistry.addSvgIcon('expand', this.domSanitzer.bypassSecurityTrustResourceUrl('assets/core/icons/expand.svg'))
    this.matIconRegistry.addSvgIcon('accept', this.domSanitzer.bypassSecurityTrustResourceUrl('assets/core/icons/accept.svg'))
    this.matIconRegistry.addSvgIcon('reject', this.domSanitzer.bypassSecurityTrustResourceUrl('assets/core/icons/reject.svg'))
  }

  ngOnInit (): void {

    setTimeout(() => {
      console.log('dispatching login')
      this.store.dispatch(userAuthActions.loginUser({
        username: 'admin',
        password: 'admin'
      }))
      const dialogRef = this.dialogService.openFullScreen(TsmWarehouseDialogComponent, {
        data: { offerId: 2 },
        panelClass: 'no-overflow-modal',
      })
      dialogRef.afterClosed().pipe(take(1)).subscribe(val => console.log(val))

    }, 10)

  }

}
