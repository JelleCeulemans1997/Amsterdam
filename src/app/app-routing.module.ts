import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CreateAssignmentComponent } from './components/assignment/create-assignment/create-assignment.component';
import { LoginComponent } from './components/auth/login/login.component';
import { TagComponent } from './components/tag/tag.component';

import { Role } from './models/role.enum';
import { OverviewComponent } from './components/overview/overview.component';
import { CompanyDashboardComponent } from './components/company/company-dashboard/company-dashboard.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { CompanyCredentialsComponent } from './components/company/company-credentials/company-credentials.component';
import {CompanyAssignmentdetailComponent} from './components/company/company-assignmentdetail/company-assignmentdetail.component';
import { DeveloperDashboardComponent } from './components/developer-dashboard/developer-dashboard.component';
import { AuthGuard } from './components/auth/auth.guard';
import { CompanyProfileComponent } from './components/company/company-profile/company-profile.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'createAssignment', component: CreateAssignmentComponent, canActivate: [AuthGuard], data: {role: Role.Company}},
  { path: 'editAssignment/:assignmentId', component: CreateAssignmentComponent, canActivate: [AuthGuard], data: {role: Role.Company}},
  { path: 'login', component: LoginComponent },
  { path: 'tag', component: TagComponent, canActivate: [AuthGuard], data: {role: Role.Admin} },
  { path: 'overview', component: OverviewComponent},
  { path: 'companyassignmentdetail/:assignmentId', component: CompanyAssignmentdetailComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'company', component: CompanyDashboardComponent, canActivate: [AuthGuard], data: {role: Role.Company}},
  { path: 'signup', component: SignupComponent },
  { path: 'companyCredentials', component: CompanyCredentialsComponent, canActivate: [AuthGuard], data: {role: Role.Company}},
  { path: 'developerDashboard', component: DeveloperDashboardComponent, canActivate: [AuthGuard], data: {role: Role.Developer}},
  { path: 'companyProfile/:creatorId', component: CompanyProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
