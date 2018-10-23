import { IAppState } from './../redux/store';
import { FETCH_STUDENTS } from './../redux/actions';
import { IStudent } from './../redux/student';
import { NgRedux } from '@angular-redux/store';
import { ExamService } from './../services/exam.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-exam-home',
  templateUrl: './exam-home.component.html',
  styleUrls: ['./exam-home.component.css']
})
export class ExamHomeComponent implements OnInit {
  private token: string;

  constructor(private router: Router, private examService: ExamService,
              private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    //validate token

    //TODO - get student
  const student: IStudent = {
    _id:{},
    status: "new",
    enrollmentDate: new Date(),
    enrollmentForm: {},
    examQuestions: [],
    monitoring: [],
    snapshots: [],
    grading: [],
    resultsSent: false
  };

  console.log(student);
  this.examService.startExam(student).subscribe( (data) => {
      this.ngRedux.dispatch({type: FETCH_STUDENTS, students: [data]});
      console.log(this.ngRedux.getState());
    });
  }

  onClick(){
    console.log('reached here!');
  }

}
