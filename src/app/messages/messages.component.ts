import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { MessageFormDialogComponent } from './message-form-dialog/message-form-dialog.component';
import { Store } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { selectSendMessageLoading } from '../state/messages';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent {
  sendMessageLoading$: Observable<boolean> = this.store.select(
    selectSendMessageLoading
  );

  constructor(public dialog: MatDialog, private store: Store<IAppState>) {}

  openFormDialog(): void {
    const dialogRef = this.dialog.open(MessageFormDialogComponent, {
      width: '400px',
    });
  }
}
