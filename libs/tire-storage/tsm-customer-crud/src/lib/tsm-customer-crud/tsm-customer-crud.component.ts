import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BehaviorSubject, distinctUntilChanged, filter, map, withLatestFrom } from 'rxjs'
import { Store } from '@ngrx/store'
import { customerActions } from '../+state/customer.actions'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { selectCustomerVM } from '../+state/customer.selector'
import { Customer } from '@nx-shell/tire-storage/tsm-services'
import { TsmAddressUiComponent } from '@nx-shell/tire-storage/tsm-ui'

@Component({
  selector: 'tsm-customer-crud',
  standalone: true,
  imports: [CommonModule, TsmAddressUiComponent],
  templateUrl: './tsm-customer-crud.component.html',
  styleUrls: ['./tsm-customer-crud.component.scss'],
})
export class TsmCustomerCrudComponent implements OnInit {

  store = inject(Store)
  id$ = new BehaviorSubject<string | null>(null)
  query$ = new BehaviorSubject<string | null>(null)
  fetchCustomer$ = new BehaviorSubject<string | null>(null)

  private destroyRef = inject(DestroyRef)

  @Input() set id (id: string) {
    this.id$.next(id)
  }

  @Input() set query (query: string) { this.query$.next(query) }

  @Input() customerRemarks: string | undefined

  metadataLoaded$ = this.store.select(selectCustomerVM).pipe(map(vm => vm.metadataLoaded), filter(val => val === true))

  ngOnInit (): void {
    console.log('ID is received from router, no need for activated route anymore ', this.id$.value, this.customerRemarks)
    this.subscribeToIdChanges()
    this.store.dispatch(customerActions.fetchCustomerMetadata())

    this.fetchCustomer$.pipe(filter(val => val !== null), distinctUntilChanged())
      .subscribe(val => this.store.dispatch(customerActions.fetchCustomer({ id: Number(val) })))

  }

  private createCustomer () {
    const customer: Customer = {
      firstName: 'Test',
      lastName: 'Test',
      gender: 'male',
      address: {
        street: 'Test street',
        city: 'Test city',
        state: 'Oregon',
        zip: '12345'
      },
      phoneNumber: '123-456-789',
      email: 'sasa@asdas.asd'
    }
    this.store.dispatch(customerActions.createCustomer({ customer }))
  }

  private subscribeToIdChanges () {
    this.metadataLoaded$.pipe(
      withLatestFrom(this.id$.pipe(filter(id => id !== null))),
      takeUntilDestroyed(this.destroyRef))
      .subscribe(([metadataLoaded, id]) => {
        this.fetchCustomer$.next(id)
      })

  }

}
