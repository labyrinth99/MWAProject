import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authenticate-student',
  templateUrl: './authenticate-student.component.html',
  styleUrls: ['./authenticate-student.component.css']
})
export class AuthenticateStudentComponent implements OnInit {

  email:string;

  user: Observable<any>;
  emailSent = false;

  errorMessage: string;

  constructor(private router: Router, private studentService: StudentService, public afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.user = this.afAuth.authState;

    const url = this.router.url;

    if (url.includes('signIn')) {
      this.confirmSignIn(url);
    }
  }
  // onSubmit(){
  //   if(!this.email)
  //   alert('Please Enter Your Email First');
  //   else{
  //   this.studentService.getStudentByEmail(this.email)
  //   .subscribe( async data => {
  //    console.log(data);
  //    if(data){
  //   //  alert(this.email);

  //   const actionCodeSettings = {
  //     // Your redirect URL
  //     url: 'https://localhost:4200/authenicatestudent',
  //     handleCodeInApp: true,
  //   };

  //   try {
  //     await this.afAuth.auth.sendSignInLinkToEmail(
  //       this.email,
  //       actionCodeSettings
  //     );
  //     window.localStorage.setItem('emailForSignIn', this.email);
  //     this.emailSent = true;
  //   } catch (err) {
  //     this.errorMessage = err.message;
  //   }





  //   // end of autheni
  //    }
  //    else
  //    alert("This Email is not registered");
  //   },(error)=>console.log(error));

  //   }

  // }



  // new stuff

  async sendEmailLink() {

    if(!this.email)
    alert('Please Enter Your Email First');
    else{
    const actionCodeSettings = {
      // Your redirect URL
      url: 'http://localhost:4200/authenicatestudent',
      handleCodeInApp: true,
    };

    try {
      await this.afAuth.auth.sendSignInLinkToEmail(
        this.email,
        actionCodeSettings
      );
      window.localStorage.setItem('emailForSignIn', this.email);
      this.emailSent = true;
    } catch (err) {
      this.errorMessage = err.message;
    }
  }
}


  async confirmSignIn(url) {
    try {
      if (this.afAuth.auth.isSignInWithEmailLink(url)) {
        let email = window.localStorage.getItem('emailForSignIn');

        // If missing email, prompt user for it
        if (!email) {
          email = window.prompt('Please provide your email for confirmation');
        }

        // Signin user and remove the email localStorage
        const result = await this.afAuth.auth.signInWithEmailLink(email, url);
        localStorage.setItem('student_email',email);
        window.localStorage.removeItem('emailForSignIn');
      }
    } catch (err) {
      this.errorMessage = err.message;
    }
  }


  redirect(){
    this.afAuth.auth.signOut();
    this.router.navigate(['examhome']);

  }

}
