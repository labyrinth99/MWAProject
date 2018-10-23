import { Component, OnInit, Input } from '@angular/core';
import { IUser } from '../redux/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { first } from 'rxjs/operators';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-managestaffedit',
  templateUrl: './managestaffedit.component.html',
  styleUrls: ['./managestaffedit.component.css']
})
export class ManagestaffeditComponent implements OnInit {
  @Input() currentID;
  @select('users') rusers: Observable<IUser[]>;
  users: IUser[];
  editForm: FormGroup;

  constructor(public activeModal: NgbActiveModal,private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    if(!this.currentID) {
      console.log("Invalid action.")
      this.activeModal.close();
      return;
    }
    this.rusers.subscribe((data)=>this.users=data);
    this.editForm = this.formBuilder.group({
      _id: [],
      username: ['', Validators.required],
      password:['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      role:['', Validators.required]
    });
    this.editForm.setValue(this.users.find( u => u._id == this.currentID));
/*    this.userService.getUserById(this.currentID)
      .subscribe( data => {
        this.editForm.setValue(data);
      },(err)=>console.log(err));*/
  }

  onSubmit() {
    this.userService.updateUser(this.editForm.value);
    this.activeModal.close();
  /*    .pipe(first())
      .subscribe(
        data => {
          this.activeModal.close();
        },
        error => {
          console.log(error);
        });*/

  }

}