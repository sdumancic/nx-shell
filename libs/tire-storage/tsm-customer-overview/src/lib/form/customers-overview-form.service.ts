import { Injectable } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'

@Injectable()
export class CustomersOverviewFormService {

  private filterForm = new FormGroup({
    firstName: new FormControl<string | null>('',),
    lastName: new FormControl<string | null>('',),
    gender: new FormControl<string | null>('',),
    street: new FormControl<string | null>('',),
    city: new FormControl<string | null>('',),
    state: new FormControl<string | null>('',),
    zip: new FormControl<string | null>('',),
    phoneNumber: new FormControl<string | null>('',),
    email: new FormControl<string | null>('',)
  })

  get formGroup () {
    return this.filterForm
  }

  clear () {
    this.filterForm.reset()
  }
}
