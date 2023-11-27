export interface IMessage {
  name: string;
  message: string;
}

export interface IMessageTable {
  data: IMessage[];
  loading: boolean;
  error: string | null;
}
