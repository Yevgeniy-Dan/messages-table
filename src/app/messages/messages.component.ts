import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MessageFormDialogComponent } from './message-form-dialog/message-form-dialog.component';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent {
  constructor(public dialog: MatDialog) {}

  openFormDialog(): void {
    const dialogRef = this.dialog.open(MessageFormDialogComponent, {
      width: '400px',
    });
  }
}
