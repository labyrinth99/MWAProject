import { Component, OnInit } from '@angular/core';
import { IStudent } from '../redux/student';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-answered-students',
  templateUrl: './answered-students.component.html',
  styleUrls: ['./answered-students.component.css']
})
export class AnsweredStudentsComponent implements OnInit {

  studentsA: IStudent[];

  constructor(private modalService: NgbModal,private router: Router, private studentService: StudentService) { }

  ngOnInit() {
    this.studentService.getStudentByStatus("answered")
      .subscribe( data => {
        this.studentsA = data; console.log(data);
      },(error)=>console.log(error));
  }

  grade(student:IStudent){
    console.log("email:",student.enrollmentForm.email)
    this.router.navigate(['gradeexam'],{queryParams:{email:student.enrollmentForm.email}});
  }
}