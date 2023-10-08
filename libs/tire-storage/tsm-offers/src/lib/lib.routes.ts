import { Route } from '@angular/router'
import { TireStorageTsmOffersComponent } from './tire-storage-tsm-offers/tire-storage-tsm-offers.component'

export const tireStorageTsmOffersRoutes: Route[] = [
  { path: '', redirectTo: 'open', pathMatch: 'prefix' },
  { path: 'open', component: TireStorageTsmOffersComponent },
  { path: 'paid', component: TireStorageTsmOffersComponent },
  { path: 'closed', component: TireStorageTsmOffersComponent },
]
