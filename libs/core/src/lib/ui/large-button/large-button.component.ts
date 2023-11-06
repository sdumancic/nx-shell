import { Component, Input } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'core-ui-large-button',
  templateUrl: './large-button.component.html',
  styleUrls: ['./large-button.component.scss'],
  imports: [
    MatIconModule, CommonModule
  ],
  standalone: true
})
export class LargeButtonComponent {
  @Input() isLoading: boolean | undefined
  @Input() buttonType: 'dashed' | 'flat' = 'dashed'
  @Input() title: string | undefined
  @Input() subtitle: string | undefined
  @Input() svgIcon: string | undefined

}
