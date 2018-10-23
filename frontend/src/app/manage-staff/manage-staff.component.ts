import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { IUser } from '../redux/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManagestaffaddComponent } from '../managestaffadd/managestaffadd.component';
import { ManagestaffeditComponent } from '../managestaffedit/managestaffedit.component';

@Component({
  selector: 'app-manage-staff',
  templateUrl: './manage-staff.component.html',
  styleUrls: ['./manage-staff.component.css']
})
export class ManageStaffComponent implements OnInit, OnDestroy {


  users: IUser[];

  constructor(private modalService: NgbModal,private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe( data => {
        this.users = data;
      },(error)=>console.log(error));
  }

  deleteUser(user: IUser): void {
    this.userService.deleteUser(user._id)
      .subscribe( data => {
        this.users = this.users.filter(u => u !== user);
      })
  };

  editUser(user: IUser): void {
    const modal = this.modalService.open(ManagestaffeditComponent);
    modal.componentInstance.currentID= user._id.toString();
    modal.result.then(()=>this.ngOnInit()).catch((err)=>console.log(err));
  };

  addUser(): void {
    const modal = this.modalService.open(ManagestaffaddComponent);
    modal.result.then(()=>this.ngOnInit()).catch((err)=>console.log(err));
  };
<<<<<<< HEAD
=======
  ngOnDestroy(): void {
    this.unsubscribe.unsubscribe();
  }
>>>>>>> e245057b0661a402ab5b7e5eb12d4c8c4b74208c
}