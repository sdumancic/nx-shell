import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Customer } from '../models/customer.model'

@Injectable({ providedIn: 'root' })
export class CustomersService {

  private readonly http = inject(HttpClient)

  private api = 'http://localhost:3000'

  getCustomers$ (): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.api}/customers`)
  }

  getCustomer$ (id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.api}/customers/${id}`)
  }

  createCustomer$ (customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.api}/customers`, customer)
  }

  updateCustomer$ (id: number, customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.api}/customers/${id}`, customer)
  }

}
