import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BehaviorSubject, combineLatest, filter, map } from 'rxjs'
import { Store } from '@ngrx/store'
import { loadCustomer, loadCustomerMetadata } from '../+state/customer.actions'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { selectCustomerVM } from '../+state/customer.selector'

@Component({
  selector: 'tsm-customer-crud',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tsm-customer-crud.component.html',
  styleUrls: ['./tsm-customer-crud.component.scss'],
})
export class TsmCustomerCrudComponent implements OnInit {
  store = inject(Store)
  id$ = new BehaviorSubject<string | null>(null)
  query$ = new BehaviorSubject<string | null>(null)

  private destroyRef = inject(DestroyRef)

  @Input() set id (id: string) { this.id$.next(id) }

  @Input() set query (query: string) { this.query$.next(query) }

  @Input() customerRemarks: string | undefined

  metadataLoaded$ = this.store.select(selectCustomerVM).pipe(map(vm => vm.metadataLoaded), filter(val => val === true))

  ngOnInit (): void {
    console.log('ID is received from router, no need for activated route anymore ', this.id$.value, this.customerRemarks)
    this.store.dispatch(loadCustomerMetadata())
    this.subscribeToIdChanges()
  }

  private subscribeToIdChanges () {
    combineLatest(
      [
        this.id$.pipe(filter(id => id !== null)),
        this.query$.pipe(filter(query => query !== null)),
        this.metadataLoaded$
      ])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([id, query, metdataLoaded]) => {
        this.store.dispatch(loadCustomer({ id: Number(id) }))
      })
  }

}
