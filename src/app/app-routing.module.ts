import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CreateAssignmentComponent } from './components/create-assignment/create-assignment.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { LoginComponent } from './components/auth/login/login.component';
import { TagComponent } from './components/tag/tag.component';
import {CompanyComponent} from './components/company/company.component';
import {CompanyDashboardComponent} from './components/company/company-dashboard/company-dashboard.component';

import { AuthGuard } from './guards/auth.guard';
import { Role } from './models/role';
import { SearchAssignmentComponent } from './components/search-assignment/search-assignment.component';
import { AssignmentdetailComponent } from './components/assignment/assignmentdetail/assignmentdetail.component';
import { AssignmentOverviewComponent } from './components/assignment-overview/assignment-overview.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'createAssignment', component: CreateAssignmentComponent},
  { path: 'searchAssignment', component: SearchAssignmentComponent},
  { path: 'editAssignment/:assignmentId', component: CreateAssignmentComponent},
  { path: 'signUp', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'tag', component: TagComponent },
  { path: 'companyhomepage', component: CompanyComponent },
  { path: 'companydashboard/:assignmentId', component: CompanyDashboardComponent },
  { path: 'assignmentDetail/:assignmentId', component: AssignmentdetailComponent },
  { path: 'assignmentOverview', component: AssignmentOverviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
