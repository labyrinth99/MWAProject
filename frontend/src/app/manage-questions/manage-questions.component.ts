import { Component, OnInit } from '@angular/core';
import { IQuestion } from '../redux/question';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { QuestionService } from '../services/question.service';
import { ManagequestionseditComponent } from '../managequestionsedit/managequestionsedit.component';
import { ManagequestionsaddComponent } from '../managequestionsadd/managequestionsadd.component';

@Component({
  selector: 'app-manage-questions',
  templateUrl: './manage-questions.component.html',
  styleUrls: ['./manage-questions.component.css']
})
export class ManageQuestionsComponent implements OnInit {

  questions: IQuestion[];

  constructor(private modalService: NgbModal,private router: Router, private QuestionService: QuestionService) { }

  ngOnInit() {
    this.QuestionService.getQuestions()
      .subscribe( data => {
        this.questions = data;
      },(error)=>console.log(error));
  }

  deleteQuestion(question: IQuestion): void {
    this.QuestionService.deleteQuestion(question._id)
      .subscribe( data => {
        this.questions = this.questions.filter(u => u !== question);
      })
  };

  editQuestion(question: IQuestion): void {
    localStorage.removeItem("editQuestionId");
    localStorage.setItem("editQuestionId", question._id.toString());
    const modal = this.modalService.open(ManagequestionseditComponent);
    modal.result.then(()=>this.ngOnInit()).catch((err)=>console.log(err));
  };

  addQuestion(): void {
    const modal = this.modalService.open(ManagequestionsaddComponent);
    modal.result.then(()=>this.ngOnInit()).catch((err)=>console.log(err));
  };
}