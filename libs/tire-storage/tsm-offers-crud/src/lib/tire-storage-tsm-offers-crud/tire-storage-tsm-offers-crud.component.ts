import { Component, inject, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'
import { DialogService, LargeButtonComponent } from '@nx-shell/core'
import { MatCardModule } from '@angular/material/card'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatDateFnsModule } from '@angular/material-date-fns-adapter'
import { add } from 'date-fns'
import { MAT_DATE_FORMATS } from '@angular/material/core'
import { DATE_FNS_DATE_FORMAT, OfferStatusEnum, TireSetWithPrices } from '@nx-shell/tire-storage/tsm-domain'
import { TsmCustomerSearchDialogComponent } from '@nx-shell/tire-storage/tsm-customer-search-dialog'
import {
  catchError,
  combineLatestWith,
  concatMap,
  filter,
  firstValueFrom,
  map,
  Observable,
  of,
  take,
  withLatestFrom
} from 'rxjs'
import { Store } from '@ngrx/store'
import {
  removeTireSet,
  selectCustomerSuccess,
  selectTireSetSuccess,
  setEndDate,
  setStartDate
} from '../+state/offers-crud.actions'
import { Customer, CustomersService, Offer, OfferService, TireSet } from '@nx-shell/tire-storage/tsm-services'
import { MatDialogRef } from '@angular/material/dialog'
import { selectOffersCrudViewModel } from '../+state/offers-crud.selector'
import {
  TsmCustomerInfoUiComponent,
  TsmOfferCalculationUiComponent,
  TsmTireSetInfoUiComponent
} from '@nx-shell/tire-storage/tsm-ui'
import { TsmTireSetSelectDialogComponent } from '@nx-shell/tire-storage/tsm-tire-set-select-dialog'
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'tsm-offers-tire-storage-tsm-offers-crud',
  standalone: true,
  imports: [CommonModule, MatIconModule, LargeButtonComponent, MatCardModule, MatDatepickerModule, MatDateFnsModule, TsmCustomerInfoUiComponent, TsmTireSetInfoUiComponent, TsmOfferCalculationUiComponent, MatButtonModule],
  templateUrl: './tire-storage-tsm-offers-crud.component.html',
  styleUrls: ['./tire-storage-tsm-offers-crud.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: DATE_FNS_DATE_FORMAT }
  ],
})
export class TireStorageTsmOffersCrudComponent implements OnInit {

  private readonly customerService = inject(CustomersService)
  private readonly dialogService = inject(DialogService)
  private readonly store = inject(Store)
  private readonly offerService = inject(OfferService)
  isLoadingCustomer = false
  isLoadingTireSet = false
  selectedCustomer$ = this.store.select(selectOffersCrudViewModel).pipe(map(val => val.selectedCustomer))
  selectedTireSetsWithPrices$: Observable<TireSetWithPrices[]> = this.store.select(selectOffersCrudViewModel).pipe(map(val => val.selectedTireSet !== null ? val.selectedTireSet : []))
  startDate$ = this.store.select(selectOffersCrudViewModel).pipe(map(val => val.startDate))
  endDate$ = this.store.select(selectOffersCrudViewModel).pipe(map(val => val.endDate))
  totalTireSetPrice$ = this.selectedTireSetsWithPrices$.pipe(
    map(val => val.reduce((prev, next) => prev + next.tireSetPrice, 0))
  )

  ngOnInit (): void {
    this.store.dispatch(setStartDate(new Date()))
    this.store.dispatch(setEndDate(add(new Date(), { months: 6 })))
  }

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
        .pipe(
          combineLatestWith(this.store.select(selectOffersCrudViewModel)
            .pipe(map(state => {return { selectedCustomer: state.selectedCustomer, selectedTireSets: state.selectedTireSet }}))
          ),
          take(1)
        ).subscribe(val => {
        const tireSets = val[0]
        const customer = val[1].selectedCustomer
        const selectedTireSetsWithPrices = val[1].selectedTireSets
        const dialogRef: MatDialogRef<TsmTireSetSelectDialogComponent, TireSet> = this.dialogService.openSmall(TsmTireSetSelectDialogComponent,
          {
            height: '600px',
            panelClass: 'no-overflow-modal',
            data: {
              customerId: customer?.id,
              tireSets: tireSets,
              selectedTireSets: selectedTireSetsWithPrices.map(e => e.tireSet)
            }
          }
        )
        dialogRef.afterClosed().pipe(take(1)).subscribe(tireSet => {
          if (tireSet) {
            this.store.dispatch(selectTireSetSuccess(tireSet))
          }
        })
      })
    }, 500)

  }

  onChangeCustomer () {
    const dialogRef: MatDialogRef<TsmCustomerSearchDialogComponent, Customer> = this.dialogService.openFullScreen(TsmCustomerSearchDialogComponent, {})
    dialogRef.afterClosed().pipe(take(1)).subscribe(customer => {
      if (customer) {
        this.store.dispatch(selectCustomerSuccess(customer))
      }
    })
  }

  onRemoveTireSet (tireSet: TireSet) {
    if (tireSet) {
      this.store.dispatch(removeTireSet(tireSet))
    }

  }

  onPlaceOrder () {
    of(null).pipe(
      withLatestFrom(this.selectedCustomer$, this.selectedTireSetsWithPrices$, this.startDate$, this.endDate$, this.totalTireSetPrice$),
      take(1),
      map(data => {
        return {
          customer: data[1],
          tireSets: data[2],
          startDate: data[3],
          endDate: data[4],
          totalPrice: data[5]
        }
      }),
      filter(data => data.customer !== null && data.tireSets.length > 0 && data.startDate !== null && data.endDate !== null),
      concatMap(data => {
        const offer: Offer = {
          customer: data.customer!,
          tireSets: data.tireSets,
          startDate: data.startDate!,
          endDate: data.endDate!,
          totalPrice: data.totalPrice,
          status: OfferStatusEnum.PLACED
        }
        return this.offerService.createOffer$(offer)
      }),
      catchError(error => {
        console.log(error)
        return of(null)
      })
    ).subscribe(val => console.log('created order', val))

  }

  onStartDateChanged (date: Date) {
    this.store.dispatch(setStartDate(date))
  }

  onEndDateChanged (date: Date) {
    this.store.dispatch(setEndDate(date))
  }
}
