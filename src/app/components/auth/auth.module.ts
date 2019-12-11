import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared.module';
import { SignUpCompanyComponent } from './sign-up-company/sign-up-company.component';
import { LoginComponent } from './login/login.component';
import { SignUpMakersComponent } from './sign-up-makers/sign-up-makers.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({

  declarations: [SignUpCompanyComponent, SignUpMakersComponent, LoginComponent, SignupComponent],

  imports: [
    CommonModule,
    MaterialModule,
    SharedModule
  ],
  // exports: [
  //   SignUpCompanyComponent,
  //   LoginComponent,
  //   SignUpMakersComponent
  // ]
})
export class AuthModule { }
