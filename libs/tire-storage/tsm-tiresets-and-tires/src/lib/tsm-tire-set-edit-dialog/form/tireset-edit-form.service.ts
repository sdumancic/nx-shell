import { Injectable } from '@angular/core'
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms'
import { TireLocationEnum } from '@nx-shell/tire-storage/tsm-domain'
import { TireDetails, TireSet } from '@nx-shell/tire-storage/tsm-services'

@Injectable()
export class TireSetEditForm {

  tireSetForm = new FormGroup({
    id: new FormControl<string | null>(''),
    season: new FormControl<string | null>('', { validators: [Validators.required] }),
    brand: new FormControl<string | null>('', { validators: [Validators.required] }),
    width: new FormControl<number | null>(null),
    height: new FormControl<number | null>(null),
    size: new FormControl<number | null>(null),
    loadIndex: new FormControl<number | null>(null),
    speedIndex: new FormControl<string | null>(''),
    rimsIncluded: new FormControl<boolean | null>(null),
    runFlat: new FormControl<boolean | null>(null),
    customerId: new FormControl<number | null>(null),
    tires: new FormArray([
      new FormGroup({
        id: new FormControl<string | null>(null),
        treadDepth1: new FormControl<string | null>('7'),
        treadDepth2: new FormControl<string | null>('7'),
        treadDepth3: new FormControl<string | null>('7'),
        treadDepth4: new FormControl<string | null>('7'),
        tireDamaged: new FormControl<boolean | null>(false),
        rimDamaged: new FormControl<boolean | null>(false),
        tireLocation: new FormControl<string | null>(TireLocationEnum.FRONT_LEFT),
      }),
      new FormGroup({
        id: new FormControl<string | null>(null),
        treadDepth1: new FormControl<string | null>('7'),
        treadDepth2: new FormControl<string | null>('7'),
        treadDepth3: new FormControl<string | null>('7'),
        treadDepth4: new FormControl<string | null>('7'),
        tireDamaged: new FormControl<boolean | null>(false),
        rimDamaged: new FormControl<boolean | null>(false),
        tireLocation: new FormControl<string | null>(TireLocationEnum.FRONT_RIGHT),
      }),
      new FormGroup({
        id: new FormControl<string | null>(null),
        treadDepth1: new FormControl<string | null>('7'),
        treadDepth2: new FormControl<string | null>('7'),
        treadDepth3: new FormControl<string | null>('7'),
        treadDepth4: new FormControl<string | null>('7'),
        tireDamaged: new FormControl<boolean | null>(false),
        rimDamaged: new FormControl<boolean | null>(false),
        tireLocation: new FormControl<string | null>(TireLocationEnum.REAR_LEFT),
      }),
      new FormGroup({
        id: new FormControl<string | null>(null),
        treadDepth1: new FormControl<string | null>('7'),
        treadDepth2: new FormControl<string | null>('7'),
        treadDepth3: new FormControl<string | null>('7'),
        treadDepth4: new FormControl<string | null>('7'),
        tireDamaged: new FormControl<boolean | null>(false),
        rimDamaged: new FormControl<boolean | null>(false),
        tireLocation: new FormControl<string | null>(TireLocationEnum.REAR_RIGHT),
      })
    ])
  })

  get tires () {
    return this.tireSetForm.controls['tires'] as FormArray
  }

  setCustomerId (customerId: number) {
    this.tireSetForm.patchValue({ customerId: customerId })
  }

  addTireFormGroup (tire: TireDetails) {
    const tiresFormArray = this.tireSetForm.get('tires') as FormArray
    const tireFormGroup = new FormGroup({
      id: new FormControl<string | null>(tire.id),
      treadDepth1: new FormControl<string | null>(tire.treadDepth1),
      treadDepth2: new FormControl<string | null>(tire.treadDepth2),
      treadDepth3: new FormControl<string | null>(tire.treadDepth3),
      treadDepth4: new FormControl<string | null>(tire.treadDepth4),
      tireDamaged: new FormControl<boolean | null>(tire.tireDamaged),
      rimDamaged: new FormControl<boolean | null>(tire.rimDamaged),
      tireLocation: new FormControl<string | null>(tire.tireLocation),
    })
    tiresFormArray.push(tireFormGroup)
  }

  public isDirty () {
    return this.tireSetForm.dirty && this.tireSetForm.touched
  }

  setFormGroupFromTireSet (tireSet: TireSet) {
    this.tireSetForm.patchValue({
      id: tireSet.id,
      season: tireSet.season,
      brand: tireSet.brand,
      width: tireSet.width,
      height: tireSet.height,
      size: tireSet.size,
      loadIndex: tireSet.loadIndex,
      speedIndex: tireSet.speedIndex,
      rimsIncluded: tireSet.rimsIncluded,
      runFlat: tireSet.runFlat,
      customerId: tireSet.customerId
    })
    this.tires.clear()
    tireSet.tires.forEach(tire => this.addTireFormGroup(tire))
  }
}
