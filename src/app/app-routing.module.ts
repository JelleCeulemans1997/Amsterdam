import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CreateAssignmentComponent } from './components/create-assignment/create-assignment.component';
import { SignUpComponent } from './components/sign-up/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-up/sign-in/sign-in.component';
import { TagComponent } from './components/tag/tag.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'createAssignment', component: CreateAssignmentComponent },
  { path: 'signUp', component: SignUpComponent },
  { path: 'signIn', component: SignInComponent },
  { path: 'tag', component: TagComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
