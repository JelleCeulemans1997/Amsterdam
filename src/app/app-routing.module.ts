import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CreateAssignmentComponent } from './components/assignment/create-assignment/create-assignment.component';
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
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { DeveloperProfileComponent } from './components/developer/developer-profile/developer-profile.component';
import { AdminCompaniesComponent } from './components/admin/admin-companies/admin-companies.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'createAssignment', component: CreateAssignmentComponent, canActivate: [AuthGuard], data: {role: Role.Company}},
  { path: 'editAssignment/:assignmentId', component: CreateAssignmentComponent, canActivate: [AuthGuard], data: {role: Role.Company}},
  { path: 'login', component: LoginComponent },
  { path: 'tags', component: AdminTagsComponent, canActivate: [AuthGuard], data: {role: Role.Admin} },
  { path: 'overview', component: OverviewComponent},
  { path: 'companyassignmentdetail/:assignmentId', component: CompanyAssignmentdetailComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'company', component: CompanyDashboardComponent, canActivate: [AuthGuard], data: {role: Role.Company}},
  { path: 'signup', component: SignupComponent },
  { path: 'companyCredentials', component: CompanyCredentialsComponent, canActivate: [AuthGuard], data: {role: Role.Company}},
  { path: 'developerDashboard', component: DeveloperDashboardComponent, canActivate: [AuthGuard], data: {role: Role.Developer}},
  { path: 'companyProfile/:creatorId', component: CompanyProfileComponent, canActivate: [AuthGuard], data: {role: Role.Company}},
  { path: 'developerCredentials', component: DeveloperCredentialsComponent, canActivate: [AuthGuard], data: {role: Role.Developer}},
  { path: 'adminDashboard', component: AdminDashboardComponent, canActivate: [AuthGuard], data: {role: Role.Admin}},
  { path: 'companyProfile/:creatorId', component: CompanyProfileComponent},
  { path: 'developerCredentials', component: DeveloperCredentialsComponent, canActivate: [AuthGuard], data: {role: Role.Developer} },
  { path: 'developerProfile/:userId', component: DeveloperProfileComponent},
  { path: 'companies', component: AdminCompaniesComponent, canActivate: [AuthGuard], data: {role: Role.Admin}},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
