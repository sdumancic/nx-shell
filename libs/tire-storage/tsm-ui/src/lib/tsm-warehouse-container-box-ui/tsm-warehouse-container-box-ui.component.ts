import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip'
import { StoredTireSetModel } from '@nx-shell/tire-storage/tsm-domain'
import { DragDropModule } from '@angular/cdk/drag-drop'

@Component({
  selector: 'tsm-ui-warehouse-container-box',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatTooltipModule, DragDropModule],
  templateUrl: './tsm-warehouse-container-box-ui.component.html',
  styleUrls: ['./tsm-warehouse-container-box-ui.component.scss'],
})
export class TsmWarehouseContainerBoxUiComponent {
  @Input() row!: number
  @Input() col!: number
  @Input() level!: number
  @Input() offerId: number | undefined
  @Input() tireSetModel: StoredTireSetModel | undefined
  @Output() boxSelected = new EventEmitter<{ row: number, col: number, level: number }>()

  tooltip () {

    const tireset = this.tireSetModel ? this.tireSetModel : null
    if (!tireset) {
      return ''
    }
    return tireset.tireSetBrand + ' ' + tireset.tireSetSeason + ' ' + tireset.tireSetWidth + ',' + tireset.tireSetHeight + ',' + tireset.tireSetSize
  }

  onSelected () {
    this.boxSelected.emit({ row: this.row, col: this.col, level: this.level })
  }
}
