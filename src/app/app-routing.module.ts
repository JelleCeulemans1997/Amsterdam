import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateAssignmentComponent } from './components/company/assignment/create-assignment/create-assignment.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AdminTagsComponent } from './components/admin/admin-tags/admin-tags.component';

import { Role } from './models/role.enum';
import { OverviewComponent } from './components/overview/overview.component';
import { CompanyDashboardComponent } from './components/company/company-dashboard/company-dashboard.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { CompanyCredentialsComponent } from './components/company/company-credentials/company-credentials.component';
import {CompanyAssignmentdetailComponent} from './components/company/company-assignmentdetail/company-assignmentdetail.component';
import { DeveloperDashboardComponent } from './components/developer/developer-dashboard/developer-dashboard.component';
import { AuthGuard } from './components/auth/auth.guard';
import { CompanyProfileComponent } from './components/company/company-profile/company-profile.component';
import { DeveloperCredentialsComponent } from './components/developer/developer-credentials/developer-credentials.component';
import { DeveloperProfileComponent } from './components/developer/developer-profile/developer-profile.component';
import { AdminCompaniesComponent } from './components/admin/admin-companies/admin-companies.component';
import { AdminDevelopersComponent } from './components/admin/admin-developers/admin-developers.component';
import { AdminAssignmentsComponent } from './components/admin/admin-assignments/admin-assignments.component';
import { AssignmentdetailComponent } from './components/company/assignment/assignmentdetail/assignmentdetail.component';
import {DeveloperprofileComponent} from './components/company/company-dashboard/developerprofile/developerprofile.component';
import {EditassignmentComponent} from './components/company/company-dashboard/editassignment/editassignment.component';



const routes: Routes = [
  // { path: '', component: HomeComponent },
  { path: 'createAssignment', component: CreateAssignmentComponent, canActivate: [AuthGuard], data: {role: Role.Company}},
  { path: 'editAssignment/:assignmentId', component: CreateAssignmentComponent, canActivate: [AuthGuard], data: {role: Role.Company}},
  { path: 'editCompanyAssignment/:assignmentId', component: EditassignmentComponent, canActivate: [AuthGuard], data: {role: Role.Company}},
  { path: 'login', component: LoginComponent },
  { path: 'tags', component: AdminTagsComponent, canActivate: [AuthGuard], data: {role: Role.Admin} },
  { path: '', component: OverviewComponent},
  { path: 'companyAssignmentdetail/:assignmentId', component: CompanyAssignmentdetailComponent},
  { path: 'assignmentdetail/:assignmentId', component: AssignmentdetailComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'company', component: CompanyDashboardComponent, canActivate: [AuthGuard], data: {role: Role.Company}},
  { path: 'signup', component: SignupComponent },
  { path: 'companyCredentials', component: CompanyCredentialsComponent, canActivate: [AuthGuard], data: {role: Role.Company}},
  { path: 'developerDashboard', component: DeveloperDashboardComponent, canActivate: [AuthGuard], data: {role: Role.Developer}},
  { path: 'companyProfile/:creatorId', component: CompanyProfileComponent},
  { path: 'developerCredentials', component: DeveloperCredentialsComponent, canActivate: [AuthGuard], data: {role: Role.Developer}},
  { path: 'developerProfile/:userId', component: DeveloperProfileComponent},
  { path: 'developerdetails/:userId', component: DeveloperprofileComponent},
  { path: 'companies', component: AdminCompaniesComponent, canActivate: [AuthGuard], data: {role: Role.Admin}},
  { path: 'developers', component: AdminDevelopersComponent, canActivate: [AuthGuard], data: {role: Role.Admin}},
  { path: 'assignments', component: AdminAssignmentsComponent, canActivate: [AuthGuard], data: {role: Role.Admin}},
  { path: '**', component: OverviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
