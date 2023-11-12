import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { TireStoragePrice } from '../models/tire-storage-price.model'

@Injectable({ providedIn: 'root' })
export class TireStoragePricingService {

  private readonly http = inject(HttpClient)

  private api = 'http://localhost:3000'

  getTireStoragePriceForTire$ (tireSize: number): Observable<TireStoragePrice[]> {
    return this.http.get<TireStoragePrice[]>(`${this.api}/tireStoragePrices?size=${tireSize}`)
  }

}
