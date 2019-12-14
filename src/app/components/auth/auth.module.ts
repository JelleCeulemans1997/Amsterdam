import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared.module';
import { CompanyCredentialsComponent } from '../company/company-credentials/company-credentials.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({

  declarations: [CompanyCredentialsComponent, LoginComponent, SignupComponent],

  imports: [
    CommonModule,
    MaterialModule,
    SharedModule
  ]
})
export class AuthModule { }
