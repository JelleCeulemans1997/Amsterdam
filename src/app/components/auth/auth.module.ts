import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared.module';
import { CompanyCredentialsComponent } from '../company/company-credentials/company-credentials.component';
import { LoginComponent } from './login/login.component';
import { SignUpMakersComponent } from './sign-up-makers/sign-up-makers.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({

  declarations: [CompanyCredentialsComponent, SignUpMakersComponent, LoginComponent, SignupComponent],

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
