import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionService } from '../services/question.service';

@Component({
  selector: 'app-managequestionsadd',
  templateUrl: './managequestionsadd.component.html',
  styleUrls: ['./managequestionsadd.component.css']
})
export class ManagequestionsaddComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal,private formBuilder: FormBuilder, private questionService: QuestionService) { }

  addForm: FormGroup;

  ngOnInit() {

    this.addForm = this.formBuilder.group({
      id: [],
      text: ['', Validators.required],
      status: ['', Validators.required]
    });

  }

  onSubmit() {
    this.questionService.createQuestion(this.addForm.value)
      .subscribe( data => {
        this.activeModal.close();
      });

  }

}