import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'
import { DialogService, LargeButtonComponent } from '@nx-shell/core'
import { MatCardModule } from '@angular/material/card'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatDateFnsModule } from '@angular/material-date-fns-adapter'
import { add } from 'date-fns'
import { MAT_DATE_FORMATS } from '@angular/material/core'
import { DATE_FNS_DATE_FORMAT } from '@nx-shell/tire-storage/tsm-domain'
import { TsmCustomerSearchDialogComponent } from '@nx-shell/tire-storage/tsm-customer-search-dialog'
import { combineLatestWith, firstValueFrom, map, take } from 'rxjs'
import { Store } from '@ngrx/store'
import { selectCustomerSuccess } from '../+state/offers-crud.actions'
import { Customer, CustomersService, TireSet } from '@nx-shell/tire-storage/tsm-services'
import { MatDialogRef } from '@angular/material/dialog'
import { selectOffersCrudViewModel } from '../+state/offers-crud.selector'
import { TsmCustomerInfoUiComponent } from '@nx-shell/tire-storage/tsm-ui'
import { TsmTireSetSelectDialogComponent } from '@nx-shell/tire-storage/tsm-tire-set-select-dialog'

@Component({
  selector: 'tsm-offers-tire-storage-tsm-offers-crud',
  standalone: true,
  imports: [CommonModule, MatIconModule, LargeButtonComponent, MatCardModule, MatDatepickerModule, MatDateFnsModule, TsmCustomerInfoUiComponent],
  templateUrl: './tire-storage-tsm-offers-crud.component.html',
  styleUrls: ['./tire-storage-tsm-offers-crud.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: DATE_FNS_DATE_FORMAT }
  ],
})
export class TireStorageTsmOffersCrudComponent {
  private readonly customerService = inject(CustomersService)
  private readonly dialogService = inject(DialogService)
  private readonly store = inject(Store)
  isLoadingCustomer = false
  isLoadingTireset = false
  today = new Date()
  todayPlus6months: Date = add(new Date(), { months: 6 })
  selectedCustomer$ = this.store.select(selectOffersCrudViewModel).pipe(map(val => val.selectedCustomer))

  onSelectCustomer () {
    const dialogRef: MatDialogRef<TsmCustomerSearchDialogComponent, Customer> = this.dialogService.openFullScreen(TsmCustomerSearchDialogComponent, {})
    dialogRef.afterClosed().pipe(take(1)).subscribe(customer => {
      if (customer) {
        this.store.dispatch(selectCustomerSuccess(customer))
      }
    })

  }

  async onSelectTireSet () {
    const customer = await firstValueFrom(this.customerService.getCustomer$(1))
    this.store.dispatch(selectCustomerSuccess(customer))
    setTimeout(() => {
      this.store.select(selectOffersCrudViewModel)
        .pipe(
          map(state => state.customerTireSets))
        .pipe(combineLatestWith(this.store.select(selectOffersCrudViewModel)
            .pipe(map(state => state.selectedCustomer))),
          take(1)
        ).subscribe(val => {
        const tireSets = val[0]
        const customer = val[1]
        const dialogRef: MatDialogRef<TsmTireSetSelectDialogComponent, TireSet> = this.dialogService.openSmall(TsmTireSetSelectDialogComponent,
          {
            height: '600px',
            panelClass: 'no-overflow-modal',
            data: {
              customerId: customer?.id,
              tireSets: tireSets
            }
          }
        )
      })
    }, 500)

    /*const dialogRef: MatDialogRef<TsmTireSetEditDialogComponent, TireSet> = this.dialogService.openFullScreen(TsmTireSetEditDialogComponent, {})
    dialogRef.afterClosed().pipe(take(1)).subscribe(tireSet => {
      if (tireSet) {
        this.store.dispatch(selectTireSetSuccess(tireSet))
      }
    })*/
  }

  onChangeCustomer () {
    const dialogRef: MatDialogRef<TsmCustomerSearchDialogComponent, Customer> = this.dialogService.openFullScreen(TsmCustomerSearchDialogComponent, {})
    dialogRef.afterClosed().pipe(take(1)).subscribe(customer => {
      if (customer) {
        this.store.dispatch(selectCustomerSuccess(customer))
      }
    })
  }
}
