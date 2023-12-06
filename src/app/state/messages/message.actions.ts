import { DocumentData, DocumentReference } from '@angular/fire/firestore';
import { createAction, props } from '@ngrx/store';
import {
  IMessage,
  IMessageResponse,
} from 'src/app/interfaces/message.interface';

export const sendMessage = createAction(
  '[Message] Send Message',
  props<{ message: IMessage; dialogId: string }>()
);

export const sendMessageSuccess = createAction(
  '[Message] Send Message Success'
);

export const sendMessageFailure = createAction(
  '[Message] Send Message Failure',
  props<{ error: any }>()
);

export const loadMessages = createAction(
  '[Message] Load Message Table',
  props<{ pageSize: number; pageIndex: number }>()
);

export const loadMessagesSuccess = createAction(
  '[Message] Load Message Table Complete',
  props<{ data: IMessageResponse }>()
);

export const loadMessagesFailure = createAction(
  '[Message] Load Message Table Failure',
  props<{ error: any }>()
);
