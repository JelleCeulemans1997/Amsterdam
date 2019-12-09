import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  firstFormGroup = this.fb.group({
    firstCtrl: ['', Validators.required]
  })

  secondFormGroup = this.fb.group({
    secondCtrl: ['']
  })

}
