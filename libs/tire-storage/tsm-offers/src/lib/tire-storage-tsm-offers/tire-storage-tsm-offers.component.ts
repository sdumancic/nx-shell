import { Component, inject, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router'
import { map, Observable, take } from 'rxjs'
import { MatTabsModule } from '@angular/material/tabs'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatInputModule } from '@angular/material/input'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatOptionModule } from '@angular/material/core'
import { MatSelectModule } from '@angular/material/select'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { Store } from '@ngrx/store'
import { acceptOffer, loadMetadata, rejectOffer, searchOffers } from '../+state/offers-overview.actions'
import { OffersOverviewMapper } from '../mapper/offers-overview.mapper'
import { selectOffersOverviewVm } from '../+state/offers-overview.selector'
import { OffersOverviewSearchResultUi, TsmOffersOverviewTableUiComponent } from '@nx-shell/tire-storage/tsm-ui'
import { OfferStatusEnum, SearchMeta } from '@nx-shell/tire-storage/tsm-domain'
import { PageEvent } from '@angular/material/paginator'
import { Sort } from '@angular/material/sort'

@Component({
  selector: 'nx-shell-tire-storage-tsm-offers',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatTabsModule
    , MatButtonModule, MatIconModule, MatExpansionModule, MatInputModule, MatDatepickerModule,
    MatOptionModule, MatSelectModule, ReactiveFormsModule, RouterLink, RouterLinkActive, TsmOffersOverviewTableUiComponent],
  templateUrl: './tire-storage-tsm-offers.component.html',
  styleUrls: ['./tire-storage-tsm-offers.component.scss'],
})
export class TireStorageTsmOffersComponent implements OnInit {
  readonly activatedRoute = inject(ActivatedRoute)
  readonly router = inject(Router)
  private readonly store = inject(Store)
  seasons$: Observable<string[]> = this.store.select(selectOffersOverviewVm).pipe(map(vm => vm.selectedTireSetMetadata?.tireTypes ? vm.selectedTireSetMetadata?.tireTypes : []))
  brands$: Observable<string[]> = this.store.select(selectOffersOverviewVm).pipe(map(vm => vm.selectedTireSetMetadata?.tireBrands ? vm.selectedTireSetMetadata?.tireBrands : []))
  widths$: Observable<number[]> = this.store.select(selectOffersOverviewVm).pipe(map(vm => vm.selectedTireSetMetadata?.tireWidths ? vm.selectedTireSetMetadata?.tireWidths : []))
  heights$: Observable<number[]> = this.store.select(selectOffersOverviewVm).pipe(map(vm => vm.selectedTireSetMetadata?.tireHeights ? vm.selectedTireSetMetadata?.tireHeights : []))
  sizes$: Observable<number[]> = this.store.select(selectOffersOverviewVm).pipe(map(vm => vm.selectedTireSetMetadata?.tireSizes ? vm.selectedTireSetMetadata?.tireSizes : []))
  loadIndexes$: Observable<number[]> = this.store.select(selectOffersOverviewVm).pipe(map(vm => vm.selectedTireSetMetadata?.loadIndexes ? vm.selectedTireSetMetadata?.loadIndexes : []))
  speedIndexes$: Observable<string[]> = this.store.select(selectOffersOverviewVm).pipe(map(vm => vm.selectedTireSetMetadata?.speedIndexes ? vm.selectedTireSetMetadata?.speedIndexes : []))
  metadataLoaded$: Observable<boolean> = this.store.select(selectOffersOverviewVm).pipe(map(vm => vm.selectedTIreSetMetadataLoaded))

  searchResult$: Observable<OffersOverviewSearchResultUi[]> = this.store.select(selectOffersOverviewVm).pipe(map(vm => vm.offers ? OffersOverviewMapper.fromResourceCollectionToSearchResultUi(vm.offers) : []))
  searchCount$: Observable<number> = this.store.select(selectOffersOverviewVm).pipe(map(vm => vm.totalCount ? vm.totalCount : 0))
  searchMeta$: Observable<SearchMeta> = this.store.select(selectOffersOverviewVm).pipe(map(vm => vm.searchMeta))
  loading$: Observable<boolean> = this.store.select(selectOffersOverviewVm).pipe(map(vm => vm.offersLoading))

  filterForm = new FormGroup({
    season: new FormControl<string | null>('',),
    brand: new FormControl<string | null>('',),
    width: new FormControl<number | null>(null),
    height: new FormControl<number | null>(null),
    size: new FormControl<number | null>(null),
    loadIndex: new FormControl<number | null>(null),
    speedIndex: new FormControl<string | null>(''),
    customerId: new FormControl<number | null>(null)
  })

  navLinks = [
    {
      label: 'Open',
      link: './open',
      index: 0
    }, {
      label: 'Accepted',
      link: './accepted',
      index: 1
    }, {
      label: 'Rejected',
      link: './rejected',
      index: 2
    },
  ]

  currentTab = 'open'

  ngOnInit (): void {

    this.activatedRoute.url.pipe(map(segments => segments.join(''))).subscribe(val => {
      if (val == '') {
        this.store.dispatch(loadMetadata())
        this.metadataLoaded$.pipe(take(1)).subscribe(metadata => {
          this.router.navigate(['open'], { relativeTo: this.activatedRoute.parent })
        })
      } else {
        this.currentTab = val
        const status = this.currentTab === 'open' ? OfferStatusEnum.PLACED : this.currentTab === 'accepted' ? OfferStatusEnum.ACCEPTED : OfferStatusEnum.REJECTED
        const searchMeta = {
          pagination: { index: 1, size: 10 },
          sorting: { attribute: 'id', order: 'desc' }
        } as SearchMeta
        this.store.dispatch(searchOffers({ searchValues: { status }, searchMeta: searchMeta }))
      }
    })

  }

  onSearch () {
    const status = this.currentTab === 'open' ? OfferStatusEnum.PLACED : this.currentTab === 'accepted' ? OfferStatusEnum.ACCEPTED : OfferStatusEnum.REJECTED
    const searchValues = OffersOverviewMapper.fromFormValuesToSearchValues(this.filterForm.getRawValue(), status)
    this.store.dispatch(searchOffers({ searchValues }))
  }

  onClear () {
    this.filterForm.reset()
  }

  onPaginate (pageEvent: PageEvent) {
    const newIndex = pageEvent.pageIndex + 1
    const size = pageEvent.pageSize
    const searchMeta = { pagination: { index: newIndex, size: size } } as SearchMeta
    this.store.dispatch(searchOffers({ searchMeta }))
  }

  onSort (sort: Sort) {
    const searchMeta = { sorting: { attribute: sort.active, order: sort.direction } } as SearchMeta
    this.store.dispatch(searchOffers({ searchMeta }))
  }

  createNewOffer () {
    this.router.navigate(['offers', 'edit', 'new'],)
  }

  onEdit (row: OffersOverviewSearchResultUi) {
    this.router.navigate(['offers', 'edit', row.id])
  }

  onReject (row: OffersOverviewSearchResultUi) {
    if (row.id) {
      this.store.dispatch(rejectOffer({ id: row.id }))
    }

  }

  onAccept (row: OffersOverviewSearchResultUi) {
    if (row.id) {
      this.store.dispatch(acceptOffer({ id: row.id }))
    }
  }
}
