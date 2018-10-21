import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailExistService {
  constructor(private http: HttpClient) {}

  checkEmailNotTaken(email: string) {
    return this.http.post('http://localhost:3000/checkemail',{email});
  }
}
