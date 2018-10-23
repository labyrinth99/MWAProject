import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-managestaffadd',
  templateUrl: './managestaffadd.component.html',
  styleUrls: ['./managestaffadd.component.css']
})
export class ManagestaffaddComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal,private formBuilder: FormBuilder,private router: Router, private userService: UserService) { }

  addForm: FormGroup;

  ngOnInit() {

    this.addForm = this.formBuilder.group({
      _id: [],
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      role:['', Validators.required]
    });

  }

  onSubmit() {
    this.userService.createUser(this.addForm.value);
    this.activeModal.close();
  /*    .subscribe( data => {
        this.activeModal.close();
      });*/

  }

}