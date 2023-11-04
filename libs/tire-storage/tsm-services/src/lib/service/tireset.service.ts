import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { TireSet } from '../models/tire-set.model'

@Injectable({ providedIn: 'root' })
export class TireSetService {

  private readonly http = inject(HttpClient)

  private api = 'http://localhost:3000'

  getTireSetsForCustomer$ (customerId: number): Observable<TireSet[]> {
    return this.http.get<TireSet[]>(`${this.api}/tireSets?customerId=${customerId}`)
  }

  createTireSet$ (tireSet: TireSet): Observable<TireSet> {
    return this.http.post<TireSet>(`${this.api}/tireSets`, tireSet)
  }

  updateTireSet$ (id: string, tireSet: TireSet): Observable<TireSet> {
    return this.http.put<TireSet>(`${this.api}/tireSets/${id}`, tireSet)
  }

}
