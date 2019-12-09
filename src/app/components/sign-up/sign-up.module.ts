import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared.module';
import { SignUpCompanyComponent } from './sign-up-company/sign-up-company.component';
import { SignInComponent } from './sign-in/sign-in.component';



@NgModule({
  declarations: [SignUpCompanyComponent, SignUpComponent, SignInComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule
  ],
  exports: [
    SignUpCompanyComponent,
    SignUpComponent,
    SignInComponent
  ]
})
export class SignUpModule { }
