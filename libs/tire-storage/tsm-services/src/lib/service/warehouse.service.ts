import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { TireSetStorage, WarehouseLayout } from '../models'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class WarehouseService {

  private readonly http = inject(HttpClient)

  private api = 'http://localhost:3000'

  loadWarehouseLayout$ () {
    return this.http.get<WarehouseLayout>('assets/tsm-services/data/warehouse-layout.json')
  }

  fetchTireSetStorage$ (): Observable<TireSetStorage[]> {
    return this.http.get<TireSetStorage[]>(`${this.api}/tireSetStorage`)
  }

  saveTireSetStorage$ (data: { id?: number, offerId: number, tireSetId: string | null, locationId: string }) {
    return this.http.post<{ id?: number, offerId: number, tireSetId: string, locationId: string }>(`${this.api}/tireSetStorage`, data)
  }

}
