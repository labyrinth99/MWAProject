import { Component, OnInit } from '@angular/core';
import { IStudent } from '../redux/student';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-students',
  templateUrl: './new-students.component.html',
  styleUrls: ['./new-students.component.css']
})
export class NewStudentsComponent implements OnInit {

  students: IStudent[];
  constructor(private modalService: NgbModal,private router: Router, private studentService: StudentService) { }

  ngOnInit() {
    this.studentService.getStudentByStatus("new")
      .subscribe( data => {
        this.students = data; console.log(data);
      },(error)=>console.log(error));
  }

}
