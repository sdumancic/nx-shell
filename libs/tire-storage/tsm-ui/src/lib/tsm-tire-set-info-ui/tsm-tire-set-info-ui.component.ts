import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TireSet } from '@nx-shell/tire-storage/tsm-services'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatRadioModule } from '@angular/material/radio'
import { MatCheckboxModule } from '@angular/material/checkbox'

@Component({
  selector: 'tsm-ui-tire-set-info-ui',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule, MatRadioModule, MatCheckboxModule],
  templateUrl: './tsm-tire-set-info-ui.component.html',
  styleUrls: ['./tsm-tire-set-info-ui.component.scss'],
})
export class TsmTireSetInfoUiComponent {
  @Input() tireSet: TireSet | undefined
  @Input() checked = false
  @Input() selectOptionVisible = true
  @Input() editEnabled = true
  @Input() deleteEnabled = false
  @Output() editTireSet = new EventEmitter<TireSet>()
  @Output() deleteTireSet = new EventEmitter<TireSet>()

  onClickEdit () {
    this.tireSet ? this.editTireSet.next(this.tireSet) : null
  }

  onClickDelete () {
    this.tireSet ? this.deleteTireSet.next(this.tireSet) : null
  }
}
