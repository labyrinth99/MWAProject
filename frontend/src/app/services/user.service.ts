import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../redux/user';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3000/';
const usersUrl = baseUrl + 'users/';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  createUser(user: IUser):Observable<any> {
     return this.http.post(usersUrl, user);
  }
  getUsers():Observable<any>{
      return this.http.get(usersUrl);
  }
  deleteUser(id:string):Observable<any>{
      return this.http.delete(usersUrl+id);
  }
  getUserById(id:string):Observable<any>{
      return this.http.get(usersUrl+id);
  }
  updateUser(user:IUser):Observable<any>{
      return this.http.put(usersUrl,user);
  }
}
