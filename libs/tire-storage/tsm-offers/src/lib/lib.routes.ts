import { Route } from '@angular/router'
import { TireStorageTsmOffersComponent } from './tire-storage-tsm-offers/tire-storage-tsm-offers.component'
import { provideState } from '@ngrx/store'
import { provideEffects } from '@ngrx/effects'
import * as offersOverviewEffects from '../../../tsm-offers/src/lib/+state/offers-overview.effects'
import { offersOverviewFeature } from './+state/offers-overview.reducer'

export const tireStorageTsmOffersRoutes: Route[] = [
  {
    path: '', component: TireStorageTsmOffersComponent, providers: [
      provideState(offersOverviewFeature),
      provideEffects(offersOverviewEffects)
    ],
  },
  {
    path: 'open', component: TireStorageTsmOffersComponent, providers: [
      provideState(offersOverviewFeature),
      provideEffects(offersOverviewEffects)
    ],
  },
  {
    path: 'accepted', component: TireStorageTsmOffersComponent, providers: [
      provideState(offersOverviewFeature),
      provideEffects(offersOverviewEffects)
    ],
  },
  {
    path: 'rejected', component: TireStorageTsmOffersComponent, providers: [
      provideState(offersOverviewFeature),
      provideEffects(offersOverviewEffects)
    ],
  },
]
