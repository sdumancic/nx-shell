import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import {
  TsmWarehouseContainerBoxUiComponent
} from '../tsm-warehouse-container-box-ui/tsm-warehouse-container-box-ui.component'
import { StoredTireSetModel } from '@nx-shell/tire-storage/tsm-domain'

@Component({
  selector: 'tsm-ui-warehouse-seat',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, TsmWarehouseContainerBoxUiComponent],
  templateUrl: './tsm-warehouse-seat-ui.component.html',
  styleUrls: ['./tsm-warehouse-seat-ui.component.scss'],
})
export class TsmWarehouseSeatUiComponent {
  @Input() row!: number
  @Input() col!: number
  @Input() level: number | undefined
  @Input() tireSetModel: StoredTireSetModel | undefined
  @Output() boxSelected = new EventEmitter<{ row: number, col: number, level: number }>()

  onBoxSelected (data: { row: number; col: number; level: number }) {
    this.boxSelected.emit(data)
  }
}
