import { IMessageTable } from 'src/app/interfaces/message.interface';

export interface IMessageState {
  messageTable: IMessageTable;
  loading: boolean;
  error: string | null;
}

export const initialState: IMessageState = {
  messageTable: {
    data: [],
    loading: true,
    totalCount: 0,
    error: null,
  },
  error: null,
  loading: false,
};
