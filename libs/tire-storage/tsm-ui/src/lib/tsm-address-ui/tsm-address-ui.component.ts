import { Component, inject, Input } from '@angular/core'

import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatOptionModule } from '@angular/material/core'
import { MatRadioModule } from '@angular/material/radio'
import { MatSelectModule } from '@angular/material/select'
import { MatInputModule } from '@angular/material/input'
import { State } from '@nx-shell/tire-storage/tsm-services'

@Component({
  selector: 'tsm-ui-tsm-address-ui',
  templateUrl: './tsm-address-ui.component.html',
  styleUrls: ['./tsm-address-ui.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatOptionModule, MatRadioModule, MatSelectModule, MatInputModule],
  standalone: true
})
export class TsmAddressUiComponent {
  @Input() states: State[] = []
  private fb = inject(FormBuilder)
  addressForm = this.fb.group({
    company: null,
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    address: [null, Validators.required],
    address2: null,
    city: [null, Validators.required],
    state: [null, Validators.required],
    postalCode: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    ],
    shipping: ['free', Validators.required]
  })

  hasUnitNumber = false

  onSubmit (): void {
    alert('Thanks!')
  }
}
