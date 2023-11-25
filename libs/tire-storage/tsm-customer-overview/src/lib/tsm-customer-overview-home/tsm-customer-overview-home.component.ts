import { Component, inject, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CustomersOverviewStore } from '../customers-overview.store'
import { MatButtonModule } from '@angular/material/button'
import { MatTabsModule } from '@angular/material/tabs'
import { MatIconModule } from '@angular/material/icon'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatOptionModule } from '@angular/material/core'
import { MatSelectModule } from '@angular/material/select'
import { RouterLinkActive } from '@angular/router'
import {
  CustomersOverviewSearchResultUi,
  TsmCustomersOverviewTableUiComponent,
  TsmOffersOverviewTableUiComponent
} from '@nx-shell/tire-storage/tsm-ui'
import { MatInputModule } from '@angular/material/input'
import { PageEvent } from '@angular/material/paginator'
import { Sort } from '@angular/material/sort'
import { CustomersOverviewMapper } from '../mapper/customers-overview.mapper'
import { CustomersOverviewFormService } from '../form/customers-overview-form.service'
import { SearchMeta } from '@nx-shell/tire-storage/tsm-domain'
import { TsmCustomerEditDialogComponent } from '@nx-shell/tire-storage/tsm-customer-search-dialog'
import { take } from 'rxjs'
import { DialogService } from '@nx-shell/core'
import { NGXLogger } from 'ngx-logger'

@Component({
  selector: 'tsm-customer-overview-home',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatTabsModule, MatIconModule, ReactiveFormsModule, MatExpansionModule,
    MatFormFieldModule, MatOptionModule, MatSelectModule, RouterLinkActive, TsmOffersOverviewTableUiComponent,
    MatInputModule, TsmCustomersOverviewTableUiComponent],
  templateUrl: './tsm-customer-overview-home.component.html',
  styleUrls: ['./tsm-customer-overview-home.component.scss'],
  providers: [CustomersOverviewFormService]
})
export class TsmCustomerOverviewHomeComponent implements OnInit {

  private store = inject(CustomersOverviewStore)
  private formService = inject(CustomersOverviewFormService)
  private readonly dialogService = inject(DialogService)
  private logger = inject(NGXLogger)

  searchResult = this.store.customers
  searchCount = this.store.totalCount
  searchMeta = this.store.searchMeta
  loading = this.store.customersLoading
  metadata = this.store.customerMetadata

  filterForm: FormGroup = new FormGroup({})

  ngOnInit (): void {
    this.filterForm = this.formService.formGroup
    this.store.loadMetadata()
    this.store.setPagination(1, 10)
    this.store.setSort('id', 'desc')
    this.store.searchCustomers({})
    this.logger.info('This is logger message')
  }

  customersSearchResult () {
    return CustomersOverviewMapper.fromResourceCollectionToSearchResultUi(this.searchResult)
  }

  onSearch () {
    const searchValues = CustomersOverviewMapper.fromFormValuesToSearchValues(this.filterForm.getRawValue())
    this.store.searchCustomers({ searchValues })
  }

  onClear () {
    this.formService.clear()
  }

  onPaginate (pageEvent: PageEvent) {
    const newIndex = pageEvent.pageIndex + 1
    const size = pageEvent.pageSize
    const searchMeta = { pagination: { index: newIndex, size: size } } as SearchMeta
    this.store.searchCustomers({ pagination: searchMeta.pagination })
  }

  onSort (sort: Sort) {
    const searchMeta = { sorting: { attribute: sort.active, order: sort.direction } } as SearchMeta
    this.store.searchCustomers({ sorting: searchMeta.sorting })
  }

  onEdit (row: CustomersOverviewSearchResultUi) {
    const dialogRef = this.dialogService.openFullScreen(TsmCustomerEditDialogComponent, { data: { id: row.id } })
    dialogRef.afterClosed().pipe(take(1)).subscribe(val => val ? this.store.searchCustomers({}) : null)

  }

  createNewCustomer () {
    const dialogRef = this.dialogService.openFullScreen(TsmCustomerEditDialogComponent, { data: { id: null } })
    dialogRef.afterClosed().pipe(take(1)).subscribe(val => val ? this.store.searchCustomers({}) : null)
  }

}
