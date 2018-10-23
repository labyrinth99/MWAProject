import { IAppState } from './../redux/store';
import { FETCH_STUDENTS, UPDATE_STUDENT } from './../redux/actions';
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
  }

  onClick(){
    const student: IStudent = {
      status: "new",
      enrollmentDate: new Date(),
      startDateTime: new Date(),
      enrollmentForm: {name: 'student from homePage mock', email: 'teste@teste.com' },
      examQuestions: [],
      monitoring: [],
      snapshots: [],
      grading: [],
      resultsSent: false
    };
  
    const studentEmail = student.enrollmentForm.email;
    console.log('studentEmail');
    console.log(studentEmail);
    this.examService.startExam(student).subscribe( (data) => {
        this.ngRedux.dispatch({type: UPDATE_STUDENT, student: data}).student;
        console.log(this.ngRedux.getState());
        this.router.navigate(['/takeexam/', {email: studentEmail}]);
    });
  }
  
}
