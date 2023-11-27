import { DocumentData, DocumentReference } from '@angular/fire/firestore';
import { createAction, props } from '@ngrx/store';
import { IMessage } from 'src/app/interfaces/message.interface';

export const sendMessage = createAction(
  '[Message] Send Message',
  props<{ message: IMessage; dialogId: string }>()
);

export const sendMessageSuccess = createAction(
  '[Message] Send Message Success',
  props<{ messageId: string }>()
);

export const sendMessageFailure = createAction(
  '[Message] Send Message Failure',
  props<{ error: any }>()
);
