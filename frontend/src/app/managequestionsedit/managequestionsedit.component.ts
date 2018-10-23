import { Component, OnInit, Input } from '@angular/core';
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
  @Input() currentID:string;
  question: IQuestion;
  editForm: FormGroup;
  constructor(public activeModal: NgbActiveModal,private formBuilder: FormBuilder, private questionService: QuestionService) { }

  ngOnInit() {
    if(!this.currentID) {
      console.log("Invalid action.");
      this.activeModal.close();
      return;
    }
    this.editForm = this.formBuilder.group({
      _id: [],
      text: ['', Validators.required],
      status:['', Validators.required],
    });
    this.questionService.getQuestionById(this.currentID)
      .subscribe( data => {
        this.editForm.setValue(data);
      },(err)=>console.log(err));
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