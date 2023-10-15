import { Component, inject, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Store } from '@ngrx/store'
import { selectBookListPageViewModel } from '../+state/customers.selector'
import { map } from 'rxjs/operators'
import { loadCustomers } from '../+state/customers.actions'
import { userAuthVm } from '@nx-shell/users/user-auth'

@Component({
  selector: 'tsm-customer-overview-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tsm-customer-overview-home.component.html',
  styleUrls: ['./tsm-customer-overview-home.component.scss'],
})
export class TsmCustomerOverviewHomeComponent implements OnInit {
  private readonly store = inject(Store)
  customers$ = this.store.select(selectBookListPageViewModel).pipe(map(val => val.genders))
  loggedInUser$ = this.store.select(userAuthVm).pipe(map(vm => vm.loggedInUser ? vm.loggedInUser.username : null))

  ngOnInit () {
    this.store.dispatch(loadCustomers())
    this.customers$.subscribe(val => console.log(val))
  }
}
