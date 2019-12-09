import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared.module';
import { SignUpCompanyComponent } from './sign-up-company/sign-up-company.component';
import { SignUpMakersComponent } from './sign-up-makers/sign-up-makers.component';




@NgModule({
  declarations: [SignUpCompanyComponent, SignUpComponent, SignUpMakersComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule
  ],
  exports: [
    SignUpCompanyComponent,
    SignUpComponent,
    SignUpMakersComponent
  ]
})
export class SignUpModule { }
