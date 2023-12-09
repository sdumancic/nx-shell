import { Component, computed, inject, Inject, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import {
  TsmCustomerInfoUiComponent,
  TsmOfferDetailsUiComponent,
  TsmTireSetInfoUiComponent,
  TsmWarehouseLocationInfoUiComponent,
  TsmWarehouseWarehouseUiComponent,
} from '@nx-shell/tire-storage/tsm-ui'
import { MatCardModule } from '@angular/material/card'
import { MatChipsModule } from '@angular/material/chips'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatDividerModule } from '@angular/material/divider'
import { MatRadioModule } from '@angular/material/radio'
import { MatTabsModule } from '@angular/material/tabs'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatOptionModule } from '@angular/material/core'
import { MatSelectModule } from '@angular/material/select'
import { OfferStatusEnum, WarehouseDialogDataModel } from '@nx-shell/tire-storage/tsm-domain'
import { GenericModalComponent } from '@nx-shell/core'
import {
  Offer,
  OfferService,
  TireSet,
  TireSetStorage,
  WarehouseLayout,
  WarehouseService
} from '@nx-shell/tire-storage/tsm-services'
import { catchError, concat, forkJoin, of, switchMap, take, tap } from 'rxjs'
import { patchState, signalState } from '@ngrx/signals'
import { HttpErrorResponse } from '@angular/common/http'
import { CdkDropList, DragDropModule } from '@angular/cdk/drag-drop'

import { DragAndDropModule } from 'angular-draggable-droppable'

@Component({
  selector: 'tsm-warehouse-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule,
    MatProgressSpinnerModule, TsmCustomerInfoUiComponent, MatCardModule, MatChipsModule, MatDatepickerModule, MatDividerModule, MatRadioModule,
    MatTabsModule, ReactiveFormsModule, MatButtonToggleModule, MatOptionModule, MatSelectModule, GenericModalComponent, TsmTireSetInfoUiComponent, CdkDropList,
    DragDropModule, TsmWarehouseWarehouseUiComponent, DragAndDropModule, TsmWarehouseWarehouseUiComponent, TsmOfferDetailsUiComponent, TsmWarehouseLocationInfoUiComponent],
  templateUrl: './tsm-warehouse-dialog.component.html',
  styleUrls: ['./tsm-warehouse-dialog.component.scss'],

})
export class TsmWarehouseDialogComponent implements OnInit {
  private readonly offerService = inject(OfferService)
  private readonly warehouseService = inject(WarehouseService)
  private readonly dialogRef = inject(MatDialogRef<TsmWarehouseDialogComponent>)

  private state = signalState({
    offerId: {} as number,
    offer: {} as Offer,
    error: {} as string,
    newTireSetStorage: [] as TireSetStorage[]
  })

  offerTireSets = computed(() => this.state().offer?.tireSets?.map(ts => ts.tireSet))
  offer = computed(() => this.state().offer)
  newTireSetStorage = computed(() => this.state().newTireSetStorage)

  warehouseLayout: WarehouseLayout | undefined

  constructor (@Inject(MAT_DIALOG_DATA) public data: WarehouseDialogDataModel) {}

  ngOnInit (): void {
    forkJoin([
      this.warehouseService.loadWarehouseLayout$(),
      this.warehouseService.fetchTireSetStorage$(),
    ]).pipe(take(1)).subscribe(data => {
      const warehouseLayout = data[0]
      warehouseLayout.sections.forEach(section => {
        const sectionName = section.name
        section.subsections.forEach(subsection => {
          const subsectionMame = subsection.name
          Object.keys(subsection.boxes_by_rows).map((rowKey) => {
            const rowName = rowKey
            const row = subsection.boxes_by_rows[rowKey]
            row.forEach((box, boxIndex) => {
              const key = `${sectionName}:${subsectionMame}:${rowName}:${boxIndex}`
              const occupied = this.checkBoxOccupied(key, data[1])
              if (occupied) {
                row[boxIndex].status = 'occupied'
              }
            })
          })
        })
      })
      this.warehouseLayout = { ...warehouseLayout }
    })

    if (this.data.offerId) {
      this.offerService.findOne$(this.data.offerId).pipe(
        take(1),
        catchError((err: HttpErrorResponse) => {
          patchState(this.state, { error: err.message })
          return of(null)
        }))
        .subscribe(offer => {
          if (offer) {
            patchState(this.state, { offer })
            patchState(this.state, { offerId: offer.id })
          }
        })
    }
  }

  onTireSetStored (data: { offerId: number | undefined, tireSet: TireSet; locationId: string }) {
    const { offerId, tireSet, locationId } = data
    this.state().newTireSetStorage.push({ offerId, tireSet, locationId } as TireSetStorage)
  }

  onStoreTireSet () {
    const updatedOffer: Offer = this.state().offer
    const x = this.newTireSetStorage()
      .map(ts => concat(this.warehouseService.saveTireSetStorage$({
        offerId: ts.offerId,
        tireSetId: ts.tireSet.id,
        locationId: ts.locationId
      })))
    forkJoin(x).pipe(
      tap(() => updatedOffer.status = OfferStatusEnum.STORED),
      switchMap(() => this.offerService.updateOffer$(this.state().offerId, updatedOffer))).subscribe(val => this.dialogRef.close(val))
  }

  private checkBoxOccupied (key: string, storage: TireSetStorage[]) {
    const ind = storage.findIndex(el => el.locationId === key)
    if (ind > -1) return true
    return false
  }
}
