import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { catchError, map, Observable } from 'rxjs'
import { User } from '../model/user.model'

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly http = inject(HttpClient)

  private api = 'http://localhost:3000'

  loginUser$ (username: string, password: string): Observable<User> {
    return this.http.get<User[]>(`${this.api}/users?username=${username}`)
      .pipe(
        map(list => {
          if (list.length === 0) {
            throw Error('User does not exists')
          }
          if (list[0].password !== password) {
            throw Error('Wrong password')
          }
          return list[0]
        }),
        catchError((err: Error) => {
          throw Error(err.message)
        }),
      )
  }

}
