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
export class DataService {
  constructor(private firestore: Firestore, private store: Store<IAppState>) {}

  getMessages(
    pageSize: number,
    pageIndex: number
  ): Observable<IMessageResponse> {
    const messageCollection = collection(this.firestore, 'messages');

    const startAfterDocRef$ =
      pageIndex > 0
        ? from(this.getLastVisibleDocumentRef(pageIndex, pageSize))
        : null;

    const paginatedQuery$ = startAfterDocRef$
      ? startAfterDocRef$.pipe(
          switchMap((snapshot) => {
            return collectionData(
              query(
                messageCollection,
                orderBy('createdAt', 'desc'),
                startAfter(snapshot['createdAt']),
                limit(pageSize)
              )
            );
          })
        )
      : collectionData(
          query(
            messageCollection,
            orderBy('createdAt', 'desc'),
            limit(pageSize)
          )
        );

    return paginatedQuery$.pipe(
      switchMap((messages: DocumentData[]) => {
        const q = query(messageCollection);

        return from(getDocs(q)).pipe(
          switchMap((snapshot) => {
            const totalCount = snapshot.size;
            return of({
              messages: messages as IMessage[],
              totalCount: totalCount,
            });
          })
        );
      })
    );
  }
  //TODO: use dynamic programming here

  createMessage(
    messageRecord: IMessage
  ): Observable<DocumentReference<DocumentData, DocumentData>> {
    const { name, message, createdAt } = messageRecord;
    return from(
      addDoc(collection(this.firestore, 'messages'), {
        name,
        message,
        createdAt,
      }).catch((error: FirestoreError) => {
        throw error.message;
      })
    );
  }

  private async getLastVisibleDocumentRef(
    pageIndex: number,
    pageSize: number
  ): Promise<DocumentData> {
    const lastVisibleDocIndex = pageIndex * pageSize;

    const messageCollection = collection(this.firestore, 'messages');

    const initialQuery = query(
      messageCollection,
      orderBy('createdAt', 'desc'),
      limit(lastVisibleDocIndex)
    );

    return await getDocs(initialQuery).then((snapshot) => {
      const lastVisibleDoc = snapshot.docs[snapshot.docs.length - 1];
      return lastVisibleDoc.data();
    });
  }
}
