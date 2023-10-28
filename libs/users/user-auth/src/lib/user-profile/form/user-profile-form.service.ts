import { Injectable } from '@angular/core'
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms'
import hash from 'hash-it'
import { AddressUi, UserUi } from './user-ui.model'

@Injectable()
export class UserProfileFormService {
  profileForm = new FormGroup({
    userId: new FormControl<number | null>(null, { validators: [Validators.required], nonNullable: true }),
    username: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
    name: new FormGroup({
      first: new FormControl('', { validators: [Validators.required], nonNullable: true }),
      last: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    }),
    ssn: new FormControl<string | null>(''),
    dob: new FormControl<Date | null>(null),
    hiredOn: new FormControl<Date | null>(null),
    terminatedOn: new FormControl<Date | null>(null),
    email: new FormControl<string | null>('', { validators: [Validators.email] }),
    officePhone: new FormControl<string | null>('',),
    homePhone: new FormControl<string | null>(''),
    mobilePhone: new FormControl<string | null>(''),
    address: new FormArray([new FormGroup({
      type: new FormControl<string | null>(null),
      street: new FormControl<string | null>(null),
      city: new FormControl<string | null>(null),
      state: new FormControl<string | null>(null),
      zip: new FormControl<string | null>(null),
    })]),
    gender: new FormControl<string | null>(null),
    portrait: new FormControl<string | null>(null),
    thumbnail: new FormControl<string | null>(null),
    roles: new FormArray<AbstractControl<string>>([])
  })

  get form () {
    return this.profileForm
  }

  get formValue (): UserUi {
    return this.profileForm.getRawValue() as UserUi
  }

  get hashValue () {
    return (hash(this.profileForm.getRawValue()))
  }

  addRoleToArray (role: string) {
    const roles = this.profileForm.get('roles') as FormArray
    if (!roles.value.includes(role)) {
      roles.push(new FormControl<string>(role))
    }
  }

  setRolesFormArray (roles: string[]) {
    const rolesFormArray = this.profileForm.get('roles') as FormArray
    roles.forEach(r => rolesFormArray.push(new FormControl<string>(r)))
  }

  setAddressFormArray (address: AddressUi[]) {
    const addressFormArray = this.profileForm.get('address') as FormArray
    addressFormArray.clear()
    address?.forEach(add => addressFormArray.push(new FormGroup({
      type: new FormControl(add.type),
      street: new FormControl(add.street),
      city: new FormControl(add.city),
      state: new FormControl(add.state),
      zip: new FormControl(add.zip)
    })))
    if (!address) {
      addressFormArray.push(new FormGroup({
        type: new FormControl('Home'),
        street: new FormControl(null),
        city: new FormControl(null),
        state: new FormControl(null),
        zip: new FormControl(null)
      }))
      addressFormArray.push(new FormGroup({
        type: new FormControl('Office'),
        street: new FormControl(null),
        city: new FormControl(null),
        state: new FormControl(null),
        zip: new FormControl(null)
      }))
    }
  }

  removeRoleFromArray (role: string) {
    const roles: FormArray<AbstractControl<string>> = (this.profileForm.get('roles') as FormArray)
    if (roles.value.includes(role)) {
      const ind = roles.value.findIndex(r => r === role)
      if (ind > -1) {
        roles.removeAt(ind)
      }
    }
  }

}
