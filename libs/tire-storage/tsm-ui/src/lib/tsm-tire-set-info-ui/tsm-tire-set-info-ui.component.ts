import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TireSet } from '@nx-shell/tire-storage/tsm-services'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'tsm-ui-tire-set-info-ui',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './tsm-tire-set-info-ui.component.html',
  styleUrls: ['./tsm-tire-set-info-ui.component.scss'],
})
export class TsmTireSetInfoUiComponent {
  @Input() tireSet: TireSet | undefined
}
