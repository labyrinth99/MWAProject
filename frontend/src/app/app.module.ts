import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { EnrollFormComponent } from './enroll-form/enroll-form.component';
import { StaffHomeComponent } from './staff-home/staff-home.component';
import { NewStudentsComponent } from './new-students/new-students.component';
import { EnrolledStudentsComponent } from './enrolled-students/enrolled-students.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ManageStaffComponent } from './manage-staff/manage-staff.component';
import { ManageQuestionsComponent } from './manage-questions/manage-questions.component';
import { AnsweredStudentsComponent } from './answered-students/answered-students.component';
import { GradeExamComponent } from './grade-exam/grade-exam.component';
import { ExamHomeComponent } from './exam-home/exam-home.component';
import { TakeExamComponent } from './take-exam/take-exam.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenService } from './services/intercept.service';

import {IAppState, INITIAL_STATE, rootReducer} from './redux/store'
import {NgRedux, NgReduxModule} from '@angular-redux/store';
import { FormsModule } from '@angular/forms';
import { ManagestaffaddComponent } from './managestaffadd/managestaffadd.component';
import { ManagestaffeditComponent } from './managestaffedit/managestaffedit.component';
import { ManagequestionsaddComponent } from './managequestionsadd/managequestionsadd.component';
import { ManagequestionseditComponent } from './managequestionsedit/managequestionsedit.component';
import { CountdownModule } from 'ngx-countdown';
import { AceEditorModule } from 'ng2-ace-editor';

import { AuthenticateStudentComponent } from './authenticate-student/authenticate-student.component'

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';


const firebaseConfig = {
  apiKey: "AIzaSyCtycFsyJSv4CUw2kNkOwrx1T3KFTnpVCQ",
  authDomain: "mwaproject-2693d.firebaseapp.com",
  databaseURL: "https://mwaproject-2693d.firebaseio.com",
  projectId: "mwaproject-2693d",
  storageBucket: "mwaproject-2693d.appspot.com",
  messagingSenderId: "628523953652"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EnrollFormComponent,
    StaffHomeComponent,
    NewStudentsComponent,
    EnrolledStudentsComponent,
    AdminHomeComponent,
    ManageStaffComponent,
    ManageQuestionsComponent,
    AnsweredStudentsComponent,
    GradeExamComponent,
    ExamHomeComponent,
    TakeExamComponent,
    HomeComponent,
    ManagestaffaddComponent,
    ManagestaffeditComponent,
    ManagequestionsaddComponent,
    ManagequestionseditComponent,
    AuthenticateStudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgReduxModule,
    FormsModule,
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AceEditorModule,
    CountdownModule,
    NgbModule.forRoot()

  ],
  providers: [{provide: HTTP_INTERCEPTORS,useClass:AuthenService, multi:true}],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(ngRedux:NgRedux<IAppState>){
    ngRedux.configureStore(rootReducer, INITIAL_STATE);
  }
}
