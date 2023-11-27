import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import {
  sendMessage,
  sendMessageFailure,
  sendMessageSuccess,
} from './message.actions';

import { DataService } from 'src/app/services/data.service';
import { IMessage } from 'src/app/interfaces/message.interface';

@Injectable()
export class MessageEffects {
  sendMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sendMessage),
      mergeMap((action: { message: IMessage }) => {
        return this.dataService
          .createMessage(action.message.name, action.message.message)
          .pipe(
            map((docRef) => {
              return sendMessageSuccess({ messageId: docRef.id });
            }),
            catchError((error) => of(sendMessageFailure({ error })))
          );
      })
    )
  );

  constructor(private actions$: Actions, private dataService: DataService) {}
}
