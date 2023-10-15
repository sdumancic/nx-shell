import { Component, DestroyRef, inject, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { userAuthActions } from '../+state/user-auth.actions'
import { Store } from '@ngrx/store'
import { filter, map } from 'rxjs'
import { userAuthVm } from '../+state/user-auth.selector'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'

@Component({
  selector: 'nx-shell-user-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent implements OnInit {
  private readonly store = inject(Store)
  private _snackBar = inject(MatSnackBar)

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(3)])
  })

  loginError$ = this.store.select(userAuthVm)
    .pipe(
      map(vm => vm.loginError),
      filter(val => val !== null)
    )

  private destroyRef = inject(DestroyRef)

  ngOnInit () {
    this.loginError$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(val => {
      this._snackBar.open(val ? val : '', undefined, {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 2000
      })
    })
  }

  onSubmit () {
    const username = this.loginForm.get('username')?.value
    const password = this.loginForm.get('password')?.value
    if (username && password) {
      this.store.dispatch(userAuthActions.loginUser({
        username,
        password
      }))
    }
  }
}

