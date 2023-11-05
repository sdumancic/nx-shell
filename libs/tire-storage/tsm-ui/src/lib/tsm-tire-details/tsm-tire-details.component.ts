import { Component, DestroyRef, EventEmitter, inject, Input, OnInit, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TireSetMetadataService, TreadDepth } from '@nx-shell/tire-storage/tsm-services'
import { TsmTireTreadsComponent } from '../tsm-tire-treads/tsm-tire-treads.component'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { take } from 'rxjs'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { StringUtils } from '@nx-shell/tire-storage/tsm-util'
import { TireDetails } from '@nx-shell/tire-storage/tsm-domain'

@Component({
  selector: 'tsm-ui-tire-details',
  standalone: true,
  imports: [CommonModule, TsmTireTreadsComponent, MatButtonToggleModule, MatFormFieldModule, MatSelectModule, MatCheckboxModule, ReactiveFormsModule],
  templateUrl: './tsm-tire-details.component.html',
  styleUrls: ['./tsm-tire-details.component.scss'],
})
export class TsmTireDetailsComponent implements OnInit {
  private readonly tireSetMetadataService = inject(TireSetMetadataService)
  tireFormGroup = new FormGroup({
    id: new FormControl<string | null>(null),
    treadDepth1: new FormControl<string | null>(null),
    treadDepth2: new FormControl<string | null>(null),
    treadDepth3: new FormControl<string | null>(null),
    treadDepth4: new FormControl<string | null>(null),
    tireDamaged: new FormControl<boolean | null>(null),
    rimDamaged: new FormControl<boolean | null>(null),
    tireLocation: new FormControl<string | null>(null),
  })
  @Input() tire: TireDetails | undefined
  @Output() valueChanged = new EventEmitter<TireDetails>()

  treadDepths: TreadDepth[] = []

  treadColor1: string | null = null
  treadColor2: string | null = null
  treadColor3: string | null = null
  treadColor4: string | null = null

  private destroyRef = inject(DestroyRef)

  get treadDepth1 () {
    return StringUtils.toStringOrNull(this.tireFormGroup.get('treadDepth1')?.value)
  }

  get treadDepth2 () {
    return StringUtils.toStringOrNull(this.tireFormGroup.get('treadDepth2')?.value)
  }

  get treadDepth3 () {
    return StringUtils.toStringOrNull(this.tireFormGroup.get('treadDepth3')?.value)
  }

  get treadDepth4 () {
    return StringUtils.toStringOrNull(this.tireFormGroup.get('treadDepth4')?.value)
  }

  get tireLocation () {
    return StringUtils.toStringOrNull(this.tireFormGroup.get('tireLocation')?.value)
  }

  ngOnInit (): void {

    this.tireSetMetadataService.getTireSetMetadata$().pipe(take(1)).subscribe(metadata => {
      this.treadDepths = metadata.treadDepth
      this.tireFormGroup.patchValue({
        id: this.tire?.id ? this.tire?.id : null,
        treadDepth1: StringUtils.toStringOrNull(this.tire?.treadDepth1),
        treadDepth2: StringUtils.toStringOrNull(this.tire?.treadDepth2),
        treadDepth3: StringUtils.toStringOrNull(this.tire?.treadDepth3),
        treadDepth4: StringUtils.toStringOrNull(this.tire?.treadDepth4),
        tireDamaged: this.tire?.tireDamaged ? this.tire?.tireDamaged : false,
        rimDamaged: this.tire?.rimDamaged ? this.tire?.rimDamaged : false,
        tireLocation: StringUtils.toStringOrNull(this.tire?.tireLocation)
      })
      this.setTreadColors(this.treadDepths)
    })

    this.tireFormGroup.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(val => {
      this.setTreadColors(this.treadDepths)
      this.valueChanged.emit({
        id: val.id ? val.id : null,
        treadDepth1: StringUtils.toStringOrNull(val.treadDepth1),
        treadDepth2: StringUtils.toStringOrNull(val.treadDepth2),
        treadDepth3: StringUtils.toStringOrNull(val.treadDepth3),
        treadDepth4: StringUtils.toStringOrNull(val.treadDepth4),
        tireDamaged: val.tireDamaged ? val.tireDamaged : false,
        rimDamaged: val.rimDamaged ? val.rimDamaged : false,
        tireLocation: StringUtils.toStringOrNull(val.tireLocation)
      })
    })
  }

  getTreadDepthColor (treadDepthValue: number | undefined, treadDepths: TreadDepth[]) {
    if (!treadDepthValue)
      return null
    const element = treadDepths?.find(tread => tread.value === treadDepthValue)
    if (!element) {
      return null
    }
    return element.color
  }

  private setTreadColors (treadDepths: TreadDepth[]) {

    const { treadDepth1, treadDepth2, treadDepth3, treadDepth4 } = this.tireFormGroup.getRawValue()
    this.treadColor1 = treadDepth1 ? this.getTreadDepthColor(Number(treadDepth1), treadDepths) : null
    this.treadColor2 = treadDepth2 ? this.getTreadDepthColor(Number(treadDepth2), treadDepths) : null
    this.treadColor3 = treadDepth3 ? this.getTreadDepthColor(Number(treadDepth3), treadDepths) : null
    this.treadColor4 = treadDepth4 ? this.getTreadDepthColor(Number(treadDepth4), treadDepths) : null
  }

}
