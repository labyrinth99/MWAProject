import { Component, OnInit } from '@angular/core';
import { IQuestion } from '../redux/question';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { QuestionService } from '../services/question.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-managequestionsedit',
  templateUrl: './managequestionsedit.component.html',
  styleUrls: ['./managequestionsedit.component.css']
})
export class ManagequestionseditComponent implements OnInit {
  question: IQuestion;
  editForm: FormGroup;
  constructor(public activeModal: NgbActiveModal,private formBuilder: FormBuilder,private router: Router, private questionService: QuestionService) { }

  ngOnInit() {
    let questionId = localStorage.getItem("editQuestionId");
    if(!questionId) {
      alert("Invalid action.")
      this.router.navigate(['managestaff']);
      return;
    }
    this.editForm = this.formBuilder.group({
      _id: [],
      text: ['', Validators.required],
      status:['', Validators.required],
    });
    this.questionService.getQuestionById(questionId)
      .subscribe( data => {
        this.editForm.setValue(data);
      });
  }

  onSubmit() {
    this.questionService.updateQuestion(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.activeModal.close();
        },
        error => {
          console.log(error);
        });

  }

}