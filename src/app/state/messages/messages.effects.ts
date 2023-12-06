import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap, take, switchMap } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
  loadMessages,
  loadMessagesFailure,
  loadMessagesSuccess,
  sendMessage,
  sendMessageFailure,
  sendMessageSuccess,
} from './message.actions';

import { MessagesService } from 'src/app/services/messages.service';
import { IMessage } from 'src/app/interfaces/message.interface';

@Injectable()
export class MessageEffects {
  loadMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMessages),
      switchMap((action: { pageSize: number; pageIndex: number }) => {
        return this.messagesService.getMessages().pipe(
          map((response) => {
            const skip = action.pageIndex * action.pageSize;
            const paginatedMessages = response.messages.slice(
              skip,
              action.pageSize * (action.pageIndex + 1)
            );
            console.log(action);
            console.log(paginatedMessages);
            console.log(response.messages);
            return loadMessagesSuccess({
              data: {
                messages: paginatedMessages,
                totalCount: response.totalCount,
              },
            });
          }),
          catchError((error) => of(loadMessagesFailure({ error })))
        );
      })
    )
  );

  sendMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sendMessage),
      mergeMap((action: { message: IMessage; dialogId: string }) => {
        return this.messagesService.createMessage(action.message).pipe(
          map((docRef) => {
            //TODO: should I pass `dialogId` further along the props?
            this.matDialog.getDialogById(action.dialogId)?.close();
            return sendMessageSuccess();
          }),
          catchError((error) => of(sendMessageFailure({ error })))
        );
      })
    )
  );

  sendMessageFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(sendMessageFailure),
        tap((action: { error: any }) => {
          const errorMessage: string =
            (action.error && action.error.error && action.error.error.error) ||
            'Something went wrong';
          this.handleError(errorMessage);
        })
      ),
    { dispatch: false }
  );

  sendMessageSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(sendMessageSuccess),
        tap(() => {
          this.handleSuccess();
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private messagesService: MessagesService,
    private matDialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  handleError(errorMessage: string): void {
    this._snackBar.open(errorMessage, 'Close', {
      duration: 5000,
    });
  }

  handleSuccess(): void {
    this._snackBar.open('Your message has been successfully added!', 'Close', {
      duration: 5000,
    });
  }
}
