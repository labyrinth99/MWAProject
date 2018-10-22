import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AuthenGuard } from './guards/authen.guard';
import { AnsweredStudentsComponent } from './answered-students/answered-students.component';
import { EnrollFormComponent } from './enroll-form/enroll-form.component';
import { ExamHomeComponent } from './exam-home/exam-home.component';
import { GradeExamComponent } from './grade-exam/grade-exam.component';
import { ManageQuestionsComponent } from './manage-questions/manage-questions.component';
import { ManageStaffComponent } from './manage-staff/manage-staff.component';
import { NewStudentsComponent } from './new-students/new-students.component';
import { StaffHomeComponent } from './staff-home/staff-home.component';
import { TakeExamComponent } from './take-exam/take-exam.component';
import { ManagestaffaddComponent } from './managestaffadd/managestaffadd.component';
import { ManagestaffeditComponent } from './managestaffedit/managestaffedit.component';

const routes: Routes = [
  {path:'', component:HomeComponent,pathMatch:'full'},
  {path:'home',redirectTo:'/'},
  {path:'login',component:LoginComponent},
  {path:'enrollform',component:EnrollFormComponent},
  {path:'admin',component:AdminHomeComponent,canActivate:[AuthenGuard]},
  {path:'answeredstudents',component:AnsweredStudentsComponent,canActivate:[AuthenGuard]},
  {path:'examhome',component:ExamHomeComponent,canActivate:[AuthenGuard]},
  {path:'gradexam',component:GradeExamComponent,canActivate:[AuthenGuard]},
  {path:'managequestions',component:ManageQuestionsComponent,canActivate:[AuthenGuard]},
  {path:'managestaff',component:ManageStaffComponent,canActivate:[AuthenGuard]},
  {path:'managestaffadd',component:ManagestaffaddComponent, canActivate:[AuthenGuard]},
  {path:'managestaffedit',component:ManagestaffeditComponent, canActivate:[AuthenGuard]},
  {path:'newstudents',component:NewStudentsComponent,canActivate:[AuthenGuard]},
  {path:'staffhome',component:StaffHomeComponent,canActivate:[AuthenGuard]},
  {path:'takeexam',component:TakeExamComponent,canActivate:[AuthenGuard]},
  {path:'**',redirectTo:'/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
