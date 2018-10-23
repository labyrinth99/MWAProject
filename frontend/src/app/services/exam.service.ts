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
    return this.http.post(examUrl, {student});
  }

  sendSnapshots(student: IStudent) {
    console.log('client sendSnapshots');

    this.http.post(examUrl+'/sendSnapshots', {student}).subscribe();
  }

}
