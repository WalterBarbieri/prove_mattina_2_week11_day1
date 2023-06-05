import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs';
import { Users } from '../interface/users.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {}
    recupera() {
      return this.http.get<{data: Users[]}>("https://reqres.in/api/users").pipe(map(risultato => risultato.data))
    }

    nuovoUtente(newUser: Partial<Users>) {
      return this.http.post<Users>("https://reqres.in/api/users", newUser)
    }

    cancella(id: number) {
      return this.http.delete(`https://reqres.in/api/users/${id}`)
    }


}
