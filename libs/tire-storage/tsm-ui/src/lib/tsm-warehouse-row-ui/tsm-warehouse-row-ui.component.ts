import { Component, EventEmitter, Input, Output, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { TsmWarehouseSeatUiComponent } from '../tsm-warehouse-seat-ui/tsm-warehouse-seat-ui.component'
import { StoredTireSetModel } from '@nx-shell/tire-storage/tsm-domain'

@Component({
  selector: 'tsm-ui-warehouse-row',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, TsmWarehouseSeatUiComponent],
  templateUrl: './tsm-warehouse-row-ui.component.html',
  styleUrls: ['./tsm-warehouse-row-ui.component.scss'],
})
export class TsmWarehouseRowUiComponent {

  @Input() row!: number
  @Input() tireSetModel: StoredTireSetModel | undefined
  @Output() boxSelected = new EventEmitter<{ row: number, col: number, level: number }>()

  cols = signal([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  level = signal([1, 2, 3])

  onBoxSelected (data: { row: number; col: number; level: number }) {
    this.boxSelected.next(data)
  }
}
