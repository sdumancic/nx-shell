import { ChangeDetectionStrategy, Component, EventEmitter, inject, Inject, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatFormFieldModule } from '@angular/material/form-field'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { CustomerSearchDialogDataModel } from '@nx-shell/tire-storage/tsm-domain'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { BehaviorSubject, combineLatest, debounceTime, delay, filter, map, of, switchMap, take, tap } from 'rxjs'
import { Customer, CustomersService } from '@nx-shell/tire-storage/tsm-services'
import { ScrollingModule } from '@angular/cdk/scrolling'
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator'
import { TsmCustomerInfoUiComponent } from '@nx-shell/tire-storage/tsm-ui'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { DialogService, GenericModalComponent } from '@nx-shell/core'
import { TsmCustomerEditDialogComponent } from '../tsm-customer-edit-dialog/tsm-customer-edit-dialog.component'

@Component({
  selector: 'tsm-customer-search-dialog',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatDialogModule, MatInputModule, MatButtonModule, MatIconModule,
    ReactiveFormsModule, ScrollingModule, MatPaginatorModule, TsmCustomerInfoUiComponent, MatProgressSpinnerModule, MatProgressBarModule, GenericModalComponent],
  templateUrl: './tsm-customer-search-dialog.component.html',
  styleUrls: ['./tsm-customer-search-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [DialogService]
})
export class TsmCustomerSearchDialogComponent {
  @Output() addCustomer = new EventEmitter<void>()
  length = 0
  pageSize = 5
  pageIndex = 0

  searchControl = new FormControl<string>('')
  searchInProgress = false
  items: Customer[] = []
  refresh$ = new BehaviorSubject<void>(undefined)

  private readonly dialogService = inject(DialogService)

  constructor (
    public dialogRef: MatDialogRef<TsmCustomerSearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CustomerSearchDialogDataModel,
    private readonly customerService: CustomersService
  ) {
    combineLatest([this.refresh$, this.searchControl.valueChanges]).pipe(
      takeUntilDestroyed(),
      debounceTime(300),
      map(val => val[1]),
      filter(value => value !== null),
      filter(value => value !== null && value?.length > 2),
      tap(val => this.searchInProgress = true),
      delay(1000),
      switchMap(searchText => searchText != null ? this.customerService.fullTextSearch(searchText, 1, 5) : of({ data: [], totalCount: null })),
    ).subscribe(val => {
      this.searchInProgress = false
      this.items = val?.data !== null ? val.data : []
      this.length = val?.totalCount !== null ? Number(val.totalCount) : 0
    })
  }

  onNoClick (): void {
    this.dialogRef.close()
  }

  handlePageEvent (event: PageEvent) {
    const val = this.searchControl.value
    if (val !== null) {
      this.customerService.fullTextSearch(val, (event.pageIndex + 1), event.pageSize).pipe(take(1)).subscribe(val => {
        this.items = val?.data !== null ? val.data : []
        this.length = val?.totalCount !== null ? Number(val.totalCount) : 0
      })
    }
  }

  onCustomerSelected (customer: Customer) {
    this.dialogRef.close(customer)
  }

  onCustomerEdit (customer: Customer) {
    const dialogRef = this.dialogService.openFullScreen(TsmCustomerEditDialogComponent, { data: { id: customer.id } })
    dialogRef.afterClosed().pipe(take(1)).subscribe(val => val ? this.refresh$.next() : null)
  }

  onCustomerAdd () {
    const dialogRef = this.dialogService.openFullScreen(TsmCustomerEditDialogComponent, { data: { id: null } })
    dialogRef.afterClosed().pipe(take(1)).subscribe(val => val ? this.refresh$.next() : null)
  }
}
