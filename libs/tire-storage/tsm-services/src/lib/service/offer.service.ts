import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Offer } from '../models/offer.model'

@Injectable({ providedIn: 'root' })
export class OfferService {
  private readonly http = inject(HttpClient)

  private api = 'http://localhost:3000'

  createOffer$ (offer: Offer): Observable<Offer> {
    return this.http.post<Offer>(`${this.api}/offers`, offer)
  }
}
