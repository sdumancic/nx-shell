import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { catchError, delay, map, Observable } from 'rxjs'
import { Offer } from '../models/offer.model'
import { OffersOverviewSearchValues, OfferStatusEnum } from '@nx-shell/tire-storage/tsm-domain'

@Injectable({ providedIn: 'root' })
export class OfferService {
  private readonly http = inject(HttpClient)

  private api = 'http://localhost:3000'

  createOffer$ (offer: Offer): Observable<Offer> {
    return this.http.post<Offer>(`${this.api}/offers`, offer).pipe(catchError((err: Error) => {
      throw Error(err.message)
    }))
  }

  acceptOffer$ (offer: Offer): Observable<Offer> {
    return this.http.put<Offer>(`${this.api}/offers/${offer.id}`, {
      ...offer,
      status: OfferStatusEnum.ACCEPTED
    }).pipe(catchError((err: Error) => {
      throw Error(err.message)
    }))
  }

  rejectOffer$ (offer: Offer): Observable<Offer> {
    return this.http.put<Offer>(`${this.api}/offers/${offer.id}`, {
      ...offer,
      status: OfferStatusEnum.REJECTED
    }).pipe(catchError((err: Error) => {
      throw Error(err.message)
    }))
  }

  updateOffer$ (id: number, newOffer: Offer): Observable<Offer> {
    return this.http.put<Offer>(`${this.api}/offers/${id}`, {
      ...newOffer
    }).pipe(catchError((err: Error) => {
      throw Error(err.message)
    }))
  }

  findOne$ (id: number) {
    return this.http.get<Offer>(`${this.api}/offers/${id}`).pipe(catchError((err: Error) => {
      throw Error(err.message)
    }))
  }

  searchOffers$ (searchValues: OffersOverviewSearchValues, page: number, limit: number, sortAttribute?: string, sortDirection?: string): Observable<{
    data: Offer[],
    totalCount: number
  }> {
    const status = searchValues.status
    return this.http.get<Offer[]>(`${this.api}/offers?status=${status}`)
      .pipe(
        map(offers => offers.filter(offer => this.offerSatisfiesCondition(offer, searchValues))),
        delay(1000),
        map(offers => {
          if (!sortAttribute) {
            return offers
          } else {
            return offers.sort((a, b) => this.orderBy(a, b, sortAttribute, sortDirection))
          }
        }),
        map((offers: Offer[]) => {
          const sliceStart = page > 0 ? (page - 1) * limit : page * limit
          const sliceEnd = sliceStart + limit - 1
          return {
            data: offers.slice(sliceStart, sliceEnd),
            totalCount: offers.length
          }
        }),
        catchError((err: Error) => {
          throw Error(err.message)
        })
      )
  }

  private offerSatisfiesCondition (offer: Offer, searchValues: OffersOverviewSearchValues) {
    const { seasons, brands, sizes, widths, heights, speedIndexes, loadIndexes } = searchValues
    let satisfiesSeason = seasons && seasons.length > 0 ? false : true
    let satisfiesBrand = brands && brands.length > 0 ? false : true
    let satisfiesWidth = sizes && sizes.length > 0 ? false : true
    let satisfiesHeight = widths && widths.length > 0 ? false : true
    let satisfiesSize = heights && heights.length > 0 ? false : true
    let satisfiesLoadIndex = loadIndexes && loadIndexes.length > 0 ? false : true
    let satisfiesSpeedIndex = speedIndexes && speedIndexes.length > 0 ? false : true
    let satisfies = false
    for (const tireSetWithPrices of offer.tireSets) {
      const { season, size, brand, width, height, speedIndex, loadIndex } = tireSetWithPrices.tireSet
      if (seasons && seasons.length > 0 && season && seasons.includes(season)) {
        satisfiesSeason = true
      }
      if (brands && brands.length > 0 && brand && brands.includes(brand)) {
        satisfiesBrand = true
      }
      if (sizes && sizes.length > 0 && size && sizes.includes(size)) {
        satisfiesSize = true
      }
      if (widths && widths.length > 0 && width && widths.includes(width)) {
        satisfiesWidth = true
      }
      if (heights && heights.length > 0 && height && heights.includes(height)) {
        satisfiesHeight = true
      }
      if (speedIndexes && speedIndexes.length > 0 && speedIndex && speedIndexes.includes(speedIndex)) {
        satisfiesSpeedIndex = true
      }
      if (loadIndexes && loadIndexes.length > 0 && loadIndex && loadIndexes.includes(loadIndex)) {
        satisfiesLoadIndex = true
      }
      if (satisfiesSeason && satisfiesBrand && satisfiesSize && satisfiesWidth && satisfiesHeight && satisfiesSpeedIndex && satisfiesLoadIndex) {
        satisfies = true
      }
    }
    return satisfies
  }

  private orderBy (a: Offer, b: Offer, sortAttribute: string, sortDirection: string | undefined) {
    if (sortDirection === 'asc') {
      switch (sortAttribute) {
        case 'id':
          return a && b && a.id && b.id ? (a.id > b.id ? 1 : -1) : 0
        case 'customer':
          return a && b && a.customer.lastName && b.customer.lastName ? a.customer.lastName.localeCompare(b.customer.lastName) === 1 ? 1 : -1 : 0
        case 'startDate':
          return a && b && a.startDate && b.startDate ? a.startDate > b.startDate ? 1 : -1 : 0
        case 'endDate':
          return a && b && a.endDate && b.endDate ? a.endDate > b.endDate ? 1 : -1 : 0
        case 'status':
          return a && b && a.status && b.status ? a.status > b.status ? 1 : -1 : 0
        case 'totalPrice':
          return a && b && a.totalPrice && b.totalPrice ? a.totalPrice > b.totalPrice ? 1 : -1 : 0
        default:
          return 0
      }
    } else {
      switch (sortAttribute) {
        case 'id':
          return a && b && a.id && b.id ? (a.id > b.id ? -1 : 1) : 0
        case 'customer':
          return a && b && a.customer.lastName && b.customer.lastName ? a.customer.lastName.localeCompare(b.customer.lastName) === 1 ? -1 : 1 : 0
        case 'startDate':
          return a && b && a.startDate && b.startDate ? a.startDate > b.startDate ? -1 : 1 : 0
        case 'endDate':
          return a && b && a.endDate && b.endDate ? a.endDate > b.endDate ? -1 : 1 : 0
        case 'status':
          return a && b && a.status && b.status ? a.status > b.status ? -1 : 1 : 0
        case 'totalPrice':
          return a && b && a.totalPrice && b.totalPrice ? a.totalPrice > b.totalPrice ? -1 : 1 : 0
        default:
          return 0
      }
    }
  }
}
