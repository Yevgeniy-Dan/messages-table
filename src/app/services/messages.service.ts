import { Injectable } from '@angular/core';
import {
  DocumentData,
  DocumentReference,
  Firestore,
  FirestoreError,
  addDoc,
  collection,
  collectionData,
  orderBy,
  query,
  startAfter,
  limit,
  getDocs,
  startAt,
  Timestamp,
} from '@angular/fire/firestore';
import {
  EMPTY,
  Observable,
  from,
  map,
  mergeMap,
  of,
  switchMap,
  toArray,
} from 'rxjs';
import { IMessage, IMessageResponse } from '../interfaces/message.interface';
import { Store } from '@ngrx/store';
import { IAppState } from '../state/app.state';

@Injectable()
export class MessagesService {
  private messagesCollection = collection(this.firestore, 'messages');
  constructor(private firestore: Firestore, private store: Store<IAppState>) {}

  getMessages(): Observable<IMessageResponse> {
    const messageCollection = this.messagesCollection;

    const query$ = collectionData(
      query(messageCollection, orderBy('createdAt', 'desc'))
    );

    return query$.pipe(
      map((messages: DocumentData[]) => ({
        messages: messages as IMessage[],
        totalCount: messages.length,
      }))
    );
  }

  createMessage(messageRecord: IMessage): Observable<DocumentData> {
    const { name, message, createdAt } = messageRecord;
    return from(
      addDoc(this.messagesCollection, {
        name,
        message,
        createdAt,
      }).catch((error: FirestoreError) => {
        throw error.message;
      })
    );
  }
}
