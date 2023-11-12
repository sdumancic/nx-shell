import { Component, inject, OnDestroy, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Subscription } from 'rxjs'
import { MessageAction, MessageBusService, MessageData } from '../../service/message-bus.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { NotificationComponent } from '../notification/notification.component'

@Component({
  selector: 'core-notifications-observer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications-observer.component.html',
  styleUrls: ['./notifications-observer.component.scss'],
})
export class NotificationsObserverComponent implements OnInit, OnDestroy {
  private messageBus = inject(MessageBusService)
  private snackBar = inject(MatSnackBar)
  private subscriptions: Subscription[] | undefined

  durationInSeconds = 5

  ngOnInit (): void {
    this.subscriptions = [
      this.messageBus.observe(MessageAction.ERROR)
        .subscribe((data: MessageData) => this.openSnackBar(data))
    ]
  }

  openSnackBar (data?: MessageData) {
    const snackBar = this.snackBar.openFromComponent(NotificationComponent, {
      duration: this.durationInSeconds * 1000,
      data: data
    })
  }

  ngOnDestroy (): void {
    this.subscriptions?.forEach(s => s.unsubscribe())
  }
}
