import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { IStudent } from '../redux/student';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-grade-exam',
  templateUrl: './grade-exam.component.html',
  styleUrls: ['./grade-exam.component.css']
})
export class GradeExamComponent implements OnInit, OnDestroy {

  student:IStudent;

  constructor(private route:ActivatedRoute,private studentService:StudentService) { 
  }
  ngOnInit() {
    this.route.queryParams.subscribe((params)=>{
      this.studentService.getStudentByEmail(params.email).subscribe(stu=>this.student=stu);
      });
  }

  ngOnDestroy(): void {

  }

}
