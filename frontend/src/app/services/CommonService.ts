import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
export interface Credentials { username:string, password:string}

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private helper = new JwtHelperService();
  constructor(private http: HttpClient) { 
  }
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
  getUserRole() {
      let currentUser = JSON.parse(localStorage.getItem('token_id'));
      let payload= this.helper.decodeToken(currentUser.token);
      if(this.IsLoggedIn()) return payload.sub;
      else return 0;
  }
  Logout() {
    localStorage.removeItem('token_id');
  }
}