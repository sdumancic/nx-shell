import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { delay, map, Observable } from 'rxjs'
import { Customer } from '../models/customer.model'
import { GetCustomersRequest } from '../models'

@Injectable({ providedIn: 'root' })
export class CustomersService {

  private readonly http = inject(HttpClient)

  private api = 'http://localhost:3000'

  getCustomers$ (request: GetCustomersRequest): Observable<{
    data: Customer[] | null,
    totalCount: string | null
  }> {
    const queryParams: string[] = []
    if (request.filtering) {
      const { firstName, lastName, gender, street, city, state, zip, phoneNumber, email } = request.filtering
      if (firstName) {
        queryParams.push(`firstName_like=${firstName}`)
      }
      if (lastName) {
        queryParams.push(`lastName_like=${lastName}`)
      }
      if (gender) {
        queryParams.push(`gender=${gender}`)
      }
      if (street) {
        queryParams.push(`street_like=${street}`)
      }
      if (city) {
        queryParams.push(`city=${city}`)
      }
      if (state) {
        queryParams.push(`state=${state}`)
      }
      if (zip) {
        queryParams.push(`zip=${zip}`)
      }
      if (phoneNumber) {
        queryParams.push(`phoneNumber_like=${phoneNumber}`)
      }
      if (email) {
        queryParams.push(`email_like=${email}`)
      }
    }
    if (request.paging) {
      const { page, limit } = request.paging
      queryParams.push(`_page=${page}`)
      queryParams.push(`_limit=${limit}`)
    }
    if (request.sorting) {
      const { attribute, order } = request.sorting
      queryParams.push(`_sort=${attribute}`)
      queryParams.push(`_order=${order}`)
    }
    let queryParamString = ''
    if (queryParams.length > 0) {
      queryParamString = '?'.concat(queryParams.join('&'))
    }

    return this.http.get<Customer[]>(`${this.api}/customers${queryParamString}`, {
      observe: 'response',
    }).pipe(
      delay(1000),
      map((res) => {
        return {
          data: res.body,
          totalCount: res.headers.get('x-total-count'),
        }
      }))
  }

  getCustomer$ (id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.api}/customers/${id}`).pipe(delay(500))
  }

  createCustomer$ (customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.api}/customers`, customer)
  }

  updateCustomer$ (id: number, customer: Customer): Observable<Customer> {
    console.log('updating customer ', customer)
    return this.http.put<Customer>(`${this.api}/customers/${id}`, customer)
  }

  fullTextSearch (searchText: string, page: number, limit: number): Observable<{
    data: Customer[] | null,
    totalCount: string | null
  }> {
    return this.http.get<Customer[]>(`${this.api}/customers?q=${searchText}&_page=${page}&_limit=${limit}`, {
      observe: 'response',
    }).pipe(
      map((res) => {
        return {
          data: res.body,
          totalCount: res.headers.get('x-total-count'),
        }
      })
    )

  }

}
