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

@NgModule({
  declarations: [
    AppComponent,
    CreateAssignmentComponent,
    HomeComponent,
    TagComponent,
    OverviewComponent,
    CompanyDashboardComponent,
    NavigationComponent,
    CompanyAssignmentdetailComponent
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
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
