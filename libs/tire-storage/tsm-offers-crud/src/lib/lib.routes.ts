import { Route } from '@angular/router'
import {
  TireStorageTsmOffersCrudComponent
} from './tire-storage-tsm-offers-crud/tire-storage-tsm-offers-crud.component'

export const tireStorageTsmOffersCrudRoutes: Route[] = [
  { path: '', redirectTo: 'new', pathMatch: 'prefix' },
  { path: ':id', component: TireStorageTsmOffersCrudComponent },
]

