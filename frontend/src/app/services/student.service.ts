import { IStudent } from './../redux/student';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3000/';
const studentsUrl = baseUrl + 'students/';
const emailerUrl = baseUrl +'emailer/';


@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private http: HttpClient) {}

  createStudent(student: IStudent):Observable<any> {
     return this.http.post(studentsUrl, student);
  }

  getStudents():Observable<any>{
    return this.http.get(studentsUrl);
}
// deleteStudent(email:string):Observable<any>{
//     return this.http.delete(studentsUrl+email);
// }
getStudentByEmail(email:string):Observable<any>{
    return this.http.get(studentsUrl+email);
}

getStudentByStatus(status:string):Observable<any>{
  return this.http.get(studentsUrl+"find/"+status);
}

getStudentEnrolled(condition:string):Observable<any>{
  return this.http.get(studentsUrl+"enrolled/"+condition);
}

updateUser(student:IStudent):Observable<any>{
    return this.http.put(studentsUrl+student.enrollmentForm.email,student);
}

inviter(email:string, name:string){

  return this.http.post(emailerUrl, {email:email, name:name});

}


}
