import { ChangeDetectionStrategy, Component, Inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatFormFieldModule } from '@angular/material/form-field'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { CustomerSearchDialogDataModel } from '@nx-shell/tire-storage/tsm-domain'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { debounceTime, filter, finalize, of, switchMap, take, tap } from 'rxjs'
import { Customer, CustomersService } from '@nx-shell/tire-storage/tsm-services'
import { ScrollingModule } from '@angular/cdk/scrolling'
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator'
import { TsmCustomerInfoUiComponent } from '@nx-shell/tire-storage/tsm-ui'

@Component({
  selector: 'tsm-customer-search-dialog',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatDialogModule, MatInputModule, MatButtonModule, MatIconModule,
    ReactiveFormsModule, ScrollingModule, MatPaginatorModule, TsmCustomerInfoUiComponent],
  templateUrl: './tsm-customer-search-dialog.component.html',
  styleUrls: ['./tsm-customer-search-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class TsmCustomerSearchDialogComponent {
  length = 0
  pageSize = 5
  pageIndex = 0
  pageSizeOptions = [5, 10, 25]

  searchControl = new FormControl<string>('')
  selectedCustomer: any
  searchInProgress = false
  itemSize = 100
  items: Customer[] = []

  constructor (
    public dialogRef: MatDialogRef<TsmCustomerSearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CustomerSearchDialogDataModel,
    private readonly customerService: CustomersService
  ) {
    this.searchControl.valueChanges.pipe(
      takeUntilDestroyed(),
      debounceTime(300),
      filter(value => value !== null),
      filter(value => value !== null && value?.length > 2),
      tap(val => this.searchInProgress = true),
      switchMap(searchText => searchText != null ? this.customerService.fullTextSearch(searchText, 1, 5) : of({ data: [], totalCount: null })),
      finalize(() => this.searchInProgress = false)
    ).subscribe(val => {
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
}
