import { Component, EventEmitter, Input, Output } from '@angular/core'

import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatOptionModule } from '@angular/material/core'
import { MatRadioModule } from '@angular/material/radio'
import { MatSelectModule } from '@angular/material/select'
import { MatInputModule } from '@angular/material/input'
import { Customer } from '@nx-shell/tire-storage/tsm-services'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'tsm-ui-customer-info',
  templateUrl: './tsm-customer-info-ui.component.html',
  styleUrls: ['./tsm-customer-info-ui.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatOptionModule, MatRadioModule, MatSelectModule, MatInputModule, MatButtonModule, MatIconModule],
  standalone: true
})
export class TsmCustomerInfoUiComponent {
  @Input() customer: Customer | null = null
  @Input() editEnabled = true
  @Output() selectedCustomer = new EventEmitter<Customer>()
  @Output() editedCustomer = new EventEmitter<Customer>()

  onCustomerSelect (customer: Customer | null) {
    if (customer) {
      this.selectedCustomer.emit(customer)
    }
  }

  onEditCustomer (event: MouseEvent, customer: Customer | null) {
    event.stopPropagation()
    if (customer) {
      this.editedCustomer.emit(customer)
    }
  }
}
