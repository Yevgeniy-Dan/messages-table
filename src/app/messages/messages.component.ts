import {
  AfterViewInit,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  Observable,
  Subject,
  Subscription,
  first,
  map,
  of,
  shareReplay,
  take,
  takeUntil,
  tap,
} from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
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

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['name', 'message', 'createdAt'];

  dataSource = new MatTableDataSource<IMessage>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  sendMessageLoading$: Observable<boolean> = this.store.select(
    selectSendMessageLoading
  );
  messages$: Observable<IMessageTable> = this.store.select(selectMessageData);

  pageIndex: number = 0;
  pageSize: number = 10;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(public dialog: MatDialog, private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.loadMessageTable();
    this.messages$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: IMessageTable) => {
        this.dataSource.data = data.data;
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openFormDialog(): void {
    this.dialog.open(MessageFormDialogComponent, {
      width: '400px',
    });
  }

  /**
   * Load messages table from firestore and ngrx store
   */
  private loadMessageTable(): void {
    this.store.dispatch(
      loadMessages({ pageIndex: this.pageIndex, pageSize: this.pageSize })
    );
  }

  onChangePage(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    this.store.dispatch(
      loadMessages({
        pageSize: event.pageSize,
        pageIndex: event.pageIndex,
      })
    );
  }
}
