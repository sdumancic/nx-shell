import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatSort, MatSortModule, Sort, SortDirection } from '@angular/material/sort'
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator'
import { OffersOverviewSearchResultUi } from './offers-overview-search-result-ui.model'
import { SearchMeta } from '@nx-shell/tire-storage/tsm-domain'
import { MatTableModule } from '@angular/material/table'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

@Component({
  selector: 'tsm-ui-offers-overview-table-ui',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatProgressSpinnerModule, MatPaginatorModule, MatSortModule],
  templateUrl: './tsm-offers-overview-table-ui.component.html',
  styleUrls: ['./tsm-offers-overview-table-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TsmOffersOverviewTableUiComponent implements AfterViewInit {

  @Input() data: OffersOverviewSearchResultUi[] | null = []
  @Input() searchCount: number | null = 0
  @Input() searchMeta: SearchMeta | null = null
  @Input() loading: boolean | null = false

  @Output() sortEmitter = new EventEmitter<Sort>()
  @Output() paginateEmitter = new EventEmitter<PageEvent>()
  @Output() selectionChangeEmitter = new EventEmitter<
    OffersOverviewSearchResultUi[]
  >()

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined
  @ViewChild(MatSort) sort: MatSort | undefined

  displayedColumns = ['id', 'customer', 'startDate', 'endDate', 'status', 'totalPrice']

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
}
