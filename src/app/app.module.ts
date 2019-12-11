import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { SharedModule } from './shared.module';
import { CreateAssignmentComponent } from './components/create-assignment/create-assignment.component';
import { HomeComponent } from './components/home/home.component';
import { TagComponent } from './components/tag/tag.component';
import { AuthModule } from './components/auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { CompanyComponent } from './components/company/company.component';
import { SearchAssignmentComponent } from './components/search-assignment/search-assignment.component';
import {AssignmentviewComponent} from './components/company/assignmentview/assignmentview.component';
import {AssignmentlistComponent} from './components/company/assignmentlist/assignmentlist.component';
import {CompanyDashboardComponent} from './components/company/company-dashboard/company-dashboard.component';
import { AssignmentModule } from './components/assignment/assignment.module';
import { AssignmentOverviewComponent } from './components/assignment-overview/assignment-overview.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateAssignmentComponent,
    HomeComponent,
    CompanyComponent,
    TagComponent,
    SearchAssignmentComponent,
    CompanyComponent,
    AssignmentviewComponent,
    AssignmentlistComponent,
    CompanyDashboardComponent,
    AssignmentOverviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule,
    AuthModule,
    HttpClientModule,
    FormsModule,
    MatAutocompleteModule,
    AssignmentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
