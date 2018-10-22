import { IStudent } from './../redux/student';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:3000/';
const examUrl = baseUrl + 'exam/';


@Injectable({
  providedIn: 'root'
})
export class ExamService {
  constructor(private http: HttpClient) {}

  startExam(student: IStudent) {
    console.log('started service this.student');
    console.log(student);
     this.http.post(examUrl, {student}).subscribe();
  }
}
