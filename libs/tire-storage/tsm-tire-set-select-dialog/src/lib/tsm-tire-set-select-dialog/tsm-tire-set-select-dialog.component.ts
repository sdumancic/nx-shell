import { Component, Inject, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DialogService, GenericModalComponent, LargeButtonComponent } from '@nx-shell/core'
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
import { TsmTireSetEditDialogComponent } from '@nx-shell/tire-storage/tsm-tiresets-and-tires'
import { take } from 'rxjs'

@Component({
  selector: 'tsm-tire-set-select-dialog',
  standalone: true,
  imports: [CommonModule, GenericModalComponent, MatButtonModule, MatButtonToggleModule, MatDialogModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatOptionModule, MatProgressSpinnerModule, MatSelectModule, ReactiveFormsModule, MatRadioModule, FormsModule, TsmTireSetInfoUiComponent, LargeButtonComponent],
  templateUrl: './tsm-tire-set-select-dialog.component.html',
  styleUrls: ['./tsm-tire-set-select-dialog.component.scss'],
  providers: [DialogService]
})
export class TsmTireSetSelectDialogComponent {
  public readonly dialogRef = inject(MatDialogRef<TsmTireSetSelectDialogComponent>)
  public readonly dialogService = inject(DialogService)
  selectedTireSet: TireSet | undefined
  tireSets: TireSet[] = []
  alreadySelectedTireSets: TireSet[] = []
  customerId: number | undefined

  constructor (@Inject(MAT_DIALOG_DATA) public data: TireSetSelectDialogDataModel) {
    this.tireSets = data.tireSets
    this.customerId = data.customerId
    this.alreadySelectedTireSets = data.selectedTireSets
  }

  get deltaTireSets () {
    return this.tireSets.filter(x => this.alreadySelectedTireSets.findIndex(e => e.id === x.id) < 0)
  }

  onSelectTireSet () {
    this.dialogRef.close(this.selectedTireSet)
  }

  onAddTireSet () {
    const dialogRef: MatDialogRef<TsmTireSetEditDialogComponent, TireSet> = this.dialogService.openFullScreen(TsmTireSetEditDialogComponent, { data: { customerId: this.customerId, tireSet: null } })
    dialogRef.afterClosed().pipe(take(1)).subscribe(tireSet => {
      if (tireSet) {
        const newTireSets = [tireSet, ...this.tireSets]
        this.tireSets = newTireSets
        this.selectedTireSet = tireSet
      }
    })
  }

  onEditTireSet (tireSet: TireSet) {
    const dialogRef: MatDialogRef<TsmTireSetEditDialogComponent, TireSet> = this.dialogService.openFullScreen(TsmTireSetEditDialogComponent, { data: { customerId: this.customerId, tireSet: tireSet } })
    dialogRef.afterClosed().pipe(take(1)).subscribe(tireSet => {
      if (tireSet) {
        const index = this.tireSets.findIndex(tireset => tireset.id === tireset.id)
        const updatedTireSets = [...this.tireSets].splice(index, 1, tireSet)
        this.tireSets = updatedTireSets
      }
    })
  }
}
