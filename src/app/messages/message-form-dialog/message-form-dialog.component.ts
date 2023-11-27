import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { IMessage } from 'src/app/interfaces/message.interface';
import { DataService } from 'src/app/services/data.service';
import { IAppState } from 'src/app/state/app.state';
import { sendMessage } from 'src/app/state/messages';

@Component({
  selector: 'app-message-form-dialog',
  templateUrl: './message-form-dialog.component.html',
  styleUrls: ['./message-form-dialog.component.scss'],
})
export class MessageFormDialogComponent {
  messageForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    message: ['', Validators.required],
  });

  constructor(
    dialogRef: MatDialogRef<MessageFormDialogComponent>,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private store: Store<IAppState>
  ) {}

  onSubmit(): void {
    const messageRecord: IMessage = {
      name: this.name,
      message: this.message,
    };
    this.store.dispatch(sendMessage({ message: messageRecord }));
  }

  get name(): string {
    return this.messageForm.get('name')?.value;
  }

  get message(): string {
    return this.messageForm.get('message')?.value;
  }
}
