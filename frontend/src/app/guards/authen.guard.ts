import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from "../services/CommonService";

@Injectable({
  providedIn: 'root'
})
export class AuthenGuard implements CanActivate {
  constructor(private common:CommonService,private router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let nextRoute = next.url[0].path;
    if(!this.common.IsLoggedIn()){
      console.log('unauthorized access');
      this.router.navigate(['login']);
      return false;
    }

    switch(parseInt(this.common.getUserRole())){
      case 1:{
        switch(nextRoute){
              case "admin":
              case "answeredstudents":
              case "gradexam":
              case "managequestions":
              case "managestaff":
              case "managestaffadd":
              case "managestaffedit":
              case "managequestionsadd":
              case "managequestionsedit":
              case "homeExam":
              case "takeexam":
                return true;
      }
    }
      case 2:{
        switch(nextRoute){
              case "staffhome":
              case "newstudents":
              case "enrolled":
                return true;
            }

      }
      case 3:{
        switch(nextRoute){
          case "homeExam":
          case "takeexam":
            return true;
        }
      }

      default:{
        console.log("Access denied due to role");
          this.router.navigate(['takeexam']);
          return false;

      }
    }
    // if(parseInt(this.common.getUserRole())!=1){ //if role is not admin protect admin pages
    //   switch(nextRoute){
    //     case "admin":
    //     case "answeredstudents":
    //     case "gradexam":
    //     case "managequestions":
    //     case "managestaff":
    //     case "managestaffadd":
    //     case "managestaffedit":
    //     case "managequestionsadd":
    //     case "managequestionsedit":
    //       console.log("Access denied due to role");
    //       this.router.navigate(['home']);
    //       return false;
    //   }
    // }
    // if(parseInt(this.common.getUserRole())!=2){ //if role is not staff protect admin pages
    //   switch(nextRoute){
    //     case "staffhome":
    //     case "newstudents":
    //     case "enrolled":
    //       console.log("Access denied due to role");
    //       this.router.navigate(['home']);
    //       return false;
    //   }
    // }
    // return true;
  }
}
