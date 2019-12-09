import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared.module';
import { SignUpMakersComponent } from './sign-up-makers/sign-up-makers.component';



@NgModule({
  declarations: [SignUpMakersComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule
  ]
})
export class SignUpModule { }
