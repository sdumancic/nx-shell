import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { delay, Observable } from 'rxjs'
import { TireSetMetadata } from '../models/tire-set-metatada.model'

@Injectable({ providedIn: 'root' })
export class TireSetMetadataService {

  private readonly http = inject(HttpClient)

  private api = 'http://localhost:3000'

  getTireSetMetadata$ (): Observable<TireSetMetadata> {
    return this.http.get<TireSetMetadata>(`${this.api}/tireSetMetadata`).pipe(delay(500))
  }

}
