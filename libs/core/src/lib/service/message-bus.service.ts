import { Injectable } from '@angular/core'
import { filter, Observable, Subject } from 'rxjs'

export enum MessageAction {
  INFO = 'Info',
  WARNING = 'Warning',
  ERROR = 'Error'
}

export interface Message {
  type: MessageAction;
  data?: MessageData
}

export interface MessageData {
  name?: string
  message: string,
  url?: string,

}

@Injectable({ providedIn: 'root' })
export class MessageBusService {
  private messages$: Subject<Message> = new Subject<Message>()

  observe = (type: string): Observable<any> => this.messages$.pipe(filter(msg => msg.type === type))

  push = (message: Message) => this.messages$.next(message)
}
