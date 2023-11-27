import { Injectable } from '@angular/core';
import {
  DocumentData,
  DocumentReference,
  Firestore,
  FirestoreError,
  addDoc,
  collection,
  collectionData,
} from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { IMessage } from '../interfaces/message.interface';

@Injectable()
export class DataService {
  // firestore: Firestore = inject(Firestore);

  constructor(private firestore: Firestore) {}

  getMessages(): Observable<IMessage[]> {
    const messageCollection = collection(this.firestore, 'messages');

    return collectionData(messageCollection) as Observable<IMessage[]>;
  }

  createMessage(
    name: string,
    message: string
  ): Observable<DocumentReference<DocumentData, DocumentData>> {
    return from(
      addDoc(collection(this.firestore, 'messages'), {
        name,
        message,
      }).catch((error: FirestoreError) => {
        throw error.message;
      })
    );
  }
}
