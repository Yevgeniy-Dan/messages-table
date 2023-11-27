import { IMessage } from 'src/app/interfaces/message.interface';

export interface IMessageState {
  data: IMessage[];
  loading: boolean;
  error: string | null;
}

export const initialState: IMessageState = {
  data: [],
  error: null,
  loading: false,
};
