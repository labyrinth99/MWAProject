import { Component } from '@angular/core';
import { CommonService } from './services/CommonService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Student Pre-Qualification System';
  constructor(private comon:CommonService,private router:Router){

  }
  logout(){
    this.comon.Logout();
    this.router.navigate(['home']);
  }
}
