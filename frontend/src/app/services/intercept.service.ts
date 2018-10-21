import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenService implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let currentUser = JSON.parse(localStorage.getItem('token_id'));
    if (currentUser && currentUser.token) {
        req = req.clone({
            setHeaders: { 
                Authorization: `Bearer ${currentUser.token}`
            }
        });
    }

    return next.handle(req);
  }

}
