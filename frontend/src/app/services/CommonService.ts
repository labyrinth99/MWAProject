import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
export interface Credentials { username:string, password:string}

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(private http: HttpClient) { }
  login(credentials: Credentials) {
    return this.http.post<any>('http://localhost:3000/authenticate', credentials)
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('token_id', JSON.stringify(user));
        }
        return user;
      }));
  }
  IsLoggedIn() {
    if (localStorage.getItem('token_id'))
      return true;
    else
      return false;
  }
  Logout() {
    localStorage.removeItem('token_id');
  }
}