import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from "../services/CommonService";
import { Router, NavigationEnd } from '@angular/router';
import { first } from 'rxjs/operators';
interface Credentials { username:string, password:string}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  wrongeCredentials=false;
  credentials:Credentials;
  myForm: FormGroup;
  constructor(private formBuilder:FormBuilder, private common:CommonService,private router:Router) {
    this.myForm = formBuilder.group({
        'email': ['', [
          Validators.required,
          Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
        ]],
      'password': ['', Validators.required]
    });

   }

  ngOnInit() {
    this.wrongeCredentials=false;
  }

  onLogin() {

    this.credentials={username:this.myForm.get('email').value,password:this.myForm.get('password').value};
    this.common.login(this.credentials).pipe(first())
    .subscribe(
        data => {
            if(data.role == 1) {
              this.router.navigate(['admin']);
            }
            else if (data.role == 2){
              this.router.navigate(['staffhome']);
            }
        },
        error => {
            this.wrongeCredentials=true;
        });
  }
  navigate(route){
    this.router.navigate([route]);
  }
}

