import { Component, inject, Inject, OnInit, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import {
  TsmCustomerInfoUiComponent,
  TsmTireSetInfoUiComponent,
  TsmWarehouseRowUiComponent,
  TsmWarehouseSeatUiComponent
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
import { WarehouseDialogDataModel } from '@nx-shell/tire-storage/tsm-domain'
import { GenericModalComponent } from '@nx-shell/core'
import { Offer, OfferService, TireSet } from '@nx-shell/tire-storage/tsm-services'
import { catchError, of, take } from 'rxjs'
import { patchState, signalState } from '@ngrx/signals'
import { HttpErrorResponse } from '@angular/common/http'
import { CdkDropList, DragDropModule } from '@angular/cdk/drag-drop'
import {
  TsmWarehouseContainerBoxUiComponent
} from '../../../../tsm-ui/src/lib/tsm-warehouse-container-box-ui/tsm-warehouse-container-box-ui.component'

@Component({
  selector: 'tsm-warehouse-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule,
    MatProgressSpinnerModule, TsmCustomerInfoUiComponent, MatCardModule, MatChipsModule, MatDatepickerModule, MatDividerModule, MatRadioModule,
    MatTabsModule, ReactiveFormsModule, MatButtonToggleModule, MatOptionModule, MatSelectModule, GenericModalComponent, TsmWarehouseSeatUiComponent, TsmWarehouseRowUiComponent, TsmTireSetInfoUiComponent, CdkDropList,
    DragDropModule, TsmWarehouseContainerBoxUiComponent],
  templateUrl: './tsm-warehouse-dialog.component.html',
  styleUrls: ['./tsm-warehouse-dialog.component.scss'],

})
export class TsmWarehouseDialogComponent implements OnInit {
  private readonly offerService = inject(OfferService)
  rows = signal([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

  private state = signalState({
    offerId: {} as number,
    offer: {} as Offer,
    error: {} as string
  })

  constructor (@Inject(MAT_DIALOG_DATA) public data: WarehouseDialogDataModel) {
    if (data.offerId) {
      patchState(this.state, { offerId: data.offerId })
    }
  }

  drop (event: any) {
    if (event.previousContainer === event.container) {
      console.log(event.container.data, event.previousIndex, event.currentIndex)
      //moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      //transferArrayItem
      console.log(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      )
    }
  }

  onBoxSelected (data: { row: number; col: number; level: number }) {
    console.log('box selected ', data)
  }

  get offerTireSets (): TireSet[] {
    if (!this.state().offer)
      return []
    return this.state().offer?.tireSets?.map(ts => ts.tireSet)
  }

  ngOnInit (): void {
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
          }
        })
    }
  }
}
