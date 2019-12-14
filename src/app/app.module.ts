import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { SharedModule } from './shared.module';
import { CreateAssignmentComponent } from './components/company/assignment/create-assignment/create-assignment.component';
import { HomeComponent } from './components/home/home.component';
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
import { NicknameDeveloperPipe } from './pipes/nicknameDeveloper.pipe';
import { AdminDevelopersComponent } from './components/admin/admin-developers/admin-developers.component';
import { AdminAssignmentsComponent } from './components/admin/admin-assignments/admin-assignments.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateAssignmentComponent,
    HomeComponent,
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
    NicknameDeveloperPipe,
    AdminDevelopersComponent,
    AdminAssignmentsComponent
  ],
  imports: [
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
    StoreModule.forRoot(reducers)
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
