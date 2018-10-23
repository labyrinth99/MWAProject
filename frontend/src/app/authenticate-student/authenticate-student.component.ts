import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-authenticate-student',
  templateUrl: './authenticate-student.component.html',
  styleUrls: ['./authenticate-student.component.css']
})
export class AuthenticateStudentComponent implements OnInit {

  public email;

  constructor(private studentService: StudentService) { }

  ngOnInit() {
  }
  onSubmit(){

    this.studentService.getStudentByEmail(this.email)
    .subscribe( data => {
     console.log(data);
     if(data){
     alert(this.email);
     }
     else
     alert("This Email is not registered");
    },(error)=>console.log(error));

    }

}
