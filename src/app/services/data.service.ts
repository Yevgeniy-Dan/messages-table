import { Injectable, inject } from '@angular/core';
import {
  DocumentData,
  DocumentReference,
  Firestore,
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
      })
    );
  }
}