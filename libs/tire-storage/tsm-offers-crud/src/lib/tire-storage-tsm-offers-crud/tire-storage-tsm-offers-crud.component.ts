import { Component, inject, Input, OnInit, ViewChild } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'
import { DialogService, LargeButtonComponent, MessageBusService, NotificationsObserverComponent } from '@nx-shell/core'
import { MatCardModule } from '@angular/material/card'
import { MatCalendar, MatDatepickerModule } from '@angular/material/datepicker'
import { MatDateFnsModule } from '@angular/material-date-fns-adapter'
import { add, parseISO } from 'date-fns'
import { MAT_DATE_FORMATS } from '@angular/material/core'
import { DATE_FNS_DATE_FORMAT } from '@nx-shell/tire-storage/tsm-domain'
import { TsmCustomerSearchDialogComponent } from '@nx-shell/tire-storage/tsm-customer-search-dialog'
import { BehaviorSubject, map, Observable, take } from 'rxjs'
import { Store } from '@ngrx/store'
import {
  createOffer,
  removeTireSet,
  selectCustomerSuccess,
  selectTireSetSuccess,
  setEndDate,
  setStartDate
} from '../+state/offers-crud.actions'
import {
  Customer,
  CustomersService,
  OfferService,
  TireSet,
  TireSetWithPrices
} from '@nx-shell/tire-storage/tsm-services'
import { MatDialogRef } from '@angular/material/dialog'
import { selectOffersCrudViewModel } from '../+state/offers-crud.selector'
import {
  TsmCustomerInfoUiComponent,
  TsmOfferCalculationUiComponent,
  TsmTireSetInfoUiComponent
} from '@nx-shell/tire-storage/tsm-ui'
import { TsmTireSetSelectDialogComponent } from '@nx-shell/tire-storage/tsm-tire-set-select-dialog'
import { MatButtonModule } from '@angular/material/button'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'tsm-offers-tire-storage-tsm-offers-crud',
  standalone: true,
  imports: [CommonModule, MatIconModule, LargeButtonComponent, MatCardModule,
    MatDatepickerModule, MatDateFnsModule, TsmCustomerInfoUiComponent, TsmTireSetInfoUiComponent, TsmOfferCalculationUiComponent, MatButtonModule,
    NotificationsObserverComponent],
  templateUrl: './tire-storage-tsm-offers-crud.component.html',
  styleUrls: ['./tire-storage-tsm-offers-crud.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: DATE_FNS_DATE_FORMAT },
    MatSnackBar
  ],
})
export class TireStorageTsmOffersCrudComponent implements OnInit {
  @ViewChild('endDateCalendar') matCalendar: MatCalendar<any> | undefined

  id$ = new BehaviorSubject<string | null>(null)

  @Input() set id (id: string) {
    this.id$.next(id)
  }

  private readonly customerService = inject(CustomersService)
  private readonly dialogService = inject(DialogService)
  private readonly store = inject(Store)
  private readonly offerService = inject(OfferService)
  private readonly messageBusService = inject(MessageBusService)
  isLoadingCustomer = false
  isLoadingTireSet = false
  selectedCustomer$ = this.store.select(selectOffersCrudViewModel).pipe(map(val => val.selectedCustomer))
  selectedTireSetsWithPrices$: Observable<TireSetWithPrices[]> = this.store.select(selectOffersCrudViewModel).pipe(map(val => val.selectedTireSet !== null ? val.selectedTireSet : []))
  startDate$ = this.store.select(selectOffersCrudViewModel).pipe(map(val => val.startDate))
  endDate$ = this.store.select(selectOffersCrudViewModel).pipe(map(val => val.endDate))
  totalTireSetPrice$ = this.store.select(selectOffersCrudViewModel).pipe(map(val => val.tireSetTotalValue))

  ngOnInit (): void {

    if (this.id$.value !== 'new') {
      // fetch offer and dispatch
      this.offerService.findOne$(Number(this.id$.value)).pipe(take(1)).subscribe(offer => {
        this.store.dispatch(setStartDate(parseISO(offer.startDate)))
        this.store.dispatch(setEndDate(parseISO(offer.endDate)))
        this.store.dispatch(selectCustomerSuccess(offer.customer))
        offer.tireSets.forEach(tireSetWithPrices => this.store.dispatch(selectTireSetSuccess(tireSetWithPrices.tireSet)))
      })

    } else {
      this.store.dispatch(setStartDate(new Date()))
      this.store.dispatch(setEndDate(add(new Date(), { months: 6 })))
    }

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
    //const customer = await firstValueFrom(this.customerService.getCustomer$(1))
    //this.store.dispatch(selectCustomerSuccess(customer))

    this.store.select(selectOffersCrudViewModel)
      .pipe(
        map(state => {
          return {
            customerTireSets: state.customerTireSets,
            selectedCustomer: state.selectedCustomer,
            selectedTireSetsWithPrices: state.selectedTireSet
          }
        }),
        take(1)
      ).subscribe(val => {
      const tireSets = val.customerTireSets
      const customer = val.selectedCustomer
      const selectedTireSetsWithPrices = val.selectedTireSetsWithPrices
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
    if (this.id$.value) {
      //this.store.dispatch(editOffer())
    } else {
      this.store.dispatch(createOffer())
    }

  }

  onStartDateChanged (date: any) {
    this.store.dispatch(setStartDate(date))
  }

  onEndDateChanged (date: any) {
    this.store.dispatch(setEndDate(date))
  }
}
