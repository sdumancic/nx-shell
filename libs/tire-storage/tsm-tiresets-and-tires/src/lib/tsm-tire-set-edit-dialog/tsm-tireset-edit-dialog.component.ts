import { Component, Inject, inject, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TireSet, TireSetMetadataService, TireSetService } from '@nx-shell/tire-storage/tsm-services'
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { GenericModalComponent } from '@nx-shell/core'
import { MatButtonModule } from '@angular/material/button'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatDividerModule } from '@angular/material/divider'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatOptionModule } from '@angular/material/core'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSelectModule } from '@angular/material/select'
import { MatCardModule } from '@angular/material/card'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { TsmTireDetailsComponent } from '@nx-shell/tire-storage/tsm-ui'
import { Observable, take } from 'rxjs'
import { TireSetEditForm } from './form/tireset-edit-form.service'
import { TiresEditDialogDataModel } from './tires-edit-dialog-data.model'

@Component({
  selector: 'tsm-tireset-edit-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, GenericModalComponent, MatButtonModule, MatButtonToggleModule, MatDialogModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatOptionModule, MatProgressSpinnerModule, MatSelectModule, ReactiveFormsModule, MatCardModule, MatCheckboxModule, TsmTireDetailsComponent],
  templateUrl: './tsm-tireset-edit-dialog.component.html',
  styleUrls: ['./tsm-tireset-edit-dialog.component.scss'],
  providers: [TireSetEditForm]
})
export class TsmTireSetEditDialogComponent implements OnInit {

  private readonly tireSetMetadataService = inject(TireSetMetadataService)
  private readonly tireSetService = inject(TireSetService)
  private readonly formService = inject(TireSetEditForm)
  public readonly dialogRef = inject(MatDialogRef<TsmTireSetEditDialogComponent>)

  seasons: string[] = []
  brands: string[] = []
  widths: number[] = []
  heights: number[] = []
  sizes: number[] = []
  loadIndexes: number[] = []
  speedIndexes: string[] = []
  loading = false

  constructor (@Inject(MAT_DIALOG_DATA) public data: TiresEditDialogDataModel) {}

  get tireSetForm () {
    return this.formService.tireSetForm
  }

  get tires () {
    return this.formService.tires
  }

  ngOnInit (): void {
    this.tireSetMetadataService.getTireSetMetadata$().pipe(take(1)).subscribe(metadata => {
      this.seasons = metadata.tireTypes
      this.brands = metadata.tireBrands
      this.widths = metadata.tireWidths
      this.heights = metadata.tireHeights
      this.sizes = metadata.tireSizes
      this.loadIndexes = metadata.loadIndex
      this.speedIndexes = metadata.speedIndex
    })
    this.formService.setCustomerId(this.data.customerId)
    if (this.data.tireSet) {
      this.formService.setFormGroupFromTireSet(this.data.tireSet)
      this.tireSetForm.markAsPristine()
      this.tireSetForm.markAsUntouched()
    }

  }

  onSave () {
    const tireset: TireSet = this.formService.tireSetForm.getRawValue()
    let ob$: Observable<TireSet>
    if (!tireset.id) {
      ob$ = this.tireSetService.createTireSet$(tireset)
    } else {
      ob$ = this.tireSetService.updateTireSet$(tireset.id, tireset)
    }
    ob$.pipe(take(1)).subscribe((tireSet) => this.dialogRef.close(tireSet))
  }

  public isDirty () {
    return this.formService.isDirty()
  }

  onTireValueChanged (event: any, tire: AbstractControl<any>) {
    this.tireSetForm.markAsDirty()
    this.tireSetForm.markAsTouched()
    tire.patchValue(event)

  }
}
