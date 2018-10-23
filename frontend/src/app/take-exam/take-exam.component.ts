import { ExamService } from './../services/exam.service';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from './../redux/store';
import { StudentService } from './../services/student.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { IStudent } from '../redux/student';
declare var require: any
const ace = require('../../src-min-noconflict/ace');

@Component({
  selector: 'app-take-exam',
  templateUrl: './take-exam.component.html',
  styleUrls: ['./take-exam.component.css']
})
export class TakeExamComponent implements OnInit {

  lastText:string = '';
  textFromEditorQuestion1: string = '';
  textFromEditorQuestion2: string = '';
  textFromEditorQuestion3: string = '';

  onKeyUp(){
    // this.textFromEditorQuestion1;
    console.log(this.textFromEditorQuestion1);
  }


  private questions = [];

  constructor( private studentService: StudentService, private examService: ExamService, 
    private ngRedux: NgRedux<IAppState>,  private router: ActivatedRoute ) { }


  ngOnInit() {
    
    ace.require("ace/ext/chromevox");
    let editor = ace.edit("editor");
    editor.session.setMode("ace/mode/javascript");
    editor.setTheme("ace/theme/twilight");

    editor = ace.edit("editor2");
    editor.session.setMode("ace/mode/javascript");
    editor.setTheme("ace/theme/twilight");

    editor = ace.edit("editor3");
    editor.session.setMode("ace/mode/javascript");
    editor.setTheme("ace/theme/twilight");

    
     this.router.params.subscribe(params => {
      this.renderQuestions(params['email']);
    });
  }

  renderQuestions(email:string){

   // [{question_id, snap_text, frame_id}]

    this.studentService.getStudentByEmail(email).subscribe((student: IStudent) => {
      var self = this;
      student.examQuestions.forEach(function(question){
        console.log(question);
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
    const snap1 = {questionId: qID1, snapText: qtxt1};

    const qID2 = self.questions[1]._id;
    const qtxt2 = self.textFromEditorQuestion2;
    const snap2 = {questionId: qID2, snapText: qtxt2};

    const qID3 = self.questions[2]._id;
    const qtxt3 = self.textFromEditorQuestion3;
    const snap3 = {questionId: qID3, snapText: qtxt3};

    student.snapshots.push(snap1);
    student.snapshots.push(snap2);
    student.snapshots.push(snap3);
    console.log('this.examService.sendSnapshots(student)');
    this.examService.sendSnapshots(student);
    } , 10000);
  }

}
