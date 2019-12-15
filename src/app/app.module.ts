import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { SharedModule } from './shared.module';
import { CreateAssignmentComponent } from './components/company/assignment/create-assignment/create-assignment.component';
import { AdminTagsComponent } from './components/admin/admin-tags/admin-tags.component';
import { AuthModule } from './components/auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { OverviewComponent } from './components/overview/overview.component';
import { CompanyDashboardComponent } from './components/company/company-dashboard/company-dashboard.component';
import { NavigationComponent } from './components/company/company-dashboard/navigation/navigation.component';
import { MatBadgeModule} from '@angular/material/badge';
import { CompanyAssignmentdetailComponent } from './components/company/company-assignmentdetail/company-assignmentdetail.component';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { DeveloperDashboardComponent } from './components/developer/developer-dashboard/developer-dashboard.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './app.reducer';
import { AuthGuard } from './components/auth/auth.guard';
import { CompanyProfileComponent } from './components/company/company-profile/company-profile.component';
import { DeveloperCredentialsComponent } from './components/developer/developer-credentials/developer-credentials.component';
import { DeveloperProfileComponent } from './components/developer/developer-profile/developer-profile.component';
import { AdminCompaniesComponent } from './components/admin/admin-companies/admin-companies.component';
import { MatSortModule } from '@angular/material';
import { AdminDevelopersComponent } from './components/admin/admin-developers/admin-developers.component';
import { AdminAssignmentsComponent } from './components/admin/admin-assignments/admin-assignments.component';
import { AssignmentdetailComponent } from './components/company/assignment/assignmentdetail/assignmentdetail.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';

import * as firebase from 'firebase/app';
import { DeveloperprofileComponent } from './components/company/company-dashboard/developerprofile/developerprofile.component';
import { EditassignmentComponent } from './components/company/company-dashboard/editassignment/editassignment.component';
import { DialogDeleteComponent } from './components/dialog-delete/dialog-delete.component';
import {DatePipe} from '@angular/common';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

firebase.initializeApp(environment.firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    CreateAssignmentComponent,
    AdminTagsComponent,
    OverviewComponent,
    CompanyDashboardComponent,
    NavigationComponent,
    CompanyAssignmentdetailComponent,
    DeveloperDashboardComponent,
    CompanyProfileComponent,
    DeveloperCredentialsComponent,
    DeveloperProfileComponent,
    AdminCompaniesComponent,
    AdminDevelopersComponent,
    AdminAssignmentsComponent,
    AssignmentdetailComponent,
    DeveloperprofileComponent,
    EditassignmentComponent,
    DialogDeleteComponent
  ],
  imports: [
    // AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserModule,
    MatSortModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule,
    AuthModule,
    HttpClientModule,
    FormsModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    StoreModule.forRoot(reducers),
    AngularFireStorageModule,
    AngularFontAwesomeModule
  ],
  providers: [AuthGuard, DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [DialogDeleteComponent],
})
export class AppModule { }
