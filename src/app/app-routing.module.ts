import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CreateAssignmentComponent } from './components/create-assignment/create-assignment.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'createAssignment', component: CreateAssignmentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
