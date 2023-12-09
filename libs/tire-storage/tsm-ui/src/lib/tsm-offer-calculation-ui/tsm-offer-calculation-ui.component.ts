import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatIconModule } from '@angular/material/icon'
import { MatRadioModule } from '@angular/material/radio'
import { intervalToDuration } from 'date-fns'
import { TireSetWithPrices } from '@nx-shell/tire-storage/tsm-services'
import {
  TsmTireSetCalculationInfoUiComponent
} from '../tsm-tire-set-calculation-info-ui/tsm-tire-set-calculation-info-ui.component'

@Component({
  selector: 'tsm-ui-offer-calculation-ui',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatIconModule, MatRadioModule, TsmTireSetCalculationInfoUiComponent],
  templateUrl: './tsm-offer-calculation-ui.component.html',
  styleUrls: ['./tsm-offer-calculation-ui.component.scss'],
})
export class TsmOfferCalculationUiComponent {
  @Input() selectedTireSetsWithPrices: TireSetWithPrices[] | null = null
  @Input() startDate: Date | null = null
  @Input() endDate: Date | null = null
  @Input() offerTotalPrice: number | null = null

  get selectedTireSetsWithPricesNotNull () {
    return this.selectedTireSetsWithPrices ? this.selectedTireSetsWithPrices : []
  }

  get duration () {
    if (!this.startDate || !this.endDate) {
      return undefined
    }
    return intervalToDuration({ start: this.startDate, end: this.endDate })
  }

}
