import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatButtonModule } from '@angular/material/button'
import { MatSelectModule } from '@angular/material/select'
import { MatFormFieldModule } from '@angular/material/form-field'

@Component({
  selector: 'nx-shell-users-user-auth',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './users-user-auth.component.html',
  styleUrls: ['./users-user-auth.component.scss'],
})
export class UsersUserAuthComponent {}
