import { Component, OnInit,Inject } from '@angular/core';
import { inject } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialogRef} from "@angular/material/dialog"
import {MAT_DIALOG_DATA} from "@angular/material/dialog"
import { getMatFormFieldMissingControlError } from '@angular/material/form-field';


@Component({
  selector: 'app-my-dialog',
  templateUrl: './my-dialog.component.html',
  styleUrls: ['./my-dialog.component.scss']
})
export class MyDialogComponent implements OnInit {

  
  constructor(public dialogRef: MatDialogRef<MyDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: string) { }

  form: FormGroup;
  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      message: new FormControl('',[Validators.required])
    })
  }

  onCloseSubmit(){
  var emailError = this.getEmailErrorMessage()
  var messageError = this.getMessageErrorMessage()

  if (emailError == '' && messageError == '') this.dialogRef.close(this.form.value);
  }

  onCloseCancel(){
    this.dialogRef.close('Cancel');
  }

  getEmailErrorMessage() {
    if (this.form.controls.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.form.controls.email.hasError('email') ? 'Not a valid email' : '';
  }

  getMessageErrorMessage() {
    if (this.form.controls.message.hasError('required')) {
      return 'You must enter a value';
    }

    else {
      return '';
    }
  }

}
