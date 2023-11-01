import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { delay, Observable } from 'rxjs'
import { CustomerMetadata } from '../models/customer-metadata.model'

@Injectable({ providedIn: 'root' })
export class CustomersMetadataService {

  private readonly http = inject(HttpClient)

  private api = 'http://localhost:3000'

  getCustomerMetadata$ (): Observable<CustomerMetadata> {
    return this.http.get<CustomerMetadata>(`${this.api}/customerMetadata`).pipe(delay(500))
  }

}
