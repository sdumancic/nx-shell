import { Component, Inject, inject, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { TsmCustomerInfoUiComponent } from '@nx-shell/tire-storage/tsm-ui'
import { MatCardModule } from '@angular/material/card'
import { MatChipsModule } from '@angular/material/chips'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatDividerModule } from '@angular/material/divider'
import { MatRadioModule } from '@angular/material/radio'
import { MatTabsModule } from '@angular/material/tabs'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { Customer, CustomersMetadataService, CustomersService, State } from '@nx-shell/tire-storage/tsm-services'
import { CustomerMapper } from '../mapper/customer.mapper'
import { MatOptionModule } from '@angular/material/core'
import { MatSelectModule } from '@angular/material/select'
import { lastValueFrom } from 'rxjs'
import { CustomerEditDialogDataModel } from '@nx-shell/tire-storage/tsm-domain'
import { GenericModalComponent } from '@nx-shell/core'

@Component({
  selector: 'tsm-tsm-customer-edit-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, TsmCustomerInfoUiComponent, MatCardModule, MatChipsModule, MatDatepickerModule, MatDividerModule, MatRadioModule, MatTabsModule, ReactiveFormsModule, MatButtonToggleModule, MatOptionModule, MatSelectModule, GenericModalComponent],
  templateUrl: './tsm-customer-edit-dialog.component.html',
  styleUrls: ['./tsm-customer-edit-dialog.component.scss'],

})
export class TsmCustomerEditDialogComponent implements OnInit {

  private readonly customerService = inject(CustomersService)
  private readonly metadataService = inject(CustomersMetadataService)
  public readonly dialogRef = inject(MatDialogRef<TsmCustomerEditDialogComponent>)

  loading = false
  states: State[] = []
  customerForm = new FormGroup({
    id: new FormControl<number | null>(null),
    firstName: new FormControl('', { validators: [Validators.required] }),
    lastName: new FormControl('', { validators: [Validators.required] }),
    gender: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
    address: new FormGroup({
      street: new FormControl<string | null>(''),
      city: new FormControl<string | null>(''),
      state: new FormControl<string | null>(''),
      zip: new FormControl<string | null>('')
    })
  })

  constructor (@Inject(MAT_DIALOG_DATA) public data: CustomerEditDialogDataModel) {
  }

  async ngOnInit () {
    this.loading = true
    const metadata = await lastValueFrom(this.metadataService.getCustomerMetadata$())
    this.states = metadata ? metadata.states : []
    if (this.data.id) {
      const customer = await lastValueFrom(this.customerService.getCustomer$(this.data.id))
      this.fillFormWithCustomerData(customer)
    }
    this.loading = false
  }

  isDirty () {
    return this.customerForm.dirty && this.customerForm.touched
  }

  onSave () {
    if (this.data.id) {
      this.customerService.updateCustomer$(this.data.id, CustomerMapper.fromCustomerFormToCustomer(this.customerForm.getRawValue())).subscribe(customer => {
        this.dialogRef.close(customer)
      })
    } else {
      this.customerService.createCustomer$(CustomerMapper.fromCustomerFormToCustomer(this.customerForm.getRawValue())).subscribe(customer => {
        this.dialogRef.close(customer)
      })
    }
  }

  private fillFormWithCustomerData (customer: Customer) {
    this.customerForm.patchValue({
      id: customer.id,
      firstName: customer.firstName,
      lastName: customer.lastName,
      gender: customer.gender,
      email: customer.email,
      phoneNumber: customer.phoneNumber,
      address: {
        street: customer.address ? customer.address.street : null,
        city: customer.address ? customer.address.city : null,
        state: customer.address ? customer.address.state : null,
        zip: customer.address ? customer.address.zip : null,
      }
    })
  }
}
