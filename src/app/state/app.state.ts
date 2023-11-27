import { ActionReducerMap } from '@ngrx/store';

import * as messageState from './messages';

export const messagesStateKey = 'messages';

export interface IAppState {
  [messagesStateKey]: messageState.IMessageState;
}

export const initialState: IAppState = {
  [messagesStateKey]: messageState.initialState,
};

export const appReducers: ActionReducerMap<IAppState> = {
  [messagesStateKey]: messageState.reducer,
};
