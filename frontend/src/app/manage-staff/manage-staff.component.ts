import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
export class ManageStaffComponent implements OnInit {

  users: IUser[];

  constructor(private cd:ChangeDetectorRef,private modalService: NgbModal,private router: Router, private userService: UserService) { }

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
    localStorage.removeItem("editUserId");
    localStorage.setItem("editUserId", user._id.toString());
    const modal = this.modalService.open(ManagestaffeditComponent);
    modal.result.then(()=>this.ngOnInit());
  };

  addUser(): void {
    const modal = this.modalService.open(ManagestaffaddComponent);
    modal.result.then(()=>this.ngOnInit());
  };
}