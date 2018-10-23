import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { IUser } from '../redux/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManagestaffaddComponent } from '../managestaffadd/managestaffadd.component';
import { ManagestaffeditComponent } from '../managestaffedit/managestaffedit.component';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-manage-staff',
  templateUrl: './manage-staff.component.html',
  styleUrls: ['./manage-staff.component.css']
})
export class ManageStaffComponent implements OnInit {

  @select('users') rusers:Observable<IUser[]>;
  users: IUser[];

  constructor(private modalService: NgbModal,private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers();
    this.rusers.subscribe((data)=>{this.users=data.slice(0,data.length-1);});
  }

  deleteUser(user: IUser): void {
    this.userService.deleteUser(user._id);
  /*    .subscribe( data => {
        this.users = this.users.filter(u => u !== user);
      })*/
  };

  editUser(user: IUser): void {
    console.log("edit");
    const modal = this.modalService.open(ManagestaffeditComponent);
    console.log("open");
    modal.componentInstance.currentID= user._id.toString();
    console.log("add ID");
    //modal.result.then(()=>this.ngOnInit()).catch((err)=>console.log(err));
  };

  addUser(): void {
    console.log("users:", this.users);
    const modal = this.modalService.open(ManagestaffaddComponent);
    //modal.result.then(()=>this.ngOnInit()).catch((err)=>console.log(err));
  };
}