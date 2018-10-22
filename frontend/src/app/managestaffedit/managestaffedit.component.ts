import { Component, OnInit } from '@angular/core';
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

  user: IUser;
  editForm: FormGroup;
  constructor(public activeModal: NgbActiveModal,private formBuilder: FormBuilder,private router: Router, private userService: UserService) { }

  ngOnInit() {
    let userId = localStorage.getItem("editUserId");
    if(!userId) {
      alert("Invalid action.")
      this.router.navigate(['managestaff']);
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
    this.userService.getUserById(userId)
      .subscribe( data => {
        this.editForm.setValue(data);
      });
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