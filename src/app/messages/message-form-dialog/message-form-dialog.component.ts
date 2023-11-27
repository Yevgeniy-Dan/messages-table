import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-message-form-dialog',
  templateUrl: './message-form-dialog.component.html',
  styleUrls: ['./message-form-dialog.component.scss'],
})
export class MessageFormDialogComponent {
  messageFormGroup: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    message: ['', Validators.required],
  });

  constructor(
    dialogRef: MatDialogRef<MessageFormDialogComponent>,
    private formBuilder: FormBuilder
  ) {}

  onSubmit(): void {
    //TODO: send request to firebase doc collection
    console.log('MessageFormDialogComponent: Sending request...');
  }
}
