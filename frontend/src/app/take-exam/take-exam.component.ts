import { ExamService } from './../services/exam.service';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from './../redux/store';
import { StudentService } from './../services/student.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IStudent } from '../redux/student';
import { AceEditorModule } from 'ng2-ace-editor';



@Component({
  selector: 'app-take-exam',
  template: `

<h4>Exam</h4>
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
<button class="btn btn-success" >Finish Exam</button>
<br/>
<br/>
  `,
  styleUrls: ['./take-exam.component.css']
})
export class TakeExamComponent implements OnInit {

  textFromEditorQuestion1: string = '';
  textFromEditorQuestion2: string = '';
  textFromEditorQuestion3: string = '';

  onChange1() {
    console.log("this.textFromEditorQuestion1");
    console.log(this.textFromEditorQuestion1);
  }

  onChange2() {
    console.log("this.textFromEditorQuestion2");
    console.log(this.textFromEditorQuestion2);
  }

  onChange3() {
    console.log("this.textFromEditorQuestion3");
    console.log(this.textFromEditorQuestion3);
  }

  text:string = "";
  options:any = {maxLines: 1000, printMargin: false};
  @ViewChild('editor') editor;


  private questions = [];

  constructor( private studentService: StudentService, private examService: ExamService, 
    private ngRedux: NgRedux<IAppState>,  private router: ActivatedRoute ) { 
      console.log("params['email'] --------------- 1");
    }


  ngOnInit() {
    
     this.router.params.subscribe(params => {
      console.log("params['email']");
       console.log(params['email']);
      this.renderQuestions('teste@teste.com');
      
    });
  }

  renderQuestions(email:string){

   // [{question_id, snap_text, frame_id}]

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
    setInterval(()=> { 
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

    console.log(student.snapshots);

    this.examService.sendSnapshots(student);
    } , 90000);
  }
}
