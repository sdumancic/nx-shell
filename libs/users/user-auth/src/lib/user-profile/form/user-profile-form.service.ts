import { inject, Injectable } from '@angular/core'
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import hash from 'hash-it'
import { UserUi } from './user-ui.model'

@Injectable()
export class UserProfileFormService {
  private fb = inject(FormBuilder)

  profileForm = new FormGroup({
    userId: new FormControl<number | null>(null, { validators: [Validators.required], nonNullable: true }),
    username: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
    name: new FormGroup({
      first: new FormControl('', { validators: [Validators.required], nonNullable: true }),
      last: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    }),
    ssn: new FormControl(''),
    dob: new FormControl<Date | null>(null),
    hiredOn: new FormControl<Date | null>(null),
    terminatedOn: new FormControl<Date | null>(null),
    email: new FormControl('', { validators: [Validators.email] }),
    officePhone: new FormControl<string>('', { nonNullable: false }),
    homePhone: new FormControl(''),
    mobilePhone: new FormControl(''),
    address: new FormGroup({
      street: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zip: new FormControl(''),
    }),
    gender: new FormControl(''),
    portrait: new FormControl(''),
    thumbnail: new FormControl(''),
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
