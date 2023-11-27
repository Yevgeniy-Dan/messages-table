import { Injectable } from '@angular/core';
import {
  DocumentData,
  DocumentReference,
  Firestore,
  FirestoreError,
  addDoc,
  collection,
} from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';

@Injectable()
export class DataService {
  // firestore: Firestore = inject(Firestore);

  constructor(private firestore: Firestore) {}

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
