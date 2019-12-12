import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CreateAssignmentComponent } from './components/create-assignment/create-assignment.component';
import { SignUpComponent } from './components/sign-up/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-up/sign-in/sign-in.component';
import { TagComponent } from './components/tag/tag.component';
import {CompanyComponent} from './components/company/company.component';
import {CompanyDashboardComponent} from './components/company/company-dashboard/company-dashboard.component';

import { AuthGuard } from './guards/auth.guard';
import { Role } from './models/role';
import { SearchAssignmentComponent } from './components/search-assignment/search-assignment.component';
import { AssignmentdetailComponent } from './components/assignment/assignmentdetail/assignmentdetail.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'createAssignment', component: CreateAssignmentComponent},
  { path: 'searchAssignment', component: SearchAssignmentComponent},
  { path: 'editAssignment/:assignmentId', component: CreateAssignmentComponent},
  { path: 'signup', component: SignUpComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'tag', component: TagComponent },
  { path: 'companyhomepage', component: CompanyComponent },
  { path: 'companydashboard/:assignmentId', component: CompanyDashboardComponent },
  { path: 'assignmentDetail/:assignmentId', component: AssignmentdetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
