import { Component, EventEmitter, Input, Output } from '@angular/core'

import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatOptionModule } from '@angular/material/core'
import { MatRadioModule } from '@angular/material/radio'
import { MatSelectModule } from '@angular/material/select'
import { MatInputModule } from '@angular/material/input'
import { TireSetStorage } from '@nx-shell/tire-storage/tsm-services'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'tsm-ui-warehouse-location-info',
  templateUrl: './tsm-warehouse-location-info-ui.component.html',
  styleUrls: ['./tsm-warehouse-location-info-ui.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatOptionModule, MatRadioModule, MatSelectModule, MatInputModule, MatButtonModule, MatIconModule],
  standalone: true
})
export class TsmWarehouseLocationInfoUiComponent {
  @Input() newTireSetStorage: TireSetStorage[] = []
  @Output() deleteStorage = new EventEmitter<string>()

  tireDescription (tsStorage: TireSetStorage) {
    const { tireSet } = tsStorage
    return tireSet.brand + ' ' + tireSet.width + '/' + tireSet.height + '/' + tireSet.size + ' ' + tireSet.loadIndex + ' ' + tireSet.speedIndex
  }

  section (tsStorage: TireSetStorage) {
    const { locationId } = tsStorage
    const parts = locationId.split(':')
    return parts[0]
  }

  subsection (tsStorage: TireSetStorage) {
    const { locationId } = tsStorage
    const parts = locationId.split(':')
    return parts[1]
  }

  row (tsStorage: TireSetStorage) {
    const { locationId } = tsStorage
    const parts = locationId.split(':')
    return Number(parts[2]) + 1
  }

  col (tsStorage: TireSetStorage) {
    const { locationId } = tsStorage
    const parts = locationId.split(':')
    return Number(parts[3]) + 1
  }

}
