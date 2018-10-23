import { Component, OnInit, Input } from '@angular/core';
import { IUser } from '../redux/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { first } from 'rxjs/operators';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-managestaffedit',
  templateUrl: './managestaffedit.component.html',
  styleUrls: ['./managestaffedit.component.css']
})
export class ManagestaffeditComponent implements OnInit {
  @Input() currentID;
  user: IUser;
  editForm: FormGroup;
  constructor(public activeModal: NgbActiveModal,private formBuilder: FormBuilder,private router: Router, private userService: UserService) { }

  ngOnInit() {
    if(!this.currentID) {
      console.log("Invalid action.")
      this.activeModal.close();
      return;
    }
    this.editForm = this.formBuilder.group({
      _id: [],
      username: ['', Validators.required],
      password:['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      role:['', Validators.required]
    });
    this.userService.getUserById(this.currentID)
      .subscribe( data => {
        this.editForm.setValue(data);
      },(err)=>console.log(err));
  }

  onSubmit() {
    this.userService.updateUser(this.editForm.value)
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