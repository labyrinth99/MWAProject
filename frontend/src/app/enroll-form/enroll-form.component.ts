import { select, NgRedux } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { IStudent } from '../redux/student';
import { StudentService } from '../services/student.service';
import { CREATE_STUDENT, UPDATE_STUDENT} from '../redux/actions'
import { PopupService } from '@ng-bootstrap/ng-bootstrap/util/popup';


import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-enroll-form',
  templateUrl: './enroll-form.component.html',
  styleUrls: ['./enroll-form.component.css']
})
export class EnrollFormComponent implements OnInit {


  @select() students;

  model: IStudent = {
    status: "new",
    enrollmentDate: new Date(),
    enrollmentForm: {},
    examQuestions: [],
    monitoring: [],
    snapshots: [],
    grading: [],
    resultsSent: false
  }

  constructor(private studentService: StudentService, private ngRedux: NgRedux<IStudent>) {}

  ngOnInit() {
  }

  onSubmit(){

    const emailaddress= this.model.enrollmentForm.email;

    this.studentService.getStudentByEmail(emailaddress)
      .subscribe( data => {
       console.log(data);
       if(!data){
        //subscribe
        this.studentService.createStudent(this.model).subscribe(() => {
          this.ngRedux.dispatch({type: CREATE_STUDENT, student: this.model});
        });
        console.log('New Student');
        alert("We will Contact you soon by Email For Further Instruction");
        console.log(this.model);
      } else{
        console.log("email was found");
        console.log(data);
        alert("same email was found on our database, use another");
      }


      },(error)=>console.log(error));

}

}
