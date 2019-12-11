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
import { AssignmentOverviewComponent } from './components/dashboard/dashboard.component';
import { SearchAssignmentComponent } from './components/search-assignment/search-assignment.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateAssignmentComponent,
    HomeComponent,
    TagComponent,
    AssignmentOverviewComponent,
    SearchAssignmentComponent
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
    MatAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
