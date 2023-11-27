import { Action, createReducer, on } from '@ngrx/store';
import { IMessageState, initialState } from './message.state';
import {
  sendMessage,
  sendMessageFailure,
  sendMessageSuccess,
} from './message.actions';

const messageReducer = createReducer(
  initialState,
  on(sendMessage, (state, { message }) => {
    return { ...state, loading: true };
  }),
  on(sendMessageSuccess, (state, { messageId }) => {
    return { ...state, loading: false, error: null };
  }),
  on(sendMessageFailure, (state, { error }) => {
    const errorMessage: string =
      (error && error.error && error.error.error) || 'Something went wrong';
    return { ...state, loading: false, error: errorMessage };
  })
);

export function reducer(state: IMessageState = initialState, action: Action) {
  return messageReducer(state, action);
}
