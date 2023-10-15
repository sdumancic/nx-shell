import { Component, inject, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { userAuthActions } from '@nx-shell/users/user-auth'
import { Store } from '@ngrx/store'

@Component({
  selector: 'nx-shell-user-logout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-logout.component.html',
  styleUrls: ['./user-logout.component.scss'],
})
export class UserLogoutComponent implements OnInit {
  private store = inject(Store)

  ngOnInit (): void {
    this.store.dispatch(userAuthActions.logoutUser())
  }
}
