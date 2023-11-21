import { Component, DestroyRef, inject, Input, OnInit, ViewChild } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'
import { DialogService, LargeButtonComponent, MessageBusService, NotificationsObserverComponent } from '@nx-shell/core'
import { MatCardModule } from '@angular/material/card'
import { MatCalendar, MatDatepickerModule } from '@angular/material/datepicker'
import { MatDateFnsModule } from '@angular/material-date-fns-adapter'
import { add, endOfDay, parseISO } from 'date-fns'
import { MAT_DATE_FORMATS } from '@angular/material/core'
import { DATE_FNS_DATE_FORMAT, EditMode } from '@nx-shell/tire-storage/tsm-domain'
import { TsmCustomerSearchDialogComponent } from '@nx-shell/tire-storage/tsm-customer-search-dialog'
import { BehaviorSubject, debounceTime, map, Observable, take } from 'rxjs'
import { Store } from '@ngrx/store'
import {
  createOrUpdateOffer,
  removeTireSet,
  selectCustomerSuccess,
  selectTireSetSuccess,
  setEditMode,
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
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

@Component({
  selector: 'tsm-offers-tire-storage-tsm-offers-crud',
  standalone: true,
  imports: [CommonModule, MatIconModule, LargeButtonComponent, MatCardModule,
    MatDatepickerModule, MatDateFnsModule, TsmCustomerInfoUiComponent, TsmTireSetInfoUiComponent, TsmOfferCalculationUiComponent, MatButtonModule,
    NotificationsObserverComponent, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './tire-storage-tsm-offers-crud.component.html',
  styleUrls: ['./tire-storage-tsm-offers-crud.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: DATE_FNS_DATE_FORMAT },
    MatSnackBar
  ],
})
export class TireStorageTsmOffersCrudComponent implements OnInit {
  @ViewChild('endDateCalendar') matCalendar: MatCalendar<any> | undefined

  id$ = new BehaviorSubject<string | undefined>(undefined)

  @Input() set id (id: string) {
    this.id$.next(id)
  }

  private destroyRef = inject(DestroyRef)
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
  editMode$ = this.store.select(selectOffersCrudViewModel).pipe(map(val => val.editMode))

  endDateControl = new FormControl<Date | null>(null)
  startDateControl = new FormControl<Date | null>(null)

  ngOnInit (): void {

    this.endDateControl.valueChanges.pipe(debounceTime(300), takeUntilDestroyed(this.destroyRef)).subscribe(endDate => {
      if (endDate) {
        this.store.dispatch(setEndDate(endDate))
      }
    })
    this.startDateControl.valueChanges.pipe(debounceTime(300), takeUntilDestroyed(this.destroyRef)).subscribe(startDate => {
      if (startDate) {
        this.store.dispatch(setStartDate(startDate))
      }
    })

    if (this.id$.value !== 'new') {
      this.store.dispatch(setEditMode(EditMode.EDIT))
      this.offerService.findOne$(Number(this.id$.value)).pipe(take(1)).subscribe(offer => {
        this.store.dispatch(selectCustomerSuccess(offer.customer))
        this.startDateControl.setValue(parseISO(offer.startDate))
        this.endDateControl.setValue(parseISO(offer.endDate))
        offer.tireSets.forEach(tireSetWithPrices => this.store.dispatch(selectTireSetSuccess(tireSetWithPrices.tireSet)))
      })

    } else {
      this.store.dispatch(setEditMode(EditMode.ADD_NEW))
      const today = endOfDay(new Date())
      const future = endOfDay(add(new Date(), { months: 6 }))
      this.startDateControl.setValue(today)
      this.endDateControl.setValue(future)
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
    this.editMode$.pipe(take(1)).subscribe(editMode => {
      if (editMode === EditMode.EDIT) {
        this.store.dispatch(createOrUpdateOffer({ id: this.id$.value }))
      } else {
        this.store.dispatch(createOrUpdateOffer({}))
      }
    })

  }

  protected readonly EditMode = EditMode
}
