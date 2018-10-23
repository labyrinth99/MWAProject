import { NgRedux } from '@angular-redux/store';
import { IAppState } from './../redux/store';
import { StudentService } from './../services/student.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IStudent } from '../redux/student';
declare var require: any
const ace = require('../../src-min-noconflict/ace');

@Component({
  selector: 'app-take-exam',
  templateUrl: './take-exam.component.html',
  styleUrls: ['./take-exam.component.css']
})
export class TakeExamComponent implements OnInit {

  private questions = [];
  constructor( private studentService: StudentService, 
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
    console.log('studentEmail');
    console.log(email);
    this.studentService.getStudentByEmail(email).subscribe((data: IStudent) => {
      let qestionList = this.questions;
      data.examQuestions.forEach(function(question){
        qestionList.push(question);
      });
      this.questions =  qestionList;
      console.log(data);

    });    
  }

}
