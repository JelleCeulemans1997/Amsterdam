import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { SharedModule } from './shared.module';
import { CreateAssignmentComponent } from './components/assignment/create-assignment/create-assignment.component';
import { HomeComponent } from './components/home/home.component';
import { TagComponent } from './components/tag/tag.component';
import { AuthModule } from './components/auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { OverviewComponent } from './components/overview/overview.component';
import { CompanyDashboardComponent } from './components/company/company-dashboard/company-dashboard.component';
import { NavigationComponent } from './components/company/company-dashboard/navigation/navigation.component';
import {MatBadgeModule} from '@angular/material/badge';
import { CompanyAssignmentdetailComponent } from './components/company/company-assignmentdetail/company-assignmentdetail.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { DeveloperDashboardComponent } from './components/developer-dashboard/developer-dashboard.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './app.reducer';
import { AuthGuard } from './components/auth/auth.guard';
import { CompanyProfileComponent } from './components/company/company-profile/company-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateAssignmentComponent,
    HomeComponent,
    TagComponent,
    OverviewComponent,
    CompanyDashboardComponent,
    NavigationComponent,
    CompanyAssignmentdetailComponent,
    DeveloperDashboardComponent,
    CompanyProfileComponent
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
    MatBadgeModule,
    MatProgressSpinnerModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
