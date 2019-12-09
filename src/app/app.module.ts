import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { SharedModule } from './shared.module';
import { CreateAssignmentComponent } from './components/create-assignment/create-assignment.component';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up/sign-up.component';
import { SignUpMakersComponent } from './components/sign-up/sign-up-makers/sign-up-makers.component';
import { SignUpModule } from './components/sign-up/sign-up.module';


@NgModule({
  declarations: [
    AppComponent,
    CreateAssignmentComponent,
    HomeComponent,
    SignUpComponent,
    SignUpMakersComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule,
    SignUpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
