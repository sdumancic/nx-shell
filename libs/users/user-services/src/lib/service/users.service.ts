import { Observable, switchMap, take } from 'rxjs'
import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { User } from '../model/user.model'

@Injectable({ providedIn: 'root' })
export class UserService {

  private readonly http = inject(HttpClient)
  private api = 'http://localhost:3000'

  getUsers$ (): Observable<User[]> {
    return this.http.get<User[]>(`${this.api}/users`)
  }

  getUser$ (id: number): Observable<User> {
    return this.http.get<User>(`${this.api}/users/${id}`)
  }

  createUser$ (user: User): Observable<User> {
    return this.http.post<User>(`${this.api}/users`, user)
  }

  updateUser$ (id: number, user: Partial<User>): Observable<User> {
    return this.getUser$(id).pipe(
      take(1),
      switchMap(existingUser => {
        const updatedUser = { ...existingUser, ...user }
        return this.http.put<User>(`${this.api}/users/${id}`, updatedUser)
      })
    )

  }
}
