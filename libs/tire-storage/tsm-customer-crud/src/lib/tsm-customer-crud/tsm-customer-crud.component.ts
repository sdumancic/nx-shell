import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BehaviorSubject, combineLatest, filter } from 'rxjs'
import { Store } from '@ngrx/store'
import { loadCustomer } from '../+state/customer.actions'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

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

  ngOnInit (): void {
    console.log('ID is received from router, no need for activated route anymore ', this.id$.value, this.customerRemarks)
    this.subscribeToIdChanges()
  }

  private subscribeToIdChanges () {
    combineLatest(
      [this.id$.pipe(filter(id => id !== null)),
        this.query$.pipe(filter(query => query !== null))
      ])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([id, query]) => {
        //this.store.dispatch(setCustomerLoading())
        this.store.dispatch(loadCustomer({ id: Number(id) }))
      })
  }

}
