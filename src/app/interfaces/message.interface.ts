import { Timestamp } from '@angular/fire/firestore';

export interface IMessage {
  id?: string;
  name: string;
  message: string;
  createdAt: Timestamp;
}

export interface IMessageTable {
  data: IMessage[];
  totalCount: number;
  loading: boolean;
  error: string | null;
}

export interface IMessageResponse {
  messages: IMessage[];
  totalCount: number;
}
