import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../redux/user';
import { Observable } from 'rxjs';
import { NgRedux } from '@angular-redux/store';
import { GET_USERS, UPDATE_USER, DELETE_USER, CREATE_USER } from '../redux/actions';

const baseUrl = 'http://localhost:3000/';
const usersUrl = baseUrl + 'users/';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient,private ngRedux: NgRedux<IUser>) {}

  createUser(user: IUser) {
     this.http.post<IUser>(usersUrl, user).subscribe((data)=>{
         this.ngRedux.dispatch({type:CREATE_USER, user:data})
     },(err)=>console.log(err));
  }
  getUsers(){
      this.http.get(usersUrl).subscribe((data)=>{
        this.ngRedux.dispatch({type: GET_USERS, users: data});
      },(err)=>console.log(err));
  }
  deleteUser(id:string){
      this.http.delete(usersUrl+id).subscribe((data)=>{
          this.ngRedux.dispatch({type: DELETE_USER, userID:id})
      },(err)=>console.log(err));
  }
/*  getUserById(id:string):Observable<any>{
      return this.http.get(usersUrl+id);
  }*/
  updateUser(user:IUser){
      this.http.put(usersUrl+user._id,user).subscribe((data)=>{
          this.ngRedux.dispatch({type:UPDATE_USER, user:user})
      },(err)=>console.log(err));
  }
}