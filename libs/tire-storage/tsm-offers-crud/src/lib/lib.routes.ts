import { Route } from '@angular/router'
import {
  TireStorageTsmOffersCrudComponent
} from './tire-storage-tsm-offers-crud/tire-storage-tsm-offers-crud.component'
import { provideState } from '@ngrx/store'
import { offersCrudFeature } from './+state/offers-crud.reducer'
import * as offersCrudEffects from './+state/offers-crud.effects'
import { provideEffects } from '@ngrx/effects'

export const tireStorageTsmOffersCrudRoutes: Route[] = [
  { path: '', redirectTo: 'new', pathMatch: 'prefix' },
  {
    path: ':id',
    component: TireStorageTsmOffersCrudComponent,
    providers: [
      provideState(offersCrudFeature),
      provideEffects(offersCrudEffects)
    ],
  },
]

