import { UPDATE_STUDENT } from './../redux/actions';
import { ExamService } from './../services/exam.service';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from './../redux/store';
import { StudentService } from './../services/student.service';
import {  Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IStudent } from '../redux/student';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-take-exam',
  template: `

<h4>Exam</h4>
<br/>
<br/>
<countdown [config]="{leftTime:60 * 180}" 
  (finished)="openVerticallyCentered(content);finishExam()">$!h!:$!m!:$!s!
</countdown>
<br/>
<br/>
<h6>first question</h6>
<p>{{questions[0]?.text}}</p>
<br/>
<div ace-editor  [(text)]="textFromEditorQuestion1" [mode]="'javascript'" [options]="options"  [readOnly]="false"  [autoUpdateContent]="true" 
  [durationBeforeCallback]="1000" (textChanged)="onChange1($event)" 
  style="min-height: 250px; width:70%; overflow: auto;"></div>
  <button class="btn btn-secondary" >Submit Question 1</button>
  <br/>
  <br/>
  <br/>
  <h6>second question</h6>
  <p>{{questions[1]?.text}}</p>
  <br/>
<div ace-editor  [(text)]="textFromEditorQuestion2" [mode]="'javascript'" [options]="options"  [readOnly]="false"  [autoUpdateContent]="false" 
    [durationBeforeCallback]="1000" (textChanged)="onChange2($event)" 
    style="min-height: 250px; width:70%; overflow: auto;"></div>
<button class="btn btn-secondary" >Submit Question 2</button>
<br/>
<br/>
<br/>
<h6>third question</h6>
<p>{{questions[2]?.text}}</p>
<br/>
<div ace-editor  [(text)]="textFromEditorQuestion3" [mode]="'javascript'" [options]="options"  [readOnly]="false"  [autoUpdateContent]="true" 
  [durationBeforeCallback]="1000" (textChanged)="onChange3($event)" 
  style="min-height: 250px; width:70%; overflow: auto;"></div>
<button class="btn btn-secondary" >Submit Question 2</button>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<button class="btn btn-success" (click)="openVerticallyCentered(content);finishExam()" >Finish Exam</button>
<br/>
<br/>
<ng-template #content let-modal>
  <div class="modal-header">
    <h4 class="modal-title">End of exam!</h4>
  </div>
  <div class="modal-body">
    <p>You submited your exam!</p>
    <p>within the next few days you are going to receive your results on your registered email!</p>
  </div>
</ng-template>
  `,
  styleUrls: ['./take-exam.component.css']
})
export class TakeExamComponent implements OnInit {

  interval = null;

  closeResult: string;

  textFromEditorQuestion1: string = '';
  textFromEditorQuestion2: string = '';
  textFromEditorQuestion3: string = '';

  onChange1() {
  }

  onChange2() {
  }

  onChange3() {
  }

  text:string = "";
  options:any = {maxLines: 1000, printMargin: false};
  staringDateTime:Date;


  private questions = [];

  constructor( private studentService: StudentService, private examService: ExamService, 
    private ngRedux: NgRedux<IAppState>, private activeteRoute:ActivatedRoute,  private router: Router, private modalService: NgbModal ) { 
      
    }


  ngOnInit() {
    this.staringDateTime = new Date();
    
     this.activeteRoute.params.subscribe(params => {
      this.renderQuestions('teste@teste.com');      
    });
  }

  renderQuestions(email:string){

    this.studentService.getStudentByEmail(email).subscribe((student: IStudent) => {
      var self = this;
      student.examQuestions.forEach(function(question){
        self.questions.push(question);
      });
      this.captureSnapShots(student); 
    }); 
  }
  
  captureSnapShots(student: IStudent){
    var self = this;
    this.interval = setInterval(()=> { 
    const qID1 = self.questions[0]._id;
    const qtxt1 = self.textFromEditorQuestion1;
    const snap1 = {questionNo: 1, questionId: qID1, snapText: qtxt1};

    const qID2 = self.questions[1]._id;
    const qtxt2 = self.textFromEditorQuestion2;
    const snap2 = {questionNo: 2, questionId: qID2, snapText: qtxt2};

    const qID3 = self.questions[2]._id;
    const qtxt3 = self.textFromEditorQuestion3;
    const snap3 = {questionNo: 3, questionId: qID3, snapText: qtxt3};

    student.snapshots.push(snap1);
    student.snapshots.push(snap2);
    student.snapshots.push(snap3);

    this.examService.sendSnapshots(student).subscribe(() =>{
      this.ngRedux.dispatch({type: UPDATE_STUDENT, student: student});
    });

    } , 90000);
  }

  finishExam(){
    this.studentService.getStudentByEmail('teste@teste.com').subscribe((student: IStudent) => {
    student.monitoring = {
      startTime: this.staringDateTime,
      endTime: null, // will get from the server
      outOfWindow: 0
    };
    student.examQuestions[0].finalAnswer = this.textFromEditorQuestion1;
    student.examQuestions[1].finalAnswer = this.textFromEditorQuestion2;
    student.examQuestions[2].finalAnswer = this.textFromEditorQuestion3;


    this.examService.finishExam(student).subscribe(() =>{
      this.ngRedux.dispatch({type: UPDATE_STUDENT, student: student});     
      });
    });

    clearInterval(this.interval);
    this.router.navigate(['/home']);    
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }
}
