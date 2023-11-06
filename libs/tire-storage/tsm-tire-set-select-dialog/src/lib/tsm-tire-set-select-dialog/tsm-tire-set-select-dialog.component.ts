import { Component, Inject, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { GenericModalComponent } from '@nx-shell/core'
import { MatButtonModule } from '@angular/material/button'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { MatDividerModule } from '@angular/material/divider'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatOptionModule } from '@angular/material/core'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSelectModule } from '@angular/material/select'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatRadioModule } from '@angular/material/radio'
import { TireSet } from '@nx-shell/tire-storage/tsm-services'
import { TireSetSelectDialogDataModel } from './tire-set-select-dialog-data.model'
import { TsmTireSetInfoUiComponent } from '@nx-shell/tire-storage/tsm-ui'

@Component({
  selector: 'tsm-tire-set-select-dialog',
  standalone: true,
  imports: [CommonModule, GenericModalComponent, MatButtonModule, MatButtonToggleModule, MatDialogModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatOptionModule, MatProgressSpinnerModule, MatSelectModule, ReactiveFormsModule, MatRadioModule, FormsModule, TsmTireSetInfoUiComponent],
  templateUrl: './tsm-tire-set-select-dialog.component.html',
  styleUrls: ['./tsm-tire-set-select-dialog.component.scss'],
})
export class TsmTireSetSelectDialogComponent {
  public readonly dialogRef = inject(MatDialogRef<TsmTireSetSelectDialogComponent>)
  selectedTireSet: TireSet | undefined
  tireSets: TireSet[] = []
  customerId: number | undefined

  constructor (@Inject(MAT_DIALOG_DATA) public data: TireSetSelectDialogDataModel) {
    this.tireSets = data.tireSets
    this.customerId = data.customerId
  }

  select () {

  }

}
