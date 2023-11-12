import { Component, inject, Inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MAT_SNACK_BAR_DATA, MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar'
import { Message, MessageData } from '../../service/message-bus.service'

@Component({
  selector: 'core-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  providers: [MatSnackBar]
})
export class NotificationComponent {
  snackBarRef = inject(MatSnackBarRef)
  data: MessageData | undefined

  constructor (@Inject(MAT_SNACK_BAR_DATA) public message: Message) {
    if (message.data) {
      this.data = message.data
    }

    console.log(message.data)
  }
}
