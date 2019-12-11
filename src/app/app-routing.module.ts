import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CreateAssignmentComponent } from './components/create-assignment/create-assignment.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { LoginComponent } from './components/auth/login/login.component';
import { TagComponent } from './components/tag/tag.component';

import { AuthGuard } from './guards/auth.guard';
import { Role } from './models/role';
import { SearchAssignmentComponent } from './components/search-assignment/search-assignment.component';
import { AssignmentOverviewComponent } from './components/dashboard/dashboard.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'createAssignment', component: CreateAssignmentComponent},
  { path: 'searchAssignment', component: SearchAssignmentComponent},
  { path: 'editAssignment/:assignmentId', component: CreateAssignmentComponent},
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'tag', component: TagComponent },
  { path: 'assignmentOverview', component: AssignmentOverviewComponent },
  { path: 'search', component: SearchAssignmentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
