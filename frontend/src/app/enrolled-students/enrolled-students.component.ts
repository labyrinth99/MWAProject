import { Component, OnInit } from '@angular/core';
import { IStudent } from '../redux/student';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-enrolled-students',
  templateUrl: './enrolled-students.component.html',
  styleUrls: ['./enrolled-students.component.css']
})
export class EnrolledStudentsComponent implements OnInit {

  studentsA: IStudent[];
  studentsI: IStudent[];
  studentsP: IStudent[];
  studentsF: IStudent[];

  constructor(private modalService: NgbModal,private router: Router, private studentService: StudentService) { }

  ngOnInit() {
    this.studentService.getStudentByStatus("answered")
      .subscribe( data => {
        this.studentsA = data; console.log(data);
      },(error)=>console.log(error));

      this.studentService.getStudentByStatus("invited")
      .subscribe( data => {
        this.studentsI = data; console.log(data);
      },(error)=>console.log(error));

      this.studentService.getStudentByStatus("pass")
      .subscribe( data => {
        this.studentsP = data; console.log(data);
      },(error)=>console.log(error));

      this.studentService.getStudentByStatus("fail")
      .subscribe( data => {
        this.studentsF = data; console.log(data);
      },(error)=>console.log(error));

  }

  invite(studentx: IStudent){

    this.studentService.inviter(studentx.enrollmentForm.email, studentx.enrollmentForm.name,'email')
      .subscribe( data => {
         console.log(data);
      },(error)=>console.log(error));

      alert("Email Sent");
      this.ngOnInit();

  }

}
