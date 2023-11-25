import { AfterViewInit, Component, DestroyRef, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { MatDividerModule } from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon'
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSort, MatSortModule, Sort, SortDirection } from '@angular/material/sort'
import { MatTableModule } from '@angular/material/table'
import { SearchMeta } from '@nx-shell/tire-storage/tsm-domain'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { MatMenuModule } from '@angular/material/menu'
import { CustomersOverviewSearchResultUi } from './customers-overview-search-result-ui.model'

@Component({
  selector: 'tsm-ui-customers-overview-table',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDividerModule, MatIconModule, MatMenuModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, MatTableModule],
  templateUrl: './tsm-customers-overview-table-ui.component.html',
  styleUrl: './tsm-customers-overview-table-ui.component.scss',
})
export class TsmCustomersOverviewTableUiComponent implements AfterViewInit {
  @Input() data: CustomersOverviewSearchResultUi[] | null = []
  @Input() searchCount: number | null = 0
  @Input() searchMeta: SearchMeta | null = null
  @Input() loading: boolean | null = false

  @Output() sortEmitter = new EventEmitter<Sort>()
  @Output() paginateEmitter = new EventEmitter<PageEvent>()
  @Output() selectionChangeEmitter = new EventEmitter<
    CustomersOverviewSearchResultUi[]
  >()
  @Output() editEmitter = new EventEmitter<CustomersOverviewSearchResultUi>()

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined
  @ViewChild(MatSort) sort: MatSort | undefined

  displayedColumns = ['id', 'firstName', 'lastName', 'gender', 'street', 'city', 'state', 'zip', 'phoneNumber', 'email', 'actions']

  private destroyRef = inject(DestroyRef)

  get dataNotNull () {
    return this.data ? this.data : []
  }

  get searchCountNotNull () {
    return this.searchCount ? this.searchCount : 0
  }

  get sortAttribute () {
    return this.searchMeta?.sorting?.attribute ? this.searchMeta?.sorting?.attribute : 'id'
  }

  get sortDirection () {
    return this.searchMeta?.sorting?.order as SortDirection
  }

  ngAfterViewInit (): void {
    this.paginator?.page.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(val => this.paginateEmitter.emit(val))

  }

  sortData (sortEvent: Sort) {
    this.sortEmitter.emit(sortEvent)
  }

  onEdit (row: CustomersOverviewSearchResultUi) {
    this.editEmitter.emit(row)
  }

}
