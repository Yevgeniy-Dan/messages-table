import { ActionReducerMap } from '@ngrx/store';

import * as messageState from './messages';

export interface IAppState {
  [messageState.messagesStateKey]: messageState.IMessageState;
}

export const initialState: IAppState = {
  [messageState.messagesStateKey]: messageState.initialState,
};

export const appReducers: ActionReducerMap<IAppState> = {
  [messageState.messagesStateKey]: messageState.reducer,
};
