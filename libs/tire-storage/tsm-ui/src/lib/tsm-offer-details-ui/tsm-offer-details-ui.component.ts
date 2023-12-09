import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatIconModule } from '@angular/material/icon'
import { MatRadioModule } from '@angular/material/radio'
import { Offer } from '@nx-shell/tire-storage/tsm-services'
import { TsmCustomerInfoUiComponent } from '../tsm-customer-info-ui/tsm-customer-info-ui.component'
import {
  TsmTireSetCalculationInfoUiComponent
} from '../tsm-tire-set-calculation-info-ui/tsm-tire-set-calculation-info-ui.component'

@Component({
  selector: 'tsm-ui-offer-details',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatIconModule, MatRadioModule, TsmCustomerInfoUiComponent, TsmTireSetCalculationInfoUiComponent],
  templateUrl: './tsm-offer-details-ui.component.html',
  styleUrls: ['./tsm-offer-details-ui.component.scss'],
})
export class TsmOfferDetailsUiComponent {
  @Input() offer: Offer | null = null

  get customer () {
    return this.offer?.customer ? this.offer.customer : null
  }

  get tireSetsWithPrices () {
    return this.offer?.tireSets ? this.offer?.tireSets : []
  }

}
