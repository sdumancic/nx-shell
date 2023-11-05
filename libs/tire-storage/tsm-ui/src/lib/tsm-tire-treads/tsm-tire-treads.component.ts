import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'tsm-ui-tire-treads',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tsm-tire-treads.component.html',
  styleUrls: ['./tsm-tire-treads.component.scss'],
})
export class TsmTireTreadsComponent {

  @Input() treadDepth1: string | null = null
  @Input() treadDepth2: string | null = null
  @Input() treadDepth3: string | null = null
  @Input() treadDepth4: string | null = null
  @Input() treadColor1: string | null = null
  @Input() treadColor2: string | null = null
  @Input() treadColor3: string | null = null
  @Input() treadColor4: string | null = null

}
