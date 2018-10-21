import { select, NgRedux } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { IStudent } from '../redux/student';
import { StudentService } from '../services/student.service';
import { CREATE_STUDENT, UPDATE_STUDENT} from '../redux/actions'

@Component({
  selector: 'app-enroll-form',
  templateUrl: './enroll-form.component.html',
  styleUrls: ['./enroll-form.component.css']
})
export class EnrollFormComponent implements OnInit {

 
  @select() students;

  model: IStudent = {
    status: "new",
    enrollmentData: '',
    enrollmentForm: [],
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
    const action = this.ngRedux.dispatch({type: CREATE_STUDENT, student: this.model}); 
    console.log('New Student');
    console.log(action.student);
    this.studentService.createStudent(action.student);
  }

}
