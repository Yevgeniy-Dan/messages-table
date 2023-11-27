import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable, Subscription, map } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MessageFormDialogComponent } from './message-form-dialog/message-form-dialog.component';
import { Store } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import {
  loadMessages,
  selectMessageData,
  selectSendMessageLoading,
} from '../state/messages';
import { IMessage, IMessageTable } from '../interfaces/message.interface';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['name', 'message'];

  dataSource = new MatTableDataSource<IMessage>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  sendMessageLoading$: Observable<boolean> = this.store.select(
    selectSendMessageLoading
  );
  messages$: Observable<IMessageTable> = this.store
    .select(selectMessageData)
    .pipe(map((messageData) => messageData));
  private messagesSubscription!: Subscription;

  constructor(
    public dialog: MatDialog,
    private store: Store<IAppState>,
    private firestore: Firestore
  ) {}

  ngOnInit(): void {
    this.loadMessageTable();
    this.messagesSubscription = this.messages$.subscribe(
      (data: IMessageTable) => {
        this.dataSource.data = data.data;
      }
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.messagesSubscription.unsubscribe();
  }

  openFormDialog(): void {
    const dialogRef = this.dialog.open(MessageFormDialogComponent, {
      width: '400px', //TODO: make wider
    });
  }

  /**
   * Load messages table from firestore and ngrx store
   */
  private loadMessageTable(): void {
    this.store.dispatch(loadMessages());
  }
}
