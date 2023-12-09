import { Component, computed, effect, signal, WritableSignal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { MatTabsModule } from '@angular/material/tabs'
import { MatIconModule } from '@angular/material/icon'
import { ReactiveFormsModule } from '@angular/forms'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatOptionModule } from '@angular/material/core'
import { MatSelectModule } from '@angular/material/select'
import { RouterLinkActive } from '@angular/router'
import { TsmCustomersOverviewTableUiComponent, TsmOffersOverviewTableUiComponent } from '@nx-shell/tire-storage/tsm-ui'
import { MatInputModule } from '@angular/material/input'
import { MatListModule } from '@angular/material/list'
import { BehaviorSubject, map, of } from 'rxjs'

interface Product {
  name: string
  price: number
}

@Component({
  selector: 'tsm-signals-playground',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatTabsModule, MatIconModule, ReactiveFormsModule, MatExpansionModule,
    MatFormFieldModule, MatOptionModule, MatSelectModule, RouterLinkActive, TsmOffersOverviewTableUiComponent,
    MatInputModule, TsmCustomersOverviewTableUiComponent, MatListModule],
  templateUrl: './tsm-signals-playground.component.html',
  styleUrls: ['./tsm-signals-playground.component.scss'],
})
export class TsmSignalsPlaygroundComponent {
  warningVisible = signal(false)
  items: Product[] = [
    { name: 'Product A', price: 10 },
    { name: 'Product B', price: 15 },
    { name: 'Product C', price: 20 },
    { name: 'Product E', price: 25 },
    { name: 'Product F', price: 30 },
    { name: 'Product G', price: 35 },
  ]

  products = signal(this.items)
  cartItems: WritableSignal<Product[]> = signal([])

  contains (val: Product) {
    return this.cartItems().indexOf(val) > -1 ? true : false
  }

  totalPrice = computed(() => {
    return this.cartItems().reduce((acc, curr) => acc + curr.price, 0)
  })

  products$ = of(this.items)
  cartItems$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([])
  warningVisible$ = new BehaviorSubject(false)
  totalPrice$ = this.cartItems$.pipe(map(data => data.reduce((acc, curr) => acc + curr.price, 0)))

  constructor () {
    effect(() => {
      if (this.cartItems().length > 3) {
        this.warningVisible.set(true)
      } else {
        this.warningVisible.set(false)
      }
    }, { allowSignalWrites: true })

    this.cartItems$.pipe(map(val => {
      if (val.length > 3) {
        this.warningVisible$.next(true)
      } else {
        this.warningVisible$.next(false)
      }
    })).subscribe()
  }

  removeItem (item: Product) {
    this.cartItems.set(this.cartItems().filter((i) => i !== item))
  }

  removeItem2 (item: Product) {
    this.cartItems$.next([...this.cartItems$.value.filter((i) => i !== item)])
  }

  addToCart (item: Product) {
    this.cartItems.update((cart) => [...cart, item])
    this.cartItems$.next([...this.cartItems$.value, item])
  }

}
