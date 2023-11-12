import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { TireSetWithPrices } from '@nx-shell/tire-storage/tsm-services'

@Component({
  selector: 'tsm-ui-tire-set-calculation-info-ui',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './tsm-tire-set-calculation-info-ui.component.html',
  styleUrls: ['./tsm-tire-set-calculation-info-ui.component.scss'],
})
export class TsmTireSetCalculationInfoUiComponent {
  @Input() tireSetWithPrices: TireSetWithPrices | null = null

  get tireSet () {
    return this.tireSetWithPrices?.tireSet ? this.tireSetWithPrices?.tireSet : null
  }

  get numOfTires () {
    return this.tireSetWithPrices?.tireSet ? this.tireSetWithPrices?.tireSet.tires.length : null
  }

  get tireSetPrice () {
    return this.tireSetWithPrices?.tireSet ? this.tireSetWithPrices?.tireSetPrice : null
  }

  get tirePrice () {
    return this.tireSetWithPrices?.tireSet ? this.tireSetWithPrices?.tirePrice : null
  }
}
