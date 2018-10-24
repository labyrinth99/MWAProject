import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-authenticate-student',
  templateUrl: './authenticate-student.component.html',
  styleUrls: ['./authenticate-student.component.css']
})
export class AuthenticateStudentComponent implements OnInit {

  public email:string;

  user: Observable<any>;
  emailSent = false;

  errorMessage: string;

  constructor(private studentService: StudentService) { }

  ngOnInit() {
  }
  onSubmit(){
    if(!this.email)
    alert('Please Enter Your Email First');
    else{
    this.studentService.getStudentByEmail(this.email)
    .subscribe( data => {
     console.log(data);
     if(data){
    //  alert(this.email);





    // end of autheni
     }
     else
     alert("This Email is not registered");
    },(error)=>console.log(error));

    }

  }

}
