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
    if(parseInt(this.common.getUserRole())>1){ //if role is not admin protect admin pages
      switch(nextRoute){
        case "admin":
        case "answeredstudents":
        case "gradexam":
        case "managequestions":
        case "managestaff":
        case "managestaffadd":
        case "managestaffedit":
          console.log("access denied due to role");
          this.router.navigate(['home']);
          return false;
      }
    }
    return true;
  }
}
