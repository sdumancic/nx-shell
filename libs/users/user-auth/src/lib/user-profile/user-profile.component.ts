import { Component, DestroyRef, inject, OnInit, Signal, ViewEncapsulation } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatMenuModule } from '@angular/material/menu'
import { Store } from '@ngrx/store'
import { selectLoggedInUser } from '../+state/user-auth.selector'
import { User } from '@nx-shell/users/user-services'
import { UserProfileFormService } from './form/user-profile-form.service'
import { UserProfileMapper } from './mapper/user-profile.mapper'
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop'
import { FormArray, ReactiveFormsModule } from '@angular/forms'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MAT_DATE_FORMATS, MatOptionModule } from '@angular/material/core'
import { MatRadioModule } from '@angular/material/radio'
import { MatSelectModule } from '@angular/material/select'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatDateFnsModule } from '@angular/material-date-fns-adapter'
import { MatDividerModule } from '@angular/material/divider'
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips'
import { MatIconModule } from '@angular/material/icon'
import { LiveAnnouncer } from '@angular/cdk/a11y'
import { COMMA, ENTER } from '@angular/cdk/keycodes'
import { MatButtonModule } from '@angular/material/button'
import { userAuthActions } from '../+state/user-auth.actions'
import { UserUi } from './form/user-ui.model'
import { MatTabsModule } from '@angular/material/tabs'

const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'dd.MM.yyyy',
  },
  display: {
    dateInput: 'dd.MM.yyyy',
    monthYearLabel: 'MMMM yyyy',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM yyyy'
  }
}

@Component({
  selector: 'user-auth-profile',
  standalone: true,
  imports: [CommonModule, MatMenuModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatRadioModule, MatSelectModule,
    MatDatepickerModule, MatDateFnsModule, MatDividerModule, MatChipsModule, MatIconModule, MatButtonModule, MatTabsModule],
  providers: [UserProfileFormService,
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT }
  ],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserProfileComponent implements OnInit {
  private readonly store = inject(Store)
  private readonly formService = inject(UserProfileFormService)
  private readonly destroyRef = inject(DestroyRef)
  private readonly announcer = inject(LiveAnnouncer)

  user: Signal<{ user: User | null }> = this.store.selectSignal(selectLoggedInUser)
  user$ = toObservable(this.user)

  addOnBlur = true
  readonly separatorKeysCodes = [ENTER, COMMA] as const

  get form () {
    return this.formService.form
  }

  get profileFormValue (): UserUi {
    return this.formService.formValue
  }

  get roles () {
    return this.formService.form.get('roles') as FormArray
  }

  get addressFormArray () {
    return this.formService.form.get('address') as FormArray
  }

  ngOnInit (): void {
    this.user$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(loggedInUser => this.fillFormGroupWithLoggedInUser(loggedInUser.user))
  }

  private fillFormGroupWithLoggedInUser (loggedUser: User | null) {
    if (loggedUser) {
      this.formService.profileForm.patchValue(UserProfileMapper.fromUserToUserUi(loggedUser))
      this.formService.setRolesFormArray(loggedUser.roles)
      this.formService.setAddressFormArray(loggedUser.address)
    }
  }

  onSubmit () {
    if (this.profileFormValue.userId != null) {
      const userId = this.profileFormValue.userId
      const user: Partial<User> = UserProfileMapper.fromUserUiToUser(this.profileFormValue)
      this.store.dispatch(userAuthActions.updateUser({
        id: userId,
        user: user
      }))
    }

  }

  removeRole (role: string) {
    this.formService.removeRoleFromArray(role)
    this.announcer.announce(`Removed ${role}`)
  }

  addRole (event: MatChipInputEvent): void {
    const value = (event.value || '').trim()
    if (value) {
      this.formService.addRoleToArray(value)
    }
    // Clear the input value
    event.chipInput!.clear()
  }

  isDirty () {
    return this.formService.form.dirty && this.formService.form.touched
  }

}
